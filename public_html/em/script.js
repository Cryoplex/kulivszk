var changelog = [
'-- Alpha',
'--- Isometric engine: Added buildings',
'---- The spritesheet for a building should have 9 tiles for roof, 5 for sides and 5 for bottom layer.',
'---- Added decoration for buildings, 8 special tiles with 8 roof decorations, 4 side deco and 4 floor deco.',
'---- The special decoration for doors only appears in the middle of the building floor.',
'----- WTH',
'--- Added people and the player.',
'--- You can control the player using WASD. The top right corner represents "North".',
'--- Added clothes, skin tones and hair. Each of them is colored at random at first.',
'--- Added loads of (unfinished) stuff.',
'ab Fixed a buggy bug with loading the game',
'af Added lost items. Spawned each hour in the ground. Press SPACE to collect them.',
'af Added trash bins. They generate random items each hour. Press SPACE to interact with them. You can also throw items inside them.',
'af Buildings now update each day, and city expands each month.',
'af You can now talk to NPCs and even steal them.',
'af Added policemen. They roam the city around. If you do crimes, they will chase you. Once chased, you go into arrest and a fee is deducted from your account.',
];

var MAX_LAYERS = 23;
var TILE_HEIGHT = 60;
var MAP_WIDTH = 23;
var MAP_HEIGHT = 23;
var BASE_HOUSE_VALUE = 100000;
var ENTRY_PRICE_MOD = 1.5;

var wantedOfficers = {};

var YEAR_MONTHS = 4;
var MONTH_DAYS = 20;

var ticker = 0;

var availableGuys = [];

var lastDrops = [];

var directionNames = ['north', 'east', 'south', 'west'];
var altDirections = ['south', 'west', 'north', 'east'];
var jobNames = {
	'fir': 'Farmer',
	'sec': 'Construction Worker',
	'thi': 'Office Worker',
	'slave': 'Cleaning Service Slave',
	'slum': 'Drug Dealer',
}
var jobList = {
	'fir': [
	//Primary sector jobs have no input. They generate items by workforce at a rate of 2 items per worker per hour.
	{'name': 'Farmer', 'output': [1]},
	],

	'sec': [
	//Secondary sector jobs take one or various items as input, and generate output items at a rate of 2 items/worker/hour.
	{'name': 'Ketchup Maker', 'input': [1], 'output': [2]},
	],

	'thi': [
	//Tertiary sector jobs take a list of items from the warehouse and sell them in a shop.
	{'name': 'Ketchup Vendor', 'shop': [2]},
	],

	'slave': [
	//Slave sector jobs take no items and generate no items. Jobs such as policeman are slave jobs.
	{'name': 'Slave'},
	],

	'slum': [
	//Slum sector jobs may take items as input, may output items and also may sell them. Slum jobs are illegal and you risk a 1% chance each hour of work of being sent to jail.
	{'name': 'Ketchupaine Brewer', 'input': [2], 'output': [3], 'shop': [3]},
	],
}

var everyman, city, player, furtuto;

var itemList = [
	//Every item must be obtainable.
	new Item(0, {}), //Default item
	new Item(1, {'name': 'Tomato', 'desc': 'Edible. Harvested by farmers.', 'food': true, 'hunger': 5, 'price': 1}), //Harvested by farmers
	new Item(2, {'name': 'Ketchup', 'desc': 'Edible. Made with real tomatoes.', 'food': true, 'hunger': 1, 'price': 2, 'byproduct': 4}), //Made by ketchup makers
	new Item(3, {'name': 'Ketchupaine', 'desc': 'Drug. Increases energy and reduces health.', 'food': true, 'drug': true, 'health': -5, 'energy': 10, 'illegal': true, 'price': 10}), //Made by ketchupaine brewers
	new Item(4, {'name': 'Ketchup Wrapper', 'desc': 'Trash item result after eating Ketchup.', 'tile': 2, 'price': 0.05}), //Produced after consuming Ketchup
];

var crimes = [
	{'name': 'Assault and theft', 'tier': 5},
	{'name': 'In-shop theft', 'tier': 4},
	{'name': 'Theft attempt', 'tier': 3},

	{'name': 'Illegal jobs', 'tier': 1},
	{'name': 'Drug possesion', 'tier': 3},

	{'name': 'Illegal item possesion', 'tier': 2},

	{'name': 'Resistance to authority', 'tier': 1},
];
var furniturePrices = {
	'tile_closet': 180,
	'tile_table': 50,
	'tile_sink': 250,
	'tile_sink2': 250,
	'tile_toilet': 400,
	'tile_cabinet': 180,
	'tile_fridge': 400,
	'tile_cooker': 680,
	'tile_woodwall': 5,
	'tile_hidden': 5,
	'tile_bin': 40,
}
var furnitureNames = {
	'tile_closet': 'Closet', 'tile_table': 'Table', 'tile_sink': 'Sink', 'tile_sink2': 'Sink', 'tile_toilet': 'Toilet', 'tile_cabinet': 'Cabinet', 'tile_fridge': 'Fridge', 'tile_cooker': 'Oven',
	'tile_woodwall': 'Wood Wall',
	'tile_hidden': 'Stone Wall',
	'tile_bin': 'Trash Bin',
}
var furnitureStatus = {
	'tile_hidden': 'build',
	'tile_woodwall': 'build',

	'tile_closet': 'buy',
	'tile_table': 'buy',
	'tile_sink': 'buy',
	'tile_sink2': 'buy',
	'tile_toilet': 'buy',
	'tile_fridge': 'buy',
	'tile_cabinet': 'buy',
	'tile_cooker': 'buy',
	'tile_bin': 'buy',
}

var skinTones = [
	toHSL(0, 1, 1.5),
	/*
	toHSL(0, 1.2, 1.4),
	toHSL(0, 1, 1.3),
	toHSL(0, 0.8, 1.2),
	toHSL(0, 1, 1.1),
	toHSL(0, 1, 1),
	toHSL(0, 1, 0.9),
	toHSL(0, 1, 0.8),
	*/
];

var mapTypes = ['first', 'second', 'third', 'resid'];
var sectorMapTypes = [
//Residential
	['res', 'mix', 'slum'],
//Primary
	['fir'],
//Secondary
	['sec'],
//Teriary
	['thi', 'mix'],
//Transition
	['par', 'wil'],
];

function displayDrops() {
	var dd = '<b>Last Drops</b><br>';
	for (var e in lastDrops) dd += lastDrops[e]+' x '+itemList[e].name+'<br>';
	return dd;
}
function resetVariables() {
	if (!player) player = new Person(0, 'player');
	if (!everyman) everyman = {};
	if (!everyman.people) everyman.people = {};
	if (!everyman.peopleList) everyman.peopleList = [];

	if (!everyman.warehouse) everyman.warehouse = [];
	if (!everyman.interns) everyman.interns = {
		'fir': [], 'sec': [], 'thi': [], 'slave': [], 'slum': []
	};

	if (!city) {
		city = new City();
		while (!getZonesByType(city)) expandCity(city);
		buildCity(city);
	}
}
function afterLoad() {
	everyman.peopleList = [];
	for (var p in everyman.people) {
		var guy = everyman.people[p];
		makeHolder(guy);
		drawPerson(guy);
		everyman.peopleList.push(p);
	}

	makeHolder(player);
	drawPerson(player);
}
function drawWarehouse() {
	var wh = '<br><b>Items in City Warehouse</b><br>';
	for (var e in everyman.warehouse) {
		var id = e;
		if (everyman.warehouse[id] >= 1) {
			var qty = everyman.warehouse[id];
			var name = itemList[id].name;
			wh += qty+'x'+name+'<br>';
		}
	}
	debug_warehouse.innerHTML = wh;
}
function makeIntern(id) {
	var guy = everyman.people[id];
	if (guy.type == 'police' || guy.type == 'police_extra') return;
	var randomSector = read(['fir', 'sec', 'thi', 'slave', 'slum']);
	var randomJobs = jobList[randomSector];
	var r = rand(1, randomJobs.length) - 1;
	if (everyman.interns[randomSector][r] == undefined) everyman.interns[randomSector][r] = 0;
	everyman.interns[randomSector][r]++;
	killPerson(id, 'made intern');
}
function saveGame() {
	localStorage.setItem('everyman', JSON.stringify(everyman));
	localStorage.setItem('everymanPlayer', JSON.stringify(player));
	localStorage.setItem('everymanCity', JSON.stringify(city));
	availableGuys = randomAvailableGuy();
}
function Item(id, config) {
	this.name = 'Item';
	this.price = 0;
	this.food = false;
	this.id = id;

	for (var e in config) {
		this[e] = config[e];
	}
}
function resetGame() {
	localStorage.removeItem('everyman');
	localStorage.removeItem('everymanPlayer');
	localStorage.removeItem('everymanCity');
	window.location = window.location;
}
function loadGame() {
	var losto = localStorage.getItem('everyman');
	if (losto) everyman = JSON.parse(losto);

	var losto = localStorage.getItem('everymanPlayer');
	if (losto) player = JSON.parse(losto);

	var losto = localStorage.getItem('everymanCity');
	if (losto) city = JSON.parse(losto);
}
function update(step) {
	document.title = gameInfo.name+' '+gameInfo.version;

	updateInterns();
}
function zeroPad(number, fixed, dec, trim) {
	if (!number) number = 0;
	if (trim) number = Math.floor(number)
	var base = (dec) ? 10 : 36;
	number = number % Math.pow(10, fixed);


	number = number.toString(10).toUpperCase();
	while (number.length < fixed) number = '0'+number;
	return number;
}
function generateID(last, type, zoneX, zoneY) {
	var newID = '';
	if (!zoneX) zoneX = 0;
	if (!zoneY) zoneY = 0;
	if (!type) type = 'default';
	if (!last) last = 0;

	var let = {
		'npc': 'N',
		'player': 'P',
		'default': 'U',
	}[type];

	newID = let + '-' + zeroPad(zoneX, 2) + zeroPad(zoneY, 2) + '-' + zeroPad(last, 9) + zeroPad(rand(1, 1296), 1);

	return newID;

}
function isCriminal(guy) {
	if (guy.crime == undefined) guy.crime = [];
	var level = 0;
	for (var c in guy.crime) level += guy.crime[c];
	return level;
}
function Person(id, type) {
	this.id = id;

	this.type = type;

	this.x = 22;
	this.y = 22;
	this.z = 2;
	this.facing = 0;
	this.walking = false;

	this.homes = [];

	this.health = 100; //If it reaches 0, this person dies
	this.hunger = 100; //If it reaches 0, drains hunger
	this.energy = 100; //If it reaches 0, forces sleep and disables movement
	this.hygiene = 100; //Reduced by dirty actions

	this.crime = [];

	this.friendship = 0;

	this.lastMove = 0;


	this.money = (type == 'player') ? 3000 : 0;

	this.gender = rand(0,1);

	this.name = 'Random Guy';
	if (this.gender == 1) this.name = getFemaleName();
	if (this.gender == 0) this.name = getMaleName();

	this.variation = rand(0,1);

	this.mapID = {'x': 2, 'y': 2};

	makeHolder(this);
}
function lostItem(mapx, mapy) {
	var sp = new SpawnPoint('item');
	var iid = rand(1, itemList.length) - 1;
	if (city.map[mapx][mapy].lostItems == undefined) city.map[mapx][mapy].lostItems = [];
	var litems = city.map[mapx][mapy].lostItems;
	for (var li in litems) {
		if (litems[li].x == sp.x && litems[li].y == sp.y) {
			return;
		}
	}

	city.map[mapx][mapy].lostItems.push({'x': sp.x, 'y': sp.y, 'id': iid});

	if (mapx == player.mapID.x && mapy == player.mapID.y) drawLostItems();
}
function drawLostItems() {
	var ibtn = document.getElementsByTagName('item_holder');
	for (var i in ibtn) {
		var it = ibtn[i];
		if (!it || !it.parentNode) continue;
		document.body.removeChild(ibtn[i]);
	}
	var li = city.map[player.mapID.x][player.mapID.y].lostItems;
	if (li && li.length > 0) {
		for (var it in li) {
			var litem = li[it];
			drawObject(litem.x, litem.y, 'items', getItemTile(litem.id));
		}
	}
}
function onPlayerNotification(text) {
	onCoordinateNotification(player.x, player.y, text);
}
function onCoordinateNotification(x, y, text) {
	var isoPos = getIsoTilePosition(size(30, 60), size(x-1, y-3, 2));
	var el = document.createElement('person_holder');
	el.style.width = 'auto';
	el.style.height = 'auto';
	el.className = 'tile whatever';
	el.style.top = (TILE_HEIGHT * (MAX_LAYERS / 8))+'px';

	var tl = (text.length > 50) ? 50 : text.length;
	var wd = (tl * 5);


	el.innerHTML = '<div style="top: '+isoPos.top+'; left: '+isoPos.left+'; z-index: 9999; width: '+wd+'px" class="coordNotification">'+text+'</div>';
	var time = 100 * text.length;

	document.body.appendChild(el);
	setTimeout(function() {
		document.body.removeChild(el);
	}, time);
}
function drawObject(x, y, tileset, bpos) {
	var isoPos = getIsoTilePosition(size(30, 60), size(x-1, y-3, 2));
	var el = document.createElement('item_holder');
	el.className = 'tile whatever';
	el.style.top = (TILE_HEIGHT * (MAX_LAYERS / 8))+'px';

	el.innerHTML = '<div style="top: '+isoPos.top+'; left: '+isoPos.left+'; background: url(img/'+tileset+'.png); z-index: 999; background-position: '+bpos+'; background: '+tileset+'" class="tile collectible"></div>';

	document.body.appendChild(el);
}


