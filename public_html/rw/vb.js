//Switches
var rainBowMode = false;

//Variable declaration phase
var level = 1;
//Set base values for every stat
//TODO
//The stat array stores a character by first index. 0 is player.
//The first
//stat[personaje][indice]
//[indice] nombre, nivel, experiencia, bases, aptitud, bonus
var players = [];
var monsters = [];
var gameLog = [];
createPlayer(0);

//Other
var experience = 0;
var expMod = genModifier();
var experienceMax;
var heroName = "Desconocido";
var advLevel = 0;
var advLevelType = '';
var LEVEL_TYPES = [
	'Forest',
];

//Main functions phase
calculateStats(players[0]);
hp = hpMax; mp = mpMax;

//Afterload
if (heroName == "Desconocido") {
	logIt("Bienvenido, "+heroName);
}
else {
	logIt("Bienvenido de vuelta, "+heroName);
}
startGame();

//Timers phase
var t = setInterval(timedOperations,100);



//Functions
function startGame() {
	var l = '';
	l += 'What is your name?<br>';
	l += '<input type="textbox" id="newName"><br>';

	game.innerHTML = l;

	var m = game.innerHTML+'<input type="button" value="OK" onclick="pickHeroName()"><br>';

	game.innerHTML = m;
}
function startAdventure() {
	if (monsters.length) {
		//Combat Mode
		var l = 'You are on a fight! Choose an action for your next turn.';
		$('#combatActions').animate({opacity: 1}, 50);
		$('#combatActions').animate({width: 'show'}, 500);
		game.innerHTML = l;
		return;
	}
	//Non-Combat Mode
	$('#combatActions').animate({width: 'hide'}, 100);

	var l = 'You are on level '+advLevel+' ('+LEVEL_TYPES[advLevel]+').';
	var act = getActions();
	var youSee = 'You see '+act[0]+' and '+act[1];;
	l += '<br>'+youSee;
	l += '<br>What do you want to do?';
	l += '<br>';

	l += '<input type="button" value="'+act[2]+'" onclick="doAction('+act[4]+')">';
	l += '<input type="button" value="'+act[3]+'" onclick="doAction('+act[5]+')">';

	game.innerHTML = l;
}
function getActions() {
	var sees = [
		'a rock',
		'a tree',
	];
	var does = [
		'Sit on the Rock',
		'Shake Tree',
	];
	do {
		var num = rand(0, sees.length-1);
		var num2 = rand(0, sees.length-1);
	}
	while (num == num2);

	return [sees[num], sees[num2], does[num], does[num2], num, num2];
}
function doAction(num) {
	var set = advLevelType;
	if (set == 0) {
		//Level 0: Forest
		switch (num) {
			case 0:
			notification('You sit on a rock, but nothing happens.');
			break;

			case 1:
			notification('You shake the tree. A wild monster appears!');
			spawnMonster();
			break;

			default:
			notification('Seems like you are doing stupid things and you should stop.');
			break;
		}
	}
	startAdventure();
}
function pickHeroName() {
	if (!newName.value) {
		notification('Please type in a name for your adventurer and click OK.');
		return;
	}
	heroName = newName.value;

	startAdventure();
}
function push(newLine) {
	if (gameLog.length > 15) gameLog.splice(0, 1);

	gameLog[gameLog.length] = newLine;

	var l = '';
	for (var xx in gameLog) {
		l += gameLog[xx]+'<br>';
	}
	game.innerHTML = l;
}
function fill(max, minValue, maxValue, round) {
	arr = [];
	for (i = 0; i < max; i++) {
		var value = rand(minValue, maxValue);
		if (round != undefined) value /= round;
		arr[i] = value;
	}
	return arr;
}
function spawnMonster() {
	var lev = players[0].level;
	createMonster(lev);
}
function createMonster(minLevel, slot) {
	if (!slot) slot = monsters.length;
	monsters[slot] = new Monster(minLevel);
}
function Monster(minLevel) {
	this.base = fill(7, 32, 512);
	this.apt = fill(7, 85, 115, 100);
	this.bonus = fill(7, 0, 0);

	//Selects a minimum and maximum level for the monster
	//based on a 90% 110% variation of the level specified.
	var maxVariation = Math.ceil(minLevel / 10);
	if (!minLevel) minLevel = 1;
	var min = minLevel - maxVariation;
	var max = minLevel + maxVariation;
	if (min < 1) min = 1;
	this.level = rand(min, max);

	this.hp = statFormula(this, 'hp');
	this.mp = statFormula(this, 'mp');
}
function createPlayer(slot) {
	if (!slot) slot = players.length;
	players[slot] = new Player();
}
function Player() {
	this.base = fill(7, 32, 512);
	this.apt = fill(7, 85, 115, 100);
	this.bonus = fill(7, 0, 0);
	this.level = 1;

	this.hp = statFormula(this, 'hp');
	this.mp = statFormula(this, 'mp');
}

