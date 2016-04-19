var WORLD_WIDTH = 19;
var WORLD_HEIGHT = 14;

var position = 'world';
var whereMap = worldMap;
var whereCoordinates = {'x': 0, 'y': 0}

var houseDoor = rand(0,1);
var windows = [];

var worldMap = [];
var worldMapDetail = [];
var houseMap = [];

function generateWorldMap() {
	var houseWidth = 3 + (rand(1, 4) * 2);
	var houseHeight = rand(1, 3);
	var dogTerrain = 1 + rand(4, (WORLD_HEIGHT - 7));

	var dogHouse = {
		'startX': (WORLD_WIDTH - 3),
		'startY': 1,
		'finishX': (WORLD_WIDTH - 1),
		'finishY': 4,
	}
	var tree = {
		'startX': (WORLD_WIDTH - 3),
		'startY': (WORLD_HEIGHT - 5),
		'finishX': (WORLD_WIDTH - 1),
		'finishY': (WORLD_HEIGHT - 1),
	}
	var house = {
		'startX': 1,
		'finishX': (houseWidth),
		'startY': (WORLD_HEIGHT - 6 - ((houseHeight - 1) * 2)),
		'finishY': (WORLD_HEIGHT - 1),
	}

	for (var y = 0; y <= WORLD_HEIGHT; y++) {
		worldMap[y] = [];
		worldMapDetail[y] = [];
		windows[y] = [];
		for (var x = 0; x <= WORLD_WIDTH; x++) {
			windows[y][x] = rand(0,1);
			
			if (y <= dogTerrain) changeTile(worldMap, x, y, 'world_dogFloor');
			if (y > dogTerrain) changeTile(worldMap, x, y, 'world_gardenFloor');

			if (x >= dogHouse.startX && x <= dogHouse.finishX) {
				if (y >= dogHouse.startY && y <= dogHouse.finishY) {
					var stepX = x - dogHouse.startX;
					var stepY = y - dogHouse.startY;
					changeTile(worldMap, x, y, 'world_dogHouse');
					if ((stepX % 2) == 1 && stepY == 3) changeTile(worldMap, x, y, 'world_dogDoor');
					if (stepY < 2) changeTile(worldMap, x, y, 'world_dogRoof');
				}
			}
			if (x >= tree.startX && x <= tree.finishX) {
				if (y >= tree.startY && y <= tree.finishY) {
					var stepX = x - tree.startX;
					var stepY = y - tree.startY;
					if (stepX % 2 == 1) changeTile(worldMap, x, y, 'world_gardenTreeTrunk');
					if (stepY < 2) changeTile(worldMap, x, y, 'world_gardenTreeLeaves');
				}
			}
			if (x >= house.startX && x <= house.finishX) {
				if (y >= house.startY && y <= house.finishY) {
					var stepX = x - house.startX;
					var stepY = y - house.startY;
					changeTile(worldMap, x, y, 'world_houseWall');
					if (stepX % 2 == 1 && stepY % 2 == 0) changeTile(worldMap, x, y, 'world_houseWindow');
					if (stepY < 3) changeTile(worldMap, x, y, 'world_houseRoof');
					if (x == (house.finishX - 1) && y >= (house.finishY - 1)) changeTile(worldMap, x, y, 'world_houseDoor');
				}
			}

			if ((y == 0 || x == 0) || (y == WORLD_HEIGHT || x == WORLD_WIDTH)) {
				changeTile(worldMap, x, y, 'world_wall');
			}
		}
	}
}
function generateSmallMap(worldX, worldY) {
	var tile = worldMap[worldY][worldX];
	var map = [];
	for (var y = 0; y <= WORLD_HEIGHT; y++) {
		map[y] = [];
		for (var x = 0; x <= WORLD_WIDTH; x++) {
			var toAdd = getTileSetFor(tile);
			if (x == 0 || x == WORLD_WIDTH || y == WORLD_HEIGHT || y == 0) {
				toAdd = 'world_warp';
			}
			map[y][x] = toAdd;
		}
	}
	worldMapDetail[worldY][worldX] = map;
}
function getTileSetFor(tile) {
	var arr = [tile];
	if (tile == 'world_dogFloor' || tile == 'world_gardenFloor') arr.push('world_shit');
	for (var x = 0; x < 5; x++) arr.push(tile);
	return read(arr);
}
function goHereFromWorld(x, y) {
	whereCoordinates.x = x;
	whereCoordinates.y = y;

	var tileType = whereMap[y][x];
	if (tileType == 'world_wall') return;
	var where = worldMapDetail[y][x];
	if (!where) generateSmallMap(x, y);

	drawMap(worldMapDetail[y][x]);
	position = 'outside';
}
function generateHouse() {

}
function drawMap(map) {
	var l = '';

	for (var y = 0; y < map.length; y++) {
		for (var x = 0; x < map[y].length; x++) {
			var ex = map[y][x];
			if (ex == 'world_houseDoor' && houseDoor) ex = 'world_houseDoorOpen';
			if (ex == 'world_houseWindow' && windows[y][x]) ex = 'world_houseWindowOpen';
			var click = 'goHereFromWorld('+x+', '+y+')';
			if (map != worldMap) click = 'interactHere('+x+', '+y+')';
			l += '<div class="world_sprite '+ex+'" onclick="'+click+'"></div>';
		}
		l += '<div style="clear: both"></div>';
	}
	containerMap.innerHTML = l;
	whereMap = map;
}
function interactHere(x, y) {
	var thisTile = whereMap[y][x];
	if (thisTile == 'world_warp') {
		var whereWarp = {
			'x': whereCoordinates.x,
			'y': whereCoordinates.y,
		}
		if (x == 0) whereWarp.x--;
		if (x == WORLD_WIDTH) whereWarp.x++;
		if (y == 0) whereWarp.y--;
		if (y == WORLD_HEIGHT) whereWarp.y++;

		console.log(whereWarp);

		goHereFromWorld(whereWarp.x, whereWarp.y);
	}
}
function warpToWorldMap() {
	position = 'world';
	drawMap(worldMap);
}
function changeTile(arr, x, y, newTile) {
	arr[y][x] = newTile;
}
generateWorldMap();

drawMap(worldMap);