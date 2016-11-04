var TelegramBot = require('node-telegram-bot-api');
var fs = require('fs');

var token = '239840470:AAF6TDnsvJkQJXEnDQVo1CpHsORCxxksVlU';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});

var database = {
	'items': [],
	'users': {},
	'itemList': [],
}

var haxday = 0;

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

// Any kind of message
bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  var commands = ['/objetos', '/compra', '/vende', '/dinero', '/ayuda', '/set', '/info', '/cal', '/hax', '/del', '/resetoday'];
  for (var c in commands) {
  	if (msg.text.split(' ')[0] == commands[c]) {
  		var command = commands[c];
  		var split = msg.text.split(' ');
  		var user = msg.from.first_name;
  		var u = database.users[user];
  		if (!u) generateUser(user);
  		u = database.users[user];

      if (u.variables == undefined) u.variables = {};

      //Day checker
      var tod = today();
      if (u.lastDay != tod) {
        u.lastDay = today();
        for (var v in u.variables) {
          if (u.days == undefined) u.days = {};
          if (u.days[v] == undefined) u.days[v] = new dayObject();
          u.days[v].miss += 1;
        }
      }

  		bot.sendMessage('Hola '+user);
      if (command == '/hax') {
        var newDay = split[1];
        haxday += Number(newDay);
        bot.sendMessage(chatId, 'Day changed to ('+newDay+') '+today());
      }
      if (command == '/del') {
        bot.sendMessage(chatId, 'Deleting '+split[1]);
          u.variables[split[1]] = undefined
      }
      if (command == '/resetoday') {
        var tod = today();
        u.calendar[tod] = 0;
      }

      if (command == '/set') {
        var where = split[1];
        var qty = Number(split[2]);
        var silent = split[3];
        if (where.split('$').length > 1) silent = true;
        console.log('/set cmd, where '+where+' qty '+qty);
        if (!silent) addToCalendar(u.calendar, qty);
        if (u.totals == undefined) u.totals = {};
        if (u.totals[where] == undefined) u.totals[where] = 0;
        if (qty > 0) {
          u.totals[where] += qty;
          if (u.days == undefined) u.days = {};
          if (u.days[where] == undefined) u.days[where] = new dayObject();
          if (u.days[where].last != today()) {
            u.days[where].last = today();
            u.days[where].hit++;
          }
        }



        if (u.variables[where] == undefined) u.variables[where] = 0;
        u.variables[where] += qty;
        var dayz = u.days[where];
        var laplace = ((dayz.hit + 1) / (dayz.miss + 2)).toFixed(3);
        var extra = 'Total earnings: $'+u.totals[where].toFixed(3)+'\n';
        extra += 'Per day: $'+(u.totals[where] / dayz.miss)+' ('+laplace+'%) ['+dayz.hit+', '+dayz.miss+']\n';
        extra += 'Trust: '+(laplace * (u.totals[where] / (dayz.miss + 1)));
        bot.sendMessage(chatId, 'Actualizado el valor de '+where+' a '+u.variables[where]+'\n\n'+extra);

      }
      if (command == '/cal') {
        console.log('/cal cmd');
        if (u.calendar == undefined) u.calendar = {};
        var calendar = u.calendar;
        var str = '';
        var dailyTarget = 0;
        /*
        for (var c = 0; c < 7; c++) {
          var td = today(-c);
          dailyTarget += calendar[td];
        }
        */
        var totdays = 0;
        var totalmade = 0;
        for (var c in calendar) {
          totdays++;
          dailyTarget += calendar[c];
          totalmade += calendar[c];
        }
        var tod = today();
        dailyTarget -= calendar[tod];
        totdays--;
        dailyTarget /= totdays;
        dailyTarget *= 1.2;

        for (var c = 0; c < 7; c++) {
          var td = today(-c);
          addToCalendar(calendar, 0, td);
          var value = calendar[td];
          var status = (value >= dailyTarget) ? 'OK' : ((value / dailyTarget) * 100).toFixed(2)+'%';
          str += '['+td+'] $'+calendar[td].toFixed(3)+' ('+status+')\n';
        }
        bot.sendMessage(chatId, 'Days: '+totdays+' total: '+totalmade.toFixed(2));
        bot.sendMessage(chatId, 'Esta semana: ('+dailyTarget.toFixed(3)+') \n'+str);
      }
      if (command == '/info') {
        console.log('/info cmd');
        var str = '';
        var total = 0;
        var sorted = [];
        for (var v in u.variables) {
          total += u.variables[v];
          sorted.push({
            'name': v,
            'total': u.variables[v],
            'trust': getTrustRating(u, v),
          })
        }
        sorted = sorted.sort(function(a, b) {
          return b.trust - a.trust;
        });
        for (var v in sorted) {
          var sor = sorted[v];
          str += '['+sor.name+'] \t $'+sor.total.toFixed(2)+' ('+sor.trust.toFixed(3)+')\n';
        }
        if (!str) str = 'No tienes ninguna cuenta. Establece una mediante /set (nombre) (valor)';

        bot.sendMessage(chatId, 'Dia ('+today()+') [Total: $'+total.toFixed(3)+']:\n'+str);
      }
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
      saveAll();
  		return 1;
  	}
  }
});
function dayObject() {
  this.hit = 0;
  this.miss = 0;
  this.last = '0-0-0';
}
function getTrustRating(user, variableName) {
  if (variableName.split('$').length > 1) return -Infinity;
  var laplace = (user.days[variableName].hit + 1) / (user.days[variableName].miss + 2)
  return laplace * (user.totals[variableName] / (user.days[variableName].miss + 1));
}
function addToCalendar(calendar, value, day) {
  if (value < 0) return;
  var tod = today();
  if (day != undefined) tod = day;
  if (calendar[tod] == undefined) calendar[tod] = 0;
  calendar[tod] += value;
}

function saveAll() {
  var dat = JSON.stringify(database);
  fs.writeFile('item_data.json', dat);

  console.log('Saved.');
}
function loadAll() {
  var dat = fs.readFileSync('item_data.json', 'utf8');
  if (dat) database = JSON.parse(dat);
  console.log('Loaded.');
}

function generateUser(userID) {
	console.log('Generating user for id '+userID+'.');
	if (!database.users) database.users = {};
	database.users[userID] = {
		'items': [],
		'money': 3000,
    'variables': {},
    'calendar': {},
    'totals': {},
    'days': {},
    'lastDays': {},
    'lastDay': '0-0-0',
	}
	console.log('Generated user for id '+userID+':'+JSON.stringify(database.users[userID]));
}

function today(days) {
  var d = new Date();
  if (days == undefined) days = 0;
  if (days != 0 || haxday != 0) {
    days += haxday;
    var s = (days * 86400000);
    var d = new Date(d.valueOf() + s);
  }
  var value = d.getYear()+'-'+d.getMonth()+'-'+d.getDate();
  return value;
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

setInterval(getRandomItems, 10000);
loadAll();