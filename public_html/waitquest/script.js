var changelog = [
'a Alpha',
];
document.title = 'WaitQuest '+changes().latestVersion;
var wq = {};
var battlemode = false;

function increaseSeconds(amount = 1) {
	if (wq.name == undefined) return;
	if (wq.seconds == undefined) wq.seconds = 0;
	wq.seconds += amount;

	update('seconds');
}
function displayPlayerStat(stat) {
	var name = 'player_'+stat;
	var extra = '';
	if (stat != 'hp' && stat != 'mp') doc(name).innerHTML = getStat(wq.player, stat)+' '+stat.toUpperCase()+' '+extra;
	if (stat == 'hp') {
		doc(name).innerHTML = hpBar(wq.player)+' '+extra;
	}
	if (stat == 'mp') {
		doc(name).innerHTML = hpBar(wq.player, 'mana')+extra;
	}

	if (wq.player.skillpoints > 0) {
		var el = document.createElement('increaser');
		el.innerHTML = '+';
		el.onclick = function() {
			increaseStat(wq.player, stat);
		}
		doc(name).appendChild(el);
	}
}
function getChamberTier(num) {
	var tier = Math.ceil(num / 30);
	var name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][tier];
	if (num == 0) return 'Player Headquarters';
	var chambertype = getChamberType(num);
	return name+' '+chambertype+' '+(num % 30)+'/30';
}
function getChamberType(num, raw) {
	var type = 'generic';
	if (num % 7 == 0) type = 'midBoss';
	if (num % 30 == 0) type = 'boss';
	if (num % 90 == 0) type = 'bigBoss';
	if (num == 360) type = 'lastBoss';

	if (raw) return type;
	return {
		'generic': 'Chamber',
		'midBoss': 'Week Boss',
		'boss': 'Month Boss',
		'bigBoss': 'Season Boss',
		'lastBoss': 'YEAR BOSS',
	}[type];
}
function update(where) {
	var player = wq.player;
	if (player == undefined) {
		wq.player = new Player();
		player = wq.player;
	}
	if (wq.player.skillpoints == undefined) wq.player.skillpoints = 10;

	if (where == 'seconds' || !where) player_seconds.innerHTML = displaySeconds(wq.seconds);
	if (where == 'pname' || !where) {
		player_name.innerHTML = wq.name;
		if (wq.name == undefined) name_selector.style.display = 'block';
	}
	if (where == 'room_stuff') room_stuff.innerHTML = getChamberTier(wq.player.roomID)
	if (where == 'static_stats' || !where) {
		player_level.innerHTML = 'Level '+player.level;
		player_sp.innerHTML = player.skillpoints+' Skill Points';
		displayPlayerStat('atk');
		displayPlayerStat('def');
		displayPlayerStat('int');
		displayPlayerStat('spe');

	}
	if (where == 'dynamic_stats' || !where) {
		displayPlayerStat('hp');
		displayPlayerStat('mp');
		player_exp.innerHTML = player.exp+'/'+maxExp(player)+' EXP';
	}

	if (!where) {
		wq.rooms[0] = new Room(true, 0);
		enterRoom(0);
	}

	if (!where) {
		levelUpPlayer();
		updatePlayer();
		for (var m in wq.rooms[wq.player.roomID].monsters) {
			var mon = wq.rooms[wq.player.roomID].monsters[m];
			updateMonster(mon, m);
		}
		newTurn();
	}

	if (battlemode && !where) {
		battle_screen.style.display = 'block';
	}
}
function levelUpPlayer() {
	var beflevel = wq.player.level;
	if (wq.player.exp >= maxExp(wq.player)) {
		levelUp(wq.player);
	}
	if (wq.player.level > beflevel) {
		player_levelup.innerHTML = 'You raise to level '+wq.player.level+'!<br><div class="btn btn-default" onclick="levelOk()">Ok</div>';
	}
	update('static_stats');
	update('dynamic_stats');
}
function levelOk() {
	player_levelup.innerHTML = '';
}
function levelUp(player) {
	var max = maxExp(player);
	player.exp -= max;

	player.level++;

	player.hp = getStat(player, 'hp');
	player.mp = getStat(player, 'mp');
	player.skillpoints += 3;
}
function displayUpdater() {
	if (wq.updater == undefined) wq.updater = {};
	if (wq.prices == undefined) wq.prices = {};

	var l = displayUpdaterModule('moduleShop');
	if (wq.updater.trainer != undefined) l += displayUpdaterModule('trainer');
	updater.innerHTML = l;
}
function displayUpdaterModule(module) {
	var dl = '<module>';
	if (module == 'moduleShop') {
		dl += '<h4>Upgrade Headquarters</h4>';

		if (wq.prices.trainer == undefined) wq.prices.trainer = 10000;
		if (wq.updater.trainer == undefined) dl += '<div class="btn btn-default" onclick="buyHQUpgrade(\'trainer\')">University <span id="price_trainer">'+displaySeconds(wq.prices.trainer)+'</span></div>';

		if (wq.beaten) dl += upgradeButton('reset_dungeon', 'Reset Dungeon Rooms');
	}
	if (module == 'trainer') {
		dl += '<h5>University</h5>';

		dl += upgradeButton('trainer_sp', 'Train Skill Points');
		dl += upgradeButton('trainer_hp', 'Cooking Lesson (+HP)');
		dl += upgradeButton('trainer_mp', 'Magic Lesson (+MP)');
		dl += upgradeButton('trainer_atk', 'Martial Arts Lesson (+ATK)');
		dl += upgradeButton('trainer_def', 'Self Defense Lesson (+DEF)');
		dl += upgradeButton('trainer_int', 'Maths Lesson (+INT)');
		dl += upgradeButton('trainer_spe', 'Athletics Lesson (+SPE)');
	}
	dl += '</module>';
	return dl;
}
function upgradeButton(id, name) {
	if (wq.prices[id] == undefined) wq.prices[id] = buyUpgrade(id, true);
	var opacity = (wq.seconds >= wq.prices[id]) ? 1 : 0.5;
	return '<div class="btn btn-default" id="price_button_'+id+'" style="opacity: '+opacity+'" onclick="buyUpgrade(\''+id+'\')">'+name+' <span id="price_'+id+'">'+displaySeconds(wq.prices[id])+'</span></div>';
}
function resetDungeon() {
	wq.rooms = [];
}
function buyUpgrade(id, peek) {
	var baseprices = {
		'trainer_sp': (471 + getAllStats(wq.player, 1) + wq.player.skillpoints + wq.player.level),
		'trainer_hp': (230 + getStat(wq.player, 'hp', 1) + wq.player.level),
		'trainer_mp': (272 + getStat(wq.player, 'mp', 1) + wq.player.level),
		'trainer_atk': (160 + getStat(wq.player, 'atk', 1) + wq.player.level),
		'trainer_def': (160 + getStat(wq.player, 'def', 1) + wq.player.level),
		'trainer_int': (160 + getStat(wq.player, 'int', 1) + wq.player.level),
		'trainer_spe': (160 + getStat(wq.player, 'spe', 1) + wq.player.level),
		'reset_dungeon': wq.player.level * wq.player.level,
	};
	var effects = {
		'trainer_sp': 'wq.player.skillpoints += 3',
		'trainer_hp': 'wq.player.extra.hp += 5',
		'trainer_mp': 'wq.player.extra.mp += 5',
		'trainer_atk': 'wq.player.extra.atk += 5',
		'trainer_def': 'wq.player.extra.def += 5',
		'trainer_int': 'wq.player.extra.int += 5',
		'trainer_spe': 'wq.player.extra.spe += 5',
		'reset_dungeon': 'resetDungeon()',
	}
	if (peek) return baseprices[id];
	var price = wq.prices[id];
	if (wq.seconds < price) return;
	wq.seconds -= price;

	wq.prices[id] = baseprices[id];

	var eff = effects[id];
	eval(eff);

	update('dynamic_stats');
	update('static_stats');
	displayUpdater();
}
function buyHQUpgrade(id) {
	var price = wq.prices[id];
	if (wq.seconds < price) return;
	wq.seconds -= price;
	wq.updater[id] = true;
	wq.prices[id] = Infinity;

	displayUpdater();
}
function updatePrices() {
	for (var p in wq.prices) {
		if (wq.prices[p] == Infinity) continue;
		if (wq.prices[p] <= 0) continue;
		var name = 'price_'+p;
		if (doc(name) == undefined) continue;
		wq.prices[p]--;
		if (wq.seconds >= wq.prices[p]) {
			var naem = 'price_button_'+p;
			doc(naem).style.opacity = 1;
		}
		doc(name).innerHTML = displaySeconds(wq.prices[p]);
	}
}
function enterRoom(num, entry) {
	if (num == undefined) num = wq.rooms.length - 1;
	battlemode = undefined;
	battle_screen.style.display = 'none';
	if (wq.rooms == undefined) wq.rooms = [];
	if (wq.rooms[num] == undefined) wq.rooms[num] = new Room(false, num);
	wq.player.roomID = num;
	wq.player.hp = getStat(wq.player, 'hp');

	var room = wq.rooms[num];
	if (entry == undefined) entry = read(['top', 'left', 'right', 'bottom']);

	wq.player.x = 6;
	wq.player.y = 11;

	game_screen.innerHTML = drawRoom(room);
	newTurn();
	update('dynamic_stats');

	if (num == 0) {
		updater.style.display = 'inline-block';
		displayUpdater();
	}
	if (num != 0 ) updater.style.display = 'none';
}
function maxExp(player) {
	var level = (player.level + 1);
	return Math.pow(level, 3);
}
function getStat(player, stat, rawMode) {
	var mod = player.level / 100;
	var extra = (rawMode) ? 0 : 5;
	if (!rawMode) {
		if (stat == 'mp') extra = 15;
		if (stat == 'hp') extra = 30;
	}
	if (player.extra == undefined) player.extra = newExtra();
	extra += player.extra[stat];
	if (player.guard == undefined) player.guard = false;
	if (stat == 'def' && player.guard) mod *= 2;
	return Math.ceil(player.base[stat] * mod + extra);
}
function setName() {
	var name = name_textbox.value;
	if (name == undefined) return;
	wq.name = name;
	update();
	wq.player = new Player();
	$('#name_selector').fadeOut(500);
}
function newExtra() {
	return {'atk': 0, 'def': 0, 'int': 0, 'spe': 0, 'hp': 0, 'mp': 0};
}
function Player() {
	this.name = wq.name;
	this.base = {
		'atk': 100,
		'def': 100,
		'int': 100,
		'spe': 100,
		'hp': 100,
		'mp': 100,
	};
	this.extra = newExtra();
	this.level = 5;
	this.hp = getStat(this, 'hp');
	this.mp = getStat(this, 'mp');
	this.exp = 0;
	this.x = 0;
	this.y = 0;

	this.skillpoints = 10;

	this.moves = 0;

	this.roomID = 0;
}
function increaseStat(player, stat, amount) {
	if (amount == undefined) amount = 1;
	var stats = ['atk', 'def', 'int', 'spe', 'hp', 'mp'];
	if (stat == undefined || stat == '$') stat = read(stats);
	if (player.skillpoints >= amount) {
		player.skillpoints -= amount;
		player.extra[stat] += amount;
	}
	if (player == wq.player) {
		update('static_stats');
		update('dynamic_stats');
	}
}
function getBossPrefix(bosstype) {
	if (bosstype == undefined) return '';
	return {
		'generic': '',
		'midBoss': 'Chief',
		'boss': 'Boss',
		'bigBoss': 'Season Boss',
		'lastBoss': 'Final Boss',
	}[bosstype];
}
function Monster(level, bosstype) {
	level = (level == undefined) ? 1 : level;
	var min = level - 3;
	var max = level + 3;
	if (min < 1) min = 1;
	level = rand(min, max);

	var prefix = getBossPrefix(bosstype)+' ';
	this.name = prefix+'Slime';
	this.base = {
		'atk': rand(1, 255), 'def': rand(1, 255), 'int': rand(1, 255), 'spe': rand(1, 255), 'hp': rand(1, 255), 'mp': rand(1, 255),
	}
	this.extra = newExtra();

	var bossExtras = {
		'midBoss': 24,
		'boss': 60,
		'bigBoss': 1440,
		'lastBoss': 3600,
	}
	var bex = bossExtras[bosstype];
	var bossExtra = (bex) ? bex : 0;

	this.boss = bosstype;

	this.extra.hp += bossExtra;
	this.base.hp += bossExtra;

	var sp = (5 + (level * 3));
	var balance = Math.ceil((getAllStats(wq.player, true) + sp) / 2);

	this.skillpoints = balance;

	while (this.skillpoints > 0) {
		var r = rand(1, this.skillpoints);
		increaseStat(this, '$', r);
	}


	this.level = level;
	this.hp = getStat(this, 'hp');
	this.mp = getStat(this, 'mp');
	this.exp = 0;
	this.x = rand(2, 10);
	this.y = rand(2, 10);

	this.moves = 0;
}
function Room(town, id) {
	var width = 13;
	var height = 13;

	this.map = [];
	this.town = town;
	for (var h = 0; h < height; h++) {
		this.map[h] = [];
		for (var w = 0; w < width; w++) {
			var toad = 'floor';
			if (h == 0 || h == (height - 1) || w == 0 || w == (width - 1)) {
				toad = 'wall';
				if (h == 0 && (w == 5 || w == 7)) toad = 'wall_torch';
				if (h == 0 && w == 6) {
					toad = 'door';
					this.door = {'x': w, 'y': h};
				}
			}
			if (h == (height - 1) && w == 6 && !town) {
				toad = 'exit';
				this.exit = {'x': w, 'y': h};
			}

			this.map[h][w] = toad;
		}
	}
	this.monsters = [];
	if (!this.town) {
		var bossStage = getChamberType(id, true);
		var maxlevel = Math.ceil((wq.player.roomID + wq.player.level) / 2);

		if (bossStage == 'generic') {
			for (var n = 0; n < 7; n++) {
				this.monsters.push(new Monster(maxlevel));
			}
		}
		if (bossStage == 'midBoss') maxlevel += 7;
		if (bossStage == 'boss') maxlevel += 12;
		if (bossStage == 'bigBoss') maxlevel += 24;
		if (bossStage == 'lastBoss') maxlevel += 60;

		if (bossStage != 'generic') this.monsters.push(new Monster(maxlevel, bossStage));
	}
}
function aiMove() {
	if (wq.turn == 'player') return;
	if (battlemode) return;
	var room = wq.rooms[wq.player.roomID];
	var totalMoves = 0;
	for (var m in room.monsters) {
		var monster = room.monsters[m];
		if (monster.moves <= 0) continue;
		var gp = gps(monster, wq.player);
		var dir = read([read(['top', 'bottom', 'left', 'right']), gp]);
		moveGuy(room.monsters[m], dir, m);
		totalMoves += monster.moves;
		if (battlemode) return;
	}
	if (totalMoves <= 0) newTurn();
}
function whoshere(x, y) {
	if (wq.player.x == x && wq.player.y == y) return 'player';
	for (var m in getMonsterList()) {
		if (x == getMonsterList(m).x && y == getMonsterList(m).y) return {'monster': m};
	}
}
function getRoom() {
	return wq.rooms[wq.player.roomID];
}
function getMonsterList(id) {
	var mlist = getRoom().monsters;
	if (id != undefined) return mlist[id];
	return mlist;
}
function outOfBounds(object) {
	if (object.x < 1 || object.x > 11) return true;
	if (object.y < 1 || object.y > 11) return true;
}
function moveGuy(guy, direction, monsterid) {
	var newPos = {
		'x': guy.x,
		'y': guy.y,
	}
	if (direction == 'top') {
		newPos.y--;
	}
	if (direction == 'bottom') {
		newPos.y++;
	}
	if (direction == 'left') {
		newPos.x--;
	}
	if (direction == 'right') {
		newPos.x++;
	}
	var who = whoshere(newPos.x, newPos.y);
	if (who && (who.monster != undefined && monsterid == undefined) || (who == 'player' && monsterid != undefined)) {
		guy.moves = 0;
		var monster = (monsterid != undefined) ? monsterid : who.monster;
		startBattle(monster);
	}

	var room = getRoom();
	var advancefloor = false;
	if (room.beaten) {
		var door = room.door;
		if (newPos.x == door.x && newPos.y == door.y) {
			advancefloor = true;
		}
	}

	if (!who && (!outOfBounds(newPos) || advancefloor)) {
		guy.x = newPos.x;
		guy.y = newPos.y;

		guy.moves--;
		if (advancefloor) goToNextFloor();
	}

	if (monsterid == undefined) updatePlayer();
	if (monsterid != undefined) updateMonster(guy, monsterid);
}
function goToNextFloor() {
	var actual = wq.player.roomID;
	var newFloor = actual + 1;
	if (actual == 0) newFloor = wq.rooms.length - 1;
	enterRoom(newFloor);
}
function hpBar(player, mp) {
	var min = (mp) ? player.mp : player.hp;
	var max = (mp) ? getStat(player, 'mp') : getStat(player, 'hp');
	var percent = (min / max * 100);
	var man = (mp) ? 'mana' : 'hp';
	var title = (mp) ? player.mp+'/'+getStat(player, 'mp')+' MP' : player.hp+'/'+getStat(player, 'hp')+' HP';
	return '<bar title="'+title+'" style="width: 90%"><filled class="'+man+'" style="position: absolute; top: 0; left: 0; width: '+percent+'%"></filled></bar>';
}
function updateBattleMonster() {
	var mon = getMonsterList(battlemode.enemy);

	var ubm = mon.name+' Lv. '+mon.level+'<br>'+hpBar(mon)+'<br>'+hpBar(mon, 'mana')+'<br>';
	ubm += statBar(mon);
	monster_name.innerHTML = ubm;
	update('dynamic_stats');
}
function statBar(player) {
	var atk = getStat(player, 'atk');
	var def = getStat(player, 'def');
	var intt = getStat(player, 'int');
	var spe = getStat(player, 'spe');
	var total = (atk + def + intt + spe);

	var atk_p = Math.floor((atk / total) * 100);
	var def_p = Math.floor((def / total) * 100);
	var int_p = Math.floor((intt / total) * 100);
	var spe_p = Math.floor((spe / total) * 100);
	var left = (100 - atk_p - def_p - int_p - spe_p);
	var h = getHigher([atk, def, intt, spe]);
	if (h == 0) atk_p += left;
	if (h == 1) def_p += left;
	if (h == 2) int_p += left;
	if (h == 3) spe_p += left;

	return '<div>'+
	'<filled class="atk" style="width: '+atk_p+'%">'+atk+'</filled>'+
	'<filled class="def" style="width: '+def_p+'%">'+def+'</filled>'+
	'<filled class="int" style="width: '+int_p+'%">'+intt+'</filled>'+
	'<filled class="spe" style="width: '+spe_p+'%">'+spe+'</filled>'+
	'</div>';
}
function getHigher(arr) {
	var higherx = 0;
	for (var a in arr) {
		if (arr[a] >= arr[higherx]) higherx = a;
	}
	return parseInt(higherx);
}
function startBattle(monsterid) {
	battlemode = {'enemy': monsterid};
	var mon = getMonsterList()[monsterid];
	
	updateBattleMonster();
	
	battle_screen.style.display = 'block';
	battle_messager.innerHTML = 'A slime appears!<br>'+battleButtons('start');
}
function damageFormula(from, to, magic) {
	var atk = getStat(from, 'atk');
	var def = getStat(to, 'def');

	if (magic) {
		atk = getStat(from, 'int');
		def = getStat(to, 'int');
	}

	var dmg = rand(atk, (atk * 2));
	dmg -= def;
	if (dmg <= 0) dmg = 1;

	return dmg;
}
function doAttack(magic) {
	var myspd = getStat(wq.player, 'spe');
	var yourspd = getStat(getEnemy(), 'spe');

	if (myspd >= yourspd) {
		//User attack
		var be = attack(wq.player, getEnemy(), magic);
		var type = 'initiative';
	}
	if (myspd < yourspd) {
		//Monster attack
		var mp = getEnemy().mp;
		var mgc = (mp >= 10) ? rand(0,1) : 0;
		var be = attack(getEnemy(), wq.player, mgc);
		var type = 'counter';
	}

	if (!be && wq.player.hp > 0) battle_messager.innerHTML += battleButtons(type, magic);
}
function getSecGain(enemy) {
	var levelmod = (enemy.level / wq.player.level);
	var roomMultiplier = wq.player.roomID;
	var bossmod = 1;
	if (enemy.boss == 'midBoss') bossmod = 1.5;
	if (enemy.boss == 'boss') bossmod = 2;
	if (enemy.boss == 'bigBoss') bossmod = 3;
	if (enemy.boss == 'lastBoss') bossmod = 7;

	return Math.ceil(bossmod * roomMultiplier * levelmod);
}
function checkWin() {
	if (getEnemy().hp > 0) return;
	var exp = Math.ceil(maxExp(getEnemy()) / 2);
	wq.player.exp += exp;
	var secgain = Math.ceil(wq.player.roomID * (getEnemy().level / wq.player.level));
	increaseSeconds(secgain);
	update('seconds');
	battle_messager.innerHTML += getEnemy().name+' dies. You win '+exp+' experience points and '+displaySeconds(secgain)+'.'+battleButtons('win');
	levelUpPlayer();

	return true;
}
function killMonster() {
	getRoom().monsters.splice(battlemode.enemy, 1);
}
function checkLose() {
	if (wq.player.hp > 0) return;
	wq.player.hp = getStat(wq.player, 'hp');

	battle_messager.innerHTML += battleButtons('lose');

	return true;
}
function counterAttack(side, magic) {
	battle_messager.innerHTML = '';
	if (side == 'monster') {
		var mp = getEnemy().mp;
		var mgc = (mp >= 10) ? rand(0,1) : 0;
		attack(getEnemy(), wq.player, mgc);
	}
	if (side == 'player') {
		attack(wq.player, getEnemy(), magic);
	}
	battle_messager.innerHTML += battleButtons('ok');

	wq.player.guard = false;
	getEnemy().guard = false;
}
function counterAttackMagic(side) {
	counterAttack(side, 1);
}
function attack(from, to, magic) {
	var dmg = damageFormula(from, to);
	var act = (magic) ? ' casts a fireball to ' : ' attacks ';

	if (magic) {
		var cost = 10;
		if (from.mp < cost) dmg = 0;
		if (from.mp >= cost) from.mp -= cost;
	}

	to.hp -= dmg;
	if (to.hp <= 0) to.hp = 0;

	battle_messager.innerHTML += from.name+act+to.name+' causing '+dmg+' damage.<br>';
	var battleEnd = (checkWin() || checkLose()) ? true : false;
	updateBattleMonster();
	return battleEnd;
}
function getEnemy() {
	return getMonsterList(battlemode.enemy);
}
function battleAction(act) {
	battle_messager.innerHTML = '';
	var result = 0;
	if (act == 'attack') {
		result = doAttack();
	}
	if (act == 'guard') {
		battle_messager.innerHTML = wq.player.name+' is defending!<br>'+battleButtons('initiative', 0);
		wq.player.guard = true;
	}
	if (act == 'magic') {
		result = doAttack('magic');
	}
}
function battleButtons(what, magic) {
	var l = '';
	if (what == 'start') {
		l += '<div class="btn btn-danger" onclick="startFight()" style="width: 50%">Fight</div>';
		l += '<div class="btn btn-default" onclick="flee()" style="width: 50%">Run</div>';
	}
	if (what == 'actions') {
		l += '<div class="btn btn-danger" onclick="battleAction(\'attack\')">Attack</div>';

		if (wq.player.mp >= 10) l += '<div class="btn btn-primary" onclick="battleAction(\'magic\')">Magic (10 MP)</div>';
		if (wq.player.mp < 10) l += '<div class="btn btn-primary" style="opacity: 0.5">Magic (10 MP)</div>';

		l += '<div class="btn btn-warning" onclick="battleAction(\'guard\')">Guard</div>';
		l += '<div class="btn btn-default" onclick="flee()">Run</div>';
	}
	if (what == 'initiative') {
		if (magic) l += '<div class="btn btn-default" style="width: 100%" onclick="counterAttackMagic(\'monster\')">&gt&gt&gt</div>';
		if (!magic) l += '<div class="btn btn-default" style="width: 100%" onclick="counterAttack(\'monster\')">&gt&gt&gt</div>';
	}
	if (what == 'counter') {
		if (magic) l += '<div class="btn btn-default" style="width: 100%" onclick="counterAttackMagic(\'player\')">&gt&gt&gt</div>';
		if (!magic) l += '<div class="btn btn-default" style="width: 100%" onclick="counterAttack(\'player\')">&gt&gt&gt</div>';
	}
	if (what == 'ok') {
		l += '<div class="btn btn-default" style="width: 100%" onclick="startFight()">&gt&gt&gt</div>';
	}
	if (what == 'win') {
		l += '<div class="btn btn-danger" style="width: 100%" onclick="exitFight()">Ok</div>';
	}
	if (what == 'lose') {
		l += '<div class="btn btn-danger" style="width: 100%" onclick="afterLife()">Restart</div>';
	}
	return l;
}
function afterLife() {
	enterRoom(0);
}
function exitFight() {
	killMonster();

	battle_screen.style.display = 'none';
	battlemode = false;
	game_screen.innerHTML = drawRoom(getRoom());
}
function startFight() {
	battle_messager.innerHTML = 'What are you going to do?<br>'+battleButtons('actions');
}
function flee() {
	battlemode = undefined;
	battle_screen.style.display = 'none';
}
function getAllStats(player, rawMode) {
	var total = 0;
	var stats = ['hp', 'mp', 'atk', 'def', 'int', 'spe'];
	for (var s in stats) total += getStat(player, stats[s], rawMode);
	return total;
}
function resetMovements(player) {
	var speed = getStat(player, 'spe', 'raw');
	var total = getAllStats(player, 'raw');
	var mod = Math.ceil((speed / total) * 5);
	player.moves = mod;
	return mod;
}
function changeTile(map, x, y, newTile) {
	map[y][x] = newTile;
	var n = 'roomtile_'+y+'_'+x;
	doc(n).className = newTile;
}
function endGameDismiss() {
	$('#game_clickshield').fadeOut(1000);
	$('#game_beaten').fadeOut(1000);
}
function newTurn() {
	wq.turn = (wq.turn == 'player') ? 'monster' : 'player';
	update('room_stuff');
	var room = wq.rooms[wq.player.roomID];
	//Check if all monsters are dead
	if (room.monsters.length <= 0) {
		if (room.door == undefined) room.door = {'x': 7, 'y': 1}
		var coord = room.door;
		changeTile(room.map, coord.x, coord.y, 'wall_tunnel');
		room.beaten = true;

		if (wq.player.roomID == 360) {
			if (wq.beaten == undefined) {
				wq.beaten = true;
				$('#game_clickshield').fadeIn(100);
				$('#game_beaten').fadeIn(5000);
			}
		}
	}

	if (wq.turn == 'player') {
		resetMovements(wq.player);
	}
	if (wq.turn == 'monster') {
		for (var m in room.monsters) resetMovements(room.monsters[m]);
	}

	updatePlayer();
	for (var m in room.monsters) {
		updateMonster(room.monsters[m], m);
	}
}
function gps(from, to) {
	var dir = 'center';
	if (from.x > to.x) dir = 'left';
	if (from.x < to.x) dir = 'right';
	if (from.y < to.y) dir = 'bottom';
	if (from.y > to.y) dir = 'top';

	return dir;
}
function action(x, y) {
	if (wq.turn == 'player' && wq.player.moves <= 0) newTurn();
	if (wq.player.moves <= 0) return;

	var dir = gps(wq.player, {'x': x, 'y': y});
	moveGuy(wq.player, dir);

	if (wq.turn == 'player' && wq.player.moves <= 0) newTurn();
}
function drawRoom(room) {
	var l = '';
	var map = room.map;
	for (var h in map) {
		for (var w in map[h]) {
			l += '<sprite id="roomtile_'+h+'_'+w+'" class="'+map[h][w]+'" onclick="action('+w+', '+h+')" style="top: '+(h * 32)+'px; left: '+(w * 32)+'px"></sprite>';
		}
	}

	for (var m in room.monsters) {
		var monsta = room.monsters[m];
		l += '<sprite id="monster_'+m+'" class="slime" style="top: '+(monsta.y * 32)+'px; left: '+(monsta.x * 32)+'px"></sprite>';
	}

	l += '<sprite id="player_sprite" class="human" style="top: '+(wq.player.y * 32)+'px; left: '+(wq.player.x * 32)+'px"></sprite>';
	return l;
}
function updatePlayer() {
	player_sprite.style.top = (wq.player.y * 32)+'px';
	player_sprite.style.left = (wq.player.x * 32)+'px';

	var extra = (wq.turn == 'player' && wq.player.moves > 0) ? 'active' : '';
	player_sprite.className = 'human '+extra;

	player_sprite.innerHTML = wq.player.level;
}
function updateMonster(monster, id) {
	var n = 'monster_'+id;
	doc(n).style.top = (monster.y * 32)+'px';
	doc(n).style.left = (monster.x * 32) + 'px';

	var extra = (wq.turn == 'monster' && monster.moves > 0) ? 'activem' : '';
	doc(n).className = 'slime '+extra;

	doc(n).onclick = function() {
		action(monster.x, monster.y);
	}

	doc(n).innerHTML = monster.level;
}
function timePass() {
	increaseSeconds();
	updatePrices();

	if (wq.player.roomID == 0) {
		var maxhp = getStat(wq.player, 'hp');
		var maxmp = getStat(wq.player, 'mp');
		if (wq.player.hp < maxhp) wq.player.hp = maxhp;
		if (wq.player.mp < maxmp) wq.player.mp = maxmp;
	}
}
function displaySeconds(seconds) {
    var secondz = Math.floor(seconds % 60);
    var minutes = Math.floor((seconds / 60) % 60);
    var hours = Math.floor((seconds / 3600) % 24);
    var days = Math.floor(seconds / 86400);

    if (days > 0) return days+'d '+hours+'h '+minutes+'m '+secondz+'s';
    if (hours > 0) return hours+'h '+minutes+'m '+secondz+'s';
    if (minutes > 0) return minutes+'m '+secondz+'s';
    return secondz+'s';
}
function saveGame() {
	localStorage.setItem('wq', JSON.stringify(wq));
}
function loadGame() {
	wq_test = JSON.parse(localStorage.getItem('wq'));
	if (wq_test != null && wq_test != undefined) wq = wq_test;
}
function resetGame() {
	wq = {};
	saveGame();
	window.location = window.location;
}

loadGame();
update();
setInterval(timePass, 1000);
setInterval(saveGame, 60000);
setInterval(aiMove, 500);