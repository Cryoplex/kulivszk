var itemList = [];
//itemList.push(new Item(name, price, atk, reload, accuracy, def, evasion, speed));
itemList.push(new Item('Basic Cannon', 0, 10, 2, 0.8, 0, 0, 0));
itemList.push(new Item('Basic Engine', 0, 0, 0, 0, 0, 0.2, 10));
itemList.push(new Item('Basic Body', 0, 0, 0, 0, 10, -0.2, -10));

for (var x = 0; x < 3; x++) {
	itemList.push(new Item(randomName('weapon'), 0, rand(1,100), rand(1,10), rand(0.1, 1), 0, 0, 0));
}


for (var x = 0; x < 3; x++) {
	itemList.push(new Item(randomName('engine'), 0, 0, 0, 0, 0, rand(0, 0.9), rand(1,100)));
}

for (var x = 0; x < 3; x++) {
	itemList.push(new Item(randomName('body'), 0, 0, 0, 0, rand(1,100), (rand(0, 0.9) * -1), (rand(1,100) * -1)));
}

function drawShop() {
	var l = '<hr><br>';
	for (var i in itemList) {
		l += '<span class="shopItem">'+getItemData(itemList[i])+
		'<br><button onclick="buyItem('+i+')">'+translate('Comprar|Buy')+'</button>'+
		'</span>';
	}
	shipShopList.innerHTML = l;
}
function getItemData(item) {
	if (item.atk > 0) {
		return '('+translate('Arma|Weapon')+') <b>'+item.name+'</b> ('+item.price+'ç)<br>'+
		translate('Potencia de Ataque|Attack Power')+' '+item.atk+'<br>'+
		translate('Tiempo de Recarga|Reload Time')+' '+item.reload+'<br>'+
		translate('Precisión|Accuracy')+' '+(item.accuracy * 100)+'%';
	}
	if (item.def > 0) {
		return '('+translate('Cuerpo|Body')+') <b>'+item.name+'</b> ('+item.price+'ç)<br>'+
		translate('Resistencia|Resistance')+' '+item.def+'<br>'+
		translate('Evasión|Evasion')+' '+(item.evasion * 100)+'%<br>'+
		translate('Velocidad|Speed')+' '+item.speed;
	}
	if (item.speed > 0) {
		return '('+translate('Motor|Engine')+') <b>'+item.name+'</b> ('+item.price+'ç)<br>'+
		translate('Evasión|Evasion')+' '+(item.evasion * 100)+'%<br>'+
		translate('Velocidad|Speed')+' '+item.speed;
	}
}
function randomName(itemType) {
	var add = randChar().toUpperCase();
	do {
		add += randChar().toUpperCase();
	} while (!rand(0,1))
	if (itemType == 'weapon') {
		add += ' '+read(['Cannon', 'Heavy Cannon', 'Machine Gun', 'Sniper', 'Missile', 'Blaster', 'Laser']);
	}
	if (itemType == 'engine') {
		add += ' '+read(['Kerosene', 'Nuclear', 'Thorium', 'Ion']);
		add += ' '+'Engine';
	}
	if (itemType == 'body') {
		add += ' '+read(['Titanium', 'Iron', 'Steel', 'Graphene', 'Iridium', 'Cardboard']);
		add += ' '+'Body';
	}
	return add;
}
function Item(name, price, atk, reload, accuracy, def, evasion, speed) {
	/*
	- Weapons
	atk = Weapon damage
	reload = Turns before the weapon is ready after use
	accuracy = Hit chances of given weapon

	- Engines
	evasion = Chances of dodging shots
	speed = Determines starting turn in battles

	- Bodies
	def = Damage reduction
	evasion (negative) = Higher weight lowers evasion
	speed (negative) = Higher weight lowers speed

	*/
	this.name = name;
	this.atk = atk;
	this.def = def;
	this.reload = reload;
	this.speed = speed;
	this.evasion = evasion;
	this.accuracy = accuracy;

	//Price calculation
	//((Atk / (reload)+1) * 100 * accuracy) + ((Def / (abs(evasion)+ 1)) * 100) + ((Speed * 100 * evasion)
	var atkmod = (atk / (reload + 1)) * 100 * accuracy;
	var defmod = (def / (Math.abs(evasion) + 1)) * 100;
	var speedmod = speed * 100 * evasion;
	var sum = atkmod + defmod + speedmod;
	this.price = Math.ceil(price + sum) + 100;
}
function Ship() {
	this.shipColor = rand(1,7);
	this.fireColor = rand(1,3);
	this.hueChange = rand(0,360);

	this.primaryWeapon = itemList[0];
	this.secondaryWeapon = itemList[0];
	this.engine = itemList[1];
	this.body = itemList[2];
}
function getShipData(ship) {
	var atk = Math.floor(ship.primaryWeapon.atk + ship.secondaryWeapon.atk);
	var def = ship.body.def;
	var speed = ship.engine.def;

	var evasion = Math.floor(ship.body.evasion + ship.engine.evasion);

	return {
		'atk': atk,
		'def': def,
		'speed': speed,
		'evasion': evasion,
	}
}
function drawShipData(ship) {
	var sd = getShipData(ship);

	return translate('Arma Primaria|Primary Weapon')+': '+ship.primaryWeapon.name+'<br>'+
	translate('Arma Secundaria|Secondary Weapon')+': '+ship.secondaryWeapon.name+'<br>'+
	translate('Motor|Engine')+': '+ship.engine.name+'<br>'+
	translate('Cuerpo|Body')+': '+ship.body.name+'<br><br>'+
	translate('Potencia|Power')+': '+sd.atk+'<br>'+
	translate('Resistencia|Resistance')+': '+sd.def+'<br>'+
	translate('Velocidad|Speed')+': '+sd.speed+'<br>'+
	translate('Evasión|Evasion')+': '+(sd.evasion * 100)+'%<br>';
}
function getRandomShip() {
	return new Ship();
}
function drawShipElement(ship) {
	if (!ship) ship = game.myShip;
	var fc = ship.fireColor;
	var sc = ship.shipColor;
	var hr = ship.hueChange;
	return '<img src="img/fire_'+fc+'.png" style="z-index: 1"><img src="img/ship_'+sc+'.png" style="-webkit-filter: hue-rotate('+hr+'deg); position: relative; top: 0px; left: -168px; z-index: 2"><br>';
}
function drawShip(ship) {
	game_value.innerHTML = drawShipElement(ship);
}
function generateRandomShip() {
	game.myShip = getRandomShip();
	drawShip();
}

