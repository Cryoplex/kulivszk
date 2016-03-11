/*
0.1.0.0 Started changelog (Kinda late?)
0.2.0.0 Added sounds
0.2.1.0 Shop now discards old items
0.2.2.0 Added a little delay before the losing message appears
0.2.3.0 Battles now start with all weapons ready.
0.2.4.0 Hit chances for weapons are now shown.

*/

var snd_attack = new Audio('sound/laser.wav');
var snd_hit = new Audio('sound/hit.wav');
var snd_dodge = new Audio('sound/stealth.wav');
var snd_reload = new Audio('../coonwars/heal.wav');
var snd_explode = new Audio('sound/explosion.wav');



var itemList = [];
var shopList = [];

function itemValue(item) {
	var v = 1000;
	v += item.atk + item.def + item.speed;
	v *= (item.accuracy + 1) + (item.evasion + 1);
	v /= (item.reload + 1)
	v /= (item.weight + 1);
	return v;
}
function generateItemList() {
	//itemList.push(new Item(name, price, atk, reload, accuracy, def, evasion, speed, weight));
	itemList.push(new Item('Basic Cannon', 0, 10, 2, 0.6, 0, 0, 0, 0));
	itemList.push(new Item('Basic Engine', 0, 0, 0, 0, 0, 0.1, 10, 0));
	itemList.push(new Item('Basic Body', 0, 0, 0, 0, 10, 0, 0, 1));
	//Basic weapons
	itemList.push(new Item('Blaster', 0, 20, 2, 0.6, 0, 0, 0, 0));
	itemList.push(new Item('Gatling', 0, 10, 1, 0.6, 0, 0, 0, 0));
	itemList.push(new Item('Sniper', 0, 10, 2, 1, 0, 0, 0, 0));
	itemList.push(new Item('Cannon', 0, 20, 1, 0.6, 0, 0, 0, 0));
	itemList.push(new Item('Missile', 0, 20, 1, 1, 0, 0, 0, 0));
	itemList.push(new Item('Laser', 0, 10, 1, 1, 0, 0, 0, 0));
	//Basic Engines
	itemList.push(new Item('Nuclear Engine', 0, 0, 0, 0, 0, 0.1, 20, 0));
	itemList.push(new Item('Ion Thruster', 0, 0, 0, 0, 0, 0.2, 10, 0));
	//Basic Bodies
	itemList.push(new Item('Titanium Plating', 0, 0, 0, 0, 20, 0, 0, 1));
	itemList.push(new Item('Aluminium Plating', 0, 0, 0, 0, 1, 0, 0, 1));

	for (var x = 0; x < 100; x++) {
		var it = read(itemList);
		itemList.push(upgradeItem(it));
	}

	for (var x = 0; x < 10; x++) {
		shopList.push(clone(read(itemList)));
	}
}

