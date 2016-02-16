if (document.URL.substring(0,4) == 'file') commonDebug = true;
loadingPhase();
//Guardar variables
//Variables importantes
var lemonRate = 1;
var savedLemons;
var savedFridgeLemons;
var dayPassed = 1;
var lemonadePostOpen = true;
var limones, lemonade, dollars, raccoons, exprimators, boyScouts, lemonadeMix, toMakeLemonade, makin, helpers;

var lemonadePrice = 15;
var lemonadeResearchLevel = 0;
var clock = 480; //El reloj marcará hasta 1440. Cada segundo será un minuto.
var played = 0;
var baseLemonadePrice = 15;
var priceLock = "lowest";

var clockPoints = ":";
var depositTypes = [];
var popPercent;

var attentionWhore = 0;
var attentionMod = 0;
var popularity;
var lps;
var lpt = 0;
var gameID = "1.3.3.7";
var allModeLemonade = false;
var raccoonPrice = 0;
var exprimatorPrice = 0;
var boyScoutPrice = 0;
var random = 0;
var loggy0 = "";
var loggy1 = "";
var loggy2 = "";
var loggy3 = "";
var loggy4 = "";

var sav = 0;
//Temporizadores
loadGame();
resetVariables();
saveGame();
var t=setInterval(timeShit,100);
var t4=setInterval(saveGame,60000);
var t5=setInterval(newBuyer, 1350);
var ieta=setInterval(incHelpersExp, 10000);

var price = 0;
var priceMod = 0;
var lemonadeTextBack = "l";
var lemonade2 = lemonade;
//Redondear dos decimales
function roundTwo(number) {
number = Math.round(number*100)/100
return number;
}
//Cambiar precio de limonada
function changeLemonadePrice(func) {
	//TODO Añadir cambios al precio base de la limonada.

	var addition = {};
	addition['lowest'] = 0;
	addition['low'] = 15;
	addition['high'] = 40;
	addition['highest'] = 90;
	lemonadePrice = baseLemonadePrice+addition[func];
	priceLock = func;
}

function logIt(loggy) {
loggy0 = loggy1;
loggy1 = loggy2;
loggy2 = loggy3;
loggy3 = loggy4;
loggy4 = loggy;

marqAlert = loggy.length/2;

document.getElementById("log0").innerHTML = loggy0;
document.getElementById("log1").innerHTML = loggy1;
document.getElementById("log2").innerHTML = loggy2;
document.getElementById("log3").innerHTML = loggy3;
document.getElementById("log4").innerHTML = loggy4;

marqText+="   "+loggy;
}

