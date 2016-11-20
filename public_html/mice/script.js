/*
0.0.0.0 Added changelog
0.1.0.0 Added mice
0.2.0.0 Now you can catch mice with your bare hands
0.2.1.0 Difficulty increases each 10 mice caught. After 1000 mice, there will be a lot of mice spawned each tick.
0.2.1.1 Fixed loading bug
0.2.2 Mice now poop on the floor.

*/

var traps = [
	{'name': 'Snap Trap', 'price': 10, 'desc': 'Kills a single mouse upon contact.', 'img': 't_snaptrap'},
	{'name': 'Mouse Poison', 'price': 30, 'desc': 'Slowly kills large groups of mice. 1-10 uses', 'img': 't_poison'},
	{'name': 'Glue Trap', 'price': 15, 'desc': 'Prevents a group of mice from moving.', 'img': 't_glue'},
	{'name': 'Rat Poison', 'price': 55, 'desc': 'Slowly kills large groups of mice. 1-30 uses', 'img': 't_poison2'},
	{'name': 'Mouse-X Bomb', 'price': 60, 'desc': 'Kills mice instantly in a short range.', 'img': 't_bomb'},
	{'name': 'Catower', 'price': 100, 'desc': 'Eats mice that come closer to it. Wears off over time.', 'img': 't_catower'},
];

var selling = false;
var placing = false;

