var changelog = [
'-- Alpha',
'- Added Ads',
'- Added referrals',
'-- Changed max ads to 240',
'- Added Barker',
'- Added a tutorial',
'-- Fixed a bug with multi level referrals',
'- Added upgrades (beta)',
'-- Fixed a bug that did not load tutorial',
'ax Fixed random stuff.',
'ab Fixed upgrades not working properly.',
];

var BASE_AD_VALUE = 0.0001;
var BASE_REFER_VALUE = BASE_AD_VALUE / 500;
var BASE_UPGRADE_VALUE = 0.001;
var MONEY_LOSS_PER_REFER_TIER = 0.5;
var MAX_ADS_SHOWN = 240;
var DELAY_PER_BARK = 10000;

var nextBark = 0;
var autobark = 3000;

var moneyps = 0;
var lastmoney = [];

function resetVariables() {

}
function saveGame() {
	localStorage.setItem('game', JSON.stringify(game));
	notification('Game Saved');
}
function loadGame() {
	var losto = localStorage.getItem('game');
	if (!losto) return;
	game = JSON.parse(losto);
	notification('Game Loaded');
}
function update(step) {
	document.title = gameInfo.name+' '+gameInfo.version;

	if (game.bux == undefined) game.bux = {};

	if (step == 'reg') {
		if (!game.register) {
			ggoto('home');
			navbar_before_reg.style.display = 'block';
		}
		if (game.register) {
			ggoto('realGame');
			navbar_before_reg.style.display = 'none';
			navbar_after_reg.style.display = 'block';
		}

		if (game.bux.tutorial == undefined) game.bux.tutorial = 0;
		if (game.bux.tutorial == 0) {
			setTimeout(function() {
				newTutorial(0);
			}, 1000);
		}
	}
	if (step == 'myMoney' || !step) {
		if (game.bux.money == undefined) game.bux.money = 0;
		game.bux.money = parseFloat(game.bux.money);
		myMoney.innerHTML = translate(game.bux.money.toFixed(8)+'ç|ç'+game.bux.money.toFixed(8));

		if (doc('refer_button')) getReferButtonClass();
		if (doc('bark_button')) getBarkButtonClass();
	}
	if (step == 'barker' || !step) {
		if (game.bux.barks == undefined) game.bux.barks = 0;
		if (game.bux.followers == undefined) game.bux.followers = 0
		bark_barks.innerHTML = 'Barks: '+game.bux.barks;
		bark_followers.innerHTML = translate('Seguidores: |Followers: ')+shortNum(game.bux.followers);
	}
	if (step == 'refer' || !step) {
		var lg = '<h3>'+translate('Referidos|Referrals')+'</h3>';
		var price = getReferralPrice();
		var btnclass = (game.bux.money >= price) ? 'btn-success' : 'btn-danger';
		lg += '<div class="btn '+btnclass+'" onclick="buyReferral()" id="refer_button">'+translate('Comprar un Referido ('+price.toFixed(8)+'ç)|Buy a Referer (ç'+price.toFixed(8)+')')+'</div><br><br>';

		for (var po = 0; po < 10; po++) {
			var p = Math.pow(10, po);
			if (referButton(p, 1)) lg += referButton(p);
		}

		for (var r in game.bux.refer) {
			var rr = game.bux.refer[r];
			if (rr > 0) lg += '<div class="referr">'+translate('Referidos Nivel '+romanNumber((parseInt(r) + 1))+'|'+romanNumber((parseInt(r) + 1))+' Level Referrals')+': '+rr+' '+getReferCPT(r)+'</div>';
		}

		game_refer.innerHTML = lg;
	}
	if (step == 'ads' || !step) {
		var lg = '';
		var lu = '';
		for (var u in getUpgrades()) {
			lu += displayUpgrade(u)+'<br>';
		}
		lu = '<h4>'+translate('Mejoras|Upgrades')+'</h4>'+lu;

		lg += '<h3>'+translate('Lista de Anuncios|Ad List')+'</h3>';
		for (var a in game.bux.ads) {
			var has = game.bux.ads[a].length;
			var rar = getAdRarity(a);
			if (has) lg += ' ';
			for (var aa in game.bux.ads[a]) {
				lg += displayAd(game.bux.ads[a][aa], a, aa);
			}
		}


		doc('game_ads').innerHTML = lg;
		doc('game_upgrades').innerHTML = lu;
	}



	playerName.innerHTML = translate('Bienvenido, |Welcome, ')+game.userName;
}
function referButton(amt, peek) {
	if (!amt) amt = 1;

	var price = getReferralPrice(amt);
	if (peek) {
		return (game.bux.money >= price);
	}
	var btnclass = (game.bux.money >= price) ? 'btn-success' : 'btn-danger';
	return '<div class="btn '+btnclass+'" onclick="buyReferral('+amt+')" id="refer_button">'+translate('Comprar '+amt+' Referido ('+price.toFixed(8)+'ç)|Buy '+amt+' Referer (ç'+price.toFixed(8)+')')+'</div><br><br>';
}
function arrows() {
	return '<span class="arrow_1">&gt</span><span class="arrow_2">&gt</span><span class="arrow_3">&gt</span>';
}
function getUpgrades() {
	return {
		'ad_value': {
			'desc': translate('Aumenta el dinero obtenido por cada anuncio. \
				|Increases money obtained with each ad by.'),
			'name': translate('Pastizal|Pastureland'),
			'bonus': 'x'+(getUpgradeBonus('ad_value')).toFixed(2)+' '+arrows()+' '+'x'+(getUpgradeBonus('ad_value', 1).toFixed(2))
		},
		'ad_chance': {
			'desc': translate('Aumenta la cantidad de anuncios al resetear. \
				|Increases ads shown upon resetting.'),
			'name': translate('Publicista Profesional|Pro Advertiser'),
			'bonus': '~'+(getUpgradeBonus('ad_chance'))+' '+arrows()+' '+'~'+(getUpgradeBonus('ad_chance', 1))
		},
		'refer_discount': {
			'desc': translate('Reduce el precio de los referidos. \
				|Decreases referral price.'),
			'name': translate('No vales Nada|You are Worth Nothing'),
			'bonus': 'x'+(getUpgradeBonus('refer_discount').toFixed(8))+' '+arrows()+' '+'x'+(getUpgradeBonus('refer_discount', 1).toFixed(8))
		},
		'refer_popularity': {
			'desc': translate('Aumenta los referidos de niveles superiores que consigues pasivamente. \
				|Increases the higher level referrals that you get passively.'),
			'name': translate('Sistema Piramidal|Pyramid Scheme'),
			'bonus': '~'+(getUpgradeBonus('refer_popularity').toFixed(1))+' '+arrows()+' '+'~'+(getUpgradeBonus('refer_popularity', 1).toFixed(1))
		},
		'refer_com': {
			'desc': translate('Aumenta la comisión que recibes por cada referido. \
				|Increases commision received by each referral.'),
			'name': translate('Ascenso|Promotion'),
			'bonus': 'x'+(getUpgradeBonus('refer_com').toFixed(3))+' '+arrows()+' '+'x'+(getUpgradeBonus('refer_com', 1).toFixed(3))
		},
		'bark_popularity': {
			'desc': translate('Aumenta los seguidores que consigues de vez en cuando. \
				|Increases followers that you get sometimes.'),
			'name': 'Popular',
			'bonus': '~'+(getUpgradeBonus('bark_popularity'))+' '+arrows()+' '+'~'+(getUpgradeBonus('bark_popularity', 1))
		},
		'serial_barker': {'desc': 'Reduce el tiempo de espera entre Bark y Bark', 'name': translate('Ladrador en Serie|Serial Barker')},
		'ad_clicker': {'desc': 'Tus enlaces reciben más clicks', 'name': translate('Clicanuncios|Ad Clicker')},
		'autoclick': {'desc': 'Hace click automáticamente en anuncios', 'name': 'Autoclick'},
		'rare_ads': {'desc': 'Aumenta la probabilidad de anuncios raros', 'name': translate('Anuncios Raros|Rare Ads')},
		'autobark': {'desc': 'Barkea automáticamente cada cierto tiempo', 'name': 'Autobark'},
		'ad_fusion': {
			'desc': translate('Combina dos anuncios distintos para crear uno de mayor valor.|Combines two ads to form a higher value one.'),
			'name': translate('Fusión de Anuncios|Ad Fusion'),
			'bonus': getUpgradeBonus('ad_fusion')+' '+arrows()+' '+getUpgradeBonus('ad_fusion', 1),
		}
	}
}
function displayUpgrade(upgradeID) {
	if (game.bux.upgrades == undefined) game.bux.upgrades = {};
	if (game.bux.upgrades[upgradeID] == undefined) game.bux.upgrades[upgradeID] = 0;
	var price = getUpgradePrice(upgradeID);
	var exbtn = (game.bux.money >= price) ? 'btn-warning' : 'btn-danger';
	var ug = getUpgrades()[upgradeID];

	var price2 = game.bux.upgrades[upgradeID];
	var exbtn2 = (price2 > 0) ? 'btn-primary' : 'btn-danger';

	var ul = '<b>'+ug.name+'</b><sup id="upgrade_amt_'+upgradeID+'">'+game.bux.upgrades[upgradeID]+'</sup> <i>'+ug.desc+'</i><br>'+ug.bonus+'<br>';
	return '<upgrade>'+ul+' <div class="btn '+exbtn+'" id="upgrade_button_'+upgradeID+'" style="font-size: 10px" onclick="buyUpgrade(\''+upgradeID+'\')">'+translate('Comprar|Buy')+' (ç'+getUpgradePrice(upgradeID).toFixed(8)+')</div> <div class="btn '+exbtn2+'" id="upgrade_button_sell_'+upgradeID+'" style="font-size: 9px" onclick="sellUpgrade(\''+upgradeID+'\')">'+translate('Vender|Sell')+' (ç'+getUpgradePrice(upgradeID, 1).toFixed(8)+')</div></upgrade> ';
}
function updateUpgrade(upgradeID) {
	var price = getUpgradePrice(upgradeID);
	var exbtn = (game.bux.money >= price) ? 'btn-warning' : 'btn-danger';

	doc('upgrade_button_'+upgradeID).className = 'btn '+exbtn;
	doc('upgrade_button_'+upgradeID).innerHTML = translate('Comprar|Buy')+' (ç'+price.toFixed(8)+')';

	var price = game.bux.upgrades[upgradeID];
	var exbtn = (price > 0) ? 'btn-primary' : 'btn-danger';

	doc('upgrade_button_sell_'+upgradeID).className = 'btn '+exbtn;
	doc('upgrade_button_sell_'+upgradeID).innerHTML = translate('Vender|Sell')+' (ç'+getUpgradePrice(upgradeID, 1).toFixed(8)+')';

	doc('upgrade_amt_'+upgradeID).innerHTML = game.bux.upgrades[upgradeID];
}
function sellUpgrade(upgradeID) {
	if (game.bux.upgrades == undefined) game.bux.upgrades = {};
	if (game.bux.upgrades[upgradeID] == undefined) game.bux.upgrades[upgradeID] = 0;

	var price = getUpgradePrice(upgradeID, 1);

	if (game.bux.upgrades[upgradeID] < 1) return;
	increaseMoney(price);
	game.bux.upgrades[upgradeID]--;

	updateUpgrade(upgradeID);
}
function buyUpgrade(upgradeID, peek) {
	if (game.bux.upgrades == undefined) game.bux.upgrades = {};
	if (game.bux.upgrades[upgradeID] == undefined) game.bux.upgrades[upgradeID] = 0;

	var price = getUpgradePrice(upgradeID);
	var last = game.bux.upgrades[upgradeID];
	if (peek) return last;
	if (game.bux.money < price) return;
	increaseMoney(-price);
	game.bux.upgrades[upgradeID]++;

	updateUpgrade(upgradeID)
}
function getUpgradePrice(upgradeID, sellmode) {
	var level = game.bux.upgrades[upgradeID];
	var price = BASE_UPGRADE_VALUE * Math.pow(1.2, level);
	if (sellmode) price *= 0.25;

	return price;
}
function newTutorial(level) {
	if (!game.register) return;
	tutorial.style.display = 'inline-block';
	game.bux.tutorial = level;
	if (level == 0) {
		tutMessage('#game_ads', translate('Bienvenido a LemonBux. Mi nombre es Tucker, y en esta visita guiada, aprenderás cómo <span class="rarity_unique">SER MILLONARIO</span> en unos pocos segundos.|Welcome to LemonBux. My name is Tucker, and here, in this guided visit, you will learn how to <span class="rarity_unique">MAKE MILLIONS</span> in a few seconds.'));
		updateAds();
	}
	if (level == 1) {
		tutMessage('#ad_0_0', translate('^^^ Esto es un anuncio. Puedes hacer click en el para <span class="rarity_mythical">ganar dinero al instante</span>. Suena bien, ¿verdad? Pues agárrate el ojete que viene lo bueno.|^^^ This is an ad. You can click it to <span class="rarity_mythical">make money instantly</span>. Sounds good, right? Then hold your ass because here comes the funnier part.'));
	}
	if (level == 2) {
		tutMessage('#refer_button', translate('^^^ Puedes comprar referidos pulsando este botón. ¡Si! ¡Has oído bien! Puedes comprarlos por el módico precio de '+getReferralPrice().toFixed(8)+'ç, aunque por motivos de inflación, esa cantidad aumenta con el tiempo.<br><br>Los referidos harán click en anuncios por tí, y te harán <span class="rarity_mythical">ganar dinero pasivamente</span>|^^^ You can buy referrals by clickin this button. YEAH, you heard right! You can buy them by just ç'+getReferralPrice().toFixed(8)+', but, because of inflation, their price increase each time.<br><br>Anyways, the are a good investment. Because, they click ads for you, <span class="rarity_mythical">giving you money passively</span>'));
	}
	if (level == 3) {
		tutMessage('#game_barker', translate('^^^ \
			Por último, este es tu <span class="rarity_epic">Barker</span>. Aqui puedes Barkear lo que te de la gana, incluso \
			<span class="rarity_mythical">contarle al mundo que estás cagando</span>.<br><br> \
			La gente verá tus Barks, y a veces los Rebarkearán, haciendote ganar seguidores.<br><br> \
			Con el tiempo tus seguidores irán creciendo más y más, y podrás Barkear links.|^^^ \
			Finally, this is your <span class="rarity_epic">Barker</span>. Here you can Bark whatever you want, even \
			<span class="rarity_mythical">tell the world that you are having a poop</span>.<br><br> \
			People will see your Barks, and will Rebark sometimes, making you gain even more followers.<br><br> \
			Your followers will grow exponentially, and you will be able to Bark links.'));
	}
	if (level == 4) {
		tutMessage('#yourBark', translate('^^^ \
			Puedes escribir lo que quieras aquí, y pulsar el botón <span class="rarity_epic">Bark!</span> para Barkearlo.<br><br> \
			Como al principio no tendrás seguidores, es mejor que empieces Barkeando cualquier basura, y cuando tengas unos cuantos, puedes ir dejando links, ¡tal vez ganes algún que otro referido!<br> \
			Para Barkear un link, simplemente escribe <span class="rarity_legendary">http://www.cualquier.cosa</span> y pulsa el botón, amigo. \
			|^^^ You can write whatever you want here, and then click the <span class="rarity_epic">Bark!</span> button to Bark it.<br><br> \
			As you wont have any follower at start, you better Bark random shit, then, once you have some, you can pass some links, maybe you even get a referral this way!<br> \
			To Bark a link, just type <span class="rarity_legendary">http://www.what.ever</span> and press the button, mate.'));
	}
	if (level == 5) {
		tutMessage('#realGame', translate('Y aquí concluye el tutorial, espero que te lo hayas pasado bien, te animo a superarme y conseguir un millón de citros (ç). ¡No es nada difícil!|And here it ends this tutorial, I hope you had fun, and I encourage you to get a million of citros (ç). It is not difficult at all!'));
	}
	if (level >= 6) exitTutorial();
}
function exitTutorial() {
	game.bux.tutorial = 'done';
	tutorial.style.display = 'none';
}
function tutMessage(whereID, message) {
	var off = $(whereID).offset();
	tutorial.innerHTML = '<tut style="top: '+(off.top + 32)+'px; left: '+(off.left)+'px"><img src="img/tucker.png">   '+message+' <br><br><div class="btn btn-primary" onclick="newTutorial('+(game.bux.tutorial + 1)+')">'+translate('Siguiente|Next')+'</div> <div class="btn btn-default" onclick="exitTutorial()">'+translate('Salir del Tutorial|Exit Tutorial')+'</div></tut>';
}
function getBarkButtonClass() {
	var now = new Date();
	if (now.valueOf() >= nextBark) {
		bark_button.className = 'btn btn-success';
	}
	else {
		bark_button.className = 'btn btn-danger';
	}
}
function getReferButtonClass() {
	if (refer_button == undefined) return;
	var price = getReferralPrice();
	var btnclass = (game.bux.money >= price) ? 'btn-success' : 'btn-danger';
	refer_button.className = 'btn '+btnclass;
}
function clickAd(tier, id, del) {
	var whatAd = game.bux.ads[tier][id];
	if (whatAd != undefined) {
		if (!del) increaseMoney(whatAd.value);
		game.bux.ads[tier].splice(id, 1);
		update('ads');
	}
}
function getReferrals(num, barkermode) {
	var tier = 0;
	if (barkermode) tier = 0;
	if (game.bux.refer[tier] == undefined) game.bux.refer[tier] = 0;
	game.bux.refer[tier] += num;
}
function buyReferral(amt) {
	if (!amt) amt = 1;

	var price = getReferralPrice(amt);
	if (game.bux.money < price) return;
	increaseMoney(-price);
	getReferrals(amt);

	update('refer');
}
function getReferralPrice(qty) {
	if (game.bux.refer == undefined) game.bux.refer = [];
	if (game.bux.refer[0] == undefined) game.bux.refer[0] = 0;

	var totprice = 0;
	if (!qty) qty = 1;
	var pow = 1.1;
	var pow2 = 0.1;
	var mod = getUpgradeBonus('refer_discount');

	var want = Math.pow(pow, qty);
	var have = Math.pow(pow, game.bux.refer[0]);

	var price = (BASE_AD_VALUE * mod * (want * have)) / pow2;

	return price;
}
function increaseMoney(amount) {
	game.bux.money = parseFloat(game.bux.money);
	game.bux.money += Number(amount);
	update('myMoney');
	
	for (var u in getUpgrades()) {
		updateUpgrade(u);
	}
}
function bark() {
	var d = new Date().valueOf();
	if (nextBark == undefined) nextBark = 0;
	if (nextBark > d) {
		bark_info.innerHTML = translate('Por favor espera un poco antes de Barkear otra vez.|Please wait a bit before Barking again.');
		setTimeout(function() {
			bark_info.innerHTML = '';
		}, 3000);
		return;
	}
	var serial = Math.pow(0.9, buyUpgrade('serial_barker', true));
	nextBark = d += (DELAY_PER_BARK * serial);

	var b = yourBark.value;
	var hasLink = false;
	if (b.match('http://')) hasLink = true;
	if (b) {
		latestBarks.innerHTML = newBark(game.userName, b) + latestBarks.innerHTML;
		game.bux.barks++;
	}
	update('barker');
	var tim = rand(5, 30) * 1000;
	setTimeout(function() {
		newBarker(hasLink);
	}, tim);

	update('barker');
}
function newBark(from, text) {
	var d = new Date();
	d = d.getHours()+':'+d.getMinutes()
	return '<bark><b>'+from+'</b> <sub>at '+d+'</sub><br><quote>"'+text+'"</quote></bark>';
}
function newBarker(link) {
	var val = 0;
	while (rand(0,1) && !link) val++;
	val += rand(0, getUpgradeBonus('bark_popularity'));
	var msg = '';
	if (val > 0) msg += addBarkerFollowers(val, true);
	if (link) {
		var c = rand(0, (Math.ceil(game.bux.followers / 10)));
		c += rand(0, (buyUpgrade('ad_clicker', true) * 10));
		if (c) {
			var cx = rand(0, Math.ceil(c / 10));
			cx += rand(0, buyUpgrade('ad_clicker', true));
			if (cx) {
				msg += c+translate(' usuarios hicieron click en tu enlace.<br>¡Has conseguido '+cx+' referido(s)!| users clicked your link.<br>You have '+cx+' new referral(s)!');
				getReferrals(cx, true);
				update('refer');
			}
			else {
				msg += c+translate(' usuarios hicieron click en tu enlace.| users clicked your link.');
			}
		}
	}
	if (msg) notification(msg);

	update('barker');
}
function displayAd(adObject, tier, id) {
	return '<ad id="ad_'+tier+'_'+id+'" onclick="clickAd('+tier+', '+id+')" class="'+getAdRarity(tier).color+'">'+adObject.name+'<br><br>ç'+adObject.value+'</ad>';
}
function updateAds() {
	if (game.bux == undefined) game.bux = {};
	if (game.bux.ads == undefined) game.bux.ads = [[new ad()]];
	var total = 0;
	for (var a = 0; a <= 9; a++) {
		if (game.bux.ads[a] == undefined) game.bux.ads[a] = [];
		total += game.bux.ads[a].length;
	}
	if (total < MAX_ADS_SHOWN) {
		do {
			addNewAd();
		} while (rand(0,1));
		for (var aaa = 0; aaa < getUpgradeBonus('ad_chance'); aaa++) addNewAd();
	}
	for (var aaa = 0; aaa < getUpgradeBonus('ad_fusion'); aaa++) fusionAd();

	referTiers();

	update('ads');
}
function updateMoneyps() {
	if (rand(0,1)) return;
	var nowm = game.bux.money;
	if (!lastmoney) lastmoney = [nowm];
	var change = nowm - lastmoney[0];

	if (!moneyps) moneyps = 0;
	var mps = 0;
	for (var lm in lastmoney) {
		var c = lastmoney[lm] - lastmoney[lm-1];
		if (c) {
			mps += c;
		}
	}
	moneyps = mps / lastmoney.length;

	lastmoney.push(nowm);
	if (lastmoney.length > 100) lastmoney.splice(0, 1);

	myMoneyps.innerHTML = '('+(moneyps * 10).toFixed(8)+'/s)';
}
function addNewAd(proto) {
	var newAd = new ad(proto);
	game.bux.ads[newAd.tier].push(newAd);
}
function getRandomAd() {
	var ad;
	while (!ad && rand(0,100)) {
		var tier = rand(1, game.bux.ads.length) - 1;
		var adn = rand(1, game.bux.ads[tier].length) - 1;
		var ad = game.bux.ads[tier][adn];

		if (rand(1,100) == 1) break;
	}
	return {'tier': tier, 'index': adn, 'ad': ad};
}
function fusionAd() {
	var ad1 = getRandomAd();
	var ad2 = getRandomAd();

	if (ad1.ad && ad2.ad && ad1.ad != ad2.ad) {
		var tier = (ad1.tier > ad2.tier) ? ad1.tier : ad2.tier;
		if (tier < 9) tier += rand(0,1);
		var value = (parseFloat(ad1.ad.value) + parseFloat(ad2.ad.value));

		var startwith = (ad1.index > ad2.index) ? ad1 : ad2;
		var endwith = (ad1 == startwith) ? ad2 : ad1;

		clickAd(startwith.tier, startwith.index, true);
		clickAd(endwith.tier, endwith.index, true);

		var newAd = {'tier': tier, 'value': value};
		addNewAd(newAd);

		update('ads');
		return;
	}
}
function getAdRarity(typ) {
	var rarities = [512, 256, 128, 64, 32, 16, 8, 4, 2, 1];
	var rarity = [
		{'name': 'Basura|Trash',     'stat': 1,  'tier': '-', 'color': 'rarity_shit'},
		{'name': 'Normales|Normal',     'stat': 2.68,  'tier': 'F', 'color': 'rarity_normal'},
		{'name': 'Comúnes|Common',      'stat': 4.31,    'tier': 'E', 'color': 'rarity_common'},
		{'name': 'Especiales|Special',   'stat': 9.43,  'tier': 'D', 'color': 'rarity_special'},
		{'name': 'Escasos|Sparse',     'stat': 19.7, 'tier': 'C', 'color': 'rarity_sparse'},
		{'name': 'Raros|Rare',       'stat': 34.3,  'tier': 'B', 'color': 'rarity_rare'},
		{'name': 'Épicos|Epic',      'stat': 57.1,  'tier': 'A', 'color': 'rarity_epic'},
		{'name': 'Míticos|Mythical',     'stat': 110,    'tier': 'S', 'color': 'rarity_mythical'},
		{'name': 'Legendarios|Legendary', 'stat': 140,    'tier': 'X', 'color': 'rarity_legendary'},
		{'name': 'Únicos|Unique',      'stat': 255,   'tier': 'Z', 'color': 'rarity_unique'},
	];
	if (typ != undefined) return rarity[typ];
	var value = 0;
	for (var r in rarities) value += rarities[r];
	var mod = buyUpgrade('rare_ads', true) * 10;
	value += mod;
	var rn = rand(0, value);
	for (var r in rarities) {
		var rty = rarities[r];
		if (rn > rty) {
			rn -= rty;
			continue;
		}
		return r;
	}
	return 9;
}
function ad(proto) {
	this.tier = (proto && proto.tier) ? proto.tier : parseInt(getAdRarity());
	this.name = 'MAKE TONS OF MONEY';
	var bonus = getUpgradeBonus('ad_value');
	this.value = (proto && proto.value) ? proto.value.toFixed(8) : (bonus * 0.000001 * getAdRarity(this.tier).stat).toFixed(8);
}
function getUpgradeBonus(upgradeID, next) {
	var level = buyUpgrade(upgradeID, true);
	if (next) level++;
	return {
		'ad_value': 1 + (0.84 * level),
		'ad_chance': level,
		'refer_discount': Math.pow(0.9, level),
		'refer_popularity': (level * 1.5),
		'refer_com': (level * 0.129) + 1,
		'bark_popularity': level,
		'ad_fusion': level,
	}[upgradeID]
}
function ggoto(where) {
	var tabs = ['home', 'register', 'tos', 'realGame'];
	for (var tab in tabs) doc(tabs[tab]).style.display = 'none';
	$('#'+where).slideDown(100);
}
function getFakeStats() {
	var gfs = '<table>';
	gfs += '<tr><td id="fake_paid"></td><td>pagado a los usuarios</td><tr>';
	gfs += '<tr><td id="fake_users"></td><td>usuarios registrados</td><tr>';
	gfs += '<tr><td id="fake_ads"></td><td>anuncios publicados</td><tr>';
	gfs += '<tr><td id="fake_views"></td><td>anuncios visualizados</td><tr>';

	return gfs;
}
function updateFakeStats() {
	fake_paid.innerHTML = '$'+shortNum(fakestats.paid);
	fake_users.innerHTML = shortNum(fakestats.users);
	fake_ads.innerHTML = shortNum(fakestats.ads);
	fake_views.innerHTML = shortNum(fakestats.views);

	if (rand(0,1) == 0) fakestats.views += rand(1, 1000);
	if (rand(0,10) == 0) fakestats.ads += rand(1, 100);
	if (rand(0,100) == 0) fakestats.paid += rand(1, 10);
	if (rand(0,1000) == 0) fakestats.users += 1;
}
function greet() {
	var l = '';
	l += '<img src="img/tons_of_money.png" style="position: absolute; top: 8px; right: 64px;">';
	l += '<h3>'+translate('¡Gane millones viendo anuncios, desde la comodidad de su casa!|Make millions watching internet advertisements, sitting at home!')+'</h3>';
	l += '<h4>'+translate('En LemonBux, usted cobrará por cada anuncio que vea.|At LemonBux, you will earn cash for every ad you watch.')+'</h4>';
	l += '<div class="btn btn-default">'+translate('Cuéntame más|Tell me more')+'</div> ';
	l += '<div class="btn btn-primary" onclick="ggoto(\'register\')">'+translate('Regístrese|Register')+'</div>';
	l += '<hr>';
	l += '<div class="col-md-12"><h4>'+translate('Estadísticas|Statistics')+'</h4>'+getFakeStats()+'</div>';

	home.innerHTML = l;

	var l = '<h2>'+translate('Formulario de Registro|Register Form')+'</h2><form>';
	l += '<span id="troll_1"></span><br><br><input type="text" class="intext" placeholder="'+translate('Nombre|First Name')+'">';
	l += '<input type="text" class="intext" placeholder="'+translate('Apellido|Last Name')+'"><br>';
	l += '<input type="text" class="intext" id="userNameForm" placeholder="'+translate('Nombre de Usuario|Username')+'">';
	l += '<input type="password" class="intext" placeholder="'+translate('Contraseña|Password')+'"><br>';
	l += '<input type="password" class="intext" placeholder="'+translate('Confirmar Contraseña|Confirm Password')+'">';
	l += '<input type="password" class="intext" placeholder="'+translate('Confirmar Contraseña otra vez por si acaso|Confirm Password again just in case')+'"><br>';
	l += '<input type="text" class="intext" placeholder="e-mail"><br>';
	l += '<input type="text" class="intext" placeholder="'+translate('Referido|Referrer')+'"><br>';
	var ag = '';
	for (var e = 1; e < 31; e++) ag += '<option>'+e+'</option>';
	l += translate('Fecha de Nacimiento|Birth Date')+' <select>'+ag+'</select> ';
	var ag = '';
	for (var e = 1; e < 12; e++) ag += '<option>'+e+'</option>';
	l += '<select>'+ag+'</select> ';
	var ag = '';
	for (var e = 1900; e < 2000; e++) ag += '<option>'+e+'</option>';
	l += '<select>'+ag+'</select><br>';
	l += '<input type="text" class="intext" placeholder="'+translate('Dirección|Address')+'">';
	l += '<input type="text" class="intext" placeholder="'+translate('Número|Address Number')+'"><br>';
	l += '<input type="text" class="intext" placeholder="'+translate('Localidad|State')+'">';
	l += '<input type="text" class="intext" placeholder="'+translate('País|Country')+'">';
	l += '<input type="text" class="intext" placeholder="'+translate('Código Postal|Zip Code')+'"><br>';
	l += '<input type="text" class="intext" placeholder="'+translate('Signo del Zodiaco|Zodiac Sign')+'">';
	l += '<input type="text" class="intext" placeholder="'+translate('Tipo de Sangre|Blood Type')+'"><br>';
	l += '<input type="text" class="intext" placeholder="'+translate('Color de Ojos|Eye Color')+'">';
	l += '<input type="text" class="intext" placeholder="'+translate('Color de Pelo|Hair Color')+'"><br>';
	l += '<input type="number" class="intext" placeholder="'+translate('Altura|Height')+'">';
	l += '<input type="number" class="intext" placeholder="'+translate('Peso|Weight')+'"><br>';
	l += '<input type="radio" name="lh" checked>'+translate('Diestro|Right Handed')+' ';
	l += '<input type="radio" name="lh">'+translate('Zurdo|Leftie')+'<br>';

	l += '<input type="password" class="intext" placeholder="'+translate('Confirmar Contraseña que me he olvidado|Confirm Password I forgot it')+'"><br>';

	l += '<input type="checkbox"> '+translate('Confirmo que he leído y entendido los términos del servicio|I confirm that I read and understood the terms of service')+'<br>';
	l += '<input type="checkbox"> '+translate('Confirmo que quiero ser esclavo de LemonBux|I confirm that I want to be a slave at LemonBux')+'<br>';
	l += '<input type="checkbox"> '+translate('Quiero registrarme para recibir spam, ofertas, descuentos, noticias, spam y cotilleos|I want to receive spam, offers, discounts, news, spam and gossips')+'<br>';
	l += '<input type="checkbox"> '+translate('El administrador es muy guapo y quiero añadirme a la cola para casarme con él|The administrator is too handsome and I want to enqueue myself to marry him')+'<br>';
	l += '<input type="checkbox"> '+translate('Soy hombre heterosexual pero me haría homosexual por el administrador|I am a straight man but I would rather be homosexual to marry the admin')+'<br>';
	l += '<span id="troll_2"></span><br><br><hr><div class="btn btn-default" id="register_troll" onclick="registerTroll()">'+translate('Registrarse|Register')+'</div><br><br>';
	l += '<br><br><br>';

	register.innerHTML = l;
}
function registerTroll() {
	game.userName = userNameForm.value;
	if (game.userName == undefined) game.userName = translate('Invitado|Guest');
	var msg = '(*) '+translate('Todos los campos son obligatorios|All fields are required');
	troll_1.innerHTML = msg;
	troll_2.innerHTML = msg;
	$('input').css({'border-color': 'red'});
	register_troll.className = 'btn btn-primary';

	register_troll.onclick = function() {
		ggoto('realGame');
		game.register = true;
		update();
		update('reg');
		saveGame();
	};

}
function getReferCPT(peek) {
	var val = 0;
	for (var rf in game.bux.refer) {
		var realTier = (parseInt(rf) + 1);
		var tierLoss = Math.pow(MONEY_LOSS_PER_REFER_TIER, realTier);
		var lossMod = getUpgradeBonus('refer_com');
		tierLoss *= lossMod;
		var refers = game.bux.refer[rf];
		var cpt = (BASE_REFER_VALUE * refers * tierLoss);
		if (peek == rf) return '(+'+(cpt * 10).toFixed(8)+'/s)';
		val += cpt;
	}
	return val;
}
function referTiers() {
	var newSlaves = 0;
	for (var rf in game.bux.refer) {
		var refers = game.bux.refer[rf];
		var nextTier = Number(Number(rf) + 1);
		var r10 = rand(0, Math.ceil(refers * 1.077));
		r10 += Math.ceil(rand(0, getUpgradeBonus('refer_popularity')));
		var rr = rand(1,30);
		if (r10 > 0 && rr == 1) {
			if (game.bux.refer[nextTier] == undefined) game.bux.refer[nextTier] = 0;
			game.bux.refer[nextTier] += r10;
			newSlaves += r10;
		}
	}
	if (newSlaves > 0) {
		update('refer');
		notification(translate('Tus referidos han esclavizado '+newSlaves+' referidos nuevos|Your referrals have enslaved '+newSlaves+' new referrals'));
	}

	if (game.bux.followers > 0 && rand(1, 30) == 1) {
		var f10 = rand(0, Math.ceil(game.bux.followers / 10));
		if (f10) {
			notification(addBarkerFollowers(f10));
		}
	}
}
function tickStuff() {
	if (game.bux.refer[0] > 0) {
		var cpt = getReferCPT();
		increaseMoney(cpt);
	}
	var ac = Math.ceil(buyUpgrade('autoclick', true) / 5);
	if (ac) {
		for (var acc = 0; acc < ac; acc++) clickAd(rand(0,9), 0);
	}
	var ab = buyUpgrade('autobark', true);
	if (ab) {
		autobark -= ab;
		if (autobark <= 0) {
			autobark = 3000;
			bark();
		}
	}
}
function addBarkerFollowers(num, rebark) {
	game.bux.followers += num;
	var ex = (rebark) ? translate('Tu último Bark ha sido Rebarkeado.|Your latest Bark have been Rebarked.')+'<br>' : '';
	return translate(ex+'¡Has conseguido '+num+' nuevo(s) seguidor(es)!|'+ex+'You have '+num+' new follower(s)!');
}
function newFakeStats() {
	var d = new Date();
	var v = Math.ceil(d.valueOf() / 10000);
	var p = Math.ceil(v / 2);
	var a = Math.ceil(p / 100);
	var u = Math.ceil(a / 4);
	return {
		'paid': p,
		'users': u,
		'ads': a,
		'views': v,
	}
}

var game = {};
var gameInfo = {
	'name': 'LemonBux',
	'version': changes(changelog).latestVersion,
	'changelog': changes(changelog).changelog,
}

loadGame();
resetVariables();
greet();


update();
update('reg');
var fakestats = newFakeStats();

var t = setInterval(saveGame, 60000);
setInterval(updateAds, 10000);

setInterval(updateFakeStats, 100);
setInterval(tickStuff, 100);
setInterval(updateMoneyps, 100);