var changelog = [
'- Alpha',
'- Test',
'--',
'---',
'---- Al mostrar la clase del jugador, se muestra el nombre de la clase, y no el predefinido.',
'---- El nombre de la clase ya no se muestra como "undefined"',
'---- Las armas ahora muestran Ataque, Defensa, Velocidad, etc, en lugar de ATK/DEF/SPE/MAG/HPX',
];

var playing = false;
var initialized = false;

var STAT_GAIN_GOOD = 2;
var STAT_LOSS_BAD = 1;

var turn = 0;

var STAT_NAMES = {'str': 'Fuerza', 'dex': 'Destreza', 'end': 'Resistencia', 'int': 'Inteligencia', 'wis': 'Sabiduría', 'cha': 'Carisma', 'agi': 'Agilidad', 'luk': 'Suerte'};

var PLAYER_STATS = {
	'exp': {
		'name': 'Experiencia',
		'desc': 'Los puntos de experiencia se obtienen al ganar combates. Si acumulas los suficientes subirás de nivel.',
	},
	'hp': {
		'name': 'Puntos de Impacto',
		'desc': 'Determinan tu salud. Si los Puntos de Impacto (PI) llegan a 0, mueres.',
	},
	'str': {
		'name': STAT_NAMES.str,
		'desc': 'Influye en el daño que causas al atacar cuerpo a cuerpo y el peso que puedes soportar.',
	},
	'dex': {
		'name': STAT_NAMES.dex,
		'desc': 'Influye en tu manejo de armas a distancia, la posibilidad de esquivar y tu AC.',
	},
	'end': {
		'name': STAT_NAMES.end,
		'desc': 'Mide tu resistencia a estados que reducen tus PI. Aumenta tus Puntos de Impacto.',
	},
	'int': {
		'name': STAT_NAMES.int,
		'desc': 'Aumenta los puntos de habilidad que consigues al subir de nivel.',
	},
	'wis': {
		'name': STAT_NAMES.wis,
		'desc': 'Aumenta el daño causado con hechizos y reduce las posibilidades de caer bajo el control de otro.',
	},
	'cha': {
		'name': STAT_NAMES.cha,
		'desc': 'Mide tu capacidad para mediar con la gente.',
	},
	'agi': {
		'name': STAT_NAMES.agi,
		'desc': 'Influye en el orden de acciones durante un combate, la rapidez con las que se ejecutan, el sigilo y el manejo de armas pequeñas.',
	},
	'luk': {
		'name': STAT_NAMES.luk,
		'desc': 'Aumenta la posibilidad de que te ocurran cosas buenas.',
	},
}