function addMouse(num) {
	if (miceGame.mice.length > 360) return;
	if (num < 1 || num == undefined) num = 1;
	miceGame.mice.push(new Mouse());
	moveMice(1);
}
function addBlock() {
	miceGame.mice.push(new Block());
}
function Block() {
	var spawn = {'x': rand(1,583), 'layer': rand(0,1)};

	this.x = spawn.x;
	this.layer = spawn.layer;
	this.y = getYFromLayer(spawn.layer) - 20;
	this.motionX = 0;
	this.invul = 0;
	this.stand = 0;
	this.type = 'block';
}
function Mouse() {
	var spawn = getSpawnPoint();

	this.x = spawn.x;
	this.layer = spawn.layer;
	this.y = getYFromLayer(spawn.layer) + rand(0,10);
	this.motionX = red(-1, 1);
	this.invul = 10;
	this.poison = 0;
	this.slow = 0;

	this.stand = 0;
	this.type = 'mouse';
	if (rand(1,20) == 1) this.type = read(['hamster', 'rat', 'gray_rat', 'white_mouse']);
}
function Poop(x, y) {
	this.x = x;
	this.size = rand(10,20) / 10;
	this.y = y + rand(20,26);
	this.rot = rand(0, 360);
}
function getSpawnPoint() {
	var spawns = [
	{'x': 318, 'layer': 0},
	{'x': 111, 'layer': 1},
	];
	return read(spawns);
}
function addPoop(x, y) {
	poops.push(new Poop(x, y));
	moveMice(1);
}
function sellMouse() {
	if (!selling) return;

	var qty = Math.floor((miceGame.catched / 10) + 1);
	miceGame.catched -= qty;

	if (miceGame.money == undefined) miceGame.money = 0;
	miceGame.money += Math.ceil(5 * qty);

	miceCatched.innerHTML = miceGame.catched;
	mice_money.innerHTML = miceGame.money;

	if (miceGame.catched <= 0) selling = false;
}
function sellMice() {
	if (!selling) selling = true;
}
function drawMouse(mouse) {
	if (mouse.element == undefined || !mouse.element.parentNode) {
		mouse.element = document.createElement('i');
		document.body.appendChild(mouse.element);
	}
}
function addClickEvent(mouse, id) {
	mouse.element.onclick = function() {
		catchMouse(id);
	}
}
function moveMice(draw) {
	sellMouse();
	if (miceGame.catchTotal == undefined) miceGame.catchTotal = miceGame.catched;
	var maxDiff = 100 - Math.ceil(miceGame.catchTotal / 10);
	if (maxDiff < 5) maxDiff = 5;
	if (!rand(0,10)) {
		var more = Math.floor(miceGame.catchTotal / 20) + 1;
		var num = rand(1, more);
		addMouse(num);
	}

	draw = false;

	var l = '';
	for (var tr in miceGame.traps) {
		var trap = miceGame.traps[tr];
		if (trap.element && trap.element.style && trap.element.style.top) continue;
		if (trap.img == undefined) trap.img = 't_snaptrap';
		trap.element = document.createElement('trap');
		trap.element.className = trap.img;
		positionTrap(trap);
		document.body.appendChild(trap.element);
	}
	for (var m in miceGame.mice) {
		var mouseID = m;
		var mouse = miceGame.mice[m];

		drawMouse(mouse);

		var cl = 'mouse_run';
		if (mouse.stand) {
			mouse.stand--;
			cl = 'mouse_stand';
		}
		var i = '';
	    if (mouse.invul > 0) {
	    	i = 'invul';
	    	mouse.invul--;
	    }
	    if (!rand(0,250)) {
	    	addPoop(mouse.x, mouse.y);
	    }
	    if (mouse.slow) {
	    	cl = 'mouse_stand';
	    	mouse.slow -= 0.1;
	    }

	    if (!mouse.stand && !draw && !mouse.slow) {
	    	mouse.x += (mouse.motionX) * 8;
	    	if (!rand(0,1000)) mouse.stand = rand(10,100);
	    }
	    if (mouse.x < 0) {
	    	mouse.motionX *= -1;
	    	mouse.x = 0;
	    }
	    if (mouse.x > 583) {
	    	mouse.motionX *= -1;
	    	mouse.x = 583;
	    }
	    var is = '';
	    if (mouse.motionX > 0) is = 'invertSide';

	    var poi = '';
	    if (mouse.poison > 0) {
	    	poi = 'poisoned';
	    	mouse.poison += 0.1;
	    	if (mouse.poison > 10) {
	    		catchMouse(m);
	    		break;
	    	}
	    }
	    var type = mouse.type;
	    if (type == undefined) type = 'mouse';

	    var elem = 'mouse_'+m;
	    var elemj = '#mouse_'+m;

	    mouse.element.style.top = mouse.y+'px';
	    mouse.element.style.left = mouse.x+'px';
	    mouse.element.className = mouse.type+' mousey '+i+' '+cl+' '+is+' '+poi;
	    addClickEvent(mouse, mouseID);
	    mouse.element.id = 'mouse_'+m;

	    if (mouse.invul <= 0) for (var tr in miceGame.traps) {
	    	var trap = miceGame.traps[tr];
	    	if (trapCollision(mouse, trap)) {
	    		//Mouse activates trap
	    		if (trap.img == 't_snaptrap') {
	    			catchMouse(m);
	    			trap.health -= 10;
	    		}
	    		if (trap.img == 't_catower') {
	    			catchMouse(m);
	    			trap.health -= 0.25;
	    		}
	    		if (trap.img == 't_poison' || trap.img == 't_poison2' && mouse.poison <= 0) {
	    			mouse.poison = 0.1;
	    			var c = (trap.img == 't_poison') ? 10 : 30;
	    			trap.health -= (10 / c);
	    		}
	    		if (trap.img == 't_glue' && mouse.slow <= 0) {
	    			if (mouse.slow <= 0) {
	    				mouse.slow = 10;
	    				trap.health -= 1;
	    			}
	    		}
	    		if (trap.img == 't_bomb' && mouse.poison <= 0) {
	    			trap.health -= 1;
	    			var excl = '';
	    			if (trap.health > 1) excl = 'fuse3';
	    			if (trap.health > 5) excl = 'fuse2';
	    			if (trap.health > 9) excl = 'fuse1';

	    			excl += ' t_bomb';

	    			trap.element.className = excl;
	    			if (trap.health <= 0) {
	    				explodeBomb(mouse.x, mouse.y, 128);
	    			}
	    		}
	    		if (trap.health <= 0) useTrap(trap, tr);
	    		break;
	    	}
	    }

		l += '<i id="mouse_'+m+'" onclick="catchMouse('+m+')" class="'+mouse.type+' mousey '+poi+' '+i+' '+cl+' '+is+'" style="top: '+mouse.y+'px; left: '+mouse.x+'px"></i>';
	}
	for (var p in poops) {
		l += '<i class="mousePoop" style="transform: scale('+poops[p].size+') rotate('+poops[p].rot+'deg); top: '+poops[p].y+'px; left: '+poops[p].x+'px"></i>';
	}
	if (draw) playableBG.innerHTML = l;
	if (!miceGame.catched) miceGame.catched = 0;
	miceCatched.innerHTML = miceGame.catched;
}
function explodeBomb(x, y, radius) {
	for (var mm in miceGame.mice) {
		var mmm = miceGame.mice[mm];
		if (mmm.x > (x - radius) && mmm.x < (x + radius) && mmm.y > (y - radius) && mmm.y < (y + radius)) mmm.poison = 10;
	}
}
function useTrap(trap, id) {
	console.log('Using trap id:'+id);
	if (trap.element.parentNode) document.body.removeChild(trap.element);
	miceGame.traps.splice(id, 1);
}
function trapCollision(mouse, trap) {
	var mx = (mouse.x + 30);
	var my = (mouse.y + 12);

	var tf = (trap.img == 't_catower') ? 32 : 16;
	var tf2 = tf * 2;
	var tx = trap.posX + tf;
	var ty = trap.posY + tf;

	if (mx > (tx - tf2) && mx < (tx + tf2)) {
		if (my > (ty - 64) && my < (ty + 64)) return true;
	}
}
function catchMouse(id) {
	if (miceGame.mice[id].invul > 0) return;
	document.body.removeChild(miceGame.mice[id].element);
	miceGame.mice.splice(id, 1);
	miceGame.catched++;
	miceGame.catchTotal++;
	moveMice(1);
}
function getYFromLayer(layer) {
	return [239, 440][layer];
}

