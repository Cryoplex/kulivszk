var maggot = {
	'list': [],
	'population': {
		'egg': 0,
		'maggot': 0,
		'pupa': 0,
		'fly': 0,
		'total': 0,
	}
};

var maxFood = 100;
var tickMul = 5;

function maggotCare() {
	containerMap.style.display = 'none';
	sship.style.display = 'none';
	maggotMap.style.display = 'block';
}
function deleteBicho(bicho) {
	var ix = maggot.list.indexOf(bicho);
	if (ix < 0) return;
	var el = 'bicho_'+bicho.id;
	var doccy = doc('maggotMap');
	doccy.removeChild(doc(el));
	maggot.population[bicho.type]--;
	maggot.population.total--;

	maggot.list.splice(ix, 1);

}
function getPopulation() {
	var popz = maggot.population
	return popz.total+' ('+popz.egg+' eggs, '+popz.maggot+' maggots, '+popz.pupa+' pupas, '+popz.fly+' flies)';
}
function updateMaggotInfo() {
	var mi = getPopulation()+'<hr>';
	for (var m in maggot.list) {
		mi += '<br>';
		var mg = maggot.list[m];
		mi += mg.type+' '+mg.minutesToGrow+'t/g '+realDrawBar((mg.health * 1000), 10000)+' ('+round(mg.food)+'f) ['+mg.minutesForBirth+'m/b]';
	}
	maggotInfo.innerHTML = mi;
}
function tickAllBichos() {
	var flies = [];
	for (var b in maggot.list) {
		var bicho = maggot.list[b];
		bicho.food += (maxFood / maggot.list.length);
		bicho.eat();
		if (bicho.type == 'fly') {
			flies.push(bicho);
			bicho.giveBirth();
		}
		else {
			bicho.minutesToGrow -= 1 * tickMul;
			if (bicho.minutesToGrow <= 0) {
				if (bicho.type == 'egg') {
					if (rand(0,1)) addBicho('maggot', bicho);
					deleteBicho(bicho);
					return;
				}
				if (bicho.type == 'maggot') {
					if (rand(0,1)) addBicho('pupa', bicho);
					deleteBicho(bicho);
					return;
				}
				if (bicho.type == 'pupa') {
					if (rand(0,1)) addBicho('fly', bicho);
					deleteBicho(bicho);
					return;
				}
			}
		}
		//Move bicho
		if (bicho.type == 'maggot') {
			bicho.rot += rand(-1, 1);
			if (bicho.rot > 360) bicho.rot = 0;
			bicho.x += rand(-1, 1);
			bicho.y += rand(-1, 1);
			if (bicho.x < 0) bicho.x = 0;
			if (bicho.y < 0) bicho.y = 0;
			if (bicho.x > 640) bicho.x = 640;
			if (bicho.y > 480) bicho.y = 480;
		}
		if (bicho.type == 'fly') {
			if (bicho.targetx < 320) bicho.x -= rand(10, 15);
			if (bicho.targetx > 320) bicho.x += rand(10, 15);
			if (bicho.y < bicho.targety) bicho.y += rand(1,2);
			if (bicho.y > bicho.targety) bicho.y -= rand(1,2);

			if (bicho.rot < bicho.turn) bicho.rot += 30;
			if (bicho.rot > bicho.turn) bicho.rot -= 30;
			if (bicho.rot > 360) bicho.rot = 0;

			if (bicho.x > 560) {
				bicho.targetx = 64;
				bicho.turn = 270;
			}
			if (bicho.x < 70) {
				bicho.targetx = 576;
				bicho.turn = 90;
			}
			if (bicho.y > (bicho.targety - 10) && bicho.y < (bicho.targety + 10)) bicho.targety = rand(160, 320);
		}

		updateBicho(bicho);
	}
	var adam = false;
	var eve = false;
	for (var f in flies) {
		var fly = flies[f];
		if (fly.gender == 0) adam = fly;
		if (fly.gender == 1 && !fly.pregnant) eve = fly;
		if (adam && eve) break;
	}
	if (adam && eve) {
		console.log('Adam and Eve exist');
		eve.getPregnant();
	}
}
function addBicho(type, parent) {
	if (type == 'egg') {
		maggot.list.push(new Egg(parent));
	}
	if (type == 'maggot') {
		maggot.list.push(new Maggot(parent));
	}
	if (type == 'pupa') {
		maggot.list.push(new Pupa(parent));
	}
	if (type == 'fly') {
		maggot.list.push(new Fly(parent));
	}
	maggot.population[type]++;
	maggot.population.total++;
}
function createBicho(bicho) {
	var l = '<div class="bicho '+bicho.type+'" id="bicho_'+bicho.id+'" style="transform: rotate('+bicho.rot+'deg); position: absolute; top: '+bicho.y+'px; left: '+bicho.x+'px"></div>';
	maggotMap.innerHTML += l;
}
function updateBicho(bicho) {
	var name = 'bicho_'+bicho.id;
	var ex = '';
	if (bicho.type == 'fly') ex = 'flying';
	doc(name).className = 'bicho '+bicho.type+' '+ex;
	doc(name).style.top = bicho.y+'px';
	doc(name).style.left = bicho.x+'px';
	doc(name).style.transform = 'rotate('+bicho.rot+'deg)';
}
function bichoID() {
	return rand(0, Number.MAX_SAFE_INTEGER);
}
function Egg(parent) {
	if (!parent) parent = {'x': 320, 'y': 240, 'food': 10};
	this.minutesToGrow = rand(384, 1152);
	this.food = 10;
	this.health = 10;
	this.type = 'egg';
	this.x = parent.x + rand(-5, 5);
	this.y = parent.y + rand(-5, 5);
	this.rot = rand(0, 360);
	this.id = bichoID();

	this.eat = function() {
		this.food -= (0.001 * tickMul);
		var mul = Math.abs(this.food) * 1;
		if (this.food < 0) this.health -= (mul * tickMul);
		if (this.health < 0 && this.food < 0 && rand(1,5) == 1) this.die();
	}
	this.die = function() {
		deleteBicho(this);
	}

	createBicho(this);
}
function Maggot(parent) {
	if (!parent) parent = {'x': 320, 'y': 240, 'food': 10};
	this.minutesToGrow = rand(3686, 6451);
	this.food = parent.food;
	this.health = 10;
	this.type = 'maggot';
	this.x = parent.x + rand(-5, 5);
	this.y = parent.y + rand(-5, 5);
	this.rot = rand(0, 360);
	this.id = bichoID();

	this.eat = function() {
		this.food -= (0.01 * tickMul);
		var mul = Math.abs(this.food) * 0.1;
		if (this.food < 0) this.health -= (mul * tickMul);
		if (this.health < 0 && this.food < 0 && rand(1,5) == 1) this.die();
	}
	this.die = function() {
		deleteBicho(this);
	}

	createBicho(this);
}
function Pupa(parent) {
	if (!parent) parent = {'x': 320, 'y': 240, 'food': 10};
	this.minutesToGrow = rand(7372, 14745);
	this.food = parent.food;
	this.health = 10;
	this.type = 'pupa';
	this.x = parent.x + rand(-5, 5);
	this.y = parent.y + rand(-5, 5);
	this.rot = rand(0, 360);
	this.id = bichoID();

	this.eat = function() {
		this.food -= (0.1 * tickMul);
		var mul = Math.abs(this.food) * 0.01;
		if (this.food < 0) this.health -= (mul * tickMul);
		if (this.health < 0 && this.food < 0 && rand(1,5) == 1) this.die();
	}
	this.die = function() {
		deleteBicho(this);
	}

	createBicho(this);
}
function Fly(parent) {
	if (!parent) parent = {'x': 320, 'y': 240, 'food': 10};
	this.age = 0;
	this.gender = rand(0,1);
	this.maxEggs = rand(100, 250);
	this.pregnant = false;
	this.sterile = false;

	this.minutesToGrow = 0;

	this.type = 'fly';

	this.minutesForBirth = 0;
	this.food = parent.food;
	this.health = 10;
	this.x = parent.x + rand(-5, 5);
	this.y = parent.y + rand(-5, 5);
	this.rot = rand(0, 360);
	this.id = bichoID();

	this.targetx = 64;
	this.targety = rand(160, 320);
	this.turn = 0;

	this.getPregnant = function() {
		if (this.pregnant == false) {
			console.log('Is now pregnant.');
			this.pregnant = true;
			this.minutesForBirth = rand(1200, 2000);
			console.log('Max eggs: '+this.maxEggs);
		}
	}
	this.giveBirth = function() {
		if (this.gender == 1 && this.pregnant == true) {
			if (this.minutesForBirth <= 0) {
				this.pregnant = false;
				this.layEggs();
				if (this.maxEggs <= 0) this.sterile = true;
			}
			else {
				this.minutesForBirth -= tickMul
			}
		}
	}
	this.layEggs = function() {
		var qty = rand(15, 40);
		this.maxEggs -= qty;
		for (var e = 0; e < qty; e++) addBicho('egg', this);
	}

	this.eat = function() {
		this.food -= 1 * tickMul;
		var mul = Math.abs(this.food) * 0.001;
		if (this.food < 0) this.health -= (mul * tickMul);
		if (this.health < 0 && this.food < 0 && rand(1,5) == 1) this.die();
	}
	this.die = function() {
		deleteBicho(this);
	}

	createBicho(this);
}

setInterval(tickAllBichos, 20);
setInterval(updateMaggotInfo, 100);