function makeHolder(guy) {
	guy.element = document.createElement('person_holder');
	guy.element.className = 'tile whatever';
	guy.element.style.top = (TILE_HEIGHT * (MAX_LAYERS / 8))+'px';

	var isoPos = getIsoTilePosition(size(30, 60), size((guy.x - 1), (guy.y - 3), guy.z));
	guy.element.innerHTML = '<div id="npch_'+guy.id+'" title="id: '+guy.id+'" class="guy_layer" style="top: '+isoPos.top+'; left: '+isoPos.left+'; z-index: 9999">'+drawGuy(guy)+'</div>';

	document.body.appendChild(guy.element);
}
function drawPerson(guy) {
	if (guy.mapID.x != player.mapID.x || guy.mapID.y != player.mapID.y || guy.inside != player.inside) {
		if (guy.element) guy.element.style.opacity = 0;
		return;
	}
	if (!guy.element) {
		makeHolder(guy);
	}
	if (!guy.facing) guy.facing = 0;
	if (!guy.element.style) return;
	guy.element.style.opacity = 1;

	var hname = 'npch_'+guy.id;
	if (doc(hname)) {
		var isoPos = getIsoTilePosition(size(30, 60), size((guy.x - 1), (guy.y - 3), guy.z));
		doc(hname).style.top = isoPos.top;
		doc(hname).style.left = isoPos.left;
	}

	var zindex = 0;
	zindex = (guy.z * 4) + guy.x + guy.y;

	var bk = getBlocker(guy);
	if (!bk) doc(hname).className = 'guy_layer';
	if (bk) {
		doc(hname).className = 'guy_layer outlined';
		zindex = 9999;
	}

	doc(hname).style.zIndex = zindex;

	var picname = 'npcpic_'+guy.id;
	if (doc(picname)) {
		doc(picname).style.backgroundPosition = getBackgroundPosition(guy, 0, guy.walking);
	}
}
function getBlocker(guy) {
	var map = city.map[guy.mapID.x][guy.mapID.y].map;
	if (guy.inside != undefined) map = city.map[guy.mapID.x][guy.mapID.y].inside.map;
	var h = false;
	for (var xx = 0; xx < MAP_HEIGHT; xx++) {
		if (whatsHere(map, size((guy.x + xx), (guy.y + xx), (guy.z + xx)))) return true;
	}
	if (whatsHere(map, size((guy.x), (guy.y + 1), (guy.z)))) return true;
	return false;
}
function editActiveMap(x, y, z, newTile) {
	var pos = player.mapID;
	var mappy = city.map[pos.x][pos.y];
	var map = mappy.map;
	if (player.inside != undefined) {
		map = mappy.inside.map;
	}
	map[z][y][x] = newTile;
	return newTile;
}
function getActiveMap() {
	var pos = player.mapID;
	var mappy = city.map[pos.x][pos.y];
	var map = mappy.map;
	if (player.inside != undefined) {
		map = mappy.inside.map;
	}
	return map;
}
function toHSL(hue, sat, lig) {
	return 'hue-rotate('+hue+'deg) saturate('+sat+') brightness('+lig+')';
}
function getBackgroundPosition(guy, start, walking) {
	var facing = guy.facing;
	var x = 0;
	var y = 0;

	var directions = [-120, -60, 0, -180];

	if (walking) start -= 30;

	return start+'px '+directions[facing]+'px';
}
function drawGuy(guy) {
	var walking = (guy.walking) ? 'walking_'+guy.facing : '';
	var isMyGuy = (guy == player) ? 'myGuy' : '';

	if (guy.type == 'police') {
		guy.gender = '1s';
		guy.variation = '0';
	}
	if (guy.type == 'police_extra') {
		guy.gender = '1s';
		guy.variation = '1';
	}

	var g = '<div class="guy_layer" id="npcpic_'+guy.id+'" style="background: url(img/npc_'+guy.gender+'_'+guy.variation+'.png) '+getBackgroundPosition(guy, 0, guy.walking)+'">';

	g += '</div>';
	return g;
}
function getPeopleLength() {
	var n = 0;
	for (var e in everyman.people) n++;
	return n;
}
function getStealChance(guy) {
	var base = 0;
	var time = everyman.time.hours + (everyman.time.minutes / 60);
	if (time < 8) base = 90;
	if (time >= 8) base = 45;
	if (time >= 10) base = 20;
	if (time >= 12) base = 10;
	if (time >= 15 && time < 18) base = 2;
	if (time >= 18) base = 75;

	return base;
}
function addCrime(player, c, amt, set) {
	if (player.crime[c] == undefined) player.crime[c] = 0;
	player.crime[c] += amt;
	if (set) player.crime[c] = amt;
}
function addPerson(type, mapx, mapy) {
	var last = getPeopleLength();
	var id = generateID(last, type, 1, 1);

	if (mapx == undefined) mapx = rand(2, city.map.length) - 1;
	if (mapy == undefined) mapy = rand(2, city.map[0].length) - 1;

	var p = new Person(id, type);
	if (rand(1, 10) == 1) p.type = 'police';
	if (rand(1, 10) == 1) p.type = 'police_extra';
	var sp = new SpawnPoint();
	p.mapID.x = mapx;
	p.mapID.y = mapy;

	p.homes = [];

	p.x = sp.x;
	p.y = sp.y;
	everyman.people[id] = p;
	everyman.peopleList.push(id);
}
function Home(x, y) {
	this.x = x;
	this.y = y;
	this.rent = getHouseValue(x, y);
	this.entryPrice = round(this.rent * ENTRY_PRICE_MOD);
	this.price = round(this.rent * 60);
	this.due = 0;
	this.bought = false;
	this.nextDueDate = new EMDate(0, 1, 0);
	this.unpaid = 0;
}
function upgradeJob(job) {
	job.level++;
	if (job.workhours > 0) job.workhours -= 0.25;
	if (job.payday > 1) job.payday -= 0.5;
	job.baseSalary += getJobSalary(job.x, job.y, 'basemod');
}
function getJobId(x, y) {
	var map = city.map[x][y];
	if (map.jobID != undefined) return map.jobID;
	var type = getJobSalary(x, y, 'type');
	var r = jobList[type];
	var max = rand(1, r.length) - 1;

	city.map[x][y].jobID = max;

	return max;
}
function Job(x, y) {
	this.x = x;
	this.y = y;
	this.type = getTypeOfMap(city.map, x, y);
	this.id = getJobId(x, y);

	this.workhours = getJobSalary(x, y, 'hours');
	this.payday = getJobSalary(x, y, 'payday');

	this.level = 0;

	this.baseSalary = (getJobSalary(x, y, 'base') / 20) / 24;
	this.type = getJobSalary(x, y, 'type');

	this.itemChances = getJobSalary(x, y, 'itemChances');

	this.workedHours = 0;
	this.dueHours = 0;
	this.end = false;
	this.nextPaycheck = new EMDate(this.payday, 0, 0);
}
function getCheck(job) {
	var payday = job.payday;
	var objective = payday * job.workhours;

	var worked = job.workedHours;

	var efficiency = 1;
	if (objective > 0) efficiency = (worked / objective);
	var baseSalary = job.baseSalary * worked;

	var nextPaycheck = getDateValue(everyman.time) - getDateValue(job.nextPaycheck);


	return {'payday': payday, 'objective': objective, 'worked': worked, 'efficiency': efficiency, 'baseSalary': baseSalary, 'nextPaycheck': nextPaycheck}
}
function getJobSalary(x, y, peek) {
	//Work at farms/etc: 0 salary, low extra salary, no work hours, daily payday
	//Work at factories: high work hours, low salary, high extra salary, slow payday
	//Work at office: low work hours, high salary, no extra salary, fast payday
	//Work at cleaning service: Low salary, high hours, daily payday
	//Work as drug dealer: Highest extra salary, no work hours, daily payday
	var base = getHouseValue(x, y);
	var type = getTypeOfMap(city.map, x, y);
	if (type == 'mix') type = 'thi';
	if (type != 'fir' && type != 'sec' && type != 'thi' && type != 'slum') type = 'slave';
	if (peek == 'type') return type;
	var salaryMod = {
		'base': {
			'fir': 0,
			'sec': 1,
			'thi': 1.5,
			'slave': 0.5,
			'slum': 2.0,
		},
		'hours': {
			'fir': 0,
			'sec': 8,
			'thi': 4,
			'slave': 16,
			'slum': 12,
		},
		'payday': {
			'fir': 0,
			'sec': 20,
			'thi': 5,
			'slave': 1,
			'slum': 1,
		},
		'itemChances': {
			'fir': 2,
			'sec': 8,
			'thi': 16,
			'slave': 32,
			'slum': 4,
		}
	}
	if (peek == 'basemod') return salaryMod.base[type];
	var mod = salaryMod[peek][type];
	base *= mod;
	if (peek == 'base') return base;
	return mod;
}
function checkHomeRent(home) {
	if (home.nextDueDate == undefined) home.nextDueDate = new EMDate(0, 1, 0);
	if (home.due == undefined) home.due = 0;
	if (home.rent == undefined) home.rent = getHouseValue(home.x, home.y);
	if (home.price == undefined) home.price = (home.rent * 60);
	if (home.bought == undefined) home.bought = false;

	if (home.bought) return;

	var due = home.nextDueDate;
	if (getDateValue(everyman.time) > getDateValue(due)) {
		home.due += home.rent;
		home.nextDueDate = new EMDate(0, 1, 0);
	}
}
function getDateValue(date) {
	var value = 0;
	value += (date.minutes / 1440);
	value += (date.hours / 24);
	value += date.day;
	value += (MONTH_DAYS * date.month);
	value += ((MONTH_DAYS * YEAR_MONTHS) * date.year);

	return value;
}
function EMDate(add_days, add_months, add_years) {
	this.hours = everyman.time.hours;
	this.minutes = everyman.time.minutes;
	this.day = everyman.time.day;
	this.month = everyman.time.month;
	this.year = everyman.time.year;

	if (add_days != undefined) { this.day += add_days; }
	if (add_months != undefined) { this.month += add_months; }
	if (add_years != undefined) { this.year += add_years; }

	while (this.day > MONTH_DAYS) {
		this.day -= MONTH_DAYS;
		this.month++;
	}
	while (this.month > YEAR_MONTHS) {
		this.month -= YEAR_MONTHS;
		this.year++;
	}
}
function SpawnPoint(item) {
	this.x = red(3, 18)
	this.y = red(3, 18);

	this.x += rand(0, 1);
	this.y += rand(0, 1);

	if (item) {
		var type = rand(0,1);
		if (type == 0) {
			this.x = rand(18, 22);
			this.y = rand(0, 22);
		}
		if (type == 1) {
			this.y = rand(18,22);
			this.x = rand(0, 22);
		}
	}
}
function loadv(text, min, max) {
	loading.style.opacity = 0.5;
	loading.innerHTML = text+' '+min+'/'+max+' ('+((min/max) * 100)+'%)';

	setTimeout(function() {
		loading.style.opacity = 0;
	}, 1000);
}