function increaseValue(num) {
	miceGame.value += num;
	update('game_value');
}
function resetVariables() {
	if (!miceGame.value) miceGame.value = 0;
}
function saveGame() {
	localStorage.setItem('miceGame', JSON.stringify(miceGame));
	notification('Game Saved');
}
function buyTrap(type) {
	if (type == undefined) type = 0;
	var price = traps[type].price;
	if (miceGame.money < price) return;
	miceGame.money -= price;

	placing = {
		'trap': traps[type],
		'posX': 0,
		'posY': 0,
	}

	var tr = document.createElement('trap');
	tr.onclick = function() {placeTrap(type)};
	tr.className = placing.trap.img;
	placing.element = tr;
	positionTrap(placing);
	document.body.appendChild(tr);

	update();
}
function Trap(trap, x, y) {
	this.posX = x;
	this.posY = y;
	this.img = trap.img;

	this.trap = trap;

	this.health = 10;

	var tr = document.createElement('trap');
	tr.className = trap.img;
	this.element = tr;
	positionTrap(this);
	this.element.id = 'trap_'+uid();
	document.body.appendChild(this.element);
}
function uid() {
	var d = new Date();
	return d.valueOf().toString(36);
}
function placeTrap(type) {
	if (isTrapPlaceable()) {
		if (miceGame.traps == undefined) miceGame.traps = [];

		miceGame.traps.push(new Trap(placing.trap, px, py));
		document.body.removeChild(placing.element);
		buyTrap(type);
	}
	if (!isTrapPlaceable()) {
		document.body.removeChild(placing.element);
		placing = false;
	}
}
function positionTrap(trap) {
	var f = (trap.img == 't_catower') ? 32 : 16;
	trap.element.style.top = (trap.posY - f)+'px';
	trap.element.style.left = (trap.posX - f)+'px';
}
function loadGame() {
	var losto = localStorage.getItem('miceGame');
	if (!losto) return;
	miceGame = JSON.parse(losto);
	if (!miceGame) miceGame = {};
	notification('Game Loaded');
}
function update(step) {
	if (miceGame.money == undefined) miceGame.money = 0;
	mice_money.innerHTML = miceGame.money;
}

function isTrapPlaceable() {
	var trp = (placing.trap.img == 't_catower') ? 16 : 0;
	var miny1 = 250 - trp;
	var miny2 = 450 - trp;

	if ((py > miny1 && py < 280) || (py > miny2 && py < 480)) return true;
}

$(document).on('mousemove', function(evt) {
	px = evt.pageX;
	py = evt.pageY;
	if (placing) {
		var f = 16;
		if (placing.trap.img == 't_catower') f = 32;
		placing.element.style.top = (py - f)+'px';
		placing.element.style.left = (px - f)+'px';

		var canPlace = false;
		if (isTrapPlaceable()) canPlace = true;

		placing.element.style.opacity = 1;
		placing.element.style.backgroundColor = 'transparent';
		if (!canPlace) {
			placing.element.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
			placing.element.style.opacity = 0.2;
		}
	}
});

var miceGame = {};
miceGame.mice = [];
miceGame.catched = 0;
loadGame();
resetVariables();
var poops = [];

var px = 0;
var py = 0;

addMouse();
update();
var t = setInterval(saveGame, 60000);
setInterval(moveMice, 100);