//Mensajes tutorial-iniciales
var marqText = "";
function tutoMessages() {
	if (commonLang == 'es') {
		logIt("Bienvenido a tu puesto de limonada.");
		logIt("Tienes un par de limones y los " + dollars + "ç de tus ahorros.");
		logIt("Haz click en Conseguir un limón para conseguir más limones.");
		logIt("Haz click en <strong>Hacer limonada</strong> para convertir tus limones en limonada.");
	}
	else {
		logIt("Welcome to your lemonade stand.");
		logIt("You have a pair of lemons and " + dollars + "ç of your piggy bank.");
		logIt("Click on Harvest lemons to get more lemons.");
		logIt("Click on Squeeze lemonade to convert your lemons into lemonade.");
	}
}
//---
function showChangelog() {
	document.getElementById("frontWindow").style.display = "block";
	var val = document.getElementById("changelog").innerHTML;
	document.getElementById("front").innerHTML = val;
}
function hideChangeLog() {
	document.getElementById("frontWindow").style.display = "none";
}
//---
function buyRaccoon() {
var st1 = "Has contratado un Mapache por "+shortNum(raccoonPrice)+"ç.";
var st2 = "Necesitas "+shortNum(raccoonPrice)+"ç para contratar a un Mapache.";
if (commonLang == 'en') {
	var st1 = "A Raccoon have been hired by "+shortNum(raccoonPrice)+"ç.";
	var st2 = "You need "+shortNum(raccoonPrice)+"ç to hire a Raccoon.";
}

if (dollars >= raccoonPrice) {
raccoons = raccoons + 1;
//TODO ayudantes
buyHelper('raccoon');
dollars = dollars - raccoonPrice;
logIt(st1);
} else {
notif(st2, true);
}
}
//Compra de una exprimidora
function buyExprimator() {
var st1 = "Has comprado una exprimidora por "+shortNum(exprimatorPrice)+"ç.";
var st2 = "Necesitas "+shortNum(exprimatorPrice)+"ç para comprar una exprimidora.";
if (commonLang == 'en') {
	var st1 = "You have bought one squeezer for "+shortNum(raccoonPrice)+"ç.";
	var st2 = "You need "+shortNum(raccoonPrice)+"ç to buy a Squeezer.";
}

if (dollars >= exprimatorPrice) {
exprimators = exprimators + 1;
//TODO ayudantes
buyHelper('exprimator');
dollars = dollars - exprimatorPrice;
logIt(st1);
} else {
	notif(st2, true);
}
}
//Contratación de un Boy Scout
function buyBoyScout() {
var st1 = "Has contratado un Boy Scout por "+shortNum(boyScoutPrice)+"ç.";
var st2 = "Necesitas "+shortNum(boyScoutPrice)+"ç para contratar a un BoyScout.";
if (commonLang == 'en') {
	var st1 = "A Boy Scout have been hired by "+shortNum(boyScoutPrice)+"ç.";
	var st2 = "You need "+shortNum(boyScoutPrice)+"ç to hire a Boy Scout.";
}

if (dollars >= boyScoutPrice) {
boyScouts += 1;
//TODO ayudantes
buyHelper('boyScout');
dollars = dollars - boyScoutPrice;

logIt(st1);
} else {
notif(st2, true);
}
}
function quotaCalc(quota) {
depositTooltip = [
"Vaso mundano del que se bebe limonada.<br>Capacidad: 250ml",
"Vaso de tubo, ideal para beber limonada.<br>Capacidad: 300ml",
"Las latas no son tan populares, pero son baratas.<br>Capacidad: 33cl",
"Deme una jarra de limonada, por favor.<br>Capacidad: 50cl",
"Una botella para llevar limonada a todas partes.<br>Capacidad: 75cl",
"Una botella de litro y medio útil para picnics.<br>Capacidad: 1.5L",
"Una botella grande, ideal para fiestas en familia.<br>Capacidad: 2L",
"Una pequeña garrafa donde cabe MUCHA limonada.<br>Capacidad: 5L",
"La garrafa de moda ahora puede ser tuya.<br>Capacidad: 10L",
"El garrafón de limonada es lo último en el botellón.<br>Capacidad: 25L",
"¿Quién dijo que no podíamos meter limonada en bidones?<br>Capacidad: 110L",
"Almacenada en barrica de abedul, limonada añeja del 1979.<br>Capacidad: 159L",
"Bidón con capacidades industriales de ácido cítrico.<br>Capacidad: 220L",
"No es un tanque, es EL TANQUE -de limonada.<br>Capacidad: 350L",
"No me preguntes cómo los clientes se llevan esto a cuestas.<br>Capacidad: 440L",
"Si, me pone un par de camiones cisterna con mucho hielo, por favor.<br>Capacidad: 1kl",
"Ahora llévese dos cisternas por el precio de un camión.<br>Capacidad: 2kl",
"Con este depósito, el pueblo nunca estará falto de limonada.<br>Capacidad: 2.7kl",
"Con este depósito, la ciudad nunca estará falta de limonada.<br>Capacidad: 13kl",
"Espera. ¡¿Ahí cabe TODA ESA LIMONADA?!<br>Capacidad: 20kl",
"Con este depósito, bueno... Habrá limonada para toda una vida.<br>Capacidad: 60kl",
"Compré esta botella hace 80 años, aún dura.<br>Capacidad: 100kl",
"No sé qué es bioneural, pero suena a que cabe mucha limonada.<br>Capacidad: 200kl",
"Joder... Pesa.<br>Capacidad: 400kl",
"¿En cristiano, por favor?<br>Capacidad: 800kl",
"No me lo digas, aún hay una cisterna más grande.<br>Capacidad: 1000kl",
"¿Depoqué?<br>Capacidad: 2000kl"
];
var temp = [
'un vaso', 'un tubo', 'una lata', 'una jarra', 'una botella pequeña',
'una botella', 'una botella grande', 'una garrafa pequeña', 'una garrafa',
'un garrafón', 'un bidón pequeño', 'un barril', 'un bidón', 'un tanque',
'un bidón grande', 'un camión cisterna pequeño', 'un camión cisterna',
'un depósito pequeño', 'un depósito', 'un camión cisterna grande',
'un depósito grande', '<strong>una botella disipadora axial</strong>',
'<strong>una garrafa fásica bioneural</strong>',
"<strong>un bidón resonante duotrónico</strong>",
"<strong>un tanque multipléxico universal</strong>",
"<strong>una cisterna de pulso multifásico modular</strong>",
"<strong>un depósito isolinear de interferencia cósmica intrasensorial</strong>"
];
if (commonLang == 'en') {
	depositTooltip = [
		"Mundane glass cup where lemonade is drank.<br>Capacity: 250ml",
		"Tube glass, designed to drink lemonade.<br>Capacity: 300ml",
		"Cans aren't so popular, but in fact are cheap.<br>Capacity: 33cl",
		"Give me a jar of lemonade, please.<br>Capacity: 50cl",
		"A bottle to bring everywhere.<br>Capacity: 75cl",
		"A bottle for a liter and a half, useful for picnics.<br>Capacity: 1.5L",
		"A big bottle, useful for family parties.<br>Capacity: 2L",
		"Small garrafa where LOTS of lemonade can be stored.<br>Capacity: 5L",
		"Trendy popular garrafa that now can be yours.<br>Capacity: 10L",
		"Biggie garrafa of lemonade, best for doing botellón at the park.<br>Capacity: 25L",
		"Who said we can't store lemonade on a fuel container?<br>Capacity: 110L",
		"Stored on a birch cask, ole lemonade from 1979.<br>Capacity: 159L",
		"Fuel container with industrial quantity of citric acid.<br>Capacity: 220L",
		"It's not a tank, it's THE TANK -of lemonade.<br>Capacity: 350L",
		"Don't ask me how do clients carry this on.<br>Capacity: 440L",
		"Yes, give me a pair of tanker trucks with ice, please.<br>Capacity: 1kl",
		"Now take on two tanker trucks with price of one.<br>Capacity: 2kl",
		"With this tank, the village will never run out of lemonade.<br>Capacity: 2.7kl",
		"With this tank, the city will never run out of lemonade.<br>Capacity: 13kl",
		"Wait. That can hold ALL OF THESE LEMONADE?!<br>Capacity: 20kl",
		"With this tank, well... Will be lemonade for an entire life.<br>Capacity: 60kl",
		"I bought this bottle 80 years before, still running.<br>Capacity: 100kl",
		"I don't know what does bioneural means, but sounds like lot of lemonade storage.<br>Capacity: 200kl",
		"Crap... It's heavy.<br>Capacity: 400kl",
		"Can you talk the way I can understand?<br>Capacity: 800kl",
		"Don't tell me more, there is a tank bigger.<br>Capacity: 1000kl",
		"Intrawhat?<br>Capacity: 2000kl"
	];
	var temp = [
		'one glass cup', 'one tube cup', 'one can', 'one jar', 'one small bottle',
		'one bottle', 'one big bottle', 'one small garrafa', 'one garrafa',
		'one biggy garrafa', 'one small fuel container', 'one barrel', 'one fuel container',
		'one lemonade tank',
		'one big fuel container', 'one small tanker truck', 'one tanker truck',
		'one small tank',  'one tank', 'one big tanker truck', 'one big tank',
		'<strong>one axial dissipating bottle</strong>',
		'<strong>one bioneural phasic garrafa</strong>',
		'<strong>one duotronic resonating fuel container</strong>',
		'<strong>one universal multiplexic tank</strong>',
		'<strong>one modular multiphasic pulsating tanker truck</strong>',
		'<strong>one intrasensorial cosmic interference isolinear tank</strong>',
	];
}

if (quota == 250) return temp[0];
if (quota == 300) return temp[1];
if (quota == 330) return temp[2];
if (quota == 500) return temp[3];
if (quota == 750) return temp[4];
if (quota == 1500) return temp[5];
if (quota == 2000) return temp[6];
if (quota == 5000) return temp[7];
if (quota == 10000) return temp[8];
if (quota == 25000) return temp[9];
if (quota == 110000) return temp[10];
if (quota == 159000) return temp[11];
if (quota == 220000) return temp[12];
if (quota == 350000) return temp[13];
if (quota == 440000) return temp[14];
if (quota == 1000000) return temp[15];
if (quota == 2000000) return temp[16];
if (quota == 2700000) return temp[17];
if (quota == 13000000) return temp[18];
if (quota == 20000000) return temp[19];
if (quota == 60000000) return temp[20];
if (quota == 100000000) return temp[21];
if (quota == 200000000) return temp[22];
if (quota == 400000000) return temp[23];
if (quota == 800000000) return temp[24];
if (quota == 1000000000) return temp[25];
if (quota == 2000000000) return temp[26];
}
function calculateUpgradeDepositPrice() {
	var what = lemonadeResearchLevel+1
	var priceMod = Math.pow(1.725,what);
	var price = depositTypes[what]*priceMod;
	price = price*15;
	price = Math.round(price*100)/100;
	return price;
}
//Ventanas
function hideWindow() {
	document.getElementById("windowShop").style.display = "none";
	document.getElementById("anotherWindow").style.display = "none";
	document.getElementById("windowHome").style.display = "none";
	document.getElementById("windowHelpers").style.display = "none";
	document.getElementById("windowHelperStats").style.display = "none";
	

	document.getElementById("windowBack").style.display = "none";
}
function showWindow(windowz) {
	document.getElementById(windowz).style.display = "inline";
	document.getElementById("windowBack").style.display = "inline";
}

