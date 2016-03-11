/*
0.0.0.0 Added changelog
0.1.0.0 Added mice
0.2.0.0 Now you can catch mice with your bare hands
0.2.1.0 Difficulty increases each 10 mice caught. After 1000 mice, there will be a lot of mice spawned each tick.
0.2.1.1 Fixed loading bug
0.2.2 Mice now poop on the floor.

*/


function addMouse() {
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
	this.stand = 0;
	this.type = 'mouse';
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
function moveMice(draw) {
	var maxDiff = 100 - Math.ceil(miceGame.catched / 10);
	if (maxDiff < 1) maxDiff = 1;
	if (!rand(0,maxDiff)) addMouse();
	var l = '';
	for (var m in miceGame.mice) {
		var mouse = miceGame.mice[m];
		var cl = 'mouse_run';
		if (mouse.stand) {
			mouse.stand--;
			cl = 'mouse_stand';
		}
		if (mouse.type == 'block') {
			l += '<i id="mouse_'+m+'" class="block" style="top: '+mouse.y+'px; left: '+mouse.x+'px; transform: scale('+mouse.size+')"></i>';
			continue;
		}
		var i = '';
	    if (mouse.invul > 0) {
	    	i = 'invul';
	    	mouse.invul--;
	    }
	    if (!rand(0,250)) {
	    	addPoop(mouse.x, mouse.y);
	    }

	    if (!mouse.stand && !draw) {
	    	mouse.x += (mouse.motionX) * 16;
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

	    if (doc('mouse_'+m)) {
	    	var elem = 'mouse_'+m;
	    	var elemj = '#mouse_'+m;
	    	$(elemj).animate({
	    		'left': mouse.x+'px',
	    	}, 75);
	    	doc(elem).className = 'mouse '+i+' '+cl+' '+is;
	    }

		l += '<i id="mouse_'+m+'" onclick="catchMouse('+m+')" class="mouse '+i+' '+cl+' '+is+'" style="top: '+mouse.y+'px; left: '+mouse.x+'px"></i>';
	}
	for (var p in poops) {
		l += '<i class="mousePoop" style="transform: scale('+poops[p].size+') rotate('+poops[p].rot+'deg); top: '+poops[p].y+'px; left: '+poops[p].x+'px"></i>';
	}
	if (draw) playableBG.innerHTML = l;
	if (!miceGame.catched) miceGame.catched = 0;
	miceCatched.innerHTML = miceGame.catched;
}
function catchMouse(id) {
	console.log('Catching '+id);
	if (miceGame.mice[id].invul > 0) return;
	miceGame.mice.splice(id, 1);
	miceGame.catched++;
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
function loadGame() {
	var losto = localStorage.getItem('miceGame');
	if (!losto) return;
	miceGame = JSON.parse(losto);
	if (!miceGame) miceGame = {};
	notification('Game Loaded');
}
function update(step) {
	if (step == 'game_value' || !step) doc('game_value').innerHTML = shortNum(miceGame.value);
}

var miceGame = {};
miceGame.mice = [];
miceGame.catched = 0;
loadGame();
resetVariables();
var poops = [];

addMouse();
var t = setInterval(saveGame, 60000);
setInterval(moveMice, 75);