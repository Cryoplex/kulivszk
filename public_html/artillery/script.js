var changelog = [
'-- Alpha',
'--- Cambiado el nombre de la plantilla a "Artillery WIP"',
'--- Eliminado el botón "Click Me!"',
'--- Añadidos arrays para guardar los jugadores, muros y disparos.',
];

var GAME_WIDTH = 640;
var GAME_HEIGHT = 480;
var GRAVITY = 0.5;
var SPEED = 0.5;

function increaseValue(num) {

}
function resetVariables() {
	if (!artillery.value) artillery.value = 0;
	artillery.objects = [];
	if (!artillery.objects) artillery.objects = [];

	artillery.objects.push(new Player(position(GAME_WIDTH / 2, GAME_HEIGHT - 15), 'rgb(255, 0, '+rand(0, 255)+')', {'width': 5, 'height': 5}));

	//for (var n = 0; n < 10; n++) newWall();
}
function updateObjects() {
	for (var o in artillery.objects) {
		var p = artillery.objects[o];

		moveObject(p);

		p.element.style.width = p.size.width+'px';
		p.element.style.height = p.size.height+'px';

		p.element.style.top = (p.position.y)+'px';
		p.element.style.left = (p.position.x)+'px';
	}
}
function checkAllCollisions(from) {
	var colls = '';
	for (var cac in artillery.objects) {
		var obj = artillery.objects[cac];
		if (from == obj) continue;

		var col = collision(from, obj);

		if (col) {
			if (col == 't') from.motion.y *= -1;
			if (col == 'l' || col == 'r') from.motion.x = 0;
		}
	}
	return colls;
}
function moveObject(what) {
	var direction = what.motion;

	var maxWidth = GAME_WIDTH - what.size.width;
	var maxHeight = GAME_HEIGHT - what.size.height;
	

	what.motion.x *= 0.8;
	what.motion.y += GRAVITY;

	var colls = checkAllCollisions(what);
	if (colls) {
		what.motion.x = 0;
		what.motion.y = 0;
	}

	what.position.x += what.motion.x;
	what.position.y += what.motion.y;

	if (what.position.x > maxWidth) what.position.x = maxWidth;
	if (what.position.x < 0) what.position.x = 0;
	if (what.position.y > maxHeight) {
		what.position.y = maxHeight;
		what.motion.y = 0;
	}
	if (what.position.y < 0) what.position.y = 0;

}
function collision(from, to) {
	var shapeA = from;
	var shapeB = to;
	shapeA = {
		'x': shapeA.position.x,
		'y': shapeA.position.y,
		'height': shapeA.size.height,
		'width': shapeA.size.width
	}
	shapeB = {
		'x': shapeB.position.x,
		'y': shapeB.position.y,
		'height': shapeB.size.height,
		'width': shapeB.size.width
	}
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
        vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
        // add the half widths and half heights of the objects
        hWidths = (shapeA.width / 2) + (shapeB.width / 2),
        hHeights = (shapeA.height / 2) + (shapeB.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX),
            oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                from.y += oY;
            } else {
                colDir = "b";
                from.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                from.x += oX;
            } else {
                colDir = "r";
                from.x -= oX;
            }
        }
    }
    return colDir;
}
function newWall() {
	artillery.objects.push(new Wall(position(undefined, GAME_HEIGHT - 100), '#0f0', {'width': rand(4, 16), 'height': rand(1, 8)}));
}
function position(x, y) {
	if (x == undefined) x = rand(0, GAME_WIDTH);
	if (y == undefined) y = rand(0, GAME_HEIGHT);
	return {'x': x, 'y': y};
}
function Player(position, color, size) {
	this.position = position;
	this.color = color;
	this.size = size;
	this.motion = {'x': 0, 'y': 0};
	this.jump = false;

	this.element = document.createElement('span');
	this.element.className = 'player';
	this.element.style.backgroundColor = color;

	doc('battleground').appendChild(this.element);
}
function Wall(position, color, size) {
	this.position = position;
	this.color = color;
	this.size = size;
	this.motion = {'x': 0, 'y': 0};
	this.jump = false;

	this.element = document.createElement('span');
	this.element.className = 'wall';
	this.element.style.backgroundColor = color;

	doc('battleground').appendChild(this.element);
}
function Bullet(position, color, size) {
	this.position = position;
	this.color = color;
	this.motion = {'x': 0, 'y': 0};
	this.size = size;
	this.jump = false;

}
function saveGame() {
	localStorage.setItem('artillery', JSON.stringify(artillery));
	notification('Game Saved');
}
function loadGame() {
	var losto = localStorage.getItem('artillery');
	if (!losto) return;
	artillery = JSON.parse(losto);
	notification('Game Loaded');
}
function update(step) {

	document.title = gameInfo.name+' '+gameInfo.version;
}
$(document).on('keypress', function(evt) {
	var key = String.fromCharCode(evt.keyCode).toUpperCase();
	var myGuy = artillery.objects[0];

	if (key == 'A') {
		myGuy.motion.x -= SPEED;
	}
	if (key == 'S') {
		myGuy.motion.y = (SPEED * 2)
	}
	if (key == 'D') {
		myGuy.motion.x += SPEED;
	}
	if (key == 'W') {
		if (myGuy.jump) return;
		myGuy.motion.y = (-SPEED * 2);
		console.log('Motion y: '+myGuy.motion.y);

		//myGuy.jump = true;
	}
});

var artillery = {};
var gameInfo = {
	'name': 'Artillery WIP',
	'version': changes(changelog).latestVersion,
	'changelog': changes(changelog).changelog,
}
loadGame();
resetVariables();
update();
setInterval(updateObjects, 10);
var t = setInterval(saveGame, 60000);