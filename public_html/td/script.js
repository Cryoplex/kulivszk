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
	var l = foodn;
	l += shortNum(Math.floor(td.resources.gold)) + ' gold ('+addResources("gold")+'/s)<br>';
	l += shortNum(Math.floor(td.resources.wood)) + ' wood ('+addResources("wood")+'/s)<br>';
	l += shortNum(Math.floor(td.resources.stone)) + ' stone ('+addResources("stone")+'/s)<br>';
	l += shortNum(Math.floor(td.resources.iron)) + ' iron ('+addResources("iron")+'/s)<br>';
	data_resources.innerHTML = l;

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
	var rates = {
		'food': (td.people.farmers * 0.057),
		'wood': (td.people.lumbers * 0.057),
		'gold': (td.people.miners * 0.009),
		'iron': (td.people.miners * 0.018),
		'stone': (td.people.miners * 0.03),
		'consume': (Constants.foodConsumptionPerPerson * getTotalPopulation()),
	}
	if (peek) {
		if (peek == 'food') {
			var add = rates.food;
			var dec = rates.consume;
			return (add - dec).toFixed(3);
		}
		return rates[peek].toFixed(3);
	}
	//Farmers
	td.resources.food += rates.food;

	//Lumbers
	td.resources.wood += rates.wood;

	//Miners
	td.resources.gold += rates.gold;
	td.resources.iron += rates.iron;
	td.resources.stone += rates.stone;

	//Food Consumption
	td.resources.food -= rates.consume;
	var p10 = (getTotalPopulation() / 100) + 10;
	if (td.resources.food < 0) {
		for (var xxx = 0; xxx < p10; xxx++) {
			td.resources.food += 0.5;
			kill();
		}
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
	if (!what) value *= ((td.houses / 10) + 1)
	if (!what) value *= ((td.stonehouses / 5) + 1)

	if (td.resources.food < 0 || parseInt(addResources('food')) < 0) value *= 0.001;

	if (peek) return value;
	if (value <= 0 || !rand(0,9)) return;
	td.buffer[att] += value;
	
	if (Math.floor(td.buffer[att])) {
		var v = Math.floor(td.buffer[att]);
		if (!what) td.people.unemployed += v;
		if (what) kill();
		td.buffer[att] -= v;
	}
}
function kill() {
	td.people[nextVictim()]--;
}
function nextVictim() {
	var arr = ['unemployed', 'farmers', 'miners', 'lumbers', 'soldiers']
	var randomGuy = read(arr);
	if (td.people[randomGuy]) return randomGuy;
	for (var victim in arr) {
		if (td.people[arr[victim]]) return arr[victim];
	}
}
function gather(resource) {
	td.resources[resource]++;
}
function mine() {
	var output = read(['gold', 'iron', 'iron', 'stone', 'stone', 'stone']);
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
function build(what, peek) {
	if (what == 'house') {
		var price = Math.pow(Constants.buildingPriceIncrement, (td.houses + 1)) * 10;
		if (peek) return price;
		if (td.resources.wood >= price) {
			td.resources.wood -= price;
			td.houses += 1;
			td.people.unemployed += 2;;
		}
	}
	if (what == 'stonehouse') {
		var price = Math.pow(Constants.buildingPriceIncrement, (td.stonehouses + 1)) * 15;
		if (peek) return price;
		if (td.resources.stone >= price) {
			td.resources.stone -= price;
			td.stonehouses += 1;
			td.people.unemployed += 8;
		}
	}
}
function buyItem(what, peek) {
	var qty = 10;
	if (peek == 'ab') qty = (td.resources.gold / Constants.marketRates[what]) + 1;
	var price = Math.ceil(qty / Constants.marketRates[what]) + 1;
	if (peek == 1) return price;
	if (td.resources.gold >= price) {
		td.resources.gold -= price;
		td.resources[what] += qty;
	}
}
function sellItem(what, peek) {
	var qty = 10;
	if (peek == 'as') qty = (td.resources[what] / Constants.marketRates[what]) - 1;
	var price = Math.ceil(qty * Constants.marketRates[what]);
	if (peek == 1) return price;
	if (td.resources[what] >= price) {
		td.resources[what] -= price;
		td.resources.gold += qty;
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
	'birthrate': 0.00015,
	'deathrate': 0.000063,
	'framerate': 100,
	'addResourcesInterval': 1000,
	'foodConsumptionPerPerson': 0.01,
	'buildingPriceIncrement': 1.1,

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
var t = setInterval(update, Constants.framerate);
var ar = setInterval(addResources, Constants.addResourcesInterval);
var sg = setInterval(saveGame, Constants.saveGameInterval);