function increaseValue(num) {
	game.value += num;
	update('game_value');
}
function resetVariables() {
	if (!game.value) game.value = 0;

	if (!game.myShip || !game.myShip.primaryWeapon) game.myShip = new Ship();

	if (game.money == undefined) game.money = 1000;

	if (!game.inventory) game.inventory = [];

	update();
}
function sellItem(num) {
	var i = game.inventory[num]
	var price = i.price;
	var name = i.name;
	game.money += price;
	notification(name+' '+translate('vendido por |sold for ')+price+'ç.');
	game.inventory.splice(num, 1);

	update();
}
function buyItem(num) {
	var mon = game.money;
	var price = itemList[num].price;
	if (mon < price) {
		return;
	}
	game.money -= price;
	game.inventory.push(itemList[num]);
	notification(translate('Has comprado |You purchased ')+itemList[num].name);

	update();
}
function drawInventory() {
	var l = '';
	for (var e in game.inventory) {
		l += '<span class="shopItem">'+getItemData(game.inventory[e])+'<br>'+
		'<button onclick="sellItem('+e+')">'+translate('Vender|Sell')+'</button>';
		var item = game.inventory[e];
		if (item.atk > 0) {
			l += '<button onclick="equipItem('+e+', 0)">'+translate('Equipar Primaria|Equip Primary')+'</button>';
			l += '<button onclick="equipItem('+e+', 1)">'+translate('Equipar Secundaria|Equip Secondary')+'</button>';
		}
		else {
			l += '<button onclick="equipItem('+e+')">'+translate('Equipar|Equip')+'</button>';
		}
		l += '</span>';
	}
	inventoryData.innerHTML = l;
}
function saveGame() {
	localStorage.setItem('game', JSON.stringify(game));
	notification('Game Saved');
}
function loadGame() {
	var losto = localStorage.getItem('game');
	if (!losto) return;
	game = JSON.parse(losto);
	notification('Game Loaded');
}
function update(step) {
	if (step == 'game_value' || !step) doc('game_value').innerHTML = shortNum(game.value);

	drawShip();
	drawShop();
	drawInventory();
	yourMoney.innerHTML = game.money;
	shipData.innerHTML = drawShipElement()+drawShipData(game.myShip);
}
function mainWindow(what) {
	var wins = ['shipSelector', 'shipShop', 'inventory'];
	for (var e in wins) $('#'+wins[e]).slideUp(100);
	$('#'+what).slideDown(100);
}

var game = {};

loadGame();
resetVariables();
var t = setInterval(saveGame, 60000);
setInterval(update, 1000);

drawShip();