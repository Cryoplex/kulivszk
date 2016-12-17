var changelog = [
	'a Alpha',
];

var width = $(window).width();
var height = $(window).height();
var BASE_GRAVITY = 2;
var FRICTION = 0.8;
var MOVEMENT_SPEED = 10;
var MAX_CHARACTERS = 30;
var player;

var isCrafting = false;

logger('0-9 : Cambiar arma');
logger('A/D : Mover izquierda/derecha');
logger('Shift + A/D : Saltar izquierda/derecha');
logger('Z : Ataque cuerpo a cuerpo');
logger('X : Disparar arma');

var weapons = [
	{'name': 'Pistol', 'grav': 0.1, 'mark': 1, 'damage': 8, 'height': 3, 'width': 20, 'speed': 50, 'deviation': 2, 'shots': 1, 'shotdelay': 15, 'burstdelay': 0, 'penetrate': false},
	{'name': 'Machine Gun', 'grav': 0.1, 'mark': 1, 'damage': 3, 'height': 1, 'width': 40, 'speed': 75, 'deviation': 10, 'shots': 1, 'shotdelay': 1, 'burstdelay': 0, 'penetrate': false},
	{'name': 'Sniper Rifle', 'grav': 0, 'mark': 1, 'damage': 30, 'height': 1, 'width': 500, 'speed': 60, 'deviation': 0, 'shots': 1, 'shotdelay': 50, 'burstdelay': 0, 'penetrate': false},
	{'name': 'Shotgun', 'grav': 0.1, 'mark': 1, 'damage': 5, 'height': 2, 'width': 20, 'speed': 50, 'deviation': 10, 'shots': 5, 'shotdelay': 10, 'burstdelay': 10, 'penetrate': false},
	{'name': 'Laser', 'damage': 12, 'height': 5, 'grav': 0.1, 'width': 50, 'mark': 1, 'speed': 50, 'deviation': 3, 'shots': 1, 'shotdelay': 10, 'burstdelay': 0, 'penetrate': false},
	{'name': 'Shockwave', 'damage': 4, 'mark': 1, 'grav': 0.01, 'height': 24, 'width': 2, 'speed': 1, 'artillery': 0, 'deviation': 0, 'shots': 8, 'shotdelay': 50, 'burstdelay': 150, 'penetrate': true, 'accel': 0.02},
	{'name': 'Fireball', 'damage': 8, 'mark': 1, 'grav': 2, 'height': 15, 'width': 15, 'artillery': 20, 'speed': 10, 'deviation': 10, 'shots': 1, 'shotdelay': 25, 'burstdelay': 0, 'penetrate': true, 'bounce': true, 'accel': 0.02},
	{'name': 'Flamethrower', 'damage': 2, 'mark': 1, 'grav': 0.5, 'height': 10, 'width': 30, 'speed': 10, 'artillery': -5, 'deviation': 0, 'shots': 10, 'shotdelay': 80, 'burstdelay': 100, 'penetrate': true, 'bounce': true, 'accel': 0.02},
	{'name': 'Acid Rain', 'damage': 5, 'mark': 1, 'height': 8, 'width': 16, 'speed': 10, 'artillery': 10, 'deviation': 10, 'shots': 20, 'shotdelay': 50, 'burstdelay': 100, 'penetrate': true, 'grav': 1},
	{'name': 'Mortar', 'damage': 0, 'mark': 1, 'height': 15, 'width': 30, 'speed': 25, 'explosive': 10, 'artillery': 25, 'deviation': 10, 'shots': 1, 'shotdelay': 70, 'burstdelay': 0, 'grav': 1, 'accel': 0.02},
	{'name': 'Mortar Explosion', 'mark': 1, 'damage': 10, 'height': 1, 'width': 20, 'artillery': 5, 'speed': 12, 'deviation': 0, 'spread': true, 'shots': 10, 'shotdelay': 60, 'burstdelay': 0, 'grav': 0.2},
];


