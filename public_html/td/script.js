//$Functions
function empty() {
	//Population
	if (!td.buffer) {
		td.buffer = {};
		td.buffer.birth = 0;
		td.buffer.death = 0;
	}
	//Resources
	if (!td.resources) td.resources = {};
	if (!td.resources.food) td.resources.food = 0;
	if (!td.resources.gold) td.resources.gold = 0;
	if (!td.resources.wood) td.resources.wood = 0;
	if (!td.resources.stone) td.resources.stone = 0;
	if (!td.resources.iron) td.resources.iron = 0;
	//People
	if (!td.people) td.people = {};
	if (!td.people.unemployed) td.people.unemployed = 0;
	if (!td.people.farmers) td.people.farmers = 0;
	if (!td.people.miners) td.people.miners = 0;
	if (!td.people.lumbers) td.people.lumbers = 0;
	if (!td.people.soldiers) td.people.soldiers = 0;
	//Buildings
	if (!td.houses) td.houses = 0;
	if (!td.stonehouses) td.stonehouses = 0;
	if (!td.ironhouses) td.ironhouses = 0;
	if (!td.goldhouses) td.goldhouses = 0;
}
function update() {
	data_population.innerHTML = shortNum(getTotalPopulation());
	grow(0); //Grows population based on birthrate.
	grow(1); //Kills population based on deathrate.
	var births = grow(0, 1);
	var deaths = grow(1, 1);
	var growth = births - deaths;
	data_growth.innerHTML = growth.toFixed(5);

	var foodn = shortNum(Math.floor(td.resources.food)) + ' food ('+addResources("food")+'/s)<br>';
	if (td.resources.food < 0) foodn = '<mark>[Cannibalism]</mark><br>';

	data_food.innerHTML = foodn;

	data_gold.innerHTML = shortNum(Math.floor(td.resources.gold)) + ' gold ('+addResources("gold")+'/s)<br>';
	data_wood.innerHTML = shortNum(Math.floor(td.resources.wood)) + ' wood ('+addResources("wood")+'/s)<br>';
	data_stone.innerHTML = shortNum(Math.floor(td.resources.stone)) + ' stone ('+addResources("stone")+'/s)<br>';
	data_iron.innerHTML = shortNum(Math.floor(td.resources.iron)) + ' iron ('+addResources("iron")+'/s)<br>';


	var l = shortNum(td.people.unemployed) + ' unemployed<br>';
	l += shortNum(td.people.farmers) + ' farmers<br>';
	l += shortNum(td.people.miners) + ' miners<br>';
	l += shortNum(td.people.lumbers) + ' lumbers<br>';
	l += shortNum(td.people.soldiers) + ' soldiers<br>';
	data_occupations.innerHTML = l;

	employ.min = 1;
	employ.max = td.people.unemployed;

	unemployed.style.opacity = (td.people.unemployed) ? 1 : 0.5;

	var price = build('house', 1);
	data_build_house.value = 'Build House \n'+Math.ceil(price)+' wood';
	data_build_house.style.opacity = (td.resources.wood >= Math.ceil(price)) ? 1 : 0.5;

	var price = build('stonehouse', 1);
	data_build_stonehouse.value = 'Build Stone House \n'+Math.ceil(price)+' stone';
	data_build_stonehouse.style.opacity = (td.resources.stone >= Math.ceil(price)) ? 1 : 0.5;

	var price = build('ironhouse', 1);
	data_build_ironhouse.value = 'Build Iron House \n'+Math.ceil(price)+' iron';
	data_build_ironhouse.style.opacity = (td.resources.iron >= Math.ceil(price)) ? 1 : 0.5;

	var price = build('goldhouse', 1);
	data_build_goldhouse.value = 'Build gold House \n'+Math.ceil(price)+' gold';
	data_build_goldhouse.style.opacity = (td.resources.gold >= Math.ceil(price)) ? 1 : 0.5;

	data_mb_food.value = 'Buy 10 food for '+shortNum(buyItem('food', 1))+' gold';
	data_mb_food.style.opacity = (td.resources.gold >= buyItem('food', 1)) ? 1 : 0.5;

	data_mb_wood.value = 'Buy 10 wood for '+shortNum(buyItem('wood', 1))+' gold';
	data_mb_wood.style.opacity = (td.resources.gold >= buyItem('wood', 1)) ? 1 : 0.5;

	data_mb_stone.value = 'Buy 10 stone for '+shortNum(buyItem('stone', 1))+' gold';
	data_mb_stone.style.opacity = (td.resources.gold >= buyItem('stone', 1)) ? 1 : 0.5;

	data_mb_iron.value = 'Buy 10 iron for '+shortNum(buyItem('iron', 1))+' gold';
	data_mb_iron.style.opacity = (td.resources.gold >= buyItem('iron', 1)) ? 1 : 0.5;

	data_ms_food.value = 'Sell '+shortNum(sellItem('food', 1))+' food for 10 gold';
	data_ms_food.style.opacity = (td.resources.food >= sellItem('food', 1)) ? 1 : 0.5;

	data_ms_wood.value = 'Sell '+shortNum(sellItem('wood', 1))+' wood for 10 gold';
	data_ms_wood.style.opacity = (td.resources.wood >= sellItem('wood', 1)) ? 1 : 0.5;

	data_ms_stone.value = 'Sell '+shortNum(sellItem('stone', 1))+' stone for 10 gold';
	data_ms_stone.style.opacity = (td.resources.stone >= sellItem('stone', 1)) ? 1 : 0.5;

	data_ms_iron.value = 'Sell '+shortNum(sellItem('iron', 1))+' iron for 10 gold';
	data_ms_iron.style.opacity = (td.resources.iron >= sellItem('iron', 1)) ? 1 : 0.5;


	//Autobuy & Autosell
	var res = ['food', 'wood', 'stone', 'iron'];

	var names = ['ab_food', 'ab_wood', 'ab_stone', 'ab_iron'];
	var names2 = ['as_food', 'as_wood', 'as_stone', 'as_iron'];

	for (var ab in names) {
		if (document.getElementById(names[ab]).checked) {
			buyItem(res[ab], 'ab');
		}
		if (document.getElementById(names2[ab]).checked) {
			sellItem(res[ab], 'as');
		}
	}
}
function addResources(peek) {
	var ratemod = (Constants.addResourcesInterval / 1000);
	var rates = {
		'food': (td.people.farmers * 0.031) * ratemod,
		'wood': (td.people.lumbers * 0.051) * ratemod,
		'gold': (td.people.miners * 0.0047) * ratemod,
		'iron': (td.people.miners * 0.013) * ratemod,
		'stone': (td.people.miners * 0.017) * ratemod,
		'consume': (Constants.foodConsumptionPerPerson * getTotalPopulation()) * ratemod,
	}
	if (peek) {
		if (peek == 'food') {
			var add = rates.food;
			var dec = rates.consume;
			return (add - dec).toFixed(3);
		}
		return (rates[peek]).toFixed(3);
	}
	//Farmers
	var foodgain = rates.food - rates.consume;

	var p10 = (getTotalPopulation() / 100) + 10;
	if (td.resources.food < 0) {
		kill(p10);
		foodgain += p10;
	}

	addResource('food', foodgain);

	//Lumbers
	addResource('wood', rates.wood);


	//Miners
	addResource('gold', rates.gold);
	addResource('iron', rates.iron);
	addResource('stone', rates.stone);
}
function addResource(resource, amt) {
	var bef = td.resources[resource];

	td.resources[resource] += amt;

	var prefix = (amt >= 0) ? '+' : '-';

	if (Math.floor(td.resources[resource]) != Math.floor(bef)) {
		flashText('#data_'+resource, prefix+(Math.floor(td.resources[resource]) - Math.floor(bef))+' '+resource, resource);
	}
}
function getTotalPopulation() {
	var pop = td.people.unemployed;
	pop += td.people.farmers;
	pop += td.people.miners;
	pop += td.people.lumbers;
	pop += td.people.soldiers;
	return pop;
}
function grow(what, peek) {
	//What: 0 - birth, 1 - death
	var mul = [Constants.birthrate, Constants.deathrate][what] / Constants.framerate;
	var att = ['birth', 'death'][what];

	var value = getTotalPopulation() * mul;

	if (td.resources.food < 0 && !what) value = 0;

	if (peek) return value;
	if (value <= 0 || !rand(0,9)) return;
	td.buffer[att] += value;
	
	if (Math.floor(td.buffer[att])) {
		var v = Math.floor(td.buffer[att]);
		if (!what) td.people.unemployed += v;
		if (what) kill(v);

		td.buffer[att] -= v;
	}
}
function kill(amt) {
	if (!amt) amt = 1;
	var nv = nextVictim();
	td.people[nv] -= amt;
	if (td.people[nv] < 0) td.people[nv] = 0;
}
function nextVictim() {
	var arr = ['unemployed', 'soldiers', 'lumbers', 'miners', 'farmers']
	var randomGuy = read(arr);
	if (td.people.unemployed) return 'unemployed';
	if (td.people[randomGuy]) return randomGuy;
	for (var victim in arr) {
		if (td.people[arr[victim]]) return arr[victim];
	}
}
function gather(resource) {
	td.resources[resource]++;

	var el = '#data_'+resource;
	flashText(el, '+1 '+resource, resource);
}
function mine() {
	var output = read(['gold', 'iron', 'iron', 'stone', 'stone', 'stone']);
	var el = '#data_'+output;
	flashText(el, '+1 '+output, output);
	td.resources[output]++;
}
function giveJob (job) {
	var qty = parseInt(employ.value);
	if (td.people.unemployed < qty) {
		$('#employ').effect('bounce', 500);
		return;
	}
	td.people.unemployed -= qty;
	td.people[job] += qty;
}
function drawMap() {
	drawLane(1);
	drawLane(2);
	drawLane(3);
}
function drawLane(num) {
	var element = 'lane_'+num;

	for (var x = 0; x < 35; x++) {
		var sq = document.createElement('square');
		if (x > 31) sq.className = 'enemySpawn';
		sq.onclick = drawMenu(num, x);
		sq.style.left = (x * 32)+'px';
		doc(element).appendChild(sq);

		drawHere(num, x);
	}
}
function drawHere(lane, squarenum) {
	var wh = whatsHere(lane, squarenum);
	$('#obj_'+lane+'_'+squarenum).remove();
	if (wh && wh.type) {
		if (wh.type == 'tower') drawTower(lane, squarenum);
		if (wh.type == 'monster') drawMonster(lane, squarenum);
	}
}
function drawMenu(lane, squarenum) {
	return function() {
		menu(lane, squarenum);
	}
}
function buildTower(lane, squarenum, oc) {
	if (oc) return function() {
		buildTower(lane, squarenum);
	}
	console.log('Building tower at lane', lane, 'square', squarenum);
	td.lanes[lane][squarenum] = new Tower();

	drawTower(lane, squarenum);

	menu();
}
function drawTower(lane, squarenum) {
	var sq = document.createElement('building');
	sq.id = 'obj_'+lane+'_'+squarenum;
	sq.className = 'tower';
	sq.style.left = (squarenum * 32)+'px';
	sq.style.top = (-32)+'px';
	doc('lane_'+lane).appendChild(sq);
}
function drawMonster(lane, squarenum) {
	var sq = document.createElement('monster');
	sq.id = 'obj_'+lane+'_'+squarenum;
	sq.className = 'monster';
	sq.style.left = (squarenum * 32)+'px';
	doc('lane_'+lane).appendChild(sq);

	console.log(sq);
}
function spawnMonster() {
	var lane = rand(1, 3);
	var num = 34;

	var wh = whatsHere(lane, num);
	td.lanes[lane][num] = new Monster(lane, num);
	drawMonster(lane, num);
}
function Tower(lane, squarenum) {
	this.type = 'tower';

	this.lane = lane;
	this.squarenum = squarenum;

	this.attackTime = 0;
	this.moveTime = 0;

	this.attackSpeed = Math.random();
	this.moveSpeed = 0;
}
function Monster(lane, squarenum) {
	this.type = 'monster';

	this.lane = lane;
	this.squarenum = squarenum;

	this.attackTime = 0;
	this.moveTime = 0;

	this.attackSpeed = Math.random();
	this.moveSpeed = Math.random();
}
function moveAll() {
	for (var lane = 1; lane <= 3; lane++) {
		console.log('Moving lane '+lane);
		var l = td.lanes[lane];
		for (var obj in l) {
			var wh = whatsHere(lane, obj);
			if (wh && wh.attackSpeed) {
				wh.attackTime += wh.attackSpeed;
				if (wh.attackTime >= 1) wh.attackTime = 0;
			}

			if (wh && wh.moveSpeed) {
				wh.moveTime += wh.moveSpeed;
				console.log('obj', obj, 'moveTime', wh.moveTime);
				if (wh.moveTime >= 1) {
					console.log('obj', obj, 'moves to the left');
					wh.moveTime = 0;
					moveObject(wh);
				}
			}
		}
	}
}
function moveObject(object) {
	var left = whatsHere(object.lane, object.squarenum-1);
	if (left) return;
	console.log('Nothing blocks its path!');
	$('#obj_'+object.lane+'_'+object.squarenum).animate({left: '-=32'}, 100);

	object.squarenum--;
	drawHere(object.lane, object.squarenum);
	drawHere(object.lane, object.squarenum++);

	console.log('squarenum', object.squarenum);
}
function menu(lane, squarenum) {
	$('#menu_holder').remove();

	if (!lane && !squarenum) return;

	var menh = document.createElement('menu_holder');
	menh.id = 'menu_holder';

	var men = document.createElement('menu');

	var of = $('#lane_'+lane).offset();
	men.style.left = (of.left + (squarenum * 32))+'px';
	men.style.top = (of.top - 64)+'px';

	var wh = whatsHere(lane, squarenum);
	var ty = (wh && wh.type) ? wh.type : 'void';

	men.innerHTML = '<span class="menuItem" style="font-size: 8px">'+ty+'</span>';
	if (!wh && squarenum < 32) {
		var option = document.createElement('span');
		option.className = 'menuItem';
		option.innerHTML = 'Build Tower';
		option.onclick = buildTower(lane, squarenum, 'oc');
		men.appendChild(option);
	}



	var option = document.createElement('span');
	option.className = 'menuItem';
	option.innerHTML = 'Exit';
	option.onclick = function() {menu()};
	men.appendChild(option);

	menh.appendChild(men);

	document.body.appendChild(menh);
}
function whatsHere(lane, squarenum) {
	if (!td.lanes) td.lanes = [];
	if (!td.lanes[lane]) td.lanes[lane] = [];
	return td.lanes[lane][squarenum];
}
function build(what, peek) {
	if (what == 'house') {
		var price = Math.pow(Constants.buildingPriceIncrement, (td.houses + 1)) * 9;
		if (peek) return price;
		if (td.resources.wood >= price) {
			td.resources.wood -= price;
			td.houses += 1;
			td.people.unemployed += 2;;
		}
	}
	if (what == 'stonehouse') {
		var price = Math.pow(Constants.buildingPriceIncrement, (td.stonehouses + 1)) * 14;
		if (peek) return price;
		if (td.resources.stone >= price) {
			td.resources.stone -= price;
			td.stonehouses += 1;
			td.people.unemployed += 8;
		}
	}

	if (what == 'ironhouse') {
		var price = Math.pow(Constants.buildingPriceIncrement, (td.ironhouses + 1)) * 36;
		if (peek) return price;
		if (td.resources.iron >= price) {
			td.resources.iron -= price;
			td.ironhouses += 1;
			td.people.unemployed += 32;
		}
	}

	if (what == 'goldhouse') {
		var price = Math.pow(Constants.buildingPriceIncrement, (td.goldhouses + 1)) * 103;
		if (peek) return price;
		if (td.resources.gold >= price) {
			td.resources.gold -= price;
			td.goldhouses += 1;
			td.people.unemployed += 128;
		}
	}
}
function buyItem(what, peek) {
	var qty = 10;
	if (peek == 'ab') {
		var qty = Math.floor(Math.floor(td.resources.gold - 1) * Constants.marketRates[what]);
		if (qty < 0) qty = 0;
	}
	var price = Math.ceil(qty / Constants.marketRates[what]) + 1;

	if (peek == 1) return price;
	console.log('qty', qty, 'price', price, 'gold', td.resources.gold, 'marketRates', Constants.marketRates[what]);

	if (td.resources.gold >= price) {
		addResource('gold', -price);
		addResource(what, qty);
	}
}
function sellItem(what, peek) {
	var qty = 10;
	if (peek == 'as') {
		var qty = Math.floor(td.resources[what] / Constants.marketRates[what]);

		console.log('qty', qty);

	}
	var price = Math.ceil(qty * Constants.marketRates[what]);
	if (peek == 1) return price;
	if (td.resources[what] >= price) {
		addResource('gold', qty);
		addResource(what, -price);
	}
}
function saveGame() {
	localStorage.setItem('td', JSON.stringify(td));
	notification('Game Saved');
}
function loadGame() {
	if (JSON.parse(localStorage.getItem('td'))) td = JSON.parse(localStorage.getItem('td'));
}

//$Variables
var td = {};
var Constants = {
	'defaultPopulation': 100,
	'birthrate': 0.00013,
	'deathrate': 0.000094,
	'framerate': 100,
	'addResourcesInterval': 500,
	'foodConsumptionPerPerson': 0.013,
	'buildingPriceIncrement': 1.077,

	'marketRates': {
		'food': 5,
		'wood': 6,
		'stone': 3,
		'iron': 2,
	},
	'saveGameInterval': 30000,
}
loadGame();

//$Flow
empty();
drawMap();
var t = setInterval(update, Constants.framerate);
var ar = setInterval(addResources, Constants.addResourcesInterval);
var sg = setInterval(saveGame, Constants.saveGameInterval);