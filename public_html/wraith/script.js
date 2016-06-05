var changelog = [
'-- Alpha',
];

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

	document.title = gameInfo.name+' '+gameInfo.version;
}

var game = {};
var gameInfo = {
	'name': 'Template',
	'version': changes(changelog).latestVersion,
	'changelog': changes(changelog).changelog,
}
loadGame();
resetVariables();
update();
var t = setInterval(saveGame, 60000);