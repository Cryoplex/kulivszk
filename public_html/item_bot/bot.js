var TelegramBot = require('node-telegram-bot-api');

var token = '239840470:AAF6TDnsvJkQJXEnDQVo1CpHsORCxxksVlU';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});

var database = {
	'items': [],
	'users': {},
	'itemList': [],
}

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

// Any kind of message
bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  var commands = ['/objetos', '/compra', '/vende', '/dinero', '/ayuda'];
  for (var c in commands) {
  	if (msg.text.split(' ')[0] == commands[c]) {
  		var command = commands[c];
  		var split = msg.text.split(' ');
  		var user = msg.from.first_name;
  		var u = database.users[user];
  		console.log(JSON.stringify(u));
  		if (!u) generateUser(user);
  		u = database.users[user];

  		console.log(JSON.stringify(u));

  		bot.sendMessage('Hola '+user);

  		if (command == '/objetos') {
  			console.log('Command objetos.');
  			if (!u.items) u.items = [];
  			var line = '';
  			for (var e in u.items) if (u.items[e] > 0) line += '('+u.items[e]+'x) '+getItemData(e)+'\n';
  			bot.sendMessage(chatId, 'Tienes '+u.items.length+' objetos. \n\n'+line);
  		}
   		if (command == '/dinero') {
  			console.log('Command dinero.');
  			bot.sendMessage(chatId, 'Tienes $'+u.money+'.');
  		}
    	if (command == '/compra') {
    		console.log('Command compra.');
    		var qty = Math.abs(parseInt(split[1]));
    		if (!qty) qty = 1;
    		var name = split[2];
    		var newItem = true;
    		if (name >= 0) newItem = false;
    		if (newItem) {
    			var getID = getItemIDFromName(name);
    			if (getID < 0) database.itemList.push(name);
    			name = getItemIDFromName(name);
    		}

  			var price = getPriceForItemID(name) * qty;
  			price = Math.ceil(price * 100) / 100;

  			if (u.money >= price) {
  				if (!u.items[name]) u.items[name] = 0;
  				database.items[name] -= qty;
  				u.items[name] += qty;
  				u.money -= price;
  				u.money = Math.ceil(u.money * 100) / 100;

  				bot.sendMessage(chatId, 'Has comprado '+qty+' '+database.itemList[name]+' por '+price);
  			}
  			else {
  				bot.sendMessage(chatId, 'No tienes dinero ('+u.money+'). '+getItemData(name));
  			}
  		}

    	if (command == '/vende') {
    		console.log('Command vende.');
    		var qty = split[1];
    		var id = split[2];

    		var isItemID = false;
    		if (id >= 0) {
    			isItemID = true;
    		}
    		if (!isItemID) id = getItemIDFromName(id);
    		if (id < 0) id = 0;

  			var price = getPriceForItemID(id) * qty;
  			price = Math.ceil(price * 100) / 100;

  			if (u.items[id] >= qty) {
  				u.items[id] -= qty;
  				database.items[id] += qty;;
  				u.money += price;
  				u.money = Math.ceil(u.money * 100) / 100;

  				bot.sendMessage(chatId, 'Has vendido '+qty+' '+database.itemList[id]+' por $'+price+'. Ahora tienes $'+u.money+'.');
  			}
  			else {
  				bot.sendMessage(chatId, 'No tienes suficientes '+database.itemList[id]+' ('+u.items[id]+'). ');
  			}
  		}

  		if (command == '/ayuda') {
  			bot.sendMessage(chatId, 'Escribe /objetos para ver tus objetos.\nEscribe /compra (cantidad) (objeto) para comprar un objeto.\nEscribe /vende (cantidad) (objeto) para vender un objeto.\nEscribe /dinero para ver tu dinero.');
  		}
  		return;
  	}
  }


  bot.sendMessage(chatId, 'Acabo de recibir esto de ('+chatId+'): '+JSON.stringify(msg));
});

function generateUser(userID) {
	console.log('Generating user for id '+userID+'.');
	if (!database.users) database.users = {};
	database.users[userID] = {
		'items': [],
		'money': 3000,
	}
	console.log('Generated user for id '+userID+':'+JSON.stringify(database.users[userID]));
}

function getItemIDFromName(name) {
	var id = database.itemList.indexOf(name);
	return id;
}

function getItemData(id) {
	return database.itemList[id]+' (ID:'+id+') Precio: $'+getPriceForItemID(id);
}

function getPriceForItemID(id) {
	if (!database.items[id]) database.items[id] = 0;
	var items = database.items[id];
	var p = 1000 * Math.pow(1.005, -items);

	return Math.ceil(p * 100) / 100;
}

function getRandomItems() {
	var r = rand(1, database.itemList.length);
	r--;
	database.items[r]++;
}
function rand(minimum,maximum) {
	var randie = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
	if (randie < minimum) randie = minimum;
	if (randie > maximum) randie = maximum;
	return randie;
}
function read(array) {
	var max = array.length-1;
	var min = rand(0,max);
	return array[min];
}
function translate(string) {
	var string = string.split('|');
	if (commonLang == 'es') return string[0];
	if (commonLang == 'en') return string[1];
}

setInterval(getRandomItems, 10000);