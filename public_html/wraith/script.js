var changelog = [
'-- Alpha',
];

snd_hit = new Audio('./sound/hit.wav');
snd_miss = new Audio('./sound/miss.wav');
snd_kill = new Audio('./sound/kill.wav');
snd_oom = new Audio('./sound/oom.wav');
snd_reload = new Audio('./sound/reload.wav');

var PIXEL_SIZE = 5;

var wind = $(window);
var SCREEN_WIDTH = wind.width() / PIXEL_SIZE;
var SCREEN_HEIGHT = wind.height() / PIXEL_SIZE;

var shooting = false;
var soundEnabled = true;

var gun = {
	'bullets': 20,
	'clipSize': 20,
	'reloadTime': 1200,
	'shotDelay': 0,
	'shotDelayMax': 5,
}

var points = 0;

function increaseValue(over) {
	var last = wraith.wraithies.length;
	wraith.wraithies[last] = new Wraithie(last, over);
	moveWraithie(wraith.wraithies[last]);
	update();
}
function resetVariables() {

}
function saveGame() {
	localStorage.setItem('wraith', JSON.stringify(wraith));
	notification('Game Saved');
}
function Wraithie(id, shape) {
	var dif = Math.floor(wraith.difficulty);
	this.hp = 1 + dif;
	this.x = 0;
	this.y = rand(0, SCREEN_HEIGHT);
	this.z = 2;
	this.id = id;
	this.condition = '';
	this.speed = 1 + dif;

	this.shape = [];
	for (var y = 0; y < 20; y++) {
		this.shape[y] = [];
		for (var x =  0; x < 20; x++) {
			var addShape = 'wraithie_void'

			this.shape[y][x] = addShape;
		}
	}
	//Add eyes
	var estart = 0;
	var efinish = 2;
	this.shape[10][estart] = 'wraithie_eye';
	this.shape[10][efinish] = 'wraithie_eye';

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

	var el = document.createElement('div');
	el.innerHTML = drawWraithie(this, this.id);
	el.className = 'wraithie';
	this.element = el;
	doc('wraithy').appendChild(this.element);
}
function tickWraithies(force) {
	if (!wraith.wraithies) wraith.wraithies = [];

	var r = read(wraith.wraithies);
	if (r) tickWraithie(r);

	if (!force) return;
	for (var tw in wraith.wraithies) {
		var wth = wraith.wraithies[tw];

		tickWraithie(wth);
	}
}
function regenerateWraithie(wth, id) {
	var el = document.createElement('div');
	if (!wth) return;
	el.innerHTML = drawWraithie(wth, wth.id);
	el.className = 'wraithie';
	wth.element = el;
	doc('wraithy').appendChild(wth.element);

	moveWraithie(wth);
}
function tickWraithie(wth) {
	if (!wth) return;
	moveWraithie(wth);
	if (!isArrayClean(wth.shape, 'wraithie_flesh')) {
		wth.shape = expandArray(wth.shape, 'wraithie_void');
		infectAll(wth.shape);
		var changed = drawWraithie(wth, wth.id, true);
		if (changed) wth.element.innerHTML = drawWraithie(wth, wth.id);
	}
}
function moveWraithie(wraithie) {
	var width = wraithie.shape[0].length;
	var height = wraithie.shape.length;

	var max = PIXEL_SIZE * wraithie.speed;

	wraithie.x += rand(-1, max);

	if (wraithie.y > (SCREEN_HEIGHT * 0.8)) wraithie.y--;
	if (wraithie.y < (SCREEN_HEIGHT * 0.8)) wraithie.y++;

	if (wraithie.x <= 0) wraithie.x = 0;
	if (wraithie.y <= 0) wraithie.y = 0;

	var realX = wraithie.x + width;
	var realY = wraithie.y + height;

	if (realX >= (SCREEN_WIDTH * 0.8)) wraithie.x = Math.floor(SCREEN_WIDTH * 0.8);
	if (realY >= (SCREEN_HEIGHT * 0.8)) wraithie.y = Math.floor(SCREEN_HEIGHT * 0.8);


	if (!wraithie.x) wraithie.x = 0;
	if (!wraithie.y) wraithie.y = 0;
	wraithie.element.style.top = (wraithie.y * PIXEL_SIZE)+'px';
	wraithie.element.style.left = (wraithie.x * PIXEL_SIZE)+'px';

	wraithie.element.title = '(id: '+wraithie.id+') x:'+wraithie.x+' y:'+wraithie.y+' width:'+width+' height:'+height;
}
function moveTile(array, x, y, empty) {
	var rdir = read([0, 2, 4, 6]);
	if (getDirection(array, x, y, rdir) == empty && tileHere(array, x, y) == 'wraithie_body') {
		getDirection(array, x, y, rdir, tileHere(array, x, y));
		tileHere(array, x, y, empty);
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
	var cleanFirst = true;
	var cleanLast = true;
	for (var z in array) {
		if (array[z][0] != empty) {
			cleanFirst = false;
			break;
		}
	}
	for (var z in array) {
		var last = array[z].length - 1;
		if (array[z][last] != empty) {
			cleanLast = false;
			break;
		}
	}
	if (cleanFirst) {
		for (var z in array) array[z].splice(0, 1);
	}
	if (cleanLast) {
		for (var z in array) array[z].pop();
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
	if (!array || !array[y]) return;
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
function reload(force) {
	if (gun.bullets < gun.clipSize && !force && !gun.reloading) {
		gun.reloading = true;
		playSound(snd_reload);
	}
	if (force) {
		gun.bullets = gun.clipSize;
		gun.reloading = false;
	}
}
function ammoUpdate() {
	soundButton.className = (soundEnabled) ? 'nosound' : 'sound';
	ammoTopBar.className = 'topbar';
	if (gun.bullets <= 0) ammoTopBar.className += ' outOfAmmo';
	if (gun.reloading) ammoTopBar.className += ' shooting';
}
function checkShoot(x, y) {
	ammoUpdate();
	gun.shotDelay--;
	if (gun.reloading) return;

	var cx = Math.floor((cursorX - 32) / PIXEL_SIZE);
	var cy = Math.floor((cursorY - 32) / PIXEL_SIZE);

	var x = cx;
	var y = cy;

	if (gun.bullets <= 0) {
		playSound(snd_oom);
		return;
	}
	gun.bullets--;
	shotHere(x, y);
	for (var cw in wraith.wraithies) {
		var wth = wraith.wraithies[cw];
		var dim = getWraithDimensions(wth);

		var minx = Math.floor(wth.x);
		var maxx = Math.floor(minx + dim.width);

		var miny = Math.floor(wth.y);
		var maxy = Math.floor(miny + dim.height);

		if (cx >= minx && cx <= maxx) {
			if (cy >= miny && cy <= maxy) {
				var wx = cx - minx;
				var wy = cy - miny;

				var s = shoot(cw, wx, wy);
				if (s) pointsHere(x, y, s);
			}
		}
		else {
			playSound(snd_miss);
		}
	}
}
function playSound(sound, timeStretch) {
	if (!soundEnabled) return;
	if (!timeStretch) timeStretch = 1;
	if (timeStretch < 0.5) timeStretch = 0.5;
	sound.playbackRate = timeStretch;
	sound.pause();
	sound.currentTime = 0;
	sound.play();
}
function getWraithDimensions(wth) {
	var width = wth.shape[0].length;
	var height = wth.shape.length;

	return {
		'width': width,
		'height': height,
	}
}
function shotHere(x, y) {
	var el = document.createElement('shot');
	var ww = (rand(12, 25) / 10) * PIXEL_SIZE;
	var hh = (rand(12, 25) / 10) * PIXEL_SIZE;

	el.style.top = ((y * PIXEL_SIZE) - (hh / 2))+'px';
	el.style.left = ((x * PIXEL_SIZE) - (ww / 2))+'px';

	el.style.width = ww+'px';
	el.style.height = hh+'px';
	el.style.transform = 'rotate('+rand(0, 360)+'deg)';

	doc('wraithy').appendChild(el);
	setTimeout(function() {
		el.style.width = (ww * 2)+'px';
		el.style.height = (hh * 2)+'px';

		el.style.top = ((y * PIXEL_SIZE) - (hh))+'px';
		el.style.left = ((x * PIXEL_SIZE) - (ww))+'px';

		el.style.transform = 'rotate('+rand(0, 360)+'deg)';
	}, 50);
	$(el).fadeOut(400);
	setTimeout(function() {
		doc('wraithy').removeChild(el);
	}, 400);
}
function pointsHere(x, y, message) {
	var el = document.createElement('points');

	var initTop = ((y * PIXEL_SIZE));

	el.style.top = initTop+'px';
	el.style.left = ((x * PIXEL_SIZE))+'px';

	el.innerHTML = '+'+message;

	doc('wraithy').appendChild(el);
	setTimeout(function() {
		el.style.top = (initTop - (PIXEL_SIZE * 3))+'px';
	}, 50);

	setTimeout(function() {
		$(el).fadeOut(800);
		doc('wraithy').removeChild(el);
	}, 800);
}
function shoot(wraithID, x, y) {
	var w = wraith.wraithies[wraithID];
	if (!w) return 'is dead';
	var h = tileHere(w.shape, x, y);
	var sur = getSurroundings(w.shape, x, y);
	playSound(snd_miss, 0.8);
	if (h == 'wraithie_body' || h == 'wraithie_mouth' || h == 'wraithie_eye') {
		console.log('Shot sucesfull!');
		w.hp -= 1;
		if (h == 'wraithie_body') tileHere(w.shape, x, y, 'wraithie_void');
		if (w.hp <= 0) {

			var dimensions = getWraithDimensions(w);
			var size = dimensions.width + dimensions.height;
			points += size;
			wraith.difficulty += (size / 1000);

			var mm = 16 / size;

			playSound(snd_kill, mm);

			killWraithie(wraithID);
			return size;
		}
		else {
		}
	}
	playSound(snd_hit);
	update();
}
function killWraithie(wraithID) {
	var wth = wraith.wraithies[wraithID];
	if (!wth) return;
	if (wth.element && wth.element.parentNode) doc('wraithy').removeChild(wth.element);
	wraith.wraithies.splice(wraithID, 1);

	for (var kw in wraith.wraithies) wraith.wraithies[kw].id = kw;
}
function drawWraithie(wraithie, wraithID, peek) {
	var pixelSize = PIXEL_SIZE;
	if (!wraithie) return;
	var s = wraithie.shape;

	var condition = s.join('').replace(new RegExp('wraithie_', 'g'), '');
	if (condition == wraithie.condition && peek) return false;
	if (peek) return true;
	wraithie.condition = condition;

	var l = '';
	for (var y in s) {
		for (var x in s[y]) {
			var extra = '';
			var mou = 1;
			if (s[y][x] == 'wraithie_mouth') mou = 2;
			if (s[y][x] == 'wraithie_body') extra = 'transform: rotate('+rand(0,360)+'deg) scale('+(rand(100, 200) / 100)+'); '+randomBorder();
			l += '<div style="top: '+(y * pixelSize)+'px; left: '+(x * pixelSize)+'px;'+
			'width: '+pixelSize+'px; height: '+(pixelSize * mou)+'px; '+extra+'"'+
			' class="wraithie_part '+
			s[y][x]+
			'"></div>';
		}
	}
	l += '';
	return l;
}
function loadGame() {
	var losto = localStorage.getItem('wraith');
	if (!losto) return;
	wraith = JSON.parse(losto);
	if (!wraith.difficulty) wraith.difficulty = 0;
	for (var w in wraith.wraithies) regenerateWraithie(wraith.wraithies[w], w);
	notification('Game Loaded');
}
function update(step) {
	if (!wraith.difficulty) wraith.difficulty = 0;
	var dif = wraith.difficulty;
	var v1 = Math.ceil(255 / (dif * 16));
	var v2 = Math.ceil(255 / (dif * 8));
	var v3 = Math.ceil(255 / (dif * 4));
	var v4 = Math.ceil(255 / (dif * 2));

	if (v1 > 255) v1 = 255;
	if (v2 > 255) v2 = 255;
	if (v3 > 255) v3 = 255;
	if (v4 > 255) v4 = 255;

	console.log(v1, v2, v3, v4, 'v1v2v3v4');

	var c1 = 'rgb(0, '+v1+', '+v3+')';
	var c2 = 'rgb(0, '+v2+', '+v4+')';

	doc('gameWindow').style.background = 'linear-gradient('+c1+', '+c2+')';

	ammoUpdate();
	tickWraithies();
	updateReload();

	document.title = gameInfo.name+' '+gameInfo.version;
}
function addWraithies() {
	if (!rand(0,1)) return;
	if (wraith.wraithies.length >= 10) return;
	increaseValue();
}
function updatePoints() {
	if (points > 0) {
		var min = Math.floor(points / 10);
		if (min < 1) min = 1;
		if (min > points) min = points;
		points -= min;
		wraith.points += min;

		points = Math.floor(points);
		wraith.points = Math.floor(wraith.points);
	}

	if (!wraith.points) wraith.points = 0;
	pointsTopBar.innerHTML = wraith.points+' '+translate('puntos|points');

	var r = read($('.wraithie_body'));
	if (!r) return;
	var min = PIXEL_SIZE / 2;
	var max = PIXEL_SIZE * 2;
	r.style.transform = 'rotate('+rand(0, 360)+'deg) scale('+(rand(100, 200) / 100)+')';
	r.style.borderRadius = rand(0, 100)+'% '+rand(0, 100)+'% '+rand(0, 100)+'% '+rand(0, 100)+'%';

}
function updateReload() {
	if (gun.reloading) {
		gun.bullets++;
		if (gun.bullets > gun.clipSize) {
			gun.bullets = gun.clipSize;
			gun.reloading = false;
		}

	}

	var c = '';
	for (var e = 0; e < gun.clipSize; e++) {
		var aex = '';
		if (e >= gun.bullets) aex = 'ammoDepleted';
		c += '<div class="ammo '+aex+'"></div>';
	}
	ammoTopBar.style.height = (gun.clipSize * 12)+'px';
	ammoTopBar.innerHTML = c;
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
var tt = setInterval(update, 400);
var ttt = setInterval(addWraithies, 4000);
var tttt = setInterval(updatePoints, 60);
var ttttt = setInterval(updateReload, 100);