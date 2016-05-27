var changelog = [
'-- Alpha',
'--- Added tiles',
'---- Added grass, dirt, tree and crops tiles.',
'--- Added clock',
'---- Game starts at 3099BC',
'--- Added units',
'---- Game starts with 2 units',
'----- Units now move each turn',
'----- Units now have gender',
'------ Units reproduce when they are on the same spot. Reproduction takes 100 ticks',
'----- Units now have food and energy',
'------ Units now die if they run out of energy',
'------ Units can kill others from other type for food',
'------ Units can share some of their food with same type units',
'---- Added new units, chickens, sheep and pigs',
'----- Units now spawn randomly each save.',
'---- Added cities',
'----- Units enter cities sometimes when passing by.',
];

var TILE_WIDTH = 32;
var TILE_HEIGHT = 32;
var MAP_WIDTH = 100;
var MAP_HEIGHT = 50;
var TIME_START = -100000000000000;
var FOOD_PER_KILL = 10;
var ENERGY_PER_FOOD_RATION = 2400;

var updateInterval = 20;

var cursorPosition = {
	'x': 0,
	'y': 0,
}

var tileTypes = [
'grass', 'dirt', 'tree', 'crops', 'treeFruit',
];

var unitTypes = [
'human', 'pig', 'cow', 'chicken', 'sheep', 'zombie',
]

