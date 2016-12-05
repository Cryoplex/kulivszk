var changelog = [
	'a Alpha',
	'af Alpha Feature',
	'ax Alpha Fix',
	'ab Alpha Bug',

	'b Beta',
	'bf Beta Feature',
	'bx Beta Fix',
	'bb Beta Bug',

	'r Release',

	'uf Update',
	'ux Patch',
	'ub Hotfix',
];

var MAP_WIDTH = 42;
var MAP_HEIGHT = 15;

var MAP_TILES = {
	'0': 'tile_empty',
	'1': 'tile_grass',
	'2': 'tile_dirt',
	'3': 'tile_stone',
	'4': 'tile_grassdirt',
	'5': 'tile_hole1',
	'6': 'tile_hole2',
	'7': 'tile_hole3',
	'8': 'tile_rope',

	'9': 'tile_dirt_1',
	'10': 'tile_dirt_2',
	'11': 'tile_dirt_3',

	'12': 'tile_stone_1',
	'13': 'tile_stone_2',
	'14': 'tile_stone_3',

	'15': 'tile_wall',
	'16': 'tile_door',
}

function increaseValue(num) {
	zk.value += num;
	update('game_value');
}
function resetVariables() {
	if (!zk.value) zk.value = 0;
	if (!zk.maps) zk.maps  = [];
	if (!zk.player) zk.player = new Player();
}
function Player() {
	this.x = 0;
	this.y = 0;
	this.mapID = 0;
	this.mapx = 0;
	this.mapy = 0;
	this.where = 'upper';
	this.type = 'player';
	this.id = newID('player');
	this.facing = 'top';
}
function drawMap(x, y, where) {
	var map = getMap(x, y);
	if (!where) where = 'upper';

	if (doc('game')) if (doc('game').childNodes && doc('game').childNodes[0]) doc('game').removeChild(doc('game').childNodes[0]);
	var mapel = document.createElement('map');
	mapel.id = map.id;
	var tiles = map[where];

	console.log('tiles', tiles.floor.length);

	for (var y in tiles.floor) {
		for (var x in tiles.floor[y]) {
			var tile = document.createElement('tile');
			var what = tiles.floor[y][x];
			var classname = MAP_TILES[what];
			tile.style.top = (y * 32)+'px';
			tile.style.left = (x * 32)+'px';
			tile.id = 'tile_floor_'+x+'_'+y;
			tile.className = classname;
			if (where == 'lower') tile.className += ' floor';
			tile.style.zIndex = 10;

			mapel.appendChild(tile);

			var tile = document.createElement('tile');
			var what = tiles.wall[y][x];
			var classname = MAP_TILES[what];
			tile.style.top = (y * 32)+'px';
			tile.style.left = (x * 32)+'px';
			tile.id = 'tile_wall_'+x+'_'+y;
			tile.className = classname;
			if (where == 'lower') tile.className += ' wall';
			tile.style.zIndex = 100;

			mapel.appendChild(tile);
		}
	}
	doc('game').appendChild(mapel);
}
function newID(prefix) {
	return prefix.toUpperCase()+'-'+b62e(new Date().valueOf());
}
function Map(x, y, type) {
	if (x == undefined) x = 0;
	if (y == undefined) y = 0;
	if (type != 'spawn') {
		type = read(['wild', 'wild', 'wild', 'wild', read(['village', 'village', 'village', 'village', 'town'])]);
	}
	this.id = newID('map');
	this.lower = {
		'floor': lowerMap(MAP_WIDTH, MAP_HEIGHT, type),
		'wall': lowerWall(MAP_WIDTH, MAP_HEIGHT, type),
		'data': emptyArray(MAP_WIDTH, MAP_HEIGHT),
	}
	this.upper = {
		'floor': upperMap(MAP_WIDTH, MAP_HEIGHT, type),
		'wall': upperWall(MAP_WIDTH, MAP_HEIGHT, type),
		'data': emptyArray(MAP_WIDTH, MAP_HEIGHT),
	}
	this.type = type;
	if (type == 'spawn') {
		zk.player.mapID = this.id;
		zk.player.mapx = x;
		zk.player.mapy = y;
	}

	addMap(x, y, this);
}
function upperMap(width, height, type) {
	var arr = [];
	for (var h = 0; h < height; h++) {
		arr[h] = [];
		for (var w = 0; w < width; w++) {
			var toadd = read([1, 1, 1, 1, 2]);
			if (type == 'village') {
				if (h >= 6 && h <= 8) toadd = read([1, 2, 2, 2, 3]);
			}
			if (type == 'town') {
				if (h >= 6 && h <= 8) toadd = read([1, 2, 3, 3, 3]);
			}

			arr[h][w] = toadd;
		}
	}
	return arr;
}
function Building(startx, starty) {
	var size = rand(5, 10);
	var type = read(['build', 'void']);
	var endx = startx + size;
	var endy = starty + 4;
	if (endx > MAP_WIDTH - 5) type = 'void';
	var hh = Math.floor(MAP_HEIGHT / 2);
	entrancex = startx + 2;
	entrancey = (starty < hh) ? endy : starty;

	return {
		'startx': startx,
		'starty': starty,
		'endx': endx,
		'endy': endy,
		'type': type,
		'entrancex': entrancex,
		'entrancey': entrancey,
	}
}
function upperWall(width, height, type) {
	var buildings = [];
	var pointerx = 1;
	var pointery = 1;
	while (true) {
		var nb = new Building(pointerx, pointery);
		buildings.push(nb);
		pointerx = nb.endx + 2;
		if (pointerx > (MAP_WIDTH - 2)) {
			if (pointery == 9) break;
			pointerx = 1;
			pointery = 9;
		}

		if (rand(1,100) == 1) break;
	}
	if (type == 'wild') buildings = [];
	console.log(buildings);
	var arr = [];
	for (var h = 0; h < height; h++) {
		arr[h] = [];
		for (var w = 0; w < width; w++) {
			var toadd = 0; //15
			for (var b in buildings) {
				var build = buildings[b];
				if (h >= build.starty && h <= build.endy && w >= build.startx && w <= build.endx && build.type != 'void') {
					if (h == build.starty || h == build.endy || w == build.startx || w == build.endx) {
						toadd = read([15, 15, 15, 15, 15, 15, 15, 15, 15, 0])
						if (w == build.entrancex && h == build.entrancey) toadd = 0;
					}
				}
			}
			
			arr[h][w] = toadd;
		}
	}
	return arr;
}
function lowerMap(width, height, type) {
	var arr = [];
	for (var h = 0; h < height; h++) {
		arr[h] = [];
		for (var w = 0; w < width; w++) {
			var toadd = 3;
			
			arr[h][w] = toadd;
		}
	}
	return arr;
}
function lowerWall(width, height, type) {
	var arr = [];
	for (var h = 0; h < height; h++) {
		arr[h] = [];
		for (var w = 0; w < width; w++) {
			var toadd = read([0, 2, 3]);
			
			arr[h][w] = toadd;
		}
	}
	return arr;
}
function emptyArray(width, height) {
	var arr = [];
	for (var h = 0; h < height; h++) {
		arr[h] = [];
		for (var w = 0; w < width; w++) {
			arr[h][w] = 0;
		}
	}
	return arr;
}
function getConnections(x, y) {
	var map = getMap(x, y);
}
function addMap(x, y, map) {
	if (zk.maps == undefined) zk.maps = [];
	if (zk.maps[y] == undefined) zk.maps[y] = [];
	zk.maps[y][x] = map;
}
function getMap(x, y) {
	if (zk.maps[y] == undefined) zk.maps[y] = [];
	var map = zk.maps[y][x];
	if (map == undefined) return;
	return zk.maps[y][x];
}
function getMapID(x, y) {
	if (zk.maps[y] == undefined) zk.maps[y] = [];
	var map = zk.maps[y][x];
	if (map == undefined) return '$void';
	return zk.maps[y][x].id;
}

