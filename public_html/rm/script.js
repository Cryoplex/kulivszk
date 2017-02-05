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

function increaseValue(num) {
	game_name.value += num;
	update('game_value');
}
function resetVariables() {
	if (!game_name.value) game_name.value = 0;
}
function saveGame() {
	localStorage.setItem('game_name', JSON.stringify(game_name));
	notification('Game Saved');
}
function loadGame() {
	var losto = localStorage.getItem('game_name');
	if (!losto) return;
	game_name = JSON.parse(losto);
	notification('Game Loaded');
}
function update(step) {
	if (step == 'game_value' || !step) doc('game_value').innerHTML = shortNum(game_name.value);

	document.title = gameInfo.name+' '+gameInfo.version;
}

var game_name = {};
var gameInfo = {
	'name': 'Template',
	'version': changes(changelog).latestVersion,
	'changelog': changes(changelog).changelog,
}
loadGame();
resetVariables();
update();
var t = setInterval(saveGame, 60000);