function statFormula(who, stat) {
	var adjust = {
		'hp': 10,
		'mp': 7,
	};
	var fixie = {
		'hp': 100,
		'mp': 150,
	}
	var adj = adjust[stat];
	if (adj == undefined) adj = 5;

	var fix = fixie[stat];
	if (fix == undefined) fix = 200;

	var level = who.level;
	var bonus = readStat(who, 'bonus', stat);
	var base = readStat(who, 'base', stat);
	var apt = readStat(who, 'apt', stat);

	var formula = Math.round((bonus+adj+((level/fix)*base))*apt);
	return formula;
}
function readStat(play, section, stat) {
	var stats = {
		'hp': 0,
		'mp': 1,
		'atk': 2,
		'def': 3,
		'matk': 4,
		'mdef': 5,
		'spe': 6
	};
	var x = stats[stat];
	if (!play) return;
	return play[section][x];
}

function calculateStats(who) {
	var x = ['hp', 'mp', 'atk', 'matk', 'def', 'mdef', 'spe'];

	hpMax = statFormula(who, 'hp');
	mpMax = statFormula(who, 'mp');
	atk = statFormula(who, 'atk');
	matk = statFormula(who, 'matk');
	def = statFormula(who, 'def');
	mdef = statFormula(who, 'mdef');
	spe = statFormula(who, 'spe');
}
function display(where,what) {
document.getElementById(where).innerHTML = what;
}
function getExpLevel(level) {
return Math.round(100*Math.pow(1.15,level));
}
function genModifier() {
return ((Math.random()*30)+85)/100;
}
//Interacciones con el personaje
function increaseAllyHealth(quantity) {
hp = hp + Math.round(quantity);
if (hp >= hpMax) {
hp = hpMax;
}
}
function increaseAllyMana(quantity) {
mp = mp + Math.round(quantity);
if (mp >= mpMax) {
mp = mpMax;
}
}
function decreaseAllyHealth(quantity) {
hp = hp - Math.round(quantity);
if (hp <= 0) {
hp = 0;
console.log("Has muerto.");
}
}
function decreaseAllyMana(quantity) {
mp = mp - Math.round(quantity);
if (mp <= 0) {
mp = 0;
}
}
function increaseExperience(quantity) {
experience = experience + Math.round(quantity);
while (experience >= experienceMax) {
var left = experience-experienceMax;
level = level+1;
calculateStats(players[0]);
logIt("Has subido al nivel "+level+"!");
hp = hpMax;
mp = mpMax;
experience = left;
}
}

function logIt(newLog) {
	if (rainBowMode) newLog = rainBow(newLog, 95);
	notification(newLog);
}