function newLayer(width, height, empty, lay, type, variation) {
	var layer = [];

	for (var h = 0; h < height; h++) {
		layer[h] = [];
		for (var w = 0; w < width; w++) {
			var toadd = '';

			if (lay == 1 && type == 'res') {
				toadd = 't_grass';
				if ((w >= 10 && w <= 12) || (h >= 10 && h <= 12)) toadd = 't_alley';
				if (w < 5 || w > 17 || h < 5 || h > 17) toadd = 't_road_walk';
				if (w == 1 || w == 21) {
					toadd = 't_road';
				}
				if (h == 1 || h == 21) {
					toadd = 't_road';
				}
				if (w == 0 || w == 22) toadd = 't_road_ns';
				if (h == 0 || h == 22) toadd = 't_road_ew';

				if ((w == 2 || w == 20) && (h < 2 || h > 20)) {
					toadd = 't_cross_ns';
				}
				if ((h == 2 || h == 20) && (w < 2 || w > 20)) {
					toadd = 't_cross_ew';
				}

				if ((w == 0 && h == 0) || (w == 22 && h == 22) || (w == 0 && h == 22) || (w == 22 && h == 0)) toadd = 't_crossroad';
			}
			if (lay == 1 && type == 'sea') {
				toadd = 'tile_sea';
			}
			if (lay == 1 && type != 'sea') {
				toadd = 't_road_walk';
			}
			if (lay == 1 && type == 'wil') {
				toadd = 't_grass';
			}
			if (lay == 1 && type == 'dung') {
				toadd = 't_road';
				if (w > 0 && h > 0 && w < (width - 1) && h < (height - 1)) {
					toadd = 'tile_woodfloor';
					if (variation == 'sec') toadd = 'tile_ironfloor';
					if (variation == 'thi' || variation == 'mix') toadd = 'tile_clearfloor';
				}
			}
			if (lay == 2 && type == 'dung') {
				if (w == 0 || h == 0 || w == (width - 1) || h == (height - 1)) toadd = 'tile_outerwall';
				if (w == 2 && h == 22) toadd = 'tile_empty';

				if (variation == 'sec') {
					if (w > 1 && w < (width - 1) && (h == 1 || h == 6)) {
						toadd = 'tile_belt';
						if (w == 2) toadd = 'tile_belt_machiner';
					}
					if (w == 1 && (h == 2 || h == 7)) toadd = 'tile_belt_machinel';
					if (w > 0 && w < 8 && h == 14) toadd = 'tile_crystalwall';
					if (w == 8 && h >= 14) toadd = 'tile_outerwall';

					if (w == 8 && h == 18) toadd = 'tile_work_door';

					if (w > 0 && w < 18 && w % 2 == 0 && h == 10) toadd = 'tile_cfence';
					if (w > 16 && w < (width - 1) && h == 10 && w % 2 == 0) toadd = 'tile_metal_post';
					if (w > 10 && w < (width - 1) && h > 12 && h < (height - 1) && h % 3 == 0 && w % 2 == 0) toadd = 'tile_metal_frame';
				}
				if (variation == 'thi') {
					if ((w > 0 && w < 5 || w > (width - 6) && w < (width - 1)) && h == 1) toadd = 'tile_shop_fridge';
					if (w > 5 && w < (width - 6) && (h == 1 || h == 6 || h == 11)) {
						toadd = 'tile_shop_shelf';
						if (h > 1) toadd = 'tile_shop_counter';
					}
					if (h == 15 && w >= 6 && w < (width - 1)) {
						toadd = 'tile_shop_desk';
						if (w == 11 || w == 19) toadd = 'tile_shop_work_door';
					}
					if ((w == 6 || w == 13) && h < (height - 1) && h > 15) {
						if (h < 18) toadd = 'tile_shop_desk'; 
						if (w == 6 && h > 17) toadd = 'tile_outerwall';
						if (h == 16) toadd = 'tile_shop_desk_machine';
						if (h == 19 && w == 6) toadd = 'tile_work_door';
					}
					if ((w == 7 || w == 14) && h == 16) toadd = 'tile_shop_vendor';
				}

			}

			if (lay == 2 && type == 'dung' && (variation == 'fir' || variation == 'res' || variation == 'mix' || variation == 'slum')) {
				toadd = 'tile_outerwall';

				if (w > 0 && h > 0 && w < (width - 1) && h < (height - 1)) toadd = 'tile_empty';

				if ((w == 6 || (w > 10 && w < (width - 1))) && h > 0 && h < (height - 1)) toadd = 'tile_hidden';
				if (w == 6 && h == 12) toadd = 'tile_empty';

				if ((h == 9 || h == 15 || (h > 0 && h < 5)) && w > 0 && w < (width - 1)) toadd = 'tile_hidden';
				if (w >= 7 && w < (width - 1) && ((h > 0 && h < 10) || (h > 13 && h < (height - 1)))) toadd = 'tile_hidden';

				if (variation == 'fir' && toadd == 'tile_hidden') toadd = 'tile_woodwall';

				if ((h == 9) && h != 0 && h != (height - 1) && (w == 3)) toadd = 'tile_empty';
				if ((h == 15) && h != 0 && h != (height - 1) && (w == 3)) toadd = 'tile_empty';

				if (w == 3 && h == 15 && (variation == 'res' || variation == 'mix' || variation == 'slum')) toadd = 'tile_door';

				if (w == 1) {
					if (h == 10) toadd = 'tile_fridge';
					if (h == 11) toadd = 'tile_cooker';
					if (h == 12) toadd = 'tile_cabinet';
				}
				if (h == 5) {
					if (w == 1) toadd = 'tile_bed2';
					if (w == 3) toadd = 'tile_table';
					if (w == 2) toadd = 'tile_closet';
				}
				if (h == 10) {
					if (w == 7) toadd = 'tile_sink2';
					if (w == 8) toadd = 'tile_toilet';
				}
				if (w == 1 && h == 6) toadd = 'tile_bed1';


				if (w == 2 && h == (height - 1)) toadd = 'tile_empty';

				if (variation == 'fir' && w == 0 && h == 10) toadd = 'tile_work_door';
			}
			if (lay == 2) if ((variation == 'mix' || variation == 'slum') && w == 0 && h == 18) toadd = 'tile_work_door';


			if (toadd) layer[h][w] = toadd;
		}
	}
	return layer;
}
function beautifyTile(mapx, mapy) {
	var minx = parseInt(mapx) - 1;
	var maxx = parseInt(mapx) + 1;

	var miny = parseInt(mapy) - 1;
	var maxy = parseInt(mapy) + 1;
	for (var x = minx; x <= maxx; x++) {
		for (var y = miny; y <= maxy; y++) {
			decorateMap(city, x, y);
		}
	}
}
function getItemTile(id) {
	if (itemList[id].tile) return getItemTile(itemList[id].tile);
	return '-'+(parseInt(id) * 30)+'px 0px';
}
function decorateMap(mapobject, mapx, mapy) {
	if (!mapobject) return;
	if (getTypeOfMap(mapobject.map, mapx, mapy) == 'void') return;

	mapobject = mapobject.map;
	var map = mapobject[mapx][mapy].map;
	var maptype = mapobject[mapx][mapy].type;
	var surr = getSurroundingTypes(mapobject, mapx, mapy);
	var layer = map[1];

	for (var y = 0; y < MAP_HEIGHT; y++) {
		for (var x = 0; x < MAP_WIDTH; x++) {
			var maxh = layer.length;
			var maxw = layer[y].length;

			var halfh = Math.floor(maxh / 2);
			var halfw = Math.floor(maxw / 2);
			if (maptype == 'par') {
				var mw = maxw - 5;
				var mh = maxh - 5;
				var toadd = 't_road';
				if (x <= 4 || y <= 4 || x >= mw || y >= mh) toadd = 't_road_walk';

				layer[y][x] = toadd;
			}
			if (maptype == 'sea') {
				var toadd = '';
				if (surr.bottom != 'sea' && x > maxw - 4) toadd = 't_road_walk';

				if (toadd) layer[y][x] = toadd;
			}
			if (maptype == 'fir' || maptype == 'sec' || maptype == 'thi' || maptype == 'res' || maptype == 'mix' || maptype == 'slum') {
				toadd = 't_road_walk';
				if (x > 4 && x < (maxw - 5) && y > 4 && y < (maxh - 5)) toadd = (maptype == 'fir') ? 't_grass' : 't_alley';
				if (x < 3 || y < 3 || x > (maxw - 4) || y > (maxh - 4)) toadd = 't_road';
				if (x == 1 || x == (maxw - 2)) toadd = 't_road_ns';
				if (y == 1 || y == (maxh - 2)) toadd = 't_road_ew';
				if ((x == 1 || x == (maxw - 2)) && (y == 1 || y == (maxh - 2))) toadd = 't_crossroad';

				layer[y][x] = toadd;
			}
		}
	}
	var layer = map[2];
	for (var y = 0; y < MAP_HEIGHT; y++) {
		for (var x = 0; x < MAP_WIDTH; x++) {
			var toadd = '';
			if (maptype == 'fir') {
				if ((x >= 5 && x <= 17) && (y == 5 || y == 17)) toadd = 'tile_fence_ns';
				if ((y >= 5 && y <= 17) && (x == 5 || x == 17)) toadd = 'tile_fence_ew';
				if (x == 11 && y == 17) toadd = 'tile_fence_door';
			}

			if (maptype != 'sea' && maptype != 'par') {
				if (x == 19 && y == 19) toadd = 'tile_bin';
			}

			if (toadd) layer[y][x] = toadd;
		}
	}

}
function updateBuilding(wherex, wherey) {
	if (isHome(player, wherex, wherey)) return;
	city.map[wherex][wherey].building = undefined;
	var buildingType = city.map[wherex][wherey].type;
	city.map[wherex][wherey].inside = new Inside(buildingType);
	decorateMap(city, wherex, wherey);

	if (wherex == player.mapID.x && wherey == player.mapID.y) displayMap();
}
function buildBuilding(wherex, wherey) {
	var here = city.map[wherex][wherey].map;
	if (city.map[wherex][wherey].building > 0) return;
	var floors = getSurroundingFloors(wherex, wherey).rand;
	var buildingType = city.map[wherex][wherey].type;
	if (buildingType == 'sea' || buildingType == 'par' || buildingType == 'wil') return;

	var bsize = rand(3, 8);

	var block = size(8, bsize, floors);
	city.map[wherex][wherey].building = floors;
	city.map[wherex][wherey].bsize = bsize;
	city.map[wherex][wherey].inside = new Inside(buildingType, bsize, floors);
	var tileset = 'tile_proto';
	if (buildingType == 'fir') tileset = 'tile_agro';

	placeBuilding(here, size(6, 6, 2), block, tileset);

	var maxpeople = (11 * bsize * (floors-2)) / 3;
	if (buildingType == 'mix') maxpeople /= 2;
	maxpeople = Math.floor(maxpeople);
	var r = rand(1, maxpeople);
	if (buildingType == 'res' || buildingType == 'mix' || buildingType == 'slum') {
		r = 1;
		for (var x = 0; x <= r; x++) addPerson('npc', wherex, wherey);
	} 
}
function Inside(type, size, floors) {
	this.map = [];
	for (var xx = 0; xx < 4; xx++) this.map.push(newLayer(MAP_WIDTH, MAP_HEIGHT, 'tile_empty', xx, 'dung', type));
}
function changeTile(mp, x, y, newTile) {
	mp[y][x] = newTile;
}
function getBestZone(mapobject, mapx, mapy) {
	var zones = [];
	for (var x = mapx-2; x < mapx+2; x++) {
		for (var y = mapy-2; y < mapy+2; y++) {
			var thisZone = getTypeOfMap(mapobject, x, y);
			if (thisZone != 'wil' && thisZone != 'sea' && thisZone != 'void' && thisZone != 'par') zones.push(thisZone);
		}
	}
	var randomZone = read(['fir', 'sec', 'thi', 'res', 'mix', 'slum']);
	return randomZone;
	zones.push(randomZone);


	return read([read(zones), randomZone]);
}
function getSurroundingTypes(mapobject, mapx, mapy) {
	mapx = parseInt(mapx);
	mapy = parseInt(mapy);
	return {
		'top': getTypeOfMap(mapobject, mapx-1, mapy),
		'left': getTypeOfMap(mapobject, mapx, mapy-1),
		'right': getTypeOfMap(mapobject, mapx, mapy+1),
		'bottom': getTypeOfMap(mapobject, mapx+1, mapy),
	}
}
function getHouseValue(mapx, mapy, peeklevel) {
	var mod = 0;
	mod += getLotValue(mapx, mapy, 'self');
	var dirs = ['top', 'left', 'topleft', 'topright', 'bottom', 'right', 'bottomleft', 'bottomright'];

	for (var d in dirs) {
		var c = coordsFrom(mapx, mapy, dirs[d]);
		var modv = getLotValue(c.x, c.y, 'short');
		mod += modv
	}

	for (var d in dirs) {
		var c = coordsFrom(mapx, mapy, dirs[d], true);
		var modv = getLotValue(c.x, c.y, 'long');
		mod += modv
	}

	if (peeklevel == 'neighborhood') return mod;

	var floormod = 3;
	floormod -= (getBuildingHeight(mapx, mapy) - 3);
	if (floormod) mod += floormod;

	if (peeklevel == 'floormod') return floormod;

	var houseValue = BASE_HOUSE_VALUE;

	houseValue *= 0.2;

	houseValue /= 12;

	houseValue *= Math.pow(1.05, mod);



	return round(houseValue);
}
function getLotValue(mapx, mapy, peeklevel) {
	var svalues = {'res': 0, 'mix': -1, 'fir': -2, 'slum': -3, 'els': -4};
	var values = {'fir': -2, 'wil': -3, 'slum': -4, 'sec': -5, 'thi': 1, 'par': 1, 'sea': 2, 'els': 0};
	var valuesl = {'fir': -1, 'wil': -2, 'slum': -2, 'sec': -3, 'sea': 1, 'els': 0};
	var modifier = 0;
	var thislot = getTypeOfMap(city.map, mapx, mapy);

	if (peeklevel == 'self') {
		modifier += (svalues[thislot]) ? svalues[thislot] : svalues.els;
	}
	if (peeklevel == 'short') {
		modifier += (values[thislot]) ? values[thislot] : values.els;
	}
	if (peeklevel == 'long') {
		modifier += (valuesl[thislot]) ? valuesl[thislot] : valuesl.els;
	}


	return modifier;
}

