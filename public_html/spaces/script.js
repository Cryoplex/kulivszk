function getRandomShip() {
	return {
		'shipColor': rand(1,15),
		'fireColor': rand(1,3),
	}
}
function drawShip(ship) {
	var fc = ship.fireColor;
	var sc = ship.shipColor;
	return '<img src="img/fire_'+fc+'.png" style="z-index: 1"><img src="img/ship_'+sc+'.png" style="position: relative; top: 0px; left: -168px; z-index: 2">';
}
function generateRandomShip() {
	var myShip = getRandomShip();
	game_value.innerHTML = drawShip(myShip);
}

function increaseValue(num) {
	game.value += num;
	update('game_value');
}
function resetVariables() {
	if (!game.value) game.value = 0;
}
function saveGame() {
	localStorage.setItem('game', JSON.stringify(game));
	notification('Game Saved');
}
function loadGame() {
	var losto = localStorage.getItem('game');
	if (!losto) return;
	game = JSON.parse(losto);
	notification('Game Loaded');
}
function update(step) {
	if (step == 'game_value' || !step) doc('game_value').innerHTML = shortNum(game.value);
}

var game = {};
loadGame();
resetVariables();
var t = setInterval(saveGame, 60000);