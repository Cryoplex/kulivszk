<!DOCTYPE html>
<html>
<head><title>PHP Testing Zone</title>

<style>
.button {
	background-color: hsl(102, 70%, 70%);
	color: black;
	border-radius: 8px;
	display: inline;
	padding: 2px;
	margin: 8px;
}
.cell {
	background-color: yellow;
	border-radius: 100px;
	display: inline;
	position: fixed;
	top: 0;
	left: 0;
	width: 1px;
	height: 1px;

}

.virus {
	background-color: blue;
	border-radius: 100px;
	display: inline;
	position: fixed;
	top: 0;
	left: 0;
	width: 1px;
	height: 1px;

}

.background {
	width: 640px;
	height: 480px;
}
</style>
</head>
<body>
<div class="background">
	<div class="button" id="spawnCell">Spawn Cell</div><div class="button" id="spawnVirus">Spawn Virus</div>

</div>



	<?php
	//Functions
	function sum($num1, $num2) {
		$result = $num1 + $num2;
		return $result;
	}

	function clearFloatingPoint($num) {
		if ($num > 0) return floor($num);
		if ($num < 0) return floor($num);
	}
	?>

	<h1>PHP Testing Zone</h1>
	<p>Result of sum(5,3): <?php echo sum(5,3); ?></p>
	<p>Result of sum(5):   <?php echo sum(5);   ?></p>
	<p>Result of sum():    <?php echo sum();    ?></p>

	<p>Clear floating point of 1.2345: <?php echo clearFloatingPoint(1.2345) ?></p>
	<p>Clear floating point of -6.789: <?php echo clearFloatingPoint(6.789) ?></p>

	<?php
	echo rand(1,19);
	?><br>
	<?php
	echo mt_rand(1,19);
	?><br>




<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
<script>
function collision(fromX, fromY, fromH, fromW, toX, toY, toH, toW) {
	var minFromX = fromX - fromW;
	var maxFrom = fromX + fromW;
}

function Cell(x, y, width, height, isVirus) {
	this.x = x || 1024*Math.random();
	this.y = y || 768*Math.random();
	this.height = width || Math.ceil(32*Math.random());
	this.width = this.height;

	this.motionX = (Math.random()-0.5) * 16;
	this.motionY = (Math.random()-0.5) * 16;

	this.virus = isVirus;
	this.age = 1;

	
	if (isVirus) {
		this.element = $('<div class="virus"></div>');
	}
	else {
		this.element = $('<div class="cell"></div>');
	}
	$('.background').after(this.element);
}
var cells = [];

function spawnCell(x, y, width, height) {
	cells[cells.length] = new Cell(x, y, width, height);
}

function spawnVirus(x, y, width, height) {
	cells[cells.length] = new Cell(x, y, width, height, true);
}

function spawn() {
	var randie = Math.floor(Math.random()*3);
	if (randie == 1) spawnCell();
	if (randie != 1) spawnVirus();
}
function kill(id) {
	$(cells[id].element[0]).remove();

	cells = cells.splice(id, 1);
}

function moveCells() {
	for (var c in cells) {
		var cc = cells[c];
		var mass = cc.width + cc.height;


		cc.x += cc.motionX / cc.width;
		cc.y += cc.motionY / cc.height;

		positionCell(c);

	}
}
function positionCell(id) {
	pc = cells[id];
	pc.element[0].style.top = pc.y+'px';
	pc.element[0].style.left = pc.x+'px';
	pc.element[0].style.width = pc.width+'px';
	pc.element[0].style.height = pc.height+'px';
	pc.age += 0.15;

	if (pc.virus) {
		var val = Math.sin(pc.age) * 50;
		pc.element[0].style.borderRadius = val+'%';
	}
}
function divide(id) {
	console.log(cells.length+' length');

	where = cells[id].element[0];

	var parentX = Math.floor(cells[id].x);
	var parentY = Math.floor(cells[id].y);
	var parentW = cells[id].width;
	var parentH = cells[id].height;

	console.log(parentX+' '+parentY+' '+parentW+' '+parentH);

	if (cells[id].virus) {
		console.log('Is virus');
		spawnVirus(parentX, parentY, parentW, parentH);
		spawnVirus(parentX, parentY, parentW, parentH);
	}
	else {
		console.log('Is a cell');
		spawnCell(parentX, parentY, parentW, parentH);
		spawnCell(parentX, parentY, parentW, parentH);
	}

	console.log(cells.length+' length');
	kill(id);
}

var t = setInterval(moveCells, 100);

var tt = setInterval(spawn, 1000);


$(document).ready(function() {
	$('#spawnCell').click(function() {
		spawnCell();
	});

	$('#spawnVirus').click(function() {
		spawnVirus();
	});
	
});

</script>
</body>
</html>