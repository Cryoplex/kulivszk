var dungen = {
	'config': {
		'TILE_HEIGHT': 8,
		'TILE_WIDTH': 8,
		'DEFAULT_TILE': 'dungen_tile',
		'tiles': [
			'dungen_empty',
			'dungen_room',
			'dungen_corridor',
			'dungen_door',
		],
	}
}

var d;

var pathFinderStart = coord(1, 1);
var pathFinderStop = coord(1, 1);

var TILE_HEIGHT = 8;
var TILE_WIDTH = 8;
var tiles = []

function Dungeon(width, height) {
	this.width = width;
	if (width % 2 == 0) this.width++;
	this.height = height;
	if (height % 2 == 0) this.height++;
	this.map = [];
	for (var y = 0; y < height; y++) {
		this.map[y] = [];
		for (var x = 0; x < width; x++) this.map[y][x] = 0;
	}
	this.rooms = [];

	this.draw = function() {
		var l = '';
		for (var y = 0; y < this.height; y++) {
			for (var x = 0; x < this.width; x++) {
				var tile = this.tileAt(x, y);
				l += '<div class="'+dungen.config.DEFAULT_TILE+' '+tile+'" id="dungen_'+x+'_'+y+'" onclick="clickedTile('+x+', '+y+')" style="position: absolute; top: '+(dungen.config.TILE_HEIGHT * y)+'px; left: '+(dungen.config.TILE_WIDTH * x)+'px"></div>';
			}
		}
		return l;
	}
	this.tileAt = function(x, y) {
		var tile = this.map[y][x];
		return dungen.config.tiles[tile];
	}
}
function initializeDungeon(dungeon) {
	addRoom(dungeon, 'entrance');
	addRoom(dungeon, 'exit');
	do {
		addRoom(dungeon);
	} while (rand(0,1));
}
function addRoom(dungeon) {
	console.log('Rooms for dungeon '+dungeon.rooms.length);
	var maxw = dungeon.width - 1;
	var maxh = dungeon.height - 1;

	var x = rand(1, maxw);
	var y = rand(1, maxh);
	var size = roomSize();
	if (x + size.x >= maxw) x -= size.x + 2;
	if (y + size.y >= maxh) y -= size.y + 2;

	if (x % 2 == 0) x++;
	if (y % 2 == 0) y++;

	console.log('Adding room to x:'+x+' y:'+y+' size: '+size.x+' '+size.y);
	dungeon.rooms.push(new Room(x, y, size));

	buildRooms(dungeon);
}
function isAreaEmpty(dungeon, from, to) {

}
function buildRooms(dungeon) {
	var rooms = dungeon.rooms;
	console.log('Found '+rooms.length+' rooms.');
	for (var r in rooms) {
		var room = rooms[r];
		var openings = room.openings;
		for (var x = 0; x < room.width; x++) {
			for (var y = 0; y < room.height; y++) {
				var roomx = x + room.x;
				var roomy = y + room.y;
				updateTile(dungeon.map, roomx, roomy, 1);
				for (var o in openings) {
					if (x == openings[o].x && y == openings[o].y) updateTile(dungeon.map, roomx, roomy, 3);
				}
			}
		}
	}
}
function roomSize() {
	var n = [];
	for (var x = 0; x < 2; x++) {
		var z = 5 + incRandom();
		if (z % 2 == 0) z++;
		n.push(z);
	}
	return {'x': n[0], 'y': n[1]};
}
function Room(x, y, size) {
	this.width = size.x;
	this.height = size.y;

	this.x = x;
	this.y = y;

	this.openings = [];
	do {
		addDoor(this);
	}
	while (rand(0,1));
}
function addDoor(room) {
	var width = room.width - 1;
	if (width % 2 != 0) width = 0;
	var height = room.height - 1;
	if (height % 2 != 0) height = 0;

	var type = red('top', 'side');
	if (type == 'top') {
		var rx = rand(0, width);
		var ry = red(0, height);
	}
	if (type == 'side') {
		var ry = rand(0, height);
		var rx = red(0, width);
	}
	room.openings.push({'x': rx, 'y': ry});
}
function incRandom() {
	var n = 0;
	while (!rand(0,1)) n++;
	return n;
}
function coord(x, y) {
	return {'x': x, 'y': y};
}
function isInsideBounds(map, x, y) {
	var height = map.length;
	var width = map[0].length;

	if (x < 0 || y < 0) return false;
	if (x >= width || y >= height) return false;
	return true;
}
function getDirection(dirID, inverse) {
	var dirs = ['north', 'south', 'east', 'west'];
	if (inverse) return dirs.indexOf(dirID);
	return dirs[dirID];
}
function directionFrom(from, direction, increment) {
	var to = coord(from.x, from.y);
	if (direction == 'north') to.y -= increment;
	if (direction == 'south') to.y += increment;
	if (direction == 'east') to.x -= increment;
	if (direction == 'west') to.x += increment;
	return to;
}
function pathFinder2(dungeonMap, from, to) {
	var choices = [new Choice(to.x, to.y, 0)];

	var pathFound = false;
	var pointer = 0;
	var val = 0;
	while (!pathFound) {
		var start = choices[pointer];
		val = start.value + 1;
		pointer++;
		for (var d = 0; d < 4; d++) {
			var dir = getDirection(d);
			var checkCoordinate = directionFrom(start, dir, 1);
			var insideBounds = isInsideBounds(dungeonMap, checkCoordinate.x, checkCoordinate.y);
			if (!insideBounds) continue;
			var there = dungeonMap[checkCoordinate.y][checkCoordinate.x];
			if (checkCoordinate.y == from.y && checkCoordinate.x == from.x) {
				pathFound = true;
				console.log('I found da path! x:'+checkCoordinate.x+' y:'+checkCoordinate.y);
				break;
			}

			if (there == 1) continue;
			var alreadyOnList = false;
			for (var c in choices) {
				var choice = choices[c];
				if (choice.x == checkCoordinate.x && choice.y == checkCoordinate.y) {
					alreadyOnList = true;
					break;
				}
			}
			if (!alreadyOnList) {
				choices.push(new Choice(checkCoordinate.x, checkCoordinate.y, val));
			}
			if (pathFound) break;
		}
	}

	var path = [];
	var turtle = {'x': from.x, 'y': from.y};
	for (var d = 0; d < 4; d++) {
		var dir = getDirection(d);
		var checkCoordinate = directionFrom(turtle, dir);
		var insideBounds = isInsideBounds(dungeonMap, checkCoordinate.x, checkCoordinate.y);
		if (isInsideBounds) {
			for (var c in choices) {
				var choice = choices[c];
				if (choice.x == checkCoordinate.x && choice.y == checkCoordinate.y) {
					
				}
			}
		}
	}

	return path;
}
function startDrawingMotherFucker(choices) {
	var turtle = {'x': 0, 'y': 0};
	var lastChoice = choices[0];
	return lastChoice;
}
function testNewPathFinder(dungeon, from, to) {
	startDrawingMotherFucker(pathFinder2(dungeon.map, from, to));
}
function Choice(x, y, value) {
	this.x = x;
	this.y = y;
	this.value = value;
}
function pathFinder(dungeonMap, from, to) {
	var height = dungeonMap.length - 1;
	var width = dungeonMap[0].length - 1;
	if (to.x >= width) to.x -= 2;
	if (to.y >= height) to.y -= 2;
	if (to.x <= 0) to.x = 1;
	if (to.y <= 0) to.y = 1;
	if (from.x % 2 == 0) from.x++;
	if (from.y % 2 == 0) from.y++;
	if (to.x % 2 == 0) to.x++;
	if (to.y % 2 == 0) to.y++;
	var best = getBestPath(dungeonMap, from, to);
	var path1 = directionFrom(from, best.direction, 1);
	var path2 = directionFrom(from, best.direction, 2);

	updateTile(dungeonMap, path1.x, path1.y, 2);
	updateTile(dungeonMap, path2.x, path2.y, 2);

	if (from.x == to.x && from.y == to.y) updateTile(dungeonMap, from.x, from.y, 3);

	return path2;
}
function updateTile(map, x, y, newTile) {
	var t = tileFor(x, y);
	map[y][x] = newTile;
	var element = document.getElementById(t)
	element.className = dungen.config.DEFAULT_TILE+' '+dungen.config.tiles[newTile];
}
function tileFor(x, y) {
	var name = 'dungen_'+x+'_'+y;
	return name;
}
function getBestPath(dungeonMap, from, to) {
	var best = {
		'direction': 'none',
		'distance': Infinity,
	}
	var dirs = [];
	for (var d = 0; d < 4; d++) {
		var dirName = getDirection(d);
		var checkDir = directionFrom(from, dirName, 2);
		if (!isInsideBounds(dungeonMap, checkDir.x, checkDir.y)) continue;

		dirs.push(dirName);
	}
	var override = '';
	if (rand(1, 10) == 1) {
		override = read(dirs);
	}

	if (from.x == to.x && from.y == to.y) return best;
	for (var d = 0; d < 4; d++) {
		var dirName = getDirection(d);
		var checkDir = directionFrom(from, dirName, 2);

		if (!isInsideBounds(dungeonMap, checkDir.x, checkDir.y)) continue;
		var there = dungeonMap[checkDir.y][checkDir.x];

		var dist = distance(checkDir, to);
		if (override == dirName) dist = 0;
		if (dist < best.distance) best = {
			'direction': dirName,
			'distance': dist,
			'x': checkDir.x,
			'y': checkDir.y,
		}
	}
	return best;
}
function pathFinderStep() {
	if (!d) return;
	if (pathFinderStart.x == pathFinderStop.x && pathFinderStart.y == pathFinderStop.y) return;
	pathFinderStart = pathFinder(d.map, pathFinderStart, pathFinderStop);
}
function pathFinderRandom() {
	pathFinderStop.x = rand(1, (d.width - 2));
	pathFinderStop.y = rand(1, (d.height - 2));
}
function clickedTile(x, y) {
	pathFinderStop = coord(x, y);
}
function distance(from, to) {
	return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
}

setInterval(pathFinderStep, 5);