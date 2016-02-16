if (document.URL.substring(0,4) == 'file') commonDebug = true;
loadingPhase();
//Guardar variables
//Variables importantes
var data = {};
var achievementList = [
0, 0
];
var achievementNames = [
	//Generic - Test: 0-1
	[ 'Logrador|Achiever',
	'Abrir la ventana de logros.|Open achievements window.'],
	[ 'Por un puñado de limones|A fistful of lemons',
	'Exprimir 100 limones para hacer limonada.|Squeeze 100 lemons to make lemonade.'],
	//Depósitos 2-4
	[ 'Cata de limonada|Lemonade Tasting',
	'Compra un barril de limonada.|Buy a lemoande barrel.'],
	['Sobrepasando el límite|Exceeding the limit',
	'Compra una botella disipadora axial.|Buy an axial dissipating bottle.'],
	['Universo Cítrico|Citrus Universe',
	'Compra la última mejora de depósito.|Buy the latest tank upgrade.'],

	//Dinero 5-7
	['Niño Adinerado|Wealthy Boy',
	'Gana mil citros vendiendo limonada.|Earn one thousand citros selling lemonade.'],
	['Ricachón|Moneybags',
	'Gana un millón de citros vendiendo limonada.|Earn one million citros selling lemonade.'],
	['Pez gordo|Heavyweight',
	'Gana un billón de citros vendiendo limonada.|Earn one billion citros selling lemonade.'],

	//Random 8
	['Buen servicio|Good service',
	'Recibe una propina de 1ç.|Receive a tip of 1ç.'],

	//Time related 9-12
	['Un duro mes|A hard month',
	'Llega al día 30|Reach Day 30'],
	['Año Fiscal|Fiscal Year',
	'Pasa 365 días en el juego jugando|Spend 365 in-game days playing'],
	['Serendipia|Serendipity',
	'Comparte la misma hora en el juego que en la vida real|Match the same in-game time with real time'],
	['Adicción a los Limones|Lemon Addiction',
	'Juega durante un día entero|Play the game a whole day'],

	//Helpers related 13-24
	['Compañía peluda|Furry Company',
	'Contrata 10 mapaches|Hire 10 Raccoons'],
	['Loco de los Mapaches|Crazy Raccoon Guy',
	'Contrata 25 mapaches|Hire 25 Raccoons'],
	['Promesa Scout|Scout Promise',
	'Contrata 10 Boy Scouts|Hire 10 Boy Scouts'],
	['Ley Scout|Scout Law',
	'Contrata 25 Boy Scouts|Hire 25 Boy Scouts'],
	['Escuadra|Squad',
	'Contrata un total de 15 ayudantes|Hire a total of 15 helpers'],
	['Compañía|Company',
	'Contrata un total de 30 ayudantes|Hire a total or 30 helpers'],
	['Brigada|Brigade',
	'Contrata un total de 50 ayudantes|Hire a total of 50 helpers'],
	['Ejército|Army',
	'Contrata un total de 60 ayudantes|Hire a total of 60 helpers'],
	['Mortal|Mortal',
	'Sube de nivel 100 veces tus ayudantes|Level up your helpers 100 times'],
	['Héroe|Hero',
	'Sube de nivel 1000 veces tus ayudantes|Level up your helpers 1000 times'],
	['Semidiós|Demigod',
	'Sube de nivel 5000 veces tus ayudantes|Level up your helpers 5000 times'],
	['Dios|God',
	'Sube de nivel 10000 veces tus ayudantes|Level up your helpers 10000 times'],

	//Squeezer level related 25-27
	['Exprimidora de Bronce|Bronze Squeezer',
	'Sube tu exprimidora al nivel 20|Level up your squeezer to level 20'],
	['Exprimidora de Plata|Silver Squeezer',
	'Sube tu exprimidora al nivel 40|Level up your squeezer to level 40'],
	['Exprimidora de Oro|Gold Squeezer',
	'Obten una exprimidora al máximo de velocidad con nivel 60|Get a full speed squeezer with level 60'],

	//LPS related 28-31
	['Bastantes Limones|Enough Lemons',
	'Llega a los 10 limones por segundo|Reach 10 lemons per second'],
	['Baño de Limones|Lemon Bath',
	'Llega a los 100 limones por segundo|Reach 100 lemons per second'],
	['Superávit de Limones|Lemon Surplus',
	'Llega a los 1000 limones por segundo|Reach 1000 lemons per second'],
	['Millemonario|Millemonaire',
	'Llega a los 5000 limones por segundo|Reach 5000 lemons per second'],

	//CPS related 32-35
	['Ingreso Residual|Residual Income',
	'Llega a los 10ç/segundo|Reach 10ç/second'],
	['Inflación|Inflation',
	'Llega a los 200ç/segundo|Reach 200ç/second'],
	['Mi Tesoro!|My Precious!',
	'Llega a los 4000ç/segundo|Reach 4000ç/second'],
	['Paraíso Fiscal|Tax Heaven',
	'Llega a los 80000ç/segundo', 'Reach 80000ç/second'],

	//Lemon stock related 36-39
	['Vitamina C|Vitamin C',
	'Consigue un total de 10 000 limones|Get a total of 10 000 lemons'],
	['¡Golpe Cítrico!|Citrical Hit!',
	'Consigue un total de 100 000 de limones|Get a total of 100 000 lemons'],
	['Mundo de Amarillo|Yellow Painted World',
	'Consigue un total de un millón de limones|Get a total of a million lemons'],
	['Un problema serio|Some serious problem',
	'Consigue un total de 10 millones de limones|Get a total of 10 million lemons'],

	//Lemonade related 40-44
	['¿Un vaso?|Have a glass?',
	'Haz un total de 2 500 litros de limonada|Make 2 5000 liters of lemonade'],
	['Sed: Cero|Thirst: Zero',
	'Haz un total de 50 000 litros de limonada|Make 50 000 liters of lemonade'],
	['Fiesta en la Piscina de Limonada|Lemonade Pool Party',
	'Haz un total de 1 millón de litros de limonada|Make a million liters of lemonade'],
	['Galaxia Vía Limónica|Lemonic Way Galaxy',
	'Haz un total de 20 millones de litros de limonada|Make 20 million liters of lemonade'],
	//Pop-gentle-char related 45-48
	['Lider Carismático|Charismatic Leader',
	'Llega al 100% de carisma (O sobrepásalo)|Reach 100% Charisma (Or exceed it)'],
	['Vaya, gracias|Well, thanks',
	'Recibe una propina mayor al precio del vaso|Receive a tip higher than the lemonade itself'],
	['Puro Amor|Pure Love',
	'Mantén la popularidad, carisma y honestidad al 95%|Keep popularity, charisma and honesty at 95%'],
	['Estafa Consentida|Spoiled Fraud',
	'Consigue 95% de popularidad con el precio fijado en Estafa|Get 95% Popularity with price locked on Fraud'],
	['Pura Maldad|Pure Evil',
	'Mantén la carisma al 1% o menos y la Maldad al 100%|Keep charisma at 1% or less and Evil at 100%'],

	//Helper class related 49-54
	['Buenas Intenciones|Good Intentions',
	'Asciende uno de tus mapaches a Abogado Defensor|Promote one of your raccoons to Defense Lawyer'],
	['Esto es mío|This is mine',
	'Asciende uno de tus mapaches a Carterista|Promote one of your raccoons to Pickpocket'],
	['Big Boss|Big Boss',
	'Asciende uno de tus mapaches a Cerebro|Promote one of your raccoons to Mastermind'],

	['Mentiroso Compulsivo|Compulsive Lying',
	'Asciende uno de tus Boy Scouts a Estafador|Promote one of your Boy Scouts to Con Artist'],
	['Lider en Ventas|Sales Leadership',
	'Asciende uno de tus Boy Scouts a Contable|Promote one of your Boy Scouts to Accountant'],
	['Cima de la Pirámide|Pyramid Peak',
	'Asciende uno de tus Boy Scouts a Director Ejecutivo|Promote one of your Boy Scouts to CEO'],

	//Fruit related
	['Naranjada|Orangeade',
	'Ten una mezcla de limonada con más naranjas que limones|Have a lemonade mixture with more oranges than lemons'],
	['Limada|Limeade',
	'Echa 1000 limas a tu limonada|Add 1000 limes to your lemonade'],
	['Directo al Dentista|Direct to the Dentist',
	'Añade 3500 terrones de azúcar a la limonada|Add 3500 sugar lumps to your lemonade'],
	['¿Esto es limonada?|Is this lemonade?',
	'Añade 10000 tipos diferentes de ingredientes a la limonada|Add 10000 different kinds of ingredients to your lemonade'],




]
var records = {
	'limones': 2,
	'lemonade': 0,
	'dollars': 10,
	'helpers': 0,
	'levels': 0,
	'tips': 0,
	'sales': 0,
}
var lastRecords = {
	'limones': 0,
	'lemonade': 0,
	'dollars': 0,
	'helpers': 0,
	'levels': 0,
	'tips': 0,
	'sales': 0,
}
var lemonRate = 1;
var savedLemons;
var savedFridgeLemons;
var dayPassed = 1;
var lemonadePostOpen = true;
var limones, lemonade, dollars, lemonadeMix, toMakeLemonade, makin, doingShit, helpers, stealTimer, lastHelper, ecstasy, specialTipAchievement;

var lemonadePrice = 15;
var lemonadeResearchLevel = 0;
var clock = 480; //El reloj marcará hasta 1440. Cada segundo será un minuto.
var played = 0;
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

//Ultra-fastest events, ultra-fast squeezing
var ufsTimer = setInterval(ultraFastSqueezing, 1);
//Tooltips, ultra-fast events
var mn = setInterval(movingNotif, 10);
//Every s/10 events
var t=setInterval(timeShit,100);
//Clock intervals, every half second events
var runClock = setInterval(updateClock, 500);
//New buyer
var t5=setInterval(newBuyer, 1000);
//Save game, every minute events
var t4=setInterval(routine,60000);

var suc=setInterval(succubus,10000);
var ofe = setInterval(olFastEvents, 100);
var ttt = setInterval(updateStuff, 500);

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

	priceLock = func;
	lemonadePrice = getLemonadePrice();
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


echo('testLast', loggy3);
echo('testNow', loggy);
doc('testLast').style.fontSize = '0px';

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
	if (checkIfHelperLimitReached()) return;
	var st1 = "Has contratado un Mapache por "+shortNum(raccoonPrice)+"ç.";
	var st2 = "Necesitas "+shortNum(raccoonPrice)+"ç para contratar a un Mapache.";
	if (commonLang == 'en') {
		var st1 = "A Raccoon have been hired by "+shortNum(raccoonPrice)+"ç.";
		var st2 = "You need "+shortNum(raccoonPrice)+"ç to hire a Raccoon.";
	}

	if (dollars >= raccoonPrice) {
	buyHelper('raccoon');
	dollars = dollars - raccoonPrice;
	logIt(st1);
	} else {
	notif(st2, true);
	tooltipHere('buyH01', st2);
	}

	getHelperList();
}
//Contratación de un Boy Scout
function buyBoyScout() {
	if (checkIfHelperLimitReached()) return;
	var st1 = "Has contratado un Boy Scout por "+shortNum(boyScoutPrice)+"ç.";
	var st2 = "Necesitas "+shortNum(boyScoutPrice)+"ç para contratar a un BoyScout.";
	if (commonLang == 'en') {
		var st1 = "A Boy Scout have been hired by "+shortNum(boyScoutPrice)+"ç.";
		var st2 = "You need "+shortNum(boyScoutPrice)+"ç to hire a Boy Scout.";
	}

	if (dollars >= boyScoutPrice) {
		buyHelper('boyScout');
		dollars = dollars - boyScoutPrice;

		logIt(st1);
	} else {
		notif(st2, true);
	}

	getHelperList();
}
function checkIfHelperLimitReached() {
	if (helpers.length >= 300) {
		logIt(translate("No puedes contratar más ayudantes.|You can't hire more helpers."));
		return true;
	}
}
function buySpecialHelper(type, id, price) {
	if (type == 'upgrade') {
		if (data.badges >= price) {
			data.badges -= price;
			data.badgeBonus.lps += 0.01;
			data.badgeBonus.cps += 0.01;
			logIt(translate('Tus limones por segundo y citros por segundo han aumentado.|Your lemons and citros per second have been increased.'));
		}
		return;
	}
	if (type == 'thief') {
		var nu = helpers.length;
		helpers[nu] = new helper('raccoon', getNewName('raccoon'));
		helpers[nu].classLevel = 6;
		helpers[nu].path = 1;
		return;
	}
	if (checkIfHelperLimitReached()) return;
	var cName = getClassData(type, 'className', 3, id);
	var st1 = "Has contratado un "+cName+" por "+shortNum(price)+" insignias.";
	var st2 = "Necesitas "+shortNum(price)+" insignias para contratar a un Mapache.";
	if (commonLang == 'en') {
			var st1 = "A "+cName+" have been hired by "+shortNum(price)+" badges.";
			var st2 = "You need "+shortNum(price)+" badges to hire a "+cName+".";
	}

	if (data.badges >= price) {
		buyHelper(type, id);
		data.badges = data.badges - price;
		logIt(st1);
	} else {
		notif(st2, true);
	}
}
function quotaCalc(quota, showName) {
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
if (showName) {
	return temp[quota];
}
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
	var what = lemonadeResearchLevel+1 //Default: 1
	var priceMod = Math.pow(what, 2);  //Default: 1
	var price = depositTypes[what]*priceMod;
	price = price*9.6;
	price = softRound(price);
	return price;
}
//Ventanas
function hideWindow() {
	var windows = ['windowShop', 'anotherWindow', 'windowHome',
	'windowHelpers', 'windowHelperStats', 'windowAch', 'notifAch',
	'windowSqueezer', 'windowRecords', 'windowBack', 'windowMentor'];
	for (hw in windows) doc(windows[hw]).style.display = 'none';
	changingName = true;
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
}
function getQuota(tellMe) {
	depositTypes = [
		0.25, 0.30, 0.33, 0.5, 0.75, 1.5, 2, 5, 10,
		25, 110, 159, 220, 350, 440, 1000, 2000,
		2700, 13000, 20000, 60000, 100000, 200000,
		400000, 800000, 1000000, 2000000
	];
	chosen = lemonadeResearchLevel;
	for (x = lemonadeResearchLevel; x > 0; x--) {
		if (lemonade/1000 > depositTypes[x] && lemonadeResearchLevel >= x) {
			chosen = x;
			break;
		}
	}
	if (chosen > 26) chosen = 26
	data.temp.lrlChosen = chosen;
	var ret = depositTypes[chosen];
	
	//chosen = 27;
	//Deposit bonus
	var tacanos = 1 + (getSkillsByID(24) * 0.3);
	ret *= tacanos;

	var ret = Math.round(1000*ret);
	return ret;
}
//Test new sellLemonade()
function sellLemonade(quota, forced) {
	if (lemonade >= quota) {
		lemonade = lemonade - quota;
		price = (lemonadePrice * (quota/250));
		//Price modifications go here
		var verb = translate('vendido|sold');
		var action = translate('Te han dado|You received');

		var priceInc = getPriceInc();
		if (priceInc) {
			popModCalc();
			var badBonus       = getAlignment('good');
			var racketRandom = rand(1,badBonus);   //Less popularity, higher tip scam chances
			var scamRandom   = rand(1,badBonus);   //Less charisma, higher price scam chances
			if (racketRandom > 1) racketRandom--;
			if (scamRandom > 1) scamRandom--;
		}
		//Succubus effect
		if (forced) {
			racketRandom = Math.floor(racketRandom / 2);
			scamRandom = Math.floor(scamRandom / 2);
		}
		if (scamRandom == 1) {
			var verb = '<mark>'+translate('estafado|scammed')+'</mark>';
			var scamMod = getFraudRate();
			price *= scamMod;
		}

		price = Math.round(price*100)/100;
		var doublePriceChance = 100 - (getSkillsByID(6) * 5);
		if (forced) doublePriceChance = Math.floor(doublePriceChance);
		if (doublePriceChance <= 1 ) doublePriceChance = 1;
		dpcRandom = rand(1,doublePriceChance);
		if (dpcRandom == 1 && getSkillsByID(6)) {
			var verb = '<b>'+translate('vendido por el doble de precio|sold for twice its price')+'</b>';
			price *= 2;
		}

		//Probabilidad de propina
		random = rand(1,getTipChance());
		if (racketRandom == 1) {
			random = 1; //Forces tip if scam chances are high
			var action = '<big>'+translate('Has forzado|You forced')+'</big>';
		}

		priceMod = 1;
		//Propina
		var tip = 0;
		if ( random <= 1 && popModCalc() != 0) {
			var popMod = popModCalc();
			priceMod = Math.round((0.02/popMod)*100)/100;
			var tip = Math.round(price * priceMod);
			tip = tip + 1;
			//Tip modifiers go here
			if (getBSPercent(2) > 100) {
				var add = getBSPercent(2) - 100;
				tip += add;
			}

			var tipMod = getPopBonus(0)/2;
			var skeels = 1 + (getSkillsByID(19)/2);
			console.log(tipMod+' '+skeels);
			tipMod *= skeels;

			if (tipMod) tip += Math.ceil(tipMod);

		}
		if (tip == Infinity) tip = 0;

		if (tip > price) specialTipAchievement = true;
		total = Math.round(price + tip);

		incDollars(total);
		//Ecstasy
		ecstasy += 5 * getSkillsByID(10);

		var kindOf = quotaCalc(data.temp.lrlChosen, true);
		records.sales = (!records.sales) ? 1 : records.sales + 1;
		var msg1 = (commonLang == 'es') ? "Ha venido un cliente a tu puesto! Has "+verb+" "+kindOf+" de limonada por "+ shortNum(price) +"ç." : "A client has come to your stand! You "+verb+" "+kindOf+" of lemonade for "+shortNum(price)+"ç.";
		if (forced) msg1 = '<mark class="forced">'+msg1+'</mark>';
		logIt(msg1);
		if ( tip > 0 ) {
			if (!records.tips) records.tips = 0;
			records.tips += tip;
			var msg2 = (commonLang == 'es') ? action+" "+ shortNum(tip) +"ç de propina! ("+shortNum(total)+"ç en total)" : action+" "+shortNum(tip)+"ç on tips! ("+shortNum(total)+"ç total)";
			logIt(msg2);
		}
	}
}
//End of test
function changeText() {
	//Base ammount of lemons obtained is 1. Increased by the number of Gangsters you have.
	var qty = 1 + getSkillsByID(32);
	//This special modifier increases by 0.3 for every Gangster/Mastermind you have.
	var someMod = (getSkillsByID(33) + getSkillsByID(32)) / 2;
	//The special modifier gets multiplied by the number of Masterminds you have.
	//So that 1 mastermind is 0.1*1 = 1.1x lemon picking modifier
	//And 2 mastermind means 0.2*2 = 1.4x lemon picking modifier
	var qtyMod = 1 + (getSkillsByID(33) * someMod);
	qty *= qtyMod;
	raccatMod = getSkillsByID(35);
	qty += raccatMod;

	if (getSkillsByID(36)) {
		console.log('Kleptomaniacs available')
		var random = Math.floor(rand(1,100) / getSkillsByID(36));
		console.log('Random chance is '+random);
		if (random == 1) {
			var mod = Math.pow(1.5,getSkillsByID(36));
			qty *= mod;
		}
	}

	incLimones(qty);
}
function incLimones(qty, persecond) {
	if (qty < 1) data.storage.limones += qty;
	if (data.storage.limones >= 1) {
		qty += data.storage.limones
		data.storage.limones = 0;
	}
	if (!persecond) {
		showTextHere('limonesWrapper', '+'+shortNum(qty));
	}
	limones+=qty;
	if (!records.limones) records.limones = 0;
	records.limones+=qty;
}
function incLemonade(qty) {
	lemonade+=qty;
	if (!records.lemonade) records.lemonade = 0;
	records.lemonade+=qty;
}
function incDollars(qty, persecond) {
	if (qty < 1) data.storage.dollars += qty;
	if (data.storage.dollars >= 1) {
		qty += data.storage.dollars
		data.storage.dollars = 0;
	}

	if (!persecond) {
		showTextHere('dollarsWrapper', '+'+shortNum(qty)+'ç');
	}

	dollars+=qty;
	if (!records.dollars) records.dollars = 0;
	records.dollars+=qty;

	if (!persecond) incHelpersExp(Math.floor(qty));
}

