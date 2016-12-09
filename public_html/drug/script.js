var changelog = [
	'a Alpha',
];

var drugs = [
	{'name': translate('Marihuana|Marijuana'), 'basePrice': 9.1},
	{'name': translate('Opio|Opium'), 'basePrice': 29},
	{'name': translate('Éxtasis|Ecstasy'), 'basePrice': 19},
	{'name': translate('Heroina|Heroin'), 'basePrice': 91},
	{'name': translate('Metanfetamina|Meth'), 'basePrice': 108},
	{'name': translate('Cocaína|Cocaine'), 'basePrice': 80},
	{'name': translate('Ketchupaína|Ketchupaine'), 'basePrice': 10},
	{'name': translate('Azúcar|Sugar'), 'basePrice': 1.8},
	{'name': 'Chocolate', 'basePrice': 5.65},
];

var nextpricechange = 1000;
var moneygraph = [];
var graph;

function increaseValue(num) {
	drug.value += num;
	update('game_value');
}
function resetVariables() {
	if (!drug.value) drug.value = 0;
	if (!drug.prices) {
		drug.prices = [];
		for (var d in drugs) drug.prices[d] = drugs[d].basePrice;
	}
	if (drug.money == undefined || drug.money == NaN || drug.money == null) drug.money = 3000;
	if (drug.inventory == undefined) drug.inventory = [];
	if (drug.lastprice == undefined) drug.lastprice = [];

	displayDrugs();
}
function displayDrug(drugID) {
	var d = document.createElement('drug');
	d.id = 'drugholder_'+drugID;
	var drug = drugs[drugID];
	d.innerHTML = drug.name+' (x<span id="amt_'+drugID+'"></span>) <span class="bestprice" id="bestprice_'+drugID+'"></span> <br>'+
	'<div class="btn btn-primary" onclick="buyDrug('+drugID+')" id="buybtn_'+drugID+'">'+translate('Comprar|Buy')+'</div>'+
	'<div class="btn btn-primary" onclick="buyDrug('+drugID+', \'a\')" id="abuybtn_'+drugID+'"></div><br>'+

	'<div class="btn btn-warning" onclick="sellDrug('+drugID+')" id="sellbtn_'+drugID+'">'+translate('Vender|Sell')+'</div>'+
	'<div class="btn btn-warning" onclick="sellDrug('+drugID+', \'a\')" id="asellbtn_'+drugID+'"></div>'+

	'<div id="graph_'+drugID+'></div>';

	doc('drugholder').appendChild(d);
	updateDrug(drugID);
}
function buyDrug(drugID, amt = 1, peek) {
	var pr = getDrugPrice(drugID).buy
	if (amt == 'a') {
		amt = Math.floor((drug.money * 1) / pr);
		if (amt < 1) amt = 1;
		if (peek) return amt;
	}
	var price = (pr * amt);
	if (drug.money >= price) {
		drug.money -= price;
		drug.inventory[drugID] += amt;

		drug.lastprice[drugID] = pr;
	}
}
function sellDrug(drugID, amt = 1, peek) {
	if (amt == 'a') amt = drug.inventory[drugID];
	if (amt == undefined) amt = 0;
	var price = (getDrugPrice(drugID).sell * amt);

	if (peek) return price;
	if (drug.inventory[drugID] >= amt) {
		drug.money += price;
		drug.inventory[drugID] -= amt;

		if (drug.inventory[drugID] <= 0) drug.lastprice[drugID] = undefined;
	}
}
function getDrugPrice(drugID) {
	var actualPrice = drug.prices[drugID];
	return {
		'buy': round(actualPrice),
		'sell': round(actualPrice),
	};
}
function updateDrug(drugID) {
	if (drug.prices[drugID] == undefined) drug.prices[drugID] = drugs[drugID].basePrice;
	var dn = doc('drugprice_'+drugID);

	var price = getDrugPrice(drugID);

	var realprice = drug.prices[drugID];

	var actualPrice = price.buy;
	var sellPrice = price.sell;

	var bprice = drugs[drugID].basePrice;
	var lastprice = drug.lastprice[drugID];
	if (drug.inventory[drugID] == undefined) drug.inventory[drugID] = 0;

	var dn = doc('amt_'+drugID);
	if (dn) {
		var ex = (lastprice != undefined) ? ' $'+lastprice.toFixed(2) : '';
		dn.innerHTML = drug.inventory[drugID]+ex;

	}
	var bcolor = (realprice < bprice && drug.inventory[drugID] <= 0) ? 'btn btn-primary' : 'btn btn-default';

	var dn = doc('drugholder_'+drugID);
	if (dn) {
		if (drug.trends == undefined) drug.trends = [];
		if (drug.trends[drugID] == undefined) drug.trends[drugID] = 0;
		var trend = drug.trends[drugID];

		dn.className = '';

		if (trend < 0) dn.className = 'trend_down';
		if (trend > 0) dn.className = 'trend_up';
	}

	var dn = doc('bestprice_'+drugID);
	if (dn) {
		dn.innerHTML = ((actualPrice / bprice)*100).toFixed(2)+'%';
		if (actualPrice > bprice) dn.style.color = 'rgb(0, '+Math.floor(((actualPrice / bprice) - 1) * 255)+', 0)';
		if (actualPrice < bprice) dn.style.color = 'rgb('+Math.floor(((bprice / actualPrice) - 1) * 255)+', 0, 0)';
	}

	var dn = doc('buybtn_'+drugID);
	if (dn) {
		dn.style.opacity = 1;
		if (actualPrice > drug.money) dn.style.opacity = 0.5;
		dn.innerHTML = translate('Comprar|Buy')+' ($'+actualPrice.toFixed(2)+')';
		dn.className = bcolor;
	}

	var dn = doc('abuybtn_'+drugID);
	if (dn) {
		dn.style.opacity = 1;
		var abamt = buyDrug(drugID, 'a', 1);
		var abprice = actualPrice * abamt;
		if (abprice > drug.money || abamt <= 0) dn.style.opacity = 0.5;
		dn.innerHTML = translate('Comprar '+abamt+'|Buy '+abamt)+' ($'+abprice.toFixed(2)+')';
		dn.className = bcolor;
	}

	var dn = doc('sellbtn_'+drugID);
	if (dn) {
		dn.style.opacity = 1;
		if (drug.inventory[drugID] <= 0) dn.style.opacity = 0.5;
		dn.innerHTML = translate('Vender|Sell')+' ($'+sellPrice.toFixed(2)+')';

		if (lastprice != undefined) {
			if (sellPrice > lastprice) dn.className = 'btn btn-success';
			if (sellPrice <= lastprice) dn.className = 'btn btn-danger';
		}
	}

	var dn = doc('asellbtn_'+drugID);
	if (dn) {
		dn.style.opacity = 1;
		if (drug.inventory[drugID] <= 0) dn.style.opacity = 0.5;
		var asprice = sellDrug(drugID, 'a', 1);
		dn.innerHTML = translate('Vender Todo|Sell All')+' ($'+asprice.toFixed(2)+')';

		if (lastprice != undefined) {
			if (sellPrice > lastprice) dn.className = 'btn btn-success';
			if (sellPrice <= lastprice) dn.className = 'btn btn-danger';
		}
	}
}
function updateGraph() {
	if (drug.moneyrecord == undefined) drug.moneyrecord = drug.money;
	moneygraph.push(drug.money);
	if (moneygraph.length > 1000) moneygraph.splice(0, 1);
	if (drug.money > drug.moneyrecord) drug.moneyrecord = drug.money;
}
function updateDrugs() {
	var pc = false;
	nextpricechange -= 50;
	pricechange.style.width = ((nextpricechange / 1000) * 100)+'%';
	if (nextpricechange <= 0) {
		nextpricechange = 1000;
		pc = true;
	}

	if (drug.trends == undefined) drug.trends = [];
	for (var e in drugs) {
		if (pc) {
			updateGraph();
			if (drug.trends[e] == undefined) drug.trends[e] = 0;
			var trend = drug.trends[e];
			drug.prices[e] = marketPrice(drug.prices[e], drugs[e].basePrice, trend);
			if (rand(1,10) == 1 && !trend) {
				var v = red(-3, 3);
				do {
					if (v < 0) v--;
					if (v > 0) v++;
				} while (rand(0,1));
				drug.trends[e] = v;
				if (v > 0) flashText('#drugholder_'+e, translate('¡Subida de precio!|Price rise!'), 'green');
				if (v < 0) flashText('#drugholder_'+e, translate('¡Bajada de precio!|Price fall!'), 'red');
			}
			if (drug.trends[e] > 0) {
				drug.trends[e]--;
				if (drug.trends[e] == 0) flashText('#drugholder_'+e, translate('Precio se estabiliza.|Price stabilizes.'));
			}
			if (drug.trends[e] < 0) {
				drug.trends[e]++;
				if (drug.trends[e] == 0) flashText('#drugholder_'+e, translate('Precio se estabiliza.|Price stabilizes.'));
			}
		}
		updateDrug(e);
	}
	mymoney.innerHTML = '$'+shortNum(drug.money);
	graph = marketGraph(moneygraph, 1366, 96, 0);
	doc('mygraph').innerHTML = '';
	doc('mygraph').appendChild(graph);
}
function displayDrugs() {
	for (var e in drugs) displayDrug(e);
}
function saveGame() {
	localStorage.setItem('drug', JSON.stringify(drug));
	notification('Game Saved');
}
function loadGame() {
	var losto = localStorage.getItem('drug');
	if (!losto) return;
	drug = JSON.parse(losto);
	notification('Game Loaded');
}
function update(step) {
	document.title = gameInfo.name+' '+gameInfo.version;
}

var drug = {};
var gameInfo = {
	'name': 'Template',
	'version': changes(changelog).latestVersion,
	'changelog': changes(changelog).changelog,
}
loadGame();
resetVariables();
update();
var t = setInterval(saveGame, 60000);
setInterval(updateDrugs, 100);