function getSurroundingFloors(mapx, mapy) {
	mapx = parseInt(mapx);
	mapy = parseInt(mapy);
	var surr = {};
	var dirs = ['top', 'left', 'topleft', 'topright', 'bottom', 'right', 'bottomleft', 'bottomright'];
	for (var d in dirs) {
		var name = dirs[d];
		surr[name] = getBuildingHeight(coordsFrom(mapx, mapy, dirs[d]));
	}
	for (var d in dirs) {
		var name = dirs[d]+'l';
		surr[name] = getBuildingHeight(coordsFrom(mapx, mapy, dirs[d], true));
	}

	var min, max;
	for (var s in surr) {
		var su = surr[s];
		if (min == undefined || su < min) min = su;
		if (max == undefined || su > max) max = su;
	}
	if (min == undefined) min = 3;
	if (max == undefined) max = 3;
	return {'min': min, 'max': max, 'rand': rand(min, max+1)};
}
function coordsFrom(x, y, direction, longy) {
	var n = (longy) ? 2 : 1;
	if (direction == 'top' || direction == 'topleft' || direction == 'topright') x -= n;
	if (direction == 'left' || direction == 'topleft' || direction == 'bottomleft') y -= n;
	if (direction == 'right' || direction == 'topright' || direction == 'bottomright') y += n;
	if (direction == 'bottom' || direction == 'bottomleft' || direction == 'bottomright') x += n;

	return {'x': x, 'y': y};
}
function getBuildingHeight(coords) {

	var mapx = coords.x;
	var mapy = coords.y;
	if (!city.map[mapx]) return 3;
	if (!city.map[mapx][mapy]) return 3;
	var m = city.map[mapx][mapy].building;
	if (m == undefined) return 3;
	return m;
}
function getBoundLimit(map, mapx, mapy) {
	if (mapx < 0) return 'west';
	if (mapy < 0) return 'north';
	if (mapx >= map.length) return 'east';
	if (mapy >= map[0].length) return 'south';
}
function getTypeOfMap(mapobject, mapx, mapy) {
	var m = mapobject[mapx];
	if (!m) return 'void';
	m = m[mapy];
	if (!m) return 'void';
	return m.type;
}

function newMap(width, height, layers, type) {
	var tiles = [];
	for (var lay = 0; lay < layers; lay++) {
		var defaultTile = 'tile_empty';
		var laysByLevel = [];
		if (laysByLevel[lay]) defaultTile = laysByLevel[lay];
		tiles[lay] = newLayer(width, height, defaultTile, lay, type);
	}

	return tiles;
}
function addBuildingHere(slot) {
	var here = getActiveMap();
	var block = size(rand(3, 5), rand(3, 5), rand(5, 20));

	var x = (slot == 1 || slot == 3) ? 13 : 5;
	var y = (slot == 2 || slot == 3) ? 13 : 5;

	placeBuilding(here, size(x, y, 2), block, 'tile_proto');

	displayMap(getActiveMap());
}
function testBuildings() {
	var tiles = DEBUG_MAP;

	placeBuilding(tiles, size(5, 5, 2), size(5, 5, 5), 'tile_proto');
	placeBuilding(tiles, size(13, 5, 2), size(5, 5, 5), 'tile_proto');
	placeBuilding(tiles, size(5, 13, 2), size(5, 5, 5), 'tile_proto');
	placeBuilding(tiles, size(13, 13, 2), size(5, 5, 5), 'tile_proto');

}
function getMyJobName() {
	return jobList[player.job.type][player.job.id].name;
}
function getRandomFoodItem() {
	var items = [];
	for (var i in itemList) if (itemList[i].food) items.push(itemList[i].name);
	return read(items);
}