//Mejoras
function upgradeRaccoon() {
//Aumento de LPS

}
function upgradeExprimator() {
//Aumento de expRate

}
function upgradeBoyScout() {
//Llamar la atención, popularidad, propina

}
function upgradeDeposit() {
	var what = lemonadeResearchLevel+1
	var price = calculateUpgradeDepositPrice();

	if (dollars >= price) {
		dollars = dollars-price;
		lemonadeResearchLevel = what;
	} else {
		var msg = (commonLang == 'es') ? "Necesitas " + shortNum(price) + "ç para comprar esta mejora." : "You need "+shortNum(price)+"ç to buy this upgrade.";
		logIt(msg);
	}
	depositUpgradeUpdate();
}
function getQuota(tellMe) {
	depositTypes = [
0.25, 0.30, 0.33, 0.5, 0.75, 1.5, 2, 5, 10,
25, 110, 159, 220, 350, 440, 1000, 2000,
2700, 13000, 20000, 60000, 100000, 200000,
400000, 800000, 1000000, 2000000
];
	var chosen = Math.round(Math.random()*lemonadeResearchLevel);
	if (tellMe != undefined) {
	chosen = lemonadeResearchLevel;
	}
	if (chosen > 26) {
		chosen = 26;
	}
	var ret = depositTypes[chosen];
	
	chosen = 27;
	var ret = Math.round(1000*ret);
	return ret;
}
//Test new sellLemonade()
function sellLemonade(quota) {
if (lemonade >= quota) {
lemonade = lemonade - quota;
price = (lemonadePrice * (quota/250));
price = Math.round(price*100)/100;

//Probabilidad de propina
random = Math.round(Math.random()*4);
priceMod = 1;
//Propina
var tip = 0;
if ( random == 1 && popModCalc() != 0) {
var popMod = popModCalc();
priceMod = Math.round((0.02/popMod)*100)/100;
var tip = Math.round(price * priceMod);
tip = tip + 1;
}
if (tip > Number.MAX_SAFE_INTEGER) tip = 0;

total = Math.round((price + tip) * 100) / 100;
dollars = dollars + total;
var kindOf = quotaCalc(quota);
var msg1 = (commonLang == 'es') ? "Ha venido un cliente a tu puesto! Has vendido "+kindOf+" de limonada por "+ shortNum(price) +"ç." : "A client has come to your stand! You sold "+kindOf+" of lemonade for "+shortNum(price)+"ç.";
logIt(msg1);
if ( tip > 0 ) {
var msg2 = (commonLang == 'es') ? "Te han dado "+ shortNum(tip) +"ç de propina! ("+shortNum(total)+"ç en total)" : "You received "+shortNum(tip)+"ç on tips! ("+shortNum(total)+"ç total)";
logIt(msg2);
}
}
}
//End of test
function changeText() {
limones = limones + 1;
}

//Llamar la atención
function doShit() {
attentionWhore = attentionWhore + (4.444*(boyScouts+1));
}

//Calcular precios de ayudantes
function raccoonPriceCalc() {
	//Calcula precio de los Mapaches
	raccoonPrice = Math.floor(2.6*Math.pow(1.30,raccoons));
	//Precio de las exprimidoras
	exprimatorPrice = Math.floor(1.95*Math.pow(1.22,exprimators));
	//Precio de los Boy Scouts
	boyScoutPrice = Math.floor(0.99*Math.pow(1.42,boyScouts));
}

//Calcular modificador de popularidad
function popModCalc() {
	var popBonus = 100*attentionWhore;
	popularity = ( ( Math.pow(boyScouts,3.171)  + (66.666*attentionWhore) ) / ( lemonadePrice / 2.25 ) );
	//Add clock mod
	popularity *= clockMod;
	if (attentionWhore > 0 ) {
	attentionWhore = attentionWhore - (2.56*boyScouts);
	attentionWhore = Math.round(attentionWhore * 100)/100;
	if ( attentionWhore < 0 ) {
	attentionWhore = 0;
	}
	}


	var popModClient = 1/((popularity/66.666)+1);
	if ( popModClient < 0.1 ) {
	popModClient = 0.1;
	}
	document.getElementById('popButtonInactive').style.display = 'none';
	document.getElementById('popButtonActive').style.display = 'block';
	if (!lemonadePostOpen) {
		popModClient = 1;
		document.getElementById('popButtonInactive').style.display = 'block';
		document.getElementById('popButtonActive').style.display = 'none';
	}
	popPercent = (1-popModClient)*100;
	popPercent = Math.round(popPercent);
	if (popPercent < 1 ) {
	popModClient = 0;
	}
	return popModClient;
}
//Clock intervals
var runClock = setInterval(updateClock, 500);
//Clock divisor animation
function clockAnim() {
	if (clockPoints == ":") {
		clockPoints = ".";
		document.getElementById('timePoints').style.opacity = 0;
	} else {
		clockPoints = ":";
		document.getElementById('timePoints').style.opacity = 1;
	}
}
//Clock time update
var clockMod = 1;
function updateClock(func) {
	if (clock == 0) {
		dayPassed++;
	}
	if (clock == 360) {
		incSavedLemons();
	}
	echo('days', dayPassed);

	clockAnim();
	clock += 0.25;
	if (clock >= 1440) clock = 0;

	var hours = numToClock(clock*60)[0];
	var mins = numToClock(clock*60)[1];

	echo('timeHours', hours);
	echo('timeMinutes', mins);

	clockMod = Math.sin(Math.PI*((clock+240)/720));
	clockMod = Math.round(clockMod*100)/100;
	clockMod = 1-clockMod;
	
	//Update played time
	if (func != 'fast') played += 0.5;
	var playedSecs = Math.round(played);
	var playedMins = 0;
	var playedHours = 0;
	var playedDays = 0;
	var playedWeeks = 0;
	while (playedSecs >= 60) {
		playedSecs -= 60;
		playedMins++;
	}
	while (playedMins >= 60) {
		playedMins -= 60;
		playedHours++;
	}
	while (playedHours >= 24) {
		playedHours -= 24;
		playedDays++;
	}
	while (playedDays >= 7) {
		playedDays -= 7;
		playedWeeks++;
	}
	var line = playedSecs+"s";
	if (playedMins >= 1) line = playedMins+"m "+line;
	if (playedHours >= 1) line = playedHours+"h "+line;
	if (playedDays >= 1) line = playedDays+"d "+line;
	if (playedWeeks >= 1) line = playedWeeks+"sem "+line;
	document.getElementById("playedTime").innerHTML = line;

}
function numToClock(num) {
	var hours = Math.floor(num / 3600);
	var left = num % 3600;
	var mins = Math.floor(left / 60);
	var secs = Math.floor(left % 60);

	if (hours < 10) hours = "0"+hours;
	if (mins < 10) mins = "0"+mins;
	if (secs < 10) secs = "0"+secs;

	return [ hours, mins, secs ];
}
//Unstable: Mejoras
upgrades = [
["Mejora de prueba", "Es una mejora de prueba", 10],
["Otra mejora de prueba", "Esta es otra mejora más", 100],
["Dinero gratis", "¡Anda! ¡Dinero gratis!", -1000],
["Dinero gratis", "¡Anda! ¡Dinero gratis!", -1000],
["Dinero gratis", "¡Anda! ¡Dinero gratis!", -1000],
["Dinero gratis", "¡Anda! ¡Dinero gratis!", -1000],
["Dinero gratis", "¡Anda! ¡Dinero gratis!", -1000],
["Dinero gratis", "¡Anda! ¡Dinero gratis!", -1000]
];
var notifMoving = false;
var notifDirection = 0;
var notifOpacity = 1;
var notifWait = 0;

var cursorX;
var cursorY;
var initX;
var initY;
document.onmousemove = function(pos){
    cursorX = pos.pageX;
    cursorY = pos.pageY;
}

function notif(text, init) {
	if (commonLang == 'es') {
		var noS = [
		null,
		'Mapaches',
		'Dinero (Citros)',
		'Exprimidoras',
		'Limones',
		'Limonada (l)',
		'Popularidad',
		'Si necesitas limones, siempre puedes robarlos',
		'Recolecta limones para hacer limonada',
		'Si no tienes limonada, nadie te comprará',
		'Tu puesto de limonada está cerrado.<br>Haz click en el letrero debajo \
		del reloj para abrir tu puesto de nuevo.',
		'A veces llamar un poco la atención atrae a los clientes',
		'Cada mapache recoge limones para tu puesto',
		'Las exprimidoras pueden sacar el máximo provecho de cada limón al \
		hacer limonada',
		'Un Boy Scout siempre hará lo posible por aumentar las ventas, hasta \
		ir casa por casa a vender limonada',

		];
	}
	else {
		var noS = [
		null,
		'Raccoons',
		'Money (Citros)',
		'Squeezers',
		'Lemons',
		'Lemonade (l)',
		'Popularity',
		'If you need lemons, you can always steal them',
		'Gather lemons to make lemonade',
		'If you have no lemonade, nobody will want to buy',
		'Your lemonade stand is closed.<br>Click on the sign below the clock \
		to open it again.',
		"Sometimes trying to draw your clients' attention attract them",
		'Every Raccoon gathers lemons for your lemonade stand',
		'Squeezers help get more lemonade with less lemons',
		'A Boy Scout will always do as possible to increase clients, even \
		selling lemonade at every door',

		];
	}
	if (text > 0) {
		text = noS[text];
	}

	if (init == true) {
		document.getElementById('notif').innerHTML = text;
		notifDirection = 1;
		notifMoving = true;
		notifOpacity = 1;
		notifWait = 20;
		initX = cursorX;
		initY = cursorY;
	}
	var maxX = Math.floor(window.innerWidth/2);
	var maxY = Math.floor(window.innerHeight/2);
	var addX = 25;
	var addY = 0;
	if (cursorX > maxX) addX = -150;
	if (cursorY > maxY) addY = 0;
	document.getElementById('notif').style.left = (cursorX+addX)+"px";
	document.getElementById('notif').style.top = (cursorY+addY)+"px";

	document.getElementById('notif').style.opacity = notifOpacity;
}

