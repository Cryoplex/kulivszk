var changelog = [
    '-- Añadido changelog',
    '--- Añadido objeto de carta y objeto de ataque.',
    '---- Añadido un generador de cartas.',
    '---- Cambiadas las dimensiones de las cartas a 240x160 píxeles (imagen de carta)',
    '---- Añadidas imágenes para las cartas',
    '-- Al empezar la partida puedes recibir una baraja de principiante.',
    '-- Al pasar el ratón por encima de una carta, se ve en grande',
    '--- Las cartas ahora brillan si son legendarias/unicas',
    '--- Cambiados los colores de las cartas',
];

var PS_DEFAULTS = {
	'power': 0,
	'monster': 100,
	'unique': 150,
	'king': 200,
	'chimera': 200,
	'legendary': 200,
}
var cardTypes = [
'monster', 'king', 'unique', 'legendary', 'chimera', 'power', 
];
var types = [
'beast', 'machine', 'ghost',
];
function Card(name, cardType, types, description, moves, imageID) {
	this.name = name,
	this.cardType = cardType;
	this.types = types;
	this.imageID = [cardTypes.indexOf(cardType), imageID];
	this.description = description;
	this.moves = moves;
	this.ps = PS_DEFAULTS[cardType];
	this.color = 'hsl('+{
		'unique': 0,
		'power': 0,
		'monster': 180,
		'king': 60,
		'chimera': 120,
		'legendary': 300,
	}[cardType]+', '+{
		'power': 0,
		'monster': 70,
		'unique': 50,
		'king': 100,
		'chimera': 70,
		'legendary': 70,
	}[cardType]+'%, '+{
		'power': 0,
		'monster': 90,
		'unique': 50,
		'king': 50,
		'chimera': 70,
		'legendary': 30,
	}[cardType]+'%)';
}
function Move(name, damage, protection, effect) {
	this.name = name;
	this.damage = damage;
	this.protection = protection;
	this.effect = effect;
}
function drawCard(obj, small) {
	var zoom = 1;
	if (small) zoom = 0.5;
	small = false;
	if (!obj) obj = read(quimera.cards);

	var divClass = (small) ? 'smallCard' : 'card';
	var omo = "this.style.zoom = 0.5";
	var oml = "this.style.zoom = 0.5";
	var l = '<div class="'+divClass+' '+obj.cardType+'" onmouseover="'+omo+'" onmouseleave="'+oml+'" style="background-color: '+obj.color+'; zoom: '+zoom+'">';

	//Section A
	l += '<div class="cardSectionA">';

	l += obj.name+' ('+obj.cardType+')';

	l += '</div>';

	//Section B
	console.log('image id x'+obj.imageID[0]+' y'+obj.imageID[1]);
	var xy = {'x': 240, 'y': 180};
	if (small) {
		xy.x = 120;
		xy.y = 90;
	}

	l += '<div class="cardSectionB" style="background-position: -'+(obj.imageID[0] * xy.x)+'px -'+(obj.imageID[1] * xy.y)+'px">';

	l += '<div class="hpSection">'+obj.ps+'<meter min="0" max="'+obj.ps+'" value="'+obj.ps+'"></meter>'+obj.ps+'</div><br>';

	l += '</div>';

	//Section C
	l += '<div class="cardSectionC">';

	l += drawMoves(obj.moves, small)+'<br>';

	l += '<span class="quote"><i>"'+obj.description+'"</i></span>';

	l += '</div>';

	l += '</div>';
	return l;
}
function drawDeck(deck, collection) {
	var l = '';
	if (collection) {
		for (var dd in deck) {
			l += '<div class="showCard">'+drawCard(deck.cards[dd], 1)+'</div>';
		}
		return l;
	}

	l += '<div class="showCardSplit" style="background-color: hsl(0, 40%, 80%)">';
	for (var dd in deck.cards) {
		l += '<div class="showCard">'+drawCard(deck.cards[dd], 1)+'</div>';
	}
	l += '</div><div class="showCardSplit" style="background-color: hsl(180, 40%, 80%)">';
	for (var dd in deck.extraCards) {
		l += '<div class="showCard">'+drawCard(deck.extraCards[dd], 1)+'</div>';
	}
	l += '</div>';
	return l;
}
function arrayCount(array, what) {
	var c = [];
	for (var ac in array) if (array[ac] == what) c.push(ac);
	return c;
}
function uniqueArray(array) {
	var newArray = [];
	for (var ua in array) {
	var elem = array[ua];
	var exists = newArray.indexOf(elem);
	if (exists < 0) newArray.push(elem)
	}
	return newArray;
}
function arrayToDice(array) {
	for (var atd in array) {
		array[atd]++;
	}
	return array.join(',');
}
function drawMoves(moveArray, small) {
	var ll = '';
	var unique = uniqueArray(moveArray);
	for (var dm in unique) {
		var moveID = unique[dm]
		var mov = quimera.moves[moveID];
		var dice = arrayToDice(arrayCount(moveArray, moveID));
		var toAdd = mov.name+' '+mov.damage+'/'+dice;
		if (small) toAdd = mov.damage+'/'+dice;
		ll += toAdd
		if (mov.effect && !small) ll += ' <i>'+mov.effect+'</i>';
		ll += '<br>';
	}
	return ll;
}
function getRandomDeck() {
	var x = [];
	//1 king card per deck
	x.push(read(getCardsByType('king')));
	//1 legendary card per deck
	x.push(read(getCardsByType('legendary')));
	//3 chimera cards per deck
	for (var grd = 0; grd < 8; grd++) x.push(read(getCardsByType('chimera')));
	//6 unique cards per deck
	for (var grd = 0; grd < 5; grd++) x.push(read(getCardsByType('unique')));
	//5 power cards per deck
	for (var grd = 0; grd < 5; grd++) x.push(read(getCardsByType('power')));
	//18 monster cards per deck
	for (var grd = 0; grd < 20; grd++) x.push(read(getCardsByType('monster')));

	for (var grd in x) {
		quimera.collection.push(x[grd]);
	}

	return new Deck(randomDeckName(), x);
}
function shufleDeck(deck) {
	var newDeck = [];
}
function randomDeckName() {
	var n = rand(0, 2821109907455);
	return n.toString(36).toUpperCase();
}
function generateRandomDeck() {
	quimera.collection = [];
	quimera.deck = getRandomDeck();
	update();
}
function getCardsByType(type) {
	var arr = [];
	for (var gcbt in quimera.cards) {
		var card = quimera.cards[gcbt];
		if (card.cardType == type) arr.push(card);
	}
	return arr;
}
function Deck(name, cards) {
	this.name = 'Baraja '+name;
	var cardDeck = [];
	var extraCardDeck = [];
	for (var d in cards) {
		var cardType = cards[d].cardType;
		if (cardType == 'king' || cardType == 'chimera' || cardType == 'legendary') {
			extraCardDeck.push(cards[d]);
		}
		else {
			cardDeck.push(cards[d]);
		}
	}
	this.cards = cardDeck;
	this.extraCards = extraCardDeck;
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
function showWindow(what) {
	myDeck.innerHTML = drawDeck(quimera.deck);
	myCollection.innerHTML = drawDeck(quimera.collection, 1);

	var windows = ['myDeck', 'myCollection'];
	for (var w in windows) doc(windows[w]).style.display = 'none';
	doc(what).style.display = 'block';

}
function update(step) {
	if (!quimera.deck) { $('#deckSelection').fadeIn(1000); }
	if (quimera.deck) { $('#deckSelection').fadeOut(1000); }
	if (quimera.deck) {
		$('#gameOptions').fadeIn(1000);
	}
}

var quimera = {};
var hoverCard;
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
	new Card('Monstruo', 'monster', [0, 1], '', [0, 0, 0, 0, 0, 0], 0),
	new Card('Único', 'unique', [1], '', [0, 0, 0, 0, 0, 0], 0),
	new Card('Poder', 'power', [], '', [], 0),
	new Card('Rey', 'king', [1, 2], '', [0, 0, 0, 0, 0, 0], 0),
	new Card('Quimera', 'chimera', [0, 2], '', [0, 0, 0, 0, 0, 0], 0),
	new Card('Legendario', 'legendary', [0, 0, 0], '', [0, 0, 0, 0, 0, 0], 0),

	new Card('Limo de Mierda', 'monster', [0, 1], '', [0, 0, 0, 0, 0, 0], 1),
	new Card('Gato Raro', 'monster', [0, 1], '', [0, 0, 0, 0, 0, 0], 2),

	new Card('Garaña', 'unique', [1], '', [0, 0, 0, 0, 0, 0], 1),

	new Card('Kit de Primeros Auxilios', 'power', [], '', [], 1),

	new Card('Rey Limo', 'king', [1, 2], '', [0, 0, 0, 0, 0, 0], 1),
	new Card('Abominación', 'chimera', [0, 2], '', [0, 0, 0, 0, 0, 0], 1),
	new Card('Dracatula', 'legendary', [0, 0, 0], '', [0, 0, 0, 0, 0, 0], 1)
);
var gameInfo = {
	'name': 'Chimera Cards',
	'version': changes(changelog).latestVersion,
	'changelog': changes(changelog).changelog,
}
update();

var t = setInterval(saveGame, 60000);