var stalk = {};
stalk.turnips = 0;
stalk.money = 3000;
stalk.day = 12;

stalk.turnip = {};
stalk.turnip.price = rand(90, 110);
stalk.turnip.pattern = rand(0,3);
stalk.turnip.spikeDay = rand(0,7);
stalk.turnip.highest = rand(250,600);

/*
Patterns:
0 - Decreasing
1 - Big Spike
2 - Small spike
3 - Random
*/

/*
There are 12 prices, 2 each day.
Spike days:
Value          Spikes
0              0,1,2,3,4
1              1,2,3,4,5
2              2,3,4,5,6
3              3,4,5,6,7
4              4,5,6,7,8
5              5,6,7,8,9
6              6,7,8,9,10
7              7,8,9,10,11
*/

/*
Days:
0,1 - Monday (AM, PM)
2,3 - Tuesday
4,5 - Wednesday
6,7 - Thursday
8,9 - Friday
10,11 - Saturday
12,13 - Sunday

*/

function updateHUD() {
	drawShops();

	moneyBag.className = 'sprite sprite_bag99k';
	if (stalk.money < 99000) {
		moneyBag.className = 'sprite sprite_bag10k';
	}
	if (stalk.money < 10000) {
		moneyBag.className = 'sprite sprite_bag1k';
	}
	if (stalk.money < 1000) {
		moneyBag.className = 'sprite sprite_bag100';
	}


	moneyValue.innerHTML = stalk.money;
	turnipValue.innerHTML = stalk.turnips;
	dayValue.innerHTML = 'Hoy es '+dayToString(stalk.day);
	turnipPrice.innerHTML = 'Precio de los nabos: '+stalk.turnip.price;

	var exClassBuy = '';
	var exClassSell = '';

	buyPrice.innerHTML = (parseInt(toBuy.value)) * stalk.turnip.price;
	sellPrice.innerHTML = (parseInt(toSell.value)) * stalk.turnip.price;
}
function sleep() {
	stalk.day++;
	if (stalk.day >= 14) newWeek();
	stalk.turnip.price = getNewTurnipPrice(stalk.turnip);

	if (stalk.day == 12) {
    	var tur = stalk.turnips;
    	notification('Tus '+tur+' nabos se han podrido.');
    	stalk.turnips = 0;
    }

	updateHUD();
}
function newWeek() {
	stalk.day = 0;
	stalk.turnip.highest = rand(250,600);
	stalk.turnip.pattern = rand(0,3);
    stalk.turnip.spikeDay = rand(0,7);
}
function getNewTurnipPrice(turnipObj) {
	var pat = turnipObj.pattern;
	var sd = turnipObj.spikeDay;
	var price = turnipObj.price;
	var day = stalk.day;

	if (day == 12) return rand(90, 110);

	if (pat == 3) return rand(50, 200);

	if (pat != 3) {
		var add = rand(2,7);
		price -= add;
		if (pat > 0) {
			var spikePhase = getSpikeDay(stalk.day, sd);
			if (spikePhase > 0) {
				var percent = spikePhaseToPercent(spikePhase, pat);
				var addy = 100;
				if (spikePhase == 5) addy = 50;
				var targ = Math.ceil((stalk.turnip.highest * percent) + addy);
				price = targ;
			}
		}
		if (price < 20) price = 20;
	}
	return price;
}
function getSpikeDay(day, spikeDay) {
	if (day == spikeDay) return 1;
	if ((day-1) == spikeDay) return 2;
	if ((day-2) == spikeDay) return 3;
	if ((day-3) == spikeDay) return 4;
	if ((day-4) == spikeDay) return 5;
	return 0;
}
function spikePhaseToPercent(spikePhase, pattern) {
	var percents = [
	0, //No spike in decreasing pattern
	[0, 0.25, 0.5, 1, 0.33, 0.11],
	[0, 0.06, 0.12, 0.25, 0.5, 0.16],
	0, //No spike in random pattern
	];
	return percents[pattern][spikePhase];
}
function dayToString(day) {
	var days = [
	'Lunes Mediodía', 'Lunes Tarde',
	'Martes Mediodía', 'Martes Tarde',
	'Miércoles Mediodía', 'Miércoles Tarde',
	'Jueves Mediodía', 'Jueves Tarde',
	'Viernes Mediodía', 'Viernes Tarde',
	'Sábado Mediodía', 'Sábado Tarde',
	'Domingo Mediodía', 'Domingo Tarde'
	];
	return days[day];
}
function drawShops() {
	console.log(stalk.day);
	turnipSell.style.visibility = 'visible';
	turnipBuy.style.visibility = 'hidden';
	if (stalk.day >= 12) {
		turnipSell.style.visibility = 'hidden';
		turnipBuy.style.visibility = 'visible';
	}
	if (stalk.day == 13) {
		turnipBuy.style.visibility = 'hidden';
	}
}
function buyEm() {
	var qty = parseInt(toBuy.value);
	var price = qty * stalk.turnip.price;
	if (stalk.money < price) {
		notification('No tienes suficientes bayas.');
		return;
	}
	stalk.turnips += qty;
	stalk.money -= price;
}
function sellEm() {
	var qty = parseInt(toSell.value);
	var price = qty *  stalk.turnip.price;
	if (stalk.turnips < qty) {
		notification('No tienes suficientes nabos.');
		return;
	}
	stalk.turnips -= qty;
	stalk.money += price;
}
updateHUD();

setInterval(updateHUD, 100);