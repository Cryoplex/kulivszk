var changelog = [
	'-- Añadido el changelog.',
	'--- El juego empieza con 500 monedas',
	'--- Añadido objeto Computer',
	'--- Cambiada la fuente a monospace',
	'-- Añadido un pequeño tutorial.',
	'-- Añadido un generador de nombres de marcas y modelos de ordenador.',
];
var cu = 0;

function increaseValue(num) {
	ripper.value += num;
	update('game_value');
}
function resetVariables() {
	if (!ripper.tutorial) ripper.tutorial = 1;
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

	document.title = gameInfo.name+' '+gameInfo.version;
}
function displayText(string) {
	return string+'<span class="insertionPoint">_</span>';
}
function Computer(brand, cpu, lifespan) {
	var value = cu;
	cu++;
	this.brand = computerBrands[brand];
	var mod = models[brand];
	var max = value % mod.length;
	var val = (brand + 7) * ((value + 1) * 7);
	this.model = mod[max]+'-'+val.toString(36).toUpperCase();
	this.cpu = cpu;           //The higher cpu power, the faster you crack those pesky passwords
	this.lifespan = lifespan; //The higher lifespan, the more your computer will last
	this.price = Math.ceil((cpu * 100) + (lifespan * 150));
}
function SlowType(where, text) {
	this.where = where;
	this.text = text;
	this.index = 0;
}
function addSlowType(where, text) {
	slowTyping.push(new SlowType(where, text));
}
function usl() {
	for (var st in slowTyping) {
		var styper = slowTyping[st];
		var wh = styper.where;
		var txt = styper.text;
		styper.index++;
		var ix = styper.index;
		doc(wh).innerHTML = displayText(txt.slice(0, ix));
		if (ix >= txt.length) {
			slowTyping.splice(st, 1);
		}
	}
}

var computerBrands = [
	'PHACER',
	'PH',
	'Sonapanic',
	'FUSHIHTZU',
	'Lemon',

	/*
	'ASUX',
	'Mc',
	'Sansumg',
	'mse',
	'iMachines',
	'TOJIBA',
	'D3LL',
	'Kompak',
	'SONI',
	'Wategay',
	*/
];
var models = [
	['Doppler', 'Hertz', 'Reverb', 'Echo', 'Bass', 'Treble'],
	['Hydro', 'Acid', 'Basic', 'Dissolve', 'Ion'],
	['Fear', 'Paranoia', 'Terror', 'Horror', 'Panic'],
	['Chihuahua', 'Bulldog', 'Yorkshire', 'Pomeranian', 'Schnauzer', 'Pinscher', 'Hotdog'],
	['Orange', 'Grapefruit', 'Lime', 'Tangerine', 'Tangelo'],
];

var computers = [
    new Computer(0, 0.1, 0.1),
    new Computer(1, 0.15, 0.1),
    new Computer(2, 0.1, 0.15),

    new Computer(3, 0.2, 0.2),
    new Computer(4, 0.4, 0.2),

    new Computer(0, 0.8, 0.8),
    new Computer(1, 1.2, 0.8),
    new Computer(2, 0.8, 1.2),

    new Computer(3, 1.3, 1.3),
    new Computer(4, 2.5, 1.2),
];
var slowTyping = [];
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
var ust = setInterval(function() {usl();}, 50);

if (ripper.tutorial <= 1) {
	addSlowType('startGame', 'Welcome to RiPPER v'+gameInfo.version+'<br> \
	As a part of your initiation test, you should buy a new computer. \
	<br>You have $'+ripper.money+' in hand. Choose wisely.');
}