function resetVariables() {
	if (!game) game = {};
	if (!game.tutorial) game.tutorial = 0;
	if (!game.players) game.players = [];
	if (!game.floor) game.floor = 1;
	if (!game.steps) game.steps = 0;

	delete game.log;
}
function saveGame() {
	game.shop = undefined;
	generateShop();
	localStorage.setItem('game', JSON.stringify(game));
	notif('Game Saved');
}
function loadGame() {
	var losto = localStorage.getItem('game');
	if (!losto) return;
	game = JSON.parse(losto);
	notification('Game Loaded');
}
function toLog(string) {
	$('#log').stop();
	var dat = new Date();
	dat = dat.getUTCHours()+':'+dat.getUTCMinutes()+':'+dat.getUTCSeconds();
	string = '<sup>'+dat+'</sup> '+string
	gamelog += string+'<br>';
	log.innerHTML = gamelog;
    log.scrollTop = log.scrollHeight;
}
function notif(string) {
	notification(string);
	toLog(string);
}
function tutorial() {
	if (game.tutorial == 0) {
		$('#characterCreation').fadeIn(1000);
	}
	if (game.tutorial == 1) {
		$('#characterCreation').fadeOut(100);
		$('#story').fadeIn(1000);
	}
	if (game.tutorial == 2) {
		$('#story').fadeOut(100);
		$('#gameScreen').fadeIn(1000);
	}
}
tutorial.k = function() {
	game.tutorial = 2;
	tutorial();
	update();
	generateShop();
}
function monster(level) {
	var m = new player('Monstruo', rand(1, 99), rand(100, 200), rand(50, 200), 'monster', 'bad', 'other', read(getMonsters()));
	var map = getCurrentMap();
	var limit = getLimit(map);
	var spawnX = rand(Math.floor(limit.x / 2), limit.x);
	var spawnY = rand(0, limit.y);
	m.x = spawnX;
	m.y = spawnY;
	m.monster = true;
	for (var l = 0; l < level; l++) levelUp(m);
	m.hp = getCombatStat(m, 'hpx');
	m.hpx = getCombatStat(m, 'hpx');
	return m;
}
function getClassBenefits(clas) {
	var classes = {
		'unemployed': {
			'good': [],
			'bad': [],
		},
		'monk': {
			'good': ['end', 'int', 'wis'],
			'bad': ['str', 'dex'],
		},
		'fighter': {
			'good': ['end', 'str', 'dex'],
			'bad': ['agi'],
		},
		'paladin': {
			'good': ['end', 'end', 'str'],
			'bad': ['agi', 'dex'],
		},
		'thief': {
			'good': ['end', 'agi', 'dex'],
			'bad': ['int', 'wis'],
		},
		'necromancer': {
			'good': ['int', 'wis', 'str', 'dex'],
			'bad': ['end'],
		},
		'warlock': {
			'good': ['int', 'wis', 'end'],
			'bad': ['str', 'dex'],
		},
		'wizard': {
			'good': ['int', 'wis', 'agi', 'dex'],
			'bad': ['str', 'end'],
		},
		'warrior': {
			'good': ['str', 'dex', 'str', 'end'],
			'bad': ['int', 'wis'],
		},
		'assasin': {
			'good': ['str', 'dex', 'agi', 'dex'],
			'bad': ['end'],
		},
		'hunter': {
			'good': ['str', 'agi', 'dex'],
			'bad': ['end'],
		},
	};
	if (classes[clas] == undefined) return classes['unemployed']
	return classes[clas];
}
function displayClass(clas, html) {
	var gcb = getClassBenefits(clas);
	var st = {'str': 0, 'dex': 0, 'end': 0, 'int': 0, 'wis': 0, 'cha': 0, 'agi': 0, 'luk': 0};
	for (var s in gcb.good) st[gcb.good[s]] += STAT_GAIN_GOOD;
	for (var s in gcb.bad) st[gcb.bad[s]] -= STAT_LOSS_BAD;
	var lb = (html) ? '<br>' : '\n';

	var cn = (html) ? '<b>'+getJobList(1)[clas]+'</b>' : getJobList(1)[clas];
	var str = cn+lb;
	for (var s in st) {
		var stat = st[s];
		if (stat != 0) str += stat+' '+STAT_NAMES[s]+lb;
	}
	return str;
}
function statBonus(playerID, value) {
	var player = game.players[playerID];
	var stats = ['str', 'dex', 'end', 'int', 'wis', 'cha', 'agi', 'luk'];
	var stat = read(stats);
	player[stat] += value;
	if (player[stat] <= 0) player[stat] = 0;
	var pm = (value > 0) ? '+' : '';
	onUnitNotification(playerID, pm+value+' '+getStatName(stat));
	update();
}
function autoAssignStatPoints(player) {
	if (player == undefined) player = game.players[0];
	var befhp = player.hpx;
	var cb = getClassBenefits(player.job);
	var rolls = ['str', 'dex', 'end', 'int', 'wis', 'cha', 'agi', 'luk'];
	for (var c in cb.good) {
		rolls.push(cb.good[c]);
		rolls.push(cb.good[c]);
	}
	var pps = Math.ceil(player.statPoints / rolls.length);
	for (var sp in rolls) {
		if (pps > player.statPoints) pps = player.statPoints;
		player[rolls[sp]] += pps;
		player.statPoints -= pps;
		if (player.statPoints <= 0) break;
	}
	var diff = Math.abs(getCombatStat(player, 'hpx') - befhp);
	player.hp += diff;
	if (player == game.players[0]) update();
}
function getJobList(name) {
	if (name) {
		return {
		'monk': 'Monje',
		'fighter': 'Luchador',
		'paladin': 'Paladín',
		'thief': 'Ladrón',
		'necromancer': 'Nigromante',
		'warlock': 'Brujo',
		'warrior': 'Guerrero',
		'wizard': 'Mago',
		'assasin': 'Asesino',
		'hunter': 'Cazador',

		'unemployed': 'Aprendiz',

	};
};
	return [
	'monk', 'fighter', 'paladin', 'thief', 'necromancer', 'warlock', 'warrior', 'wizard', 'assasin', 'hunter',
	];
}
function newEquipment() {
	return {
		'weapon': new item('weapon', 1, 1),
		'shield': new item('shield', 1, 1),

		'head': new item('head', 1, 1),
		'armor': new item('armor', 1, 1),
		'boots': new item('boots', 1, 1),

		'amulet': new item('amulet', 1, 1),
	}
}
function player(name, age, height, weight, job, alignment, sex, race) {
	//Player selected variables
	this.name = name;
	this.age = age;
	this.height = height;
	this.weight = weight;
	this.job = job;
	if (this.job = 'unemployed') this.job = read(getJobList());
	this.alignment = alignment;
	this.sex = sex;
	this.race = race;

	this.poison = 0;
	this.regen = 0;

	//Default variables
	this.level = 1;
	this.experience = 0;
	this.money = 0;

	//Stats
	this.str = 5; //Strength
	this.dex = 5; //Dexterity
	this.end = 5; //Endurance
	this.int = 5; //Intelligence
	this.wis = 5; //Wisdom
	this.cha = 5; //Charisma
	this.agi = 5; //Agility
	this.luk = 5; //Luck

	this.equip = newEquipment();

	this.hpx = getCombatStat(this, 'hpx');
	this.hp = getCombatStat(this, 'hpx');

	var cb = getClassBenefits(this.job);
	for (var e in cb.good) {
		var stat = cb.good[e];
		this[stat] += STAT_GAIN_GOOD;
	}
	for (var e in cb.bad) {
		var stat = cb.bad[e];
		this[stat] -= STAT_LOSS_BAD;
	}
	this.nextMove = 0;

	this.statPoints = 10;
	this.skillPoints = 3;

	//Skill levels
	this.skillLevel = [
	0, //Noobster - Does nothing
	]
}
function update(w) {
	playerstats.innerHTML = getPlayerStats();
	//if (w == 'floor') towerFloor.innerHTML = game.floor;
}
function getPlayerStats() {
	return getPlayerStat(game.players[0]);
}
function getPlayerPosition() {
	if (game.players[0].x == undefined) game.players[0].x = 0;
	if (game.players[0].y == undefined) game.players[0].y = 0;
	var pos = {
		'x': game.players[0].x,
		'y': game.players[0].y,
	}
	return pos;
}
function increase(stat) {
	if (game.players[0].statPoints <= 0) return;
	game.players[0][stat]++;
	game.players[0].statPoints--;

	update();
}
function getItemNames(type) {
	return {
		'head': read(['Yelmo', 'Gorro', 'Capucha', 'Gorra', 'Casco']),
		'armor': read(['Coraza', 'Peto', 'Cota de Mallas', 'Amradura', 'Camiseta', 'Camisa', 'Túnica']),
		'boots': read(['Botas', 'Zapatillas', 'Sandalias', 'Chancletas']),
		'shield': read(['Escudo']),
		'weapon': read(['Espada', 'Arco', 'Daga', 'Hacha', 'Lanza', 'Mosquete', 'Pistola', 'Bastón']),
		'amulet': read(['Amuleto']),
	}[type];
}
function getItemTypes(type) {
	var itemTypes = {
		'all': [
			'head',   //Magic
			'armor',  //Hit Points
			'boots',  //Speed
			'shield', //Defense
			'weapon', //Attack
			'amulet', //Random
		],

		'head': 'mag',
		'armor': 'hpx',
		'boots': 'spe',
		'shield': 'def',
		'weapon': 'atk',
		'amulet': read(['hpx', 'mag', 'spe', 'def', 'atk']),
	};
	if (type != undefined) {
		return itemTypes[type];
	}
	return itemTypes.all;
}
function getItemRarity(typ) {
	//'Z: 0.195%, X: 0.391%, S: 0.782%, A: 1.564%, B: 3.128%, C: 6.256%, D: 12.512%, E: 25.024%, F: 50.048%'
	var rarities = [512, 256, 128, 64, 32, 16, 8, 4, 2, 1];
	var rarity = [
		{'name': 'Normal',     'stat': 0.5,  'tier': 'F', 'color': 'rarity_normal'},
		{'name': 'Común',      'stat': 1,    'tier': 'E', 'color': 'rarity_common'},
		{'name': 'Especial',   'stat': 1.1,  'tier': 'D', 'color': 'rarity_special'},
		{'name': 'Escaso',     'stat': 1.15, 'tier': 'C', 'color': 'rarity_sparse'},
		{'name': 'Raro',       'stat': 1.2,  'tier': 'B', 'color': 'rarity_rare'},
		{'name': 'Épico',      'stat': 1.5,  'tier': 'A', 'color': 'rarity_epic'},
		{'name': 'Mítico',     'stat': 2,    'tier': 'S', 'color': 'rarity_mythical'},
		{'name': 'Legendario', 'stat': 5,    'tier': 'X', 'color': 'rarity_legendary'},
		{'name': 'Único',      'stat': 10,   'tier': 'Z', 'color': 'rarity_unique'},
		{'name': 'Basura',     'stat': 0.1,  'tier': '-', 'color': 'rarity_shit'},
	];
	if (typ) return rarity[typ];
	var value = 0;
	for (var r in rarities) value += rarities[r];
	var rn = rand(0, value);
	for (var r in rarities) {
		var rty = rarities[r];
		if (rn > rty) {
			rn -= rty;
			continue;
		}
		return r;
	}
	return 9;
}
function item(type, level, forceTrash) {
	if (type == undefined) type = read(getItemTypes());
	this.type = type;
	if (level == undefined) level = 1;
	if (level <= 0) level = 1;
	this.tier = getItemRarity();
	if (forceTrash) this.tier = 9;

	var rarity = getItemRarity(this.tier);
	this.name = getItemNames(this.type);
	this.hpx = 0;
	this.mag = 0;

	this.level = level;

	this.atk = 0;
	this.def = 0;
	this.spe = 0;

	var primaryStat = getItemTypes(this.type);
	var secondaryStat = getItemTypes('amulet');

	var value_primary = Math.ceil((5 * this.level * rarity.stat) + 1) ;
	var value_secondary = Math.ceil((2 * this.level * rarity.stat) + 1);

	this[primaryStat] += value_primary;
	this[secondaryStat] += value_secondary;

	this.price = Math.ceil(((value_primary + value_secondary) * 3) * rarity.stat);
}
function generateShop() {
	if (game.shop == undefined) game.shop = [];
	while (game.shop.length < 24) game.shop.push(new item(read(getItemTypes()), game.players[0].level));

	var il = '';
	for (var it in game.shop) {
		il += displayItem(game.shop[it], false, it);
	}
	shop.innerHTML = il;
}
function buyItem(id) {
	var item = game.shop[id];
	var price = item.price;
	var type = item.type;

	if (game.players[0].money < price) return;

	var oldPrice = game.players[0].equip[type].price;

	game.players[0].equip[type] = JSON.parse(JSON.stringify(item));

	game.players[0].money += oldPrice;
	game.players[0].money -= price;

	game.shop.splice(id, 1);

	update();
	generateShop();
}
function getMonsters() {
	return [
	'sprite_coon',
	'sprite_boyScout',
	'sprite_traitorBoyScout',
	'sprite_traitorCoon',
	'sprite_zombieScout',
	'sprite_zombieCoon',
	'sprite_vampire',
	'sprite_priest',
	'sprite_demon',
	'sprite_angel',
	'sprite_succubus',
	'sprite_rppCoon',
	'sprite_soldierCoon',
	'sprite_sniperScout',
	'sprite_soldierScout',
	'sprite_goblin',
	'sprite_gnome',
	'sprite_fairy',
	'sprite_bitten',
	'sprite_fireSage',
	'sprite_earthSage',
	'sprite_windSage',
	'sprite_waterSage',
	];
}
function displayItem(item, simple, id) {
	var op = (game.players[0].money >= item.price) ? 1 : 0.5;
	var recommended = '';
	var oldItem = game.players[0].equip[item.type];
	if (item.tier >= oldItem.tier && item.tier != 9 && item.level > oldItem.level) recommended = 'recommended';

	var rarity = getItemRarity(item.tier);
	var name = '<item class="'+rarity.color+' item">'+item.name+' '+rarity.name+'</item>';

	var el = '<div class="itemDisplay '+recommended+'" style="opacity: '+op+'" onclick="buyItem('+id+')">';
	el += name+' ($'+item.price+')<br>';
	var itemStats = ['atk', 'def', 'spe', 'mag', 'hpx'];
	var extra = '';
	for (var st in itemStats) {
		var stat = itemStats[st];
		if (item[stat] > 0) {
			var playerStat = game.players[0].equip[item.type][stat];
			var excl = 'stat_neutral';
			if (playerStat > item[stat]) excl = 'stat_bad';
			if (playerStat < item[stat]) excl = 'stat_good';
			el += '<stat class="'+excl+'">'+item[stat]+' '+getStatName(stat)+'</stat><br>';
			extra += item[stat]+' '+getStatName(stat)+' ';
		}
	}
	if (simple) return '<span title="'+extra+'">'+name+'</span>';
	el += '</div>';

	return el;
}
function getJobInfo() {
	var j = formJob.value;
	jobselector_benefits.innerHTML = displayClass(j, 1);
}
function getPlayerStat(player) {
	var l = '';
	l += '<span title=""><b>Nombre</b>   '+player.name+' el <job title="'+displayClass(player.job)+'">'+getJobList(1)[player.job]+'</job></span><br>';
	l += '<span title=""><b>Nivel</b>   '+player.level+'</span><br>';
	l += '<span title=""><b>$</b> '+player.money+'</span><br>';


	var lore = 'Los puntos de experiencia se obtienen al ganar combates. Si acumulas los suficientes subirás de nivel.';
	l += '<span title="'+lore+'"><b>Experiencia</b><br>'+realDrawBar(player.experience, getMaxExp(player.level))+' '+player.experience+'/'+getMaxExp(player.level)+'</span><br>';
	var lore = 'Determinan tu salud. Si los Puntos de Impacto (PI) llegan a 0, mueres.';
	l += '<span title="'+lore+'"><b>Puntos de Impacto</b><br>'+realDrawBar(player.hp, getCombatStat(player, 'hpx'))+' '+player.hp+'/'+getCombatStat(player, 'hpx')+'</span><br>';
	l += '<br>';
	var lore = 'Influye en el daño que causas al atacar cuerpo a cuerpo y el peso que puedes soportar.';
	l += '<span title="'+lore+'"><b>Fuerza</b>   '+player.str+'</span>';
	if (player.statPoints > 0) l += '<increaser onclick="increase(\'str\')">+</increaser>';
	l += '<br>';
	var lore = 'Influye en tu manejo de armas a distancia, la posibilidad de esquivar y tu AC.';
	l += '<span title="'+lore+'"><b>Destreza</b>   '+player.dex+'</span>';
	if (player.statPoints > 0) l += '<increaser onclick="increase(\'dex\')">+</increaser>';
	l += '<br>';
	var lore = 'Mide tu resistencia a estados que reducen tus PI. Aumenta tus Puntos de Impacto.';
	l += '<span title="'+lore+'"><b>Resistencia</b>   '+player.end+'</span>';
	if (player.statPoints > 0) l += '<increaser onclick="increase(\'end\')">+</increaser>';
	l += '<br>';
	var lore = 'Aumenta los puntos de habilidad que consigues al subir de nivel.';
	l += '<span title="'+lore+'"><b>Inteligencia</b>   '+player.int+'</span>';
	if (player.statPoints > 0) l += '<increaser onclick="increase(\'int\')">+</increaser>';
	l += '<br>';
	var lore = 'Aumenta el daño causado con hechizos y reduce las posibilidades de caer bajo el control de otro.';
	l += '<span title="'+lore+'"><b>Sabiduría</b>   '+player.wis+'</span>';
	if (player.statPoints > 0) l += '<increaser onclick="increase(\'wis\')">+</increaser>';
	l += '<br>';
	var lore = 'Mide tu capacidad para mediar con la gente.';
	l += '<span title="'+lore+'"><b>Carisma</b>   '+player.cha+'</span>';
	if (player.statPoints > 0) l += '<increaser onclick="increase(\'cha\')">+</increaser>';
	l += '<br>';
	var lore = 'Influye en el orden de acciones durante un combate, la rapidez con las que se ejecutan, el sigilo y el manejo de armas pequeñas.';
	l += '<span title="'+lore+'"><b>Agilidad</b>   '+player.agi+'</span>';
	if (player.statPoints > 0) l += '<increaser onclick="increase(\'agi\')">+</increaser>';
	l += '<br>';
	var lore = 'Aumenta la posibilidad de que te ocurran cosas buenas.';
	l += '<span title="'+lore+'"><b>Suerte</b>   '+player.luk+'</span>';
	if (player.statPoints > 0) l += '<increaser onclick="increase(\'luk\')">+</increaser>';
	l += '<br>';
	if (player.statPoints > 0) l += '<increaser onclick="autoAssignStatPoints()">Auto-Asignar</increaser><br>';

	l += '<br>';

	var lore = 'Determinado por la fuerza, la destreza, y las armas equipadas.';
	l += '<span title="'+lore+'"><b>Ataque</b>   '+getCombatStat(player, 'atk')+'</span><br>';

	var lore = 'Determinado por la resistencia, la fuerza y las armaduras equipadas.';
	l += '<span title="'+lore+'"><b>Defensa</b>   '+getCombatStat(player, 'def')+'</span><br>';

	var lore = 'Determinado por la inteligencia, la sabiduría y los amuletos equipados.';
	l += '<span title="'+lore+'"><b>Magia</b>   '+getCombatStat(player, 'mag')+'</span><br>';

	var lore = 'Determinado por la agilidad, la destreza y las botas equipadas.';
	l += '<span title="'+lore+'"><b>Velocidad</b>   '+getCombatStat(player, 'spe')+'</span><br>';

	l += '<br>';

	l += '<b>Equipo</b><br>';
	l += '<sub>Arma</sub> '+displayItem(player.equip.weapon, 1)+'<br>';
	l += '<sub>Escudo</sub> '+displayItem(player.equip.shield, 1)+'<br>';
	l += '<sub>Cabeza</sub> '+displayItem(player.equip.head, 1)+'<br>';
	l += '<sub>Armadura</sub> '+displayItem(player.equip.armor, 1)+'<br>';
	l += '<sub>Botas</sub> '+displayItem(player.equip.boots, 1)+'<br>';
	l += '<sub>Amuleto</sub> '+displayItem(player.equip.amulet, 1)+'<br>';


	return l;
}
function getStatName(stat) {
	return {
		'level': 'Nivel', 'hp': 'Puntos de Impacto', 'str': 'Fuerza', 'dex': 'Destreza', 'end': 'Resistencia', 'int': 'Inteligencia', 'wis': 'Sabiduría',
		'cha': 'Carisma', 'luk': 'Suerte', 'hpx': 'PI', 'atk': 'Ataque', 'def': 'Defensa', 'spe': 'Velocidad', 'mag': 'Magia',
	}[stat];
}
function getCombatStat(player, stat) {
	var stats = {
		'atk': {
			'primary': 'str',
			'secondary': 'dex',
		},
		'def': {
			'primary': 'end',
			'secondary': 'str',
		},
		'mag': {
			'primary': 'int',
			'secondary': 'wis',
		},
		'spe': {
			'primary': 'agi',
			'secondary': 'dex',
		},
		'hpx': {
			'primary': 'end',
			'secondary': 'end',
		}
	}

	var st = stats[stat];
	var primary = (player.level / 10) * player[st.primary];
	var secondary = (player.level / 20) * player[st.secondary];

	var extra = 0;
	for (var e in player.equip) {
		if (player.equip[e][stat] > 0) extra += player.equip[e][stat];
	}
	if (stat == 'hpx') extra += 25;

	return Math.ceil(primary + secondary + 5 + extra);
}
function getMaxExp(level) {
	return Math.pow((level + 1), 3);
}
function Tower() {
	this.floors = [];
}
function mapHere(map, x, y) {
	return map[y][x];
}
function drawMap(map) {
	var l = '';
	for (var h in map) {
		for (var w in map[h]) {
			l += drawTile(map, w, h);
		}
	}
	for (var p in game.players) {
		l += drawPlayer(game.players[p], p);
	}
	return l;
}
function drawTile(map, x, y) {
	var here = mapHere(map, x, y);
	return '<tile id="tile_'+x+'_'+y+'" style="top: '+(32 * y)+'px; left: '+(32 * x)+'px" class="sprite '+here+'" onclick="action('+x+', '+y+')"></tile>';
}
function action(x, y) {
	if (turn) return;
	turn = 1;

	var ppos = getPlayerPosition();
	var direction = 'center';
	if (x < ppos.x) direction = 'left';
	if (x > ppos.x) direction = 'right';
	if (y < ppos.y) direction = 'top';
	if (y > ppos.y) direction = 'bottom';

	if (x < ppos.x && y < ppos.y) direction = 'topleft';
	if (x > ppos.x && y < ppos.y) direction = 'topright';
	if (x < ppos.x && y > ppos.y) direction = 'bottomleft';
	if (x > ppos.x && y > ppos.y) direction = 'bottomright';

	movePlayer(0, direction, getLimit(getCurrentMap()));
	tickMonsters();
}
function getCurrentMap() {
	if (game.tower.floors[game.floor] == undefined) game.tower.floors[game.floor] = randomMap(19, 11);
	return game.tower.floors[game.floor];
}
function getLimit(map) {
	return {
		'x': (map[0].length - 1),
		'y': (map.length - 1),
	}
}
function isAnyoneHere(x, y) {
	for (var p in game.players) {
		if (game.players[p].x == x && game.players[p].y == y) return p;
	}
}
function movePlayer(player, direction, limit) {
	playerID = player;
	player = game.players[playerID];
	var newPos = {
		'x': player.x,
		'y': player.y,
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

	if (direction == 'topleft') {
		newPos.y--;
		newPos.x--;
	}
	if (direction == 'bottomleft') {
		newPos.y++;
		newPos.x--;
	}
	if (direction == 'topright') {
		newPos.x++;
		newPos.y--;
	}
	if (direction == 'bottomright') {
		newPos.x++;
		newPos.y++;
	}
	var iah = isAnyoneHere(newPos.x, newPos.y);
	if (iah) {
		return;
	}


	//Status stuff
	if (player.poison) {
		var dmg = Math.ceil(getCombatStat(player, 'hpx') * 0.16);
		damage(player, dmg);
		onUnitNotification(playerID, '<poison>-'+dmg+' PI</poison>');
		player.poison--;
	}
	if (player.regen) {
		var dmg = Math.ceil(getCombatStat(player, 'hpx') * 0.15);
		damage(player, -dmg);
		onUnitNotification(playerID, '+'+dmg+' PI');
		player.regen--;
	}

	if (player.hidden) {
		player.hidden = false;
	}
	if (player.stun) {
		if (rand(1, 5) > 1) return;
		player.stun = false;
	}
	doc('player_'+playerID).style.opacity = 1;

	player.x = newPos.x;
	player.y = newPos.y;

	if (player.y < 0) player.y = 0;
	if (player.x < 0) player.x = 0;
	if (player.y > limit.y) player.y = limit.y;
	if (player.x > limit.x) player.x = limit.x;

	var newPlace = mapHere(getCurrentMap(), player.x, player.y);
	if (newPlace == 'sprite_money') {
		var maxMoney = (player.level + game.floor) * 10;
		var addm = rand(1, maxMoney);
		player.money += addm;
		onUnitNotification(playerID, '+$'+addm);
		changeTile(player.x, player.y, 'sprite_empty');
	}
	if (newPlace == 'sprite_warp') {
		game.floor++;
		newFloor(game.floor);
		updateTowerMap();
	}
	if (newPlace == 'sprite_hole' || newPlace == 'sprite_grasshole' || newPlace == 'sprite_spikehole') {
		player.stun = true;
		doc('player_'+playerID).style.opacity = 0.5;
	}
	if (newPlace == 'sprite_grasshole') changeTile(player.x, player.y, 'sprite_hole');

	if (newPlace == 'sprite_weeds') {
		player.hidden = true;
		doc('player_'+playerID).style.opacity = 0.2;
	}
	var trapdmg = 0;
	if (newPlace == 'sprite_nettle') trapdmg = 0.10;
	if (newPlace == 'sprite_spikehole') trapdmg = 0.2;
	if (newPlace == 'sprite_spikerock') trapdmg = 0.15;
	if (newPlace == 'sprite_trap') {
		trapdmg = 0.25;
		changeTile(player.x, player.y, 'sprite_empty');
	}

	if (trapdmg) {
		var dmg = Math.floor(getCombatStat(player, 'hpx') * trapdmg);
		damage(player, dmg);
		onUnitNotification(playerID, '-'+dmg+' PI');
		update();
	}

	//Status modifiers
	if (newPlace == 'sprite_poison') player.poison += rand(1,5);
	if (newPlace == 'sprite_hotsprings') player.regen += rand(1,5);

	if (newPlace == 'sprite_badberry') {
		changeTile(player.x, player.y, 'sprite_bush');
		statBonus(playerID, -1);
	}
	if (newPlace == 'sprite_rainbowgrape') {
		changeTile(player.x, player.y, 'sprite_bush');
		statBonus(playerID, 1);
	}

	//Healers
	var healamt = 0;
	if (newPlace == 'sprite_blueberry') {
		changeTile(player.x, player.y, 'sprite_bush');
		healamt = 21;
	}
	if (newPlace == 'sprite_purpleberry') {
		changeTile(player.x, player.y, 'sprite_bush');
		healamt = Math.ceil(getCombatStat(player, 'hpx') * 0.17);
	}
	if (newPlace == 'sprite_goldberry') {
		changeTile(player.x, player.y, 'sprite_bush');
		var amt = rand(1, (game.floor * 100));
		player.experience += amt;
		onUnitNotification(playerID, '+'+amt+' EXP');
		while (player.experience > getMaxExp(player.level)) levelUp(player);
	}
	if (healamt) {
		damage(player, -healamt);
		onUnitNotification(playerID, '+'+healamt+' PI');
	}

	update();
	updatePlayer(playerID);
}
function changeTile(x, y, newTile) {
	var map = getCurrentMap();
	map[y][x] = newTile;
	doc('tile_'+x+'_'+y).className = 'sprite '+newTile;
	update();
}
function updatePlayer(playerID) {
	var playerTile = 'player_'+playerID;
	var player = game.players[playerID];
	doc(playerTile).style.left = (player.x * 32)+'px';
	doc(playerTile).style.top = (player.y * 32)+'px';

	doc(playerTile).innerHTML = drawPlayerBar(player);
}
function hpBar(level, actual, max) {
	var percent = (actual / max) * 32;
	var depl = 32 - percent;
	return '<fill style="width: '+percent+'px"></fill>'+'<depleted style="width: '+depl+'px"></depleted>';
}
function drawPlayerBar(player) {
	return '<levelbar>'+player.level+'</levelebar><lifebar>'+hpBar(player.level, player.hp, getCombatStat(player, 'hpx'))+'</lifebar>';
}
function drawPlayer(player, id) {
	var isMonster = (player.monster) ? 'scout_side' : '';
	return '<player id="player_'+id+'" style="top: '+(32 * player.y)+'px; left: '+(32 * player.x)+'px" onclick="playerAction(0, '+id+')" class="sprite '+player.race+' '+isMonster+'">'+drawPlayerBar(player)+'</player>';
}
function onUnitNotification(unit, text, coordinate) {
	var textlength = text.length;

	var tile = '#player_'+unit;
	if (coordinate) {
		var tilew = team;
		var tileh = unit;
		tile = 'tile_'+coordinate.x+'_'+coordinate.y;
	}
	var tof = $(tile).offset();

	var not = document.createElement('span');
	not.className = 'unitNotification';
	not.style.top = (tof.top - 32)+'px';
	not.style.left = (tof.left)+'px';
	not.innerHTML = text;
	document.body.appendChild(not);
	$(not).fadeIn(150);
	$(not).animate({top: '-=32'}, textlength*150).fadeOut(textlength*150);
}
function isUnitWithinRange(from, to, range) {
	var distX = Math.abs(from.x - to.x);
	var distY = Math.abs(from.y - to.y);
	var dist = Math.abs(distX + distY);
	if (dist <= range) return true;
}
function playerAction(fromID, toID, peek) {
	if (fromID == 0) {
		if (turn) return;
		turn = 1;
		tickMonsters();
	}
	if (fromID != toID) {
		var from = game.players[fromID];
		var to = game.players[toID];

		if (!isUnitWithinRange(from, to, 1)) return;
		if (peek) return isUnitWithinRange(from, to, 1);

		if (from.alignment != to.alignment) {
			//Different alignment, combat occurs
			var d = damageFormula(from, to);
			damage(to, d);
			onUnitNotification(toID, '-'+d+' PI');

			if (to.hp <= 0) {
				winExpGain(from, to, fromID);
				while (from.experience >= getMaxExp(from.level)) levelUp(from);

				if (to.monster) {
					game.players.splice(toID, 1);
					updateTowerMap();
				}
				if (toID == 0) {
					goTo('death');
					game.players[0].x = 0;
					game.players[0].y = 0;
				}
			}

			updatePlayer(fromID);
			updatePlayer(toID);
			update();
		}
	}
}
function levelUp(from, times) {
	var bef = getCombatStat(from, 'hpx');
	from.experience -= getMaxExp(from.level);
	if (times == undefined) times = 1;
	//Level increases by one
	from.level += times;

	//Hit Points increase determined by endurance
	from.hpx = getCombatStat(from, 'hpx');
	var diff = Math.abs(from.hpx - bef);
	from.hp += diff;

	//Statpoints / Skill points increase, determined by endurance
	var tostat = Math.ceil(from.int / 10) + 3;
	from.statPoints += (tostat * times);
	var toskill = Math.ceil(from.int / 20) + 1;
	from.skillPoints += (toskill * times);

	update();
}
function winExpGain(from, to, fromID) {
	var max = Math.floor(getMaxExp(to.level) / 10);
	var leveldiff = Math.abs(from.level - to.level);
	var g = max;
	if (from.level > to.level) {
		g *= 0.5;
	}
	if (from.level < to.level) {
		g *= 1.5;
	}
	g = Math.floor(g);

	from.experience += g;
	from.money += (Math.floor(g / 10) + to.level);

	onUnitNotification(fromID, '+'+g+' EXP');
}
function damage(player, ammount) {
	player.hp -= ammount;
	if (player.hp <= 0) player.hp = 0;
	if (player.hp > getCombatStat(player, 'hpx')) player.hp = getCombatStat(player, 'hpx');
}
function damageFormula(from, to, magic, pierce) {
	var atk = getCombatStat(from, 'atk');
	var def = getCombatStat(to, 'def');
	if (pierce) def = 0;
	//Damage percentage
	var d = (100 / (100 + def)) * 100;
	var dr = 100 - d;
	var doubleA = atk / 100;

	var dmg = Math.floor(doubleA * (100 - dr));

	if (dmg < 1) dmg = 1;
	return dmg;
}
function spawnMonsters() {
	var maxLevel = ((game.players[0].level + 1) * (game.floor + 1)) + 1;
	while (maxLevel > 0) {
		var rl = rand(game.players[0].level - 5, Math.ceil(game.players[0].level * 1.2));
		if (rl < 1) rl = 1;
		maxLevel -= rl;
		var mon = monster(rl);
		game.players.push(mon);
	}
}
function updateTowerMap() {
	towerMap.innerHTML = drawMap(game.tower.floors[game.floor]);
}
function newFloor(num) {
	game.portal = false;
	if (game.tower == undefined) game.tower = new Tower();
	if (game.tower.floors == undefined) game.tower.floors = [];
	if (game.tower.floors[game.floor] == undefined) game.tower.floors[game.floor] = randomMap(19, 11);
	spawnMonsters();
	playing = true;

	game.players[0].x = 0;
	game.players[0].y = 0;

	updateTowerMap();
}
function goTo(where) {
	update();
	if (where == 'tower') {
		if (!initialized) {
			initialized = true;
		}
		slideTrick('#town', '#tower');
		game.players.splice(1, game.players.length);

		newFloor(game.floor);
	}
	if (where == 'town') slideTrick('#importer', '#town');
	if (where == 'death') {
		slideTrick('#tower', '#town');
		generateShop();
		game.players[0].x = 0;
		game.players[0].y = 0;
		playing = false;
	}
	if (where == 'explore') {
		notif(randomTowerEvent());
	}
	if (where == 'battle') {
		slideTrick('#tower', '#battle');
	}
	if (where == 'importer') {
		slideTrick('#town', '#importer');
	}
	if (where == 'nextFloor') {
		game.floor++;
		game.steps = 0;
		slideTrick('#towerButtonGoUp', '#towerButtonExplore');
	}
	if (where == 'flee') {
		slideTrick('#battle', '#tower');
	}
	update('floor');
	tickMonsters();
}
function getAllTiles() {
	return [
		'sprite_empty', 'sprite_grass', 'sprite_flower', 'sprite_rock', 'sprite_dirt', 'sprite_hole',
		'sprite_weeds', 'sprite_nettle', 'sprite_grasshole', 'sprite_trap', 'sprite_poison',
		'sprite_spikehole', 'sprite_spikerock', 'sprite_badberry', 'sprite_hotsprings',
		'sprite_frost', 'sprite_puddle', 'sprite_ice', 'sprite_mud', 'sprite_blueberry',
		'sprite_purpleberry', 'sprite_bush', 'sprite_goldberry', 'sprite_rainbowgrape',
		'sprite_shroom',
		'sprite_wall',
		'sprite_wall_broken',
		'sprite_tower',
		'sprite_tower_broken',
		'sprite_barbedWire',
		'sprite_barbedWire_broken',
		'sprite_cannon',
		'sprite_cannon_broken',
		'sprite_money',
	];
}
function importData() {
	var str = 'Si mi señora Lilim, me he portado bien y no he hackeado nada.';
	var answer = prompt('¿De verdad quieres importar estos datos? Mira que como hayas editado alguna parte, podrías corromper tu partida para siempre. Si estás de acuerdo di: "'+str+'" (sin las comillas). De lo contrario pulsa CANCELAR.');
	mess.innerHTML = 'La importación de datos ha sido cancelada :^) Gallina.';
	if (answer) mess.innerHTML = 'Tus datos han sido importados (aunque no copiaste mi mensaje, que te crees, ¿que soy tonta?)';
	if (answer == str) mess.innerHTML = 'No era necesario escribir la frase entera, pero veo que eres leal. Tus datos han sido importados.';

	game = JSON.parse(importexport.value);
	importexport.value = '';
	saveGame();
	
	update();
}
function exportData() {
	importexport.value = JSON.stringify(game);
	mess.innerHTML = '¡Buen chico! *Le da una galleta* Ahora abre otra ventana con el juego en otro navegador (o una ventana de incógnito), pega lo que acabas de copiar y pulsa "Importar Datos".';
}
function randomMap(width, height) {
	var tiles = [];
	for (var h = 0; h < height; h++) {
		tiles[h] = [];
		for (var w = 0; w < width; w++) {
			var toAdd = read(getAllTiles());
			if (rand(0,1)) toAdd = getAllTiles()[0];
			tiles[h][w] = toAdd;
		}
	}
	return tiles;
}
function randomTowerEvent() {
	if (rand(1,10) == 1) {
		goTo('battle');
		return '¡Ha aparecido un monstruo!';
	}
	if (rand(1,10) == 1) {
		return 'Encuentras un objeto. Pero está roto lol.';
	}
	if (rand(1,10) == 1 || game.steps >= 20) {
		slideTrick('#towerButtonExplore', '#towerButtonGoUp');
		return 'Aquí hay unas escaleras que parecen llevar a la siguiente planta.';
	}
	game.steps++;
	if (game.steps == 1) return 'Es una torre muy bonita.';
	if (game.steps == 2) return 'Avanzas por la torre, pero no ves nada.';
	if (game.steps == 3) return 'Avanzas por la torre, pero no parece haber nada interesante.';
	if (game.steps == 4) return 'Sigues avanzando, pero sigue sin haber cosas chachis.';
	if (game.steps == 5) return 'Te preguntas si estás andando en círculos.';
	if (game.steps == 6) return 'Te preguntas qué estás haciendo con tu vida.';
	if (game.steps == 7) return 'Empiezas a hartarte de andar.';
	if (game.steps == 8) return 'Ya estás harto de andar.';
	if (game.steps == 9) return 'Piensas que sólo quedan 99 pisos más y se te pasa.';
	if (game.steps == 10) return 'Barajas el suicidio.';
	if (game.steps == 11) return 'Ojalá hubiese algo en el suelo de la torre para poder llevarlo a cabo.';
	if (game.steps == 12) return '...Pero no lo hay.';
	if (game.steps == 13) return 'Y eso te deprime.';
	if (game.steps == 14) return 'No sabes si llorar o reír.';
	if (game.steps == 15) return 'Te ríes para atraer la atención de los monstruos.';
	if (game.steps == 16) return 'En vano.';
	if (game.steps == 17) return 'Le intetnas encontrar la gracia a esta broma pesada.';
	if (game.steps == 18) return 'Piensas qué enemigos podías tener que te hiciesen esto.';
	if (game.steps == 19) return 'Pero parece que por fin ves la luz.';
	if (game.steps == 20) return 'Eso son... ¿Unas escaleras?';
}
function tickMonsters() {
	if (!playing) return;
	if (!turn) return;

	if (game.players.length <= 1 && !game.portal) {
		var m = getCurrentMap();
		var l = getLimit(getCurrentMap());
		m[rand(0, l.y)][rand(0, l.x)] = 'sprite_warp';
		updateTowerMap();
		game.portal = true;
	}

	if (game.players.length <= 1) {
		turn = 0;
		return;
	}

	for (var mm in game.players) {
		if (mm == 0) continue;
		var last = game.players.length - 1;
		doTickMonster(mm, last);
	}
}
function doTickMonster(num, last) {
	setTimeout(function() {
		tickMonster(num);
		if (num == last) turn = 0;
	}, (num * 250));
}
function tickMonster(num) {
	var rm = num;

	var target = game.players[0];
	target = {
		'x': target.x,
		'y': target.y,
	}

	target.x += rand(-1, 1);
	target.y += rand(-1, 1);
	checkLimits(target);

	if (game.players[num] == undefined) return;
	var dir = gps2(game.players[rm], game.players[0]).dir;

	var withinrange = playerAction(rm, 0, 1);
	if (withinrange) {
		playerAction(rm, 0);
	}
	else {
		movePlayer(rm, dir, getLimit(getCurrentMap()));
	}
	

	var rms = game.players[rm];
	if (rms.statPoints) autoAssignStatPoints(rms);
}
function checkLimits(object) {
	var lim = getLimit(getCurrentMap());
	if (object.x < 0) object.x = 0;
	if (object.y < 0) object.y = 0;
	if (object.x > lim.x) object.x = lim.x;
	if (object.y > lim.y) object.y = lim.y;
}
function gps(from, to) {
	var dir = 'center';
	if (!from || !to) return 'top';
	if (from.x > to.x) dir = 'left';
	if (from.x < to.x) dir = 'right';
	if (from.y < to.y) dir = 'bottom';
	if (from.y > to.y) dir = 'top';

	if (from.x > to.x && from.y < to.y) dir = 'bottomleft';
	if (from.x < to.x && from.y < to.y) dir = 'bottomright';
	if (from.x > to.x && from.y > to.y) dir = 'topleft';
	if (from.x < to.x && from.y > to.y) dir = 'topright';

	return dir;
}
function gps2(from, to) {
	var dirs = {
		'top': {'x': from.x, 'y': from.y-1},
		'left': {'x': from.x-1, 'y': from.y},
		'right': {'x': from.x+1, 'y': from.y},
		'bottom': {'x': from.x, 'y': from.y+1},

		'bottomleft': {'x': from.x-1, 'y': from.y+1},
		'bottomright': {'x': from.x+1, 'y': from.y+1},
		'topleft': {'x': from.x-1, 'y': from.y-1},
		'topright': {'x': from.x+1, 'y': from.y-1},
	}

	var lowest = {'dir': 'center', 'dist': Infinity};
	for (var d in dirs) {
		var dir = dirs[d];
		var dist = distance(dir, to);
		if (dist < lowest.dist) lowest = {
			'dir': d,
			'dist': dist,
		}
	}

	return lowest;
}
function distance(from, to) {
	var absx = Math.abs(from.x - to.x);
	var absy = Math.abs(from.y - to.y);
	var abs = absx + absy;
	var iah = isAnyoneHere(from.x, from.y);
	if (iah != undefined) abs += 10;

	return abs;
}
function slideTrick(p1, p2) {
	$(p1).slideUp(500);
	$(p2).slideDown(500);
}

var game = {};
var charSelection = {};
var gamelog = 'J-Ner tonto :^)';
charSelection.accept = function() {
	game.tutorial = 1;
	var sex = $("input[type='radio'][name='gender']:checked").val();
	game.players[0] = new player(formName.value, formAge.value, formHeight.value, formWeight.value, $("#formJob").val(), 'good', sex, $('#formRace').val());
	game.players[0].money = 100;
	tutorial();
}

loadGame();
resetVariables();
toLog('');
tutorial();
update();
generateShop();
var t = setInterval(saveGame, 60000);

document.title = 'Still Unnamed '+changes().latestVersion;