function getRandomShip() {
	return {
		'shipColor': rand(1,7),
		'fireColor': rand(1,3),
		'hueChange': rand(0,360),
	}
}
function drawShip(ship) {
	if (!ship) ship = game.myShip;
	console.log('Ship: '+ship);
	var fc = ship.fireColor;
	var sc = ship.shipColor;
	var hr = ship.hueChange;
	game_value.innerHTML = '<img src="img/fire_'+fc+'.png" style="z-index: 1"><img src="img/ship_'+sc+'.png" style="-webkit-filter: hue-rotate('+hr+'deg); position: relative; top: 0px; left: -168px; z-index: 2">';
}
function generateRandomShip() {
	game.myShip = getRandomShip();
	drawShip();
}

function increaseValue(num) {
	game.value += num;
	update('game_value');
}
function resetVariables() {
	if (!game.value) game.value = 0;

	if (!game.myShip) game.myShip = {
	'shipColor': rand(1,7),
	'fireColor': rand(1,3),
	'hueChange': rand(0,360),
	}
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

	drawShip();
}
function mainWindow(what) {
	var wins = ['shipSelector'];
	for (var e in wins) $('#'+wins[e]).slideUp(100);
	$('#'+what).slideDown(100);
}

var game = {};

loadGame();
resetVariables();
var t = setInterval(saveGame, 60000);

drawShip();