function spawnPlayer() {

}
function testShitGoesHere() {
/*

*/
}
function drawBar2(minValue, maxValue) {
	
}
function drawBar(minValue,maxValue,returnValue) {
	var filledValue = Math.round(20*(minValue/maxValue));
	if (filledValue <= 0) {
	if (minValue > 0) {
	filledValue = 1;
	}
	}
	var pointArray = [];
	pointArray[0] = "";
	pointArray[1] = ".";
	var i = 2;
	var i2 = 1;
	while ( i <= 20 ) {
	pointArray[i] = pointArray[1]+pointArray[i2];
	i = i+1;
	i2 = i2+1;
	}
	var depletedValue = 20-filledValue;
	if (returnValue !== undefined) {
	return pointArray[filledValue];
	} else {
	return pointArray[depletedValue];
	}
}
//Load variables
function loadGame() {

}
//Save game
function saveGame() {

}

//Timed functions
function timedOperations() {
	//Update
	//Recalc variables
	experienceMax = Math.round(getExpLevel(level)*expMod);
	calculateStats(players[0]);
	//Time shit here.
	//Draw HP/EXP/Mana bars
	display("expFilled",drawBar(experience,experienceMax,"fill"));
	display("expDepleted",drawBar(experience,experienceMax));
	display("hpFilled",drawBar(hp,hpMax,"fill"));
	display("hpDepleted",drawBar(hp,hpMax));
	display("mpFilled",drawBar(mp,mpMax,"fill"));
	display("mpDepleted",drawBar(mp,mpMax));

	display("heroName",heroName);
	//Dynamic stats
	display("level",level);
	display("exp",experience +"/"+ experienceMax);
	display("hp",hp +"/"+ hpMax);
	display("mp",mp +"/"+ mpMax);

	//Static stats
	display("atk",atk);
	display("def",def);
	display("matk",matk);
	display("mdef",mdef);
	display("spe",spe);

	//Bonus stats
	var who = players[0];
	var bonusATK = readStat(who, 'bonus', 'atk');
	var bonusDEF = readStat(who, 'bonus', 'def');
	var bonusMATK = readStat(who, 'bonus', 'matk');
	var bonusMDEF = readStat(who, 'bonus', 'mdef');
	var bonusSPE = readStat(who, 'bonus', 'spe');
	
	display("atkBonus",bonusATK);
	display("defBonus",bonusDEF);
	display("matkBonus",bonusMATK);
	display("mdefBonus",bonusMDEF);
	display("speBonus",bonusSPE);

	//Display monster stats
	var l = '<h2>Enemy Party</h2>';
	for (var ms in monsters) {
		var mst = monsters[ms];
		l += 'Monster #'+ms+' level '+mst.level+'<br>';
		l += 'HP: '+mst.hp+'/'+statFormula(mst, 'hp');
		l += ' ';
		l += 'MP: '+mst.mp+'/'+statFormula(mst, 'mp')+'<br>';
		l += '<br><br>';
	}
	enemyStats.innerHTML = l;
}
//Show and hide docs
function showDoc(doc) {
	$('#'+doc).slideDown(250);

	if (doc == 'help') $('#close').fadeIn(250);
}
function hideDoc(doc) {
	$('#'+doc).slideUp(250);

	if (doc == 'help') $('#close').fadeOut(250);
}
//Help docs
function help(id) {
	var help = [
	"<b>Hulp</b><br><hr><br>"+
	"This is Random World manual. You can navigate through the contents clicking the category tabs "+
	"If you wish to close this manual, click outside this window (The dark side)."+
	"You can open this again "+
	"by clicking the tab <b>Help</b> in the main menu.",
	//
	"<b>Testing stuff</b><br><hr><br>"+
	"(TEST)",
	//
	"<b>Test #2</b><br><hr><br>"+
	"(DIS IS A TEST)"
	//
	];
	document.getElementById("helpText").innerHTML = help[id];
}
function rainBowModeSwitch() {
	rainBowMode = !rainBowMode;
	var x = 'desactivado'
	if (rainBowMode) x = 'activado'
	logIt('Modo Orgullo Gay '+x);
}