function fuseWeapon() {
	do {
		var firstID = rand(1, weapons.length) - 1;
		var secondID = rand(1, weapons.length) - 1;
	} while (firstID == secondID);

	var fw = weapons[firstID];
	var sw = weapons[secondID];

	console.log('Fusing', firstID, 'with', secondID);

	var nw = {};
	for (var e in fw) nw[e] = 0;
	for (var e in sw) nw[e] = 0;

	for (var e in nw) {
		var stat = fw[e];
		var otstat = sw[e];
		if (!stat) stat = 0;
		if (!otstat) otstat = 0;

		if (typeof stat == 'number' && e != 'mark' && e != 'explosive') {
			var min = (stat > otstat) ? otstat : stat;
			var max = (stat > otstat) ? stat : otstat;
			nw[e] = morph(min, max);
		}
		if (typeof stat != 'number') nw[e] = red(fw[e], sw[e]);
		if (e == 'mark') {
			var high = (stat > otstat) ? stat : otstat;
			high++;
			nw[e] = high;
		}
		if (e == 'explosive') nw[e] = rand(1, weapons.length) - 1;
	}

	weapons.push(nw);
	var lid = weapons.length - 1;

	setWeapon(lid);
}
function morph(min, max) {
	var num = Math.random()*max+min;

	if (isFloat(min) || isFloat(max)) return round(num);
	return Math.ceil(num);
}
function isFloat(num) {
	if (String(num).split('.').length > 1) return true;
}
function increaseValue(num) {
	beu.value += num;
	update('game_value');
}
function resetVariables() {
	if (!beu.value) beu.value = 0;
	if (!beu.characters) beu.characters = [];
	if (!beu.characters[0]) beu.characters[0] = new Character(width/2, height/2, 'player');
	if (!player) player = beu.characters[0];

	if (!beu.difficulty) beu.difficulty = 0;


	var t = setInterval(saveGame, 60000);
	setInterval(gravity, 50);
	setInterval(spawner, 125);
}
function saveGame() {
	localStorage.setItem('beu', JSON.stringify(beu));
	losto.setItem('weapons', JSON.stringify(weapons));
	notification('Game Saved');
}
function loadGame() {
	var losto = localStorage.getItem('beu');
	if (!losto) return;
	beu = JSON.parse(losto);

	var losto = localStorage.getItem('weapons');
	if (!losto) return;
	weapons = JSON.parse(losto);
	notification('Game Loaded');
}
function update(step) {
	document.title = gameInfo.name+' '+gameInfo.version;
}
function Character(x, y, type) {
	this.x = x;
	this.y = y;
	this.width = 0;
	this.height = 0;
	if (type != 'projectile') {
		this.width = 32;
		this.height = 64;
	}
	this.type = type;
	this.ground = false;
	this.velx = 0;
	this.vely = 0;

	this.weaponID = 0;

	this.span = -1;
	this.dead = false;

	this.rot = 0;

	this.penetrate = false;

	this.facing = 'right';

	this.hp = 30;
	if (type == 'player') this.hp = 100;
	if (type != 'player') {
		this.hp = 1 + Math.floor(beu.difficulty);
		this.hp = rand(1, this.hp);
	}


	this.hpx = this.hp;

	this.nextAttack = 0;
	this.attackSpeed = Math.random()+1;

	this.element = drawCharacter(this);
}
function moveCharacter(chara) {
	if (chara.velx < 0) chara.facing = 'left';
	if (chara.velx > 0) chara.facing = 'right';
	if (chara.y > height - chara.height) {
		if (!chara.bounce) {
			chara.vely = 0;
			if (chara.type == 'projectile') chara.span = 0;
		}
		chara.y = height - chara.height;
		chara.ground = true;
		if (chara.bounce) {
			chara.vely *= -0.8;
			chara.ground = false;
		}
		if (chara.explosive > 0 && !chara.spread) {
			explode(chara);
		}
	}
	chara.x += chara.velx;
	chara.y += chara.vely;
}
function gunValue(weapon) {
	/*
	(damage * _penetrate) * (width * height)
	(_spread * _explosive) * (shots * (100/shotdelay))
	(_accel * _bounce) * (speed / (deviation+1))
	*/

	//Basic values
	var damage_mod = (weapon.damage + 1) * (weapon.width * weapon.height);
	var burst_mod = weapon.shots * (100 / weapon.shotdelay);

	//Penetration modifier
	var pen_mod = (weapon.penetrate) ? 4 : 1;
	damage_mod *= pen_mod;

	//Explosion modifier
	var spread_mod = (weapon.spread) ? 0.5 : 1;
	var explosive_mod = (weapon.explosive) ? 5 : 1;
	burst_mod *= (spread_mod * explosive_mod);

	return round((damage_mod * burst_mod)/1000);
}
function explode(chara) {
	var s = weapons[chara.explosive].shots + 1
	for (var x = 0; x < s; x++) newBullet(chara, chara.explosive, 'spread');
	chara.dead = true;
}
function shoot(chara) {
	if (!chara.nextAttack) {
		var w = weapons[chara.weaponID];
		var shoots = w.shots;
		for (var x = 0; x < shoots; x++) delayShot(chara, x*w.burstdelay);
		chara.nextAttack = w.shotdelay

	return;

		var audio = document.createElement('audio');
		audio.src = './sound/bullet_'+chara.weaponID+'.wav';
		audio.addEventListener('ended', function() {
			document.removeChild(this);
		}, false);
		audio.play();
	}
}
function delayShot(chara, delay) {
	setTimeout(function() {
		newBullet(chara, chara.weaponID);
	}, delay);
}
function newBullet(chara, weaponID, spread) {
	var weapon = weapons[weaponID];
	if (!weapon.deviation) weapon.deviation = 0;

	var c = new Character(chara.x, chara.y, 'projectile');
	c.x = chara.x + (chara.width / 2) + ((Math.random() - 0.5) * weapon.deviation) * 10;
	c.y = chara.y + (chara.height / 2) + ((Math.random() - 0.5) * weapon.deviation) * 10;
	c.type = 'projectile';
	c.from = chara.type;
	c.hp = weapon.damage;
	c.height = weapon.height;
	c.width = weapon.width;
	c.span = 20;
	c.penetrate = weapon.penetrate;
	c.bounce = weapon.bounce;
	c.grav = weapon.grav;
	c.accel = weapon.accel;
	var cname = weaponID % 25;
	c.className = 'bullet_'+cname;
	c.explosive = weapon.explosive;
	if (!weapon.artillery) weapon.artillery = 0;

	c.velx = weapon.speed;

	c.vely = (Math.random() - 0.5) * weapon.deviation;

	if (weapon.artillery) c.vely -= weapon.artillery;

	if (weapon.spread || spread) {
		c.velx = Math.sin(beu.characters.length * 0.5) * (weapon.speed);
		c.vely = Math.cos(beu.characters.length * 0.5) * (weapon.speed);
	}

	beu.characters.push(c);
}
function drawCharacter(chara) {
	var el = document.createElement('character');
	el.style.display = 'inline-block';
	
	document.body.appendChild(el);
	return el;
}
function updateCharacterElement(chara) {
	if (!chara.element.style) chara.element = drawCharacter(chara);
	var el = chara.element;
	el.style.top = (chara.y)+'px';
	el.style.left = ((chara.x) + ((width / 5) - player.x))+'px';

	el.style.outline = 'none';
	if (chara.attack) el.style.outline = '2px solid red';
	if (!chara.className) chara.className = '';
	el.className = chara.type+' '+chara.className;
	el.style.width = chara.width+'px';
	el.style.height = chara.height+'px';

	if (chara.type == 'projectile') {
		var rot = (chara.velx < 0) ? -(chara.vely * 2) : (chara.vely * 2)
		el.style.transform = 'rotate('+rot+'deg)';
	}

	el.style.display = 'inline-block';
	if ((chara.x - (chara.width / 2)) < (player.x - width)) {
		el.style.display = 'none';
		if (chara.type == 'projectile' && rand(0,1)) chara.dead = true;
	}
	if ((chara.x + (chara.width / 2)) > (player.x + width)) {
		el.style.display = 'none';
		if (chara.type == 'projectile' && rand(0,1)) chara.dead = true;
	}

	if (chara.type != 'projectile') el.innerHTML = '<d>'+realDrawBar(chara.hp, chara.hpx)+'</d>';
}
function damage(chara, amt) {
	flashText(chara.element, -amt, 'red', true);
	chara.hp -= amt;
	if (chara.hp <= 0 && chara != player) {
		chara.dead = true;
		return true;
	}
}
function kill(wot) {
	wot.dead = true;
}
function distance(from, to) {
	return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
}
function gravity() {
	if (!beu.money) beu.money = 0;
	if (isCrafting) return;
	for (var c in beu.characters) {
		var chara = beu.characters[c];
		if (chara.dead) {
			if (chara.element.parentNode == document.body) document.body.removeChild(chara.element);
			if (chara.type == 'monster') {
				beu.money += chara.hpx;
				flashText(player.element, '+$'+chara.hpx);
			}
			beu.characters.splice(c, 1);
			continue;
		}
		if (chara != player && chara.type != 'projectile') {
			if (chara.x < player.x && rand(1,10) == 1 && chara.type != 'projectile') chara.velx += (MOVEMENT_SPEED * 0.3);
			if (chara.x > player.x && rand(1,10) == 1 && chara.type != 'projectile') chara.velx -= (MOVEMENT_SPEED * 0.3);

			if (player.attack == collisionCheck(player, chara) && !player.nextAttack && chara.type != 'projectile') {
				var d = damage(chara, 5);
				player.attack = false;
				player.nextAttack = 10;
				if (d) return;
			}

			if (!chara.nextAttack) {
				if (collisionCheck(player, chara)) {
					chara.nextAttack = 50;
					var d = damage(player, 1);
					if (d) return;
				}
			}
		}
		if (chara.type == 'projectile') for (var p in beu.characters) {
			var victim = beu.characters[p];
			if (victim.type != 'projectile' && victim.type != chara.from) {
				if (collisionCheck(chara, victim)) {
					if (chara.explosive) explode(chara);
					var d = damage(victim, Math.ceil(chara.hp));
					if (!chara.penetrate) chara.dead = true;
					if (chara.penetrate) {
						chara.width *= 0.9
						chara.height *= 0.9
						chara.hp = Math.floor(chara.hp * 0.9)
					}

					if (chara.hp < 1) chara.dead = true;
					break;
				}
			}
		}
		if (chara.span >= 0) {
			chara.span -= 0.2;
			if (chara.span <= 0) {
				chara.bounce = false;
				chara.accel = 0;

				chara.width -= 0.5;
				chara.height -= 0.5;
				chara.hp = Math.floor(chara.hp * 0.9);
				chara.span = 0;

				if (chara.width <= 0 && chara.height <= 0) chara.dead = true;
			}
		}
		if (!chara.attackSpeed) chara.attackSpeed = Math.random()+1;
		chara.nextAttack -= chara.attackSpeed;
		if (chara.nextAttack < 0) chara.nextAttack = 0;
		var gravmod = BASE_GRAVITY;
		if (chara.grav) gravmod *= chara.grav;
		if (!chara.ground) chara.vely += gravmod;
		if (chara.velx && chara.ground && (chara.span <= 0 || chara.grav)) chara.velx *= FRICTION;
		if (chara.accel) {
			if (chara.velx < 0) chara.velx -= chara.accel;
			if (chara.velx > 0) chara.velx += chara.accel;
		}
		moveCharacter(chara);
		updateCharacterElement(chara);
	}

	document.body.style.backgroundPosition = -player.x+'px 0px';
}
function movePlayer(dir, jump) {
	if (dir == 'left') player.velx = -MOVEMENT_SPEED;
	if (dir == 'right') player.velx = MOVEMENT_SPEED
	if (jump && player.ground) {
		player.ground = false;
		player.vely -= 20;
	}
}
function spawner() {
	if (isCrafting) return;
	if (rand(0,1) && beu.characters.length < MAX_CHARACTERS) {
		var minx = player.x + (width * 0.5);
		var maxx = player.x + (width * 1);
		var x = rand(minx, maxx);
		var nm = new Character(x, (height - 100), 'monster');
		beu.characters.push(nm);
		beu.difficulty += (rand(0,1) / 10);
	}
}
function logger(text) {
	doc('log').innerHTML += text+'<br>';
	doc('log').scrollTop = doc('log').scrollHeight;
}
function attack() {
	player.attack = true;
	setTimeout(function() {
		player.attack = false;
	}, 100);
}
function crafting(close) {
	isCrafting = true;
	var w = weapons[player.weaponID];
	if (close) {
		craft.style.display = 'none';
		isCrafting = false;
		return;
	}

	var l = 'You have $'+beu.money+'<br>';
	for (var st in w) {
		var stat = w[st];
		if (typeof stat == 'number') l += '<ii>'+st+' <input type="number" onblur="morphWeapon('+player.weaponID+', \''+st+'\', this.value)" value="'+stat+'"></input></ii><br>';
		if (typeof stat != 'number') l += '<ii>'+st+' '+stat+'</ii><br>';
	}
	l += '<div class="btn btn-warning" onclick="crafting(1)">Close this shit</div>';
	craft.innerHTML = l
	craft.style.display = 'inline-block';
}
function clone(obj) {
	return JSON.parse(JSON.stringify(obj));
}
function morphWeapon(id, stat, value) {
	var oldw = clone(weapons[id]);
	var neww = clone(oldw);
	neww[stat] = parseFloat(value);
	
	var price_old = gunValue(oldw);
	var price_new = gunValue(neww);
	var price = Math.abs(price_old - price_new) * 3;

	if (beu.money >= price && oldw[stat] != neww[stat]) {
		beu.money -= price;
		weapons[id][stat] = parseFloat(value);
		return;
	}
	notification('No money! $'+price+' needed!');
}
function setWeapon(id) {
	logger('Changing weapon to '+weapons[id].name+' '+romanNumber(weapons[id].mark));
	player.weaponID = id;
}

$('body').on('keypress', function(evt) {
    var key = String.fromCharCode(evt.charCode);

    //if (key == 'w') movePlayer('jump');
    if (key == 'a') movePlayer('left');
    if (key == 'A') movePlayer('left', 'jump');
    if (key == 'd') movePlayer('right');
    if (key == 'D') movePlayer('right', 'jump');

    if (key == 'z') attack();
    if (key == 'x') shoot(player);

    if (key == 'f') fuseWeapon();
    if (key == 'c') crafting();

    if (key >= 0 && key <= 9) {
    	if (isCrafting) return;
    	setWeapon(key);
    }
});

var beu = {};
var gameInfo = {
	'name': 'Template',
	'version': changes(changelog).latestVersion,
	'changelog': changes(changelog).changelog,
}
loadGame();
resetVariables();
update();