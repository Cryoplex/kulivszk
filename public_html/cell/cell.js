function drawCell(generation, strain, mutation) {
	var l = 'cell_g'+generation+'_s'+strain+'_m'+mutation;
	return '<i class="cell '+l+'"></i>';
}
function createBody(width, height) {
	var a = [];
	var hw = Math.floor(width / 2);
	var hh = Math.floor(height / 2);
	for (var h = 0; h < height; h++) {
		a[h] = [];
		for (var w = 0; w < width; w++) {
			a[h][w] = (w == hw && h == hh) ? 1 : 0;
		}
	}
	return a;
}
function drawBody(array, hue, sat) {
	var l = '<cell style="width: '+(array.length * 4)+'px; height: '+(array[0].length * 4)+'px">';
	for (var h in array) {
		for (var w in array[h]) {
			var thisPixel = array[h][w];
			if (thisPixel > 0) {
				var lum = (thisPixel == 1) ? '40%' : '60%';
				var bgc = 'hsla('+hue+', '+sat+'%, '+lum+', 0.8)';
				l += '<pixel class="pixel_'+thisPixel+'" style="top: '+(h * 4)+'px; left: '+(w * 4)+'px; background-color: '+bgc+'"></pixel>'
			}
		}
	}
	l += '</cell>';
	return l;
}
function evolveBody(cell, shape) {
	var rp = selectRandomPixel(cell);
	var ras = randomAvailableSpace(cell, rp, shape);

	cell = changePixel(cell, ras, 1);
	redraw(cell);
	return cell;
}
function changePixel(cell, pixel, newPixel) {
	if (cell[pixel.height] == undefined) {
		cell = expandArray(cell, 0);
		pixel.width++;
		pixel.height++;
	}
	if (cell[pixel.height][pixel.width] == undefined) {
		cell = expandArray(cell, 0);
		pixel.width++;
		pixel.height++;
	}
	cell[pixel.height][pixel.width] = newPixel;
	return cell;
}
function redraw(cell) {
	for (var h in cell) {
		for (var w in cell[h]) {
			var s = getSurroundings(cell, loc(w, h));
			if (s.condition == 'surrounded') changePixel(cell, loc(w, h), 2);
			if (s.condition == 'nucleus') changePixel(cell, loc(w, h), 3);
		}
	}
}
function selectRandomPixel(cell) {
	var allPixels = [];

	for (var h in cell) {
		for (var w in cell[h]) {
			var surr = getSurroundings(cell, loc(w, h));
			if (surr.condition == 'available' && getPixel(cell, loc(w, h)) > 0) allPixels.push(loc(w, h));
		}
	}
	var randomPixel = read(allPixels);
	return randomPixel;
}
function randomShape(top, left, right, bottom) {
	var sh = {
		'top': Math.random(),
		'left': Math.random(),
		'right': Math.random(),
		'bottom': Math.random(),
	}
	if (top != undefined) sh.top = top;
	if (left != undefined) sh.left = left;
	if (right != undefined) sh.right = right;
	if (bottom != undefined) sh.bottom = bottom;

	return sh;
}
function randomByShape(shape) {
	var total = shape.top + shape.left + shape.right + shape.bottom;
	var r = Math.random() * total;
	if (r <= shape.top) return 'top';
	if (r <= (shape.top + shape.left)) return 'left';
	if (r <= (shape.top + shape.left + shape.right)) return 'right';
	return 'bottom';
}
function getCenter(cell) {
	var hh = Math.floor(cell.length / 2);
	var wh = Math.floor(cell[0].length / 2);
	return loc(wh, hh);
}
function where(cell, pixel) {
	var c = getCenter(cell);
	var pos = [];
	if (pixel.width > c.width) pos.push('right');
	if (pixel.width < c.width) pos.push('left');
	if (pixel.height > c.height) pos.push('bottom');
	if (pixel.height < c.height) pos.push('top');
	if (pos.length == 0) pos.push('top');
	return read(pos);
}
function randomAvailableSpace(cell, pixel, shape) {
	var surr = getSurroundings(cell, pixel);
	var avs = [];
	var dirs = getDirections();

	var avsbydir = {
		'top': [], 'left': [], 'right': [], 'bottom': []
	};

	for (var d in dirs) {
		var dir = dirs[d];
		var newLocation = loc(pixel.width, pixel.height, dir);
		var wh = where(cell, newLocation);
		if (surr[dir] == 0) {
			avs[parseInt(d)] = newLocation;

			avsbydir[wh].push(newLocation)
		}
	}
	var avs2 = [];
	for (var a in avs) {
		if (avs[a] != undefined) avs2.push(avs[a]);
	}
	var rbs = randomByShape(shape);
	var selected = avsbydir[rbs];
	selected = read(selected);
	if (selected != undefined) {
		return selected;
	}
	
	return read(avs2);
}
function getDirections() {
	return ['top', 'left', 'right', 'bottom'];
}
function getSurroundings(cell, pixel) {
	var surr = {};
	var dirs = getDirections();
	for (var d in dirs) {
		var dir = dirs[d];
		surr[dir] = getPixel(cell, loc(pixel.width, pixel.height, dir));
	}
	surr.condition = '';

	if (surr.top > 0 && surr.left > 0 && surr.right > 0 && surr.bottom > 0) surr.condition = 'surrounded';
	if (surr.top > 1 && surr.left > 1 && surr.right > 1 && surr.bottom > 1 && rand(0,1)) surr.condition = 'nucleus';
	if (surr.top == 0 || surr.left == 0 || surr.right == 0 || surr.bottom == 0) surr.condition = 'available';
	return surr;
}
function getPixel(cell, pixel) {
	if (!cell[pixel.height]) return 0;
	if (!cell[pixel.height][pixel.width]) return 0;
	return cell[pixel.height][pixel.width];
}
function loc(width, height, direction) {
	var nuwidth = width;
	var nuheight = height;

	if (direction == 'top') nuheight--;
	if (direction == 'left') nuwidth--;
	if (direction == 'right') nuwidth++;
	if (direction == 'bottom') nuheight++;
	return {
		'width': nuwidth,
		'height': nuheight,
	}
}
function expandArray(array, empty) {
	//Add empty line top
	var n = [];
	for (var x in array[0]) n[x] = empty;

	//Add empty line bottom
	array = [n].concat(array);
	array.push(n);

	//Add empty line left and right
	for (var e in array) {
		array[e] = [empty].concat(array[e]);
		array[e].push(empty);
	}
	return array;
}

//***** DEBUG FUNCTIONS *****
function testEvolution(generations, shape) {
	var origin = createBody(3, 3);
	if (shape == undefined) shape = randomShape();
	var evo = '';
	for (var g = 0; g < generations; g++) {
		evo += '<gen><sup>'+romanNumber((g + 1))+'</sup> ';
		evo += drawBody(origin)+'</gen>';
		origin = evolveBody(origin, shape);
	}
	document.body.innerHTML = evo;

	return origin;
}
function renew(array, shape) {
	array = evolveBody(array, shape);
	document.body.innerHTML = drawBody(array);
}
function buyCell(price) {
	if (cell.money < price) return;
	cell.money -= price;
	addBacteria();
}
function resetAll() {
	cell = {};
	doc('gaem').innerHTML = '';
	resetVariables();
	saveGame();
}