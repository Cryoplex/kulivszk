var genlist = [
[[0]], //Generation 0
[[1]], //Generation 1
[[1]], //Generation 2
[[2]], //Generation 3
[[3], [3]], //Generation 4
[[3], [5], [1], [1], [1], [1]], //Generation 5
];

function increaseValue(num) {
	cell.value += num;
	update('game_value');
}
function resetVariables() {
	if (!cell.value) cell.value = 0;
	if (!cell.bacterias) cell.bacterias = [new Bacteria(), new Bacteria];
	if (cell.money == undefined) cell.money = 1000;
}
function saveGame() {
	localStorage.setItem('cell', JSON.stringify(cell));
	notification('Game Saved');
}
function loadGame() {
	var losto = localStorage.getItem('cell');
	if (!losto) return;
	cell = JSON.parse(losto);
	notification('Game Loaded');
}
function update(step) {
	if (step == 'game_value' || !step) doc('game_value').innerHTML = shortNum(cell.value);
}
function nextGeneration(generation, strain, mutation) {
	if (!genlist[generation + 1]) generation--;
	var nextgen = genlist[generation + 1];

	if (!nextgen[strain]) strain = 0;
	var nextstrain = nextgen[strain];

	if (nextstrain[0] < mutation) mutation = 0;

	return nextgen;
}
function Bacteria(father) {
	if (!father) father = {
		'generation': 1,
		'strain': 0,
		'mutation': 0,
		'posX': rand(0, 320),
		'posY': rand(0, 240),
		'size': 1,
		'hue': rand(0, 360),
		'energy': 1,
		'body': createBody(5, 5),
		'shape': randomShape(),
	}
	this.father = {
		'generation': father.generation,
		'strain': father.strain,
		'mutation': father.mutation,
		'posX': father.posX,
		'posY': father.posY,
		'size': father.size,
		'energy': father.energy,
		'body': father.body,
		'shape': father.shape,
	}

	var nuGen = newGeneration(father);

	this.generation = father.generation + 1;
	this.strain = nuGen.strain;
	this.mutation = nuGen.mutation;
	this.speed = 1;
	this.age = 1;
	this.posX = this.father.posX;
	this.posY = this.father.posY;
	this.motionX = red(-1, 1) * Math.random();
	this.motionY = red(-1, 1) * Math.random();
	//this.rot = rand(0, 360);
	this.size = 1 + (father.size / 10);
	this.hue = father.hue + rand(-10, 10);
	this.energy = father.energy / 2;
	this.lastEnergy = 0;

	this.shape = father.shape;
	this.body = evolveBody(father.body, randomShape());

	this.element = document.createElement('cell');
	this.element.innerHTML = drawBody(this.body, this.hue);

	this.element.style.top = this.posY+'px';
	this.element.style.left = this.posX+'px';

	doc('gaem').appendChild(this.element);
}
function addBacteria() {
	cell.bacterias.push(new Bacteria());
}
function tickAllBacteria() {
	bacteriaRespiration();
}
function buyFood(type) {
	if (cell.money < 25) return;
	cell.money -= 25;
	if (type == 'o2') o2 += 100;
	if (type == 'co2') co2 += 150;
}
function updateHUD() {
	game_value.innerHTML = 'Dinero: $'+shortNum(cell.money)+'<br>Bacterias vivas: '+cell.bacterias.length+'<br><input type="button" onclick="buyFood(\'o2\')" value="+"> O<sub>2</sub>: '+Math.floor(o2)+'<br><input type="button" onclick="buyFood(\'co2\')" value="+"> CO<sub>2</sub>: '+Math.floor(co2);

	for (var yy = 0; yy < cell.bacterias.length; yy++) {
		var bk = cell.bacterias[yy];
		if (bk) {
			var ex = (bk.energy < bk.lastEnergy) ? 'red' : 'normal';
			var ex2 = (ex == 'red') ? 'starving' : 'healthy';
			var repStatus = canReproduce(bk);
			if (repStatus.status == 'yes') {
				repStatus = realDrawBar(100, 100);
			}
			else {
				repStatus = realDrawBar(repStatus.needed, 100);
			}

			game_value.innerHTML += '<br><small class="'+ex+'">#'+yy.toString(36).toUpperCase()+' a'+bk.age.toFixed(3)+'/🗲'+bk.energy.toFixed(3)+'/✚'+ex2+'/☠'+canDie(bk)+' '+repStatus+'</small>';
		}
	}
}
function bacteriaRespiration() {
	for (var r in cell.bacterias) {
		tickBacteria(cell.bacterias[r], r);

		var bac = cell.bacterias[r];
		if (!bac.energy) bac.energy = 1;
		var type = getType(bac);

		var consume = (bac.age / 10) + (bac.generation / 100);
		var breath = 1;
		bac.lastEnergy = bac.energy;
		bac.energy -= consume;
		if (type == 'plant') {
			if (co2 < breath || bac.energy <= 0) {
				if (bac.energy <= 0) {
					killBacteria(r);tickAll
					return;
				}
			}
			else {
				o2 += breath;
				co2 -= breath;
				bac.energy += breath;
			}

		}
		if (type != 'plant') {
			if (o2 < breath || bac.energy <= 0) {
				if (bac.energy <= 0) {
					killBacteria(r);
					return;
				}
			}
			else {
				o2 -= breath;
				co2 += breath;
				bac.energy += breath;
			}
		}
	}
}
function child(bact) {
	return new Bacteria(bact);
}
function getType(bact) {
	if (bact.hue < 120) {
		return 'plant';
	}
	if (bact.hue >= 120) {
		return 'nonplant';
	}
}
function splitBacteria(bactID) {
	var father = clone(cell.bacterias[bactID]);
	cell.bacterias.push(new Bacteria(clone(father)));
	cell.bacterias.push(new Bacteria(clone(father)));
	
	killBacteria(bactID, true);
}
function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}
function getBacteriaValue(bacteria) {
	var val = 0;
	if (bacteria.generation > 0) val += bacteria.generation;
	if (bacteria.age > 0) val += bacteria.age;
	val += 1;
	val *= 4.875;

	return Math.floor(val);
}
function killBacteria(bactID) {
	var val = getBacteriaValue(cell.bacterias[bactID]);
	cell.money += val;

	doc('gaem').removeChild(cell.bacterias[bactID].element);
	cell.bacterias.splice(bactID, 1);
}
function changeMotion(obj) {
	obj.motionX = red(-1, 1) * Math.random();
	obj.motionY = red(-1, 1) * Math.random();
}
function newGeneration(bact) {
	var gen = bact.generation;
	var strain = bact.strain;
	var mutation = bact.mutation;

	var newGen = gen + rand(0,1);
	if (!genlist[newGen]) newGen = gen;
	var newStrain = rand(0, (genlist[newGen].length - 1));
	var mutation = rand(0, genlist[newGen][newStrain]);

	return {
		'generation': newGen,
		'strain': newStrain,
		'mutation': mutation,
	}
}
function tickBacteria(bact, bactID) {
	if (!bact) return;
	bact.age += 0.01;
	bact.rot += red(-0.5, 0.5);
	bact.posX += bact.motionX * rand(0, bact.speed);
	bact.posY += bact.motionY * rand(0, bact.speed);

	if (bact.posX > 320) {
		bact.posX = 320;
		if (bact.motionX > 0) changeMotion(bact);
	}
	if (bact.posX < 0) {
		bact.posX = 0;
		if (bact.motionX < 0) changeMotion(bact);
	}

	if (bact.posY > 240) {
		bact.posY = 240;
		if (bact.motionY > 0) changeMotion(bact);
	}
	if (bact.posY < 0) {
		bact.posY = 0;
		if (bact.motionY < 0) changeMotion(bact);
	}

	var elem = bact.element;

	if (!elem.style) {
		bact.element = document.createElement('cell');
		doc('gaem').appendChild(bact.element);
	}
	if (!elem.innerHTML) elem.innerHTML = drawBody(bact.body, bact.hue);
	elem.style.top = (bact.posY)+'px';
	elem.style.left = (bact.posX)+'px';

	if (canDie(bact) && !rand(0,20)) killBacteria(bactID);
	if (canReproduce(bact).status == 'yes' && !rand(0,20)) splitBacteria(bactID);
}
function canDie(bacteria) {
	if (bacteria.age > 15) return true;
	return false;
}
function canReproduce(bacteria) {
	var energyToReproduce = (50 * bacteria.generation);
	var ageToReproduce = 5;
	if (bacteria.energy >= energyToReproduce && bacteria.age >= ageToReproduce) return {'status': 'yes'};
	if (bacteria.energy < energyToReproduce || bacteria.age < ageToReproduce) {
		var agep = bacteria.age / ageToReproduce;
		var energyp = bacteria.energy / energyToReproduce;
		var totalp = (agep * energyp) * 100;
		if (totalp > 100) totalp = 100;
		return {'status': 'no', 'needed': totalp};
	}
}

var cell = {};
var o2 = 100;
var co2 = 100;
var checkin = 0;

loadGame();
resetVariables();
setInterval(tickAllBacteria, 200);
setInterval(updateHUD, 500);

var t = setInterval(saveGame, 60000);