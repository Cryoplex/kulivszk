var changelog = [
'-- Alpha',
];

function increaseValue(num) {
	wraith.wraithies.push(new Wraithie());
	update();
}
function resetVariables() {

}
function saveGame() {
	localStorage.setItem('wraith', JSON.stringify(wraith));
	notification('Game Saved');
	also_try.innerHTML = alsoTry();
}
function Wraithie() {
	this.hp = 3;
	this.x = rand(0, 100);
	this.y = rand(0, 50);
	this.z = 2;
	this.eyecolor = 'rgb('+rand(170, 255)+', '+rand(170, 255)+', '+rand(170, 255)+')';
	this.shape = [];
	for (var y = 0; y < 10; y++) {
		this.shape[y] = [];
		for (var x =  0; x < 10; x++) this.shape[y][x] = 'wraithie_void';
	}
	//Add eyes
	var estart = 0;
	var efinish = 2;
	this.shape[0][estart] = 'wraithie_eye';
	this.shape[0][efinish] = 'wraithie_eye';

	//Add mouth
	var mstart = estart + 1;
	var mfinish = efinish - 1;
	var mou = rand(mstart, mfinish);
	var mlength = 1;
	for (var m = 0; m < mlength; m++) this.shape[(m + 2)][mou] = 'wraithie_mouth';

	//Expand
	this.shape = expandArray(this.shape, 'wraithie_void');
	//Outline
	infectAll(this.shape);
}
function tickWraithies() {
	if (!wraith.wraithies) wraith.wraithies = [];
	for (var tw in wraith.wraithies) {
		if (!rand(0,1)) continue;
		var wth = wraith.wraithies[tw];

		if (!isArrayClean(wth.shape, 'wraithie_flesh')) {
			wth.shape = expandArray(wth.shape, 'wraithie_void');
			infectAll(wth.shape);
		}
	}
}
function infectAll(array) {
	for (var yy in array) {
		var search = array[yy].indexOf('wraithie_flesh');
		if (search < 0) search = array[yy].indexOf('wraithie_eye');
		if (search < 0) search = array[yy].indexOf('wraithie_mouth');
		if (search < 0) continue;
		var xx = search;

		var th = tileHere(array, xx, yy);
		if (th == 'wraithie_eye') {
			infect(array, xx, yy, 'wraithie_void', 'wraithie_flesh', 'wraithie_eye', 0);
		}
		if (th == 'wraithie_mouth') {
			infect(array, xx, yy, 'wraithie_void', 'wraithie_flesh', 'wraithie_mouth', 0);
		}
		if (th == 'wraithie_flesh') {
			infect(array, xx, yy, 'wraithie_void', 'wraithie_flesh', 'wraithie_body', 3);
		}
	}
	trimArray(array, 'wraithie_void');
}
function isArrayClean(array, checkTile) {
	for (var yyy in array) {
		for (var xxx in array[yyy]) {
			if (array[yyy][xxx] == checkTile) return false;
		}
	}
	return true;
}
function trimArray(array, empty) {
	//Trimming top
	var top = array[0];
	if (isArrayEmpty(top, empty)) {
		array.splice(0, 1);
	}

	//Trimming bottom
	var last = array[array.length - 1];
	if (isArrayEmpty(last, empty)) {
		array.pop();
	}

	//Trimming left
	var firstIndex = 0;
	if (isArrayEmpty(array, empty, firstIndex)) {
		for (var z in array) array[z].splice(0, 1);
	}

	//Trimming right
	var lastIndex = array[0].length - 1;
	if (isArrayEmpty(array, empty, lastIndex)) {
		for (var z in array) array[z].pop();
	}

}
function isArrayEmpty(arr, empty, index) {
	if (index) {
		for (var e in arr) if (arr[e][index] != empty) return false;
		return true;
	}
	for (var e in arr) if (arr[e] != empty) return false;
	return true;
}
function expandArray(array, empty) {
	//Add empty line top
	var n = [];
	for (var x in array[0]) n[x] = empty;

	//Add empty line bottom
	array = [n].concat(array);
	array.push(n);

	//Add empty line left and right
	for (var e in array) {
		array[e] = [empty].concat(array[e]);
		array[e].push(empty);
	}
	return array;
}
function getSurroundings(array, x, y) {
	var surr = [];
	for (var g = 0; g < 8; g++) {
		var there = getDirection(array, x, y, g);
		if (there) surr.push(there);
	}
	return surr;
}
function infect(array, x, y, toInfect, newInfection, deadTile, chance) {
	var me = tileHere(array, x, y);
	for (var d = 0; d < 8; d++) {
		var t = getDirection(array, x, y, d);
		if (d % 2 == 1 && rand(0,1)) continue;
		if (t == toInfect && rand(0,chance) == 0) getDirection(array, x, y, d, newInfection);
	}
	tileHere(array, x, y, deadTile);
}
function tileHere(array, x, y, newTile) {
	if (newTile) array[y][x] = newTile;
	return array[y][x];
}
function getDirection(array, x, y, direction, newTile) {
	//0 = top, 1 = topright, 2 = right, 3 = bottomright, 4 = bottom, 5 = bottomleft, 6 = left, 7 = topleft
	if (direction == 0 || direction == 1 || direction == 7) y--;
	if (direction == 3 || direction == 4 || direction == 5) y++;
	if (direction == 1 || direction == 2 || direction == 3) x++;
	if (direction == 5 || direction == 6 || direction == 7) x--;

	if (array[y]) {
		if (array[y][x]) {
			if (newTile) array[y][x] = newTile;
			return array[y][x];
		}
	}
	return false;
}
function randomBorder() {
	return 'border-top-left-radius: '+rand(0, 100)+'%; border-top-right-radius: '+rand(0, 100)+'%; border-bottom-left-radius: '+rand(0, 100)+'%; border-bottom-right-radius: '+rand(0, 100)+'%;';
}
function drawAllWraithies() {
	var daw = '';
	for (var ww in wraith.wraithies) daw += drawWraithie(wraith.wraithies[ww], ww);
	return daw;
}
function shoot(wraithID, x, y) {
	var w = wraith.wraithies[wraithID];
	var h = tileHere(w.shape, x, y);
	var sur = getSurroundings(w.shape, x, y);
	if (sur.indexOf('wraithie_body') >= 0) {
		console.log('Shot sucesfull!');
		w.hp -= 1;
		if (h == 'wraithie_body') tileHere(w.shape, x, y, 'wraithie_void');
	}
	if (w.hp <= 0) wraith.wraithies.splice(wraithID, 1);
	update();
}
function drawWraithie(wraithie, wraithID) {
	var pixelSize = 5;
	if (!wraithie) return;
	var s = wraithie.shape;
	var l = '<div class="wraithie" style="top: '+(pixelSize * wraithie.y)+'px; transform: scale('+wraithie.z+'); left: '+(pixelSize * wraithie.x)+'px">';
	for (var y in s) {
		for (var x in s[y]) {
			var ex = '';
			var extra = '';
			var mou = 1;
			if (s[y][x] == 'wraithie_mouth') mou = 2;
			if (s[y][x] == 'wraithie_eye') ex = 'background-color: '+wraithie.eyecolor+'; box-shadow: 0 0 '+(pixelSize * 2)+'px '+(pixelSize / 2)+'px '+wraithie.eyecolor;
			if (s[y][x] == 'wraithie_body') extra = 'box-shadow: 0 0 '+(pixelSize / 8)+'px '+(pixelSize / 16)+'px rgb(0, 0, 0); transform: rotate('+rand(0,360)+'deg) scale('+(rand(50, 200) / 100)+'); '+randomBorder();
			l += '<div style="top: '+(y * pixelSize)+'px; left: '+(x * pixelSize)+'px;'+
			'width: '+pixelSize+'px; height: '+(pixelSize * mou)+'px; '+ex+'; '+extra+'"'+
			' class="wraithie_part '+
			s[y][x]+
			'" onclick="shoot('+wraithID+', '+x+', '+y+')"></div>';
		}
	}
	l += '</div>';
	return l;
}
function loadGame() {
	var losto = localStorage.getItem('wraith');
	if (!losto) return;
	wraith = JSON.parse(losto);
	notification('Game Loaded');
}
function update(step) {
	tickWraithies();
	wraithy.innerHTML = drawAllWraithies();

	document.title = gameInfo.name+' '+gameInfo.version;
}

var wraith = {};
wraith.wraithies = [];
var gameInfo = {
	'name': 'Wraith',
	'version': changes(changelog).latestVersion,
	'changelog': changes(changelog).changelog,
}
loadGame();
resetVariables();
update();
var t = setInterval(saveGame, 60000);
var tt = setInterval(update, 100);