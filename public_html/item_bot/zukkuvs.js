var TelegramBot = require('node-telegram-bot-api');

var fs = require('fs');
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 1666;

var chatHistory = {};
var knownUsers = {};

http.listen(port, "0.0.0.0", function(){
  console.log('listening on *:'+port);
});

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bot.js'));
app.use(express.static(__dirname + './bot.js'));
app.use(express.static(__dirname + 'bot.js'));
app.use(express.static(__dirname + '/'));

var token = '250207183:AAHS9JYYUrxjWaaTKC2uCjYp8PJzlVoCvA8';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});

// Any kind of message
bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  io.emit('message', msg);
  console.log(getFullMessage(msg));
  addToHistory(chatId, msg.text, getNameFromMsg(msg));
  addToKnownUsers(chatId, msg);
});

io.on('connect', function(socket) {
  console.log('User connected. ID is '+socket.id);
  socket.emit('database', chatHistory);
  socket.on('ping', function() {
    console.log('Ping? Pong!');
    socket.emit('pong');
  });
  socket.on('say', function(data) {
    var id = data.to;
    var msg = data.text;

    deliverMessage(id, msg);
    console.log('Message delivered.');
    socket.emit('message', {'id': id, 'text': msg, 'chat': {'first_name': 'Succubu5', 'last_name': ''}});
  });
});

function getNameFromMsg(msg) {
  var group = msg.chat.type;
  var name = '';
  if (group == 'group') name = msg.from.first_name+'_'+msg.from.last_name;
  if (group != 'group') name = msg.chat.first_name+'_'+msg.chat.last_name;
  return name;
}
function getFullMessage(msg) {
  return '<'+getNameFromMsg(msg)+'> '+msg.text;
}
function deliverMessage(to, msg) {
  bot.sendMessage(to, msg);
  addToHistory(to, msg, 'Succubu5');
}
function addToHistory(chatId, text, from) {
  if (!chatHistory[chatId]) chatHistory[chatId] = [];
  chatHistory[chatId].push(from+' '+text);

  io.emit('database', chatHistory);

  saveAll();
}
function addToKnownUsers(id, msg) {
  if (!knownUsers[id]) knownUsers[id] = {'id': id, 'name': msg.chat.first_name+' '+msg.chat.last_name};

  io.emit('userList', knownUsers);

  saveAll();
}

function saveAll() {
  var ch = JSON.stringify(chatHistory);
  fs.writeFile('chatHistory.json', ch);

  var ku = JSON.stringify(knownUsers);
  fs.writeFile('knownUsers.json', ku);

  console.log('Saved '+(ch.length + ku.length)+' characters.')
}

function loadAll() {
  var ch = fs.readFileSync('chatHistory.json', 'utf8');
  var ku = fs.readFileSync('knownUsers.json', 'utf8');

  if (ch) chatHistory = JSON.parse(ch);
  if (ku) knownUsers = JSON.parse(ku);

  console.log('Loaded database. '+(ch.length + ku.length)+' characters.');
}

//Load data if available
loadAll();