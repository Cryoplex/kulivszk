var changelog = [
	'-- Añadido el changelog.',
	'--- El juego empieza con 500 monedas',
	'--- Añadido objeto Computer',
	'--- Cambiada la fuente a monospace',
	'-- Añadido un pequeño tutorial.',
	'-- Añadido un generador de nombres de marcas y modelos de ordenador.',
	'-- Añadida una tienda de ordenadores donde se podrán comprar nuevos ordenadores.',
	'--- Añadida durabilidad a los ordenadores',
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
	if (!ripper.army) ripper.army = [];
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
function Computer(brand, cpu, lifespan, durability) {
	var value = cu;
	cu++;
	this.brand = computerBrands[brand];
	var mod = models[brand];
	var max = value % mod.length;
	var val = (brand + 7) * ((value + 1) * 7);
	this.model = mod[max]+'-'+val.toString(36).toUpperCase();
	this.cpu = cpu;           //The higher cpu power, the faster you crack those pesky passwords
	this.lifespan = lifespan; //The higher lifespan, the more your computer will last
	this.price = 50 + Math.ceil((cpu * 160) + (lifespan * 250) + (durability * 0.75));
	this.durability = durability;
}
function SlowType(where, text, callback) {
	this.where = where;
	this.text = text;
	var d = doc(where).innerHTML.replace('insertionPoint', 'insertionPointInvis');
	this.oldText = d;
	this.index = 0;
	this.callback = callback;
}
function addSlowType(where, text, callback) {
	slowTyping.push(new SlowType(where, text, callback));
}
function usl() {
	var styper = slowTyping[0];
	if (!styper) return;
	var wh = styper.where;
	var txt = styper.text;
	styper.index++;
	var ix = styper.index;
	var oldText = styper.oldText;
	if (!oldText) oldText = '';
	doc(wh).innerHTML = gameLog.join('<br>')+'<br>'+displayText(txt.slice(0, ix));
	if (ix >= txt.length) {
		if (styper.callback) var x = styper.callback();
		gameLog.push(txt);
		slowTyping.splice(0, 1);
	}
}
function updateShop() {
	var l = '<h2>Computer Shop</h2><i>Click any computer to buy it</i><br>';
	for (var us in computers) {
		l += '<div class="computer" onclick="buyComputer('+us+')">'+displayComputerData(computers[us])+'</div>';
	}
	computerShop.innerHTML = l;
}
function buyComputer(computerID) {

}
function displayComputerData(computer) {
	return '<b>'+computer.brand+'</b> <i>'+computer.model+'</i><br> ($'+shortNum(computer.price)+')<br>CPU level '+computer.cpu+'<br>Lifespan '+computer.lifespan+'<br>Durability '+computer.durability;
}
function tutorial() {
	if (ripper.tutorial <= 1) {
		addSlowType('startGame', 'Welcome to RiPPER v'+gameInfo.version);

		addSlowType('startGame', 'As a part of your initiation test, you should buy a new computer.');

		addSlowType('startGame', 'You have $'+ripper.money+' in hand. Choose wisely.', function() {
			$('#computerShop').fadeIn(1000);
			updateShop();
		});
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
    //Level 1 Computers
    new Computer(0,   0.5,   0.5,   100), //PHACER Computers have balanced CPU power, lifespan and durability
    new Computer(1,   1,     0.5,   100), //PH Computers have better CPU power
    new Computer(2,   0.5,   1,     100), //Sonapanic Computers have a longer lifespan
    new Computer(3,   0.5,   0.5,   200), //FUSHUHTZU Computers have higher durability
    new Computer(4,   1,     1,     50),  //Lemon Computers are good in CPU power and lifespan, but have low durability
    //Level 2 Computers
    new Computer(0,   1,     1,    200),
    new Computer(1,   2,     1,    200),
    new Computer(2,   1,     2,    200),
    new Computer(3,   1,     1,    400),
    new Computer(4,   2,     2,    100),
];
var slowTyping = [];
var ripper = {};
var gameInfo = {
	'name': 'RiPPER',
	'version': changes(changelog).latestVersion,
	'changelog': changes(changelog).changelog,
}
var gameLog = [];
loadGame();
resetVariables();
update();
var t = setInterval(saveGame, 60000);
var ust = setInterval(function() {usl();}, 50);

tutorial();