function saveGame() {
	localStorage.setItem('zk', JSON.stringify(zk));
	notification('Game Saved');
}
function loadGame() {
	var losto = localStorage.getItem('zk');
	if (!losto) return;
	zk = JSON.parse(losto);
	notification('Game Loaded');
}
function resetGame() {
	localStorage.removeItem('zk');
	window.location = window.location;
}
function drawPeople() {
	document.body.appendChild(drawCharacter(zk.player));
}
function drawCharacter(character) {
	var el = document.createElement('character');
	el.style.top = (character.y * 32)+'px';
	el.style.left = (character.x * 32)+'px';
	el.id = character.id;
	el.style.display = 'none';
	if (character.where == zk.player.where && character.mapID == zk.player.mapID) el.style.display = 'inline-block';
	el.className = character.type;

	return el;
}
function updateCharacter(character) {
	var element = doc(character.id);
	element.style.top = (character.y * 32)+'px';
	element.style.left = (character.x * 32)+'px';

	element.className = character.type+' f_'+character.facing;

	element.style.display = 'none';
	if (character.where == zk.player.where && character.mapID == zk.player.mapID) element.style.display = 'inline-block';
}
function moveCharacter(character, dir) {
	var hypo = {'x': character.x, 'y': character.y, 'mapx': character.mapx, 'mapy': character.mapy};
	if (character.facing == undefined) character.facing = 'top';

	switch (dir) {
		case 'top':
		hypo.y--;
		break;

		case 'left':
		hypo.x--;
		break;

		case 'right':
		hypo.x++;
		break;

		case 'bottom':
		hypo.y++;
		break;

		default:
	}

	var befid = character.mapID;
	if (hypo.x < 0) {
		hypo.x = MAP_WIDTH - 1;
		hypo.mapx--;
	}
	if (hypo.y < 0) {
		hypo.y = MAP_HEIGHT - 1;
		hypo.mapy--;
	}
	if (hypo.x >= MAP_WIDTH) {
		hypo.x = 0;
		hypo.mapx++;
	}
	if (hypo.y >= MAP_HEIGHT) {
		hypo.y = 0;
		hypo.mapy++;
	}
	var map = getMap(hypo.mapx, hypo.mapy);
	if (map == undefined) new Map(hypo.mapx, hypo.mapy);
	map = map[character.where];
	var wh = map.wall[hypo.y][hypo.x];

	character.facing = dir;

	if (wh <= 0) {
		character.mapx = hypo.mapx;
		character.mapy = hypo.mapy;

		character.x = hypo.x;
		character.y = hypo.y;

		character.mapID = getMapID(character.mapx, character.mapy);
		if (character == zk.player && character.mapID != befid) {
			drawMap(character.mapx, character.mapy, character.where);
		}
	}

	updateCharacter(character);
}
function update(step) {
	document.title = gameInfo.name+' '+gameInfo.version;
	at.innerHTML = alsoTry();
}
function dig(character, below) {
	var where = character.where;
	if (below == 'down') where = 'lower';
	var map = getMap(character.mapx, character.mapy)[where];
	var layer = 'wall';
	if (below == 'floor') layer = 'floor';
	map = map[layer]
	var hypo = {'x': character.x, 'y': character.y};
	if (!below) {
		if (character.facing == 'top') hypo.y--;
		if (character.facing == 'left') hypo.x--;
		if (character.facing == 'right') hypo.x++;
		if (character.facing == 'bottom') hypo.y++;
	}

	if (map[hypo.y] && map[hypo.y][hypo.x]) {
		var lastTile = map[hypo.y][hypo.x];
		var newTile = 0;
		if (below == 'down') newTile = 8;

		if (lastTile == 1) newTile = 4;
		if (lastTile == 4) newTile = 5;
		if (lastTile == 5) newTile = 6;
		if (lastTile == 6) {
			getMap(character.mapx, character.mapy).lower.wall[hypo.y][hypo.x] = 0;
			getMap(character.mapx, character.mapy).lower.floor[hypo.y][hypo.x] = 8;

			newTile = 7;
		}

		if (lastTile == 2) newTile = 9;
		if (lastTile == 9) newTile = 10;
		if (lastTile == 10) {
			newTile = 11;
			setTimeout(function() {
				map[hypo.y][hypo.x] = 0;
				updateTile(character.mapx, character.mapy, hypo.x, hypo.y, where, layer);
			}, 250);
		}
		if (lastTile == 11) newTile = 0;

		if (lastTile == 3) newTile = 12;
		if (lastTile == 12) newTile = 13;
		if (lastTile == 13) {
			newTile = 14;
			setTimeout(function() {
				map[hypo.y][hypo.x] = 0;
				updateTile(character.mapx, character.mapy, hypo.x, hypo.y, where, layer);
			}, 250);
		}
		if (lastTile == 14) newTile = 0;

		if (lastTile == 7) {
			dig(zk.player, 'down');
			return;
		}

		map[hypo.y][hypo.x] = newTile
		updateTile(character.mapx, character.mapy, hypo.x, hypo.y, where, layer);
	}
	if (below == 'down') {
		zk.player.where = (zk.player.where == 'upper') ? 'lower' : 'upper';
		drawMap(zk.player.mapx, zk.player.mapy, zk.player.where);
	}
}
function getTile(mapx, mapy, where, layer, x, y, newTile) {
	if (newTile) zk.maps[mapy][mapx][where][layer][y][x] = newTile;
	var tile = getMap(mapx, mapy)[where][layer][y][x];
	return tile;
}
function updateTile(mapx, mapy, x, y, where, layer) {
	var tiles = getMap(mapx, mapy)[where][layer];
	var t = 'tile_'+layer+'_'+x+'_'+y;
	var what = tiles[y][x];
	var cn = (where == 'lower') ? ' '+layer : '';
	doc(t).className = MAP_TILES[what]+cn;
}
function stepOn(character) {
	return getTile(character.mapx, character.mapy, character.where, 'floor', character.x, character.y);
}
$('body').on('keypress', function(evt) {
	var key = String.fromCharCode(evt.charCode).toLowerCase();
	if (key == 'w') moveCharacter(zk.player, 'top');
	if (key == 'a') moveCharacter(zk.player, 'left');
	if (key == 's') moveCharacter(zk.player, 'bottom');
	if (key == 'd') moveCharacter(zk.player, 'right');

	if (key == 'x') {
		var so = stepOn(zk.player);
		if (zk.player.where == 'lower' && so == 8) {
			zk.player.where = (zk.player.where == 'upper') ? 'lower' : 'upper';
			drawMap(zk.player.mapx, zk.player.mapy, zk.player.where);
		}
		else {
			if (so == 1 || so == 4 || so == 5 || so == 6 || so == 7) dig(zk.player, 'floor');
		}
	}

	if (key == 'z') {
		dig(zk.player);
	}
});

var zk = {};
var gameInfo = {
	'name': 'Template',
	'version': changes(changelog).latestVersion,
	'changelog': changes(changelog).changelog,
}
loadGame();
resetVariables();
update();
new Map(0, 0, 'spawn');
drawMap(0, 0, zk.player.where);
drawPeople();
var t = setInterval(saveGame, 60000);