function movePlayer(direction) {
	moveGuy(player, direction, true);

	info.innerHTML = debugInfo(player);

	if (drawWanted(1) > 0) {
		addCrime(player, 6, drawWanted(1));
	}
}
function getRandomEmptySpace(city) {
	var map = city.map;
	var emptySpaces = [];
	for (var h in map) {
		for (var w in map[h]) if (getTypeOfMap(map, w, h) == 'wil') emptySpaces.push({'w': w, 'h': h});
	}
	return read(emptySpaces);
}
function checkExits(city, pointer) {
	var dirs = ['north', 'west', 'east', 'south'];
	var exits = [];
	for (var di in dirs) {
		var dir = dirs[di];
		if (isDestinationOutOfLimits(city, pointer, dir)) {
			exits.push(dir);
			continue;
		}
		var np = {'w': pointer.w, 'h': pointer.h};
		np = movePointer(np, dir);
		if (city.map[np.w][np.h].type == 'wil') exits.push(dir);
	}
	return exits;
}
//Map types:
/*
	wild		No city built
	first		Farm, rural area
	second		Industries
	third		Central Business District
	mixed		Offices, shops and apartments
	resid		Single-family housing
	park		Transition between districts
	trans       Roads between districts (only for cars)
*/
function populateChunkAt(map, mapx, mapy) {
	var pointer = {'w': mapx, 'h': mapy};
	var extrapointer = {'w': parseInt(mapx)+1, 'h': parseInt(mapy)+1};

	expandCityLimits(city, extrapointer);
	var type = getBestZone(map, mapx, mapy);
	if ((mapx - 3) % 6 == 0 && (mapy - 3) % 6 == 0) type = 'par';
	if (mapx < 1 || mapy < 1) type = 'sea';

	forceNewZone(city, pointer, type, 0);
}
function expandCity(city) {
	var cityMap = city.map;

	var i = 1;
	do {
		var pointer = getRandomEmptySpace(city);
		populateChunkAt(cityMap, pointer.w, pointer.h);
		beautifyTile(pointer.w, pointer.h);
		buildBuilding(pointer.w, pointer.h);
		i++;
	} while (rand(0,1));
}
function fixPointer(tpointer, direction) {
	if (direction == 'west') movePointer(tpointer, 'east');
	if (direction == 'north') movePointer(tpointer, 'south');
}
function forceNewZone(city, pointer, type, sector) {
	var name = newDistrictName();

	if (getTypeOfMap(city.map, pointer.w, pointer.h) == 'wil') {
		city.map[pointer.w][pointer.h] = new EmptyMap(type, sector, name);
		decorateMap(city, pointer.w, pointer.h);
	}
}
function getLeftPointer(pointer, direction, alt) {
	var np = {'h': pointer.h, 'w': pointer.w};
	var lefts = {
		'north': 'west', 'east': 'north', 'south': 'east', 'west': 'south'
	}
	var rights = {
		'north': 'east', 'east': 'south', 'south': 'west', 'west': 'north'
	}
	var dir = (alt) ? rights[direction] : lefts[direction];
	movePointer(np, dir);

	return {'w': np.w, 'h': np.h, 'dir': dir};
}
function isDestinationOutOfLimits(city, pointerz, direction) {
	var minx = 0;
	var miny = 0;
	var maxx = city.map.length;
	var maxy = city.map[0].length;

	pointerz = JSON.parse(JSON.stringify(pointerz));

	var newPointer = movePointer(pointerz, direction);

	if (newPointer.h < miny || newPointer.w < minx) return true;
	if (newPointer.h >= maxy || newPointer.w >= maxx) return true;
}
function expandCityLimits(city, pointer) {
	if (city.map.length >= 23 && city.map[0].length >= 23) return;
	var typof = getTypeOfMap(city, pointer.w, pointer.h);
	if (typof != 'void') return;
	var direction = getBoundLimit(city.map, pointer.w, pointer.h);

	var dname = newDistrictName();

	if (direction == 'west') {
		var arr = [];
		for (var e in city.map[0]) arr.push(new EmptyMap('wil', 4, dname));
		city.map.unshift(arr);
		displaceAllGuys('east');
	}
	if (direction == 'east') {
		var arr = [];
		for (var e in city.map[0]) {
			var type = (e < 1) ? 'sea' : 'wil';
			arr.push(new EmptyMap(type, 4, dname));

		}
		city.map.push(arr);
	}
	if (direction == 'north') {
		for (var e in city.map) city.map[e].unshift(new EmptyMap('wil', 4, dname));
		displaceAllGuys('south');
	}
	if (direction == 'south') {
		for (var e in city.map) {
			var type = (e < 1) ? 'sea' : 'wil';
			city.map[e].push(new EmptyMap(type, 4, dname));
		}
	}

	return true;
}
function getZonesByType(city) {
	var zones = {
		'fir': 0, 'sec': 0, 'thi': 0, 'res': 0, 'mix': 0, 'sea': 0, 'par': 0, 'slum': 0,
	}
	for (var w in city.map) {
		for (var h in city.map[w]) {
			var tile = city.map[w][h];
			if (zones[tile.type] != undefined) zones[tile.type] = 1;
			if  (zones.fir + zones.sec + zones.thi + zones.res + zones.mix + zones.sea + zones.par + zones.slum == 8) return true;
		}
	}
	return false;
}
function getMapFromPointer(city, pointer) {
	if (city.map[pointer.w] == undefined) return;
	return city.map[pointer.w][pointer.h];
}
function displaceAllGuys(direction) {
	for (var g in everyman.people) {
		var guy = everyman.people[g];
		if (direction == 'north') guy.mapID.y--;
		if (direction == 'south') guy.mapID.y++;
		if (direction == 'east') guy.mapID.x++;
		if (direction == 'west') guy.mapID.x--;
	}
	var guy = player;
	if (direction == 'north') guy.mapID.y--;
	if (direction == 'south') guy.mapID.y++;
	if (direction == 'east') guy.mapID.x++;
	if (direction == 'west') guy.mapID.x--;
}
function drawCityMap(city) {
	var div = '<div class="cityMap">';

	for (var dx in city.map) {
		for (var dy in city.map[0]) {
			var sq = city.map[dx][dy];
			var youAreHere = (player.mapID.x == dx && player.mapID.y == dy) ? 'youAreHere' : '';
			div += '<div title="District '+sq.districtName+""+'0'+""+sq.sector+'-'+sq.type.toUpperCase()+'" class="'+sq.type+' cityMapTile '+youAreHere+'" style="top: '+(parseInt(dy) * 8)+'px; left: '+(parseInt(dx) * 8)+'px"></div>';
		}
		div += '<div class="breaker"></div>';
	}

	div += '</div>';
	return div;
}
function cityMapToIso(city) {

}
function EmptyMap(type, sector, dname, surr) {
	this.type = type;
	this.sector = sector;
	this.districtName = dname;
	this.map = newMap(MAP_WIDTH, MAP_HEIGHT, MAX_LAYERS, type);
}
function pickFurniture() {
	var infront = whatsInFrontOf(player);
	if (everyman.held) {
		if (!infront.upfront || infront.upfront == 'tile_empty') {
			editActiveMap(infront.frontcoords.x, infront.frontcoords.y, 2, everyman.held);
			everyman.held = undefined;
			displayMap();
		}
	}
	else {
		if (infront.upfront) {
			var checkItem = furnitureStatus[infront.upfront];
			var mode = isHome(player, player.mapID.x, player.mapID.y);
			var exitStatus = 0;
			if (!mode) exitStatus = 'home_not_yours';
			if (!checkItem) exitStatus = 'forbidden_item';
			if (checkItem == 'build' && !mode.bought) exitStatus = 'not_on_build_mode';
			if (exitStatus) {
				return;
			}
			everyman.held = infront.upfront;
			editActiveMap(infront.frontcoords.x, infront.frontcoords.y, 2, 'tile_empty');
			displayMap();
		}
	}
}
function pick(x, y, z) {

}
function City() {
	this.tier = 0;
	this.population = 0;
	this.map = newCityMap(3, 3);
}
function newDistrictName() {
	return zeroPad(rand(0, Math.pow(36, 5)), 3);
}
function newCityMap(width, height) {
	var map = [];

	for (var w = 0; w < width; w++) {
		map[w] = [];
		for (var h = 0; h < height; h++) {
			var type = 'wil';
			if (h == 0 || w == 0) type = 'sea';

			map[w][h] = new EmptyMap(type, 4, newDistrictName());
		}
	}

	for (var w = 0; w < width; w++) {
		for (var h = 0; h < height; h++) {
			decorateMap(city, w, h);
		}
	}

	return map;
}
function whatsHere(array, pos) {
	if (array[pos.z]) {
		if (array[pos.z][pos.y]) {
			var hier = array[pos.z][pos.y][pos.x];
			if (hier) {
				if (hier == 'tile_empty' || hier == 'tile tile_empty') return false;
				return hier;
			}
		}
	}
	return false;
}
function movePointer(pointer, direction) {
	var dir = direction;
	var directions = {
		'north': size(0, -1),
		'south': size(0, 1),
		'east': size(1, 0),
		'west': size(-1, 0),
	}
	var directionID = directionNames.indexOf(direction);
	dir = directions[direction];

	pointer.w += parseInt(dir.width);
	pointer.h += parseInt(dir.height);

	return pointer;
}
function moveGuy(guyObject, direction, isPlayer, force) {
	if (!direction) direction = 'north';
	var dir = direction;
	var directions = {
		'north': size(0, -1),
		'south': size(0, 1),
		'east': size(1, 0),
		'west': size(-1, 0),
	}
	var directionID = directionNames.indexOf(direction);
	guyObject.facing = directionID;

	var guyMap = city.map[guyObject.mapID.x][guyObject.mapID.y];
	if (guyObject.inside != undefined) {
		guyMap = guyMap.inside.map;
	}
	else {
		guyMap = guyMap.map;
	}

	direction = directions[direction];

	var nextx = guyObject.x + direction.x;
	var nexty = guyObject.y + direction.y;

	var wh = whatsHere(guyMap, size(nextx, nexty, guyObject.z));
	var wh2 = (whatsHere(guyMap, size(nextx, nexty, guyObject.z-1)) == 'tile_sea') ? true : false;

	if (force) {
		wh = false;
		wh2 = false;
	}
	if ((wh || wh2)) return 'thump';


	guyObject.x += direction.x;
	guyObject.y += direction.y;

	guyObject.walking = true;
	setTimeout(function() {
		guyObject.walking = false;
		drawPerson(guyObject);
	}, 100);

	var maxw = MAP_WIDTH - 1;
	var maxh = MAP_HEIGHT - 1;

	if (guyObject.x < 0) {
		guyObject.x = 0;
		displaceThere(guyObject, dir);
	}
	if (guyObject.x > maxw) {
		guyObject.x = maxw;
		displaceThere(guyObject, dir);
	}
	if (guyObject.y < 0) {
		guyObject.y = 0;
		displaceThere(guyObject, dir);
	}
	if (guyObject.y > maxh) {
		guyObject.y = maxh;
		displaceThere(guyObject, dir);
	}
	drawPerson(guyObject);
}
function redrawInside() {
	var thismap = getActiveMap();
	city.map[player.mapID.x][player.mapID.y].inside = new Inside(getTypeOfMap(city.map, player.mapID.x, player.mapID.y));

	displayMap();
}
function displaceThere(guy, direction) {
	var destination = size(guy.mapID.x, guy.mapID.y);

	if (direction == 'north') destination.y--;
	if (direction == 'south') destination.y++;
	if (direction == 'east') destination.x++;
	if (direction == 'west') destination.x--;

	var exists = (city.map[destination.x] && city.map[destination.x][destination.y] && city.map[destination.x][destination.y].type != 'sea') ? true : false;
	if (exists) {
		var width = city.map[destination.x][destination.y].map.length - 1;

		if (!guy.inside) {
			guy.mapID.x = destination.x;
			guy.mapID.y = destination.y;

			if (direction == 'north') guy.y = width;
			if (direction == 'south') guy.y = 0;

			if (direction == 'west') guy.x = width;
			if (direction == 'east') guy.x = 0;
		}
		if (guy.inside) {
			guy.inside = undefined;
			guy.x = guy.outsideCoords.x;
			guy.y = guy.outsideCoords.y;
		}

		if (guy == player) displayMap();
	}
	if (guy == player) {
		recheckGuys();
	}
}
function recheckGuys() {
	for (var g in everyman.peopleList) {
		tickPeople(everyman.peopleList[g]);
		drawPerson(everyman.people[everyman.peopleList[g]]);
	}
	availableGuys = randomAvailableGuy();
}
function displayMap(width, height, layers, worldmap) {
	if (!worldmap) var tiles = getActiveMap();
	if (worldmap) {
		var tiles = [[]];
		for (var w in city.map) {
			tiles[0][w] = [];
			for (var h in city.map[w]) {
				tiles[0][w][h] = 'tile_'+city.map[w][h].type;
			}
		}
	}
	var width = MAP_WIDTH;
	var height = MAP_HEIGHT;
	var layers = MAX_LAYERS;

	gaem.innerHTML = drawLayer(size(width, height, layers), size(30, 60), 'tile tile_road', tiles);

	cMap.innerHTML = drawCityMap(city);

	drawLostItems();

	drawPerson(player);
}
function displayOverlay() {

}
function getRandomDirection() {
	return read(['north', 'south', 'east', 'west']);
}
function districtString(map) {
	return map.districtName+''+'0'+map.sector+'-'+map.type.toUpperCase();
}
function switchTime(type) {
	clearInterval(timer_tp);
	if (type == 'ultrafast') {
		timer_tp = setInterval(function() {timePass(type)}, 1);
	}
	if (type == 'fast') {
		timer_tp = setInterval(function() {timePass(type)}, 10);
	}
	if (type == 'slow') {
		timer_tp = setInterval(function() {timePass(type)}, 1000);
	}
}
function addItemToWarehouse(id, amt) {
	if (everyman.warehouse[id] == undefined) everyman.warehouse[id] = 0;
	everyman.warehouse[id] += amt;
}
function internWork() {
	for (var s in everyman.interns) {
		for (var i in everyman.interns[s]) {
			var interns = everyman.interns[s][i];
			var job = jobList[s][i];

			var inputList = job.input;
			var outputList = job.output;
			if (!inputList && !outputList) continue;
			var input, output;
			if (inputList != undefined && outputList != undefined) {
				//Input + Output job, 2xinput, 1xoutput
				var input = (interns * 4);
				var output = (interns * 2);
				var stock = 0;
				var objective = inputList.length;
				for (var it in inputList) {
					var id = inputList[it];
					var qty = everyman.warehouse[id];
					if (qty >= input) stock++;
				}
				if (stock >= objective) {
					for (var it in inputList) {
						var id = inputList[it];
						addItemToWarehouse(id, -input);
					}
					for (var it in outputList) {
						var id = outputList[it];
						addItemToWarehouse(id, output);
					}
				}
			}
			if (inputList == undefined && outputList != undefined) {
				//Output only job (2xoutput)
				var output = (interns * 2);
				for (var it in outputList) {
					var id = outputList[it];
					addItemToWarehouse(id, output);
				}
			}

		}
	}
}
function updateInterns() {
	var max = Math.floor(everyman.peopleList.length / 50);
	var rn = rand(0, max);
	for (var i = 0; i < rn; i++) {
		var r = read(everyman.peopleList);
		makeIntern(r);
	}
	internWork();
	drawWarehouse();
}
function newDayEvents() {
	var rx = rand(1, city.map.length) - 1;
	var ry = rand(1, city.map[0].length) - 1;
	updateBuilding(rx, ry);

	for (var w in city.map) for (var h in city.map[w]) {
		var map = city.map[w][h];
		if (map.lostItems) {
			var total = map.lostItems.length - 1;
			var r = rand(0, total);
			map.lostItems.splice(0, r);
		}
		if (map.trash == undefined) map.trash = [];
		if (map.trash && rand(0,1)) {
			map.trash = [];
			console.log('Emptying trash at ('+w+', '+h+')');
		}
	}
}
function immigrantPack(type) {
	var immigrantsPerMonth = Math.floor((getPopulation() / 10) + 1);
	var immigrantsPerDay = Math.floor(immigrantsPerMonth / MONTH_DAYS);

	console.log('Immigrants incoming! Pack type', type, 'max immigrants (month)', immigrantsPerMonth, 'max immigrants (day)', immigrantsPerDay);
	var r = 0;
	if (type == 'day') r = rand(0, immigrantsPerDay);
	if (type == 'month') r = rand(0, immigrantsPerMonth);
	console.log('Will add', r, 'immigrants');
	for (var im = 0; im < r; im++) addPerson();
}
function displayCrime(guy, peek) {
	var l = '';
	var totalvalue = 0;
	for (var e in guy.crime) {
		var c = guy.crime[e];
		if (c > 0) {
			var fee = round(c * crimes[e].tier);
			l += crimes[e].name+' (Severity: '+crimes[e].tier+') $'+fee+' fee.<br>';
			totalvalue += fee;
		}
	}
	var punishment = (totalvalue * 5);
	var wanted = Math.floor(totalvalue / 10);

	if (peek == 'fee') return totalvalue;
	if (peek == 'time') return punishment;
	if (peek == 'wanted') return wanted;

	l += '<hr>Total fees: $'+totalvalue.toFixed(2)+'<br>...or '+duration(punishment * 1000)+' in jail.<br>Wanted radius: '+wanted;
	return l;
}
function tickCrime(guy) {
	for (var c in guy.crime) {
		var crimeTier = crimes[c].tier;
		var amt = 1 / crimeTier;
		guy.crime[c] -= amt;
		guy.crime[c] = round(guy.crime[c]);
		if (guy.crime[c] <= 0) guy.crime[c] = 0;
	}
}
function timePass(type) {
	if (everyman.time == undefined) {
		everyman.time = {
			'hours': 0, 'minutes': 0, 'day': 1, 'month': 1, 'year': 1970,
		}
	}
	var amt = 1;
	if (type == 'fast') amt = 2;
	if (type == 'ultrafast') amt = 3;
	everyman.time.minutes += amt;

	if (player.crime == undefined) player.crime = [];
	if (isCriminal(player)) {
		tickCrime(player);
	}

	if (everyman.time.minutes >= 60) {
		everyman.time.minutes = 0;
		everyman.time.hours++;

		if (player.working) {
			var ichances = rand(1, player.job.itemChances);
			if (ichances == 1) {
				var rd = read(getDropsForJob(player.job));
				if (rd) addItemToInventory(rd, 1);
				if (lastDrops[rd] == undefined) lastDrops[rd] = 0;
				lastDrops[rd]++;
			}
		}

		var rx = rand(1, city.map.length) - 1;
		var ry = rand(1, city.map[0].length) - 1;
		if (rx > 0 && ry > 0) lostItem(rx, ry);

		addRandomItemToTrash();
	}
	if (everyman.time.hours >= 24) {
		everyman.time.hours = 0;
		everyman.time.day++;

		if (player.job != undefined) {
			player.job.dueHours += player.job.workhours;
			player.job.end = false;
		}

		immigrantPack('day');

		newDayEvents();
	}
	if (everyman.time.day >= MONTH_DAYS) {
		everyman.time.day = 1;
		everyman.time.month++;

		immigrantPack('month');

		expandCity(city);
		updateInterns();
	}
	if (everyman.time.month >= YEAR_MONTHS) {
		everyman.time.month = 1;
		everyman.time.year++;
	}
	if (player.working) {
		if (player.job.type == 'slum') addCrime(player, 3, (amt / 2));
		player.job.workedHours += (amt/60);
		player.job.dueHours -= (amt/60);
		updateWork();

		info.innerHTML = debugInfo(player);
	}
	tickPeopleStats(type);

	money_display.innerHTML = player.money.toFixed(2);
	time_display.innerHTML = zeroPad(everyman.time.hours, 2, true)+':'+zeroPad(everyman.time.minutes, 2, true)+' '+displayDate(everyman.time)+'<br>'+getPopulation()+' population'+getPlayerStats();
}
function getPlayerStats() {
	var sl = '';
	if (drawWanted(1) > 0) {
		sl = '<div>'+drawWanted(1)+' Police Officers looking for you.</div>';
		if (doc('wrapper').className != 'wanted') doc('wrapper').className = 'wanted';
	}
	if (!sl) doc('wrapper').className = '';
	if (player.hygiene == undefined) player.hygiene = 100;
	return '<div>'+player.health.toFixed(0)+'/100 Health</div>'+
	'<div>'+player.hunger.toFixed(0)+'/100 Food</div>'+
	'<div>'+player.energy.toFixed(0)+'/100 Energy</div>'+
	'<div>'+player.hygiene.toFixed(0)+'/100 Hygiene</div>'+sl;
}
function getPopulation() {
	var npcs = everyman.peopleList.length;
	var totalinterns = 0;
	for (var s in everyman.interns) for (var i in everyman.interns[s]) {
		totalinterns += everyman.interns[s][i];
	}
	return npcs + totalinterns;
}
function displayDate(date) {
	return zeroPad(date.day, 2, true)+'/'+getMonthName(date.month)+'/'+date.year;
}
function tickPersonStats(person, id) {
	if (person.energy == undefined) person.energy = 100; if (person.hunger == undefined) person.hunger = 100; if (person.health == undefined) person.health = 100;
	var dayfraction = (100 / (24 * 60 * 60));

	var maxedrain = (dayfraction * 100);
	var maxhdrain = (dayfraction * 50);
	var maxvdrain = (dayfraction * 33);

	person.energy = person.energy - (maxedrain);
	person.hunger = person.hunger - (maxhdrain);
	if (person.energy <= 0) {
		person.energy = 0;
	}
	if (person.hunger <= 0) {
		person.hunger = 0;
		var maxdrain = (person.energy > 25) ? 1 : 2;
		maxvdrain *= maxdrain;
		person.health -= maxvdrain;
	}
	if (person.health <= 0 && person != player) {
		killPerson(id, 'starvation');
	}
	if (person.health <= 0) person.health = 0;

	for (var h in person.homes) {
		checkHomeRent(person.homes[h]);
	}
}
function tickPeopleStats() {
	for (var p in everyman.people) {
		var person = everyman.people[p];
		tickPersonStats(person, p);
	}

	tickPersonStats(player);
}
function buildCity(city) {
	for (var e in city.map) {
		for (var d in city.map[e]) {
			var type = city.map[e][d].type;
			if (type != 'sea' && type != 'void' && type != 'par') beautifyTile(e, d);
		}
	}
	for (var e in city.map) {
		for (var d in city.map[e]) {
			var type = city.map[e][d].type;
			if (type != 'sea' && type != 'void' && type != 'par') buildBuilding(e, d);
		}
	}


	displayMap(getActiveMap());
}
function getMonthName(month) {
	return ['', 'Spring', 'Summer', 'Autumn', 'Winter'][month];
}
function killPerson(id, cause) {
	var ixof = everyman.peopleList.indexOf(id);
	everyman.peopleList.splice(ixof, 1);
	var el = everyman.people[id].element;
	document.body.removeChild(el);

	delete everyman.people[id];
	console.log(id, 'died of', cause);
}
function canAnNPCWalk(x, y, carmode) {
	var lay1min = 3;
	var lay1max = 4;

	var lay2min = 18;
	var lay2max = 19;
	if (y == x) return 'turn';
	if ((y >= lay1min && y <= lay1max) || (x >= lay1min && x <= lay1max)) return 'walk';
	if ((y >= lay2min && y <= lay2max) || (x >= lay2min && x <= lay2max)) return 'walk';
	return false;
}
function policeStrength(x, y) {

}
function getBestMove(from, to) {
	var lowest = {'dir': 'center', 'dist': Infinity}
	var dirs = ['north', 'east', 'south', 'west'];
	for (var d in dirs) {
		var dir = dirs[d];
		var h = hypoToDirection(from, dir);
		if (h.status == 'thump') continue;
		var dist = distance(h, to);
		if (dist < lowest.dist) lowest = {'dir': dir, 'dist': dist};
	}

	return lowest;
}
function hypoToDirection(from, dir) {
	var pointer = {'x': from.x, 'y': from.y, 'z': from.z, 'mapID': {'x': from.mapID.x, 'y': from.mapID.y}};
	pointer.status = moveGuy(pointer, dir);
	return pointer;
}
function distance(from, to) {
	var distancex = Math.abs(((from.mapID.x * MAP_WIDTH) + from.x) - ((to.mapID.x * MAP_WIDTH) + to.x));
	var distancey = Math.abs(((from.mapID.y * MAP_HEIGHT) + from.y) - ((to.mapID.y * MAP_HEIGHT) + to.y));

	return distancex + distancey;
}
function tickPeople() {
	if (!everyman) return;
	if (player.hold) return;
	
	var id = read(availableGuys);
	if (drawWanted(1) > 0) id = read(read([availableGuys, wantedOfficers]));
	if (id == undefined) {
		ticker = 0;
		id = read(everyman.peopleList);
	}
	var person = everyman.people[id];
	if (person == undefined) return;
	var d = new Date();
	if (d.valueOf() < person.lastMove) return;
	person.lastMove = d.valueOf() + 250;

	//Move guy
	var canwalk = canAnNPCWalk(person.x, person.y);
	if (canwalk == 'turn' || person.forceTurn) {
		person.facing = rand(0,3);
		person.forceTurn = false;
	}

	var dir = directionNames[person.facing];
	var lastx = person.x;
	var lasty = person.y;

	//Only for policemen
	if (person.type == 'police' || person.type == 'police_extra') {
		if (isCriminal(player) > 0) {
			var wanted = displayCrime(player, 'wanted');
			var dist = distance(person, player);
			if (wanted >= dist) {
				var bm = getBestMove(person, player);
				dir = bm.dir;
				wantedOfficers[person.id] = bm.dist;
				if (bm.dist == 1 && person.inside == player.inside) arrest(player);
			}
			else {
				if (wantedOfficers[person.id]) delete wantedOfficers[person.id];
			}
		}
	}

	moveGuy(person, dir);

	if (lastx == person.x && lasty == person.y && rand(1, 10) == 1) person.forceTurn = true;

	if (!person.mapID) person.mapID = {
		'x': 2,
		'y': 2,
	}
}
function randomAvailableGuy() {
	var guys = [];
	var radius = 0;
	for (var g in everyman.people) {
		var guy = everyman.people[g];
		if (guy.mapID.x >= (player.mapID.x - radius) && guy.mapID.x <= (player.mapID.x + radius) && guy.mapID.y >= (player.mapID.y - radius) && guy.mapID.y <= (player.mapID.y + radius)) guys.push(g);
	}
	return guys;
}
function whatsInFrontOf(guy) {
	var map = getActiveMap();
	var look = {'x': guy.x, 'y': guy.y};
	var fac = directionNames[guy.facing];
	if (fac == 'north') look.y--;
	if (fac == 'south') look.y++;
	if (fac == 'east') look.x++;
	if (fac == 'west') look.x--;

	var upfront = map[2][look.y][look.x];

	var guys = randomAvailableGuy();
	var guyfront;
	for (var g in guys) {
		var check = everyman.people[guys[g]];
		if (check.x == look.x && check.y == look.y) guyfront = guys[g];
	}
	var item;
	var mappy = city.map[player.mapID.x][player.mapID.y];
	for (var li in mappy.lostItems) {
		var litem = mappy.lostItems[li];
		if (litem.x == look.x && litem.y == look.y) item = litem;
	}

	return {'upfront': upfront, 'guyfront': guyfront, 'frontcoords': look, 'item': item};
}
function debugInfo(guy) {
	var map = getActiveMap();
	var stepon = map[1][guy.y][guy.x];
	var look = {'x': guy.x, 'y': guy.y};
	var fac = directionNames[guy.facing];
	if (fac == 'north') look.y--;
	if (fac == 'south') look.y++;
	if (fac == 'east') look.x++;
	if (fac == 'west') look.x--;

	var stepfront = map[1][look.y][look.x];
	var upfront = map[2][look.y][look.x];

	var guys = randomAvailableGuy();
	var guyfront;
	for (var g in guys) {
		var check = everyman.people[guys[g]];
		if (check.x == look.x && check.y == look.y) guyfront = guys[g];
	}

	debug_interns.innerHTML = displayCrime(guy)+'<br><br>'+drawWanted();
	return JSON.stringify({'crime': guy.crime, 'blocker': getBlocker(player)});
}
function enterBuilding(guy) {
	var map = city.map[guy.mapID.x][guy.mapID.y];
	if (!map.inside) return;
	guy.inside = true;
    guy.outsideCoords = {'x': guy.x, 'y': guy.y};
    guy.x = 2;
    guy.y = 22;
}
function isHome(player, mapx, mapy) {
	for (var h in player.homes) {
		var home = player.homes[h];
		if (home.x == mapx && home.y == mapy) return home;
	}
	return false;
}
function buyHome(x, y) {
	var home = new Home(x, y);
	if (isHome(player, x, y)) return;
	if (player.money >= home.price) {
		player.money -= home.price;
		home.bought = true;
		player.homes.push(home);
		showNotice('You have a new home!', 'Forget about the rent. It is paid!<br>You may now enter your new home by pressing SPACE in front of this door.');
	}
}
function rentHome(x, y) {
	var home = new Home(x, y);
	if (isHome(player, x, y)) return;
	if (player.money >= home.entryPrice) {
		player.money -= home.entryPrice;
		player.homes.push(home);

		showNotice('You have a new home!', 'Remember to pay the rent!<br>You may now enter your new home by pressing SPACE in front of this door.');
	}
}
function applyJob(x, y) {
	player.job = new Job(x, y);
	player.job.dueHours += player.job.workhours;

	startWorking();
}
function getDropsForJob(job, ret) {
	var j = jobList[job.type][job.id];
	var drops = [];
	if (j.input != undefined) for (var i in j.input) drops.push(j.input[i]);
	if (j.output != undefined) for (var i in j.output) drops.push(j.output[i]);
	if (j.shop != undefined) for (var i in j.shop) drops.push(j.shop[i]);

	if (ret) for (var d in drops) drops[d] = itemList[drops[d]].name;

	return drops;
}
function askWork(job) {
	notice_header.innerHTML = 'Work at '+getTypeOfMap(city.map, job.x, job.y).toUpperCase()+'-'+city.map[job.x][job.y].districtName;

	notice_msg.innerHTML = '<b>Job ('+jobList[job.type][job.id].name+')</b><br>';
	if (job.type == 'slum') notice_msg.innerHTML += '<b class="illegal">This job is illegal. You may be sent to jail for working here.</b><br>';
	notice_msg.innerHTML += 'Salary (per hour): $'+job.baseSalary.toFixed(2)+'<br>';
	notice_msg.innerHTML += 'Work Hours (day): '+job.workhours+'h<br>';
	notice_msg.innerHTML += 'Pay Day every '+job.payday+' days<br>';

	var drops = getDropsForJob(job, 1);
	if (drops.length > 0) {
		notice_msg.innerHTML += 'Item drop chances: '+(100 * (1 / job.itemChances))+'% each hour.<br>';
		notice_msg.innerHTML += 'Possible drops: <b>'+drops.join('</b>, <b>')+'</b><br><br>';
	}

	notice_msg.innerHTML += '<div class="btn btn-primary" onclick="applyJob('+job.x+', '+job.y+')">Apply for this Job</div>';

	sNotice();
}
function quitJob() {
	payCheck(player.job);
	onPlayerNotification('You have been fired!');
	closeNotice();
	player.job = undefined;
}
function askRent(home) {
	notice_header.innerHTML = 'Pay the Rent!';

	notice_msg.innerHTML = '<b>Rent</b><br>';
	notice_msg.innerHTML += 'Amount due: $'+round(home.due)+'<br>';
	notice_msg.innerHTML += 'Time left to pay the rent: '+round(getDateValue(everyman.time) - getDateValue(home.nextDueDate))+' days.<br>';
	notice_msg.innerHTML += '<div class="btn btn-success" onclick="payRent('+home.x+', '+home.y+')">Pay Now</div>';
	notice_msg.innerHTML += '<div class="btn btn-default" onclick="closeNotice()">Dismiss This Message</div>';

	sNotice();
}
function payRent(x, y) {
	for (var h in player.homes) {
		var home = player.homes[h];
		if (home.x == x && home.y == y) {
			var due = home.due;
			if (player.money <= due) due = player.money;
			player.money -= due;
			home.due -= due;
		}
	}
}
function askBuy(home) {
	var type = getTypeOfMap(city.map, home.x, home.y);
	notice_header.innerHTML = 'Rent/Buy home at '+type.toUpperCase()+'-'+city.map[home.x][home.y].districtName;


	notice_msg.innerHTML = '<b>Rent</b><br>';
	if (type != 'fir' && type != 'res') {
		notice_msg.innerHTML += 'Price (Rent): $'+home.rent+'/month<br>';
		notice_msg.innerHTML += 'Entry Price (Rent): $'+home.entryPrice+'<br>';
		notice_msg.innerHTML += 'Next due date (Rent): '+displayDate(home.nextDueDate)+'<br>';
		var bclass = (player.money >= home.entryPrice) ? 'btn-primary' : 'btn-danger';
		notice_msg.innerHTML += '<div class="btn '+bclass+'" onclick="rentHome('+home.x+', '+home.y+')">Rent Home ($'+round(home.entryPrice)+')</div><br><br>';
	}
	else {
		notice_msg.innerHTML += '<i>Unavailable</i><br><br>';
	}

	notice_msg.innerHTML += '<b>Buy</b><br>';
	if (type != 'slum') {
		notice_msg.innerHTML += 'Price (Buy): $'+home.price+'<br>';
		notice_msg.innerHTML += 'Neighborhood value: '+getHouseValue(home.x, home.y, 'neighborhood')+'<br>';
		notice_msg.innerHTML += 'Building value: '+getHouseValue(home.x, home.y, 'floormod')+'<br>';
		var bclass = (player.money >= home.price) ? 'btn-primary' : 'btn-danger';
		notice_msg.innerHTML += '<div class="btn '+bclass+'" onclick="buyHome('+home.x+', '+home.y+')">Buy Home ($'+round(home.price)+')</div><br><br>';
		notice_msg.innerHTML += '';
	}
	else {
		notice_msg.innerHTML += '<i>Unavailable</i><br><br>';
	}

	sNotice();
}
function updateWork() {
	var ch = getCheck(player.job);
	notice_msg.innerHTML = '<b>Job Info</b><br>';
	notice_msg.innerHTML += 'Job: '+jobList[player.job.type][player.job.id].name+' ('+player.job.level+')<br>';
	notice_msg.innerHTML += 'Salary (per hour): $'+player.job.baseSalary.toFixed(2)+'<br>';
	notice_msg.innerHTML += 'Work hours/day: '+player.job.workhours+'<br>';
	notice_msg.innerHTML += 'Payday every '+player.job.payday+' days<br>';

	var drops = getDropsForJob(player.job, 1);
	if (drops.length > 0) {
		notice_msg.innerHTML += 'Item drop chances: '+(100 * (1 / player.job.itemChances))+'% each hour.<br>';
		notice_msg.innerHTML += 'Possible drops: <b>'+drops.join('</b>, <b>')+'</b><br><br>';
	}


	notice_msg.innerHTML += '<b>Salary Info</b><br>';
	if (player.job.dueHours > 0) notice_msg.innerHTML += 'Hours left today: '+ch.worked.toFixed(1)+'/'+ch.objective+' ('+(100 * ch.efficiency).toFixed(2)+'% Efficiency)<br>';
	if (player.job.dueHours <= 0) notice_msg.innerHTML += '<i>You have finished your work schedule.<br>You have worked '+Math.abs(player.job.dueHours).toFixed(1)+' extra hours.</i><br>'
	if (ch.extra) notice_msg.innerHTML += 'Worked extra hours: '+ch.extra.toFixed(1)+'<br>';

	if (player.job.payday > 0) {
		notice_msg.innerHTML += 'You will receive $'+(ch.baseSalary).toFixed(2)+' in your next Paycheck.<br>';
		notice_msg.innerHTML += 'Next Paycheck in '+(ch.nextPaycheck * 24).toFixed(2)+' hours.<br><br>';
	}

	if (lastDrops.length > 0) notice_msg.innerHTML += displayDrops();


	if (ch.nextPaycheck >= 0 && player.job.payday > 0) {
		var ef = ch.efficiency;
		if (ef >= 0.8) payCheck(player.job);
		if (ef < 0.8) quitJob();
	}
}
function payCheck(job) {
	var ch = getCheck(job);

	var check = round(ch.baseSalary);
	player.money += check;
	var g = (job.workedHours > job.workhours);

	player.job.workedHours = 0;
	player.job.nextPaycheck = new EMDate(player.job.payday, 0, 0);

	
	var eg = (g) ? 'Good Job! ': '';

	notification(eg+'You have been paid $'+check+' for your work.');

	var level = job.level;
	var c = rand(0, level);

	if (g && c == 0) {
		var oldsalary = job.baseSalary;
		upgradeJob(job);
		notification('You have been raised! $/hour: '+oldsalary.toFixed(2)+'->'+job.baseSalary.toFixed(2));
	}
}
function doWork() {
	notice_header.innerHTML = 'You are working';
	notice_msg.innerHTML = 'Worked hours: ';


	sNotice();
}
function sNotice() {
	notice.style.display = 'inline-block';
	notice_closer.style.display = 'inline-block';
}
function closeNotice() {
	$('#notice').fadeOut(200);
	$('#notice_closer').fadeOut(200);
	switchTime('slow');
	player.working = false;
	player.hold = false;
}
function startWorking() {
	switchTime('ultrafast');
	player.working = true;
	doWork();
}
function getJobById(sector, id) {
	return jobList[sector][id];
}
function getShop(mapx, mapy) {
	var map = city.map[mapx][mapy];
	if (map.jobID == undefined) getJobId(mapx, mapy);
	var id = map.jobID;
	var sec = getJobSalary(mapx, mapy, 'type');
	var job = getJobById(sec, id);
	var shop = job.shop;
	var shoppy = [];
	if (shop == undefined) return shoppy;
	for (var s in shop) {
		var shopid = shop[s];
		shoppy[shopid] = everyman.warehouse[shopid];
	}
	return shoppy;
}
function whatJobHere(mapx, mapy) {
	return getJobById(getJobSalary(mapx, mapy, 'type'), city.map[mapx][mapy].jobID);
}
function checkDrugs() {
	//4 = drugs, 5 = illegal items
	var drugValue = 0;
	var illegalValue = 0;
	for (var i in player.inventory) {
		var amt = player.inventory[i];
		var item = itemList[i];
		if (item.drug) drugValue += (item.price * amt);
		if (item.illegal) illegalValue += (item.price * amt);
	}
	if (drugValue > 0) addCrime(player, 4, drugValue, true);
	if (illegalValue > 0) addCrime(player, 5, illegalValue, true);
}
function showInventory(variation) {
	if (player.inventory == undefined) player.inventory = [];
	checkDrugs();
	var itory = '';
	var inventoryObj = player.inventory;
	if (variation == 'shop') {
		inventoryObj = getShop(player.mapID.x, player.mapID.y);
	}

	for (var i in inventoryObj) if (inventoryObj[i] > 0 || variation == 'shop') itory += displayItem(i, inventoryObj[i], variation)+'<br>';
	notice_header.innerHTML = 'Inventory';
	var vendor = '';
	if (variation == 'shop') vendor = whatJobHere(player.mapID.x, player.mapID.y).name;
	if (variation == 'shop') notice_header.innerHTML = 'Shop ('+vendor+')';
	var bef = '';
	if (variation == 'throw') {
		notice_header.innerHTML = 'Trash Bin';
		bef = '<i>Click any item to delete it permanently.</i><br>';
	}
	notice_msg.innerHTML = bef+itory;

	if (variation == 'throw') {
		notice_msg.innerHTML += '<hr>Click any item to retrieve it.<br>'+getTrashItems(player.mapID.x, player.mapID.y)+'<br><br><br><br><br>';
	}
	if (variation == 'shop') {
		notice_msg.innerHTML += '<hr><div class="btn btn-danger" onclick="stealShop()">Rob the '+vendor+'</div>';
	}

	sNotice();
}
function getRandomShopItem(x, y) {
	var shop = getShop(x, y);
	var items = [];
	for (var s in shop) if (shop[s] != undefined) items.push(s);
	var id = read(items);
	var amt = everyman.warehouse[id];
	if (amt > 0) amt = rand(0, amt);
	return {'id': id, 'amt': amt};
}
function stealShop() {
	var stealChances = getStealChance(player);
	var r = rand(0, 100);
	if (r < stealChances) {
		var ritem = getRandomShopItem(player.mapID.x, player.mapID.y);
		addItemToInventory(ritem.id, ritem.amt);
		addItemToWarehouse(ritem.id, -ritem.amt);

		if (ritem.amt > 0) showNotice('Success', 'You stole '+ritem.amt+' '+itemList[ritem.id].name+' from the vendor without being caught. Good job!');
		if (ritem.amt <= 0) showNotice('Well...', 'You failed at stealing anything, but at least the vendor did not notice. Better luck next time.');
		var iprice = itemList[ritem.id].price;
		var ivalue = iprice * ritem.amt;
		addCrime(player, 1, ivalue);
	}
	else {
		showNotice('Fail', 'What? Get out of here before I call the police! <br><br><small><i>Note from the programmer: Haha, there is no police you jerkass I\'m going to steal everything I want.</i></small>')
		addCrime(player, 2, stealChances);
	}
}
function getTrashItems(mapx, mapy) {
	var map = city.map[mapx][mapy];
	if (map.trash == undefined) map.trash = [];
	var gti = '';
	for (var t in map.trash) {
		var amt = map.trash[t];
		var id = t;
		if (amt > 0) gti += displayItem(id, amt, 'get')+'<br>';
	}
	if (!gti) gti = 'There are no items inside this trash bin.';

	return gti;
}
function addRandomItemToTrash() {
	var rx = rand(1, city.map.length) - 1;
	var ry = rand(1, city.map[0].length) - 1;

	var ri = rand(1, itemList.length) - 1;

	addItemToTrash(rx, ry, ri);
}
function addItemToTrash(mapx, mapy, id) {
	var map = city.map[mapx][mapy];
	if (map.trash == undefined) map.trash = [];
	if (map.trash[id] == undefined) map.trash[id] = 0;
	map.trash[id]++;
}
function showNotice(title, text, exit) {
	notice_header.innerHTML = title;
	notice_msg.innerHTML = text;

	var exitext = 'Dismiss This Message';
	if (exit) exitext = exit;

	notice_msg.innerHTML += '<br><hr><br><div class="btn btn-default" onclick="closeNotice()">'+exitext+'</div>';

	sNotice();
}
function drawWanted(peek) {
	var dw = ''
	var v = 0;
	for (var w in wantedOfficers) {
		v++;
		dw += 'Officer #'+w+' '+everyman.people[w].name+' (at '+wantedOfficers[w]+'m distance from you)';
	}
	if (peek) return v;
	return dw;
}
function arrest(guy) {
	var crime = guy.crime;
	showNotice('You are under arrest!', 'Here are the crimes you have done: <hr>'+displayCrime(guy)+'<br>');
	if (everyman.jail == undefined) everyman.jail = {
		'fee': displayCrime(guy, 'fee'),
		'time': displayCrime(guy, 'time'),
	}
	guy.money -= displayCrime(guy, 'fee');
	guy.crime = [];
}
function addItemToInventory(id, amt) {
	var item = itemList[id];
	if (player.inventory == undefined) player.inventory = [];
	if (player.inventory[id] == undefined) player.inventory[id] = 0;

	player.inventory[id] += amt;

	checkDrugs();
}
function throwItem(id) {
	var amt = player.inventory[id];
	if (amt > 0) var used = true;
	if (used) player.inventory[id]--;
	decreaseHygiene(player, 2);
	addItemToTrash(player.mapID.x, player.mapID.y, id);
	showInventory('throw');
}
function useItem(id) {
	var amt = player.inventory[id];
	if (amt > 0) {
		//Can use item
		var item = itemList[id];
		var used = false;

		if (item.food) {
			if (item.health) healGuy(player, 'health', item.health);
			if (item.hunger) healGuy(player, 'hunger', item.hunger);
			if (item.energy) healGuy(player, 'energy', item.energy);

			used = true;
		}
		if (item.byproduct) addItemToInventory(item.byproduct, 1);
	}
	if (used) player.inventory[id]--;
	showInventory();
}
function healGuy(guy, what, amt) {
	guy[what] += amt;
	if (guy[what] >= 100) guy[what] = 100;
	if (guy[what] <= 0) guy[what] = 0;
}
function decorationMode() {
	var flist = '';
	var mode = isHome(player, player.mapID.x, player.mapID.y);
	var buildmode = (mode && mode.bought) ? true : false;
	for (var f in furniturePrices) {
		var p = furniturePrices[f];
		if (p > player.money) continue;
		if (!buildmode && furnitureStatus[p] == 'build') continue;
		flist += displayFurniture(f)+'<br>';
	}
	if (!flist) flist = '<i>There are no pieces of furniture you can buy right now.</i>';
	showNotice('Decoration Mode', 'Click any piece of furniture to buy it.<br>'+flist);
}
function displayFurniture(id) {
	return '<div class="itemButton" style="height: 80px" onclick="buyFurniture(\''+id+'\')"><i class="tile '+id+'"></i><span style="position: relative; left: 60px"><b>'+furnitureNames[id]+'</b> $'+furniturePrices[id]+'</span></div>';
}
function buyFurniture(id) {
	if (everyman.held) return;
	var price = furniturePrices[id];
	if (player.money < price) return;
	player.money -= price;
	everyman.held = id;

	if (furtuto) closeNotice();
	if (furtuto == undefined) {
		showNotice('Decoration Mode', 'To place this new piece of furniture, get in front of an empty spot and press the P key.');
		furtuto = true;
	}
}
function getTrashItem(id, amt) {
	addItemToInventory(id, amt);
	var thisTrash = getCurrentMap().trash;
	thisTrash[id]--;
	decreaseHygiene(player, 5);
	showInventory('throw');
}
function decreaseHygiene(who, amt) {
	who.hygiene -= amt;
	if (who.hygiene < 0) who.hygiene = 0;
}
function buyItem(id, amt) {
	if (amt == undefined) amt = 1;
	var available = everyman.warehouse[id];
	if (available <= 0) return;
	var price = (itemList[id].price * amt);
	if (player.money < price) return;
	player.money -= price;
	everyman.warehouse[id] -= amt;
	player.inventory[id] += amt;

	showInventory('shop');
}
function displayItem(id, amt, variation) {
	var item = itemList[id];
	var itemclass = '';
	if (item.illegal) itemclass = 'illegal';
	var act = 'useItem';
	if (variation == 'throw') act = 'throwItem';
	if (variation == 'get') act = 'getTrashItem';
	if (variation == 'shop') act = 'buyItem';
	var act2 = '';
	var desc = item.desc;
	if (amt <= 0 && variation == 'shop') desc = '<b class="illegal">Out of stock!</b>';
	return '<div class="'+variation+' itemButton" onclick="'+act+'('+id+', 1)">'+amt+' x <b class="'+itemclass+'">'+item.name+'</b> ($'+item.price+')<br>'+
	'<i>'+desc+'</i><br>'+

	'</div>';
}
function getLostItem(item) {
	addItemToInventory(item.id, 1);
	var map = getCurrentMap();
	var iid = 0;
	for (var li in map.lostItems) {
		if (map.lostItems[li] == item) {
			iid = li;
			break;
		}
	}
	onPlayerNotification('<tho>Found '+itemList[item.id].name+' in the ground.</tho>');
	map.lostItems.splice(iid, 1);

	setTimeout(drawLostItems, 100);
}
function getCurrentMap() {
	return city.map[player.mapID.x][player.mapID.y];
}
function talkTo(id, act) {
	var guy = everyman.people[id];
	var tt = '';
	if (act == undefined) tt += speech(guy, 'greet')+"<br>";
	if (act == 'talk') {
		tt += speech(guy, 'talk')+'<br>';
		guy.friendship++;
	}
	if (guy.friendship < 0 && rand(0,1)) setTimeout(closeNotice, 500);
	if (act == 'steal' || act == 'attack') if (guy.friendship > 0) guy.friendship = Math.floor(guy.friendship / 2);
	if (act == 'steal') {
		var chances = getStealChance(guy);
		var r = rand(0, 100);
		var success = (r < chances) ? true : false;

		if (success) {
			var m = round(Math.random()*guy.money);
			tt += 'You stole $'+m.toFixed(2)+' from '+guy.name+'<br>';
			if (m <= 0) tt += 'Better luck next time!';
			if (m > 0) {
				player.money += m;
				guy.money -= m;
				onPlayerNotification('+$'+m.toFixed(2));
			}
			addCrime(player, 0, m);
		}
		if (!success) {
			tt += speech(guy, 'steal')+'<br>';
			guy.friendship -= 5;
			setTimeout(closeNotice, 500);
		}
		guy.friendship -= 5;
		addCrime(player, 2, chances);
	}
	if (act == 'attack') {

		tt += speech(guy, 'talk')+'<br>';
		guy.friendship -= 25;
	}

	tt += '<br><br><div class="btn btn-primary" onclick="talkTo(\''+id+'\', \'talk\')">Talk</div><br>';
	tt += '<div class="btn btn-warning" onclick="talkTo(\''+id+'\', \'steal\')">Steal</div><br>';
	tt += '<div class="btn btn-danger" onclick="talkTo(\''+id+'\', \'attack\')">Attack</div><br>';


	showNotice(guy.name, tt, 'Say Goodbye');
}