function movingNotif() {
	if (notifMoving == true) {
		if (notifDirection == 1) {
			notifOpacity+=(notifDirection/25);
			if (notifOpacity >= 1 && notifDirection > 0) notifDirection = 0;
		}
		if (notifDirection == 0) {
			var difx = Math.abs(initX-cursorX);
			var dify = Math.abs(initY-cursorY);
			var area = (difx < 32 && dify < 32);
			if (!area) notifWait --;
			if (notifWait <= 0) notifDirection = -1;
		}
		notif();
		if (notifDirection == -1) {
			notifOpacity-= 0.05;
			if (notifOpacity < 0) {
				notifMoving = false;
			}
		}
	}
}
var mn = setInterval(movingNotif, 10);
function updateUpgrades() {
	var line = "<br>";
	var m = upgrades.length;
	for (i = 0; i < m; i++) {
		var line = line + "<tr class='upgrade'><td id='upgrade"+i+"'><b>"+upgrades[i][0]+"</b></td><td><i>"+upgrades[i][1]+"</i></td><td>Precio: "+upgrades[i][2]+"</td></tr>"
	}

	document.getElementById("upgrades").innerHTML = line;
}

function newBuyer() {
	//Shit --- Decide cuando viene un nuevo cliente.

	var popModClient = popModCalc();
	var quota = getQuota("hi");
	if (lemonade < quota) {
		quota = getQuota();
	}
	var x = 32*popModClient;
	x *= 2;
	var y = 16;
	if (!popModClient) y = 0;
	var rand = Math.round(Math.random()*(y+x));
	if (rand === 1 && lemonade >= quota) {
	sellLemonade(quota);
	}
}
function rand(min, max) {
	var x = Math.random()*max;
	x+=min;
	return Math.round(x);
}
function swap(thees, that) {
	var x = rand(0,1);
	if (x == 0) return thees;
	if (x == 1) return that;
}
function buyIngredient(type, qty) {
	var bef = baseLemonadePrice;
	//Mierda provisional
	var swapA = 0;
	var swapB = 0;
	for (i = 0; i < qty; i++) {
	if (type == 'orange') {
		var ftype = (commonLang == 'es') ? 'una naranja' : 'an orange';
		swapA = -2*qty;
		swapB = 1*qty;
		
		var prais = 7;
	}
	if (type == 'grapefruit') {
		var ftype = (commonLang == 'es') ? 'un pomelo' : 'a grapefruit';
		swapA = -1*qty;
		swapB = 2*qty;

		var prais = 10;
	}
	if (type == 'lime') {
		var ftype = (commonLang == 'es') ? 'una lima' : 'a lime';
		swapA = -4*qty;
		swapB = 5*qty;

		var prais = 15;
	}
	if (type == 'ice') {
		var ftype = (commonLang == 'es') ? 'hielo' : 'some ice';
		swapA = -3*qty;
		swapB = 4*qty;

		var prais = 23;
	}
	if (type == 'sugar') {
		var ftype = (commonLang == 'es') ? 'azúcar' : 'sugar';
		swapA = -5*qty;
		swapB = 5*qty;

		var prais = 35;
	}
}
	baseLemonadePrice+=swap(swapA,swapB);
	if (qty == 9) prais = Math.round((prais*=9)*0.8);
	if (qty == 99) prais = Math.round((prais*=99)*0.64);
	if (dollars < prais) {
		var mzg = 'No tienes dinero suficiente. Necesitas '+shortNum(prais)+'ç';
		logIt(mzg);
		notif(mzg, true);
		return;
	}

	dollars -= prais;
	lemonadeMix[type] += qty;
	lemonadeMix['lemon'] += qty;
	lemonRate+=qty;
	if (baseLemonadePrice <= 1) baseLemonadePrice = 1;
	var diff = baseLemonadePrice-bef;
	lemonadePrice+=diff;
	var init = (commonLang == 'es') ? 'Has añadido '+ftype+' a tu limonada.' : 'You added '+ftype+' to your lemonade.';
	var difference = (baseLemonadePrice > bef) ? 'subido':'bajado';
	if (commonLang == 'en') var difference = (baseLemonadePrice > bef) ? 'increased':'decreased';
	var last = (commonLang == 'es') ? 'El precio de tu limonada ha '+difference+' a '+lemonadePrice+'ç' : 'Your lemonade price have been '+difference+' to '+lemonadePrice+'ç';
	var msg = (baseLemonadePrice > bef) ? init+"<br> \
	¡Sabe bien!<br><br>"+last : init+"<br>¡La limonada ahora sabe a mierda! \
	Arréglalo comprando más ingredientes.<br><br>"+last;
	if (commonLang == 'en') var msg = (baseLemonadePrice > bef) ? init+"<br> \
	Seems nice!<br><br>"+last : init+"<br>Lemonade now tastes like shit! \
	Fix it buying more ingredients.<br><br>"+last;
	notif(msg, true);
	
	getFruitBonus();
}
function getTotalIngredients() {
	var total = 0;
	for (x in lemonadeMix) {
		total+=lemonadeMix[x];
	}
	return total;
}
function updateMixTable() {
	var total = getTotalIngredients();
	echo('mixLemon', percent(lemonadeMix['lemon'],total));
	echo('mixOrange', percent(lemonadeMix['orange'],total));
	echo('mixGrapefruit', percent(lemonadeMix['grapefruit'],total));
	echo('mixLime', percent(lemonadeMix['lime'],total));
	echo('mixIce', percent(lemonadeMix['ice'],total));
	echo('mixSugar', percent(lemonadeMix['sugar'],total));



}