//Llamar la atención
function doShit() {
	var popBonus = getPopBonus(0);
	if (popBonus <= 0) popBonus = 0;
	popBonus++;
	attentionWhore += popBonus;
}

//Calcular precios de ayudantes
function raccoonPriceCalc() {
	var raccoons = getHelpersByType('raccoon');
	var boyScouts = getHelpersByType('boyScout');
	if (!records.helpers) records.helpers = 0;
	var helperPriceMod = records.helpers/20;
	helperPriceMod++;

	//Calcula precio de los Mapaches
	raccoonPrice = Math.floor(2.5*Math.pow(2.5,raccoons));
	raccoonPrice*=helperPriceMod;
	//Coon price reduction
	raccoonPrice *= getPriceReductionMod();

	var coonReduction = 1 + getSkillsByID(14);
	raccoonPrice /= coonReduction;

	raccoonPrice = Math.ceil(raccoonPrice);

	//Precio de los Boy Scouts
	boyScoutPrice = Math.floor(2.5*Math.pow(2.5,boyScouts));
	boyScoutPrice*=helperPriceMod;
	//Scout price reduction
	boyScoutPrice *= getPriceReductionMod();

	var scoutReduction = 1 + getSkillsByID(15);
	boyScoutPrice /= scoutReduction;

	boyScoutPrice = Math.ceil(boyScoutPrice);
}

