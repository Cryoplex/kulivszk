var changelog = [
	'a Alpha',
];

var BASE_SPEED = 120;
var BASE_ACCEL = 0.5;
var BASE_WEIGHT = 1;

function resetVariables() {

}
function saveGame() {
	localStorage.setItem('race', JSON.stringify(race));
	notification('Game Saved');
}
function loadGame() {
	var losto = localStorage.getItem('race');
	if (!losto) return;
	race = JSON.parse(losto);
	notification('Game Loaded');
}
function Car(speed, accel, weight) {
	if (!speed) speed = 0;
	if (!accel) accel = 0;
	if (!weight) weight = 0;

	while (rand(0,1)) speed++;
	while (rand(0,1)) accel++;
	while (rand(0,1)) weight++;

	this.speed = BASE_SPEED + (speed * 5);
	this.accel = BASE_ACCEL + (accel * 0.5);
	this.weight = BASE_WEIGHT + (weight * 0.01);

	this.accelerating = 0;

	this.currentSpeed = 0;

	this.position = 0;

	this.wrot = 0;

	this.isAccelerating = false;
	this.isBraking = false;
	this.isUsingTurbo = false;

	this.turbo = 100;

	this.y = 480;
}
function accelerate(what) {
	if (what.accelerating >= (what.speed * what.weight)) what.accelerating = (what.speed * what.weight);
	var turbonus = 1;
	if (what.isUsingTurbo) turbonus += Math.log((what.turbo / 100) + 1);
	what.accelerating += (what.accel * 2 * turbonus);
}
function getAccel(car) {
	var turbonus = 1;
	if (car.isUsingTurbo) turbonus += (car.turbo / 100);
	return car.accelerating / (getSpeedLoss(car) / turbonus);
}
function breakk(what) {
	what.accelerating -= ((what.accel + what.weight) * 2);
	if (what.accelerating < 0) what.accelerating = 0;
}
function reDrawCar() {
	race.car = new Car(0, 0, 0);
	race.enemyCar = new Car(0, 0, 0);
}
function getSpeedLoss(car) {
	return car.weight;
}
function positionBar() {
	var myPos = (race.car.position / 100) * 100;
	var lf = 100 - myPos;

	var ePos = (race.enemyCar.position / 100) * 100;
	return '<barholder style="width: 100%; position: absolute; top: 0px"><barcar class="yourCar" style="left: '+myPos+'%"></barcar><barcar class="enemyCar" style="left: '+ePos+'%"></barcar><bar class="passed" style="width: '+myPos+'%"></bar><bar style="width: '+lf+'%"></bar> '+race.car.position.toFixed(2)+'/100</barholder>';
}
function moveCar(car) {
	if (car.isUsingTurbo) {
		car.turbo--;
		if (car.turbo <= 0) {
			car.turbo = 0;
			car.isUsingTurbo = false;
		}
	}

	if (car.isAccelerating) accelerate(car);
	if (car.isBraking) breakk(car);

	car.currentSpeed = getAccel(car);
	if (car.currentSpeed > car.speed && !car.isUsingTurbo) car.currentSpeed = car.speed;

	if (!car.isAccelerating) car.accelerating -= car.accel;
	if (car.accelerating <= 0) car.accelerating = 0;

	if (car.y == undefined) car.y = 480;
	if (car.y < 420) car.y = 420;
	if (car.y > 520) car.y = 520;

	if (car.currentSpeed > 0 && !rand(0,10)) car.y += rand(-1, 1);

	if (car.wrot == undefined) car.wrot = 0;
	if (car.currentSpeed > 0) {
		car.wrot += (car.currentSpeed / car.speed) * 90;
		car.wrot += Math.random() + 1;
	}

	var move = car.currentSpeed / 250;
	car.position += move;
}
function eaccelerate() {
	race.enemyCar.isAccelerating = true;
}
function updaty() {
	if (race.car == undefined) reDrawCar();
	if (race.enemyCar == undefined) race.enemyCar = new Car(rand(0, 5), rand(0, 5), rand(0, 5));

	moveCar(race.car);

	moveCar(race.enemyCar);

	moveRoad();

	current_speed.innerHTML = Math.ceil(race.car.currentSpeed)+' km/h<br><span style="font-size: 10px">'+race.car.accelerating+'<br>accel:'+race.car.isAccelerating+' / brake:'+race.car.isBraking+' / turbo: '+race.car.isUsingTurbo+' ('+race.car.turbo+'/100</span>';

	current_position.innerHTML = positionBar();
}
function moveRoad() {
	if (race.roadPosition == undefined) race.roadPosition = 0;
	race.roadPosition -= (race.car.currentSpeed / 5);
	roady.style.backgroundPosition = (race.roadPosition)+'px 0px';

	background_1.style.backgroundPosition = (race.roadPosition / 2)+'px 0px';
	background_2.style.backgroundPosition = (race.roadPosition / 1)+'px 0px';

	car_myCar.style.top = race.car.y+'px';
	car_enemyCar.style.top = race.enemyCar.y+'px';

	mc_wheel_1.style.transform = 'rotate('+race.car.wrot+'deg)';
	mc_wheel_2.style.transform = 'rotate('+race.car.wrot+'deg)';

	ec_wheel_1.style.transform = 'rotate('+race.enemyCar.wrot+'deg)';
	ec_wheel_2.style.transform = 'rotate('+race.enemyCar.wrot+'deg)';

	var pos1 = ((race.car.position / 100) * 100);
	if (pos1 > 50) pos1 = 50

	var pos2 = (((race.enemyCar.position - race.car.position) / 20) * 100);

	car_myCar.style.left = pos1+'%';
	car_enemyCar.style.left = pos2+'%';
}

$(document).on('keypress', function(evt) {
	if (evt.which == 32) {
		if (!race.enemyCar.isAccelerating) {
			race.enemyCar.isAccelerating = true;
			setTimeout(function() {
				race.enemyCar.isUsingTurbo = true;
			}, 5000);
		}
		race.car.isAccelerating = true;
	}
	if (evt.which == 122 || evt.which == 90) {
		race.car.isBraking = true;
	}
	if (evt.which == 88 || evt.which == 120) {
		race.car.isUsingTurbo = true;
	}
})
$(document).on('keyup', function(evt) {
	if (evt.which == 32) {
		race.car.isAccelerating = false;
	}
	if (evt.which == 122 || evt.which == 120 || evt.which == 90 || evt.which == 88) {
		race.car.isBraking = false;
	}
})

var race = {};
var gameInfo = {
	'name': 'Template',
	'version': changes(changelog).latestVersion,
	'changelog': changes(changelog).changelog,
}
loadGame();
resetVariables();


reDrawCar();
race.car.y = 480;
race.enemyCar.y = 520;
race.car.position = 0;
race.enemyCar.position = 0;

var t = setInterval(saveGame, 60000);
setInterval(updaty, 100);