function depositUpgradeUpdate() {
	var deposit = getQuota("hi");
	var totalLem = deposit/1000;
	totalLem = Math.round(totalLem*100)/100;
	var tit = "Puedes vender " + quotaCalc(deposit) + ", que tiene capacidad para " + totalLem + " litros";
	if (commonLang == 'en') var tit = "You can sell " + quotaCalc(deposit) + ", that can store " + totalLem + " liters of lemonade.";
	document.getElementById("actualDeposit").onmouseover = function() {
		notif(tit, true);
	}
	document.getElementById("actualDeposit").src = "img/depositUpgrade" + lemonadeResearchLevel + ".png";

	document.getElementById("upgradeDeposit").style.display = "inline";

	if (lemonadeResearchLevel < 26) {
	var whatty = lemonadeResearchLevel + 1;
	document.getElementById("upgradeDepositImage").src = "img/depositUpgrade" + whatty + ".png";
	var q = depositTypes[lemonadeResearchLevel+1]*1000;
	q = quotaCalc(q);
	q = q.split(" ");
	var x = 1;
	var queue = "";
	while (x < q.length) {
		queue = queue + " " + q[x];
		x = x + 1;
	}
	var tooltip = depositTooltip[lemonadeResearchLevel+1];
	var msgzzzzzz = (commonLang == 'es') ? 'Mejorar a ' : 'Upgrade to ';
	var msgzzz = msgzzzzzz + queue + " - " + shortNum(calculateUpgradeDepositPrice()) + "ç <br>" + tooltip;
	document.getElementById("upgradeDepositText").innerHTML = msgzzz;
	}
	if (lemonadeResearchLevel >= 26) {
		document.getElementById("upgradeDeposit").style.display = "none";
	}
}
depositUpgradeUpdate();
//Eventos cada segundo
function timeShit() {
	if (gift) gift-=10;
	if (gift <= 0) {
		document.getElementById('scoutImg').src = 'img/scout2.png';
	}
	else {
		document.getElementById('scoutImg').src = 'img/scout.png';
	}
	sleepTransition();
	checkLemonade();
	if (makin) makeLemonade();

	updateMixTable();


	var img = lemonadePostOpen ? "img/ocOpen.png" : "img/ocClosed.png";
	document.getElementById('shopSign').src = img;

	//Errores
	try {
		if (!dayPassed) dayPassed = 1;
		if (tip == Infinity) tip = 0;
	}
	catch(err) {
	}

	//Update functions
	raccoonPriceCalc();
	//Calculate lemons per second
	var bonus = Math.floor(raccoons/10)/5;

	lps = (raccoons * 0.5 ) * (1+bonus);

	var popBonus = 100*attentionWhore;
	popularity = ( ( 1.41 * boyScouts + (100*attentionWhore) ) / ( lemonadePrice / 1.5 ) );

	if (attentionWhore > 0 ) {
	attentionWhore = attentionWhore - 1.707;
	attentionWhore = Math.round(attentionWhore * 100)/100;
	if ( attentionWhore < 0 ) {
	attentionWhore = 0;
	}
	}

	newBuyer();

	lpt = lps / 10;
	limones = limones + lpt

	//Conversion 
	lemonade2 = ( lemonade / 1000 );
	lemonadeTextBack = "l"

	//round shit
	limones = Math.round(limones * 100) / 100;
	dollars = Math.round(dollars);

	//Update stats
	var extra = " <span id='lpsNotif'>("+Math.round(lps*100)/100+")</span>";
	var msgLimones = shortNum(Math.round(limones)) +extra;
	echo('limones', msgLimones);
	var notifText = (commonLang == 'es') ? 'Limones por segundo' : 'Lemons per second';
	document.getElementById('lpsNotif').onmouseover = function() { notif(notifText, true)};
	echo('limonada', shortNum(lemonade2)+lemonadeTextBack);
	echo('dollars', shortNum(dollars)+' ç');
	echo('raccoons', raccoons);
	echo('exprimators', exprimators);
	echo('boyScouts', boyScouts);
	echo('lemonadePrice', lemonadePrice);
	echo('gameVersion', "Lemontastic v" + gameID);
	echo('gameVersion2', "Cambios en la versión v" + gameID);

	echo('fridgeLemons', "("+savedFridgeLemons+")");

	

	document.getElementById("pop").innerHTML = popPercent+ "%";


	document.getElementById("raccoonPrice").innerHTML = shortNum(raccoonPrice)+"ç";
	document.getElementById("exprimatorPrice").innerHTML = shortNum(exprimatorPrice)+"ç";
	document.getElementById("boyScoutPrice").innerHTML = shortNum(boyScoutPrice)+"ç";

	//Check game version
	var actualID = "0.7.9b";
	if (actualID != gameID) {
		gameID = actualID;
		showChangelog();
		saveGame();
	}

}
function toCookie(cname, cvalue) {
localStorage.setItem(cname, cvalue);
}
function loadGame() {
var checkIfEmpty = localStorage.getItem("limones");
if (checkIfEmpty == null) {
}
else {

limones = parseInt(localStorage.getItem("limones"));
lemonade = parseInt(localStorage.getItem("lemonade"));
dollars = (parseInt(localStorage.getItem("dollars")) )/100;
if (localStorage.getItem('dollars') == "NaN") {
	dollars = 0;
}
raccoons = parseInt(localStorage.getItem("raccoons"));
exprimators = parseInt(localStorage.getItem("exprimators"));
boyScouts = parseInt(localStorage.getItem("boyScouts"));
lemonadePrice = ( parseInt(localStorage.getItem("lemonadePrice")) )/10;
lemonadeResearchLevel = parseInt(localStorage.getItem("lemonadeResearchLevel"));
clock = parseInt(localStorage.getItem("clock"));
played = parseInt(localStorage.getItem("played"));
baseLemonadePrice = parseInt(localStorage.getItem("baseLemonadePrice"));
priceLock = localStorage.getItem("priceLock");
dayPassed = parseInt(localStorage.getItem("dayPassed"));
lemonadePostOpen = JSON.parse(localStorage.getItem('lemonadePostOpen'));
savedLemons = JSON.parse(localStorage.getItem('savedLemons'));
savedFridgeLemons = JSON.parse(localStorage.getItem('savedFridgeLemons'));

lemonRate = JSON.parse(localStorage.getItem('lemonRate'));

lemonadeMix = JSON.parse(localStorage.getItem('lemonadeMix'));

gameID = localStorage.getItem("gameID");

helpers = JSON.parse(localStorage.getItem('helpers'));
}
}
function resetVariables() {
	tutoMessages();
	if (!limones) limones = 2;
	if (!lemonade) lemonade = 0;
	if (!dollars) dollars = 10;
	if (!raccoons) raccoons = 0;
	if (!exprimators) exprimators = 0;
	if (!boyScouts) boyScouts = 0;
	if (!lemonadePrice) lemonadePrice = 15;
	if (!lemonadeResearchLevel) lemonadeResearchLevel = 0;
	if (!baseLemonadePrice) baseLemonadePrice = 15;
	if (!gameID) gameID = 0;
	if (!clock) clock = 480;
	if (!played) played = 0;
	if (!priceLock) priceLock = 'low';
	if (!savedLemons && savedLemons != 0) {
		savedLemons = 0;
		incSavedLemons();
	}
	if (!savedFridgeLemons && savedFridgeLemons != 0) {
		savedFridgeLemons = 0;
		incSavedLemons();
	}

	if (!lemonRate) lemonRate = 1;

	if (!lemonadeMix) {
		lemonadeMix = {
		'lemon': 1,
		'orange': 0,
		'grapefruit': 0,
		'lime': 0,
		'ice': 0,
		'sugar': 0
		};
	}
	if (!helpers) helpers = [];
	depositUpgradeUpdate();
}
function resetGame() {
var asdfmsg = (commonLang == 'es') ? 'Resetear de verdad?' : 'Reset? Sure?';

var asdf = confirm(asdfmsg);
if (asdf === true) {
	loggy0 = ""; loggy1 = ""; loggy2 = ""; loggy3 = ""; loggy4 = ""
	logIt("El juego ha sido reseteado a cero.");
	limones = undefined; lemonade = undefined; dollars = undefined;
	raccoons = undefined; exprimators = undefined; boyScouts = undefined;
	lemonadePrice = undefined; lemonadeResearchLevel = undefined; baseLemonadePrice = undefined;
	gameID = undefined; clock = undefined; played = undefined;
	priceLock = undefined; savedLemons = undefined; lemonRate = undefined;
	savedFridgeLemons = undefined;
	lemonadeMix = undefined; helpers = undefined;
	resetVariables();
}
}
function saveGame(mode) {
toCookie("limones", limones);
toCookie("lemonade",lemonade);
toCookie("dollars",dollars*100);
toCookie("raccoons",raccoons);
toCookie("exprimators",exprimators);
toCookie("boyScouts",boyScouts);
toCookie("lemonadePrice",lemonadePrice*10);
toCookie("lemonadeResearchLevel",lemonadeResearchLevel);
toCookie("gameID",gameID);
toCookie("clock",clock);
toCookie("played",played);
toCookie("baseLemonadePrice", baseLemonadePrice);
toCookie("priceLock", priceLock);
toCookie("dayPassed", dayPassed);
toCookie("lemonadePostOpen", lemonadePostOpen);
toCookie('savedLemons', savedLemons);
toCookie('savedFridgeLemons', savedFridgeLemons);
toCookie('lemonRate', lemonRate);
toCookie('lemonadeMix', JSON.stringify(lemonadeMix));
toCookie('helpers', JSON.stringify(helpers));

var msg = 'Partida guardada.';
if (commonLang == 'en') var msg = 'Game saved.';
notif(msg, true);
logIt(msg);
}
function openClose() {
	lemonadePostOpen = !lemonadePostOpen;
}
function dayNightHue(hour) {
	hour /= 60;
}
function steal() {
	//Robar limones
	var prob = rand(0,2);
	var msg = (commonLang == 'es') ? '¿Qué haces? ¡Eh! ¡Deja de robarme limones!. ¡Fuera de aquí!' : 'Whaddya doing? Hey! Stop stealing my lemons!';
	if (prob == 0) return msg;
	var max = savedLemons;
	var msg = (commonLang == 'es') ? 'Has intentado robar algo... ¡Pero no había nada que robar!' : 'You have tried stealing something... But there is nothing to steal!';
	if (!max) return msg;
	max /= rand(2,10);
	max += 1;
	max = Math.floor(max);
	limones += max;
	savedLemons -= max;
	var msg = (commonLang == 'es') ? 'Has robado '+max+' limones' : 'You stole '+max+' lemons';
	if (prob > 0) return msg;
}
function stealFridge() {
	//Coger limones de la nevera
	if (savedFridgeLemons) {
		limones += savedFridgeLemons;
		var max = savedFridgeLemons
		savedFridgeLemons = 0;
		var more = (max > 1) ? ( (commonLang == 'es') ? 'es': 's' ) : '';
		return (commonLang == 'es') ? 'Has cogido '+max+' limon'+more+' de la nevera.' : 'You pick '+max+' lemon'+more+' from the fridge';
	}
	else {
		return (commonLang == 'es') ? 'No hay más limones. Vuelve mañana por la mañana.' : 'There are no lemons left in the fridge. Come back tomorrow';
	}

}

