var changelog = [
    '-- Añadido changelog',
    '--- Añadido objeto de carta y objeto de ataque.',
    '---- Añadido un generador de cartas.',
    '---- Cambiadas las dimensiones de las cartas a 240x160 píxeles (imagen de carta)',
];
/*
0.0.0.0.0 Añadido changelog
0.0.1.0.0 Añadido objeto de carta y objeto de ataque.

*/

var PS_DEFAULTS = {
	'power': 0,
	'monster': 100,
	'unique': 150,
	'king': 200,
	'chimera': 200,
	'legendary': 200,
}
var cardTypes = [
'power', 'monster', 'unique', 'king', 'chimera', 'legendary',
];
var types = [
'beast', 'machine', 'ghost',
];
function Card(name, cardType, types, description, moves) {
	this.name = name,
	this.cardType = cardType;
	this.types = types;
	this.description = description;
	this.moves = moves;
	this.ps = PS_DEFAULTS[cardType];
	this.color = 'hsl('+{
		'power': 0,
		'monster': 60,
		'unique': 120,
		'king': 180,
		'chimera': 240,
		'legendary': 300,
	}[cardType]+', 70%, 70%)';
}
function Move(name, damage, protection, effect) {
	this.name = name;
	this.damage = damage;
	this.protection = protection;
	this.effect = effect;
}
function drawCard(obj) {
	if (!obj) obj = read(quimera.cards);

	var l = '<div class="card" style="background-color: '+obj.color+'">';

	//Section A
	l += '<div class="cardSectionA">';

	l += obj.name+' ('+obj.cardType+')';

	l += '</div>';

	//Section B
	l += '<div class="cardSectionB">';

	l += '<div class="hpSection">'+obj.ps+'ps</div><br>';

	l += '</div>';

	//Section C
	l += '<div class="cardSectionC">';

	l += 'Movimientos: '+obj.moves+'<br>';

	l += '<span class="quote"><i>"'+obj.description+'"</i></span>';

	l += '</div>';

	l += '</div>';
	return l;
}

function increaseValue(num) {
	quimera.value += num;
	update('game_value');
}
function resetVariables() {
	if (!quimera.value) quimera.value = 0;
}
function saveGame() {
	localStorage.setItem('quimera', JSON.stringify(quimera));
	notification('Game Saved');
}
function loadGame() {
	var losto = localStorage.getItem('quimera');
	if (!losto) return;
	quimera = JSON.parse(losto);
	notification('Game Loaded');
}
function update(step) {
	if (step == 'game_value' || !step) doc('game_value').innerHTML = shortNum(quimera.value);
}

var quimera = {};
loadGame();
resetVariables();

quimera.moves = [];
quimera.cards = [];

quimera.moves.push(
	new Move('Golpe', 40, false, false),
	new Move('Protección', 0, true, false),
	new Move('Escudo Punzante', 10, true, false),
	new Move('Recuperación', 0, false, 'this.ps += 50')
);

quimera.cards.push(
	new Card('Monstruo Prueba', 'monster', [0, 1], 'Un monstruo muy bonito', [0, 0, 2, 0, 1, 3]),
	new Card('Monstruo Único', 'unique', [1], 'Un monstruo muy especial', [0, 0, 0, 0, 1, 1]),
	new Card('Poder', 'power', [], 'Mata a todos', []),
	new Card('Juan Carlos I', 'king', [1, 2], 'Mata a todos', [0, 0, 1, 2, 3, 1]),
	new Card('Ligre', 'chimera', [0, 2], 'Tigre + León', [0, 0, 0, 0, 0, 0]),
	new Card('Barney Stinson', 'legendary', [0, 0, 0], 'LEGENDARIO', [0, 0, 0, 0, 0, 0])
);
var gameInfo = {
	'name': 'Chimera Cards',
	'version': changes(changelog).latestVersion,
	'changelog': changes(changelog).changelog,
}

var t = setInterval(saveGame, 60000);