function resetVariables() {
	if (!god) god = {};
	if (!god.map) god.map = [];
	if (god.map.length <= 0) generateMap(MAP_WIDTH, MAP_HEIGHT);
	if (!god.units) god.units = [];
	if (!god.time) god.time = TIME_START;

	updateMap();
}
function saveGame() {
	do {
		generateUnit(false, false, read(unitTypes))
	} while (rand(0,2));

	localStorage.setItem('god', JSON.stringify(god));
	notification('Game Saved');
}
function loadGame() {
	var losto = localStorage.getItem('god');
	if (!losto) return;
	god = JSON.parse(losto);
	notification('Game Loaded');
}
function Tile(x, y) {
	this.x = x;
	this.y = y;
	this.type = 'tile';
	this.data = {
		'tileType': read(tileTypes),
	}
	this.element = drawTile(this);
}
function drawTile(tile, isUnit) {
	if (!isUnit) var el = document.createElement('tile');
	if (isUnit) var el = document.createElement('unit');
	if (tile.element && tile.element.className) var el = tile.element;
	el.style.top = (tile.y * TILE_HEIGHT)+'px';
	el.style.left = (tile.x * TILE_WIDTH)+'px';
	el.style.width = TILE_WIDTH+'px';
	el.style.height = TILE_HEIGHT+'px';

	el.className = 'tile_'+tile.data.tileType;
	el.title = tile.data.tileType+' x:'+tile.x+' y:'+tile.y;

	return el;
}
function updateTile(tile) {
	var isUnit = (tile.type == 'unit') ? true : false;
	drawTile(tile, isUnit);
}
function generateMap(width, height) {
	var map = [];
	for (var y = 0; y < height; y++) {
		map[y] = [];
		for (var x = 0; x < width; x++) {
			var t = new Tile(x, y);
			map[y][x] = t;
			doc('game').appendChild(t.element);
		}
	}
	god.map = map;
}
function updateMap() {
	for (var y in god.map) {
		for (var x in god.map[y]) {
			var mp = god.map[y][x];
			if (!mp.element || !mp.element.className) {
				mp.element = drawTile(mp);
				doc('game').appendChild(mp.element);
			}
		}
	}
	for (var uu in god.units) {
		var unit = god.units[uu];
		if (!unit.element || !unit.element.className) {
			unit.element = drawTile(unit, 1);
			doc('game').appendChild(unit.element);
		}
	}
}
function generateUnit(x, y, type) {
	if (!x) x = rand(1, MAP_WIDTH) - 1;
	if (!y) y = rand(1, MAP_HEIGHT) - 1;
	var u = new Unit(x, y, type);
	god.units.push(u);
	doc('game').appendChild(u.element);
}
function Unit(x, y, type) {
	this.x = x;
	this.y = y;
	this.type = 'unit';

	this.zombie = false;
	if (type == 'zombie') this.zombie = true;

	this.pregnant = 0;
	this.gender = rand(0, 1);
	this.sterile = false;
	if (!rand(0,1)) this.sterile = true;

	this.seeds = rand(0, 3);

	this.age = 1;

	this.energy = 2000;

	this.data = {
		'tileType': type,
	}

	this.element = drawTile(this, true);
}
function drawMap() {
	return;

	var x = cursorPosition.x;
	var y = cursorPosition.y;

	var min_x = x - 10;
	var min_y = y - 10;
	var max_x = x + 10;
	var max_y = y + 10;
	for (var e in god.map) {
		for (var i in god.map[e]) {
			var el = god.map[e][i];
			el.element.style.display = 'inline-block';
			if (el.x > max_x || el.x < min_x) el.element.style.display = 'none';
			if (el.y > max_y || el.y < min_y) el.element.style.display = 'none';
		}
	}

	for (var e in god.units) {
		var el = god.units[e];
		el.element.style.display = 'inline-block';
		if (el.x > max_x || el.x < min_x) el.element.style.display = 'none';
		if (el.y > max_y || el.y < min_y) el.element.style.display = 'none';
	}
}
function timeString(time) {
	var d = new Date(time);
	var ts = '';

	var yy = d.getYear();
	var y = Math.abs(yy);
	if (yy < 0) y += ' a.C.';
	if (yy >= 0) y += ' d.C.';

	var da = d.getDate();
	var m = d.getMonth() + 1;

	ts += da+'/'+m+'/'+y+'<br>';

	var h = d.getHours();
	if (h < 10) h = '0'+h;
	var m = d.getMinutes();
	if (m < 10) m = '0'+m;
	ts += ' '+h+':'+m

	ts += '<br>Population: '+god.units.length;
	return ts;
}
function moveUnit(unit) {
	if (!unit.obj) unit.obj = rand(1, god.units.length);
	var obj = unit.obj - 1;
	var obj = god.units[obj];

	if (!obj) obj = {
		'x': rand(0, MAP_WIDTH),
		'y': rand(0, MAP_HEIGHT),
	}

	var altx = (unit.x < obj.x) ? 1 : -1;
	var alty = (unit.y < obj.y) ? 1 : -1;
	
	unit.x += red(rand(-1, 1), altx);
	unit.y += red(rand(-1, 1), alty);
	if (unit.x <= 0) unit.x = 0;
	if (unit.x >= MAP_WIDTH) unit.x = (MAP_WIDTH - 1);
	if (unit.y <= 0) unit.y = 0;
	if (unit.y >= MAP_HEIGHT) unit.y = (MAP_HEIGHT - 1);

	if (unit.x == obj.x && unit.y == obj.y) unit.obj = rand(1, god.units.length);

	updateTile(unit);
}
function onTileNotification(xx, yy, text) {
	var not = document.createElement('tile_notification');
	not.innerHTML = text;
	not.style.left = (TILE_WIDTH * xx)+'px';
	not.style.top = (TILE_HEIGHT * yy)+'px';

	doc('game').appendChild(not);
	setTimeout(function() {
		doc('game').removeChild(not);
	}, 5000);
}
function giveBirth(unit) {
	onTileNotification(unit.x, unit.y, 'A baby '+unit.data.tileType+' was born');
	generateUnit(unit.x, unit.y, unit.data.tileType);
	unit.energy = Math.floor(unit.energy / 2);
	if (!rand(0,1)) unit.sterile = true;
	while (!rand(0,1)) generateUnit(unit.x, unit.y, unit.data.tileType);
}
function reproduce(from, to) {
	var fromType = from.data.tileType;
	var toType = to.data.tileType;

	if (fromType == toType && from.gender != to.gender && !from.pregnant && !to.pregnant && !from.sterile && !to.sterile) {
		if (from.gender != 1) from.pregnant = 100;
		if (to.gender != 1) to.pregnant = 100;
		console.log('Unit now pregnant');
	}
}
function hunt(from, to) {
	if (from.data.tileType != to.data.tileType && (!from.zombie || !to.zombie)) {
		if (!from.food) from.food = 0;
		if (!to.food) to.food = 0;
		if (!to.age) to.age = 0;
		var tot = (to.age * FOOD_PER_KILL) + to.food;
		from.food += tot;

		//onTileNotification(from.x, from.y, to.data.tileType+' got hunted for '+tot+' food.');
		if (from.zombie && rand(0,1)) {
			generateUnit(from.x, from.y, 'zombie');
		}
		kill(to);
	}
}
function giveFood(from, to) {
	if (!from.food) from.food = 0;
	if (!to.food) to.food = 0;
	var give = Math.floor(from.food / 2);
	from.food -= give;
	to.food += give;
}
function joinCity(unit, x, y) {
	god.map[y][x].data.population++;
	kill(unit);
}
function kill(unit) {
	doc('game').removeChild(unit.element);
	var i = god.units.indexOf(unit);
	god.units.splice(i, 1);
}
function update(step) {
	god.time += Math.pow(2, 21);
	clock.innerHTML = timeString(god.time);

	for (var u in god.units) {
		var thisUnit = god.units[u];

		if (!thisUnit.seeds) thisUnit.seeds = 0;

		//Gives birth if pregnant
		if (thisUnit.pregnant) {
			thisUnit.pregnant--;
			if (thisUnit.pregnant <= 0) {
				giveBirth(thisUnit);
			}
		}

		//Increases unit age
		if (!thisUnit.age) thisUnit.age = 0;
		thisUnit.age++;

		//Consumes food
		if (thisUnit.food) {
			thisUnit.food--;
			thisUnit.energy += ENERGY_PER_FOOD_RATION;
		}

		//Dies if has no energy left
		if (!thisUnit.energy) thisUnit.energy = 0;
		thisUnit.energy -= thisUnit.age / 12;
		if (thisUnit.energy < 0 && rand(0,1)) {
			if (rand(0,1)) {
				onTileNotification(thisUnit.x, thisUnit.y, 'I died at '+thisUnit.age+' age.');
				kill(thisUnit);
				return;
			}
		}

		//Moves this unit a random direction
		if (!rand(0,1)) moveUnit(thisUnit);

		//Sees random unit
		var utsHere = unitsHere(thisUnit.x, thisUnit.y);
		var randomUnit;
		if (utsHere.length > 1) {
			last = parseInt(read(utsHere));

			randomUnit = god.units[last];
		}
		if (randomUnit && randomUnit != thisUnit && thisUnit.x == randomUnit.x && thisUnit.y == randomUnit.y) {
			//Unit is different and is on the same tile
			reproduce(thisUnit, randomUnit);

			//Tries to kill unit
			hunt(thisUnit, randomUnit);

			//Gives food to unit
			giveFood(thisUnit, randomUnit);
		}

		var thisTile = god.map[thisUnit.y][thisUnit.x].data.tileType;
		if (!thisTile.plant) thisTile.plant = 0;
		if (thisTile == 'crops') {
			changeTileType(thisUnit.x, thisUnit.y, 'dirt');
			thisUnit.food += 20;
			thisUnit.seeds += rand(0, 2);
		}
		if (thisTile == 'city') {
			if (rand(0,1)) {
				joinCity(thisUnit, thisUnit.x, thisUnit.y);
				return;
			}
		}
		if (thisTile == 'treeFruit') {
			changeTileType(thisUnit.x, thisUnit.y, 'tree');
			thisUnit.food += 10;
		}
		if (thisTile == 'grass') {
			changeTileType(thisUnit.x, thisUnit.y, 'dirt');
			thisUnit.food++;
		}
		if (thisTile == 'dirt' && thisUnit.seeds) {
			thisUnit.seeds -= 1;
			thisTile.plant = 100;
		}
	}

	var r = read(god.map);
	for (var u in r) {
		var tile = r[u];
		var adjacentTiles = getAdjacentTiles(tile);
		if (tile.data.tileType == 'tree') {
			tile.data.age++;
			if (tile.data.age >= 32 && rand(0,1)) {
				tile.data.age = 0;
				tile.data.tileType = 'treeFruit';
			}
		}
		if (tile.data.tileType == 'city') {
			if (!tile.data.nextbirth) tile.data.nextbirth = 0;
			while (tile.data.nextbirth >= 1) {
				tile.data.nextbirth--;
				generateUnit(tile.x, tile.y, 'human');
			}
			var pop = tile.data.population;
			var r = rand(0, pop);
			tile.data.nextbirth += (r / 100);

		}
		if (tile.data.tileType == 'dirt' && tile.plant) {
			tile.plant--;
			if (tile.plant <= 0) {
				changeTileType(tile.x, tile.y, 'crops');
			}
		}
		if (tile.data.tileType == 'dirt') {
			for (var at in adjacentTiles) {
				if (adjacentTiles[at].data.tileType == 'grass' && rand(0,1)) {
					changeTileType(tile.x, tile.y, 'grass');
					return;
				}
			}
		}
	}

	document.title = gameInfo.name+' '+gameInfo.version;

	drawMap();

	var tm = god.units.length + 1;
}
function getAdjacentTiles(tile) {
	var ts = [];
	var up = directionFromHere(tile, 'up');
	var down = directionFromHere(tile, 'down');
	var left = directionFromHere(tile, 'left');
	var right = directionFromHere(tile, 'right');
	ts = [
	up, down, left, right
	];

	var adjacentTiles = [];

	for (var tz in ts) {
		var dir = ts[tz];
		if (dir.x < 0 || dir.y < 0 || dir.x >= MAP_WIDTH || dir.y >= MAP_HEIGHT) continue;
		adjacentTiles.push(god.map[dir.y][dir.x]);
	}
	return adjacentTiles;
}
function directionFromHere(tile, direction) {
	var d = {
		'x': tile.x,
		'y': tile.y,
	}
	if (direction == 'up') d.y--;
	if (direction == 'down') d.y++;
	if (direction == 'left') d.x--;
	if (direction == 'right') d.x++;

	return d;
}
function changeTileType(x, y, newTileType) {
	var t = god.map[y][x];
	t.data.tileType = newTileType;
	updateTile(t);
}
function unitsHere(x, y) {
	var uts = [];
	for (var uh in god.units) {
		var ut = god.units[uh];
		if (ut.x == x && ut.y == y) uts.push(uh)
	}
	return uts;
}
function createCity(x, y) {
	changeTileType(x, y, 'city');
	god.map[y][x].data.population = 0;
	god.map[y][x].data.cityType = 'village';
}
$(document).on('keypress', function(evt) {
	var k = String.fromCharCode(evt.which).toLowerCase();
	if (k == 'w') {
		cursorPosition.y--;
		if (cursorPosition.y <= 0) cursorPosition.y = 0;
		drawMap();
	}
	if (k == 's') {
		cursorPosition.y++;
		if (cursorPosition.y >= MAP_HEIGHT) cursorPosition.y = (MAP_HEIGHT - 1);
		drawMap();
	}
	if (k == 'a') {
		cursorPosition.x--;
		if (cursorPosition.x <= 0) cursorPosition.x = 0;
		drawMap();
	}
	if (k == 'd') {
		cursorPosition.x++;
		if (cursorPosition.x >= MAP_WIDTH) cursorPosition.x = (MAP_WIDTH - 1);
		drawMap();
	}
});

var god = {};
var gameInfo = {
	'name': 'Template',
	'version': changes(changelog).latestVersion,
	'changelog': changes(changelog).changelog,
}
loadGame();
resetVariables();
update();

while (!rand(0,1)) generateUnit(false, false, 'human');
while (!rand(0,1)) generateUnit(false, false, 'pig');
while (!rand(0,1)) generateUnit(false, false, 'cow');
while (!rand(0,1)) generateUnit(false, false, 'chicken');
while (!rand(0,1)) generateUnit(false, false, 'sheep');

var updateStuff = setInterval(update, updateInterval);
var t = setInterval(saveGame, 60000);