function stealButton(what) {
	if (what != 'fridge') var n = steal();
	if (what == 'fridge') var n = stealFridge();
	notif(n, true);
}
function incSavedLemons() {
	//Aumenta los limones que puedes robar por día.
	var max = Math.floor(limones/10);
	max += 30;
	savedLemons += rand(0,max);
	//Aumenta los limones de la nevera.
	var max = Math.floor(limones/10);
	max += 6;
	savedFridgeLemons += rand(0,max);
}
function makeLemonade() {
	var expRate = (((11/9)*100)+(exprimators*83));
	var totalLemonade = (lemonRate*expRate);

	if (limones < lemonRate) {
	var msg = (commonLang == 'es') ? 'No puedes hacer limonada, necesitas '+lemonRate+' limones.' : "You can't make lemonade, you need at least "+lemonRate+" lemons.";
		notif(msg, true);
		return;
	}

	limones -= lemonRate;
	if (!toMakeLemonade) toMakeLemonade = 0;
	toMakeLemonade += totalLemonade;
}
function checkLemonade() {
	if (toMakeLemonade > 0) {
		var p10 = Math.round(toMakeLemonade/9)+1;
		if (toMakeLemonade < 1) p10 = toMakeLemonade;
		toMakeLemonade-=p10;
		lemonade+=p10;
	}
}
function talk(who) {
	if (commonLang == 'es') {
		var beforeMom = 'Madre: ';
		var beforeDad = 'Padre: ';

		var momPhrases = [
		"Deberías dejar de llamarme madre, tengo un nombre, ¿Lo sabías?",
		"¿Cuánto dinero has ganado ya? Eres un cabezota, cuando se te mete una idea en la cabeza...",
		"No pases tanto tiempo ahí fuera, al menos ponte protección solar.",
		"Hoy hay albóndigas de comer, a tu padre le gustan.",
		"Hace calor, ¿Te pongo una limonada?",
		"Tu padre sigue viendo la tele... ¿Es que no se cansa?",
		"Vuelve pronto a casa.",
		//"Puedes coger limones de la nevera si quieres, ¿Vale?", TODO Añadir nevera
		"¿Qué tal el colegio, hijo? ¿Cómo? ¿Que ya no hay colegio? Vaya",
		//"Sé lo que estás pensando, pero tampoco es para tanto.", TODO Añadir objetivo "Juego Lemon Rush"
		"Tomar mucha limonada es bueno, tiene Vitamina C",
		"No te olvides de comer otras frutas.",
		"Cuando vuelvas a casa deberías recoger tu cuarto.",
		//"Si necesitas ayuda pregúntale al vecino Henry", TODO Añadir vecino Henry
		//"Deja de vender tanto y juega un poco con el niño de al lado", TODO añadir casa del vecino de al lado
		//"¿Has visto a Henry hoy? Ah, dale saludos de mi parte.", TODO añadir Henry
		];
		var dadPhrases = [
		"Mi abuelo decía que hay que regatear, empieza pidiendo por lo alto, hijo",
		"Tu padre está orgulloso de tí, ganar más dinero que tu madre sube la autoestima.",
		"Sea lo que sea tu objetivo, que sepas que te apoyo.",
		"¡Echa sal en la limonada! ¡Que se jodan!",
		"¿Ya has ganado todo ese dinero? Vaya, si que cundes, hijo",
		"Lima, limón y un poco de azúcar, esa es la receta del éxito, pero no te pases con los ingredientes.",
		//"Algunos vecinos son un poco bordes, hijo, no escuches las palabras obscenas que dicen", TODO añadir vecinos
		"Te ayudaría con el negocio, pero empieza la Super Bowl",
		//"Tu madre ha comprado algo de fruta, puedes mirar en la nevera.", TODO añadir nevera
		"Buena suerte con eso, hijo, yo te apoyo desde el sofá.",
		/* "Henry tiene algunos limones en su huerto, no pasa nada si coges algunos prestados, \
		el tío chochea, ni se dará cuenta." TODO añadir Henry */
		"Si sigues ganando tanto dinero tendrás que pagar tu parte del alquiler. \
		Es broma, es broma.",
		"Vaya, si estás cogiendo calor de tanto estar al sol.",
		"¿Limonada? No, yo prefiero la cerveza.",
		"Estás hecho todo un as regateando. Tímales hasta el último citro",
		"Creo que me voy a echar una siesta."
		];
	}
	if (commonLang == 'en') {
		var beforeMom = 'Mother: ';
		var beforeDad = 'Father: ';

		var momPhrases = [
		"You shouldn't keep calling me mother, I have a name, did you know?",
		"How much money have you earned? You are so stubborn, when an idea gets to your mind...",
		"Don't stay outside for so long, at least use a sunscreen.",
		"Today's lunch is meatballs. Your dad loves them.",
		"It's hot outside. Do you want lemonade?",
		"Your father is still watching TV... Does he ever get enough of it?",
		"Go back home early.",
		//"You can take some lemons from the fridge if you want, OK?"
		"How well are you performing in school? What? School is over? Well...",
		//"I know what you think, but it isn't so important.",
		"Drinking loads of lemonade is good, it has Vitamin C",
		"Don't forget eating other kinds of fruit.",
		"When you come back home, you should tidy your bedroom.",
		//"If you need help, ask Henry."
		//"Stop selling so much and go play with your neighbor."
		//"Did you see Henry today? Oh, give him greetings."
		];
		var dadPhrases = [
		"Gramps always said we have to dribble. Start asking for a high price, son.",
		"Your father is so proud about you, earning more money than your mother raises self-esteem.",
		"Whatever your goal is, I support you.",
		"Put salt at lemonade! Screw them!",
		"You have earned so much money? Wow... You perform well, son.",
		"Lime, lemon and a bit of sugar. That's the recipe of sucess, but don't exceed.",
		//"Some neighbors are a little cranky. My son, don't listen to that obscene words they swear."
		"I would help you with your business, but Super Bowl is about to start.",
		//"Your mom have bought some fruit, you can check the fridge."
		"Good luck with that, son, I'm supporting you here from sofa.",
		//"Henry has a lot of lemons in his garden, it doesn't matter if you take some, he's senile, he wouldn't notice.",
		"If you keep earning so much money, you will need to pay your rent share. \
		It's a joke, it's a joke.",
		"Wow, you are getting tan with so much sun.",
		"Lemonade? Nah, I prefer beer.",
		"You are an ace with dribling. Trick them until the last citro.",
		"I'm having a nap right now.",
		];
	}

	if (who == 'mom') {
		var msg = beforeMom + read(momPhrases);


		echo('talkMom', msg);
	}
	if (who == 'dad') {
		var msg = beforeDad + read(dadPhrases);

		echo('talkDad', msg);
	}
}
var targetTime = 0;
var sleeping = false;
function sleep() {
	var canSleep = ( (clock >= 1320 && clock <= 1440) || (clock >= 0 && clock <= 360) );
	if (canSleep) {
		targetTime = clock+rand(420,540);
		if (targetTime >= 1440) targetTime -= 1440;
		sleeping = true;
		lemonadePostOpen = false;
	}
	else {
		var msg = 'Es demasiado pronto para dormir. Espera hasta las 22:00'
		if (commonLang == 'en') var msg = "It's too early for going to bed. Wait until 22:00";
		notif(msg, true);
	}
}
var sleepOpac = 0;
function sleepTransition() {
	if (sleeping) {
		if (sleepOpac <= 1) {
			document.getElementById('black').style.display = 'block';
			document.getElementById('black').style.opacity = sleepOpac;
			sleepOpac += 0.015;
			clock+=6;
			if (clock >= 1440) clock = 0;
			updateClock('fast');
		}
		else {
			document.getElementById('black').style.display = 'none';
			document.getElementById('black').style.opacity = 0;
			sleepOpac = 0;
			sleeping = false;
			clock = targetTime;
			var thisHour = numToClock(targetTime*60)[0]+":"+numToClock(targetTime*60)[1];
			var msg = 'Has dormido hasta las '+thisHour+'. Asegúrate de volver a abrir tu puesto de limonada.';
			if (commonLang == 'en')
			var msg = 'You have been sleeping until '+thisHour+'<br> \
			Make sure that your lemonade stand is open today.';
			
			notif(msg, true);
			logIt(msg);
			incSavedLemons();
			changeLayout(clock);

		}
	}
}
loadGame();
function loadingPhase() {
	document.body.style.opacity = 0;
	document.title = 'Loading...';
}