//Calcular modificador de popularidad
function popModCalc(debug) {
	//Price lock affects lemonade price from x0.25 to x2
	//Clock mod affects lemonade price from x0 to x2
	//Total mod can range between x0 and x4 (Locked at Fraud, the price can range from x0 to x0.5)
	//"Basic" price is 15ç, if your actual price exceeds it, you'll lose popularity.
	var lemonPriceMod = getLemonadeMod(1)*clockMod*(5/lemonadePrice);

	//popBonus = total popularity stats from your helpers (intended to be a percent)
	var popBonus = getPopBonus(1);
	if (popBonus < 0) popBonus = 0;

	//Price lock mod and clock mod affects whoring, real price bonus affects helper popularity
	var noBSBonus = 10 / (1 + getHelpersByType('boyScout'));
	popularity = noBSBonus + (popBonus + (0.5 * attentionWhore)) * lemonPriceMod;

	//Draw attention decrease value
	if (attentionWhore > 0 ) {
		attentionWhore *= 0.9;
		if ( attentionWhore < 0 ) {
			attentionWhore = 0;
		}
	}
	if (ecstasy) ecstasy *= 0.99;

	popularity /= 100;
	//Popularity bonus go here (Maybe?)

	if (!popularity) popularity = 0;

	var popModClient = 1-popularity;
	//Pop bonus kinda go here
	var popSkillBonus = (getSkillsByID(1) / 40);
	popModClient -= popSkillBonus;

	if ( popModClient < 0.01 ) {
	popModClient = 0.01;
	}
	if (popModClient > 0.99) popModClient = 0.99;

	document.getElementById('popButtonInactive').style.display = 'none';
	document.getElementById('popButtonActive').style.display = 'block';
	if (!lemonadePostOpen) {
		popModClient = 1;
		document.getElementById('popButtonInactive').style.display = 'block';
		document.getElementById('popButtonActive').style.display = 'none';
	}
	popPercent = (1-popModClient)*100;
	popPercent = Math.round(popPercent*100)/100;
	if (popPercent < 0 ) {
		popPercent = 0;
	}
	return popModClient;
}
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
function olFastEvents() {
	//Ol' fast events
	tripMode();
	marq();
	sleepTransition();
}
function mimicry(from) {
	if (!helpers[0]) return;
	var hhhh = helpers[from];
	if (getSkill(from) == 40 || hhhh.mime == 1) {
		var toMime = rand(1,helpers.length-1);

		hhhh.classLevel = helpers[toMime].classLevel;
		hhhh.path = helpers[toMime].path;
		hhhh.name = helpers[toMime].name;
		hhhh.mime = 1;
	}
}
function updateClock(func) {
	if (clock == 0) {
		dayPassed++;
		resetBites();
	}
	if (clock == 360) {
		incSavedLemons();
	}
	echo('days', dayPassed);

	clockAnim();
	clock += 0.5;
	getMonth();
	data.gameTime.number += 15000;

	//if (clock == 479 || clock == 59 || clock == 1199) forceTransition();
	if (clock >= 1440) {
		clock = 0;
	}

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

var initX;
var initY;

function notif(text, init) {
	if (commonLang == 'es') {
		var noS = [ '', 'Mapaches', 'Dinero (Citros)', 'Nivel de la Exprimidora', 'Limones', 'Limonada (l)', 'Popularidad',
		'Si necesitas limones, siempre puedes robarlos', 'Recolecta limones para hacer limonada',
		'Si no tienes limonada, nadie te comprará', 'Tu puesto de limonada está cerrado.<br>Haz click en el letrero debajo \
		del reloj para abrir tu puesto de nuevo.', 'A veces llamar un poco la atención atrae a los clientes',
		'Cada mapache recoge limones para tu puesto', 'Las exprimidoras pueden sacar el máximo provecho de cada limón al \
		hacer limonada', 'Un Boy Scout siempre hará lo posible por aumentar las ventas, hasta \
		ir casa por casa a vender limonada', 'Insignias<sup>ALPHA</sup>', 'Carisma',
		'Cantidad de experiencia que tiene y le falta a este ayudante para subir de nivel.',
		'Cantidad de limones que recoge este ayudante cada segundo.', 'Dinero que este ayudante obtiene cada segundo dios sabe donde.',
		'Aumenta el precio de la limonada.', 'Aumenta el dinero recibido en propinas.', 'Probabilidades de atraer clientes.',
		'Aumenta la probabilidad de recibir propinas.', 'Nivel del ayudante. Puedes ascenderlo al nivel 10', 'Todos', 'Amabilidad',
		'Honestidad', 'Maldad', 'Pueden ascender', 'Invertir el Orden',
		'Modo Farmeo EXP', //31
		];
	}
	else {
		var noS = [ '', 'Raccoons', 'Money (Citros)', 'Squeezer Level', 'Lemons', 'Lemonade (l)', 'Popularity',
		'If you need lemons, you can always steal them', 'Gather lemons to make lemonade', 'You need lemonade so you can sell it',
		'Your lemonade stand is closed.<br>Click on the sign below the clock \
		to open it again.', "Sometimes trying to draw your clients' attention attract them",
		'Every Raccoon gathers lemons for your lemonade stand', 'Squeezers help get more lemonade with less lemons',
		'A Boy Scout will always do as possible to increase clients, even \
		selling lemonade at every door', 'Badges', 'Charisma',
		'Amount of experience that this helper has and needs to level up.',
		'Amount of lemons that this helper gathers every second.', 'Money this helper obtains god knows where every second.',
		'Increases lemonade price.', 'Increases weight of tips.', 'Chances of attracting customers.',
		'Increases chance of receiving tips.', 'Helper level. You can promote him at level 10', 'All', 'Gentleness', 'Honesty', 'Evil',
		'Can get promoted', 'Invert Order',
		'EXP Farming Mode', //31
		];
	}
	if (text > 0) {
		text = noS[text];
	}

	if (init == true) {
		document.getElementById('notif').innerHTML = text;
		document.getElementById('notif').style.display = 'inline';
		notifDirection = 1;
		notifMoving = true;
		notifOpacity = 1;
		notifWait = 20;
		initX = cursorX;
		initY = cursorY;

		var maxX = Math.floor(window.innerWidth/2);
		var maxY = Math.floor(window.innerHeight/2);
		var addX = 50;
		var addY = 0;
		if (cursorX > maxX) addX = -200;
		if (cursorY > maxY) addY = 0;
		document.getElementById('notif').style.left = (cursorX+addX)+"px";
		document.getElementById('notif').style.top = (cursorY+addY)+"px";
	}
	document.getElementById('notif').style.opacity = notifOpacity;
}

var notifAch = {
	'text': null,
	'opacity': 1,
	'bright': 100,
	'wait': 100,
}
var ufs = "";
var baseSpeed = 100;
function ultraFastSqueezingModeActivated() {
	ufs = 1;
}
function ultraFastSqueezing() {
	if (ufs) ufs++;
	if (makin && ufs%baseSpeed == 0) makeLemonade();
}
function movingNotif() {
	//Aka ultrafast events
	if (makin && data.squeezer.ultraFast) makeLemonade();

	notifAch['bright']-=2;
	document.getElementById('notifAch').style.boxShadow = '0 0 '+notifAch['bright']+'vh yellow';
	if (notifAch['bright'] <= 2) notifAch['bright'] = 4;

	notifAch['wait']-=0.75;

	document.getElementById('notifAch').style.opacity = notifAch['opacity'];

	if (notifAch['wait'] <= 0) {
		notifAch['wait'] = 0;
		notifAch['opacity']-=0.031;
	}

	if (notifMoving == true) {
		if (notifDirection == 1) {
			notifOpacity+=(notifDirection/25);
			if (notifOpacity >= 1 && notifDirection > 0) notifDirection = 0;
		}
		if (notifDirection == 0) {
			var difx = Math.abs(initX-cursorX);
			var dify = Math.abs(initY-cursorY);
			var area = (difx < 32 && dify < 32);
			if (!area) {
				doc('notif').opacity = 0;
				notifWait = 0;
				notifOpacity = 0;
			}
			if (notifWait <= 0) notifDirection = -1;
		}
		notif();
		if (notifDirection == -1) {
			notifOpacity-= 0.05;
			if (notifOpacity < 0) {
				notifMoving = false;
				//document.getElementById('notif').style.display = 'none';
			}
		}
	}
}
function updateUpgrades() {
	var line = "<br>";
	var m = upgrades.length;
	for (i = 0; i < m; i++) {
		var line = line + "<tr class='upgrade'><td id='upgrade"+i+"'><b>"+upgrades[i][0]+"</b></td><td><i>"+upgrades[i][1]+"</i></td><td>Precio: "+upgrades[i][2]+"</td></tr>"
	}

	document.getElementById("upgrades").innerHTML = line;
}

function newBuyer(forced) {
	//Mimic skill
	var mimicRandom = rand(1,helpers.length-1);
	mimicry(mimicRandom);

	//Musicians
	getMusicTip();

	//Attempts a police raid

	policeRaid();

	//Shit --- Decide cuando viene un nuevo cliente.
	var popModClient = popModCalc();
	var quota = getQuota("hi");
	if (lemonade < quota) {
		quota = getQuota();
	}
	var x = Math.floor(popModCalc()*100);
	var random = rand(1,x);


	if ((random <= 2 || forced) && lemonade >= quota && lemonadePostOpen) {
		sellLemonade(quota, forced);
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

	changeLemonadePrice(priceLock)
	var bef = lemonadePrice;
	//Mierda provisional
	for (i = 0; i < qty; i++) {
		if (type == 'orange') {
			var ftype = (commonLang == 'es') ? 'una naranja' : 'an orange';
			var prais = 7;
		}
		if (type == 'grapefruit') {
			var ftype = (commonLang == 'es') ? 'un pomelo' : 'a grapefruit';
			var prais = 10;
		}
		if (type == 'lime') {
			var ftype = (commonLang == 'es') ? 'una lima' : 'a lime';
			var prais = 15;
		}
		if (type == 'ice') {
			var ftype = (commonLang == 'es') ? 'hielo' : 'some ice';
			var prais = 23;
		}
		if (type == 'sugar') {
			var ftype = (commonLang == 'es') ? 'azúcar' : 'sugar';
			var prais = 35;
		}
	}
	if (qty == 9) prais = Math.round((prais*=9)*0.8);
	if (qty == 99) prais = Math.round((prais*=99)*0.64);
	if (dollars < prais) {
		var mzg = 'No tienes dinero suficiente. Necesitas '+shortNum(prais)+'ç';
		if (commonLang == 'en') var mzg = "You don't have enough money. You need "+shortNum(prais)+"ç";
		logIt(mzg);
		notif(mzg, true);
		return;
	}

	dollars -= prais;
	lemonadeMix[type] += qty;
	lemonadeMix['lemon'] += qty;
	lemonRate+=qty;

	echo('unstableShop','');
	if (lemonRate > lps*10) {
		var mzg = (commonLang == 'es') ?
		"Si sigues añadiendo fruta a la mezcla, no podrás hacer limonada." :
		"If you continue adding ingredients to the mix, you will not be able to make more.";
		echo('unstableShop', mzg);
	}

	changeLemonadePrice(priceLock);
	var diff = lemonadePrice-bef;
	
	var init = (commonLang == 'es') ? 'Has añadido '+ftype+' a tu limonada.' : 'You added '+ftype+' to your lemonade.';
	var difference = (lemonadePrice > bef) ? 'subido':'bajado';
	if (commonLang == 'en') var difference = (lemonadePrice > bef) ? 'increased':'decreased';
	var last = (commonLang == 'es') ? 'El precio de tu limonada ha '+difference+' a '+lemonadePrice+'ç' : 'Your lemonade price have been '+difference+' to '+lemonadePrice+'ç';
	var msg = (lemonadePrice > bef) ? init+"<br> \
	¡Sabe bien!<br><br>"+last : init+"<br>¡La limonada ahora sabe a mierda! \
	Arréglalo comprando más ingredientes.<br><br>"+last;
	if (commonLang == 'en') var msg = (lemonadePrice > bef) ? init+"<br> \
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
	var tit = "Puedes vender " + quotaCalc(lemonadeResearchLevel, true) + ", que tiene capacidad para " + totalLem + " litros";
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
//Eventos cada segundo
function timeShit() {
	//Updates in-game text
	
	achievementCheck();

	//Gift and wallets related
	var giftMod = 1 + (getSkillsByID(20) * 0.5);
	if (gift) gift -= (10 * giftMod);
	if (stealTimer) stealTimer -= 10;
	if (stealTimer <= 0 || !stealTimer) stealTimer = 0;
	if (gift <= 0) {
		document.getElementById('scoutImg').src = 'img/scout2.png';
	}
	else {
		document.getElementById('scoutImg').src = 'img/scout.png';
	}
	if (!gift) stealTimer = 0;

	//Lemonade stuff
	checkLemonade();
	if (makin) makeLemonade();

	var realRate = 11 - data.squeezer.autoSqueezeLevel;
	var pseudoRandomNumber = Math.ceil(played) % realRate
	pseudoRandomNumber = Math.floor(pseudoRandomNumber);
	if (pseudoRandomNumber == 0 && data.squeezer.autoSqueezeLevel) makeLemonade(true);


	if (doingShit) doShit();

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
	


	lps = getLPS();
	cps = getCPS();

	var popBonus = 100*attentionWhore;
	//popularity = ( ( 1.41 * boyScouts + (100*attentionWhore) ) / ( lemonadePrice / 1.5 ) );

	lpt = lps / 10;
	incLimones(lpt, true);

	cpt = cps / 10;
	incDollars(cpt, true);

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

	//Dollar and CPS display
	var dcps = shortNum(dollars)+'ç ('+shortNum(cps)+')';
	echo('dollars', dcps);

	var raccoons    = getHelpersByType('raccoon');
	var exprimators = data.squeezer.level;
	var boyScouts   = getHelpersByType('boyScout');


	echo('raccoons', raccoons);
	echo('exprimators', exprimators);
	echo('boyScouts', boyScouts);
	echo('lemonadePrice', lemonadePrice);
	echo('gameVersion', "Lemontastic v" + gameID);
	echo('gameVersion2', "Cambios en la versión v" + gameID);

	echo('fridgeLemons', "("+shortNum(savedFridgeLemons)+")");

	var chPercent = 100 - getTipChance();
	if (popPercent < 0) popPercent = 0;
	if (chPercent  < 0) chPercent  = 0;

	document.getElementById("pop").innerHTML = popPercent + "%";
	echo('charisma', chPercent + '%');

	//TODO change charisma img with sprite
	document.getElementById('charismaPic').src = (chPercent == 0) ? 'img/charisma2.png' : 'img/charisma.png';


	document.getElementById("raccoonPrice").innerHTML = shortNum(raccoonPrice)+"ç";
	document.getElementById("boyScoutPrice").innerHTML = shortNum(boyScoutPrice)+"ç";

	//Check game version
	var actualID = "0.9.10";
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
	dollars = JSON.parse(localStorage.getItem("dollars"))/100;
	
	lemonadePrice = ( parseInt(localStorage.getItem("lemonadePrice")) )/10;
	lemonadeResearchLevel = parseInt(localStorage.getItem("lemonadeResearchLevel"));
	clock = parseInt(localStorage.getItem("clock"));
	played = parseInt(localStorage.getItem("played"));
	priceLock = localStorage.getItem("priceLock");
	dayPassed = parseInt(localStorage.getItem("dayPassed"));
	lemonadePostOpen = JSON.parse(localStorage.getItem('lemonadePostOpen'));
	savedLemons = JSON.parse(localStorage.getItem('savedLemons'));
	savedFridgeLemons = JSON.parse(localStorage.getItem('savedFridgeLemons'));

	lemonRate = JSON.parse(localStorage.getItem('lemonRate'));

	lemonadeMix = JSON.parse(localStorage.getItem('lemonadeMix'));

	gameID = localStorage.getItem("gameID");

	helpers = JSON.parse(localStorage.getItem('helpers'));
	achievementList = JSON.parse(localStorage.getItem('achievementList'));
	records = JSON.parse(localStorage.getItem('records'));
	lastRecords = JSON.parse(localStorage.getItem('lastRecords'));

	if (!localStorage.getItem('stealTimer')) localStorage.setItem('stealTimer', 0);
	stealTimer = parseInt(localStorage.getItem('stealTimer'));

	data = JSON.parse(localStorage.getItem('data'));
	}
}
function resetVariables() {
	if (!data) data = {};
	if (!data.temp) data.temp = {};
	if (!data.storage) data.storage = {'limones': 0, 'dollars': 0};
	if (!data.badgeBonus) {
		data.badgeBonus = {};
		data.badgeBonus.lps = 0;
		data.badgeBonus.cps = 0;
	}
	tutoMessages();
	if (!limones) limones = 2;
	if (!lemonade) lemonade = 0;
	if (!dollars) dollars = 10;
	if (!lemonadePrice) lemonadePrice = 15;
	if (!lemonadeResearchLevel) lemonadeResearchLevel = 0;
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
	if (!achievementList) achievementList = [];
	if (!records) records = {
		'limones': 0,
		'lemonade': 0,
		'dollars': 0,
		'tips': 0,
		'sales': 0,
	}
	if (!lastRecords) lastRecords = {
		'limones': 10,
		'lemonade': 10,
		'dollars': 10,
		'tips': 0,
		'sales': 0,
	}
	if (!data) {
		data = {};
	}
	if (!data.squeezer || !data.squeezer.level) {
		data.squeezer = {
			'name': getNewName('exprimator'),
			'level': 0,
			'upgrades': {},
		};
	}
	if (!data.badges) data.badges = 0;
	if (!data.gameTime) data.gameTime = {};
	//if (!ufs && data.squeezer.ultraFast) ultraFastSqueezingModeActivated();
}
function badgeCalc(peek) {
	var recordTypes = ['limones', 'lemonade', 'dollars', 'helpers', 'levels'];
	var total = 0;
	var c = []
	for (x in recordTypes) {
		var c1 = records[recordTypes[x]]
		var c2 = lastRecords[recordTypes[x]];
		c[x] = c1 - c2;
		var recordBeaten = c1 > c2

		if (recordBeaten) total += 1;
	}
	var totNum = 0;
	for (x in c) {
		if (c[x] > 0) totNum += c[x];
	}
	var percent = ( totNum / Number.MAX_SAFE_INTEGER ) * 10000;
	percent = percent + ((totNum / Number.MAX_VALUE) *10000000);
	if (percent > 1000) percent = 1000;
	console.log('Weight percent '+percent);
	percent = Math.floor(percent);

	getTotalLevels();
	var totLevels = Math.floor(records.levels / 100);

	var totSpecHelpers = getSpecialHelperNumber();

	var ing = translate("insignias|badges");
	var mzg = "";
	if (total) mzg += "\n- "+translate("Superación de récords: |Record beating: ")+"+"+total+" "+ing;
	if (percent) mzg += "\n- "+translate("Riquezas: |Wealth: ")+"+"+percent+" "+ing;
	if (totLevels) mzg += "\n- "+translate("Niveles totales: |Total levels: ")+"+"+totLevels+" "+ing;
	if (totSpecHelpers) mzg += "\n- "+translate("Reembolso de Insignias: |Badge Refund: ")+"+"+totSpecHelpers+" "+ing;

	var achBonus = 1;
	if (total) {
		var minx = 0;
		for (z in achievementList) if (achievementList[z]) minx++;
		var maxx = achievementNames.length;
		var p = 1 + (minx/maxx);
		var achBonus = p;
		if (getSkillsByID(30)) achBonus *= 2;
		mzg += "\n- Bonus "+translate(' por logros| per achievements')+' '+shortNum(achBonus*100)+'%';
	}

	if (peek) return mzg

	var total = total + percent + totLevels + totSpecHelpers;
	total = Math.floor(total * achBonus);

	return total;
}
function getTotalLevels() {
	var z = 0;
	var totalmul = 1;
	for (x in helpers) {
		z += helpers[x].level;
		totalmul += getLevelUpCost(x);
	}
	records.levels = z;
	data.temp.levels = z;
	data.temp.lupCost = totalmul;
	return z;
}
function resetGame(hard) {
	var num = badgeCalc();
	var asdfmsg = (commonLang == 'es') ? 'Resetear de verdad? Conseguirás '+num+' insignias.' : 'Reset? Sure? You will earn '+num+' badges.';
	asdfmsg += '\n\n'+badgeCalc(true);

	if (!hard) var asdf = confirm(asdfmsg);
	if (asdf == true || hard) {
		data.resetted = (!data.resetted) ? 1 : (data.resetted + 1);
		console.log('Resetting...');
		data.badges += num;
		lastRecords = records;
		records = {};
		loggy0 = ""; loggy1 = ""; loggy2 = ""; loggy3 = ""; loggy4 = ""
		logIt("El juego ha sido reseteado a cero.");
		limones = undefined; lemonade = undefined; dollars = undefined;
		lemonadePrice = undefined; lemonadeResearchLevel = undefined;
		gameID = undefined; clock = undefined;
		priceLock = undefined; savedLemons = undefined; lemonRate = undefined;
		savedFridgeLemons = undefined;
		lemonadeMix = undefined; helpers = undefined;
		toMakeLemonade = 0;
		data.squeezer = {};
		if (hard) {
			data = undefined;
			records = undefined;
			lastRecords = undefined;
		}

		resetVariables();
	}
}
function hardReset() {
	var msg = translate('¿Estás seguro de que quieres resetear TODO?|Are you sure you want to reset EVERYTHING?');
	if (confirm(msg)) {
		var msg = translate('Si continúas, perderas todos los datos, incluidas las insignias y logros.|If you continue, you will lose all your data, including badges and achievements');
		if (confirm(msg)) {
			var toDelete = ['limones', 'lemonade', 'dollars', 'lemonadePrice',
			'lemonadeResearchLevel', 'gameID', 'clock', 'played', 'priceLock',
			'dayPassed', 'lemonadePostOpen', 'savedLemons', 'savedFridgeLemons',
			'lemonRate', 'lemonadeMix', 'helpers', 'records', 'lastRecords',
			'achievementList', 'stealTimer', 'data'];

			for (x in toDelete) {
				localStorage.removeItem(toDelete[x]);
			}
			achievementList = [];
			dayPassed = 0;
			played = 0;
			resetGame(true);
		}
	}
}
function saveGame(mode) {
toCookie("limones", limones);
toCookie("lemonade",lemonade);
toCookie("dollars",dollars*100);
toCookie("lemonadePrice",lemonadePrice*10);
toCookie("lemonadeResearchLevel",lemonadeResearchLevel);
toCookie("gameID",gameID);
toCookie("clock",clock);
toCookie("played",played);
toCookie("priceLock", priceLock);
toCookie("dayPassed", dayPassed);
toCookie("lemonadePostOpen", lemonadePostOpen);
toCookie('savedLemons', savedLemons);
toCookie('savedFridgeLemons', savedFridgeLemons);
toCookie('lemonRate', lemonRate);
toCookie('lemonadeMix', JSON.stringify(lemonadeMix));
toCookie('helpers', JSON.stringify(helpers));
toCookie('records', JSON.stringify(records));
toCookie('lastRecords', JSON.stringify(lastRecords));
toCookie('achievementList', JSON.stringify(achievementList));
toCookie('stealTimer', stealTimer);
toCookie('data', JSON.stringify(data));

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
	if (stealTimer) return (commonLang == 'es') ? 'No puedes robar ahora, te han pillado hace poco.' : "You can't steal now, you have been caught recently.";
	if (gift == 0) getGift();
	//Robar limones
	var prob = rand(0,2);
	var msg = (commonLang == 'es') ? '¿Qué haces? ¡Eh! ¡Deja de robarme limones!. ¡Fuera de aquí!' : 'Whaddya doing? Hey! Stop stealing my lemons!';
	if (prob == 0) {
		gift += 1000;
		getGift();
		stealTimer = rand(1000,9000);
		return msg;
	}
	var max = savedLemons;
	var msg = (commonLang == 'es') ? 'Has intentado robar algo... ¡Pero no había nada que robar!' : 'You have tried stealing something... But there is nothing to steal!';
	if (!max) return msg;
	max /= rand(2,10);
	max += 1;
	max = Math.floor(max);

	max *= Math.pow(1.1,getSkillsByID(36));

	incLimones(max);
	savedLemons -= max;
	var msg = (commonLang == 'es') ? 'Has robado '+max+' limones' : 'You stole '+max+' lemons';
	if (prob > 0) return msg;
}
function stealFridge() {
	//Coger limones de la nevera
	if (savedFridgeLemons) {
		incLimones(savedFridgeLemons);
		var max = savedFridgeLemons
		savedFridgeLemons = 0;
		var more = (max > 1) ? ( (commonLang == 'es') ? 'es': 's' ) : '';
		return (commonLang == 'es') ? 'Has cogido '+shortNum(max)+' limon'+more+' de la nevera.' : 'You pick '+shortNum(max)+' lemon'+more+' from the fridge';
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
function makeLemonade(shutUp) {
	var exprimators = data.squeezer.level;

	var expRate = (40+(data.squeezer.level*11.2));
	var totalLemonade = (lemonRate*expRate);

	if (limones < lemonRate) {
		var msg = (commonLang == 'es') ? 'No puedes hacer limonada, necesitas '+lemonRate+' limones.' : "You can't make lemonade, you need at least "+lemonRate+" lemons.";
		if (!shutUp) notif(msg, true);
		return;
	}

	limones -= lemonRate;
	if (!toMakeLemonade) toMakeLemonade = 0;
	toMakeLemonade += totalLemonade;
}
function checkLemonade() {
	if (toMakeLemonade > 0) {
		if (!data.squeezer.speed) data.squeezer.speed = 0;
		var rate = 11 - data.squeezer.speed;
		var p10 = Math.round(toMakeLemonade/rate)+1;
		if (toMakeLemonade < 1) p10 = toMakeLemonade;
		toMakeLemonade-=p10;
		incLemonade(p10);
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
		"Puedes coger limones de la nevera si quieres, ¿Vale?",
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
		"Tu madre ha comprado algo de fruta, puedes mirar en la nevera.",
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
function sleep(peek) {
	var canSleep = ( (clock >= 1320 && clock <= 1440) || (clock >= 0 && clock <= 360) );
	if (peek) return canSleep;
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
var plainTransition = false;
function forceTransition() {
	plainTransition = true;
	sleeping = true;
}
function sleepTransition() {
	if (sleeping) {
		if (sleepOpac <= 1) {
			document.getElementById('black').style.display = 'block';
			document.getElementById('black').style.opacity = sleepOpac;
			sleepOpac += 0.027;
			if (!plainTransition) {
				clock+=6;
				if (clock >= 1440) clock = 0;
				updateClock('fast');
			}
		}
		else {
			document.getElementById('black').style.display = 'none';
			document.getElementById('black').style.opacity = 0;
			sleepOpac = 0;
			sleeping = false;
			if (!plainTransition) {
				clock = targetTime;
				var thisHour = numToClock(targetTime*60)[0]+":"+numToClock(targetTime*60)[1];
				var msg = 'Has dormido hasta las '+thisHour+'. Asegúrate de volver a abrir tu puesto de limonada.';
				if (commonLang == 'en')
				var msg = 'You have been sleeping until '+thisHour+'<br> \
				Make sure that your lemonade stand is open today.';
				
				notif(msg, true);
				logIt(msg);
				incSavedLemons();
			}
			plainTransition = false;
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
var marqAlert = 0;
function marq() {
	if (marqAlert > 0) marqAlert -= 0.75;
	if (Math.floor(marqAlert)%2 > 0) {
		document.getElementById('marq').style.borderBottom = '4px solid rgba(255, 0, 0, 0.5)';
	}
	else {
		document.getElementById('marq').style.borderBottom = '4px solid transparent';
	}
	var del = Math.floor(marqText.length/150)+1;
	marqText = marqText.substring(del);
	while (marqText.length < 160) marqText+=" ";
	document.getElementById('marq').innerHTML = marqText.substring(0,160);
}
var gift = 1800;
function getGift() {
	if (gift <= 0) gift = 0;
	if (!gift) {
		incSavedLemons();
		var min = rand(1,dollars);
		min++;
		var giftMod = 1 + (getSkillsByID(20) * 0.25);
		min *= giftMod;

		giftMoneh = Math.round(min);
		if (giftMoneh < 0) giftMoneh *= -1;
		var msg = (commonLang == 'es') ?
		'Has encontrado una cartera con '+shortNum(giftMoneh)+' ç en el suelo.' :
		'You have found a wallet with '+shortNum(giftMoneh)+' ç on the floor.';
		incDollars(giftMoneh);
		logIt(msg);
		gift = 22000;
	}
	gift*=1.1;
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
		var rate = rates[fruit];
		var x = lemonadeMix[fruits[fruit]];

		var rate = (x*rate);
		var calc = Math.sin(rate)+(rates[fruit]/10)+(x/100);

		var thisQuality = ( Math.ceil(calc*100)/100 ) + 1;

		if (x == 0) thisQuality = 1;
		quality+=thisQuality;
	}
	var indiv = quality / fruits.length;
	var noLemonIngredients = getTotalIngredients()-lemonRate;
	var qualityMod = ( Math.sin(noLemonIngredients) ) + 1;
	var quality = indiv+qualityMod;
	var retQuality = Math.round(quality*100)+' %';
	echo('lemonMix',retQuality);

	echo('addedLemons', lemonRate);
	echo('addedOranges', lemonadeMix[fruits[0]]);
	echo('addedGrapes', lemonadeMix[fruits[1]]);
	echo('addedLimes', lemonadeMix[fruits[2]]);
	echo('addedIce', lemonadeMix[fruits[3]]);
	echo('addedSugar', lemonadeMix[fruits[4]]);

	return quality;
}
function getLemonadeMod(ret) {
	var rates = {
		//First value is price modification, second is popularity
		"lowest":  [0.5,  1.1],
		"low":     [1,    1],
		"high":    [1.25, 0.75],
		"highest": [1.5,  0.5],
	};

	return rates[priceLock][ret]
}
function getLemonadePrice(ret) {
	var base = 5;

	base *= getFruitBonus();

	base *= getLemonadeMod(0);

	if (!records.sales) records.sales = 0;
	var bonus = 1 + (records.sales / 100);

	base *= bonus;

	return Math.round(base);
}
function expToNextLevel(level, classLevel, path) {
	if (path <= 1) {
		level = (classLevel*10)+level;
		return Math.ceil(Math.pow(level, 2)*2);
	}
	if (path > 1) {
		if (path > 1) level = level*2;
		return Math.ceil(Math.pow(level, 3)*3);
	}
}
function expTo10NextLevel(level, classLevel, path) {
	var z = 0;
	for (i = 0; i < 10; i++) {
		z += expToNextLevel(level+i, classLevel, path);
	}
	return z;
}
function getClassModifiers(type, path, cL) {
	//LPS - CPS - Engaño --- Amabilidad - Popularidad - Carisma
	//lps - cps - priceInc --- gentle - pop - charisma
	//Normal tier - Alternate tier - Total stat points

	//Tier 1/1:   0.5 total
	//Tier 2:     0.8 total
	//Tier 3/2:     1 total
	//Tier 4:     1.2 total
	//Tier 5/3:   1.5 total
	//Tier 6:       2 total
	//Tier 7/4:     3 total
	//Tier 8:       5 total
	//Tier 9/5:     6 total
	//Tier 10:      7 total

	if (type == 'boyScout') {
		return [
		//Good
			[
				//Vanilla scout
				[0, 0, 0, 0, 0.5, 0, 0],        //0.5 High Popularity.

				//Lemonade boy.
				[0, 0, 0, 0.25, 0.5, 0.25, 0.1], //1   Gentle, Pop and Charisma. Higher Pop.
				//Entrepreneur
				[0, 0, 0, 0.25, 1, 0.25, 0.1],   //1.5 Gentle, Pop and Charisma. Higher Pop.
				//Manager
				[0, 0, 0, 0.5, 1, 0.5, 0.2],     //2   Gentle, Pop and Charisma. Higher Pop.
				//Publicist
				[0, 0, 0, 0, 2.5, 0, 0.2],       //2.5 Higher Popularity.
				//Accountant
				[0, 0, 0, 1, 1, 1, 0.3],         //3   High gentle, Pop and Charisma.
				//Employee
				[0, 0, 0, 1, 1, 1.5, 0.3],       //3.5 Increases money per second. Increase gentle, pop and charisma.
				//Associate
				[0, 0, 0, 1, 1, 2, 0.4],         //4   Increases all Boy Scout stats and CPS.
				//Assistant Chief
				[0, 0, 0, 0.5, 2, 2, 0.4],   //4.5 Low Gentle and Charisma. High Popularity and CPS.
				//Chief
				[0, 0, 0, 0.5, 1.5, 3, 0.5], //5   High CPS and above average Popularity. Low Gentle and Charisma.
				//CEO
				[0, 0, 0, 2.5, 1, 2, 0.5],   //5.5 Highest CPS. Low gentle and Charisma.
			],

		//Bad
			[
				//Vanilla scout
				[0, 0, 0, 0, 0.5, 0, 0],       //0.5

				//Fake blind
				[0, 0, 0, 1, 0, 0.5, -0.1],       //1.5 High Gentle and low charisma.
				//Liar
				[0, 0, 2, 0.5, 0, 0, -0.2],   //2.5 High fraud. Low gentle and charisma.
				//Trickster
				[0, 0, 3, 0.5, 0, 0, -0.3],       //3.5 High fraud. Average charisma and low gentle.
				//Cheater
				[0, 0, 4, 0.5, 0, 0, -0.4],       //4.5 High fraud. Average charisma and low gentle.
				//Con artist
				[0, 0, 5.5, 0, 0, 0, -0.5],   //5.5 High fraud. Low charisma and gentle.
			],

		//Special Scout (Unique)
			[
				//Vanilla scout
				[0, 0, 0, 0, 0.5, 0, 0], //0.5

				[0, 0, 0, 0, 2, 0, 0],		 //Gamer
				[0, 0, 0, 2, 0, 2, 0.5],     //Crazy Raccoon Lady
				[0, 2, 0, 0, 0.5, 1, -0.5],  //Musician

			],
		//Special Scout
			[
				[0, 0, 0, 0, 0.5, 0, 0], //Vanilla scout

				[0, 0, 0, 0, 1, 0, 0.2], //Girl Scout. P3CL01
				[0, 0, 0, 1, 1, 1.5, 0.2], //Trainee.  P3CL02
				[0, 0, 5, 2, 2.5, 2, -2],      //Vampire P3CL03
				[0, 0, 0, 0.2, 0.2, 0.2, 0], //Converted Scout P3CL04
				[0, 0, 0, 3.5, 0, 0, 2.5],       //Policeman P3CL05
				[0, 0, 0, 0.5, 0.5, 0.5, 2], //Reformed Scout P3CL06
				[3, 0, 0, 0, 0, 0, -1],      //Werecoon (Converted) P3CL07
				[0, 0, 0, 0.5, 2, 0.5, 1],    //Werecoon (Human)     P3CL08
				[1.5, 1.5, 1.5, 0, 0, 0, -0.4], //Gangster Scout    P3CL09
				[0, 0, 4.5, 0.75, 1.5, 0.75, -4.5], 	//Succubus			P3CL10
			],

		][path][cL];
	}
	if (type == 'raccoon') {
		return [
		//Good
			[
				//Vanilla coon
				[0.5, 0, 0, 0, 0, 0, 0],         //0.5

				//Insurance
				[0.5, 0, 1, 0, 0, 1, 0.1],     //1.5
				//Tax collector
				[0.5, 1, 0.5, 0, 0, 0.5, 0.2],   //2.5
				//IRS Agent
				[0.5, 1, 0, 1, 0, 1, 0.3], //3.5
				//Mortgage Broker
				[0.5, 2, 0, 1, 0, 1, 0.4],           //4.5
				//Defense Lawyer
				[0.5, 1.25, 1.25, 1.25, 0, 1.25, 0.5]   //5.5
			],

		//Bad
			[
				//Vanilla coon
				[0.5, 0, 0, 0, 0, 0, 0],           //0.5

				//Thug
				[1, 0, 0, 0, 0, 0, -0.1],         //1    High LPS
				//Goon
				[1.5, 0, 0, 0, 0, 0, -0.1],         //1.5  High LPS
				//Delinquent
				[2, 0, 0, 0, 0, 0, -0.2],         //2    High LPS
				//Klepto
				[0.5, 2, 0, 0, 0, 0, -0.2],  //2.5 High CPS and low LPS
				//Pickpocket
				[0.5, 2.5, 0, 0, 0, 0, -0.3],  //3   High CPS and low LPS
				//Thief
				[0.5, 3, 0, 0, 0, 0, -0.3],  //3.5 High CPS and low LPS
				//Racketeer
				[0, 0, 4, 0, 0, 0, -0.4],         //4   High Fraud and low LPS
				//Gangster
				[1.5, 1.5, 1.5, 0, 0, 0, -0.4], //4.5 High LPS, CPS and Fraud. High pop decrease.
				//Don
				[1.5, 1.5, 2, 0, 0, 0, -0.5],  //5   High LPS, CPS and Fraud. Higher pop decrease.
				//Mastermind
				[1, 1, 3.5, 0, 0, 0, -0.5],           //5.5 High LPS, CPS and Fraud. Highest pop decrease.
			],

		//Special Coon (Unique)
			[
				//Vanilla coon
				[0.5, 0, 0, 0, 0, 0, 0], //0.5

				//Raccoon C
				[1, 0, 0, 0.5, 0.5, 0.5, 1], 
				//Cryo the Badge Collector
				[1, 1, 0, 0, 0.1, 0, 0.5],

			],

		//Special Coon
			[
				[0.5, 0, 0, 0, 0, 0, 0], //Vanilla coon P3CL0

				[0.1, 0, 0, 0.5, 1, 0.5, 0.5], //Raccat P3CL1
				[2, 0, 0, 0, 0, 0, 4.5], //Angel Coon     P3CL2
				[2, 0, 0, 0, 0, 0, -4.5], //Demon Coon    P3CL3

				[0, 4.5, 0, 0, 1.1, 2.2, 1], //Jazz Coon P3CL4
				[0, 0, 0, 0, 0, 0, 0],		 //Mime Coon P3CL05

				[0.5, 0, 0, 0.5, 0, 0.5, 2], //Reformed Coon P3CL06

			],

		][path][cL];
	}
}
function helper(type, name, id) {
	this.type = type;
	this.name = name;
	this.level = 1;
	this.classLevel = 0;
	this.exp = 0;
	this.classNam = "Exprimidor";

	//Base stats

	this.baseLps = 1;
	this.baseCps = 1;
	this.basePriceInc = 1;

	this.basePop = 1;
	this.baseCharisma = 1;
	this.baseGentle = 1;

	this.baseGood = 1;

	//Final stats

	this.lps = 0;
	this.cps = 0;
	this.priceInc = 0;

	this.pop = 0;
	this.charisma = 0;
	this.gentle = 0;

	this.good = 0;

	this.path = 0;

	if (id) {
		this.classLevel = id;
		this.level      = 1;
		this.path       = 3;
		this.exp        = 0;

		this.baseLps      += rand(5,10);
		this.baseCps      += rand(5,10);
		this.basePriceInc += rand(5,10);
		this.basePop      += rand(5,10);
		this.baseCharisma += rand(5,10);
		this.baseGentle   += rand(5,10);

		this.baseGood     += rand(5,10);
	}
	if (type == 'raccoon') {
		this.classNam = "Mapache";
	}
	if (type == 'boyScout') {
		this.classNam = "Boy Scout";
	}
	this.upgradeClass = function(path) {

	}
}
function realHelperLevelUp(id) {
	var thees = helpers[id];

	thees.baseLps += rand(1,20)/100;
	thees.baseCps += rand(1,20)/100;
	thees.basePriceInc += rand(1,20)/100;

	thees.basePop += rand(1,20)/100;
	thees.baseCharisma += rand(1,20)/100;
	thees.baseGentle += rand(1,20)/100;

	thees.baseGood += rand(1,20)/100;

	var epn = expToNextLevel(thees.level, thees.classLevel, thees.path);
	thees.exp = 0;
	if (thees.exp < 0) thees.exp = 0;
	thees.level += 1;

	if (!records.levels) badgeCalc(true);
	records.levels += 1;
	showTextHere('helperButton', '1UP');
	return 'Level up!';
}
function getExpGain(quantity) {
	if (!quantity) quantity = 0;
	var maxExpTo = 1 + helpers.length + quantity;
	//Exp bonus
	var expBonus = 1 + getSkillsByID(17);
	maxExpTo *= expBonus;

	return maxExpTo;
}
function getExpGainFor(id, quantity) {
	var maxExpTo = getExpGain(quantity);

	var expTo = Math.ceil( maxExpTo / (parseInt(id) + 1) );
	expTo /= 2;
	if (expTo < 1) expTo = 1;
	if (getSkill(id) == 22 && !sleep(true)) expTo = 0;
	if (getSkill(id) == 23) expTo = Math.floor(expTo / 2);

	return expTo;
}
function helperIncExp(id, quantity) {
	if (!quantity) return;
	var thees = helpers[id];

	var expTo = getExpGainFor(id, quantity);

	if (thees.exp < 0 || thees.exp == '-') thees.exp = 0;

	thees.exp += expTo;
	thees.exp = Math.ceil(thees.exp);
	var epn = expToNextLevel(thees.level, thees.classLevel, thees.path);
	while (thees.exp >= epn) {
		realHelperLevelUp(id);
		epn = expToNextLevel(thees.level, thees.classLevel, thees.path);
	}
}
function helperChangeName(id, newName) {
	var thees = helpers[id];
	thees.name = newName;
	return 'New name: '+thees.name;
}
function getPriceReductionMod() {
	var accMod = 1 - (getSkillsByID(16) * 0.1);
	if (accMod <= 0.1) accMod = 0.1;
	return accMod;
}
function getLevelUpCost(id) {
	var cost = (8.91 * (helpers[id].classLevel + 0.99)) * Math.pow(1.125, helpers[id].level);

	//Cost modifications go here
	var costMod = records.helpers/25;
	costMod += 0.65;
	costMod *= getPriceReductionMod();
	cost = Math.round(cost*costMod);
	return cost;
}
function helperLevelUp(id, peek, times) {
	if (!helpers[0]) return;
	var cl = helpers[id].classLevel;
	var lvl = helpers[id].level;

	var mzg = (commonLang == 'es') ? 'No puede subir más.' : "It can't increase more.";

	var cost = getLevelUpCost(id);
	if (times) cost *= 9;

	if (peek) return cost;

	updateLevelUpCost(id);

	if (dollars >= cost) {
		if (!times) realHelperLevelUp(id);
		if (times) {
			for (i = 0; i < 10; i++) realHelperLevelUp(id);
		}
		dollars -= cost;
		openHelperStats(id);
		var mzg = (commonLang == 'es') ? ' ha subido al nivel ' : ' reached level '
		return helpers[id].name+mzg+helpers[id].level;
	}
	else {
		return translate("Dinero insuficiente. Esta operación cuesta "+shortNum(cost)+"ç|You have no money. This action requires "+shortNum(cost)+"ç");
	}
}
function getSpecialHelpers(type, classLevel) {
	for (x in helpers) {
		if (helpers[x].type == type && helpers[x].path == 2 && helpers[x].classLevel == classLevel) return 1;
	}
	return 0;
}
function specialHelperUpgradeClass(id, peek) {
	var help = helpers[id];
	if (help.path > 1) return "Can't promote this helper.";
	var specialCoon1 = ( help.name == 'Mapache C' || help.name == 'Raccoon C' );
	console.log(specialCoon1+" special coon.");
	if (help.type == 'raccoon' && specialCoon1) {
		console.log('Trying special coon class...');
		if (getSpecialHelpers('raccoon', 1)) return;
		console.log('Duplicate test passed.');
		if (peek) return 1;
		helpers[id].classLevel = 1;
		helpers[id].level = 1;
		helpers[id].path = 2;
		helpers[id].exp = 0;
	}
	if (help.type == 'boyScout' && help.name == 'Kulivszk') {
		if (getSpecialHelpers('boyScout', 3)) return;
		if (peek) return 1;
		helpers[id].classLevel = 3;
		helpers[id].level = 1;
		helpers[id].path = 2;
		helpers[id].exp = 0;
	}
	if (help.type == 'boyScout' && help.name == 'Ichiinou') {
		if (getSpecialHelpers('boyScout', 2)) return;
		if (peek) return 1;
		helpers[id].classLevel = 2;
		helpers[id].level = 1;
		helpers[id].path = 2;
		helpers[id].exp = 0;
	}
	if (help.type == 'boyScout' && help.name == 'LordGMN') {
		if (getSpecialHelpers('boyScout', 1)) return;
		if (peek) return 1;
		helpers[id].classLevel = 1;
		helpers[id].level = 1;
		helpers[id].path = 2;
		helpers[id].exp = 0;
	}
	if (help.type == 'raccoon' && help.name == 'Cryo') {
		if (getSpecialHelpers('raccoon', 2)) return;
		if (peek) return 1;
		helpers[id].classLevel = 2;
		helpers[id].level = 1;
		helpers[id].path = 2;
		helpers[id].exp = 0;
	}

	if (peek) return;
	openHelperStats(id, true);
	return;
}
function helperUpgradeClass(id, path, peek) {
	if (peek && peek != 'list') return getClassData(helpers[id].type, 'className', path, helpers[id].classLevel+1);

	var cl = helpers[id].classLevel;
	var pathy = helpers[id].path;
	if (cl > 0 && pathy != path) return 'Cant level up this helper';
	if (path > 1) path -= 1;

	var thees = helpers[id];
	var maxLevel = 10;
	var alternate = ( (thees.type == 'boyScout' && path == '1') || (thees.type == 'raccoon' && path == '0') );
	if (alternate) maxLevel = 5;

	if (thees.classLevel == maxLevel) {
		return 'Max class level reached.';
	}
	if (thees.level < 10) return 'Must reach level 10 before upgrading.';
	if (thees.level >= 10 && thees.classLevel < maxLevel) {
		thees.level = 1;
		thees.exp = 0;
		thees.classLevel++;
		thees.path = path;
		thees.classNam = getNewClassName(thees.type, path, thees.classLevel);
	}
	if (peek == 'list') return;
	openHelperStats(id, true);
}
function getClassData(type, ret, path, classLevel) {
	var obj = {
		'boyScout': {
			'className': [
				//Good
				[
				'Boy Scout|Boy Scout',

				'Chico de la Limonada|Lemonade Boy',
				'Emprendedor|Entrepreneur',
				'Manager|Manager',
				'Publicista|Publisher',
				'Contable|Accountant',
				'Empresario|Businessman',
				'Socio|Associate',
				'Subjefe|Assistant Chief',
				'Jefe|Chief',
				'Director Ejecutivo|CEO'
				],

				//Bad
				[
				'Boy Scout|Boy Scout',

				'Minusválido de pega|Fake Blind',
				'Mentiroso|Liar',
				'Trilero|Gambler',
				'Tramposo|Cheater',
				'Estafador|Con Artist'
				],

				//Special Scout (Unique)
				[
				'Boy Scout|Boy Scout', //Default, unused

				'Jugador|Gamer',
				'Loca de los Mapaches|Crazy Raccoon Lady',
				'Músico|Musician',
				],

				//Special Scout
				[
				'Boy Scout|Boy Scout', //Default, unused

				'Girl Scout|Girl Scout',
				'Becario|Businessman Trainee',
				'Vampiro|Vampire',
				'Mordido|Bitten',
				'Policía|Policeman',
				'Ex Tipo Duro|Former Bad Guy',

				'Hombre Mapache|Werecoon',
				'Boy Scout|Boy Scout',
				'Mafioso|Gangster',
				'Súcubo|Succubus',
				],
			],

			'classTooltip': [
				//Good
				[
				'La pasión de este chico son las ventas, ¡Nunca para!|\
				This boy really loves sales. He never gets enough!',

				'Entrega limonada al resto de trabajadores en la empresa. Nadie puede trabajar con este calor encima.|\
				Delivers lemonade to all workers in the business. Nobody can work with this weather.',

				'Un Boy Scout que decidió tomarse el negocio en serio.|\
				A Boy Scout that decided to take the business seriously.',

				'Se encarga de todas las finanzas del puesto de limonada.|\
				Manages all finances between the lemonade stand.',

				'Reparte flyers y muestras para así aumentar los clientes.|\
				Distributes flyers and samples so that there is an increase in customers.',

				'Se encarga de todas las finanzas de la empresa de venta de limonada.|\
				Manages all finances between the lemonade business.',

				'Armado con un traje de negocios y un maletín. Hace todo lo posible por la empresa.|\
				Armed with a business suit and a briefcase. He does everything for the business.',

				'No es que le interese mucho el negocio, pero le gusta recibir sobres con dinero.|\
				He is not interested a lot in the business, but likes money-containing-envelopes.',

				"¡No puedes hacer eso! ¡Soy tu Sub-Jefe!|\
				You can't do that! I'm the Assistant Chief!",

				"¡El Sub-Jefe no puede decirte qué hacer! ¡Yo soy su jefe!|\
				The Assistant Chief can't tell you what you have to do! I'm his superior!",

				"Maneja todos los asuntos de la empresa hasta el punto en el que TÚ ya no eres necesario.|\
				He manages the business to that point that YOU are no longer needed."

				],

				//Bad
				[
				null,

				"Por favor, dame un par de citros, perdí un ojo luchando con un cocodrilo.|\
				Please, give me a pair of citros, I lost one eye fighting with a crocodile.",

				'"Nunca he robado un citro del bote de propinas."|\
				"I have never stole one single citro from the tips jar"',

				"¿Dónde está la bola? ¿Dónde está la bola? ¿Dónde está la bola?|\
				Where is the ball? Where is the ball? Where is the ball?",

				"Escalera de color. Parece que vuelvo a ganar.|\
				Royal flush. Looks like I have won again.",

				"Falsifica todo tipo de documentos para mentir hasta en su sexo. ¿Realmente existe este Boy Scout?|\
				Fakes every type of documentation to lie even with his sex. Does this Boy Scout really exist?",

				],

				//Special Scout (Unique)
				[
				null, //Default, unused
				"Su especialidad es vender galletas, es nueva en esto de la limonada.|\
				Her speciality is selling cookies, she's new with this lemonade world.",
				null, null, null, null,

				],

				//Special Scout
				[
				null, //Default, unused

				"Su especialidad es vender galletas, es nueva en esto de la limonada.|\
				Her speciality is selling cookies, she's new with this lemonade world.",
				null, null, null, null, null,
				null, null, null

				],

			],

			'classPic': [
				//Good
				[
				'img/scouts/scout.png',

				'img/scouts/scout1a.png',
				'img/scouts/scout2a.png',
				'img/scouts/scout3a.png',
				'img/scouts/scout4a.png',
				'img/scouts/scout5a.png',
				'img/scouts/scout6a.png',
				'img/scouts/scout7a.png',
				'img/scouts/scout8a.png',
				'img/scouts/scout9a.png',
				'img/scouts/scout10a.png'
				],

				//Bad
				[
				'img/scouts/scout.png',

				'img/scouts/scout1b.png',
				'img/scouts/scout2b.png',
				'img/scouts/scout3b.png',
				'img/scouts/scout4b.png',
				'img/scouts/scout5b.png'
				],

				//Special Scout(Unique)
				[
				null, //Default, unused

				'img/scouts/scout14.png',
				'img/scouts/scout6e.png',
				'img/scouts/scout5e.png',
				],

				//Special Scout
				[
				null, //Default, unused

				'img/scouts/scout1s.png',
				'img/scouts/scout4e.png',
				'img/scouts/scout2e.png',
				'img/scouts/scout3e.png',
				'img/scouts/scout7e.png',
				'img/scouts/scout8e.png',
				'img/scouts/scout11.png',
				'img/scouts/scout12.png',
				'img/scouts/scout13.png',
				'img/scouts/scout15.png',

				],
			],
		},
		'raccoon': {
			'className': [
				//Good
				[
				'Mapache|Raccoon',

				'Vendedor de seguros|Insurance Salesman',
				'Cobrador del frac|Tax Collector',
				'Cobrador de hacienda|IRS Agent',
				'Agente Hipotecario|Mortgage Broker',
				'Abogado Defensor|Defense Attorney'
				],

				//Bad
				[
				'Mapache|Raccoon',

				'Gamberro|Thug',
				'Matón|Goon',
				'Delincuente|Delinquent',
				'Cleptómano|Kleptomaniac',
				'Carterista|Pickpocket',
				'Ladrón|Robber',
				'Extorsionador|Racketeer',
				'Mafioso|Gangster',
				'Don|Don',
				'Cerebro|Mastermind',
				],

				//Special Coon (Unique)
				[
				null, //Default, unused

				'Superhéroe|Superhero',
				'Coleccionista de Insignias|Badge Collector',
				],
				//Special Coon
				[
				null, //Default, unused

				'Gatache|Raccat',
				'Ángel|Angel',
				'Demonio|Demon',
				'Trompetista|Trumpeter',
				'Mimo|Mime', //rank 5 Mime
				'Ex Delincuente|Former Delinquent',
				],
			],
			'classTooltip': [
				//Good
				[
				"Un mapache mono y peludo que recoge limones por los huertos.|\
				A cute and furry raccoon that gathers lemons from gardens.",

				"Es un as de la persuasión. No parará hasta venderte hasta sus zapatillas.|\
				It's an ace when it comes to persuasion. It will never stop until even its shoes are sold.",

				"Si hay alguien que debe dinero, este mapache lo sabrá. Y no será bueno que lo sepa.|\
				If someone has a debt, this raccoon will know it. And that isn't good.",

				"Si debes dinero y ves a este mapache, ya puedes correr.|\
				If you have a debt and you see this raccoon, it's better that you start running.",

				"La acusación no tiene pruebas de que mi cliente robase esos limones, venga ya, ¿Le estás llamando mafioso?|\
				The charge has no evidence that my client stole those lemons, come on! Are you calling my client a Gangster?"
				],

				//Bad
				[
				null,

				"¿Y tú qué monda miras, tío?|\
				What the peel are you looking, dude?",

				"Es mejor que te largues si no quieres llevarte una torta.|\
				It's better that you leave this place if you don't want a whack",

				"Largo de mi territorio.|\
				Get out of my zone.",

				"No sé cómo llegaron estos citros a mi bolsillo.|\
				I don't have a clue how those citros came to my pocket.",

				"No tengo ni la más remota idea de cómo esa cartera llegó a mis pequeñas patas.|\
				I haven't the slightiest idea of how that wallet came to my lil paws.",

				"¡Juro que no robé ese banco! ¡Estoy limpio!|\
				I swear I didn't rob that bank! I'm clean!",

				"Dame el dinero hoy a las 23:00 en la puerta del Supermercado. No quiero polis.|\
				Give me the money today at 23:00 at the Supermarket. I don't want cops.",

				"Parece que te has metido en serios problemas con quien no debías.|\
				Seems like you ran in trouble with whom you shouldn't.",

				"Un mapache que no pasa tiempo con su familia nunca puede ser un mapache de verdad.|\
				A coon who doesn't spend time with his family can never be a real coon.",

				"Controla a sus subordinados mafiosos desde una pantalla.|\
				Controls all of his subordinate gangsters from a screen.",

				],

				//Special Coon (Unique)
				[
				null, //Default, unused

				"¡Derrotemos juntos a la mafia de la limonada!|\
				Let's beat the lemonade mafia together!.",
				],
				//Special Coon
				[
				null, //Default, unused

				"Una adorable mezcla de gato y mapache.|\
				An adorable mix of a raccoon with a cat.",

				"Este mapache es la encarnación del bien.|\
				This raccoon is the goodness personified.",

				"Este mapache es la encarnación del mal, hace todo lo posible por engañar al mundo.|\
				This raccoon is pure evil, it does everything on his paws to scam all the world."
				],
			],

			'classPic': [
				//Good
				[
				'img/coons/coon.png',

				'img/coons/coon1a.png',
				'img/coons/coon2a.png',
				'img/coons/coon3a.png',
				'img/coons/coon4a.png',
				'img/coons/coon5a.png',
				],

				//Bad
				[
				'img/coons/coon.png',

				'img/coons/coon4b.png',
				'img/coons/coon6b.png',
				'img/coons/coon5b.png',
				'img/coons/coon1b.png',
				'img/coons/coon2b.png',
				'img/coons/coon3b.png',
				'img/coons/coon7b.png',
				'img/coons/coon8b.png',
				'img/coons/coon10b.png',
				'img/coons/coon9b.png',
				],

				//Special Coon (Unique)
				[
				null, //Default, unused

				'img/coons/coon1s.png',
				'img/coons/coon12.png',
				],
				//Special Coon
				[
				null, //Default, unused

				'img/coons/coon2e.png',
				'img/coons/coon3e.png',
				'img/coons/coon4e.png',
				'img/coons/coon11.png',
				'img/coons/mime.png', //Rank 5 Mime
				'img/coons/coon8e.png',
				],
			],
		},
	}
	if (ret == 'className' || ret == 'classTooltip') {
		var cName = obj[type][ret][path][classLevel];
		if (!cName) return;
		cName = cName.split("|");
		if (commonLang == 'es') return cName[0];
		if (commonLang == 'en') return cName[1];
	}
	return obj[type][ret][path][classLevel];
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
function buyHelper(type, specialClassID) {
	if (helpers.length > 99) {
		logIt(translate("No puedes contratar a más ayudantes.|You can't hire more helpers."));
		return;
	}

	if (!records.helpers) records.helpers = 0;
	records.helpers++;
	var newName = getNewName(type);
	if ((specialClassID == 1 || specialClassID == 10) && type == 'boyScout') newName = getNewName('girl');
	helpers[helpers.length] = new helper(type, newName, specialClassID);

	reChangeName(helpers.length-1);
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
	var n4 = getFemaleName();

	if (type == 'boyScout') return n1;
	if (type == 'raccoon') return n2;
	if (type == 'exprimator') return n3;
	if (type == 'girl') return n4;
}
function randomLetter() {
	return String.fromCharCode(rand(65,90));
}
function getHelperList() {
	var l = "";
	for (x in helpers) {
		var type = helpers[x].type;

		var img = 'img/exprim.png'
		if (type == 'raccoon' || type == 'boyScout') var img = getClassData(type, 'classPic', helpers[x].path, helpers[x].classLevel);
		
		var name = helpers[x].name;

		var classNam = getClassData(type, 'className', helpers[x].path, helpers[x].classLevel);
		if (helpers[x].mime == 1) {
			classNam = classNam +' '+ translate('Mimo|Mime');
			img = 'img/coons/mime.png';
		}

		var level = helpers[x].level;
		if (level >= 100) classNam = translate(classNam+' Veterano|Veteran '+classNam);
		var exp = helpers[x].exp;
		var maxExp = expToNextLevel(level, helpers[x].classLevel, helpers[x].path);
		var fullName   = (commonLang == 'es') ? name+" el "+classNam : name+" the "+classNam;
		var tdString01 = (commonLang == 'es') ? "Nivel: "            : "Level: ";
		var tdString02 = translate("Puntos de Experiencia|Experience Points")+"<br>";

		var addTo = "<tr onmouseover='lastHelper = "+x+"' onclick='openHelperStats("+x+")'>\
		<td><img src='"+img+"'></td><td>"+fullName+"</td> \
		<td>"+tdString01+level+"</td><td>"+tdString02+realDrawBar(exp, maxExp)+"</td></tr>";
		if (filterBy && type != filterBy) addTo = "";

		if (filterNoPromote && !hasPromotion(x)) addTo = "";
		var l = l + addTo;
	}
	echo('levelUpAllCost', shortNum(helperLevelUpToAll(true)));
	echo('helperTable', l);

	updateFilter();
}
var changingName = false;
function reChangeName(id) {
	changingName = true;
	if (id == 'exprimator') {
		var olName = data.squeezer.name;
		var type = 'exprimator';
	}
	else {
		var olName = helpers[id].name;
		var type = helpers[id].type;
	}
	var mzg = (commonLang == 'es') ? 'Elige un nuevo nombre: ' : 'Choose a new name: ';
	document.getElementById('newName').value = olName;
	if (!olName) document.getElementById('newName').value = getNewName(type);
	document.getElementById('windowNameBack').style.display = 'inline';
	var confirmName = function() {
		var newName = document.getElementById('newName').value;
		if (!newName && (helpers[id].type == 'boyScout' && (helpers[id].classLevel == 1 || helpers[id].classLevel == 10))) newName = getNewName('girl');
		if (newName)
			(id == 'exprimator') ? data.squeezer.name = newName : helperChangeName(id, newName);
		if (!newName)
			(id == 'exprimator') ? data.squeezer.name = getNewName(type) : helperChangeName(id, getNewName(helpers[id].type));
		document.getElementById('windowNameBack').style.display = 'none';
		document.getElementById('windowName').style.display = 'none';
		changingName = false;
	}
	if (confirmed) confirmName();
	document.getElementById('newNameButton').onclick = function() {
		confirmName();
	};
	showWindow('windowName');
}
function openHelperStats(id, dontOpen) {
	changingName = false;
	lastHelper = id;
	document.getElementById('goodUpgrade').style.display = 'block';
	document.getElementById('badUpgrade').style.display = 'block';
	document.getElementById('specialUpgrade').style.display = 'none';

	document.getElementById('goodUpgrade').onclick = function() {
		helperUpgradeClass(id, 0);
	}
	document.getElementById('badUpgrade').onclick = function() {
		helperUpgradeClass(id, 1);
	}

	var futureSpecialClass = specialHelperUpgradeClass(id, true);
	if (futureSpecialClass) {
		doc('specialUpgrade').style.display = 'block';
		var className = getClassData(helpers[id].type, 'className', 2, futureSpecialClass);
		echo('nextSpecialClassName', '?????');
	}


	document.getElementById('specialUpgrade').onclick = function() {
		specialHelperUpgradeClass(id);
	}



	echo('nextGoodClassName', helperUpgradeClass(id, 0, true));
	echo('nextBadClassName', helperUpgradeClass(id, 1, true));
	

	var typ    = helpers[id].type;
	var cLev   = helpers[id].classLevel;
	var path   = helpers[id].path;
	var isCoon = (typ == 'raccoon')
	var maxGudLevel = (isCoon) ? 5  : 10;
	var maxBadLevel = (isCoon) ? 10 :  5;

	document.getElementById('goodUpgrade').onmouseover = function() {
		var mzg = getClassData(typ, 'classTooltip', 0, cLev+1);
		notif(mzg, true);
	}
	document.getElementById('badUpgrade').onmouseover = function() {
		var mzg = getClassData(typ, 'classTooltip', 1, cLev+1);
		notif(mzg, true);
	}

	var reachedMaxLevel = ((cLev == maxGudLevel) && path == 0) || ((cLev == maxBadLevel) && path == 1);

	if (helpers[id].level < 10 || reachedMaxLevel || path > 1) {
		document.getElementById('goodUpgrade').style.display = 'none';
		document.getElementById('badUpgrade').style.display = 'none';
	}
	if (helpers[id].level < 10 || path > 1) doc('specialUpgrade').style.display = 'none';

	if (helpers[id].classLevel >= 1) {
		if (helpers[id].path == 0) {
			document.getElementById('badUpgrade').style.display = 'none';
		}
		else {
			document.getElementById('goodUpgrade').style.display = 'none';
		}
	}

	echo('helperName', helpers[id].name);
	echo('helperLevel', helpers[id].level);
	var maxExp = expToNextLevel(helpers[id].level, helpers[id].classLevel, helpers[id].path);
	if (helpers[id].level == 10) {
		//echo('helperExp', "-/-");
	}
	else {
		echo('helperExp', helpers[id].exp+"/"+maxExp);
	}



	echo('helperLPS',      shortNum(helpers[id].lps));
	echo('helperCPS',      shortNum(helpers[id].cps));
	echo('helperPriceInc', shortNum(helpers[id].priceInc));

	echo('helperGentle',   shortNum(helpers[id].gentle));
	echo('helperPop',      shortNum(helpers[id].pop));
	echo('helperCharisma', shortNum(helpers[id].charisma));

	echo('helperGood', shortNum(helpers[id].good));

	var help = helpers[id];
	doc('statLPS').style.display = 'table-row'; doc('statGentle').style.display = 'table-row';
	doc('statCPS').style.display = 'table-row'; doc('statPop').style.display = 'table-row';
	doc('statFraud').style.display = 'table-row'; doc('statCharisma').style.display = 'table-row';
	

	if (!help.lps) doc('statLPS').style.display = 'none';
	if (!help.cps) doc('statCPS').style.display = 'none';
	if (!help.priceInc) doc('statFraud').style.display = 'none';
	if (!help.gentle) doc('statGentle').style.display = 'none';
	if (!help.pop) doc('statPop').style.display = 'none';
	if (!help.charisma) doc('statCharisma').style.display = 'none';

	var realSkill = getSkillName(getSkill(id));
	if (!realSkill) realSkill = [null, null];
	echo('helperSkillName', realSkill[0])
	echo('helperSkill',realSkill[1]);
	document.getElementById('changeName').onclick = function() {
		reChangeName(id);
	};
	document.getElementById('helperKillButton').onclick = function() {
		killHelper(id);
	};
	doc('helpMentorBut').onclick = function() {makeMentor(id)};
	if (help.level < 100) doc('helpMentorBut').onclick = function() {};
	doc('helpMentorBut').style.opacity = (help.level >= 100) ? 1 : 0.5;

	if (!dontOpen) showWindow('windowHelperStats');
	if (!dontOpen) updateLevelUpCost(id);
}
function destroy(arr, index){
  var z = [];
  delete arr[index];
  for(var i = 0; i<arr.length; i++){
      if (arr[i]){
        z.push(arr[i]);
    }
  }
  return z;
}
function killHelper(id, noPermission) {
	var mzg = (commonLang == 'es') ? "¿Estás seguro de que quieres despedir a " : "Are you sure you want to fire ";
	var permission = noPermission;
	if (!noPermission) var permission = confirm(mzg+helpers[id].name+'?');
	if (permission) {
		helpers = destroy(helpers, id);
		document.getElementById('windowHelperStats').style.display = 'none';
	}
}
function updateLevelUpCost(id) {
	if (doc('windowHelperStats').style.display == 'none') return;
	//Level up (1 times)
	echo('helperLevelUpCost', shortNum(helperLevelUp(id, true)));
	document.getElementById('helperLevelUp').onclick = function() {
		echo('helperLevelUpMsg', helperLevelUp(id));
	};

	//Level up (10 times)
	echo('helperLevelUpCost10', shortNum(helperLevelUp(id, true, true)));
	document.getElementById('helperLevelUp10').onclick = function() {
		echo('helperLevelUpMsg10', helperLevelUp(id, false, true));
	};

	var nextClass = helpers[id].classLevel + 1;

	var newGoodClass = getNewClassName(helpers[id].type, 0, nextClass);
	var newBadClass = getNewClassName(helpers[id].type, 1, nextClass);
}
function incHelpersExp(quantity) {
	//Aka every second events
	if (!quantity) return;
	var beflevels = getTotalLevels();
	for (x in helpers) {
		var from = x;
		//Also Werecoon skill
		if (getSkill(from) == 27) {
			if (!sleep(true)) helpers[from].classLevel = 8;
			if (sleep(true)) helpers[from].classLevel = 7;
		}
		quantity /= helpers.length;
		helperIncExp(x, quantity);
	}
	if (lastHelper) updateLevelUpCost(lastHelper);
	//Auto-order helpers
	if (getTotalLevels() > beflevels) {
		calculateHelperStats();
	}
	if (doc('windowHelpers').style.display != 'none') {
		getHelperList();
	}
	if (orderFarmMode) reOrder('expLeft');

	checkMsg();
}
function getAchievement(id) {
	//achievementCheck();

	if (achievementList[id] == 1) return;
	if (!data.badges) data.badges = 0;
	data.badges++;

	var name = achievementNames[id][0];
	var tip = achievementNames[id][1];
	var img = 'img/badges/'+id+'.png';

	var lang = (commonLang == 'es') ? 0 : 1;

	name = name.split('|')[lang];
	tip = tip.split('|')[lang];

	echo('achImage', img);
	echo('achTitle', name);
	echo('achText', tip);

	notifAch['bright'] = 100;
	notifAch['wait'] = 100;
	notifAch['opacity'] = 1;

	achievementList[id] = 1;

	showWindow('notifAch');
}
function achievementCheck() {
	var max = achievementNames.length;
	var min = 0;
	for (z in achievementList) if (achievementList[z]) min++;
	var perz = percent(min, max);
	echo('totalAchievementsUnlocked', min+'/'+max+' ('+perz+')');
	//Checking completed achievements
	var conditions = [
	null, lemonRate>=100, lemonadeResearchLevel>=11, lemonadeResearchLevel>=21, lemonadeResearchLevel>=25,
	records.dollars>=1000, records.dollars>=1000000, records.dollars>=1000000000000, records.tips>=1,
	dayPassed>=30, dayPassed>=365, clockToTime(clock, true), duration(played*1000).split('d')[0]>=1,
	getHelpersByType('raccoon')>=10, getHelpersByType('raccoon')>=25,
	getHelpersByType('boyScout')>=10, getHelpersByType('boyScout')>=25,
	helpers.length>=15, helpers.length>=30, helpers.length>=50, helpers.length>=60,
	records.levels>=100, records.levels>=1000, records.levels>=5000, records.levels>=10000,
	data.squeezer.level>=20, data.squeezer.level>=40, (data.squeezer.autoSqueezeLevel>=10 && data.squeezer.speed >= 10 && data.squeezer.level >= 60),
	getLPS()>=10, getLPS()>=100, getLPS()>=1000, getLPS()>=5000,
	getCPS()>=10, getCPS()>=200, getCPS()>=4000, getCPS()>=80000,
	records.limones>=10000, records.limones>=100000, records.limones>=1000000, records.limones>=10000000, 
	records.lemonade>=2500000, records.lemonade>=50000000, records.lemonade>=1000000000, records.lemonade>=20000000000,
	getBSPercent(2)>=100, specialTipAchievement,
	( getBSPercent(1)>=95 && getBSPercent(2)>=95 && getAlignment('good')>=95 ),
	( priceLock == 'highest' && getBSPercent(1)>=95 ), ( getBSPercent(0)<=0 && getAlignment('bad')>=100 ),
	getHelpersByClass('raccoon', 0, 5)>=1, getHelpersByClass('raccoon', 1, 5)>=1, getHelpersByClass('raccoon', 1, 10)>=1,
	getHelpersByClass('boyScout', 1, 5)>=1, getHelpersByClass('boyScout', 0, 5)>=1, getHelpersByClass('boyScout', 0, 10)>=1,
	lemonadeMix['orange']>lemonRate, lemonadeMix['lime']>=1000, lemonadeMix['sugar']>=3500, getFruitWeight()>=10000,
	];
	for (x in conditions) if (conditions[x]) getAchievement(x);

	var l = "<tr>";
	for (i = 0; i < achievementNames.length; i++) {
		var mzg = "'"+translate(achievementNames[i][0])+'<br><br>'+translate(achievementNames[i][1])+"'";
		var addToL = '<td><img onmouseover="notif('+mzg+',true)" src="img/badges/'+i+'.png"></td>'
		if (!achievementList[i]) {
			var addToL = '<td><img onmouseover="notif('+mzg+',true)" src="img/badges/unknown.png"></td>'
		}

		if ((i+1) % 8 == 0) addToL += '</tr><tr>';
		l+=addToL;
	}
	l+="</tr>";
	echo('achievementsTable', l);
}
function getLPS() {
	//Godfather Bonus
	var z = 0;
	for (x in helpers) {
		z+=helpers[x].lps
	}

	var bonus = 1 + getSkillsByID(11);
	bonus += data.badgeBonus.lps;

	z += data.badgeBonus.lps * 2;
	return z * bonus;
}
function getPriceInc() {
	var z = 0;
	for (x in helpers) {
		z+=helpers[x].priceInc;
	}
	return z;
}
function getCPS() {
	var z = 0;
	for (x in helpers) {
		z+=helpers[x].cps;
	}
	//CPS bonus go here
	//Businessman Bonus
	var totalBus = getSkillsByID(2); //Total Businessmen count
	var totalAss = getSkillsByID(3); //Total ass chief count
	var totalChf = getSkillsByID(4); //Total chief count
	var totalCEO = getSkillsByID(5); //Total CEO count

	totalChf += totalCEO; //CEOs are Chiefs too
	totalAss += totalChf; //Chiefs are Asses too
	totalBus += totalAss; //Asses are Buses too

	var bonus = totalBus + ((totalBus*2) * totalAss) + ((totalBus*4) * totalChf);
	totalCEO++;
	bonus *= (2 * totalCEO);

	//Bonus CPS for matching in-game time with real time
	/* TODO Add this shit later
	getMonth();
	if (data.gameTime.cpsBonus) bonus += data.gameTime.cpsBonus;
	*/

	z += bonus;
	var cpsBonus = 1 + data.badgeBonus.cps;
	z += data.badgeBonus.cps * 2;
	z *= cpsBonus;

	return z;
}
function getPopBonus(type) {
	//TODO fix this shit

	//0: Attention bonus (gentle)
	//1: Popularity boost (pop)
	//2: Tip boost (charisma)
	var z0 = 0;
	var z1 = 1;
	var z2 = 2;

	var x0 = 0;
	var x1 = 0;
	var x2 = 0;
	for (x in helpers) {
		if (!helpers[x].gentle) helpers[x].gentle = 0;
		if (!helpers[x].pop) helpers[x].pop = 0;
		if (!helpers[x].charisma) helpers[x].charisma = 0;

		z0 += helpers[x].gentle;
		z1 += helpers[x].pop;
		z2 += helpers[x].charisma;

		if (helpers[x].gentle > 0) x0 += helpers[x].gentle;
		if (helpers[x].pop > 0) x1 += helpers[x].pop;
		if (helpers[x].charisma > 0) x1 += helpers[x].charisma;

	}
	//Bonus
	if (!ecstasy) ecstasy = 0;
	z1 += ecstasy;

	var m = 0;
	for (h = 1; h < 300; h++) {
	    var j = h*2;
	    var k = Math.pow(10, j);
	    var l = dollars/(k*h);
	    var n = 1/h;
	    if (l >= n) l = n;
	    m += l;
	}
	m *= getSkillsByID(18);
	m /= 10;
	m++;

	moneyBonus = m;

	z0 *= moneyBonus;

	var z = Math.ceil((x0 + x1 + x2) / 3);
	if (z < 0) z = 0;

	return [z0, z1, z2, z][type];
}
function getTipChance() {
	var init = 100;
	init-=getPopBonus(2)/1.42;
	return Math.round(init);
}
function calculateHelperStats() {
	for (x in helpers) {
		var y = helpers[x];

		//Rounding
		y.baseLps = round(y.baseLps);
		y.baseCps = round(y.baseCps);
		y.basePriceInc = round(y.basePriceInc);
		y.baseGentle = round(y.baseGentle);
		y.basePop = round(y.basePop);
		y.baseCharisma = round(y.baseCharisma);
		y.baseGood = round(y.baseGood);

		var type = y.type;
		var path = y.path;
		var classL = y.classLevel;

		var bonus = getClassModifiers(type, path, classL);

		//Gets number of Manager skills and adds them to a bonus, 0.25 each
		var maxBonus = 1 + (0.25 * getSkillsByID(17));
		for (z in bonus) {
			bonus[z] *= maxBonus;
			if (getSkill(x) == 22) bonus[z] /= 2;
		}

		//Angel and Demon bonus
		var goodPower = 1 + (0.2 * getSkillsByID(12));
		var badPower  = 1 + (0.2 * getSkillsByID(13));
		if (bonus[6] > 0) bonus[6] *= goodPower;
		if (bonus[6] < 0) bonus[6] *= badPower;

		//Coon stats
		if (y.exp == '-') y.exp = 0;

		if (!y.baseLps)      y.baseLps      = 1;
		if (!y.baseCps)      y.baseCps      = 1;
		if (!y.basePriceInc) y.basePriceInc = 1;

		//Scout stats
		if (!y.baseGentle)   y.baseGentle   = 1;
		if (!y.basePop)      y.basePop      = 1;
		if (!y.baseCharisma) y.baseCharisma = 1;

		//Good
		if (!y.baseGood)     y.baseGood     = 1;

		y.lps      = y.baseLps      * bonus[0];
		y.cps      = y.baseCps      * bonus[1];
		y.priceInc = y.basePriceInc * bonus[2];

		y.gentle   = y.baseGentle   * bonus[3];
		y.pop      = y.basePop      * bonus[4];
		y.charisma = y.baseCharisma * bonus[5];

		y.good     = y.baseGood     * bonus[6];

		var emax = expToNextLevel(y.level, classL, path);
		var emin = emax - y.exp;

		y.expLeft = round(emin);

		//After rounding
		y.lps = round(y.lps);
		y.cps = round(y.cps);
		y.priceInc = round(y.priceInc);
		y.gentle = round(y.gentle);
		y.pop = round(y.pop);
		y.charisma = round(y.charisma);
		y.good = round(y.good);
	}
}
function getHelpersByType(typ) {
	var z = 0;
	for (x in helpers) {
		if (!helpers[x]) killHelper(x, true);
		if (helpers[x].type == typ) z++;
	}
	return z;
}
function swapPlace(from, to) {
	console.log('From: '+from.name+' To: '+to.name);

	var carry = helpers[to];
	helpers[to] = helpers[from];
	helpers[from] = carry;
	console.log('From: '+from.name+' To: '+to.name);
}
var filterBy;
var filterNoPromote;
var filterOrder;
var lastOrder;
var orderFarmMode;
function reOrder(sortParameter, invert) {
	lastOrder = sortParameter;
	var invert = (sortParameter == 'expLeft') ? true : filterOrder;
	var orderedHelpers = helpers.sort(function(a, b) {
		var b1 = b[sortParameter];
		var a1 = a[sortParameter];
		if (b1 == '-') b1 = (filterOrder) ? Infinity : 0;
		if (a1 == '-') a1 = (filterOrder) ? Infinity : 0;

		if (filterBy && b.type != filterBy) b1 = (filterOrder) ? Math.pow(b1,10) : -Math.pow(b1,10);
		if (filterBy && a.type != filterBy) a1 = (filterOrder) ? Math.pow(a1,10) : -Math.pow(a1,10);

		if (!invert) return b1-a1;
		if (invert) return a1-b1;
	});
}
lastHelper = null;
var confirmed = false;
function toKeyCode(key) {
	var key = key || window.event;
	var cCode = key.charCode || key.which;
	return cCode;
}
document.onkeypress = function(key) {
	var key = key || window.event;
	var cCode = key.charCode || key.which;

	var keyPress = String.fromCharCode(cCode);
	console.log(keyPress+' '+cCode);

	if (cCode == 32) return;

	var num = cCode - 48;
	if (num < 10 && num && lastHelper) {
		num -= 1;
		if (num >= helpers.length) return;
		swapPlace(num, lastHelper);
	}

	var kee = String.fromCharCode(toKeyCode(key));
	if (changingName) kee = null;
	if (kee == 'k') {
		console.log('Hey, look at that guy! Just pressed the K key!');
		helperUpgradeClass(lastHelper, 0);
	}

	if (kee == 'j') {
		console.log('Hey, look at that guy! Just pressed the J key!');
		helperUpgradeClass(lastHelper, 1);
	}
	if (kee == 'l') {
		console.log('Hey, look at that guy! Just pressed the L key!');
		if (!lastHelper && lastHelper != 0) return;
		helperLevelUp(lastHelper);
	}
	if (kee == 'L') {
		console.log('Hey, look at that guy! Just pressed the Shift L key!');
		if (!lastHelper && lastHelper != 0) return;
		helperLevelUp(lastHelper, false, true);
	}

	var cCode = toKeyCode(key);
	if (cCode == 13) confirmName();
}
function updateStuff() {

	//Squeezer related stuff
	if (doc('windowSqueezer').style.display != 'none') {
		echo('squeezerName', data.squeezer.name);
		echo('squeezerClass', translate('la Exprimidora|the Squeezer'));
		//Squeezer Upgrade Cost
		echo('squeezerLevelUpCost', buySqueezerUpgrade(1, true));
		echo('squeezerAutoSqueezeLevelUpCost', buySqueezerUpgrade(2, true));
		echo('squeezerUpdateCost1', buySqueezerUpgrade(3, true));
		echo('squeezerUpdateCost2', buySqueezerUpgrade(4, true));
		echo('squeezerSpeedCost', buySqueezerUpgrade(5, true));

		if (data.alert) logIt('<mark>'+data.alert+'</mark>');
		data.alert = undefined;

		//Squeezer image
		var sqImgSrc = 'img/squeezers/squeezer1.png';
		//Grinder
		if (data.squeezer.ultraFast) sqImgSrc = 'img/squeezers/squeezer2.png';
		echo('squeezerClass', translate('la Picadora de Limones|the Lemon Grinder'));

		//Juicer
		if (data.squeezer.speed > 0) sqImgSrc = 'img/squeezers/squeezer3.png';
		echo('squeezerClass', translate('la Licuadora|the Juicer'));
		doc('squeezerImg').src = sqImgSrc;

		//Squeezer stats
		echo('squeezerLevel', data.squeezer.level);
		echo('squeezerAutoSqueezeLevel', data.squeezer.autoSqueezeLevel);
		echo('squeezerSpeed', data.squeezer.speed);

		if (data.squeezer.level >= 10) doc('autoSqueezeUpgrade').style.display = 'block';
		if (data.squeezer.autoSqueezeLevel == 10) doc('autoSqueezeUpgrade').style.display = 'none';

		if (data.squeezer.autoSqueezeLevel >= 5) doc('squeezerUpdate1').style.display = (data.squeezer.ultraFast) ? 'none' : 'block';
		if (data.squeezer.ultraFast) doc('squeezerUpdate2').style.display = (data.squeezer.speed > 0) ? 'none' : 'block';
		if (data.squeezer.speed > 0) doc('squeezerSpeedUpgrade').style.display = (data.squeezer.speed == 10) ? 'none' : 'block';
	}
	

	//Show data
	echo('totalCoons', getHelpersByType('raccoon'));
	echo('totalScouts', getHelpersByType('boyScout'));
	echo('badges', data.badges);
	var gentleBonus = Math.round(getPopBonus(0));
	echo('gentleStat', gentleBonus);
	echo('goodStat', getAlignment('good')+' %');
	echo('badStat', getAlignment('bad')+' %');

	getFraudRate();

	updateFilter();

	//Lemonade Stand of the Day
	echo('lstandName', localStorage.getItem('postName'));

	var lsotdObj = JSON.parse(localStorage.getItem('lastPlayer'));
	echo('lsotdNameTag', translate('Nombre: |Name: '));
	if (!lsotdObj || !lsotdObj.name) return;
	echo('lsotdNameValue', lsotdObj.name);

	echo('lsotdLemonTag', translate('Limones: |Lemons: '));
	echo('lsotdLemonValue', shortNum(lsotdObj.limones));

	echo('lsotdMoneyTag', translate('Dinero: |Money: '));
	echo('lsotdMoneyValue', shortNum(lsotdObj.dollars/100)+'ç');

	echo('lsotdMVHTag', translate('Mejor Ayudante: |Best Helper: '));
	echo('lsotdMVHValue', '<img src="'+lsotdObj.pic+'">'+" "+translate('Nivel: |Level: ')+lsotdObj.level);

	//Most valuable Helper MVH
	if (!data.mvh) data.mvh = [];
	data.mvh = getHelper(0);
	if (!data.ident) data.ident = getID();

	calculateHelperStats();
	depositUpgradeUpdate();

	lemonadePrice = getLemonadePrice();

	//Records and stuff
	var l = '';
	for (isnan in records) {
		if (!records[isnan]) records[isnan] = 0;
		if (!lastRecords[isnan]) lastRecords[isnan] = 0;
	}
	var e = [records.limones > lastRecords.limones, records.lemonade > lastRecords.lemonade,
	records.dollars > lastRecords.dollars, records.helpers > lastRecords.helpers,
	records.tips > lastRecords.tips, records.sales > lastRecords.sales, records.levels > lastRecords.levels];
	var e2 = [];
	for (rsi in e) {
		e[rsi] = (e[rsi]) ? '<b>' : '';
		e2[rsi] = (e[rsi]) ? '</b>' : '';
	}

	l += '<br>'+translate('Partida actual|Actual game')+'<br><hr><br><table>'
	l += '<tr><td>'+e[0]+translate('Limones obtenidos|Lemons obtained')+  '</td><td>'+shortNum(records.limones)+ e2[0]+'</td></tr>';
	l += '<tr><td>'+e[1]+translate('Limonada total|Total lemonade')+      '</td><td>'+shortNum(records.lemonade)+e2[1]+'</td></tr>';
	l += '<tr><td>'+e[2]+translate('Dinero ganado|Money made')+           '</td><td>'+shortNum(records.dollars)+ e2[2]+'</td></tr>';
	l += '<tr><td>'+e[3]+translate('Ayudantes contratados|Hired helpers')+'</td><td>'+shortNum(records.helpers)+ e2[3]+'</td></tr>';
	l += '<tr><td>'+e[6]+translate('Subidas de nivel totales|Total levelups')+'</td><td>'+shortNum(records.levels)+ e2[6]+'</td></tr>';
	l += '<tr><td>'+e[4]+translate('Propinas obtenidas|Tips obtained')+   '</td><td>'+shortNum(records.tips)+    e2[4]+'</td></tr>';
	l += '<tr><td>'+e[5]+translate('Ventas|Sales')+                       '</td><td>'+shortNum(records.sales)+   e2[5]+'</td></tr></table><br><br><br>';
	
	l += translate('Última partida|Last game')+'<br><hr><br><table>';

	l += '<tr><td>'+translate('Limones obtenidos|Lemons obtained')+  '</td><td>'+shortNum(lastRecords.limones)+ '</td><tr>';
	l += '<tr><td>'+translate('Limonada total|Total lemonade')+      '</td><td>'+shortNum(lastRecords.lemonade)+'</td><tr>';
	l += '<tr><td>'+translate('Dinero ganado|Money made')+           '</td><td>'+shortNum(lastRecords.dollars)+ '</td><tr>';
	l += '<tr><td>'+translate('Ayudantes contratados|Hired helpers')+'</td><td>'+shortNum(lastRecords.helpers)+ '</td><tr>';
	l += '<tr><td>'+translate('Subidas de nivel totales|Total levelups')+'</td><td>'+shortNum(lastRecords.levels)+ '</td><tr>';
	l += '<tr><td>'+translate('Propinas obtenidas|Tips obtained')+   '</td><td>'+shortNum(lastRecords.tips)+    '</td><tr>';
	l += '<tr><td>'+translate('Ventas|Sales')+                       '</td><td>'+shortNum(lastRecords.sales)+   '</td><tr></table>';
	echo('recordStats', l);
	echo('recordReset', data.resetted);

	var pricePerDeposit = (getQuota('hi')/1000)*lemonadePrice;
	var thisDeposit = quotaCalc(lemonadeResearchLevel, true);
	echo('lemonadePricePerDeposit', shortNum(pricePerDeposit));
	echo('lemonadeDepositName', thisDeposit);
	var something = '<br>('+translate('Capacidad|Capacity')+': '+shortNum(getQuota('hi')/1000)+'l)';
	echo('moreDepositStuff', something);
	//TODO change this image with a sprite
	if (dollars > 1000000) doc('citroStuff').src = 'img/citroBill.png';

	//Gray out buttons
	doc('stealLemonsButton').style.opacity = (!savedLemons || stealTimer) ? 0.5 : 1;
	doc('buyH01').style.opacity = (dollars >= raccoonPrice) ? 1 : 0.5;
	doc('buyH02').style.opacity = (dollars >= boyScoutPrice) ? 1 : 0.5;
	doc('makelem').style.opacity = (limones < lemonRate) ? 0.5 : 1;
	doc('promBut').style.opacity = (promoteAllHelpers(true)) ? 1 : 0.5;
}
function updateFilter() {
	doc('helpersOrder').style.border = (filterOrder) ? '1px solid black' : '1px solid transparent';
	doc('helpersPromote').style.border = (filterNoPromote) ? '1px solid black' : '1px solid transparent';
	doc('helpersScouts').style.border = (filterBy == 'boyScout') ? '1px solid black' : '1px solid transparent';
	doc('helpersCoons').style.border = (filterBy == 'raccoon') ? '1px solid black' : '1px solid transparent';
	doc('helpersAll').style.border = (!filterBy) ? '1px solid black' : '1px solid transparent';
	doc('helpersFarm').style.border = (orderFarmMode) ? '1px solid black' : '1px solid transparent';
}
function buySqueezerUpgrade(id, peek) {
	var baseCost = Math.ceil(Math.floor(3.15*Math.pow(1.75,data.squeezer.level)))
	var noMoneyError = translate("No tienes dinero suficiente para comprar esta mejora.|You don't have enough money to buy this upgrade.");
	if (id == 1) {
		var cost = baseCost;
		if (peek) return shortNum(cost);
		if (dollars < cost) return noMoneyError;

		dollars -= cost;
		data.squeezer.level = (!data.squeezer.level) ? 1 : data.squeezer.level + 1;
		return data.squeezer.name+" "+translate("ha subido al nivel |has reached level ")+data.squeezer.level;
	}
	if (id == 2) {
		if (!data.squeezer.autoSqueezeLevel) data.squeezer.autoSqueezeLevel = 0;
		var lev = data.squeezer.autoSqueezeLevel;

		var cost = baseCost*(1.45+lev);
		cost = Math.ceil(cost);
		if (lev == 10) return;
		if (peek) return shortNum(cost);
		if (dollars < cost) return noMoneyError;

		dollars -= cost;
		data.squeezer.autoSqueezeLevel = (!data.squeezer.autoSqueezeLevel) ? 1 : data.squeezer.autoSqueezeLevel + 1;
		return translate("El ritmo de auto-Exprimir de tu exprimidora ha subido al nivel |Your squeezer's auto-Squeeze rate has reached level ")+data.squeezer.autoSqueezeLevel;
	}
	if (id == 3) {
		var cost = 100000;
		if (data.squeezer.ultraFast) return;
		if (peek) return shortNum(cost);
		if (dollars < cost) return noMoneyError;

		dollars -= cost;
		data.squeezer.ultraFast = true;
		ultraFastSqueezingModeActivated();
		return translate('Tu exprimidora ha sido actualizada a picadora de limones.|Your squeezer have been updated to lemon grinder.');
	}
	if (id == 4) {
		var cost = 1000000;
		if (data.squeezer.speed == 10) return;
		if (peek) return shortNum(cost);
		if (dollars < cost) return noMoneyError;

		dollars -= cost;
		data.squeezer.speed += 1;
		return translate('Tu exprimidora ha sido actualizada a Licuadora.|Your squeezer have been updated to Juicer.');
	}
	if (id == 5) {
		if (!data.squeezer.speed) data.squeezer.speed = 0;
		var lev = data.squeezer.speed;

		var cost = baseCost*(2+lev);
		cost = Math.ceil(cost);
		if (lev == 10) return;
		if (peek) return shortNum(cost);
		if (dollars < cost) return noMoneyError;

		dollars -= cost;
		data.squeezer.speed = (!data.squeezer.speed) ? 1 : data.squeezer.speed + 1;
		return translate("La velocidad de exprimido ha aumentado al nivel |The squeeze speed reached level ")+data.squeezer.autoSqueezeLevel;
	}
}
function getBadBonus() {
	var z = 0;
	for (x in helpers) {
		var gewd = helpers[x].good
		if (gewd > 0) continue;
		z += gewd;
	}
	z *= -1;
	return z;
}
function getGoodBonus() {
	var z = 0;
	for (x in helpers) {
		var gewd = helpers[x].good
		if (gewd < 0) continue;
		z += gewd;
	}
	z *= 1;
	return z;
}
function getAlignment(ret) {

	var gewd = getGoodBonus();
	var bawd = getBadBonus();
	var totalBonus = gewd + bawd;
	if (!totalBonus) totalBonus++;
	var goodBonus = gewd / totalBonus;
	var badBonus = bawd / totalBonus;

	var goodBonus = Math.ceil(goodBonus*100);
	var badBonus = Math.floor(badBonus*100);

	if (ret == 'good') return goodBonus;
	if (ret == 'bad') return badBonus;
}
if (!data.lastRaid) data.lastRaid = 0;
if (!data.lastRob) data.lastRob = 0;
if (!data.policeFee) data.policeFee = 0;
function robbery(target, forced) {
	var chances = (target == 'self') ? 100 + (getSkillsByID(38) * 10) : (getAlignment('good') / getSkillsByID(37));
	if (chances <= 1) chances = 1;

	if (lemonadePostOpen || !sleep(true) || !chances) return;
	var budget = (target == 'self') ? dollars : getCPS() * (canSteal() + getSkillsByID(37)) * getAlignment('bad');
	budget = Math.floor(budget / rand(2,10));
	var random = rand(1,chances);
	if (!forced && (random != 1 || dayPassed == data.lastRob || !budget)) return;

	if (target == 'self') {
		if (getSkillsByID(39)) {
			var scareChance = 10 / getSkillsByID(39);
			if (scareChance <= 2) scareChance = 2;
			var scareRandom = rand(1,scareChance);
		}

		var mzg = translate('¡Manos arriba, esto es un atraco!|Hands up! This is a robbery!')+'<br>';
		if (scareRandom == 1 || forced == 'scare') {
			if (rand(1,2) == 1) {
				mzg += translate('¡No me mates! ¡Haré lo que me pidas!\n\nHas reclutado a un ladrón.|\
					Don\'t kill me! I will work for you!\n\nThe thief have been recruited.');
				buySpecialHelper('thief');
			}
			else {
				mzg += translate('Los ladrones han salido corriendo al ver a tus matones.|The thieves have been scared away by your goons and ran away.');
			}
		}
		else {
			mzg += translate('Te han robado '+shortNum(budget)+'ç.|'+shortNum(budget)+'ç have been stolen.');
			dollars -= budget;
		}

	}
	else {
		var mzg = translate('¡Manos arriba, esto es un atraco!|Hands up! This is a robbery!')+'<br>';
		mzg += translate('Tus mapaches han robado '+shortNum(budget)+'ç en otros puestos de limonada.|Your raccoons stole '+shortNum(budget)+'ç on enemy lemonade stands.');
		incDollars(budget);
	}
	echo('anotherMessage', mzg);	
	showWindow('anotherWindow');
	data.lastRob = dayPassed;
	saveGame();

}
function canSteal() { return (getSkillsByID(32) + getSkillsByID(33) + getSkillsByID(36) + getSkillsByID(37)); }
function policeRaid() {
	robbery('self');
	//robbery('bank');


	var chances = getAlignment('bad');
	if (sleep(true)) for (rbc in helpers) randomBite(rbc);

	if (chances == 0 || !lemonadePostOpen || !sleep(true)) chances = 0;
	if (!chances) return;
	if (helpers.length < 2);
	//Adding vampire bite chances

	//Chances become 0 if your army is more good than bad.
	chances /= 2;
	if (getSkillsByID(9)) {
		var totLawyerBonus = getSkillsByID(9) * 5;
		chances -= totLawyerBonus
		if (chances <= 5) chances = 5;
	}

	var realChances = 100 - chances - (2 * getSkillsByID(38));
	if (realChances <= 2) realChances = 2;
	var random = rand(1,realChances);

	if (random == 1 && data.lastRaid != dayPassed) {
		data.lastRaid = dayPassed;
		var poorID = rand(0,helpers.length-1);
		if (getSkill(poorID) == 25) return;
		var poorLilGuy = helpers[poorID];
		var name = poorLilGuy.name;

		var monehMax = dollars*1.64;
		var moneh = rand(1, monehMax);

		console.log('Max: '+monehMax+' Min: '+moneh);
		//Fine mods go here
		var costReduction = getSkillsByID(8);
		costReduction = (0.1 * costReduction)+1;

		var beforePrice = softRound(moneh);

		if (costReduction > 1) moneh /= costReduction;

		moneh = softRound(Math.ceil(moneh));

		var cost = moneh;

		if (cost < 0) cost *= -1;
		if (cost == 0) cost = 100;

		//Regular police raid
		var beforeFee = data.policeFee;
		if (beforeFee) {
			var mzg = translate("Ha venido la policía a cobrar la multa que se te impuso.|Police has come to recover the fine.")+" ("+shortNum(data.policeFee)+"ç)<br>";
			
			if (dollars >= data.policeFee) {
				dollars -= data.policeFee;
				data.policeFee = 0;
				mzg += translate("Has pagado con éxito la multa.|You sucessfully paid the fine.");
			}
			else {
				var paying = Math.floor(dollars * 0.9);
				dollars -= paying;
				data.policeFee -= paying;
				data.policeFee = Math.ceil(data.policeFee *= 1.1);
				mzg += translate("Como no tienes suficiente dinero, se ha añadido un impuesto por impago. Total a pagar: |As you don't have enough money, an unpaid tax have been added. Total: ")+shortNum(data.policeFee)+"ç";
			}
		}
		if (!beforeFee) {
			//Fine if regular police raid
			data.policeFee += cost;

			var canNoKill = getSkillsByID(21);
			if (canNoKill) var noKillFee = data.policeFee / (1 + getSkillsByID(21));
			if (canNoKill && dollars >= noKillFee) {
				dollars -= noKillFee;
				var noKill = true;
			}
			var superHero = getSkillsByID(25);
			var convertChance = 0;
			if (superHero && convertHelper(poorID, true)) convertChance = 1;
			if (convertChance) {
				noKill = false;
				var extra = translate("<br>"+name+" ha recibido un poco de justicia y ahora es mejor persona.|<br>"+name+" have been beaten by justice and now it's more kind hearted");
			}
			else {
				var extra = translate("<br>"+name+" ha sido detenido.|<br>"+name+" have been arrested.");
			}

			if (noKill) extra = translate('Has sobornado al policía con '+shortNum(noKillFee)+' para que no arrestasen a '+name+'<br>|You bribed the policeman to not arrest '+name+' with '+shortNum(noKillFee)+'<br>');
			
			var mzg = translate(
			"Ha habido una redada en tu puesto de limonada y han encontrado actividad delictiva.\
			<br>"+extra+"Has tenido que pagar una multa de "+shortNum(cost)+"ç.|\
			A police raid has come to your lemonade stand and found criminal activity.\
			<br>"+extra+"You had to pay a penalty of "+shortNum(cost)+"ç.");
			if (costReduction > 1) mzg += "\n"+translate("Tus ayudantes han \
				negociado la multa para bajarla de "+shortNum(beforePrice)+"|Your \
				helpers have negotiated the fine to lower it from "+
				+shortNum(beforePrice))+"ç";

			//Arrested helper
			if (!noKill && !convertChance) killHelper(poorID, true);
			if (convertChance) convertHelper(poorID);
		}

		echo('anotherMessage', mzg);
		showWindow('anotherWindow');
		console.log('Raid sucessful!');
		saveGame();
	}
	else {
	}
}
function changeLemonRate(addition) {
	if (addition) var lR = Math.ceil(lemonRate * 1.1);
	if (!addition) var lR = Math.floor(lemonRate / 1.1);
	if (lR < 1) lR = 1;

	lemonadeMix.lemon = lR;
	lemonRate = lR;

	getFruitBonus();
}
function getFraudRate() {
	var priceInc = getPriceInc();
	var scamMod = priceInc/100;
	scamMod++;
	var skillMod = getSkillsByID(7);
	if (skillMod) scamMod += skillMod / 10;

	echo('fraudRate', shortNum(scamMod*100));
	return scamMod;
}
function getSkillsByID(skillID) {
	var z = 0;
	for (xx in helpers) {
		if (getSkill(xx) == skillID) z++;
	}
	return z;
}
function getSkillName(skillID) {
	var skillNames = [
	'Ninguna|None',
	'Publicidad|Advertising',
	'¡Por la Empresa!|For the Business!',
	'Yo mando|I rule',
	'Tipo Duro|Badass',
	'Jefe Supremo|Overlord',
	"El precio está mal|The price isn't correct",
	'Tramposo de verdad|Real cheater',
	'Privilegiado|Privileged',
	'Veredicto: Inocente|Veredict: Innocent',
	'Éxtasis|Ecstasy',
	'Mis queridos súbditos|My beloved minions',
	'Bondad Ilimitada|Unlimited Goodness',
	'Maldad Pura|Pure Evil',
	'Adorables Mapaches|Adorable Raccoons',
	'Revolución Empresarial|Business Revolution',
	'Administración|Management',
	'Motivación|Motivation',
	'Trato Hecho|Done Deal',
	'Dame Dinero|Gimme Money',
	'Suertudo|Lucky',
	'Toma esto|Take this',
	'Rey de las Sombras|King of Shadows',
	'Recién Mordido|Just Bitten',
	'Tacañería|Miserliness',
	'Justicia|Justice',
	"Estoy Limpio|I'm Clean",
	"Maldición del Mapache|Coon's Curse",
	"Trovador|Troubadour",
	"No me la merezco|I don't deserve it",
	"Logro Obtenido|Achivement Unlocked",
	"Seducción|Seduction",
	"Manos Largas|Long Hands",
	"Crimen Organizado|Organized Crime",
	"Campaña de Recaudación de Fondos|Fundraising Campaign",
	"Agilidad|Agility",
	"Cosas Gratis|Free Stuff",
	"Botín|Loot",
	"Thug Life|Thug Life",
	"O te largas, o te largo|Run or Die",
	"Imitación|Mimicry",

	//NYI

	'Me lo llevo|I take it',
	];
	var skillDesc = [
	'Esta habilidad no hace nada.|This skill does nothing.',
	'Aumenta la Popularidad un 2.5%|Increases Popularity by 2.5%',
	'+1 Citros/segundo|+1 citros/second',
	'+2 Citros/segundo por cada Empresario o Subjefe|+2 citros/second per Businessman or Assistant Chief',
	'+4 Citros/segundo por cada Empresario, Subjefe o Jefe.|+4 citros/second per Businessman, Assistant Chief or Chief.',
	'Dobla los Citros/segundo.|Doubles citros/second rate.',
	'Posibilidad de doblar el precio al vender limonada.|Chances of doubling price while selling lemonade.',
	'Aumenta la tasa de Engaño total un 10%.|Raises total Fraud Rate by 10%.',
	'Reduce el coste de las multas en un 10%.|Reduces fine costs by 10%.',
	'Reduce las probabilidades de una redada policial.',
	'Aumenta la popularidad justo después de vender limonada|Increases popularity after selling some lemonade',
	'Dobla los limones/segundo que recogen todos los mapaches.|Doubles lemons/second income from all raccoons.',
	"Aumenta la honestidad de todos tus ayudantes|Raises all of your helpers honesty.",
	"Aumenta la maldad de todos tus ayudantes|Increases all of your helpers evil.",
	"Reduce el precio de los Mapaches a la mitad|Decreases Raccoon prices to half.",
	"Reduce el precio de los Boy Scouts|Decreases Boy Scout prices.",
	"Reduce el precio de ayudantes y subidas de nivel un 10% (Max: 90%).|Decreases helpers prices and level up costs 10%. (Max: 90%)",
	"Aumenta los stats y la experiencia que ganan tus ayudantes|Increases all your helpers stats and experience gain",
	"Aumenta la amabilidad dependiendo del dinero del que dispones|Increases gentleness the more money you have",
	"Aumenta un 50% el dinero recibido en propinas|Increases money received in tips by 50%",
	"Aumenta la posibilidad de encontrar carteras con dinero.|Raises chances of finding wallets with money.",
	"Puede sobornar a policías para que no arresten a tus ayudantes|Can bribe policemen to not arrest your helpers",
	"Muerde a Boy Scouts por las noches para incrementar su maldad. Durante el día no puede ganar experiencia.|Bites Boy Scouts at night to increase his evil. Can't earn experience at day.",
	"La debilidad reduce los stats y la experiencia que gana este ayudante. Podría convetirse en Vampiro de una noche a otra.|Weakness reduces stats and experience gain for this helper. Could turn into a Vampire some night",
	"Aumenta la capacidad de los depósitos.|Raises deposit capacity.",
	"Si alguien fuera a ser detenido en una redada, puede reformarse en lugar de eso|If someone would be arrested on a police raid, it can reform itself instead",
	"Aumenta la amabilidad y la carisma. Convierte la bondad negativa en positiva.|Increases gentleness and charisma. Turns negative kindness into positive.",
	"Se transforma en Mapache durante la noche y en Boy Scout durante el día|Turns itself into a Raccoon at night and into a Boy Scout at day",
	"De vez en cuando gana dinero en propinas tocando en la calle|Sometimes makes money on tips playing at the street",
	"Roba digo, consigue insignias cada día por sus buenos actos.|Steals, err, obtains badges every day because of its good actions.",
	"Aumenta el bonus de insignias recibido por completar logros.|Increases badge bonus obtained by achivements",
	"Atrae a los clientes|Attracts customers",
	"Obtiene más limones al recolectarlos manualmente|Obtains more lemons when harvesting them manually",
	"Dobla los limones que obtienes al recolectar cuantos más Mafiosos tengas|Doubles lemons you obtain when harvesting the more Gangsters you have",
	"Obtiene dinero vendiendo galletas por las casas|Makes money selling cookies in the neighborhood",
	"Sube a los lugares más altos de los árboles para recoger más limones.|Reaches the highest spots in trees to gather more lemons.",
	"No se sabe cómo, aparecen limones en sus bolsillos.|God knows why, lemons appear on its pocket.",
	"Roba dinero en otros puestos de limonada por la noche si tu puesto está cerrado. Dobla el dinero obtenido.|\
	Steals money at other lemonade stands at night, only if your stand is closed. Doubles money stolen.",
	"Aumenta las probabilidades de ser detenido en una redada policial.\nReduce las probabilidades de sufrir un atraco por la noche.|\
	Increases chances of being arrested on a police raid.\nDecreases chances of being robbed at night.",
	"Espanta a los ladrones por la noche.\nPuede reclutar ladrones cuando te vienen a robar.|\
	Scares thieves away.\nHas a chance of recruiting thieves that try to rob you.",
	"Copia e imita el nombre y las características de otro de tus ayudantes.|Copies and mimics the name and stats of another of your helpers.",

	//NYI

	'Posibilidad de comprar algo gratis en el supermercado.|Chances of buying something at supermarket for free.',
	];

	if (!skillID) {
		var l = [];
		for (x in skillNames) {
			console.log( translate(skillNames[x])+" --- "+translate(skillDesc[x]) );
		}
		return;
	}
	var a1 = translate(skillNames[skillID]);
	var a2 = translate(skillDesc[skillID]);

	return [a1, a2];
}
//add skills here
function getSkill(id) {
	if (!helpers[0]) return;
	var help = helpers[id];
	if (!help) return;
	var type = (help.type != 'raccoon') ? 0 : 1;
	var path = help.path;
	var cL   = help.classLevel-1;

	var BS = [
	//Last skill: 40
		[10, 18, 17, 1, 16, 2, 15, 3, 4, 5],     //Good Scouts
		[19, 6, 20, 7, 6],                       //Baddie Scouts
		[30, 14, 28],                            //Unique Named Scouts
		[34, 2, 22, 23, 25, 26, 27, 27, 32, 31], //Special Scouts
	];
	var coon = [
		[10, 8, 8, 24, 9],						 //Good Coons

		//Nilla path 1 (Evil)
		[38, 38, 39, 36, 20, 37, 21, 32, 11, 33],

		//Unique
		[25, 29], //Superhero

		//Special
		[35, 12, 13, 28, 40, 26], //Raccat, angel coon, demon coon, Trumpeter, (NYI), ex-delinquent
	];
	if (cL < 0 && path < 2) return null;

	return [BS, coon][type][path][cL];
}
function getMonth() {
	if (!data.gameTime.number) data.gameTime.number = 959846400000;
	if (!data.gameTime.day) data.gameTime.day = 0;
	if (!data.gameTime.hour) data.gameTime.hour = 0;
	if (!data.gameTime.mins) data.gameTime.mins = 0;
	if (!data.gameTime.month) data.gameTime.month = 0;
	if (!data.gameTime.year) data.gameTime.year = 0;
	if (!data.leftTo) data.leftTo = 0;

	//Calculate time left to current human date
	var cd = new Date;
	var x = new Date(data.gameTime.number);

	var curDate = Date.parse(cd);
	var leftDate = curDate - data.gameTime.number;
	data.leftTo = leftDate;
	//Calculate CPS bonus
	var cpsb = 0;
	var c1 = (cd.getMinutes() == x.getMinutes());
	var c2 = (cd.getHours() == x.getHours());
	var c3 = (cd.getDate() == x.getDate());
	var c4 = (cd.getMonth() == x.getMonth());
	var c5 = (cd.getFullYear() == x.getFullYear());
	var c0 = (c1 || c2 || c3 || c4 || c5);
	var c6 = (c1 && c2 && c3 && c4 && c5);
	if (c0) cpsb = 1;
	if (c1) cpsb *= 2;
	if (c2) cpsb *= 2;
	if (c3) cpsb *= 2;
	if (c4) cpsb *= 2;
	if (c5) cpsb *= 2;
	if (c6) cpsb *= 2;
	data.gameTime.cpsBonus = cpsb;

	data.gameTime.day = x.getDate();
	data.gameTime.hour = x.getHours();
	data.gameTime.mins = x.getMinutes();
	data.gameTime.month = x.getMonth()+1;
	data.gameTime.year = x.getFullYear();
	var dgt = data.gameTime;

	var dday = (dgt.day < 10) ? '0'+dgt.day : dgt.day;
	var dmonth = (dgt.month < 10) ? '0'+dgt.month : dgt.month;
	var dhour = (dgt.hour < 10) ? '0'+dgt.hour : dgt.hour;
	var dmins = (dgt.mins < 10) ? '0'+dgt.mins : dgt.mins;

	var fullDate = dday+'/'+dmonth+'/'+dgt.year+'<br>'+dgt.hour+':'+dgt.mins;
	//TODO new date system and weather. echo('gameTime', fullDate);

	return ( dayPassed / 30 ) % 12;
}
function newName() {
	var mzg = translate('Ponle un nombre a tu puesto de limonada.\n(Tu nombre puede ser visto por otros)|Choose a name for your lemonade stand.\n(Your name may be seen by others)');
	mzg = mzg.replace('<', '&lt');
	mzg = mzg.replace('>', '&gt');

	var ret = prompt(mzg);
	ret = ret;
	if (!ret) return;
	localStorage.setItem('postName', ret);
}
function getHelper(id) {
	//type, ret, path, classLevel
	if (!helpers[id]) return ['img/scout2.png', [0, 0, 0]];

	var type       = helpers[id].type;
	var path       = helpers[id].path;
	var classLevel = helpers[id].classLevel;
	var level      = helpers[id].level;

	var img = getClassData(type, 'classPic', path, classLevel);
	//0: path, 1: classLevel, 2: level
	var data = [path, classLevel, level];

	return [img, data];
}
function sendMsgTo(msg) {
	var lastID = JSON.parse(localStorage.getItem('lastPlayer'));
	lastID = lastID.id;
	//console.log('Last id: '+lastID);
	if (!lastID) return;
	saveGame();
	var ident = data.ident;
	var msg = msg;
	var id = lastID;
	$('#notices').load('send.php?type=MSG&from='+ident+'&to='+id+'&msg='+msg);
}
function buyLemonade() {
	var buyTimer = Math.round(gift+stealTimer);
	var buyTimer2 = Math.ceil(buyTimer/100);
	var message = translate('Debes esperar '+buyTimer2+' segundos para comprar más limonada.|You have to wait '+buyTimer2+' seconds to buy more lemonade.');

	if (buyTimer > 0) {
		logIt(message);
		return;
	}
	gift += 225+((gift+stealTimer)*2.2);
	stealTimer += 225+((gift+stealTimer)*2.2);

	var toSeconds = Math.ceil(buyTimer/100);
	var lastID = JSON.parse(localStorage.getItem('lastPlayer'));
	lastID = lastID.id;
	//console.log('Last id: '+lastID);
	if (!lastID) return;
	saveGame();

	var ident = data.ident;
	var id = lastID;

	var id = lastID;
	var lPrice = 15;
	if (dollars < lPrice) {
		logIt(translate("No puedes comprar limonada, necesitas |You can't buy lemonade, you need ")+shortNum(lPrice)+'ç');
		return;
	}
	dollars -= lPrice;
	//TODO add custom price
	$('#notices').load('send.php?type=BUY&from='+ident+'&to='+id+'&qty=250&price='+lPrice);
}
function checkMsg() {
	var yourID = data.ident;
	$('#notices').load('send.php?type=CHECK&id='+yourID);
	var lastMessages = doc('notices').innerHTML;
	var arrLastMessages = lastMessages.split('---');
	arrLastMessages = arrLastMessages[0];
	arrLastMessages = arrLastMessages.split('\n');
	if (arrLastMessages.length > 1) {
		data.alert = "";
		for (x in arrLastMessages) {
			var arlm = arrLastMessages[x].split('_');
			var type = arlm[0];
			var from = arlm[1];
			var mzg = arlm[2];
			if (!from) continue;
			if (type == 'MSG') data.alert += mzg+'     ';
			if (type == 'BUY') {
				var pstring = arlm[2].split('q');
				var qty = pstring[0];
				var price = pstring[1];
				if (price > lemonadePrice) price = lemonadePrice;
				if (price < 0) price = 15;
				price = Number(price);
				incDollars(price);
				lemonade -= qty;
				if (lemonade < 0) lemonade = 0;
				var mzzzg = translate('Le has vendido un vaso de limonada a alguien por |You have sold a lemonade glass to someone for ')+shortNum(price)+'ç     ';
				data.alert += mzzzg;
			}
		}
	}
	return arrLastMessages;
}
function clockToTime(clocky, check) {
	clocky *= 60000;
	var dur = duration(clocky, 'points').split(':');
	var actDate = new Date();
	if (check) {
		var igHours   = dur[1];
		var igMinutes = dur[2];
		var rlHours   = actDate.getHours();
		var rlMinutes = actDate.getMinutes();

		if (igHours == rlHours && igMinutes == rlMinutes) return true;
		return false;
	}
	return dur;
}
function getBSPercent(type) {
	var gentle = Math.round(getPopBonus(0));
	var pop = ( 1 - popModCalc() ) * 100;
	var charisma = 100 - getTipChance();
	return [gentle, pop, charisma][type];
}
function getHelpersByClass(type, path, rank) {
	var z = 0;
	for (x in helpers) {
		var help = helpers[x];
		if (help.type == type && help.path == path && help.classLevel == rank) z++;
	}
return z;
}
function getFruitWeight() {
	var z = 0;
	for (x in lemonadeMix) z += lemonadeMix[x];
	z -= lemonRate;
	return z;
}
function getHelperValue(id) {
	var help = helpers[id];
	var min = 1;
	var max = min + help.level*0.2;

	var valueLps      = help.baseLps      / max;
	var valueCps      = help.baseCps      / max;
	var valuePriceInc = help.basePriceInc / max;
	var valuePop      = help.basePop      / max;
	var valueCharisma = help.baseCharisma / max;
	var valueGentle   = help.baseGentle   / max;

	var totalValue = (valueLps+valueCps+valuePriceInc+valuePop+valueCharisma+valueGentle)/6;

	return totalValue;
}
function getShittiestHelper(vampire) {
	var z = Infinity;
	var zid = 0;
	for (x in helpers) {
		if (vampire) {
			if (helpers[x].type != 'boyScout' || helpers[x].path > 1) continue;
		}
		if (getHelperValue(x) < z) {
			z = getHelperValue(x);
			zid = x;
		}
	}
	return zid;
}
function randomBite(from) {
	var chances = getAlignment('bad');
	var vamp = helpers[from];
	var isVamp = (vamp.classLevel == 3 && vamp.path == 3);
	if (!isVamp) return 'Not a vampire';
	if (chances == 0 || vamp.bite == 1) return 'Not bad enough or has bitten this night';
	var realChances = 100 - chances;
	chances /= 10;
	var random = rand(1, realChances);
	if (random == 1) {
		vamp.bite = 1;
		var shittiest = getShittiestHelper(true);
		var shit = helpers[shittiest];
		if (shit.type == 'boyScout' && shit.path < 2) {
			shit.baseGood = shit.baseGood / 2;
			vamp.baseGood += shit.baseGood;

			shit.converted = 1;
			shit.classLevel = 4;
			shit.bite = 3;
			shit.path = 3;
			var rbmsg = shit.name+translate(' ha sido mordido por un Vampiro, pronto se convertirá en uno de ellos.| has been bitten by a Vampire and will turn into one soon');
			logIt(rbmsg);
		}
	}
}
function resetBites() {
	for (rbx in helpers) {
		var help = helpers[rbx];
		if (!help.bite) help.bite = 0;
		if (help.bite >= 1) help.bite -= rand(0,1);
		if (help.bite == 0 && help.converted == 1) {
			help.converted = 0;
			help.bite = 1;
			help.classLevel = 3;
			var rbmsg = help.name+translate(' ha sido convertido en Vampiro| has been made a Vampire');
			logIt(rbmsg);
		}
	}
}
function convertHelper(id, peek) {
	if (getSkill(id) == 25) return false;
	if (helpers[id].good >= 0) return false;

	if (peek) return true;
	helpers[id].path = 3;
	helpers[id].classLevel = 6;

	var taip = helpers[id].type;
	var neim = helpers[id].name;
	var claws = getClassData(taip, 'className', 3, 6);
	var messech = neim+translate(' ha sido reformado y ahora es un | have been reformed and now it is a ')+claws;
	logIt(messech);
}
function getSpecialHelperNumber() {
	var gg = 0;
	for (i in helpers) {
		if (helpers[i].path > 1) gg++;
	}
	return gg;
}
function getMusicTip() {
	var chances = [popModCalc() * 1000, popModCalc() * 1000];
	var musicians = [getSkillsByID(28), getSkillsByID(34)];
	var random = [];
	for (gmt in chances) {
		chances[gmt] -= musicians[gmt];
		if (chances[gmt] <= 10) chances[gmt] = 10;
		random[gmt] = rand(1,chances[gmt]);
		if (!(random[gmt] > 1 || !musicians[gmt])) {
			var extra = (gmt == 0) ? getCPS() : getPopBonus(0);
			var coolness = Math.ceil(extra + getPopBonus(0) + 1);
			var qty = softRound(coolness * 1.0244);
			qty *= musicians[gmt];
			incDollars(qty);
			var message = (gmt == 0) ?
			translate("Tus músicos han ganado "+shortNum(qty)+"ç tocando en la calle|Your musicians made "+shortNum(qty)+"ç playing music at the street") :
			translate("Las Girl Scout han recaudado "+shortNum(qty)+"ç vendiendo galletas|The Girl Scouts have collected "+shortNum(qty)+"ç by selling cookies");
			logIt(message);
		}
	}

}
function farmMode() {
	orderFarmMode = !orderFarmMode;
	reOrder('expLeft');
}
function helperLevelUpToAll(peek) {
	var g = getTotalLevels();
	var g = data.temp.lupCost;
	doc('helperLevelAllButton').style.opacity = (dollars >= g) ? 1 : 0.5;
	if (peek) return g;
	if (dollars >= g) {
		dollars -= g;
		for (r in helpers) {
			realHelperLevelUp(r);
		}
	}

	getHelperList();
}
function promoteAllHelpers(peek) {
	//Ascender a todos
	for (u in helpers) {
		if (peek) {
			if (!hasPromotion(u)) continue;
			if (hasPromotion(u) && helpers[u].level >= 10) return u;
		}

		if (helpers[u].path > 1 || helpers[u].mime > 0) continue;
		var pathie = helpers[u].path;
		if (helpers[u].classLevel < 1) pathie = rand(0,1);
		helperUpgradeClass(u, pathie);
	}

	getHelperList();
}
function hasPromotion(id) {
	var help = helpers[id];
	var nextCL = Number(help.classLevel) + 1;
	var paz = help.path;
	if (paz > 1 || help.mime > 0) return false;
	var nextClass = getClassData(help.type, 'className', paz, nextCL);
	return nextClass;
}
function makeMentor(id) {
	//Jubilar
	echo('chooseAHelper', '');
	var z = 0;
	for (xx in helpers) {
		var h = helpers[xx]; var t = h.type; var p = h.path; var c = h.classLevel;
		var i = getClassData(t, 'classPic', p, c);
		var k = getClassData(t, 'className', p, c);
		var n = h.name;
		var v = h.level;
		var sty = (v >= 100 || xx == id) ? 0.5 : 1;
		var thisH = document.createElement('div');
		thisH.className = 'lemonButton';
		thisH.style.opacity = sty;
		thisH.onclick = function(zz) {
		    return function() {
		        confirmMentor(id, zz);
		    }
		}(z);
		if (v >= 100 || xx == id) thisH.onclick = function() {};

		thisH.innerHTML = z+'<img src="'+i+'"> '+n+' '+k+' '+translate('Nivel|Level')+' '+v;
		doc('chooseAHelper').appendChild(thisH);
		z++;
	}
	showWindow('windowMentor');
}
function confirmMentor(from, to) {
	console.log('From: '+from+' To: '+to);
	calculateHelperStats();
	var hf = helpers[from]; var ht = helpers[to];
	var stats = ['baseLps', 'baseCps', 'basePriceInc', 'baseGentle', 'basePop', 'baseCharisma'];
	var before = [ht.lps, ht.cps, ht.priceInc, ht.gentle, ht.pop, ht.charisma];
	var pool = {};
	for (ss in stats) {
		var zz = stats[ss];
		pool[zz] = Math.ceil((hf[zz] + ht[zz]) / 2);
		var mentorMod = getClassModifiers(hf.type, hf.path, hf.classLevel);
		mentorMod = 1 + mentorMod[ss];
		var difference = ((pool[zz] * mentorMod) - before[ss]);

		ht[zz] = (difference > 0) ? pool[zz] * mentorMod : ht[zz] * 1.1;
	}
	calculateHelperStats();
	var after = [ht.lps - before[0], ht.cps - before[1], ht.priceInc - before[2],
	ht.gentle - before[3], ht.pop - before[4], ht.charisma - before[5]];
	var newLine = '<br><hr><br>'+ht.name+' '+translate('ha aprendido todo del Veterano Maestro |has learned everything about the Veteran Master')+' '+hf.name+'<br>\
	<b>'+translate('Nuevas características: |New stats: ')+'</b><br><ul>';
	var statz = ['Limones/segundo|Lemons/second', 'ç/segundo|ç/second', 'Engaño|Fraud', 'Amabilidad|Gentleness',
	'Popularidad|Popularity', 'Carisma|Charisma'];
	for (ee in after) {
		if (after[ee]) newLine += '<li><ins>'+translate(statz[ee])+': +'+shortNum(after[ee])+'</ins>';
	}
	newLine += '</ul><br>'+hf.name+' '+translate('se ha jubilado y ha abandonado la empresa|has retired and left the business');

	killHelper(from, true);
	echo('chooseAHelper', newLine);
}
function getRandomBadge() {
	if (!getSkillsByID(29)) return;
	var findCryo = 0;
	for (c in helpers) if (getSkill(c) == 29) {
		findCryo == c;
		break;
	}
	var cryo = helpers[c];
	var chances = Math.floor(popModCalc() * 100);
	var random = rand(1,chances);
	console.log('Random chances: '+random+' out of '+chances);
	if (random > 2) return;
	data.badges = (!data.badges) ? 1 : data.badges + 1;
	logIt('<mark>'+cryo.name+translate(' ha conseguido una insignia por sus buenos actos.| has earned a badge for its good actions.')+'</mark>');
}
function routine() {
	getRandomBadge();
	saveGame();
}
function succubus() {
	if (getSkillsByID(31)) {
		var chances = rand(1,(getAlignment('good')*100));
		console.log('Without bonus: '+chances);
		chances /= getSkillsByID(31);
		console.log('with bonus: '+chances);
		if (Math.floor(chances) < 2) newBuyer(true);
	}
}
function tooltipHere(where, text) {
	showTextHere(where, text, 1);
}
function showTextHere(where, text, tt) {
	var element = document.createElement('i');
	element.innerHTML = text;
	element.className = 'tooltipNumber';
	element.style.position = 'fixed';
	parentPos = pos(where);
	var randie = rand(1,10);
	var randie2 = rand(1,10) * -1;
	element.style.top = (parentPos[0] + red(randie,randie2))+'px';
	element.style.left = (parentPos[1]+ red(randie,randie2))+'px';
	element.style.fontSize = '24px';
	var timout = 2000;
	if (tt) {
		element.className = 'tooltipText';
		element.style.fontSize = '12px';
		element.style.top = parentPos[0]+8;
		element.style.left = parentPos[1]+8;
		timout = 20000;
		element.onmouseover = function() {
			this.style.display = 'none';
		};
	}
	if (tt)
	element.style.opacity = 1;

	doc(where).appendChild(element);
	setTimeout(function() {
		//element.style.fontSize = '14px';
		element.style.opacity = 0;
		if (element) setTimeout(function() {doc(where).removeChild(element)}, timout);
	}, 100);
}

//Shit being tested


if (!localStorage.getItem('postName')) newName();
//Stop loading phase
//if (commonDebug) echo('yup','yup');
var finishedLoading = setTimeout(function () {document.body.style.opacity = 1; document.title = 'Lemontastic!';}, 100);
getFruitBonus();