var WORLD_WIDTH = 19;
var WORLD_HEIGHT = 14;

var worldMap = [];
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
		for (var x = 0; x <= WORLD_WIDTH; x++) {
			
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
function generateHouse() {

}
function drawWorldMap() {
	var l = '';

	for (var y = 0; y < worldMap.length; y++) {
		for (var x = 0; x < worldMap[y].length; x++) {
			var ex = worldMap[y][x];
			l += '<div class="world_sprite '+ex+'"></div>';
		}
		l += '<div style="clear: both"></div>';
	}
	containerMap.innerHTML = l;
}
function changeTile(arr, x, y, newTile) {
	arr[y][x] = newTile;
}
generateWorldMap();
drawWorldMap();