function changeLayout(time) {
	var timcss = 'sheets/day.css';
	if (time >= 60 && time < 480) timcss = 'sheets/midn.css';
	if (time >= 480 && time < 1200) timcss = 'sheets/day.css';
	if ( (time >= 1200 && time < 1440) || (time >= 0 && time < 60) ) timcss = 'sheets/night.css';
	document.getElementById('timeSheet').href = timcss;
}
var tMR = rand(0,255);
var tMG = rand(0,255);
var tMB = rand(0,255);
var tripModeActivated = true;
changeLayout(clock);
function tripMode() {
	var inc = 2.25;
	var timcss = document.getElementById('timeSheet').href;
	if (clock >= 60 && clock <= 62) changeLayout(clock);
	if (clock >= 480 && clock <= 482) changeLayout(clock);
	if (clock >= 1200 && clock <= 1202) changeLayout(clock);

	if (clock >= 60 && clock < 360) {
		if (tMR > 0) tMR -= inc;
		if (tMG > 0) tMG -= inc;
		if (tMB > 0) tMB -= inc;
	}
	if (clock >= 360 && clock < 480) {
		if (tMR > 0) tMR -= inc;
		if (tMG > 0) tMG -= inc;
		if (tMB < 255) tMB += inc;
	}
	if (clock >= 480 && clock < 1080) {
		if (tMR > 0) tMR -= inc;
		if (tMG < 255) tMG += inc;
		if (tMB < 255) tMB += inc;
	}
	if (clock >= 1080 && clock < 1200) {
		if (tMR < 255) tMR += inc;
		if (tMG < 128) tMG += inc;
		if (tMG > 128) tMG -= inc;
		if (tMB > 0) tMB -= inc;
	}
	if ( (clock >= 1200 && clock < 1440) || (clock >= 0 && clock < 60)) {
		if (tMR > 0) tMR -= inc;
		if (tMG > 0) tMG -= inc;
		if (tMB < 255) tMB += inc;
	}
	tMR = Math.ceil(tMR);
	tMG = Math.ceil(tMG);
	tMB = Math.ceil(tMB);

	if (!tripModeActivated) return;
	var c1 = 'rgb('+tMR+', '+tMG+', '+tMB+')';
	//console.log(c1);
	document.body.style.background = 'linear-gradient('+c1+','+c1+')';
	document.getElementById('game').style.background = 'linear-gradient('+c1+','+c1+')';
}
var tma = setInterval(tripMode, 150);
var marqAlert = 0;
function marq() {
	if (marqAlert > 0) marqAlert -= 0.75;
	if (Math.floor(marqAlert)%2 > 0) {
		document.getElementById('marq').style.borderBottom = '4px solid red';
	}
	else {
		document.getElementById('marq').style.borderBottom = '4px solid transparent';
	}
	var del = Math.floor(marqText.length/150)+1;
	marqText = marqText.substring(del);
	while (marqText.length < 160) marqText+=" ";
	document.getElementById('marq').innerHTML = marqText.substring(0,160);
}
var moveMarq = setInterval(marq, 180);
var gift = 3000;
function getGift() {
	if (gift < 0) gift = 0;
	if (!gift) {
		incSavedLemons();
		var min = rand(1,dollars);
		min++;
		giftMoneh = Math.round(min);
		var msg = (commonLang == 'es') ?
		'Has encontrado una cartera con '+shortNum(giftMoneh)+' ç en el suelo.' :
		'You have found a wallet with '+shortNum(giftMoneh)+' ç on the floor.';
		dollars+=giftMoneh;
		logIt(msg);
		gift = 30000;
	}
	gift*=1.33;
	console.log(gift);
}
function getFruitBonus() {
	var fruits = [
	'orange', 'grapefruit', 'lime', 'ice', 'sugar'
	];
	var rates = [
	7, 10, 15, 23, 35
	];
	var quality = 0;
	for (fruit in fruits) {
		var rate = rates[fruit]/10;
		console.log('Rate: '+rate);
		var x = lemonadeMix[fruits[fruit]];
		console.log('x: '+x);
		var a = getTotalIngredients()-lemonRate;
		console.log('a: '+a);
		var rate = (x*rate+a);
		console.log('new rate: '+rate);
		var calc = Math.sin(rate)+((rate+x)/10);
		console.log('calc: '+calc);

		var thisQuality = Math.ceil(calc*100)/100;
		console.log('thisQuality: '+thisQuality);
		quality+=thisQuality;
	}
	quality = Math.round(quality*100)/100;
	console.log("Lemonade quality: "+quality);
	var retQuality = '+'+Math.round(quality)+' ç';
	echo('lemonMix',retQuality);
}
function getLemonadePrice() {
	var base = 15;
}
function expToNextLevel(level) {
	return Math.ceil(Math.pow(level, 2.1)+level);
}
function helper(type, name) {
	this.type = type;
	this.name = name;
	this.level = 1;
	this.classLevel = 0;
	this.exp = 0;
	this.classNam = "Exprimidor";
	this.lps = 0;
	this.cps = 0;
	if (type == 'raccoon') {
		this.classNam = "Mapache";
		this.lps = 0.5;
	}
	if (type == 'boyScout') this.classNam = "Boy Scout";
	this.upgradeClass = function(path) {

	}
}
function helperIncExp(id) {
	var thees = helpers[id];
	if (thees.level >= 10) return 'Already on max level. Please upgrade class.';
	thees.exp++;
	if (thees.exp >= expToNextLevel(thees.level)) {
		thees.exp = 0;
		thees.level += 1;
		if (thees.level >= 10) thees.exp = '-';
		return 'Level up!';
	}
}
function helperChangeName(id, newName) {
	var thees = helpers[id];
	thees.name = newName;
	return 'New name: '+thees.name;
}
function helperLevelUp(id, peek) {
	var cl = helpers[id].classLevel;
	var lvl = helpers[id].level;

	if (lvl == 10) return 'Imposible subir más el nivel.';

	var exp = helpers[id].exp;
	var maxExp = expToNextLevel(lvl);

	console.log(cl+"cl "+lvl+"lvl "+exp+"exp "+maxExp+"maxExp");

	var cost = (cl+1)*lvl*(maxExp-exp);

	if (peek) return cost;

	updateLevelUpCost(id);

	if (dollars >= cost) {
		helpers[id].level += 1;
		helpers[id].exp = 0;
		dollars -= cost;
		return helpers[id].name+" ha subido al nivel "+helpers[id].level;
	}
	else {
		return "Dinero insuficiente. Esta operación cuesta "+cost+"ç";
	}
}
function helperUpgradeClass(id, path) {
	var thees = helpers[id];
	console.log('Upgrading...');
	var maxLevel = 10;
	var alternate = ( (thees.type == 'boyScout' && path == '1') || (thees.type == 'raccoon' && path == '0') );
	if (alternate) maxLevel = 5;

	if (thees.classLevel == maxLevel) return 'Max class level reached.';
	if (thees.level < 10) return 'Must reach level 10 before upgrading.';
	if (thees.level == 10 && this.classLevel < maxLevel) {
		thees.level = 0;
		thees.exp = 0;
		thees.classLevel++;
		thees.classNam = getNewClassName(this.type, path, ( this.classLevel - 1 ) );
	}
}
function getNewClassName(type, path, classLevel) {
	if (type == 'boyScout') {
		return [
		//Good
		[
		"vanillaScout",

		"cafeGuy", "microBus", "manager", "spammer", "account",
		"busman", "member", "halfChief", "chief", "ceo"
		],
		//Evil
		[
		"vanillaScout",

		"fakeBlind", "faker", "trickster", "cheater", "scammer"
		]
		][path][classLevel];
	}
	if (type == 'raccoon') {
		return [
		//Good
		[
		"vanillaCoon",

		"insurance", "frac", "treasury", "banker", "lawyer"
		],
		//Evil
		[
		"vanillaCoon",

		"klepto", "pickPocket", "thief", "criminal", "thug",
		"bully", "blackMailer", "mafia", "mastermind", "godFather"
		]
		][path][classLevel];
	}
}
function buyHelper(type) {
	helpers[helpers.length] = new helper(type, getNewName(type));

	getHelperList();
}
function getNewName(type) {
	var n1 = getMaleName();
	var n2 = read([
	"Max", "Bailey", "Charlie", "Buddy", "Oliver",
	"Shadow", "Tiger", "Rocky", "Bandit", "Jake",
	"Jack", "Toby", "Cody", "Buster", "Duke",
	"Shy Cooper", "Riley", "Bear", "Tucker", "Murphy",
	"Lucky", "Sam", "Teddy", "Winston", "Sammy",
	"Gizmo", "Zeus", "Rocco", "Henry", "Poppy", "Rocket",
	"Tom Hook", "Zigzacoon", "Coon"
	]);
	var n3 = read([
	randomLetter(), randomLetter()+randomLetter(), randomLetter()+randomLetter()+randomLetter(),
	"Apollo", "Luna", "Jupiter", "Mars", "Saturn",
	"Neptune", "Ceres", "Venus", "Mercury", "Juno",
	"Artemis", "Hades", "Poseidon", "Zeus", "Chaos",
	"Chronos", "Erebus", "Eros", "Uranus", "Nyx",
	"Cerberus", "Hecate", "Gorgon", "Proteus",
	"Prometheus", "Iris", "Pleiades", "Centaur",
	"Cybele", "Dryad", "Adonis", "Pluto", "Uranus",
	"Circe", "Ganymede", "Heracles", "Achilles",
	"Daedalus", "Perseus", "Theseus", "Andromeda",
	"Medusa", "Cassiopeia", "Europa", "Pandora",
	"Midas", "Minotaur", "Cyclops", "Kraken",
	"Sphinx", "Hydra", "Scylla", "Chimera", "Dragon",
	"Talos", "Hector", "Echidna", "Hera", "Athena",
	"Atlas", "Ares", "Hephaestus", "Hermes"
	])+"-"+rand(0,100);

	if (type == 'boyScout') return n1;
	if (type == 'raccoon') return n2;
	if (type == 'exprimator') return n3;
}
function randomLetter() {
	return String.fromCharCode(rand(65,90));
}
function getHelperList() {
	var l = "";
	for (x in helpers) {
		var type = helpers[x].type;
		var img = 'img/exprim.png'
		if (type == 'raccoon') img = 'img/coon.png';
		if (type == 'boyScout') img = 'img/scout.png';
		var name = helpers[x].name;
		var classNam = helpers[x].classNam;
		var level = helpers[x].level;
		var exp = helpers[x].exp;
		var maxExp = expToNextLevel(level);
		var 
		l = l + "<tr onclick='openHelperStats("+x+")'><td><img src='"+img+"'></td><td>"+name+" el "+classNam+"</td> \
		<td>Nivel: "+level+"</td><td>Experiencia: "+exp+"/"+maxExp+"</td></tr>"
	}
	echo('helperTable', l);
}
function openHelperStats(id) {
	echo('helperName', helpers[id].name);
	echo('helperLevel', helpers[id].level);
	var maxExp = expToNextLevel(helpers[id].level);
	echo('helperExp', helpers[id].exp+"/"+maxExp);
	echo('helperLPS', helpers[id].lps);
	echo('helperCPS', helpers[id].cps);
	echo('helperSkill',helpers[id].skill);
	document.getElementById('changeName').onclick = function() {
		helperChangeName(id, prompt('Elige un nuevo nombre: '));
	};
	updateLevelUpCost(id);
	showWindow('windowHelperStats');
}
function updateLevelUpCost(id) {
	echo('helperLevelUpCost', helperLevelUp(id, true));
	document.getElementById('helperLevelUp').onclick = function() {
		echo('helperLevelUpMsg', helperLevelUp(id));
	};

	var nextClass = helpers[id].classLevel + 1;

	var newGoodClass = getNewClassName(helpers[id].type, 0, nextClass);
	var newBadClass = getNewClassName(helpers[id].type, 1, nextClass);
}
function incHelpersExp() {
	for (x in helpers) {
		helperIncExp(x);
	}
	getHelperList();
}
//Stop loading phase
if (commonDebug) echo('yup','yup');
var finishedLoading = setTimeout(function () {document.body.style.opacity = 1; document.title = 'Lemontastic!';}, 400);
depositUpgradeUpdate();