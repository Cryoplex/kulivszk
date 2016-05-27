var changelog = [
	'-- Añadido el changelog.',
	'--- El juego empieza con 500 monedas',
	'--- Añadido objeto Computer',
	'--- Cambiada la fuente a monospace',
	'-- Añadido un pequeño tutorial.',
	'-- Añadido un generador de nombres de marcas y modelos de ordenador.',
	'-- Añadida una tienda de ordenadores donde se podrán comprar nuevos ordenadores.',
	'--- Añadida durabilidad a los ordenadores',
	'- You can now exit the shop and reopen it again',
	'-- The "Main Menu" shows all the money you have.',
	'-- Added "Start" to the main menu, that enters the base game.',
	'--- You can crack passwords manually, if you get a response of 200 OK, you can do the following.',
	'---- You can get $1 for a 1/11 chance of being caught.',
	'---- You can steal all the money for a 1/2 chance of being caught.',
	'---- You can sell the password over internet for a 0% chance of being caught.',
];
var cu = 0;

var triedPasswords = [];
var passwordLength = 3;
var passwordComplexity = 1;
var passwordToCrack = '';
var target = '';
var targetMoney = 0;
var access = false;
var scriptRunning = false;
var complex = [
0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
'-', '_', '!', '+', '=', '#', '%', '&', '@', '$', '*',
];

function increaseValue(num) {
	ripper.value += num;
	update('game_value');
}
function log(text) {
	console.log(text);
	crackingLog.innerHTML += text+'<br>';
	crackingLog.scrollTop = crackingLog.scrollHeight;
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
	myMoney.innerHTML = ripper.money;

	runScriptButton.className = 'crackButton disabled';
	stopScriptButton.className = 'crackButton disabled';
	if (ripper.inventory && ripper.inventory.length > 0) runScriptButton.className = 'crackButton';

	runScriptButton.title = runScript('start', 1);
	stopScriptButton.title = runScript('stop', 1);

	stealButton1.innerHTML = steal('low', 1);
	stealButton2.innerHTML = steal('all', 1);
	stealButton3.innerHTML = steal('sell', 1);

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
	if (scriptRunning) {
		automatePassword();
	}

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
	terminal.scrollTop = terminal.scrollHeight;
}
function updateShop() {
	var l = '<h2>Computer Shop</h2><i>Click any computer to buy it</i><br><b class="link" onclick="exitShop()">Exit Shop</b><br>';
	for (var us in computers) {
		l += '<div class="computer" onclick="buyComputer('+us+')">'+displayComputerData(computers[us])+'</div>';
	}
	computerShop.innerHTML = l;
}
function exitShop(reopen) {
	$('#computerShop').fadeOut(10);
	$('#mainMenu').fadeIn(1000);

	if (reopen) {
		$('#computerShop').fadeIn(1000);
		$('#mainMenu').fadeOut(10);
	}
	update();
}
function exitCracking(reopen) {
	$('#cracking').fadeOut(10);
	$('#mainMenu').fadeIn(1000);

	if (reopen) {
		$('#cracking').fadeIn(1000);
		$('#mainMenu').fadeOut(10);
	}
	update();
}
function runScript(arg, peek) {
	if (arg == 'start') {
		if (peek) {
			if (!ripper.inventory || ripper.inventory.length < 1) return "You don't have a computer capable of running a script.";
			return '';
		}
		runScriptButton.style.opacity = 0.5;
		stopScriptButton.style.opacity = 1;
		runScriptButton.className = 'crackButton disabled';
		stopScriptButton.className = 'crackButton';

		scriptRunning = true;
	}
	if (arg == 'stop') {
		if (peek) {
			if (!ripper.inventory || ripper.inventory.length < 1) return "You don't have a computer capable of running a script.";
			if (scriptRunning) return "The script is actually running.";
			return '';
		}
		runScriptButton.style.opacity = 1;
		stopScriptButton.style.opacity = 0.5;
		stopScriptButton.className = 'crackButton disabled';
		runScriptButton.className = 'crackButton';

		scriptRunning = false;
	}
	if (arg == 'manual') {
		tryPassword();
	}
}
function automatePassword() {
	if (access) return;
	if (!rand(0, 10)) tryPassword(rand(1, 255));
}
function tryPassword(computerID) {
	if (!computerID) computerID = 0;
	if (!target) target = randomIP();
	if (access) return;
	if (!passwordToCrack) generateNewTarget();
	if (!targetMoney) generateNewTarget();

	while (true) {
		var pwd = randomString(passwordLength, passwordComplexity);
		if (triedPasswords.indexOf(pwd) < 0) break;
	}

	var lin = '(192.168.1.'+computerID+') http://'+target+'/login.php?username=root&password='+pwd+' Exited with status code ';
	if (pwd == passwordToCrack) {
		lin += '200 OK';
		log(lin);
		crackingPhase.style.opacity = 0;
		access = true;
		setTimeout(function() {
			log('Logging in...');
		}, 500);
		setTimeout(function() {
			log('Logged in.');
			scriptRunning = false;
			update();
			crackingPhase.style.display = 'none';
			crackingPhase.style.opacity = 1;
			stealingPhase.style.display = 'block';
		}, 2000);
		return;
	}
	lin += '401 Unauthorized';
	log(lin);
	triedPasswords.push(pwd);
}
function generateNewTarget(logout) {
	if (logout) log('Logging out.');
	triedPasswords = [];
	if (rand(0,1)) passwordLength = passwordLength + rand(0,1);
	if (rand(0,1)) passwordComplexity = passwordComplexity + rand(0,1);
	passwordToCrack = randomString(passwordLength, passwordComplexity);
	target = randomIP();
	targetMoney = (1 + passwordLength + passwordComplexity) * (1 + passwordLength + passwordComplexity);
	access = false;
	scriptRunning = false;

	crackingPhase.style.display = 'block';
	crackingPhase.style.opacity = 1;
	stealingPhase.style.display = 'none';
	if (logout) setTimeout(exitCracking, 1000);
	update();
}
function caught() {
	var min = Math.ceil(ripper.money / 2);
	var max = Math.ceil(ripper.money * 2);
	var fine = rand(min, max);
	alert('You got caught. Your bank account is blocked. You lost $'+fine);
	ripper.money -= fine;
}
function addMoney(amount) {
	ripper.money += amount;
	log('$'+amount+' is added to your account. You have now $'+ripper.money);
}
function steal(type, peek) {
	var m = targetMoney;
	var value = (passwordLength + 1) * (passwordComplexity + 1);
	if (type == 'low') {
		if (peek) return 'Steal $1';
		addMoney(1);
		if (!rand(0,10)) {
			caught();
			generateNewTarget(1);
			return;
		}
		if (targetMoney <= 0) generateNewTarget(1);
	}
	if (type == 'all') {
		if (peek) return 'Steal $'+m;
		addMoney(m);
		if (rand(0,1)) {
			caught();
			generateNewTarget(1);
			return;
		}
		generateNewTarget(1);
	}
	if (type == 'sell') {
		if (peek) return 'Sell password for $'+value;
		addMoney(value);
		generateNewTarget(1);
	}
}
function randomIP() {
	return rand(1,255)+'.'+rand(1,255)+'.'+rand(1,255)+'.'+rand(1,255);
}
function randomString(length, complexity) {
	var s = '';
	for (var rs = 0; rs < length; rs++) {
		var r = rand(0, complexity);
		s += complex[r];
	}
	return s;
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
var ust = setInterval(function() {usl();}, 20);

tutorial();