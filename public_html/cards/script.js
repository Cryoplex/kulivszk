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
}
function Move(name, damage, protection, effect) {
	this.name = name;
	this.damage = damage;
	this.protection = protection;
	this.effect = effect;
}
function drawCard(obj) {

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
	new Card('Monstruo Único', 'unique', [1], 'Un monstruo muy especial', [0, 0, 0, 0, 1, 1])
);


var t = setInterval(saveGame, 60000);