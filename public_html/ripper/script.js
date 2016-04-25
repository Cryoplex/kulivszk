var changelog = [
	'-- Añadido el changelog.',
	'--- El juego empieza con 500 monedas',
	'--- Añadido objeto Computer',
];

function increaseValue(num) {
	ripper.value += num;
	update('game_value');
}
function resetVariables() {
	if (!ripper.value) ripper.value = 0;
	if (!ripper.money && ripper.money != 0) ripper.money = 500;
}
function saveGame() {
	localStorage.setItem('ripper', JSON.stringify(ripper));
	notification('Game Saved');
}
function loadGame() {
	var losto = localStorage.getItem('ripper');
	if (!losto) return;
	ripper = JSON.parse(losto);
	notification('Game Loaded');
}
function update(step) {
	if (step == 'game_value' || !step) doc('game_value').innerHTML = shortNum(ripper.value);

	document.title = gameInfo.name+' '+gameInfo.version;
}
function Computer(brand, model, cpu, lifespan) {
	this.brand = brand;
	this.model = model;
	this.cpu = cpu;           //The higher cpu power, the faster you crack those pesky passwords
	this.lifespan = lifespan; //The higher lifespan, the more your computer will last
	this.price = Math.ceil((cpu * 100) + (lifespan * 150));
}

var ripper = {};
var gameInfo = {
	'name': 'RiPPER',
	'version': changes(changelog).latestVersion,
	'changelog': changes(changelog).changelog,
}
loadGame();
resetVariables();
update();
var t = setInterval(saveGame, 60000);