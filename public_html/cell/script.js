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
function drawCell(generation, strain, mutation) {
	var l = 'cell_g'+generation+'_s'+strain+'_m'+mutation;
	return '<i class="cell '+l+'"></i>';
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
	}
	this.father = {
		'generation': father.generation,
		'strain': father.strain,
		'mutation': father.mutation,
		'posX': father.posX,
		'posY': father.posY,
		'size': father.size,
		'energy': father.energy,
	}

	var nuGen = newGeneration(father);

	this.generation = nuGen.generation;
	this.strain = nuGen.strain;
	this.mutation = nuGen.mutation;
	this.speed = 1;
	this.age = 1;
	this.posX = this.father.posX;
	this.posY = this.father.posY;
	this.motionX = red(-1, 1) * Math.random();
	this.motionY = red(-1, 1) * Math.random();
	this.rot = rand(0, 360);
	this.size = 1 + (father.size / 10);
	this.hue = father.hue + rand(-10, 10);
	this.energy = father.energy / 2;
	this.lastEnergy = 0;

	this.element = document.createElement('span');
	this.element.className = 'cell cell_g'+this.generation+'_s'+this.strain+'_m'+this.mutation;
	this.element.style.top = this.posY+'px';
	this.element.style.left = this.posX+'px';
	this.element.style.zoom = 2;
	this.element.style.transform = 'rotate('+this.rot+'deg)';
	//this.element.style.webkitFilter = 'hue-rotate('+this.hue+'deg)';

	doc('gaem').appendChild(this.element);
}
function tickAllBacteria() {
	if (!rand(0,1000)) cell.bacterias.push(new Bacteria());
	tickBacteria(cell.bacterias[checkin], checkin);
	checkin++;
	if (checkin >= cell.bacterias.length) checkin = 0;

	bacteriaRespiration();
}
function updateHUD() {
	game_value.innerHTML = 'Bacterias vivas: '+cell.bacterias.length+'<br>O<sub>2</sub>: '+Math.floor(o2)+'<br>CO<sub>2</sub>: '+Math.floor(co2);

	for (var yy = 0; yy < cell.bacterias.length; yy++) {
		var bk = cell.bacterias[yy];
		if (bk) {
			var ex = (bk.energy < bk.lastEnergy) ? 'red' : 'normal';
			game_value.innerHTML += '<br><small class="'+ex+'">bacteria ('+getType(bk)+'): '+yy+' age: '+shortNum(bk.age)+'  energy: '+shortNum(bk.energy)+'</small>';
		}
	}
}
function bacteriaRespiration() {
	for (var r in cell.bacterias) {
		var bac = cell.bacterias[r];
		if (!bac.energy) bac.energy = 1;
		var type = getType(bac);

		var consume = (bac.age / 10);
		var breath = 1;
		bac.lastEnergy = bac.energy;
		bac.energy -= consume;
		if (type == 'plant') {
			if (co2 < breath || bac.energy <= 0) {
				if (bac.energy <= 0) {
					killBacteria(r);
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
	var father = cell.bacterias[bactID];
	cell.bacterias.push(new Bacteria(father));
	cell.bacterias.push(new Bacteria(father));
	
	killBacteria(bactID);
}
function killBacteria(bactID) {
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
	bact.rot += red(-1, 1);
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
		bact.element = document.createElement('span');
		doc('gaem').appendChild(bact.element);
	}
	elem.className = 'cell cell_g'+bact.generation+'_s'+bact.strain+'_m'+bact.mutation;
	elem.style.top = (bact.posY - 9)+'px';
	elem.style.left = (bact.posX - 9)+'px';
	elem.style.zoom = 2;
	elem.style.transform = 'rotate('+bact.rot+'deg)';
	elem.style.webkitFilter = 'hue-rotate('+bact.hue+'deg)';

	if (bact.age > 2 && !rand(0,10)) splitBacteria(bactID);
}

var cell = {};
var o2 = 2500;
var co2 = 2500;
var checkin = 0;

loadGame();
resetVariables();
setInterval(tickAllBacteria, 10);
setInterval(updateHUD, 100);

var t = setInterval(saveGame, 60000);