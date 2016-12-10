var posX = 320;
var posY = 448;
var lastX = 0;
var cursorX = 320;
var fireballs = [];
var ships = [];
var expl = [];
var stars = [];
var ePosX = 320;
var chargeLevel = 0;
var HP = 100;
var charging = false;
var points = 0;
var shield = 100;
var shotNumber = 1;
var difficulty = 1;
var shots = 0;
var lock = 9;
var addedDiff = 0;
var exp = 0;
var pause = false;
var mode = '';
var bgPos = 0;
var kills = 0;
var evolution = {

}

var changelog = [
'-- Added a new background',
];

//Upgrades
var upgrade = {
	'hp': 0,
	'shield': 0,
	'speed': 0,
	'damage': 0,
	'points': 0,
	'charge': 0,
	'bomb': 0,
	'shots': 0,
	'shotSpeed': 0,
	'shotSize': 0,
};

function resetStats() {
	HP = 100;
	shield = 100;
	HP += upgrade.hp;
	shield += upgrade.shield;
}
resetStats();

function moveStuff() {
	starfield();

	if (pause) {
		echo('energy', 'GAME PAUSED. HIT \'P\' TO RESUME');
		doc('pause').style.display = 'inline';
	}
	if (!pause) doc('pause').style.display = 'none';

	if (HP <= 0 && doc('gameover').style.display != 'inline') {

		shopList();
		sship.style.opacity = 0;
		var gover = setTimeout(function() {
			for (fb in fireballs) kill(fb);
			for (fb in ships) kill(fb, 'sp');
			doc('gameover').style.display = 'inline';
		},3000);
	}
	if (HP <= 0 || pause) return;
	if (HP > 0) {
		//Move spaceship
		sship.style.opacity = 1;
		var realPosX = posX + 16;
		var diff = Math.abs(realPosX - cursorX);
		diff = Math.floor(diff/30)+1;
		diff += upgrade.speed;
		if (realPosX != cursorX) {
			posX = (realPosX < cursorX) ? posX + diff : posX - diff;
		}
		if (posX < 0) posX = 0;
		if (posX > 640) posX = 640;
		sship.style.left = posX+'px';
		lastX = cursorX;

		if (!posY) posY = 440;
		var realPosY = posY + 16;
		var diff = Math.abs(realPosY - cursorY);
		diff = Math.floor(diff/30)+1;
		diff += upgrade.speed;
		if (realPosY != cursorY) {
			posY = (realPosY < cursorY) ? parseInt(posY) + parseInt(diff) : parseInt(posY) - parseInt(diff);
		}
		if (posY < 0) posY = 0;
		if (posY > 480) posY = 480;
		sship.style.top = posY+'px';
		lastY = cursorY;
	}

	var me = {
		'xx': posX,
		'yy': posY,
		'weight': 32,
	}

	//Move fireballs
	for (x in fireballs) {
		var fb = fireballs[x];
		var el = fb.element;

		fb.age = (!fb.age) ? 1 : fb.age++;
		//fb.motionY += 0.005;
		fb.xx += fb.motionX*3;
		fb.yy += fb.motionY*3;
		var mot = fb.age / 10;
		
		el.style.top = fb.yy+'px';
		el.style.left = fb.xx+'px';

		if (fb.xx >= 740 || fb.xx <= -100) kill(x, 'fb');
		if (fb.yy >= 580 || fb.yy <= -100) kill(x, 'fb');

		var ali = el.className;
		if (ali == 'enemyBullet' && HP <= 0) continue;
		if (ali == 'powerup' && collision(fb, me)) {
			var targ = fb.id;
			shop(targ, 0, 1);
			kill(x);
		}
		if (ali == 'enemyBullet' && collision(fb, me)) {
			doc('container').style.backgroundColor = '#101';
			if (shield > 0) {
				shield -= Math.floor(fb.weight*2);
				if (shield <= 0) shield = 0;
				playSound('sound/shield.wav');
			}
			else {
				HP -= Math.floor(fb.weight);
				playSound('sound/shot1.wav');
			}
			var ccc = setTimeout(function() {
				doc('container').style.backgroundColor = '#001';
			}, 500);

			me.weight = 16;
			if (HP <= 0) explode(me.xx, me.yy);
			kill(x);
		}
		if (mode == 'firework' && ali == 'superChargedAllyBullet' && fb.yy <= 8) {
			bomb(fb, 5, 'dark', 1);
			kill(x);
		}
		if (ali == 'allyBullet' || ali == 'chargedAllyBullet' || ali == 'superChargedAllyBullet' || ali == 'nightmareAllyBullet') {
			for (c in ships) {
				ships[c].lifespan += 1;
				if (collision(ships[c], fb)) {
					var dmg = (ali == 'allyBullet') ? 10*Math.random() : fb.weight;
					dmg += upgrade.damage;
					ships[c].hp -= dmg;
					if (ships[c].hp <= 0) {
						//Ship killed
						kills += 1;
						playSound('sound/explode2.wav');
						var bonus = ships[c].hpx;
						kill(c, 'sp');
						dmg += (bonus + upgrade.points + difficulty)/3;
						points += Math.ceil(dmg);
						exp += Math.floor(dmg/10);

					}
					if (ali == 'superChargedAllyBullet' && fb.weight > 4) {
						var fireworks = (mode == 'firework');
						if (!fireworks) bomb(fb, 5);
						if (fireworks) bomb(fb, 5, 'dark', fireworks);
					}
					if (ali == 'chargedAllyBullet' || ali == 'nightmareAllyBullet' || ali == 'superChargedAllyBullet') {
						fb.motionX *= 1.1;
						fb.motionY *= 1.1;
					}
					else {
						kill(x);
					}
				}
			}
			for (c in fireballs) {
				if (fireballs[c].element.className != 'enemyBullet') continue;
				if (collision(fireballs[c], fb)) {
					var cc = (difficulty > 2) ? difficulty/2 : 1;
					if (rand(1,cc) == 1 && fb.weight >= fireballs[c].weight) kill(c);
				}
			}
		}

	}

	for (s in ships) {
		var sp = ships[s];
		var el = sp.element;

		var me = {
			'xx': posX,
			'yy': posY,
			'weight': 32,
		}
		if (sp.gps == true) {
			gps(sp, me);
		}

		sp.xx += (3*sp.motionL)/sp.heavy/5;
		sp.xx -= (3*sp.motionR)/sp.heavy/5;

		if (collision(sp, me) && sp.bomb == 1) kill(s, 'sp');

		if (sp.xx <= 0) sp.xx = 0;
		if (sp.xx >= 640) sp.xx = 640;

		sp.motionY += 0.012;
		var motionY = sp.motionY;
		var movez = motionY/sp.heavy
		if (sp.yy >= 192 && movez > 0) sp.motionY -= 0.0055;
		if (sp.yy >= 288 && movez > 0) sp.motionY -= 0.012;
		if (sp.yy >= 384) sp.motionY += 0.025;
		if (sp.fixed) {
			if (sp.yy > 240) movez *= -1.4;
			if (sp.yy < 240) movez *= 1.4;

			if (sp.xx > 320) {
				sp.motionR *= 1+(Math.random()*0.01);
				sp.motionL *= 1-(Math.random()*0.01);
			}
			if (sp.xx < 320) {
				sp.motionR *= 1-(Math.random()*0.01);
				sp.motionL *= 1+(Math.random()*0.01);
			}
		}
		el.innerHTML = '<mark>'+sp.generation.toString(36)+' '+sp.hp+'</mark>'+realDrawBar(Math.round(sp.hp),Math.round(sp.hpx));
		sp.yy += movez;


		el.style.top = sp.yy+'px';
		el.style.left = sp.xx+'px';

		var rmax = 100+(100/difficulty);
		if (rand(1,rmax) == 1) shoot('enemy', sp);

		//No wall collision
		if (sp.xx >= 512) sp.motionR += 0.1;
		if (sp.xx <= 128) sp.motionL += 0.1;
		if (sp.xx >= 640 || sp.xx <= 0) kill(s, 'sp', 1);
		if (sp.yy >= 480 || sp.yy <= 0) kill(s, 'sp', 1);
	}
	var rmax = 35+(58/difficulty);
	if (rand(1,rmax) == 1) autoSpawn();

	charge();
	if (chargeLevel < 10) {
		beam = realDrawBar(Math.floor(chargeLevel), 10)+' SHOT'
	}
	if (chargeLevel >= 10 && chargeLevel < 30) {
		beam = realDrawBar(Math.floor(chargeLevel)-10, 20)+' MISSILE'
	}
	if (chargeLevel >= 30) {
		beam = realDrawBar(Math.floor(chargeLevel)-30, 20)+' BURST'
	}
	if (chargeLevel >= 50) {
		beam = Math.ceil(chargeLevel/100)+'% NUKE'
	}
	if (shield > 0) ene = 'SHIELD';
	if (shield <= 0) ene = 'ENERGY';
	left = (shield > 0) ? shield+'/'+(100 + parseInt(upgrade.shield)) : HP+'/'+(100 + parseInt(upgrade.hp));

	echo('energy', left+realDrawBar(HP,100+upgrade.hp)+realDrawBar(shield,100+upgrade.shield)+' '+ene+' | '+beam+' | '+points+' POINTS<br><br>ENEMY RANK '+difficulty.toString(36).toUpperCase());
}
function gps(from, to) {
	var value = 0.01;
	if (from.xx > to.xx) from.motionR += (value*Math.random())/from.heavy;
	if (from.xx < to.xx) from.motionL += (value*Math.random())/from.heavy;
	if (from.xx > to.xx-16 && from.xx < to.xx+16) {
		if (from.bomb && !from.kamikaze) {
			from.kamikaze = 1;
		}
	}
	else {
		if (from.kamikaze > 0) {
			from.kamikaze--;
			from.motionY *= 0.9;
		}
	}
	if (from.kamikaze) {
		from.motionY += from.kamikaze/50;
		from.motionY *= 1.042;
		from.kamikaze++;
	}
}
function charge() {
	var ch = 0.12;
	ch += upgrade.charge*5;
	if (charging) chargeLevel += ch;

	if (lock == 0 && chargeLevel >= 10) chargeLevel = 9.9;
	if (lock == 1 && chargeLevel >= 30) chargeLevel = 29.9;
	if (lock == 2 && chargeLevel >= 50) chargeLevel = 49.9;
	var cL = Math.round(chargeLevel*10)/10 % 5;

	if (charging && cL == 0) playSound('sound/load.wav');
}
function laser(from) {
	for (var i = 0; i < 100; i++) {
		fireballs[fireballs.length] = new fireball('dark', from, 'laser');
	}
}
function bomb(fromy, strength, variation, fwork) {
	var strength = 3;
	strength = (variation == 'dark' || variation == 'harmless') ? rand(6,13) : 3;
	if (fromy.type == 'bomb2') strength += rand(1,8);
	if (fromy.type == 'bomb3') strength += rand(2,16);
	if (fromy.type == 'test') strength += 500;
	if (!variation) {
		var add = upgrade.bomb/5;
		strength += rand(0,add);
		var strength = rand(3,strength);
		strength++;
	}
	if (fwork) strength += rand(4,8) + upgrade.bomb;
	for (i = 0; i < strength; i++) {
		if (fromy.weight == 1 && !fromy.dark) break;
		var vare = (variation == 'dark' || fromy.dark) ? 'dark' : 'bomb';
		if (variation == 'harmless' || fwork) vare = 'harmless';
		fireballs[fireballs.length] = new fireball(vare, fromy, fromy.strength, fwork);
	}
}
function shoot(type, from) {
	if (pause) return;
	if (type == 'enemy') {
		if (from.type == 'bomb' || from.bomb == 1 || from.peace) return;
		var maxShots = 1;
		var stren = from.strength;
		if (from.type == 'croissant') maxShots += 1;
		for (var sss = 0; sss < maxShots; sss++) {
			fireballs[fireballs.length] = new fireball('enemy', from, stren);
		}
		if ((from.type == 'boss' && rand(1,10) == 1) || from.type == 'laser') laser(from);
		if ((from.type == 'boss' && rand(1,10) == 1) || from.type == 'explo') {
			for (var cus = 0; cus < 100; cus++) fireballs[fireballs.length] = new fireball('customEnemy', from, stren);
		}
	}
	else {
		playSound('sound/shot2.wav');
		var oCL = chargeLevel;
		if (chargeLevel >= 30) {
			if (chargeLevel >= 50) {
				explode(posX-32, posY-32, 32);
				var mm = {
					'xx': posX,
					'yy': posY,
					'weight': 32,
				}
				var maxxx = 8;
				maxxx += upgrade.bomb*3;
				for (var xxxx = 0; xxxx < maxxx; xxxx++) {
					fireballs[fireballs.length] = new fireball('nightmare');
				}
			}
			else {
				fireballs[fireballs.length] = new fireball();
			}
		}
		else {
			shotNumber = 1 + upgrade.shots;
			for (ie = 0; ie < shotNumber; ie++) fireballs[fireballs.length] = new fireball();
		}
		chargeLevel = 0;
		charging = false;
	}
}
function explosionPhase(source, phase) {
	for (ep in expl) {
		var eee = expl[ep];
		var elz = eee.element;
		eee.span -= 10;
		if (eee.span <= 99) {
			elz.style.opacity = 0.5;
			elz.style.boxShadow = '0 0 10px #fc8';
		}
		if (eee.span <= 50) {
			elz.style.opacity = 0.1;
			elz.style.boxShadow = '0 0 100px #fff';
		}
		if (eee.span <= 25) {
			elz.style.opacity = 0;
		}
		if (eee.span <= 0) {
			doc('container').removeChild(elz);
			expl.splice(ep, 1);
		}
	}
}
function kill(id, arr, silent) {
	if (arr == 'star') {
		doc('container').removeChild(stars[id].element);
		stars.splice(id, 1);
		return;
	}
	if (arr == 'sp') {
		if (!evolution[ships[id].type] || ships[id].lifespan > evolution[ships[id].type].lifespan) {
			//Ship evolves
			var tip = ships[id].type;
			if (rand(1,difficulty) == 1) addedDiff += 1;
			evolution[tip] = {
				'customValueV': ships[id].customValueV,
				'customValueW': ships[id].customValueW,
				'customValueX': ships[id].customValueX,
				'hpx': ships[id].hpx,
				'motionL': ships[id].motionL,
				'motionR': ships[id].motionR,
				'motionY': ships[id].motionY,
				'lifespan': ships[id].lifespan,
				'strength': ships[id].strength,
				'generation': ships[id].generation,
			}
		}

		if (!silent) {
			var hx = ships[id].xx;
			var hy = ships[id].yy;
			var ht = ships[id].fixed;
			var powerUpChances = Math.ceil(10 / ships[id].pchance);
			if (rand(1,powerUpChances) == 1) powerUp(ships[id]);
			if (ships[id].bomb == 1) bomb(ships[id], 3, 'dark');
			bomb(ships[id], 3, 'harmless');
			var nu = expl.length;
			explode(ships[id].xx, ships[id].yy);
			if (ht) {
				var xxx = setTimeout(function() { explode(hx, hy, 16) },500);
				var yyy = setTimeout(function() { explode(hx, hy, 24) },1000);
				var zzz = setTimeout(function() { explode(hx, hy, 32) },2000);
			}
			//expl[nu] = new explosion(ships[id].xx, ships[id].yy);
		}

		doc('container').removeChild(ships[id].element);
		ships.splice(id, 1);
		return;
	}
	if (!fireballs[id]) return;

	if (fireballs[id].element) doc('container').removeChild(fireballs[id].element);
	fireballs.splice(id, 1);
}
function randie() {
	return Math.random()*red(-1,1);
}
function spawn(type) {
	ships[ships.length] = new ship(type);
}
function autoSpawn() {
	//Backup enemy
	if (ships.length < 2) spawn('enemy');

	if (rand(1,2) == 1 && difficulty < 12) spawn('bomb');
	if (rand(1,4) == 1 && difficulty > 1) spawn('enemy');
	if (rand(1,8) == 1 && difficulty > 2) spawn('croissant');
	if (rand(1,16) == 1 && difficulty > 3) spawn('bomber');
	if (rand(1,13) == 1 && difficulty > 5 && difficulty < 12) spawn('sat');
	//Tier 8
	if (rand(1,20) == 1 && difficulty > 12 && difficulty < 140) spawn('sat2');
	if (rand(1,128) == 1 && difficulty > 18) spawn('boss');
	if (rand(1,9) == 1 && difficulty > 27 && difficulty < 62) spawn('bomb2');
	//Tier 41
	if (rand(1,41) == 1 && difficulty > 62) spawn('bomb3');
	//Tier 93
	if (rand(1,30) == 1 && difficulty > 140) spawn('sat3');
	
}
function ship(type, whereX, whereY) {
	if (!type) type = read([
		'enemy',
		'croissant',
		'bomb',
		'bomber',
		'sat',

		'sat2',
		'boss',
		'bomb2',

		'bomb3',

		'sat3',
	]);
	var arrayHP = {
		'enemy': 4,
		'croissant': 8,
		'bomb': 2,
		'bomber': 16,
		'sat': 13,

		'sat2': 20,
		'boss': 128,
		'bomb2': 9,

		'bomb3': 41,

		'sat3': 30,


		//Testing stuff
		'test': 0,
	}
	var baseHP = arrayHP[type];
	this.lifespan = 0;
	this.type = type;

	//Evolving stats
	this.customValueX = 128*Math.random()+128;
	this.customValueV = 128*Math.random()+128;
	this.customValueW = 128*Math.random()+128;
	this.hpx = baseHP * (kills/10 + (difficulty*Math.random()));
	this.motionL = Math.random()*0.8;
	this.motionR = Math.random()*0.8;
	this.motionY = Math.random()*0.8;
	this.strength = 4 + (difficulty*Math.random());
	this.generation = 1;

	//Mutate
	var ev = evolution[this.type];
	if (ev) {
		this.customValueX = (this.customValueX + ev.customValueX) / 2;
		this.customValueV = (this.customValueV + ev.customValueV) / 2;
		this.customValueW = (this.customValueW + ev.customValueW) / 2;
		this.hpx = (this.hpx + ev.hpx) / 2;
		this.motionL = (this.motionL + ev.motionL) / 2;
		this.motionR = (this.motionR + ev.motionR) / 2;
		this.motionY = (this.motionY + ev.motionY) / 2;
		this.strength = (this.strength + ev.strength) / 2;
		this.generation = ev.generation + 1;
	}

	this.hp = this.hpx;

	this.weight = 32;
	if (type == 'bomber' || type == 'boss') this.weight = 64;
	this.xx = rand(0,640);
	this.yy = 0;
	if (type == 'test') {
		this.xx = 320;
		this.yy = 240;
	}


	this.heavy = 1;
	if (type == 'bomb2') this.strength += 3;
	if (type == 'bomb3') this.strength += 6;
	if (type == 'bomber') {
		this.motionL /= 3;
		this.motionR /= 3;
		this.strength = 16;
		this.heavy = 3;
	}
	//Peaceful mode: Ship doesn't attack
	this.peace = false;

	//Powerup chance
	this.pchance = 1;
	if (type == 'sat' || type == 'sat2' || type == 'sat3') {
		this.peace = true;
		if (type == 'sat') this.pchance = 2;
		if (type == 'sat2') this.pchance = 3;
		if (type == 'sat3') this.pchance = 4;

		this.motionL /= 4;
		this.motionR /= 4;
		this.heavy = 4;
	}

	if (type == 'boss') {
		this.strength = 8;
		this.heavy = 1.5;
		this.fixed = 1;
	}

	this.bomb = (type == 'bomb' || type == 'bomb2' || type == 'bomb3' || type == 'test') ? 1 : 0;
	if (rand(1,10) == 1) this.gps = true;
	if (type == 'bomb' || type == 'bomb2' || type == 'bomb3') this.gps = true;

	this.element = document.createElement('div');
	this.element.className = 'enemyShip';
	this.element.style.backgroundImage = 'url("img/'+type+'.png")';
	this.element.style.top = this.yy+'px';
	this.element.style.left = this.xx+'px';
	if (type == 'bomber' || type == 'boss') {
		this.element.style.width = '64px';
		this.element.style.height = '64px';
	}

	doc('container').appendChild(this.element);
}
function explosion(whereX, whereY, force) {
	this.span = 100;
	this.xx = whereX;
	this.yy = whereY;
	this.element = document.createElement('div');
	this.element.className = 'explosion';
	this.element.style.top = this.yy+'px';
	this.element.style.left = this.xx+'px';
	var f = 24;
	if (force) f += force;
	if (!force) var f = rand(12,32);
	this.element.style.width = f+'px';
	this.element.style.height = f+'px';

	doc('container').appendChild(this.element);
}
function explode(whereX, whereY, force) {
	var exmax = rand(3,6);
	for (exx = 0; exx < exmax; exx++) {
		expl[expl.length] = new explosion(whereX+rand(-32,32), whereY+rand(-32,32), force);
	}
}
function spiro(cv, cw, cx) {
	HP = (HP + 50) * 1.5;
	shield = (shield + 50) * 1.5;
	var ll = ships.length;
	spawn('test', 320, 240);
	sh = ships[ll];
	sh.customValueV = cv;
	sh.customValueW = cw;
	sh.customValueX = cx;
	kill(ll, 'sp');
}
function fireball(type, from, strength, fworkMode) {
	if (type == 'customEnemy') {
		type = 'enemy';
		var custom = 1;
	}
	if (type != 'enemy') shots += 1;
	var chargeVariation = (chargeLevel/5)+1;

	this.weight = 4;
	this.xx = posX+16;
	this.yy = posY+16;
	this.motionX = Math.random()*rand(-0.15,0.15);

	this.motionY = -4;

	this.customValueV = Math.random()*100;
	this.customValueW = Math.random()*100;
	this.customValueX = Math.random()*100;

	this.element = document.createElement('div');

	this.element.className = 'allyBullet';
	if (chargeLevel > 10 && !from) {
		this.motionY = -8;
		this.element.className = 'chargedAllyBullet';
		this.weight = 16;
	}
	if (chargeLevel >= 30 && !from) {
		this.element.className = 'superChargedAllyBullet';
		this.weight = 32;
		this.motionY = -2;
	}
	if (chargeLevel >= 50 && !from) {
		this.element.className = 'nightmareAllyBullet';
		this.weight = 8 + (chargeLevel / 100);
		this.element.width = '8px';
	}
	if (type == 'enemy' || type == 'dark' || type == 'harmless') {
		if (strength) {
			this.weight = strength;
		}
		if (from.strength > strength) this.weight = from.strength;

		this.element.className = 'enemyBullet';
		this.motionY = 2+Math.random();
		this.motionX *= Math.random();

		if (type == 'dark' || type == 'harmless') {
			this.motionX = ((Math.random()*rand(-1,1))+0.01)*3;
			this.motionY = ((Math.random()*rand(-1,1))+0.01)*3;

			/*
			if (strength == 'laser') {
				this.yy = from.yy + fireballs.length/50;
				this.motionX = 0;
				this.motionY = 6+(fireballs.length/50);
				this.weight = 1;
				this.element.style.backgroundColor = '#fee';
				this.element.style.boxShadow = '0 0 8px #faa';
			}
			*/
		}
		if (strength > 4) {
			var motStre = strength / 4;
			this.motionX /= motStre;
			this.motionY /= motStre;
		}

		var lev = Math.floor(from.hp/10);
		if (!lev || lev == NaN) lev = 0;
		//this.weight = 4+(lev*Math.random());

		this.xx = from.xx+16;

		if (strength != 'laser') this.yy = from.yy;
		if (!this.xx) this.xx = rand(0,640);
		if (!this.yy) this.yy = rand(0,480);
		if (type == 'harmless') {
			this.motionX *= 3;
			this.motionY *= 3;
			this.element.className = 'explosionFireball';
		}

		var fidd = (posX - this.xx) / 100;
		this.motionX = fidd+(Math.random()*red(-0.1, 0.1));

		var fidd = (posY - this.yy) / 100;
		this.motionY = fidd+(Math.random()*red(-0.1, 0.1));

	}
	if (type == 'bomb') {
		this.motionY = Math.sin(fireballs.length);
		this.motionX = Math.cos(fireballs.length);
		//if (this.motionY > 0) this.motionY *= -1;
		var speedMod = (upgrade.shotSpeed/10)+1;
		this.motionY *= speedMod;
		this.motionX *= speedMod;

		this.xx = from.xx;
		this.yy = from.yy;
		var originalWeight = from.weight;
		this.weight = from.weight / 3;
		this.weight += 2;
		this.element.className = 'superChargedAllyBullet';
	}
	if (type == 'dark') {
		this.dark = true;
		this.element.style.backgroundColor = '#f40';
		this.element.style.boxShadow = '0 0 8px #f30';
	}

	if (type == 'powerup') {
		this.xx = from.xx;
		this.yy = from.yy;
		this.id = rand(0,9);
		this.motionX = 0;
		this.motionY = 0.05;
		this.element.className = 'powerup';
		var img = 'powerup.png';
		if (this.id == 1) var img = 'powerup1.png';
		if (this.id == 2) var img = 'powerup2.png';
		if (this.id == 3) var img = 'powerup3.png';
		if (this.id == 4) var img = 'powerup4.png';
		if (this.id == 5) var img = 'powerup5.png';
		if (this.id == 6) var img = 'powerup6.png';
		if (this.id == 7) var img = 'powerup7.png';
		if (this.id == 8) var img = 'powerup8.png';
		if (this.id == 9) var img = 'powerup9.png';

		this.element.style.backgroundImage = 'url("img/'+img+'")';
		this.weight = 16;
	}

	if (type == 'nightmare') {
		this.motionX = Math.sin(fireballs.length)*4;
		this.motionY = Math.cos(fireballs.length)*4;
		this.weight = 8;

	}


	if (this.element.className == 'allyBullet' || this.element.className == 'chargedAllyBullet' || this.element.className == 'superChargedAllyBullet') {
		var base = 2;
		if (this.element.className == 'chargedAllyBullet') base = 4;

		base += upgrade.shotSize/2;
		var we = 2;
		we += upgrade.shotSize/2;

		base *= chargeVariation;
		base = Math.ceil(base);
		we *= chargeVariation;
		if (type != 'bomb' && type != 'harmless') this.weight = Math.ceil(we);

		var speedMod = (upgrade.shotSpeed/10)+1;
		this.motionY *= speedMod;
	}

	if (this.element.className == 'allyBullet' && shotNumber) {
		this.motionX *= shotNumber;
	}
	this.element.style.top = this.yy+'px';
	this.element.style.left = this.xx+'px';

	this.element.style.width = this.weight+'px';
	this.element.style.height = this.weight+'px';


	if (fworkMode || type == 'firework') {
		console.log('fireworks');
		this.element.className = 'allyBullet';
		var rrr = rand(0,255);
		var ggg = rand(0,255);
		var bbb = rand(0,255);
		var col = 'rgb('+rrr+','+ggg+','+bbb+')'
		this.weight = 4;
		var hhh = rand(1,8);
		this.element.style.width = hhh+'px';
		this.element.style.height = hhh+'px';

		this.element.style.backgroundColor = col;
		this.element.style.boxShadow = '0 0 16px '+col;
	}
	if (from && this.element.className == 'enemyBullet' && from.customValueV) {
		var rrr = Math.floor(from.customValueV);
		var ggg = Math.floor(from.customValueW);
		var bbb = Math.floor(from.customValueX);
		var col = 'rgb('+rrr+','+ggg+','+bbb+')';

		this.element.style.backgroundColor = col;
		this.element.style.boxShadow = '0 0 8px '+col;
	}
	if (mode == 'firework' && this.element.className == 'superChargedAllyBullet') {
		this.element.style.width = '4px';
		this.element.style.height = '16px';
		this.element.style.backgroundColor = '#fc0';
		this.element.style.boxShadow = '0 0 32px #f80'
	}
	if (type == 'harmless' || custom || type == 'dark' || (type == 'firework' || fworkMode)) {
		var t = fireballs.length;
		//Default: 0.8, 1, 0.02
		if (from.customValueW) {
			var p = 0.1;
			var R = from.customValueW/20;
			var r = from.customValueX/20;
		}

		this.motionX = (R-r)*Math.cos(t) + p*Math.cos((R-r)*t/r)
		//(W-X)*cos(t) + V*cos((W-X)*t/X)
		this.motionY = (R-r)*Math.sin(t) - p*Math.sin((R-r)*t/r)
	}

	if (strength == 'laser') {
				this.yy = from.yy + fireballs.length/50;
				this.motionX = 0;
				this.motionY = 6+(fireballs.length/50);
				this.weight = 1;
				this.element.style.backgroundColor = '#fee';
				this.element.style.boxShadow = '0 0 8px #faa';
	}
	doc('container').appendChild(this.element);
}
function collision(from, to) {
	var c1 = from.xx < to.xx + to.weight;
	var c2 = from.xx + from.weight > to.xx;
	var c3 = from.yy < to.yy + to.weight;
	var c4 = from.yy + from.weight > to.yy;
	if (c1 && c2 && c3 && c4) return 1;
}
function moveStars() {
	if (pause) return;

	for (ms in stars) {
	}
}
function star(randie) {
	this.weight = Math.random()*3;
	this.xx = rand(0,640);
	this.yy = 0;
	if (randie) this.yy = rand(0,480);
	this.motionX = Math.random()*rand(-0.1,0.1);
	this.motionY = 6;

	this.element = document.createElement('div');
	this.element.className = 'ambientStar';
	this.element.style.top = this.yy+'px';
	this.element.style.left = this.xx+'px';
	this.element.style.opacity = 1*Math.random();
	this.element.style.width = this.weight+'px';
	this.element.style.height = this.weight+'px';
	doc('container').appendChild(this.element);
}
function starfield() {
	//stars[stars.length] = new star();
}
function playSound(path) {
	return;
	var eez = document.createElement('audio');
	eez.innerHTML = '<source src="'+path+'">';
	doc('aud').appendChild(eez);
	eez.play();
	//var t4 = setTimeout(function() {aud.innerHTML = '';}, 10000);
}
function shop(item, peek, power) {
	var upgradez = [
		{'name': 'More ENERGY',
		'tip': 'Increases your spaceship max ENERGY when the shield wears out.',
		'price': 25,
		'increase': 30,
		'stat': 'hp'},

		{'name': 'More SHIELD',
		'tip': 'Increases the strength of the SHIELD that protects the spaceship against enemy fire.',
		'price': 20,
		'increase': 50,
		'stat': 'shield'},

		{'name': 'Fast Flight',
		'tip': 'Increases your flight speed. Caution! Higher speeds may be unsafe!',
		'price': 15,
		'increase': 0.5,
		'stat': 'speed'},

		{'name': 'Empowered Shots',
		'tip': 'Your shots, missiles and bursts deal more damage.',
		'price': 25,
		'increase': 0.4,
		'stat': 'damage'},

		{'name': 'Fortune Hunter',
		'tip': 'Gets more points when destroying enemy ships.',
		'price': 50,
		'increase': 3,
		'stat': 'points'},

		{'name': 'Fast Charge',
		'tip': 'Your weapon charges faster, decreasing time needed to shot missiles and bursts.',
		'price': 25,
		'increase': 0.05,
		'stat': 'charge'},

		{'name': 'Unavoidable Explosion',
		'tip': 'Your bursts release more explosive particles, thus dealing more damage in a wide area.',
		'price': 100,
		'increase': 1,
		'stat': 'bomb'},

		{'name': 'Double-Shot',
		'tip': 'Increases the number of shots your spaceship will launch on each attack, only valid for SHOT.',
		'price': 80,
		'increase': 1,
		'stat': 'shots'},

		{'name': 'Quantum Speed',
		'tip': 'All of your projectiles move faster.',
		'price': 30,
		'increase': 2,
		'stat': 'shotSpeed'},

		{'name': 'Energy Overflow',
		'tip': 'Increases average size and area of effect of your SHOTS and MISSILES.',
		'price': 40,
		'increase': 1,
		'stat': 'shotSize'},
	];

	if (peek == 'len') return upgradez.length;
	var ii = upgradez[item];
	var priceLevel = (upgrade[ii.stat] / ii.increase)+1;
	if (peek == 'lev') return priceLevel;

	var price = Math.floor(ii.price * Math.pow(1.5, priceLevel));

	if (peek) {
		return [ii.name, ii.tip, price];
	}

	if (points >= price || power) {
		if (!power) points -= price;

		upgrade[ii.stat] += upgradez[item].increase;
		if (item == 0) HP += upgradez[item].increase;
		if (item == 1) shield += upgradez[item].increase;
		shopList();
	}
	if (power) {
		echo('extra', 'POWER UP! '+ii.name+' '+'('+ii.tip+')');
		var lll = setTimeout(function() {echo('extra', '')}, 8000);
	}


}
function shopList() {
	var le = '<br><br>';
	for (li = 0; li < shop(0, 'len'); li++) {
		var sli = shop(li, 1);
		var op = (points >= sli[2]) ? 1 : 0.1;
		if (points < sli[2] || rand(0,1) == 1) continue;
		le += '<div class="button" style="opacity: '+op+'" onclick="shop('+li+')">'+sli[0]+'('+sli[2]+' points)<br>'+sli[1]+'</div>';
	}
	difficulty = 1+addedDiff;
	updateStats();
	echo('shoppie', le);
}
function updateStats() {
	var stuff = [
	['Max ENERGY: ', 100+upgrade.hp],
	['Max SHIELD: ', 100+upgrade.shield],
	['Max Speed (px/sec): ', (upgrade.speed+13.8)*100],
	['Additional Damage per Shot: ', upgrade.damage],
	['Additional Points per Kill: ', upgrade.points/3],
	['Charge Multiplier: ', upgrade.charge*5],
	['Number of Burst Particles: ', 3+(upgrade.bomb/10)],
	['Shots per attack: ', upgrade.shots+1],
	['Projectile Acceleration (px/sec): ', (upgrade.shotSpeed/10)+1],
	['Projectile Size Modifier: ', upgrade.shotSize/2]
	];

	var l = 'Points: '+points+'<br><br>';
	for (var uss = 0; uss < stuff.length; uss++) {
		l += '<li>'+stuff[uss][0]+' '+stuff[uss][1].toFixed(3)+' '+'<span class="button" ';
		l += 'onclick="shop('+uss+')">+</span>'+'('+shop(uss, 1)[2]+' points)<br><br>';
	}
	l += 'Secondary Weapon: <br>';
	l += '<span class="button" onclick="lock = 0">None</span>';
	l += '<span class="button" onclick="lock = 1">Missile</span>';
	l += '<span class="button" onclick="lock = 2; mode = 0">Burst</span>';
	l += '<span class="button" onclick="lock = 2; mode = \'firework\'">Fireworks</span>';
	l += '<span class="button" onclick="lock = 3">Nuke</span>';

	echo('statList', l);


}
function powerUp(from) {
	fireballs[fireballs.length] = new fireball('powerup', from);
}

//Key press
function toKeyCode(key) {
	var key = key || window.event;
	var cCode = key.charCode || key.which;
	return cCode;
}
document.onkeypress = function(key) {
	var key = key || window.event;
	var cCode = key.charCode || key.which;

	var keyPress = String.fromCharCode(cCode);
	var kee = String.fromCharCode(toKeyCode(key));

	if (kee == 'p' || kee == 'P') {
		updateStats();
		pause = !pause;
	}

}

starfield();

var t = setInterval(moveStuff, 30);
var t2 = setInterval(explosionPhase, 100);
var t3 = setInterval(moveStars, 180);
document.title = 'Space Fugitive '+changes().latestVersion;