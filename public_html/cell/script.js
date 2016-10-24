var MAX_AGE = 30;
var MILLISECONDS_PER_FRAME = 20;
var MAP_WIDTH = 640;
var MAP_HEIGHT = 480;
var STARTING_ENERGY = 50;
var STARTING_BACTERIA = 15;

function increaseValue(num) {
	cell.value += num;
	update('game_value');
}
function resetVariables() {
	if (!cell.value) cell.value = 0;
	if (!cell.bacterias) {
		cell.bacterias = [];
		for (var c = 0; c < STARTING_BACTERIA; c++) cell.bacterias.push(new Bacteria());
	}
	if (!cell.lastPopulation) cell.lastPopulation = 0;
	if (cell.selected == undefined) cell.selected = 0;
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
function nextGeneration(generation) {
	return generation + 1;
}
function generateStats() {
	return {
		'attack': 0,
		'defense': 0,
		'speed': 0,
		'fert': 0,
		'regen': 0,
	}
}
function mutateStats(statObject) {
	var stats = ['attack', 'defense', 'speed', 'fert', 'regen'];
	statObject[read(stats)]++;
	return statObject;
}
function Bacteria(father, clon) {
	if (!father) father = {
		'generation': 1,
		'posX': rand(0, MAP_WIDTH),
		'posY': rand(0, MAP_HEIGHT),
		'size': 1,
		'hue': rand(0, 360),
		'energy': STARTING_ENERGY,
		'body': createBody(5, 5),
		'shape': randomShape(),
		'stats': generateStats(),
	}
	this.father = {
		'generation': father.generation,
		'posX': father.posX,
		'posY': father.posY,
		'size': father.size,
		'energy': father.energy,
		'body': father.body,
		'shape': father.shape,
		'hue': father.hue,
		'stats': father.stats,
	}
	if (father.stats == undefined) father.stats = generateStats();
	if (!clon) {
		var ngen = rand(0,1);
		this.father.generation += ngen;
		if (ngen) this.father.body = evolveBody(father.body, randomShape());
		this.father.hue = (father.hue + rand(-18, 18));
		if (ngen) this.father.stats = mutateStats(father.stats);
	}

	var nuGen = newGeneration(father);

	this.generation = this.father.generation;
	this.age = 1;
	var dist = this.generation * 4;
	this.posX = this.father.posX + rand(-dist, dist);
	this.posY = this.father.posY + rand(-dist, dist);
	this.motionX = red(-1, 1) * Math.random();
	this.motionY = red(-1, 1) * Math.random();
	//this.rot = rand(0, 360);
	this.size = this.father.size;
	this.hue = this.father.hue;
	//Debug hues
	if (this.stats.attack > this.stats.regen) this.hue = 0;
	if (this.stats.regen > this.stats.attack) this.hue = 180;

	this.energy = father.energy;
	this.lastEnergy = 0;
	this.stats = this.father.stats;

	var statTotal = 0;
	for (var s in this.stats) statTotal += this.stats[s];
	while (statTotal < this.generation) {
		console.log('Generation of this cell is '+this.generation+' but stat total is only '+statTotal);
		this.stats = mutateStats(this.stats);
		statTotal++;
	}

	this.shape = father.shape;
	this.body = this.father.body;

	this.element = document.createElement('cell');
	this.element.innerHTML = drawBody(this.body, this.hue);

	this.element.style.top = this.posY+'px';
	this.element.style.left = this.posX+'px';

	doc('gaem').appendChild(this.element);
}
function addBacteria(cloneFrom) {
	if (cloneFrom != undefined) {
		console.log('Clone mode');
		var prototype = cell.bacterias[cloneFrom];
		if (prototype != undefined) {
			cell.bacterias.push(new Bacteria(prototype, true));
			return;
		}
	}
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
function createBacteriaTable() {
	var table = '<table><tr><th title="Cell ID number">#</th>'+
	'<th title="Number of seconds this cell has been alive">Age</th>'+
	'<th title="Energy this cell has">🗲</th>'+
	'<th title="Hunger condition, if starving, energy is drained instead of gained">✚</th>'+
	'<th title="Once the energy requirement is met, reproduction begins">Reproduction progress</th>'+
	'</tr>';
	for (var b in cell.bacterias) {
		var bk = cell.bacterias[b];
		var ex = (bk.energy < bk.lastEnergy) ? 'red' : 'normal';
		var ex2 = (ex == 'red') ? 'starving' : 'healthy';
		var repStatus = canReproduce(bk);
		if (repStatus.status == 'yes') {
			repStatus = realDrawBar(100, 100, 1);
		}
		else {
			repStatus = realDrawBar(repStatus.needed, 100, 1);
		}
		table += displayBacteriaData(bk, b);
	}
	table += '</table>';

	return table;
}
function updateBacteriaData(bacteria, bacteriaID) {
	var elname = 'cell_info';
	var element = document.getElementById(elname);
	if (element == null) {
		cell.lastPopulation = -1;
		return;
	}
	var ex = displayBacteriaData(bacteria, bacteriaID, true);
	element.className = ex;
	doc('cell_id').innerHTML = bacteriaID;
	doc('cell_age').innerHTML = bacteria.age.toFixed(0);
	doc('cell_energy').innerHTML = bacteria.energy.toFixed(6);
	var ex2 = (ex == 'red') ? 'starving' : 'healthy';
	doc('cell_food').innerHTML = ex2;
	doc('cell_reproduction').innerHTML = realDrawBar(canReproduce(bacteria).needed, 100, 1);
}
function displayBacteriaData(bacteria, bacteriaID, returnEx) {
	var ex = (bacteria.energy < bacteria.lastEnergy) ? 'red' : 'normal';
	var ex2 = (ex == 'red') ? 'starving' : 'healthy';
	var repStatus = canReproduce(bacteria);
	if (repStatus.status == 'yes') {
		repStatus = realDrawBar(100, 100, 1);
	}
	else {
		repStatus = realDrawBar(repStatus.needed, 100, 1);
	}
	if (returnEx) return ex;

	var data = '<tr class="'+ex+'" id="cell_info_'+bacteriaID+'">';

	data += '<td>'+bacteriaID.toString(36).toUpperCase()+'</td>';
	data += '<td id="cell_table_field_age_'+bacteriaID+'">'+bacteria.age.toFixed(1)+'</td>';
	data += '<td id="cell_table_field_egy_'+bacteriaID+'">'+bacteria.energy.toFixed(2)+'</td>';
	data += '<td id="cell_table_field_food_'+bacteriaID+'">'+ex2+'</td>';
	data += '<td id="cell_table_field_rep_'+bacteriaID+'">'+repStatus+'</td>';

	data  += '</tr>';

	return data;
}
function updateHUD() {
	var total1 = 0;
	var total2 = 0;
	//for (var t in cell.bacterias) total2 += cell.bacterias[t].energy;
	game_value.innerHTML = 'Dinero: $'+shortNum(cell.money)+'<br>Bacterias vivas: '+cell.bacterias.length+'<br><input type="button" onclick="buyFood(\'o2\')" value="+"> O<sub>2</sub>: '+Math.floor(o2)+'<br><input type="button" onclick="buyFood(\'co2\')" value="+"> CO<sub>2</sub>: '+Math.floor(co2);

	/*
	if (cell.bacterias.length != cell.lastPopulation) {
		cell.lastPopulation = cell.bacterias.length;
		cell_table.innerHTML = createBacteriaTable();
	}
	*/
}
function bacteriaRespiration() {
	for (var r in cell.bacterias) {
		tickBacteria(cell.bacterias[r], r);

		var bac = cell.bacterias[r];
		if (bac.energy == undefined) bac.energy = 0;
		var type = getType(bac);

		var consume = (1/5000) * o2;
		var breath = consume;
		var max = cell.bacterias.length + 1;
		if (type == 'plant') {
			breath = co2 / max;
		}
		else {
			breath = o2 / max;
		}
		bac.lastEnergy = bac.energy;

		var etr = canReproduce(bac, true);
		var maxetr = (etr * 2);
		if (bac.energy >= maxetr) {
			console.log('Energy is greater than max allowed energy. Ignoring...');
			continue;
		}

		if (bac.stats.regen > 0) {
			var add = bac.stats.regen * (1/2500) * MILLISECONDS_PER_FRAME;
			if (co2 < add) add = co2;
			o2 += add;
			co2 -= add;
			bac.energy += add;
		}
		var statTotal = 0;
		for (var s in bac.stats) statTotal += bac.stats[s];
		var consume = statTotal * (1/5000) * MILLISECONDS_PER_FRAME;
		statTotal /= 10;

		//Respiration
		if (o2 < consume || bac.energy < consume) {
			killBacteria(r);
			return;
		}
		co2 += consume;
		o2 -= consume;
		bac.energy -= consume;
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
function splitBacteria(bactID, children) {
	var father = clone(cell.bacterias[bactID]);
	var energy = father.energy / children;
	father.energy = energy;

	cell.bacterias[bactID].energy = 0;

	cell.bacterias.push(new Bacteria(clone(father)));
	cell.bacterias.push(new Bacteria(clone(father)));
	
	//killBacteria(bactID, true);
}
function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}
function getBacteriaValue(bacteria) {
	var val = 0;
	if (bacteria.generation > 0) val += (bacteria.generation * 0.85);
	if (bacteria.age > MAX_AGE) val += (bacteria.age * 0.85);
	val += 1;
	val *= 4.75;

	return Math.floor(val);
}
function killBacteria(bactID) {
	var bact = cell.bacterias[bactID];
	var val = getBacteriaValue(bact);
	cell.money += (bact.energy / 10);

	doc('gaem').removeChild(bact.element);
	cell.bacterias.splice(bactID, 1);
}
function changeMotion(obj) {
	obj.motionX = red(-1, 1) * Math.random();
	obj.motionY = red(-1, 1) * Math.random();
}
function newGeneration(bact) {
	var gen = bact.generation;

	var newGen = gen + 1;

	return {
		'generation': newGen,
	}
}
function tickBacteria(bact, bactID) {
	if (!bact) return;
	bact.age += (MILLISECONDS_PER_FRAME / 1000);
	bact.rot += red(-0.5, 0.5);
	bact.posX += bact.motionX * (bact.stats.speed);
	bact.posY += bact.motionY * (bact.stats.speed);

	//Check collision with other bacteria
	if (bact.stats.attack > 0) {
		var size = bact.body.length;
		var centerX = bact.posX + (size / 2);
		var centerY = bact.posY + (size / 2);
		for (var bc in cell.bacterias) {
			var bacc = cell.bacterias[bc];
			var bsize = bacc.body.length;
			var bcenterX = bacc.posX + (bsize / 2);
			var bcenterY = bacc.posY + (bsize / 2);

			var obj1 = {'x': centerX, 'y': centerY, 'size': size};
			var obj2 = {'x': bcenterX, 'y': bcenterY, 'size': bsize};

			if (checkCollision(obj1, obj2)) {
				var attack = bact.stats.attack;
				var defense = (bacc.stats.defense + 1);
				var chances = attack / defense;
				if (Math.random() < chances) {
					var steal = 0.5;
					if (chances > 1) steal = (0.5 * chances);
					var steal = steal * bacc.energy;
					bacc.energy -= steal;
					bact.energy += steal;
				}
			}
		}
	}

	var cellsize = (bact.body.length * 4);

	var maxwidth = (MAP_WIDTH - cellsize);
	var maxheigth = (MAP_HEIGHT - cellsize);

	if (bact.posX > maxwidth) {
		bact.posX = maxwidth;
		if (bact.motionX > 0) bact.motionX *= -1;
	}
	if (bact.posX < 0) {
		bact.posX = 0;
		if (bact.motionX < 0) bact.motionX *= -1;
	}

	if (bact.posY > maxheigth) {
		bact.posY = maxheigth;
		if (bact.motionY > 0) bact.motionY *= -1;
	}
	if (bact.posY < 0) {
		bact.posY = 0;
		if (bact.motionY < 0) bact.motionY *= -1;
	}

	var elem = bact.element;

	if (!elem || !elem.style) {
		bact.element = document.createElement('cell');
		doc('gaem').appendChild(bact.element);
	}
	if (!bact.body) bact.body = createBody(3, 3);
	if (!elem.innerHTML) elem.innerHTML = drawBody(bact.body, bact.hue);
	elem.style.top = (bact.posY)+'px';
	elem.style.left = (bact.posX)+'px';

	if (canDie(bact)) killBacteria(bactID);
	var num = 1;
	num += rand(bact.stats.fert);
	if (canReproduce(bact).status == 'yes') splitBacteria(bactID, num);

	if (parseInt(bactID) == cell.selected) updateBacteriaData(bact, bactID);
}
function canDie(bacteria) {
	if (bacteria.age >= MAX_AGE) return true;
	return false;
}
function canReproduce(bacteria, peek) {
	var energyToReproduce = (16 * bacteria.generation);
	if (peek) return energyToReproduce;
	if (bacteria.energy >= energyToReproduce) return {'status': 'yes', 'needed': 0};
	if (bacteria.energy < energyToReproduce) {
		var energyp = bacteria.energy / energyToReproduce;
		var totalp = energyp * 100;
		if (totalp > 100) totalp = 100;
		return {'status': 'no', 'needed': totalp};
	}
}

var cell = {};
var o2 = 0;
var co2 = 100;
var checkin = 0;

loadGame();
resetVariables();
setInterval(tickAllBacteria, MILLISECONDS_PER_FRAME);
setInterval(updateHUD, MILLISECONDS_PER_FRAME);

var t = setInterval(saveGame, 60000);