function drawShop() {
	var l = '<hr><br>';
	for (var i in shopList) {
		var item = shopList[i];
		var theShip = game.myShip;
		var price = item.price;

		var classy = 'badItem';

		if (item.type == 'weapon') {
			var p1 = itemValue(theShip.primaryWeapon);
			var p2 = itemValue(theShip.secondaryWeapon);
			var lower = (p1 > p2) ? p2 : p1;
			if (itemValue(item) > lower) classy = 'goodItem';
		}
		if (item.type == 'body' && itemValue(item) > itemValue(theShip.body)) classy = 'goodItem';
		if (item.type == 'engine' && itemValue(item) > itemValue(theShip.engine)) classy = 'goodItem';

		if (price > game.money) classy = 'gray';

		l += '<span class="shopItem '+classy+'">'+getItemData(shopList[i])+
		'<br><button onclick="buyItem('+i+')">'+translate('Comprar|Buy')+'</button>'+
		'</span>';
	}
	shipShopList.innerHTML = l;
}
function getItemData(item) {
	var iname = item.name+' '+romanNumber(item.mark);
	if (item.atk > 0) {
		return '('+translate('Arma|Weapon')+') <b>'+iname+'</b> ('+item.price+'ç)<br>'+
		translate('Potencia de Ataque|Attack Power')+' '+item.atk+'<br>'+
		translate('Tiempo de Recarga|Reload Time')+' '+item.reload+'<br>'+
		translate('Precisión|Accuracy')+' '+round(item.accuracy * 100)+'%';
	}
	if (item.def > 0) {
		return '('+translate('Cuerpo|Body')+') <b>'+iname+'</b> ('+item.price+'ç)<br>'+
		translate('Resistencia|Resistance')+' '+item.def+'<br>'+
		translate('Peso|Weight')+' '+item.weight+'T<br>'
	}
	if (item.speed > 0) {
		return '('+translate('Motor|Engine')+') <b>'+iname+'</b> ('+item.price+'ç)<br>'+
		translate('Evasión|Evasion')+' '+round(item.evasion * 100)+'%<br>'+
		translate('Velocidad|Speed')+' '+item.speed;
	}
}
function randomName(itemType) {
	var add = randChar().toUpperCase();
	do {
		add += randChar().toUpperCase();
	} while (!rand(0,1));
	if (!itemType) return add;
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
function upgradeItem(item) {
	var obj = clone(item);
	obj.atk += rand(1, obj.atk);
	if (obj.reload > 1 && rand(0,1)) obj.reload += rand(0,1);
	obj.accuracy = obj.accuracy + (0.05 + (Math.random() / 10));
	obj.def += rand(1, obj.def);
	obj.evasion = obj.evasion + (0.01 + (Math.random() / 20));
	obj.speed += rand(1, obj.speed);
	obj.weight = round(obj.weight / 1.1);
	obj.price *= Math.random()+1.5;
	obj.price = Math.ceil(obj.price);
	obj.name = randChar().toUpperCase()+''+obj.name;
	obj.mark++;
	return obj;
}
function Item(name, price, atk, reload, accuracy, def, evasion, speed, weight, mark) {
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
	weight = Reduces evasion and speed
	evasion (negative) = Higher weight lowers evasion
	speed (negative) = Higher weight lowers speed

	*/
	this.name = randChar().toUpperCase()+'-'+name;
	this.atk = atk;
	this.def = def;
	this.reload = reload;
	this.speed = speed;
	this.evasion = evasion;
	this.accuracy = accuracy;
	this.used = this.reload;
	this.weight = weight;
	if (!mark) mark = 1;
	this.mark = mark;

	this.type = 'item';

	if (atk > 0) this.type = 'weapon';
	if (def > 0) this.type = 'body';
	if (speed > 0) this.type = 'engine';

	//Price calculation
	//((Atk / (reload)+1) * 100 * accuracy) + ((Def / (abs(evasion)+ 1)) * 100) + ((Speed * 100 * evasion)
	var atkmod = (atk / (reload + 1)) * 100 * accuracy;
	var defmod = (def / (Math.abs(evasion) + 1)) * 100;
	var speedmod = speed * 100 * (evasion * 10);
	var sum = atkmod + defmod + speedmod;
	this.price = Math.ceil(price + sum) + 100;
}
function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}
function Ship() {
	this.shipColor = rand(1,7);
	this.fireColor = rand(1,3);
	this.hueChange = rand(0,360);

	this.x = 0;
	this.y = 0;

	this.primaryWeapon = clone(itemList[0]);
	this.secondaryWeapon = clone(itemList[0]);
	this.engine = clone(itemList[1]);
	this.body = clone(itemList[2]);
	this.hp = 10;
	this.hpx = 10;
}
function getEnemyShip() {
	game.myShip.hp = game.myShip.hpx;
	game.enemyShip = new Ship();
	for (var x = 0; x < 4; x++) {
		var randomItem = clone(read(itemList));
		if (randomItem.atk > 0 && x == 0) game.enemyShip.primaryWeapon = randomItem;
		if (randomItem.atk > 0 && x == 1) game.enemyShip.secondaryWeapon = randomItem;
		if (randomItem.def > 0 && x == 2) game.enemyShip.body = randomItem;
		if (randomItem.speed > 0 && x == 3) game.enemyShip.engine = randomItem;
	}
}
function getShipData(ship) {
	var atk = ship.primaryWeapon.atk + ship.secondaryWeapon.atk;
	var def = ship.body.def;
	var speed = ship.engine.speed / ship.body.weight;

	var evasion = (ship.body.evasion + ship.engine.evasion) * 0.95;


	return {
		'atk': atk,
		'def': def,
		'speed': speed,
		'evasion': evasion,
		'hp': ship.hp,
		'hpx': ship.hpx,
	}
}
function drawShipData(ship) {
	var sd = getShipData(ship);
	var hc1 = '';
	var hc2 = '';
	if (game.enemyShip) {
		var from = ship;
		var to = (ship == game.enemyShip) ? game.myShip : game.enemyShip;
		hc1 = round(hitChances(from, to, 0) * 100)+'%';
		hc2 = round(hitChances(from, to, 1) * 100)+'%';
	}

	return translate('Arma Primaria|Primary Weapon')+': '+ship.primaryWeapon.name+' '+romanNumber(ship.primaryWeapon.mark)+' '+realDrawBar(ship.primaryWeapon.used, ship.primaryWeapon.reload)+' '+hc1+'<br>'+
	translate('Arma Secundaria|Secondary Weapon')+': '+ship.secondaryWeapon.name+' '+romanNumber(ship.primaryWeapon.mark)+' '+realDrawBar(ship.secondaryWeapon.used, ship.secondaryWeapon.reload)+' '+hc2+'<br>'+
	translate('Motor|Engine')+': '+ship.engine.name+'<br>'+
	translate('Cuerpo|Body')+': '+ship.body.name+'<br><br>'+
	translate('Potencia|Power')+': '+Math.ceil(sd.atk)+'<br>'+
	translate('Resistencia|Resistance')+': '+Math.ceil(sd.def)+'<br>'+
	translate('Velocidad|Speed')+': '+Math.ceil(sd.speed)+'<br>'+
	translate('Evasión|Evasion')+': '+round(100 * sd.evasion)+'%<br>';
}
function hitChances(from, to, weapon) {
	var evasion = getShipData(to).evasion;
	var accuracy = (weapon == 0) ? from.primaryWeapon.accuracy : from.secondaryWeapon.accuracy;
	var dodge = (to.status == 'dodge') ? 1 : 0;

	var hit = 1 - evasion;
	hit *= accuracy;
	if (dodge) hit /= 2;
	return hit;
}
function damageFormula(attack, accuracy, defense, evasion, dodge, from, to, weapon) {
	var hit = hitChances(from, to, weapon);
	console.log('Hit chances: '+hit);
	if (hit >= Math.random()) {
		var d = Math.ceil(attack / defense);
		if (d < 1) d = 1;
		return d;
	}
	else {
		if (dodge) return 'dodge';
		return 'miss';
	}
}
function combat(action) {
	var from = game.turn;
	var ships = [game.myShip, game.enemyShip];
	var ship = ships[from];
	var enemy = (from == 0) ? ships[1] : ships[0];
	enemyShip = getShipData(enemy);
	ship.status = '';
	if (action < 2) {
		var atk = 0;
		var accuracy = 0;
		if (action == 0) {
			if (!isWeaponReady(ship, 0)) return;
			ship.primaryWeapon.used = 0;
			atk = ship.primaryWeapon.atk;
			accuracy = ship.primaryWeapon.accuracy;
			console.log('Weapon atk/acc '+ship.primaryWeapon.atk+' '+ship.primaryWeapon.accuracy);
		}
		if (action == 1) {
			if (!isWeaponReady(ship, 1)) return;
			ship.secondaryWeapon.used = 0;
			def = ship.secondaryWeapon.def;
			accuracy = ship.secondaryWeapon.accuracy;
			console.log('Weapon atk/acc '+ship.secondaryWeapon.atk+' '+ship.secondaryWeapon.accuracy);
		}
		var def = enemyShip.def;
		var evasion = enemyShip.evasion;

		var dmg = damageFormula(atk, accuracy, def, evasion, enemy.status, ship, enemy, action);
		var mizz = 1;
		if (dmg > 0) {
			enemy.hp -= dmg;
			mizz = 0;
		}
		if (game.turn == 0) launchProjectile('yourShip', 'enemyShip', mizz);
		if (game.turn == 1) launchProjectile('enemyShip', 'yourShip', mizz);
		
		notification(dmg);
	}
	if (action == 2) {
		playSound(snd_dodge);
		ship.status = 'dodge';
	}
	if (action == 3) {
		playSound(snd_reload);
		ship.primaryWeapon.used++;
		ship.secondaryWeapon.used++;

		if (ship.primaryWeapon.used > ship.primaryWeapon.reload) ship.primaryWeapon.used = ship.primaryWeapon.reload;
		if (ship.secondaryWeapon.used > ship.secondaryWeapon.reload) ship.secondaryWeapon.used = ship.secondaryWeapon.reload;
	}
	game.ticks[from] -= game.lower;
	newTurn();
}
function getRandomShip(ship) {
	var dummy = new Ship();

	ship.hueChange = dummy.hueChange;
	ship.fireColor = dummy.fireColor;
	ship.shipColor = dummy.shipColor;

	return;
}
function drawShipElement(ship, enemy, hpbar) {
	if (!ship) ship = game.myShip;
	var fc = ship.fireColor;
	var sc = ship.shipColor;
	var hr = ship.hueChange;
	var exClass = '';
	if (enemy) exClass = 'flipped';
	if (ship.status == 'dodge') exClass += ' '+'gray';
	var ret = '<img class="'+exClass+'" src="img/fire_'+fc+'.png" style="z-index: 1"><img class="'+exClass+'" src="img/ship_'+sc+'.png" style="-webkit-filter: hue-rotate('+hr+'deg); position: relative; top: 0px; left: -168px; z-index: 2"><br>';

	if (hpbar) {
		var wid1 = (ship.hp / ship.hpx) * 100;
		var wid2 = 100 - wid1;
		var hp = '<span class="hpfilled" style="width: '+wid1+'%; height: 16px"></span>'+
		'<span class="hpempty" style="width: '+wid2+'%; height: 16px"></span>';
		ret = hp + '<br>' + ret;
	}
	return ret;
}
function drawShip(ship) {
	game_value.innerHTML = drawShipElement(ship);
}
function generateRandomShip() {
	getRandomShip(game.myShip);
	drawShip();
}

