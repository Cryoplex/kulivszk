var people = [];

function spawn(type) {
	var types = ['zombie', 'assZombie', 'fatZombie'];
	if (!type) type = read(types);
	people[people.length] = new guy(type);
}
function guy(type) {
	this.posX = 1024;
	this.posY = rand(0,192);
	this.hp = 100;
	this.element = document.createElement('div');
	this.element.className = type;
	this.speed = stats(type);
	this.targeting = rand(0,1);
	if (this.speed < 0) this.posX = 0;
	doc('battlefield').appendChild(this.element);
}
function kill(id) {
	doc('battlefield').removeChild(people[id].element);
	people.splice(id, 1);
}
function damage(id, qty) {
	people[id].hp -= qty;
	if (people[id].hp <= 0) kill(id);
}
function stats(type) {
	return {
		'zombie': 1,
		'assZombie': 2,
		'fatZombie': 0,
		'player': -1,
		'companion': -1,
	}[type];
}
function moveThisGuy(id, direction) {
	var thisGuy = people[id]
	var speed = thisGuy.speed + rand(0,5);
	if (thisGuy.posX < 0) direction = 1;
	var len = speed * direction;
	if (thisGuy.speed >= 0) thisGuy.posX += len;
	if (thisGuy.speed >= 0) {
		var target = people[thisGuy.targeting];
		var search = rand(0,1);
		if (target.posY > thisGuy.posY && search) {
			thisGuy.posY += rand(0,1);
		}
		else {
			thisGuy.posY -= rand(0,1);
		}
	}
	else {
		thisGuy.posY += rand(0,speed);
		thisGuy.posY -= rand(0,speed);
	}
	if (id > 1) {
		if (collide(id, 0)) {
			damage(0, 1); damage(id, 1);
		}
		if (collide(id, 1)) {
			damage(1, 1); damage(id, 1);
		}
	}
}
function moveAll() {
	for (y in people) moveThisGuy(y, -1);
}
function getPositions() {
	moveAll();

	var loc = pos('battlefield');
	for (x in people) {
		var g = people[x];
		var el = people[x].element;
		el.style.left = loc[0]+g.posX+'px';
		el.style.top = loc[1]+g.posY+'px';
		el.innerHTML = g.hp;
	}
}
function collide(from, to) {
	from = people[from];
	to = people[to];
	var fromW = Number(from.element.offsetWidth);
	var fromH = Number(from.element.offsetHeight);

	var testX = (to.posX >= from.posX && to.posX <= from.posX+fromW);
	var testY = (to.posY >= from.posY && to.posY <= from.posY+fromH);

	return testX && testY;
}

var t = setInterval(getPositions, 100);
var t2 = setInterval(spawn, 1500);
spawn('player');
spawn('companion');