$('body').on('keypress', function(evt) {
    var key = String.fromCharCode(evt.charCode).toLowerCase();

    if (key == 'w') movePlayer('north');
    if (key == 'a') movePlayer('west');
    if (key == 'd') movePlayer('east');
    if (key == 's') movePlayer('south');
    if (key == 'b' || key == 'v') {
    	decorationMode();
    }
    if (key == 'p') {
    	pickFurniture();
    }
    if (key == '$') {
    	if (everyman.held) {
    		var price = furniturePrices[everyman.held];
    		price = round(price / 4);
    		if (!price) price = 0;
    		player.money += price;
    		notification('You sold that piece of furniture for $'+price.toFixed(2));
    		everyman.held = undefined;
    	}
    }

    if (key == 'i') showInventory();
    if (key == ' ') {
    	//Press space
    	var infront = whatsInFrontOf(player);
    	if (infront.item) {
    		getLostItem(infront.item);
    		return;
    	}
	    if (infront.guyfront) {
	    	var guy = everyman.people[infront.guyfront];
	    	if (player.inside && !guy.inside) return;
	    	player.hold = true;
	    	var f = guy.friendship;
	    	if (f < 0 && rand(0,1)) {
	    		onCoordinateNotification(guy.x, guy.y, speech(guy, 'talk'));
	    		return;
	    	}
	    	talkTo(infront.guyfront);
	    	return;
	    }
    	if (infront.upfront != undefined) {
    		if (infront.upfront.match('deco_8')) {
	    		enterBuilding(player);
	    		recheckGuys();
	    		displayMap();
	    	}
	    	if (infront.upfront == 'tile_bin') {
	    		showInventory('throw');
	    		decreaseHygiene(player, 1);
	    	}
	    	if (infront.upfront == 'tile_shop_desk_machine' || infront.upfront == 'tile_shop_desk' || infront.upfront == 'tile_shop_work_door') {
	    		showInventory('shop');
	    	}
	    	if (infront.upfront == 'tile_fence_door' || infront.upfront == 'tile_door') {
	    		var home = isHome(player, player.mapID.x, player.mapID.y);
	    		if (home) {
	    			if (home.due > 0) {
	    				askRent(home);
	    			}
	    			var dir = directionNames[player.facing];
		    		moveGuy(player, dir, true, true);
		    		moveGuy(player, dir, true, true);
	    		}
	    		else {
	    			var home = new Home(player.mapID.x, player.mapID.y);
	    			askBuy(home);
	    		}
	    	}
	    	if (infront.upfront == 'tile_work_door') {
	    		if (player.job && player.job.x == player.mapID.x && player.job.y == player.mapID.y) {
	    			startWorking();
	    		}
	    		else {
	    			var job = new Job(player.mapID.x, player.mapID.y);
	    			askWork(job);
	    		}
	    	}
    	}
    	info.innerHTML = debugInfo(player);
    }

    if (key == 'x') {
    	var pos = size(player.x, player.y, player.z);

    	getActiveMap()[pos.z][pos.y][pos.x] = 'tile_road';
    	displayMap();
    }
});

var gameInfo = {
	'name': 'Everyman',
	'version': changes(changelog).latestVersion,
	'changelog': changes(changelog).changelog,
}
loadGame();
resetVariables();
afterLoad();
update();

displayMap();
setInterval(tickPeople, 1);
var t = setInterval(saveGame, 10000);
var timer_tp = setInterval(timePass, 1000);