function increaseValue(num) {
	game.value += num;
	update('game_value');
}
function readyWeapons(ship) {
	ship.primaryWeapon.used = ship.primaryWeapon.reload;
	ship.secondaryWeapon.used = ship.secondaryWeapon.reload;
}
function battleStart() {
	var from = game.myShip;
	var to = game.enemyShip;

	$('#enemyShip').fadeIn(100);

	readyWeapons(from);
	readyWeapons(to);

	var speed0 = getShipData(from).speed;
	var speed1 = getShipData(to).speed;
	game.turn = (speed0 > speed1) ? 0 : 1;
	saveGame();
}
function newTurn() {
	if (game.myShip.hp <= 0) {
		game.turn = -1;
		setTimeout(function() {
			game.money = Math.floor(game.money / 4);
			$('#combatTest').slideUp(100);
			game.enemyShip = undefined;
			$('#enemyShip').fadeOut(100);
			alert(translate('Has perdido el combate y algo de dinero.|You lost combat and some money.'));
		}, 1000);
		
		return;
	}
	if (game.enemyShip.hp <= 0) {
		setTimeout(function() {
			$('#enemyShip').effect('explode', 2500);
			playSound(snd_explode);
			$('#combatTest').delay(1000).slideUp(100);
			var value = Math.floor(getShipPrice(game.enemyShip) / 2);
			game.money += value;
			notification(translate('Recibes '+value+'ç|You receive '+value+'ç'));

			game.enemyShip = undefined;
		}, 1000);
		
		return;
	}
	var speed0 = getShipData(game.myShip).speed;
	var speed1 = getShipData(game.enemyShip).speed;

	game.lower = (speed0 > speed1) ? speed1 : speed0;

	game.ticks[0] += speed0;
	game.ticks[1] += speed1;

	game.turn = (game.turn == 1) ? 0 : 1;

	if (game.turn == 0) $('#yourShip').effect('highlight', 250);
	if (game.turn == 1) $('#enemyShip').effect('highlight', 250);
}
function launchProjectile(from, to, miss) {
	playSound(snd_attack);
	anim = true;
	fromOffset = $('#'+from).offset();
	toOffset = $('#'+to).offset();

	fromOffset.top += rand(25, 75);
	fromOffset.left += rand(40, 120);

	toOffset.top += rand(25, 75);
	toOffset.left += rand(40, 120);

	var expoff = {
		'top': toOffset.top + rand(-10, 10),
		'left': toOffset.left + rand(-10, 10),
	}

	var hf = $('body').width();

	if (miss) {
		if (toOffset.left >= hf) toOffset.left += 200;
		if (toOffset.left < hf) toOffset.left -= 200;
	}
	doc('projectile').style.top = fromOffset.top+'px';
	doc('projectile').style.left = fromOffset.left+'px';
	$('#projectile').fadeIn(100);

	$('#projectile').animate({
		'top': toOffset.top+'px',
		'left': toOffset.left+'px',
	}, 400).fadeOut(200);

	if (!miss) {
		doc('explosion').style.top = expoff.top+'px';
		doc('explosion').style.left = expoff.left+'px';

		$('#explosion').delay(400).fadeIn(200).animate({
			'width': '64px',
			'height': '64px',
			'top': '-=16px',
			'left': '-=16px',
		}, 400).fadeOut(200).animate({
			'width': '32px',
			'height': '32px',
		}, 100);

		setTimeout(function() {
			playSound(snd_hit);
		}, 500);
	}
	setTimeout(function() {
		anim = false;
	}, 1000);
}
function playSound(sound) {
	sound.playbackRate = 2;
	if (sound == snd_explode) sound.playbackRate = 0.5;
	sound.currentTime = 0;
	sound.play();
}
function startBattle() {
	getEnemyShip();
	battleStart();
}
function resetVariables(hard) {
	if (hard) {
		game = {};
		itemList = [];
		shopList = [];
		generateItemList();
	}
	if (!game) game = {};
	if (!game.value) game.value = 0;
	if (!game.turn) game.turn = 0;
	if (!game.ticks) game.ticks = [0, 0];
	if (!game.lower) game.lower = 0;

	if (!game.myShip || !game.myShip.primaryWeapon || !game.myShip.hp) game.myShip = new Ship();
	if (!game.enemyShip) getEnemyShip();
	if (!game.enemyShip.hp) getEnemyShip();

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
	var price = shopList[num].price;
	if (mon < price) {
		return;
	}
	var item = clone(shopList[num]);
	game.money -= price;
	game.inventory.push(item);
	notification(translate('Has comprado |You purchased ')+shopList[num].name);
	shopList.splice(num, 1);

	update();
}
function equipItem(num, slot) {
	var item = game.inventory[num];
	var oldItem = {};
	var itemType = '';
	if (item.atk > 0) itemType = 'weapon';
	if (item.def > 0) itemType = 'body';
	if (item.speed > 0) itemType = 'engine';
	if (itemType == 'weapon') {
		if (slot == 1) {
			oldItem = JSON.stringify(game.myShip.secondaryWeapon);
			game.myShip.secondaryWeapon = item;
		}
		else {
			oldItem = JSON.stringify(game.myShip.primaryWeapon);
			game.myShip.primaryWeapon = item;
		}
	}
	if (itemType == 'body') {
		oldItem = JSON.stringify(game.myShip.body);
		game.myShip.body = item;
	}
	if (itemType == 'engine') {
		oldItem = JSON.stringify(game.myShip.engine);
		game.myShip.engine = item;
	}
	game.inventory.splice(num, 1);
	game.inventory.push(JSON.parse(oldItem));

	update();
}
function drawInventory() {
	var l = '';
	for (var e in game.inventory) {
		var ex = 'badItem';
		var it = game.inventory[e];
		if (it.type == 'weapon') {
			var w1 = itemValue(game.myShip.primaryWeapon);
			var w2 = itemValue(game.myShip.secondaryWeapon);
			var lower = (w1 > w2) ? w2 : w1;
			if (itemValue(it) > lower) ex = 'goodItem';
		}
		if (it.type == 'body' && itemValue(it) > itemValue(game.myShip.body)) ex = 'goodItem';
		if (it.type == 'engine' && itemValue(it) > itemValue(game.myShip.engine)) ex = 'goodItem';

		l += '<span class="shopItem '+ex+'">'+getItemData(game.inventory[e])+'<br>'+
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
	if (!shopList) shopList = [];
	while (!rand(0,1) && shopList.length > 1) shopList.splice(0, 1);
	do {
		itemList.push(upgradeItem(read(itemList)));
		shopList.push(clone(read(itemList)));
	} while (!rand(0,1));

	game.itemList = itemList;
	game.shopList = shopList;

	localStorage.setItem('game', JSON.stringify(game));
	notification('Game Saved');
}
function loadGame() {
	var losto = localStorage.getItem('game');
	if (!losto) return;
	game = JSON.parse(losto);

	console.log(itemList.length);
	if (game.itemList && itemList.length < game.itemList.length) itemList = game.itemList;
	shopList = game.shopList;
	notification('Game Loaded');
}
function update(step) {
	if (step == 'game_value' || !step) doc('game_value').innerHTML = shortNum(game.value);

	drawShip();
	drawShop();
	drawInventory();
	drawCombatTest();
	drawCombatButtons();
	yourMoney.innerHTML = game.money;
	shipData.innerHTML = drawShipElement()+drawShipData(game.myShip);

	doc('yourShip').className = '';
	doc('enemyShip').className = '';

	if (game.turn == 0) doc('yourShip').className = 'active';
	if (game.turn == 1) doc('enemyShip').className = 'active';

	if (!game.enemyShip) {
		$('#seekBattle').fadeIn(100);
		$('#combatButtons').fadeOut(100);
	}
	else {
		$('#seekBattle').fadeOut(100);
		if (game.turn == 0) $('#combatButtons').fadeIn(100);
		if (game.turn == 1) $('#combatButtons').fadeOut(100);
	}
}
function drawCombatButtons() {
	var primaryWeapon = game.myShip.primaryWeapon;
	var secondaryWeapon = game.myShip.secondaryWeapon;

	combatButton1.style.opacity = (isWeaponReady(game.myShip, 0)) ? 1 : 0.5;
	combatButton2.style.opacity = (isWeaponReady(game.myShip, 1)) ? 1 : 0.5;

	w1_tip.innerHTML = realDrawBar(primaryWeapon.used, primaryWeapon.reload);
	w2_tip.innerHTML = realDrawBar(secondaryWeapon.used, secondaryWeapon.reload);
}
function isWeaponReady(ship, slot) {
	var weapon = (slot == 0) ? ship.primaryWeapon : ship.secondaryWeapon;
	if (!weapon.used) weapon.used = 0;
	if (weapon.used >= weapon.reload) return true;
}
function drawCombatTest() {
	if (!game.enemyShip) {
		doc('yourShip').innerHTML = '';
		doc('enemyShip').innerHTML = '';
		return;
	}
	var l = ''
	yourShip.innerHTML = drawShipElement(game.myShip, 0, 1)+drawShipData(game.myShip);
	doc('enemyShip').innerHTML = drawShipElement(game.enemyShip, 1, 1)+drawShipData(game.enemyShip);
}
function mainWindow(what) {
	var wins = ['shipSelector', 'shipShop', 'inventory', 'combatTest', 'race'];
	for (var e in wins) $('#'+wins[e]).slideUp(100);
	$('#'+what).slideDown(100);
}
function grid(w, h) {
	game.myShip.x = 60;
	game.myShip.y = 240;


	var l = '';

	var hr = game.myShip.hueChange;

	l += 'asdf <span class="raceShip" style="-webkit-filter: hue-rotate('+hr+'deg)"></span>';

	race.innerHTML = l;
}
function getShipPrice(ship) {
	var price = 0;
	price += ship.primaryWeapon.price;
	price += ship.secondaryWeapon.price;
	price += ship.body.price;
	price += ship.engine.price;
	return price;
}
function aiTurn() {
	if (game.turn == 1) {
		if (isWeaponReady(game.enemyShip, 0)) {
			combat(0);
			return;
		}
		if (isWeaponReady(game.enemyShip, 1)) {
			combat(1);
			return;
		}
		if (rand(0,1) == 1) {
			combat(2);
			return;
		}
		else {
			combat(3);
			return;
		}
	}
}

var game = {};
var anim = false;
var griddy = {
	'top': 0,
	'left': 0,
}


generateItemList();
loadGame();
resetVariables();
var t = setInterval(saveGame, 60000);
setInterval(update, 1000);
setInterval(aiTurn, 1000);

drawShip();