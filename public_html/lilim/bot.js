var changelog = [
    'Añadido changelog',
    '- Añadido el comando puntos. Cada jugador empieza con 0 puntos.',
    '- Añadido el juego "Flood".',
    '-- El juego flood ahora cuenta con mensajes que avisan del progreso (cuando quedan 30 segundos, 15 y 5)',
    '-- Ahora los puntos se añaden (al escribir puntos) tras jugar a flood (incluso si no ganas)',
    '- Traducido el alias "uniqueChars" del viejo bot.',
    '- Traducido el alias "simil" del viejo bot.',
    '- El bot ahora añade respuestas a la pregunta entera si se utiliza el comando ^;;',
    '- El juego flood debería volver a poder jugarse ahora si se ha detenido.',
    '-- Añadidas más palabras a la lista de baneadas',
    '--- Eliminados [ y ] de las "palabras" baneadas.',
    '--- Añadido !song a las palabras baneadas.',
    '--- El bot ahora añade ç como error tipográfico una de cada 21 veces al escribir.',
    '--- El bot ahora tarda longitud/200..400*60 segundos en hablar, para simular que tarda en escribir.',
    '---- Los jefes ahora tienen nombres aleatorios siempre, no un mismo nombre aleatorio que se repite.',
    '--- Borrado el juego flood',
    '---- Cambiada la fórmula de daño (Defensa y reducción de daño)',
    '---- Mejorada la fórmula de daño',
    '- Añadido comando "quien es", con el que el bot puede buscar en su basee de datos por otros nicks que tuvieron el mismo host.',
    '-- Corregido un bug por el que el bot crasheaba al intentar hacer whois a un usuario inexistente.',
    '- Añadido el juego "guess". Los jugadores pueden adivinar un pokémon por puntos.',
    '-- Los pokémon dan menos puntos (Estaba basado en la longitud de la lista de pokémon, que es algo extensa.)',
    '-- Arreglado un bug que causaba no poder jugar tras haber jugado ya a guess',
    '--- Aumentados los puntos recibidos en guess y numero',
    '- Ahora puedes curar a otros jugadores.',
    '-- Curar a otros jugadores ahora gasta tus puntos de habilidad y no los suyos.',
    '- Si mueres, revivirás con el paso del tiempo.',
    '-- Al escribir "dat" puedes ver el tiempo que te queda muerto.',
    '--- Ahora el contador de muerte se activa automáticamente tras cada mensaje, si lo hay, para revivir al instante en cuanto llegue a 0',
    '- Ahora lee los comandos en minúscula',
    '- Añadido el comando guarda',
    '- Añadido el comando top5',
    '-- Cambiado a top10, muestra los 10 jugadores con mayor nivel en el RPG.',
    '--- Los jefes no aparecen ya en el top10.',
    '-- Eliminado el comando users.',
    '-- Añadido el comando de pruebas _.atac, para matar instantáneamente a un usuario.',
    '--- Ya no aparecen ni jefes ($default_boss) ni dios ($GOD) en el top10.',
    '- Añadidos dobles ataques, triples, etc, siempre que tu velocidad sea mayor.',
    '- Ahora se puede atacar a cualquier jugador existente.',
    '-- Numero máximo de ataques dobles limitado a 10.',
    '-- Los contadores ahora muestran tambien horas.',
    '-- Reducido el tiempo de espera tras la muerte un 20%',
    '-- Añadidos días a los contadores.',
    '-- Los contadores ahora tambien muestran semanas. Que te jodan J-Ner.',
    '--- Los contadores ahora dicen semana si sólo es 1, y semanas si es más de 1.',
    '- Añadido el comando dar puntos. dar puntos (usuario) (cantidad). Sólo puedes darle puntos a aquellos que tienen más de 0 experiencia o más de nivel 2.',
    '-- Algunos números ahora se muestran como k, m, km o b dependiendo de lo grandes que son.',
    '-- Al usar "dat", aparecen barras de vida en lugar de números.',
    '-- Los números cortos ahora se reducen a 2 decimales.',
    '-- Reducidos los puntos obtenidos al aumentar ataque, defensa, etc.',
    '- Añadido el comando renacer, con el que puedes volver al nivel 1 y recuperar puntos de habilidad.',
    '-- Ya no se muestra 0.00 cuando un número es 0.',
    '-- Al subir de nivel, se muestra todo en la misma línea, para que haya menos flood.',
    '--- Tras ganar experiencia, ya no se muestra "undefined" al final de los mensajes.',
    '--- El juego "guess" ahora da mejores pistas, revelando siempre al menos una letra.',
    '--- Corregido un bug que hacía que la moneda cayese de lado a veces al escribir "luck" y jugar a "coc".',
    '-- Al matar a otro jugador, la experiencia se divide a partes iguales entre todos los que han combatido con él.',
    '--- La lista de usuarios que asistieron en la derrota de alguien ahora se resetea tras morir, para evitar experiencia gratis.',
    '- Añadida MAGIA (Puntos de mana)',
    '- Añadido el comando aprender. Con el puedes aprender hasta 8 magias diferentes, a cambio de 1 punto de habilidad por cada nivel.',
    '- Añadidas 8 magias elementales. Por ahora la magia Cura recupera vida, el resto hace daño. Las magias Cascada, Tornado y Enredadera no hacen daño, pero tendrán efectos pronto.',
    '-- La magia ahora se recupera con el tiempo.',
    '-- La magia ahora hace más daño cuanta mayor es la diferencia de magia (MP) entre cada usuario.',
    '-- Las habilidades magicas ahora causan diversos estados.',
    '-- La parálisis reduce la velocidad al 50%',
    '-- Las magias ahora muestran una descripción tras aprenderlas.',
    '-- Ahora se muestra una lista de magias al escribir "aprender" sin ningún argumento.',
    '--- La fórmula de daño de la magia ha sido arreglada.',
    '-- La magia "cura" ahora ignora la defensa mágica.',
    '-- La magia de oscuridad (Sombra) ciega, reduciendo un 50% la precisión.',
    '--- Los puntos de habilidad ya no se muestran de forma corta.',
    '--- Curarse ahora cuesta puntos en lugar de puntos de habilidad, y su precio aumenta con el nivel.',
    '---- Corregido un bug que hacía que apareciesen jefes con niveles en decimal.',
    '--- En el mensaje de curación ahora se muestra cuanto costó curarse.',
    '---- Ahora pone punto(s) segun si es mayor o igual a 1.',
    '-- Ahora puedes elegir entre curar magia, vida o todo.',
    '--- Arreglado un bug que hacía posible restaurar magia aun cuando estaba a tope.',
    '- Ahora puedes aumentar los puntos que quieras, ej aumenta puntos 10, para comprar 10 puntos de habilidad.',
    '- Los jefes ($default_boss y $GOD) ya no pueden ganar experiencia.',
    '- Mejoras en ataque.',
    '-- Eliminado el ban de 5 segundos entre ataque y ataque.',
    '-- Eliminada la probabilidad de doble ataque.',
    '-- Los jefes son más duros de roer.',
    '--- Los jefes ahora tienen unos puntos de habilidad gastados de forma más aleatoria.',
    '-- La magia ahora es contraatacada con ataques físicos.',
    '-- La magia y los ataques físicos ahora pueden ser contraatacados con magia.',
    '--- Los jefes ahora spawnean con hasta 2 hechizos aprendidos.',
    '---- Arreglado un bug que hacía que se contraatacase aunque no se hubiese realizado el ataque mágico.',
    '---- Arreglado un bug que hacía contraatacar magias curativas.',
    '-- La magia ahora puede matar.',
    '--- Los usuarios/jefes derrotados utilizando magia ahora dan experiencia a quien utilizó magia sbre ellos.',
    '---- Precisión del hechizo Sombra reducida a 0.8',
    '---- Precisión de los hechizos Cascada y Tornado aumentada a 1',
    '---- Coste de los hechizos Cascada y Tornado aumentado a 10',
    '---- Coste de los hechizos Quemadura y Congelacion aumentado a 8',
    '--- El veneno y otro daño indirecto cuenta como daño para el cálculo de experiencia si un usuario muere.',
    '--- Al escribir "dat" se muestra el elemento de un usuario. El elemento es determinado por las magias que conoce que tienen mayor nivel.',
    '- Añadidas clases. Cada jugador empieza siendo "Aprendiz"',
    '-- Añadido el comando clase. Con el comando clase puedes elegir una nueva clase o ver las clases disponibles. Cada una tiene sus ventajas y desventajas en stats.',
    '-- El bonus de clase por stat es de 1.5, y la penalización de 0.5',
    '- Ahora sólo se permite gastar 15 puntos de habilidad por nivel.',
    '- Añadidas armas y armaduras.',
    '-- Puedes crear armas y armaduras con el comando crea. Se crearán aleatoriamente basadas en tu nivel y obtendrán stats adicionales.',
    '-- Cuando compras un arma, recibes 1/4 del precio original de la que ya tenías al venderla.',
    '- Añadidos movimientos especiales. Todas las clases tienen uno (Cura) y pueden ser usados con el comando "especial"',
    '-- Añadido el movimiento especial "Redención", para la clase monje. Causa daño a los puntos mágicos en lugar de a la vida.',
    '--- Al usar "Redención" ahora la barra de magia aparece en el color original (morado)',
    '-- Añadido el movimiento especial "Placaje" para luchadores. Causa daño físico en lugar de mágico y paraliza.',
    '-- Añadido el movimiento especial "Sacro" para Paladines. Causa más daño cuanta más magia tengas (Hace más daño si tienes el medidor de magia a tope.)',
    '-- Añadido el movimiento especial "Robo" para ladrones. Permite robar puntos, puntos de habilidad, experiencia, vida o magia.',
    '-- Añadido el movimiento especial "Vampirismo" para Nigromantes. Causa daño mágico y recupera un 10% del daño causado.',
    '-- Añadido el movimiento especial "Pacto" para brujos. Causa daño mágico al usuario y recupera MAGIA.',
    '-- Añadido el movimiento especial "Adrenalina" para magos. Triplica el daño mágico y reduce la defensa y velocidad a la mitad.',
    '-- Añadido el movimiento especial "Empujón" para guerreros. Causa más daño cuanto mayor sea la VIDA actual del ejecutante.',
    '-- Añadido el movimiento especial "Puñalada" para asesinos. Causa 3x daño mágico y tiene un 20% posibilidades de matar al instante siempre y cuando tu velocidad sea mayor.',
    '-- Añadido el movimiento especial "concentración" para cazadores. Aumenta el ataque al 300%, reduce la defensa a 0.',
    '- Los jefes ahora tienen unos puntos de habilidad gastados al 100% siempre, distribuidos en cada stat y en hasta 2 magias diferentes.',
    '- Eliminado el comando luck.',
    '- Algunas magias causaban el estado "undefined". Ya no.',
    '- Ya no se muestra $default_boss en los mensajes de estado.',
    '- Los puntos de habilidad ahora se muestran correctamente.',
    '- Ya no puedes lanzarte magia de daño a ti mismo.',
    '-- Ya no ganas experiencia si tu mismo mueres al haberte infligido tu propio estado.',
    '- Ya no hay puntos en decimal en el juego "guess"',
    '- Arreglado un bug que causaba magia utilizada en usuarios que no existen, crashear al bot.',
    '- Ya no se puede cambiar manualmente a la clase "Aprendiz"',
    '- Al escribir "magia" se muestra la habilidad especial de esa clase.',
    '-- Al escribir "especial" sin ningún argumento, se selecciona automáticamente el jefe (si la habilidad hace daño) o a ti mismo (si no hace daño)',
    '-- Eliminado el comando golpear',
    '-- Los jugadores ya no se curan al entrar en el canal.',
    '-- Ahora puedes ver los puntos de otro jugador escribiendo puntos (nick)',
    '-- Las barras de vida ahora ya no se descuadran hasta límites insospechados.',
    '-- Ahora se muestra el estado al escribir dat (Congelado, quemado, etc) y los turnos que quedan.',
    '-- Ahora los jefes son generados con objetos equipados al azar.',
    '-- El comando "dile" ahora dice lo que sea la próxima vez que el bot ve a esa persona hablar, no sólo al conectarse.',
    '-- Aumentar el nivel ahora cuesta puntos y no puntos de habilidad.',
    '-- El coste de curación mediante "cura" ahora escala con la vida/magia que te falta.',
    ' Lilim 1.0',
    '-', '--',
    '--- Arreglado el comando renacer.',
    '--- Al morir pierdes todos tus estados, perjudiciales y beneficiosos.',
    '--- Las magias ahora muestran su coste en puntos de magia al lado del nivel.',
    '--- RESETEADOS TODOS LOS USUARIOS AL NIVEL 1',
    '--- El mínimo de experiencia compartida ahora es 1%',
    '-', '--',
    '--- Arreglado un bug que causaba al bot crashear al utilizar magia hacia usuarios inexistentes.',
    '--- Ahora puedes ver las magias que has aprendido, aunque estés muerto.',
    '--- Al usar el comando "dile a" los mensajes ya no aparecen dos veces.',
    '-- Ahora puedes curar igualmente utilizando el comando (cura todo) aunque estés al máximo de vida/magia',
    '--- Arreglado un bug que hacía que el equipo de cuerpo no diese VIDA y diese defensa en su lugar (Cuando la intención era que diese VIDA)',
    '-- Los modificadores de experiencia han sido mejorados, todos los niveles anteriores de cada jugador han sido reseteados a 1.',
];
function changes(changelogArray) {
	var newChangeLog = [];
	var clog = changelog;
	var version = [0, 0, 0, 0, 0];
	for (var c in clog) {
		var item = clog[c];
		var spl = item.split(' ');
		var i = spl[0];
		var index = i.length;
		version.splice((index + 1));

		if (!version[index]) version[index] = 0;
		version[index] += 1;
		newChangeLog.push(version.join('.')+' '+spl.slice(1).join(' '));
	}
	newChangeLog = newChangeLog.reverse().join('<br>');
	return {
		'latestVersion': version.join('.'),
		'changelog': newChangeLog,
	}
}
var v = changes(changelog);
var loggedUsers = {};
var userPassword = {};
var pendingPasswords = [];

var webMode = true;

//Libraries and such
if (require) {
	webMode = false;
	var irc = require('irc');
	var fs = require('fs');
	var app = require('express')();
	var express = require('express');
	var http = require('http').Server(app);
	var io = require('socket.io')(http);
    var whatever = require('./whatever');
}

//Constants
var POINT_DESCENT = 0.669;
var DEATH_TIMER_MOD = 0.8;
var GUESS_POINT_GAIN = 4.8;
var SKILL_POINTS_COST = 12;
var STAT_INCREASE_PER_SKILL_POINT = 2;
var REBIRTH_PENALTY = 0.95;
var REBIRTH_PENALTY_PER_STAT = 200;
var HEALTH_HEAL_PRICE = 0.2;
var MANA_HEAL_PRICE = 0.4;
var TOTAL_HEAL_PRICE = 0.5;
var STAT_POINTS_PER_LEVEL = 3;
var MAX_STAT_POINTS_PER_LEVEL = 23;
var BOSS_HEALTH_MODIFIER = 2.4;

//Default variables
var critChance = 0;
var dodgeChance = 0;
var lilimPort = 3001;
var guessNumber = 0;
var guessNumberPoints = 0;
var guessedNumbers = [];
var guessNumberMax = 0;
var knownUsers = [];
var whoised = [];
var memory = {};
var whitelist = {};
var userWhoises = {};
var me = {};
var guessGameOptions = {'pokemon': '', 'hidden': '', 'attempts': 0, 'points': 50};
var guessGame;
var randomNumber = 0;
var pokemonList = [];

//Default objects
var color = {
	'white': '\x030',
	'black': '\x031',
	'blue': '\x032',
	'green': '\x033',
	'red': '\x034',
	'brown': '\x035',
	'purple': '\x036',
	'orange': '\x037',
	'yellow': '\x038',
	'lime': '\x039',
	'cyan': '\x0310',
	'teal': '\x0311',
	'lblue': '\x0312',
	'pink': '\x0313',
	'gray': '\x0314',
	'lgray': '\x0315',
	'r': '\x0f',
}
var color2 = {
	'white': '\x030',
	'black': '\x031',
	'blue': '\x032',
	'green': '\x033',
	'red': '\x034',
	'brown': '\x035',
	'purple': '\x036',
	'orange': '\x037',
	'yellow': '\x038',
	'lime': '\x039',
	'cyan': '\x0310',
	'teal': '\x0311',
	'lblue': '\x0312',
	'pink': '\x0313',
	'gray': '\x0314',
	'lgray': '\x0315',
	'r': '\x0f',
}
var statNames = {
	'baseHP': 'VIDA',
	'baseMP': 'MAGIA',
	'baseATK': 'ATAQUE',
	'baseDEF': 'DEFENSA',
	'baseSPD': 'VELOCIDAD',
}
var equipmentSlots = [
	{'name': 'Arma', 'value': 'leftHand', 'defaultName': 'Espada Corta'},
	{'name': 'Escudo', 'value': 'rightHand', 'defaultName': 'Escudo de Madera'},
	{'name': 'Cabeza', 'value': 'head', 'defaultName': 'Gorro de Cuero'},
	{'name': 'Cuerpo', 'value': 'armor', 'defaultName': 'Coraza de Cuero'},
	{'name': 'Botas', 'value': 'feet', 'defaultName': 'Botas de Cuero'},
	{'name': 'Amuleto', 'value': 'amulet', 'defaultName': 'Amuleto'},
];
var statNamesObj = [
	{'name': 'VIDA', 'baseName': 'baseHP'},
	{'name': 'MAGIA', 'baseName': 'baseMP'},
	{'name': 'ATQ', 'baseName': 'baseATK'},
	{'name': 'DEF', 'baseName': 'baseDEF'},
	{'name': 'VEL', 'baseName': 'baseSPD'},
];
var i_ = color2.white+'_'+color2.r;

var elements = [
	{'name': 'Luz',
	'mixed': [
	'---', 'Lunar', 'Divino', 'Solar', 'Cristal', 'Espiritual', 'Nube', 'Termal',
	],
	},

	{'name': 'Oscuridad',
	'mixed': [
	'Lunar', '---', 'Eléctrico', 'Infernal', 'Espacial', 'Fantasma', 'Vacío', 'Veneno',
	],
	},

	{'name': 'Rayo',
	'mixed': [
	'Divino', 'Eléctrico', '---', 'Chispa', 'Tormenta', 'Trueno', 'Relámpago', 'Sonido',
	],
	},

	{'name': 'Fuego',
	'mixed': [
	'Solar', 'Infernal', 'Chispa', '---', 'Cuarzo', 'Volcánico', 'Calor', 'Vapor',
	],
	},

	{'name': 'Hielo',
	'mixed': [
	'Cristal', 'Espacial', 'Tormenta', 'Cuarzo', '---', 'Escarcha', 'Ventisca', 'Nieve',
	],
	},

	{'name': 'Tierra',
	'mixed': [
	'Espiritual', 'Fantasma', 'Trueno', 'Volcánico', 'Escarcha', '---', 'Basura', 'Planta',
	],
	},

	{'name': 'Viento',
	'mixed': [
	'Nube', 'Vacío', 'Relámpago', 'Calor', 'Ventisca', 'Basura', '---', 'Lluvia',
	],
	},

	{'name': 'Agua',
	'mixed': [
	'Termal', 'Veneno', 'Sonido', 'Vapor', 'Nieve', 'Planta', 'Lluvia', '---',
	],
	},
];
var classes = [
	{
		'name': 'Aprendiz',
		'primary': '',
		'secondary': '',
		'weak': '',
	},
	{
		'name': 'Monje',
		'primary': 'baseHP',
		'secondary': 'baseMP',
		'weak': 'baseATK',
	},
	{
		'name': 'Luchador',
		'primary': 'baseHP',
		'secondary': 'baseATK',
		'weak': 'baseSPD',
	},
	{
		'name': 'Paladín',
		'primary': 'baseHP',
		'secondary': 'baseDEF',
		'weak': 'baseSPD',
	},
	{
		'name': 'Ladrón',
		'primary': 'baseHP',
		'secondary': 'baseSPD',
		'weak': 'baseMP',
	},
	{
		'name': 'Nigromante',
		'primary': 'baseMP',
		'secondary': 'baseATK',
		'weak': 'baseHP',
	},
	{
		'name': 'Brujo',
		'primary': 'baseMP',
		'secondary': 'baseDEF',
		'weak': 'baseATK',
	},
	{
		'name': 'Mago',
		'primary': 'baseMP',
		'secondary': 'baseSPD',
		'weak': 'baseDEF',
	},
	{
		'name': 'Guerrero',
		'primary': 'baseATK',
		'secondary': 'baseDEF',
		'weak': 'baseMP',
	},
	{
		'name': 'Asesino',
		'primary': 'baseATK',
		'secondary': 'baseSPD',
		'weak': 'baseDEF',
	},
	{
		'name': 'Cazador',
		'primary': 'baseDEF',
		'secondary': 'baseSPD',
		'weak': 'baseHP',
	},
];
var classSkills = [
	//Aprendiz
	{'name': 'Cambia de clase hijo de puta',
	'damage': 1,
	'hit': 0.5,
	'cost': 1,
	'effect': '',
	'msg': ' persuade a ',
	'target': 'enemy',
	'desc': '['+color.orange+'Neutral'+color.r+'] No deberías ni siquiera estar viendo esto, cambia de clase ya, escribe '+color.blue+'clase $'+color.r+' para elegir una de forma aleatoria aunque sea.',
	'element': 0,
	},

	//Monje
	{'name': 'Redención',
	'damage': 2,
	'hit': 0.8,
	'cost': 9,
	'effect': 'mpdrain',
	'msg': ' realiza un golpe divino sobre ',
	'target': 'enemy',
	'desc': '['+color.orange+'Luz'+color.r+'] Causa daño a los puntos de MAGIA del enemigo.',
	'element': 0,
	},

	//Luchador
	{'name': 'Placaje',
	'damage': 2,
	'hit': 0.8,
	'cost': 9,
	'effect': 'physical',
	'msg': ' golpea fuertemente a ',
	'target': 'enemy',
	'desc': '['+color.orange+'Tierra'+color.r+'] Golpea con gran fuerza, causando daño físico y paralizando al enemigo.',
	'element': 5,
	},

	//Paladín
	{'name': 'Sacro',
	'damage': 2,
	'hit': 0.8,
	'cost': 9,
	'effect': 'addmp',
	'msg': ' dispara con luz divina a ',
	'target': 'enemy',
	'desc': '['+color.orange+'Luz'+color.r+'] Causa daño mágico de Luz, el poder varía dependiendo de tu magia actual.',
	'element': 0,
	},

	//Ladrón
	{'name': 'Robo',
	'damage': 0.1,
	'hit': 0.9,
	'cost': 5,
	'effect': 'steal',
	'msg': ' tropieza con ',
	'target': 'enemy',
	'desc': '['+color.orange+'Viento'+color.r+'] Permite robar puntos, puntos de habilidad o experiencia.',
	'element': 6,
	},

	//Nigromante
	{'name': 'Vampirismo',
	'damage': 2,
	'hit': 0.8,
	'cost': 9,
	'effect': 'stealhp',
	'msg': ' muerde a ',
	'target': 'enemy',
	'desc': '['+color.orange+'Oscuro'+color.r+'] Roba la energía vital de un enemigo, curandote VIDA.',
	'element': 1,
	},

	//Brujo
	{'name': 'Pacto',
	'damage': 0.5,
	'hit': 1,
	'cost': 1,
	'effect': 'healmp',
	'msg': ' restablece la magia de ',
	'target': 'self',
	'desc': '['+color.orange+'Sombra'+color.r+'] Reduce la VIDA del ejecutante y la intercambia por MAGIA.',
	'element': 1,
	},

	//Mago
	{'name': 'Adrenalina',
	'damage': 0,
	'hit': 1,
	'cost': 9,
	'effect': 'rush',
	'msg': ' mejora la concentración mágica de ',
	'target': 'self',
	'desc': '['+color.orange+'Fuego'+color.r+'] Triplica el daño mágico, reduce la defensa y la velocidad a la mitad.',
	'element': 3,
	},

	//Guerrero
	{'name': 'Empujón',
	'damage': 2,
	'hit': 0.8,
	'cost': 9,
	'effect': 'addhp',
	'msg': ' empuja a ',
	'target': 'enemy',
	'desc': '['+color.orange+'Tierra'+color.r+'] Causa más daño cuanto mayor sea la vida del ejecutante.',
	'element': 5,
	},

	//Asesino
	{'name': 'Puñalada',
	'damage': 3,
	'hit': 0.6,
	'cost': 10,
	'effect': 'allcrit',
	'msg': ' ataca súbitamente a ',
	'target': 'enemy',
	'desc': '['+color.orange+'Oscuro'+color.r+'] Causa mucho daño, puede matar al instante en algunas ocasiones.',
	'element': 1,
	},

	//Cazador
	{'name': 'Puntería',
	'damage': 0,
	'hit': 1,
	'cost': 9,
	'effect': 'rush2',
	'msg': ' mejora la puntería de ',
	'target': 'self',
	'desc': '['+color.orange+'Rayo'+color.r+'] Triplica el ataque y aumenta la precisión al 100%. Reduce a 0 la defensa.',
	'element': 2,
	},
];
var skills = [
	{'name': 'Cura',
	'damage': -0.5,
	'hit': 1,
	'cost': 5,
	'effect': 'heal',
	'msg': ' cura a ',
	'target': 'self',
	'desc': '['+color.orange+'Luz'+color.r+'] Restaura vida a un usuario y cura cualquier estado perjudicial.',
	'element': 0,
	},
	//Magia de luz, recupera vida y cura estados perjudiciales.

	{'name': 'Sombra',
	'damage': 0.5,
	'hit': 0.8,
	'cost': 5,
	'effect': 'blind',
	'msg': ' envia sombras hacia ',
	'target': 'enemy',
	'desc': '['+color.orange+'Oscuro'+color.r+'] Causa daño y ciega, reduciendo la precisión de los ataques enemigos.',
	'element': 1,
	},
	//Magia de oscuridad, causa daño y ceguera, reduciendo las probabilidades de acierto.

	{'name': 'Rayo',
	'damage': 1,
	'hit': 0.8,
	'cost': 5,
	'effect': 'shock',
	'msg': ' lanza un rayo sobre ',
	'target': 'enemy',
	'desc': '['+color.orange+'Rayo'+color.r+'] Causa daño y parálisis, reduciendo la velocidad a la mitad, además, la parálisis impide que un usuario pueda moverse.',
	'element': 2,
	},
	//Magia del rayo, hace daño y paraliza, reduciendo la velocidad.

	{'name': 'Quemadura',
	'damage': 1,
	'hit': 0.8,
	'cost': 8,
	'effect': 'fire',
	'msg': ' rodea de llamas a ',
	'target': 'enemy',
	'desc': '['+color.orange+'Fuego'+color.r+'] Causa daño y quemaduras, que reducen la vida poco a poco y debilitan el ataque y la defensa de la víctima.',
	'element': 3,
	},
	//Magia del fuego, hace daño y quema, aumentando el daño recibido y reduciendo la vida con el tiempo.

	{'name': 'Congelacion',
	'damage': 1,
	'hit': 0.8,
	'cost': 8,
	'effect': 'freeze',
	'msg': ' congela a ',
	'target': 'enemy',
	'desc': '['+color.orange+'Hielo'+color.r+'] Causa daño y congela, inmovilizando al enemigo durante un tiempo.',
	'element': 4,
	},
	//Magia del hielo, hace daño y congela, inmovilizando al enemigo durante un ataque.

	{'name': 'Enredadera',
	'damage': 0,
	'hit': 0.6,
	'cost': 5,
	'effect': 'poison',
	'msg': ' rodea de plantas venenosas a ',
	'target': 'enemy',
	'desc': '['+color.orange+'Tierra'+color.r+'] Envenena a un usuario, causando daño continuo durante un tiempo.',
	'element': 5,
	},
	//Magia de la tierra, envenena al enemigo, causando daño con el tiempo.

	{'name': 'Tornado',
	'damage': 0,
	'hit': 1,
	'cost': 10,
	'effect': 'crit',
	'msg': ' usa el poder del viento para mejorar a ',
	'target': 'self',
	'desc': '['+color.orange+'Viento'+color.r+'] Mejora la velocidad de un usuario y su probabilidad de asestar golpes críticos.',
	'element': 6,
	},
	//Magia del viento, aumenta el daño crítico y aumenta las probabilidades de crítico al 100% durante un ataque.

	{'name': 'Cascada',
	'damage': 0,
	'hit': 1,
	'cost': 10,
	'effect': 'protect',
	'msg': ' crea un velo de agua que protege a ',
	'target': 'self',
	'desc': '['+color.orange+'Agua'+color.r+'] Aumenta la defensa de un usuario, reduciendo el daño que este recibe.',
	'element': 7,
	}
	//Magia del agua, reduce el daño recibido y protege contra estados perjudiciales durante un ataque.
];

var config = {
	/*
	channels: [#spain],
	server: 'irc.rizon.net',
	botName: 'Lilim',
	*/

	/*
	channels: ['#amistad', '#sexo'],
	server: 'irc.chatzona.org',
	botName: 'rubia_28',
	*/

	channels: ['#Pruebas', '#juegos', '#LilimRPG', 
    '#aniterasu', '#ClubDeFansDeLadyJorougumo', '#lacueva',
    ],
	server: 'irc.aniterasu.com',
	botName: 'Lilim',
    userName: 'tonta',
    realName: 'tonta',
}
var database = {
	'phrasebook': [],
	'answers': [],
	'messages': {},
	'users': {},
}

var BANNED_WORDS = [
'!amor', 'hitler', 'compatibilidad', '@', '/', 'caliente', 'http', 'lilim', 'www', 'rt', '!song', 'wb', 'polla'
];

if (app) {
	app.get('/', function(req, res){
	  res.sendFile(__dirname + '/index.html');
	});
	app.use(express.static(__dirname + '/public'));
	app.use(express.static(__dirname + '/bot.js'));
	app.use(express.static(__dirname + './bot.js'));
	app.use(express.static(__dirname + 'bot.js'));
	app.use(express.static(__dirname + '/'));
}

http.listen(lilimPort, "0.0.0.0", function(){
  console.log('listening on *:'+lilimPort);
});

io.on('connection', function(socket){
	socket.emit('database', database);
	socket.on('say', function(msg) {
		bot.say(msg.to, msg.text);
	});
    socket.on('addAnswer', function(dat) {
        console.log('Got add answer request with data ID:'+dat.questionID+' answer:'+dat.answer);
        addAnswer(dat.questionID, dat.answer);
        socket.emit('database', database);
    });
    socket.on('delPhrase', function(dat) {
        console.log('Asked phrase '+dat.questionID+' for deletion.');
        delAnswer(dat.questionID);
        socket.emit('database', database);
    });
    socket.on('delAnswer', function(dat) {
        console.log('Asked phrase '+dat.questionID+' (answer '+dat.answerID+') for deletion.');
        delAnswer(dat.questionID, dat.answerID);
        socket.emit('database', database);
    });

	socket.on('askUser', function(dat) {
		var u = database.users[dat.username];
		if (!u.name) u.name = dat.username;
		socket.emit('askUser', {'username': dat.username, 'data': u});
	});
	socket.on('password', function(dat) {
		var forUser = dat.username;
		var password = dat.password;
		var check = userPassword[forUser];
		if (!check || !password) {
			socket.emit('serverMessage', {'message': 'Enviando clave secreta...'});
			var pwd = getRandomKey();
			userPassword[forUser] = pwd;

			socket.emit('loginFailed');

			bot.whois(forUser, function(w) {
                console.log('Whois response: ');
                console.log(w);
				if (!w) return;
				bot.say(forUser, 'Hola. Para conectar a Lilim RPG Web, utiliza la siguiente clave: '+pwd);
			});
		}
		if (check) {
			console.log('Check is '+check+' and got password '+password);
			if (check == password) {
				socket.emit('serverMessage', {'message': 'Bienvenido a bordo '+forUser+' ;D'});
				socket.emit('askUser', {'username': forUser, 'data': database.users[forUser]});
				socket.emit('loginSucess');
				loggedUsers[socket.id] = forUser;
			}
			if (check != password) {
				socket.emit('serverMessage', {'message': 'La contraseña no es correcta, lo siento.'});
				socket.emit('loginFailed');
			}
		}
	});
	socket.on('action', function(dat) {
		var user = socket.id;
		console.log('User id '+user+' sent action.');
		console.log('Checking login data...');
		var login = loggedUsers[user];
		if (!login) {
			console.log('User is not logged in. Action '+dat.action+' not permitted.');
		}
		if (login) {
			console.log('User is logged in as '+login);
			if (dat.action == 'spawnBoss') {
				//Check if boss is alive
				if (database.users['$default_boss'].actualHP > 0) {
					console.log('Not generating a boss as it is already generated.');
				}
				else {
					spawnBoss(login);
				}
				socket.emit('askUser', {'username': '$default_boss', 'data': database.users['$default_boss']});
			}
			if (dat.action == 'atac') {
				console.log('Starting attack from '+login+' to '+dat.to);
				var ev = attack(login, dat.to, false, false, true);
				socket.emit('serverMessage', {'message': ev});
				console.log('Attack ended.');
				socket.emit('askUser', {'username': login, 'data': database.users[login]});
				socket.emit('askUser', {'username': dat.to, 'data': database.users[dat.to]});
			}
		}
	});

    //Lilim RPG to Web API
    socket.on('askMap', function() {
        console.log('User asked for a map. Map is ? chars length');
        socket.emit('askMap', database.map);
    });
    socket.on('boardStatus', function() {
        console.log('boardStatus req');
        if (database.boardGamePlayers.length < 2) socket.emit('boardStatus', 'need_players');
        if (database.boardGamePlayers.length >= 2) socket.emit('boardStatus', 'ready');
        if (database.boardGameStarted) socket.emit('boardStatus', 'already started');
    });
    socket.on('joinGame', function(dat) {
        var user = socket.id;
        var login = loggedUsers[user];
        if (login) {
            var check = database.boardGamePlayers.indexOf(login);
            if (database.boardGameStarted) {
                socket.emit('No puedes unirte a la partida, ya ha empezado.');
                return;
            }
            if (check >= 0) {
                socket.emit('joinGame', 'already_joined');
            }
            else {
                socket.emit('joinGame', 'join_sucess');
                socket.emit('joinGame', 'Players in game: '+database.boardGamePlayers.length);
            }

        }
        else {
            socket.emit('joinGame', 'unauthorized');
        }
        checkBoardGame();
    });
    socket.on('command', function(dat) {
        //{'cmd': 'command', 'args': 'arguments'};
    });
});

var bot = new irc.Client(config.server, config.botName, {
	channels: config.channels,
	userName: 'Lilim',
	realName: 'Lilim version '+v.latestVersion+' ¡Esto es privado!',
	//stripColors: true,
});

bot.addListener('error', function(message) {
    console.log('error: ', message);
});
bot.addListener('registered', function(message) {
    console.log('Sucessfully connected the network. Identifying...');

    setTimeout(function() {
        bot.say('NickServ', 'identify sasorisucks');
    }, 5000);
    setTimeout(function() {
        bot.say('ChanServ', 'voice #aniterasu');
        bot.say('ChanServ', 'dehalfop #aniterasu');
    }, 10000);
});

bot.addListener('join', function(channel, who) {
	addUserToHostDatabase(who);
	knownUsers.push(who);

	messageDelivery(who, channel);

	whois(who);
});

function addPlayerToBoardGame(player) {
    database.boardGamePlayers.push(login);
    if (database.boardGamePlayers.length >= 2) {
        io.emit('joinGame', 'YA HAY 2 O MÁS JUGADORES EN LA PARTIDA!');
        var d = new Date();
        var v = d.valueOf();
        v += 120000;
        database.nextBoardGame = v;
        io.emit('joinGame', 'La partida empezará a las '+new Date(database.nextBoardGame));
    }
}
function checkBoardGame() {
    var d = new Date();
    d = d.valueOf();
    if (database.nextBoardGame <= d) {
        io.emit('joinGame', 'LA PARTIDA EMPIEZA YA!');
        database.boardGameStarted = true;
        startBoardGame();
    }
    else {
        io.emit('joinGame', 'La partida empezará a las '+new Date(database.nextBoardGame));
    }
}
function startBoardGame() {
    var boardGameTurn = 0;
    database.boardGame = newBoardGame(100);
    io.emit('joinGame', 'Turno de '+database.boardGamePlayers[boardGameTurn]+'!');
}
function bg_newTurn() {
    boardGameTurn++;
    if (boardGameTurn >= database.boardGamePlayers.length) boardGameTurn = 0;
    io.emit('joinGame', 'Turno de '+database.boardGamePlayers[boardGameTurn]+'!');
}
function messageDelivery(nick, channel) {
	if (!database) return;
	if (!database.messages) return;
	if (!database.messages[nick]) return;
	var who = nick;

	var mess = database.messages[who];
	if (mess && mess.length > 0) {
		var msgstring = database.messages[who].join(', ');
		setTimeout(function() {
			bot.say(channel, who+': '+msgstring);
			database.messages[who] = [];
		}, 5000);
	}
}
function whois(nick) {
	if (isUserWhoised(nick)) return;
	if (userWhoises[nick]) return;
	var who = nick;
	if (!database.hosts) database.hosts = {};
	bot.whois(who, function(w) {
		if (!w) return;
		userWhoises[who] = w;
	});
	whoised.push(nick);
}
function getAlignment(userObject) {
	var sk = userObject.skills;
	var total = 0;
	for (var e in sk) if (sk[e] > 0) total += sk[e];
	var alignments = [];
	for (var e in sk) {
		var v = sk[e] / total;
		if (v >= (1 / 3)) alignments.push(e);
	}
	if (alignments.length <= 0) return 'Neutral';
	if (alignments.length == 1) return elements[alignments[0]].name;
	if (alignments.length > 1) {
		var primary = alignments[0];
		var secondary = alignments[1];

		var al = elements[primary].mixed[secondary];
		return elements[primary].name+' ('+al+')';
	}
	return '???';
}
function addUserToHostDatabase(nick) {
	if (!userWhoises[nick]) whois(nick);
	if (userWhoises[nick]) {
		var h = userWhoises[nick].host;
		var n = nick;
		if (!h) return;
		if (!database.hosts[h]) database.hosts[h] = [];

		var isHere = database.hosts[h].indexOf(nick);
		if (isHere < 0) database.hosts[h].push(nick);
	}
}
function isUserWhoised(nick) {
	var d = whoised.indexOf(nick);
	if (d >= 0) return true;
	return false;
}
function getRandomKey() {
	var min = Math.pow(36, 8);
	var max = Math.pow(36, 9) - 1;
	var num = rand(min, max);
	return num.toString(36).toUpperCase();
}
function getBossName() {
	var gbn = getWordPart()+''+getWordPart();
	do {
		gbn += ''+getWordPart();
	}
	while (!rand(0,1));
	var gb = [];
	for (var gbnn in gbn) {
		var let = gbn[gbnn];
		if (gbnn == 0) let = let.toUpperCase();
		gb.push(let);
	}
	return gb.join('');
}
function getWordPart() {
	return String.fromCharCode(rand(97, 122))+read(['a', 'e', 'i', 'o', 'u']);
}
function userStatus(nick, objectMode) {
	var user = (objectMode) ? nick : database.users[nick];
	if (!user.status) user.status = {
		'type': null,
		'strength': 0,
		'turns': 0,
		'bad': false,
	}
	return JSON.stringify(user.status);
}
function Equipment(defolt, randomizeLevel) {
	this.leftHand = new Item({'slot': 'leftHand'});
	this.rightHand = new Item({'slot': 'rightHand'});
	this.head = new Item({'slot': 'head'});
	this.armor = new Item({'slot': 'armor'});
	this.feet = new Item({'slot': 'feet'});
	this.amulet = new Item({'slot': 'amulet'});
	if (defolt) {
		var properties = ['leftHand', 'rightHand', 'head', 'armor', 'feet'];
		for (var e in properties) {
			var prop = properties[e];
			if (defolt[prop]) this[prop] = new Item(defolt[prop]);
		}
	}
	if (randomizeLevel) {
		this.leftHand = generateItem('leftHand', '', randomizeLevel);
		this.rightHand = generateItem('rightHand', '', randomizeLevel);
		this.head = generateItem('head', '', randomizeLevel);
		this.armor = generateItem('armor', '', randomizeLevel);
		this.feet = generateItem('feet', '', randomizeLevel);
		this.amulet = generateItem('amulet', '', randomizeLevel);
	}
}
function Item(defolt) {
	this.name = 'Nada';
	this.slot = 'item';

	this.baseHP = 0;
	this.baseMP = 0;
	this.baseATK = 0;
	this.baseDEF = 0;
	this.baseSPD = 0;

	if (defolt) {
		var properties = ['name', 'slot', 'baseHP', 'baseMP', 'baseATK', 'baseDEF', 'baseSPD'];
		for (var e in properties) {
			var prop = properties[e];
			if (defolt[prop]) this[prop] = defolt[prop];
		}
	}
}
function getPriceForItem(itemObj) {
	var base = totalUserBases(itemObj, false, true);
	return Math.ceil(base * STAT_INCREASE_PER_SKILL_POINT * 0.1) + 1;
}
function removeNumbersFromString(string) {
	var st = string.split('');
	var newString = [];
	for (var r in st) {
		var n = parseInt(st[r]);
		if (n >= 0 && n <= 9) continue;
		newString.push(st[r]);
	}
	return newString.join('');
}
function upgradePlayer(player) {
    var msg = '';
    var equip = player.equipment;
    if (equip == undefined) player.equipment = new Equipment();
    equip = player.equipment;
    var armor = equip.armor;
    if (armor.baseDEF) {
        msg += 'Cambiando '+armor.baseDEF+' por VIDA. ';
        armor.baseHP += armor.baseDEF;
        armor.baseDEF = 0;
    }
    if (!player.clean3) {
        player.clean3 = true;
        player.lastLevel = 1;
        msg += 'Marcando ('+player.name+') como actualizado.';
    }
    if (!msg) msg = 'Sin cambios. ('+player.name+') está actualizado.';
    return msg;
}
function generateItem(slot, name, level, tailor) {
    console.log('generateItem - Generating item for slot:'+slot+' name:'+name+' level:'+level+' tailor:'+tailor);
	var i = equipmentSlots;
	var s = searchName(slot, i);
	var slot = i[s].value;
	var defaultName = (name) ? name : i[s].defaultName;
	var defaultValue = 'baseDEF';

	if (!level) level = 1;
	var max = (level * 5);
	var min = level;

	var primaryValue = max;

    console.log('generateItem - Slot is '+slot);

	if (slot == 'leftHand') defaultValue = 'baseATK';
	if (slot == 'feet') defaultValue = 'baseSPD';
	if (slot == 'armor') defaultValue = 'baseHP';
	if (slot == 'head') defaultValue = 'baseMP';
	if (slot == 'amulet') defaultValue = read(statNamesObj).baseName;

	var secondaryValue = min;
	var secondaryBase = read(statNamesObj).baseName;
	if (tailor) {
		var battleClass = tailor.battleClass;
		var classObject = classes[battleClass];
		var selectStat = read([classObject.primary, classObject.secondary]);
		if (selectStat) secondaryBase = selectStat;
		if (slot == 'amulet' && selectStat) defaultValue = selectStat;
	}

    console.log('Primary base ('+primaryValue+') is '+defaultValue+' secondary base ('+secondaryValue+') is '+secondaryBase);

	if (secondaryBase == defaultValue) {
		primaryValue = max + min;
		secondaryValue = 0;
	}

	var i = {};
	i.slot = slot;
	i[secondaryBase] = secondaryValue;
	i[defaultValue] = primaryValue;

	i.name = defaultName;
	return new Item(i);
}
function resetStats(o) {
    var sp = randomDivide(1000, 5);

    o.baseHP = sp[0];
    o.baseMP = sp[1];
    
    o.baseATK = sp[2];
    o.baseDEF = sp[3];
    o.baseSPD = sp[4];
}
function generateUser(base, boss) {
	var o = {};
	if (base) {
		base = database.users[base];
	}
	o.boss = false;
	o.points = 0;
	o.deathTimer = 0;
	o.statPoints = 0;
	o.level = 1;

    resetStats(o);

	o.battleClass = rand(1, classes.length) - 1;

	o.skills = [];

	o.equipment = new Equipment();

	o.status = {
		'type': null,
		'strength': 0,
		'bad': false,
		'turns': 0,
	}

	o.assistedBy = [];
	o.newKilledBy = [];
	o.clean = true;
    o.clean2 = true;
    o.clean3 = true;

	o.expMod = 1;
	o.lastLevel = 1;

	o.name = '';
	if (boss) o.name = getBossName();
	if (base) {
		o.boss = true;
		var mnl = Math.ceil(base.level * 0.8);
		var mxl = Math.ceil(base.level * 1.2);
		if (mnl <= 1) mnl = 1;
		o.level = rand(mnl, mxl);

		o.equipment = new Equipment(false, o.level);

		var minPoints = o.level * STAT_POINTS_PER_LEVEL;
		var maxPoints = o.level * MAX_STAT_POINTS_PER_LEVEL;

		var allPoints = rand(minPoints, maxPoints) - o.level;

		var divide = randomDivide(allPoints, 5);

		o.baseHP += (divide[0] * STAT_INCREASE_PER_SKILL_POINT);
		o.baseATK += (divide[1] * STAT_INCREASE_PER_SKILL_POINT);
		o.baseDEF += (divide[2] * STAT_INCREASE_PER_SKILL_POINT);
		o.baseSPD += (divide[3] * STAT_INCREASE_PER_SKILL_POINT);
		o.baseMP += (divide[4] * STAT_INCREASE_PER_SKILL_POINT);

		var primarySkill = rand(1, skills.length) - 1;
		var secondarySkill = rand(1, skills.length) - 1;
		var divide = randomDivide(o.level, 2);
		o.skills[primarySkill] = 0;
		o.skills[secondarySkill] = 0;

		o.skills[primarySkill] += divide[0];
		o.skills[secondarySkill] += divide[1];
	}
	o.actualHP = 0;
	o.experience = 0;

	if (boss) {
		//For use with thieves
		o.points = rand(0, (o.level * MAX_STAT_POINTS_PER_LEVEL * STAT_INCREASE_PER_SKILL_POINT));
		o.statPoints = rand(0, (o.level * STAT_POINTS_PER_LEVEL));
		o.experience = rand(0, expForNextLevel(o.level));
	}
	return o;
}
function randomDivide(amount, recipients) {
	if (!amount) amount = 0;
	var rec = [];
	for (var x = 0; x < recipients; x++) rec.push(0);
	while (amount > 0) {
		var h = Math.ceil(amount / recipients) + 1;
		var pick = rand(0, h);
		amount -= pick;
		var r = rand(1, rec.length) - 1;
		rec[r] += pick;
	}
	return rec;
}
function checkStatsForUser(nickname) {
	if (!database) {
		return;
	}
	if (!database.users) {
		database.users = {};
	}
	if (!database.users[nickname]) {
		database.users[nickname] = {};

		database.users[nickname] = generateUser();
		healUser(nickname, Infinity);
	}
	var uz = database.users[nickname];
	if (nickname == '$GOD') {
		uz.level = Infinity;
		uz.baseHP = Infinity;
		uz.baseMP = Infinity;
		uz.baseATK = Infinity;
		uz.baseDEF = Infinity;
		uz.baseSPD = Infinity;
		uz.boss = true;
	}

	if (uz.actualHP != 0 && !uz.actualHP) {
		uz.actualHP = 0;
		healUser(nickname, Infinity);
	}
	if (uz.actualMP != 0 && !uz.actualMP) {
		uz.actualMP = 0;
		healUser(nickname, Infinity, true);
	}
	if (parseInt(uz.statPoints) == NaN || uz.statPoints == null) uz.statPoints = STAT_POINTS_PER_LEVEL;
	if (!uz.clean2) {
        uz.experience = 0;
        uz.level = 1;
        var tot = 0;
        for (var e in statNames) {
            tot += uz[e];
            uz[e] = 200;
        }
        var toStatPoints = Math.ceil(tot / STAT_INCREASE_PER_SKILL_POINT);
        for (var e in uz.skills) {
            if (uz.skills[e] > 0) {
                tot += uz.skills[e];
                uz.skills[e] = 0;
            }
        }
        resetStats(uz);
        uz.clean2 = true;
        uz.statPoints += toStatPoints;
	}
	if (!uz.battleClass) uz.battleClass = 0;
	if (!uz.equipment) uz.equipment = new Equipment();
	if (typeof uz.baseHP != 'number') uz.baseHP = 100;
	if (typeof uz.baseMP != 'number') uz.baseMP = 100;
	if (typeof uz.baseATK != 'number') uz.baseATK = 100;
	if (typeof uz.baseDEF != 'number') uz.baseDEF = 100;
	if (typeof uz.baseSPD != 'number') uz.baseSPD = 100;
}
function healUser(nickname, amount, mana) {
	var b = (!mana) ? 'baseHP' : 'baseMP';
	var b2 = (!mana) ? 'actualHP' : 'actualMP';

	var max = getStatsFor(nickname, b);
	var userObject = database.users[nickname];

	userObject[b2] += amount;
	
	if (userObject[b2] >= max) userObject[b2] = max;
	if (userObject[b2] < 0) userObject[b2] = 0;
}
function getStatsFord(nickname, stat, objectMode) {
	return getStatsFor(nickname, stat, objectMode);
}
function getStatsFor(nickname, stat, objectMode) {
	if (!objectMode) checkStatsForUser(nickname);

	var userObject = (objectMode) ? nickname : database.users[nickname];
	var levelMod = userObject.level / 100;

	var baseStat = Math.floor(levelMod * userObject[stat]);

	//Weapon/Armor modifier
	for (var w in userObject.equipment) {
		if (userObject.equipment[w][stat]) baseStat += userObject.equipment[w][stat];
	}

	if (!userObject.battleClass) userObject.battleClass = 0;
	var uc = userObject.battleClass;
	uc = classes[uc];
	if (stat == uc.primary || stat == uc.secondary) baseStat = Math.ceil(baseStat * 1.5);
	if (stat == uc.weak) baseStat = Math.floor(baseStat * 0.5);

	var us = userStatus(userObject, true);
	var shockCondition = (userObject.status.type == 'shock' && stat == 'baseSPD');
	var fireCondition = (userObject.status.type == 'fire' && (stat == 'baseATK' || stat == 'baseDEF'));
	if (shockCondition || fireCondition) baseStat = Math.floor(baseStat / 2);
	if (userObject.status.type == 'crit' && stat == 'baseSPD') baseStat = Math.ceil(baseStat * 1.5);
	if (userObject.status.type == 'protect' && stat == 'baseDEF') baseStat = Math.ceil(baseStat * 1.5);

	if (userObject.status.type == 'rush' && stat == 'baseMP') baseStat = Math.ceil(baseStat * 3);
	if (userObject.status.type == 'rush' && (stat == 'baseDEF' || stat == 'baseSPD')) baseStat = Math.ceil(baseStat * 0.5);

	if (userObject.status.type == 'rush2' && stat == 'baseATK') baseStat = Math.ceil(baseStat * 3);
	if (userObject.status.type == 'rush2' && stat == 'baseDEF') baseStat = 0;

	if (userObject.boss && stat == 'baseHP') baseStat = Math.ceil(baseStat * BOSS_HEALTH_MODIFIER);

	if (stat == 'baseHP') return baseStat + 20;
	if (stat == 'baseMP') return baseStat + 10;
	return baseStat + 5;
}
function startGuessGame(channel) {
	guessGameOptions = {};
	var pok = read(pokemonList);
	guessGameOptions.pokemon = pok;
	guessGameOptions.attempts = 0;
	var maxp = Math.ceil((pok.length / GUESS_POINT_GAIN) * (pokemonList.length / GUESS_POINT_GAIN)) + GUESS_POINT_GAIN;
	maxp = Math.ceil(maxp);
	guessGameOptions.points = maxp;
	guessGameOptions.hidden = hide(pok);
	guessGameOptions.channel = channel;

	bot.say(channel, 'Estoy pensando en un pokémon, el que lo adivine ganará '+maxp+' puntos. Pista: '+guessGameOptions.hidden[guessGameOptions.attempts]);
}
function hide(string) {
	var st = string;
	var arr = [];
	arr.push(string);
	while (string != hidden(string, 1)) {
		string = hidden(string);
		arr.push(string);
	}

	return arr.reverse();
}
function hidden(string, all) {
	var s = string.split('');
	var notHidden = [];
	for (var h in s) {
		if (s[h] != '*') notHidden.push(h);

		if (all) s[h] = '*';
	}
	if (!all) {
		var r = read(notHidden);
		s[r] = '*'
	}

	return s.join('');
}
function uniqueChars(string) {
var l = '';
    for (var i = 0; i <= string.length; i++) {
        var thisC = string.charAt(i);
        var C = count(l, thisC.charCodeAt(0));
        if (C == 0) l += thisC;
    }
return l;
}
function canPlayHere(channel) {
	var bannedChannels = ['#aniterasu', bot.nick, config.botName];
	for (var cph in bannedChannels) {
		if (channel.toLowerCase() == bannedChannels[cph].toLowerCase()) return false;
	}
	return true;
}
function simil(firstString, secondString) {
	if (!firstString) firstString = '';
	if (!secondString) secondString = '';
	var osl = firstString.length;
	var csl = secondString.length;
	var max = osl;
	if (csl > osl) var max = csl;
	var min = csl;
	if (osl < csl) var min = osl;

	var eq = 0;
	for (var i = 0; i < osl; i++) if (firstString.charAt(i) == secondString.charAt(i)) eq++;
	eq = eq / max;
	var lon = min / max;
	var zz = firstString + '' + secondString;
	var str = uniqueChars(zz);
	var LL = 0;
	for (var i = 0; i < str.length; i++) {
		var C = str.charAt(i);
		var c1 = count(firstString, C.charCodeAt(0));
		var c2 = count(secondString, C.charCodeAt(0));
		var LL = Math.abs(c1 - c2);
	}

	var TL = osl + csl;
	var sim = TL - LL;
	var sim = sim / TL;
	var JARO = eq + lon + sim;
	var JARO = JARO / 3;
	return JARO;
}
function damageFormula(from, to, magic, pierce) {
	var atk = (magic) ? getStatsFor(from, 'baseMP') : getStatsFor(from, 'baseATK');
	var def = (magic) ? getStatsFor(to, 'baseMP') : getStatsFor(to, 'baseDEF');
	if (pierce) def = 0;
	//Damage percentage
	var d = (100 / (100 + def)) * 100;
	var dr = 100 - d;
	var doubleA = atk / 100;

	var dmg = Math.floor(doubleA * (100 - dr));

	if (dmg < 1) dmg = 1;
	return dmg;
}
function expForNextLevel(level) {
	return Math.ceil(Math.pow((level + 1), 4.32));
}
function getExpFor(from, to) {
	var fu = database.users[from];

	var ul1 = database.users[from].level;
	var ul2 = database.users[to].level;

	var ext = expForNextLevel(ul2);

	var mod = 0.128;
	if (ul1 > ul2) mod -= 0.216 * (ul1 - ul2);
	if (ul2 > ul1) mod += 0.013 * (ul2 - ul1);

	if (mod < 0.001) mod = 0.001;

	//Exp modifier
	if (!fu.expMod) fu.expMod = 1;
	if (!fu.lastLevel) fu.lastLevel = 1;

	return Math.ceil(ext * mod * (1 + (fu.expMod / 100)));
}
function levelUp2(from, peek) {
	var userObject = database.users[from];
	var oldies = {};
	var newies = {};
	var stats = ['baseHP', 'baseMP', 'baseATK', 'baseSPD', 'baseDEF'];
	var statNames = {
		'baseHP': 'VIDA',
		'baseMP': 'MAG',
		'baseATK': 'ATQ',
		'baseSPD': 'VEL',
		'baseDEF': 'DEF'
	}
	for (var o in stats) {
		oldies[stats[o]] = getStatsFord(from, stats[o]);
	}
	if (userObject.experience < expForNextLevel(userObject.level)) return '';
	if (peek) return true;
	userObject.experience -= expForNextLevel(userObject.level);
	userObject.level += 1;
	userObject.statPoints += STAT_POINTS_PER_LEVEL;
	for (var o in stats) {
		newies[stats[o]] = getStatsFord(from, stats[o]);
	}
	var lll = '';
	for (var o in newies) {
		lll += oldies[o]+'->'+newies[o]+'/'+statNames[o]+' ';
	}
    console.log('Subiendo de nivel... Exp: '+userObject.experience+' exp for next level: '+expForNextLevel(userObject.level));
	return from+' ha subido al nivel '+userObject.level+'('+lll+')';
}
function levelUp(from) {
	var uzer = database.users[from];
	var oldUser = JSON.parse(JSON.stringify(uzer));
	var oldLevel = uzer.level;
	while (levelUp2(from, 1)) console.log(levelUp2(from));
	var uzer = database.users[from];
	var newUser = JSON.parse(JSON.stringify(uzer));
	var newLevel = uzer.level;

	var comp = compareStats(oldUser, newUser);
	if (oldLevel != newLevel) return from+' sube del nivel '+oldLevel+' al '+newLevel+' ('+comp+')';
	return '';
}
function compareStats(oldz, newz) {
	var oldies = {};
	var newies = {};
	var stats = ['baseHP', 'baseMP', 'baseATK', 'baseSPD', 'baseDEF'];
	var statNames = {
		'baseHP': 'VIDA',
		'baseMP': 'MAG',
		'baseATK': 'ATQ',
		'baseSPD': 'VEL',
		'baseDEF': 'DEF'
	}
	for (var o in stats) {
		oldies[stats[o]] = getStatsFord(oldz, stats[o], true);
	}

	for (var o in stats) {
		newies[stats[o]] = getStatsFord(newz, stats[o], true);
	}
	var lll = '';
	for (var o in newies) {
		lll += shortm(oldies[o])+'->'+shortm(newies[o])+'/'+statNames[o]+' ';
	}
	return lll;
}
function increaseStat(user, stat, times) {
	var cost = times;
	if (stat == 'experience') cost = Math.ceil(times / 100);
	var userObject = database.users[user];

	var nowPoints = totalSpentPoints(userObject);
	var nextPoints = nowPoints + cost;
	var max = totalSpentPoints(userObject, true);
	if (stat != 'experience' && nextPoints > max) {
		return 'No puedes aumentar más tu '+statNames[stat]+' hasta que subas de nivel.';
	}
	if (stat == 'experience') {
		if (userObject.points < cost) return 'Necesitas '+cost+' puntos.';
		userObject.points -= cost;

		userObject.experience += times;

		return 'Has ganado '+times+' puntos de experiencia! '+levelUp(user);
	}
	if (userObject.statPoints < cost) return 'Necesitas '+cost+' puntos de habilidad.';
	userObject.statPoints -= cost;

	var old = getStatsFord(user, stat);
	userObject[stat] += (STAT_INCREASE_PER_SKILL_POINT * times);
	var newz = getStatsFord(user, stat);
	return 'Tu '+statNames[stat]+' aumenta! '+shortm(old)+' -> '+shortm(newz);
}
function getCritDamage(guy) {
	var critDmg = getStatsFor(guy, 'baseSPD');
	critDmg /= 100;
	critDmg++;
	if (database.users[guy].status.type == 'crit') critDmg *= 1.2;
	return critDmg;
}
function getChances(from, to, fromObj, toObj) {
	if (!fromObj) fromObj = database.users[from];
	if (!toObj) toObj = database.users[to];
	var atkmod = getStatsFor(from, 'baseATK') / getStatsFor(to, 'baseATK');
	var defmod = getStatsFor(to, 'baseDEF') / getStatsFor(from, 'baseDEF');
	var spdmod = getStatsFor(from, 'baseSPD') / getStatsFor(to, 'baseSPD');

	var hitChance = (0.9 * defmod * spdmod);
	if (fromObj.status.type == 'blind') hitChance *= 0.5;
	if (fromObj.status.type == 'rush2') hitChance = 1;
	if (hitChance < 0.2) hitChance = 0.2;
	if (hitChance > 1) hitChance = 1;

	critChance = (0.1 * atkmod * spdmod);
	if (fromObj.status.type == 'crit') critChance += 0.5;
	if (critChance < 0) critChance = 0;
	if (critChance > 1) critChance = 1;

	hitChance = 1 - hitChance;

	return {
		'hitChance': hitChance,
		'critChance': critChance,
	}
}
function addUserToPot(user, victim, damage) {
	if (!damage) damage = 0;

	var uz = database.users[victim];
	if (!uz.newKilledBy) uz.newKilledBy = [];

	if (user == '$default_boss' || user == '$GOD') return;
	if (user == victim) return;

	for (var e in uz.newKilledBy) {
		if (uz.newKilledBy[e].nick == user) {
			var realDamage = damage;

			uz.newKilledBy[e].damage += damage;
			return;
		}
	}
	uz.newKilledBy.push({
		'nick': user,
		'damage': damage
	})
}
function physicalAttack(from, to, nokill) {
	var fromu = database.users[from];
	var tou = database.users[to];

	var fromname = (fromu.name) ? fromu.name : from;
	var toname = (tou.name) ? tou.name : to;

	var dmg = damageFormula(from, to);
	var msg = fromname+' ataca.';
	if (critChance == 1 && dodgeChance != 1) {
		var critDmg = getCritDamage(from);
		dmg *= critDmg;
		dmg = Math.ceil(dmg)
		msg += ' Golpe crítico!!!';
	}
	else {
		if (dodgeChance == 1) {
			msg += ' Fallo!';
			dmg = 0;
		}
	}
	var shockCondition = (fromu.status.type == 'shock' && rand(0,1));
	var freezeCondition = (fromu.status.type == 'freeze');
	if (shockCondition || freezeCondition) {
		msg = fromname+' no puede moverse!';
		dmg = 0;
	}

	var realdmg = dmg;
	if (realdmg > tou.actualHP) realdmg = tou.actualHP;
	healUser(to, -dmg);
	addUserToPot(from, to, realdmg);
	if (nokill && tou.actualHP <= 1) tou.actualHP = 1;
	var bar = hpBar(tou.actualHP, getStatsFor(to, 'baseHP'));
	msg += ' '+toname+' recibe '+shortm(dmg)+' puntos de daño. '+bar;

	return msg;
	var m = killUser(from, to, channel);
	if (m) {
		bot.say(channel, m);
		return;
	}
}
function attack(from, to, channel, nokill, nocounter) {
    var messagez = [];
	var fromname = from;
	var toname = to;
	if (from == '$GOD') fromname = 'Dios';

	var events = '';

	checkStatsForUser(from);
	checkStatsForUser(to);

	var fromu = database.users[from];
	var tou = database.users[to];

	var s1 = tickStatus(fromu, from);
	var s2 = tickStatus(tou, to);

	var s = [];
	if (s1) {
		s.push(s1);
	}
	if (s2) {
		s.push(s2);
	}

    if (s.length > 0) {
        messagez.push(s.join(', '));
    }
	if (s.length > 0 && channel) {
        bot.say(channel, s.join(', '));
    }

	if (fromu.name) fromname = fromu.name;
	if (tou.name) toname = tou.name;

	var spd1 = getStatsFor(from, 'baseSPD');
	var spd2 = getStatsFor(to, 'baseSPD');
	var maxspd = spd1 + spd2;
	var chances = getChances(from, to, fromu, tou);
	var dodgeChance = (Math.random() < chances.hitChance) ? 1 : 0;
	var critChance = (Math.random() < chances.critChance) ? 1 : 0;

	//Start attack
	var msg = physicalAttack(from, to, nokill);
	var mzg = msg;

	var m = killUser(from, to, channel);
	if (m) {
		mzg += ' '+m;
		if (channel) bot.say(channel, mzg);
        messagez.push(mzg);
		return events;
	}
	if (channel) bot.say(channel, mzg);
    messagez.push(mzg);
	//End attack

	//Start counter
	if (!nocounter) counterStrike(from, to, channel);
	//End counter

    return messagez;
}
function getPotTotal(pot) {
	var total = 0;
	for (var p in pot) {
		var pp = pot[p];
		if (!pp.damage) pp.damage = 0;
		total += pp.damage;
	}
	return total;
}
function killUser(killer, victim, channel) {
	var killerUser = database.users[killer];
	var victimUser = database.users[victim];
	if (!killerUser || !victimUser) return;
	var vname = (victimUser.name) ? victimUser.name : victim;

	if (!victimUser.newKilledBy && killer != '$default_boss') addUserToPot(killer, victim, 1);

	if (killerUser.actualHP <= 0) return;
	if (victimUser.actualHP <= 0) {
		victimUser.actualHP = 0;
		activateDeathTimer(victim);

		victimUser.status = {
		'type': null,
		'bad': false,
		'turns': 0,
		'strength': 0,
		}

		var mzg = vname+' ha muerto. ';
		var npot = victimUser.newKilledBy;
		var tot = getPotTotal(npot);

		for (var np in npot) {
			var pn = npot[np];
			var percent = Math.floor((pn.damage / tot) * 100);
            percent /= 100;
			var k = pn.nick;

			var e = Math.ceil(getExpFor(k, victim) * percent);
			database.users[k].experience += e;

			var pointgain = victimUser.level;
			killerUser.points += pointgain;

			mzg += k+' gana '+shortm(e)+' puntos de experiencia y '+pointgain+' puntos ('+(percent * 100).toFixed(3)+'%). '+levelUp(k)+' ';
		}
		victimUser.newKilledBy = [];
		return mzg;
	}
}
bot.addListener('join', function(from, to, text, message) {
	checkStatsForUser(to);
});
function activateDeathTimer(guy) {
	if (guy == '$default_boss') {
		return '';
	}
	var user = database.users[guy];
	if (!user) return;
	if (user.actualHP > 0) {
		user.deathTimer = 0;
		return '';
	}
	var actualTime = new Date();
	actualTime = actualTime.getTime();
	if (user.deathTimer <= actualTime && user.deathTimer > 0) {
		healUser(guy, Infinity);
		healUser(guy, Infinity, true);
		user.deathTimer = 0;
		return '';
	}
	if (user.deathTimer) {
		setTimeout(function() {
			activateDeathTimer(guy);
		}, timeLeftTo(user.deathTimer, 1));
		return timeLeftTo(user.deathTimer);
	}
	var add = getStatsFor(guy, 'baseHP') * DEATH_TIMER_MOD;
	var tosecs = add * 1000;
	user.deathTimer = (actualTime + tosecs);
	setTimeout(function() {
			activateDeathTimer(guy);
	}, timeLeftTo(user.deathTimer, 1));
	return timeLeftTo(user.deathTimer);
}
function timeLeftTo(time, raw) {
	var atime = new Date();
	atime = atime.getTime();
	var s = time - atime;
	if (raw) return s;
	var t = '';
	s = Math.ceil(s / 1000);
	var m = 0;
	while (s >= 60) {
		s -= 60;
		m++;
	}
	var h = 0;
	while (m >= 60) {
		m -= 60;
		h++;
	}
	var d = 0;
	while (h >= 24) {
		h -= 24;
		d++;
	}
	var w = 0;
	while (d >= 7) {
		d -= 7;
		w++;
	}
	var tlt = s+'s';
	if (m > 0) tlt = m+'m '+tlt;
	if (h > 0) tlt = h+'h '+tlt;
	if (d > 0) tlt = d+'d '+tlt;
	if (w > 0) tlt = w+'semana'+((w == 1) ? '' : 's')+' '+tlt;
	return tlt;
}
function getUserData(user) {
	checkStatsForUser(user);
	var f = user;
	var u = database.users[user];
	if (!u.baseMP) {
		u.actualMP = getStatsFor(f, 'baseMP');
	}

	if (!u.expMod) u.expMod = 1;
	if (!u.lastLevel) u.lastLevel = 1;

	var mzg = '';
	var naem = f;
	if (u.name) naem = u.name;
	var ded = activateDeathTimer(user);
	if (ded) ded = '(Muerto: '+ded+')';
	var expex = (1 + (u.expMod / 100)).toFixed(2);
	if (!ded) ded = '';
	var statLeft = totalSpentPoints(u, true) - totalSpentPoints(u);
	mzg += naem+' ['+color.orange+getClass(u)+' de '+getAlignment(u)+color.r+'] '+color.red+ded+color.r+tickStatus(u, user, true)+' nivel'+color.blue+' '+u.level+color.r+' ('+hpBar(u.experience, expForNextLevel(u.level), 7)+' EXP [x'+expex+']) '+i_+' ['+u.statPoints+' '+color.gray+'('+statLeft+')'+color.r+' puntos habilidad] '+i_+' '+hpBar(u.actualHP, getStatsFor(f, 'baseHP'))+'/VIDA '+i_+' '+hpBar(u.actualMP, getStatsFor(f, 'baseMP'), 6)+'/MAGIA '+i_+' '+shortm(getStatsFord(f, 'baseATK'))+'/ATQ '+i_+' '+shortm(getStatsFord(f, 'baseDEF'))+'/DEF '+i_+' '+shortm(getStatsFord(f, 'baseSPD'))+'/VEL';
	return mzg;
}
function getClass(user) {
	var c = user.battleClass;
	return classes[c].name;
}
function getRandomUserData(peek) {
	var ulist = [];
	for (var grud in database.users) {
		ulist.push(grud);
	}
	var r = read(ulist);
	checkStatsForUser(r);
	if (peek) return ulist.length;
	return getUserData(r);
}
function tickAllUsers() {
	for (var tau in database.users) {
		var u = database.users[tau];
		if (!u.commandNext) u.commandNext = 0;
		if (!u.commandHeat) u.commandHeat = 0;
		if (u.commandHeat > 0) u.commandHeat -= 0.33;
		if (u.commandHeat <= 0) u.commandHeat = 0;
	}
}
function isUserOnline(nick) {
	if (userWhoises[nick]) return true;
	var i = knownUsers.indexOf(nick);
	if (i < 0) return false;
	return true;
}
bot.addListener('names', function(channel, nicks) {
	var delay = 1000;
	for (var n in nicks) {
		knownUsers.push(n);
		setTimeout(function() {addUserToHostDatabase(n)}, delay);
		delay += 1000;
	}
});
function displayNumbers() {
	guessedNumbers.sort(sortNumber);
	var lh = lowerAndHigher(guessedNumbers, guessNumber, guessNumberMax);

	return lh.lower+' < ??? > '+lh.higher;
}
function sortNumber(a,b) {
    return a - b;
}
function sortUsersByExp(whereAmI) {
	var userArr = [];
	for (var sue in database.users) {
		var u = database.users[sue];
		if (u.boss || sue == '$GOD') continue;
		if (u.level > 1 || u.experience > 0 && u.boss != true) {
			if (!u.name) u.name = sue;
			userArr.push(u);
		}
	}
	userArr.sort(sortByExp);
	if (whereAmI) {
		for (var sue in userArr) if (userArr[sue].name == whereAmI) return (Number(sue) + 1);
        return userArr.length;
	}
	return userArr;
}
function sortByExp(a, b) {
	var av = (a.experience / expForNextLevel(a.level)) + a.level;
	var bv = (b.experience / expForNextLevel(b.level)) + b.level;
	return bv - av;
}
function resetGuessNumber() {
	guessNumber = '';
	guessNumberPoints = 0;
}
function lowerAndHigher(array, center, maxx) {
	var ix = array.indexOf(center);
	var lower = (ix <= 0) ? 0 : array[ix - 1];
	var higher = (ix >= (array.length - 1)) ? (parseInt(maxx) + 1) : array[ix + 1];
	return {
		'lower': lower,
		'higher': higher,
		'array': array,
		'center': center,
		'max': maxx,
		'index': ix,
	}
}
function searchUserHost(nick) {
	var lll = '';
	var ll = [];
	var unames = [];
	for (var uh in database.hosts) {
		var h = database.hosts[uh];
		var i = h.indexOf(nick);
		if (i >= 0) ll.push(uh);
	}
	for (var uh in ll) {
		var h = database.hosts[ll[uh]];
		for (var uhh in h) {
			var nck = h[uhh];
			var ix = unames.indexOf(nck);
			if (ix < 0) unames.push(h[uhh]);
		}
	}
	if (unames.length <= 0) return 'No conozco a ese usuario.';
	for (var uh in unames) {
		if (unames[uh] == nick) unames.splice(uh, 1);
	}
	if (unames.length <= 0) return 'Sólo conozco a '+nick+' por ese nick.';
	return '"'+nick+'" también es conocido como '+unames.join(', ');
}
function help(question) {
	var helpTopics = {
		'help': '(help) Muestra este mensaje de ayuda.',
		'puntos': '(puntos [nick]) Muestra los puntos que tiene un usuario, puedes cambiarlos todos por puntos de habilidad (aumenta puntos). Los puntos se ganan con el tiempo o jugando a mis juegos (coc, numero)',
		'quien': '(quien es [nick]) Muestra otros nicks que un usuario haya podido tener.',
		'jefe': '(jefe) Invoca un jefe para poder luchar contra el. Si ya hay un jefe invocado, muestra sus datos.',
		'atacar': '(atacar [nick]) Ataca al jefe que hay invocado. Puedes atacar a otro usuario escribiendo atacar seguido de su nick. Tras cada ataque, habrá un contraataque por parte del adversario, a no ser que haya muerto.',
		'datos': '(datos [nick]) Muestra tu nivel, experiencia, vida, ataque, defensa y velocidad. Puedes ver los datos de otra persona especificando su nick (datos Lilim)',
		'cura': '(cura [todo|magia|vida] [nick]) A cambio de unos cuantos puntos, restaura la vida, la magia o ambos. Si lo deseas puedes escribir el nick de un usuario para curarle a él.',
		'aumenta': '(aumenta [puntos|vida|ataque|defensa|velocidad|magia] [numero]) Puedes aumentar tus características (vida, ataque, defensa, velocidad) a cambio de un punto de habilidad. Si no tienes puntos de habilidad puedes conseguirlos escribiendo (aumenta puntos). Es posible aumentar las características más de una vez, gastando más puntos de habilidad, por ejemplo (aumenta defensa 6)',
		'numero': '(numero [100 o más]) Juega a adivinar el número. El mínimo es 100. Por cada vez que lo intentes, los puntos que ganarás al acertar disminuirán, así que adivínalo rápido.',
		'coc': '(coc [apuesta]) Juega al juego Cara o Cruz. Apuesta un número de puntos y si sale cara, ganarás el doble. Si sale cruz perderás lo apostado.',
		'dile': '(dile a [nick] [mensaje]) Deja un mensaje en el buzón de ese nick. La próxima vez que se conecte, lo recibirá al entrar al canal.',
		'guess': '(guess) Juega a adivinar el pokémon. Te daré una pista cada vez que lo intentes, pero cuidado, si lo intentas muchas veces no ganarás tantos puntos.',
		'top10': '(top10) Muestra los 10 jugadores con mayor nivel, y tu puesto en la clasificación.',
		'dar': '(dar puntos [nick] [cantidad]) Le da puntos a otro usuario. Para poder utilizar este comando, el usuario que reciba los puntos debe tener más de 0 experiencia.',
		'renacer': '(renacer) Regresa al nivel 1 a cambio de algunos puntos de habilidad. Puedes escribir renacer? para saber cuantos puntos de habilidad ganarías al volver al nivel 1.',
		'aprender': '(aprender [magia]) Aprende una magia a cambio de un punto de habilidad. Escribe "aprender" para ver la lista de magias.',
		'equipo': '(equipo [nick]) Muestra el equipo de un jugador en concreto.',
		'crea': '(crea [arma/escudo/cabeza/cuerpo/botas] [nombre]) Crea una pieza de equipo aleatoria basada en tu nivel. Puedes comprarla más adelante escribiendo compra.',
		'compra': '(compra) Compra la pieza de equipo que has encargado mediante el comando "crea". Si ya tenías una pieza de equipo equipada, será vendida por 1/4 de su precio de compra.',
		'magia': '(magia [nombre] [objetivo]) Lanza un conjuro mágico a cambio de puntos de MAGIA. Si no especificas el objetivo, se seleccionará al jefe. Para una lista de magias, escribe "aprender"',
		'especial': '(especial [objetivo]) Realiza un ataque especial hacia el objetivo. Cada clase tiene un movimiento especial, para más información sobre el tuyo, escribe "magia".',
	}
	if (!question) {
		var top = [];
		for (var e in helpTopics) top.push(e);
		return 'Para más detalles sobre uno de mis comandos escribe (help [nombre del comando]). Mis comandos son: ('+top.join('|')+')';
	}
	var h = helpTopics[question];
	if (!h) return 'No tengo ningun comando por el nombre de '+question+'. Escribe help para ver mis comandos.';
	return h;
}
function resetUser(nick, peek) {
	var user = database.users[nick];

	if (!user.expMod) user.expMod = 1;
	if (!user.lastLevel) user.lastLevel = 1;

	var lastLevel = user.level;

	var levelMod = 0;
	if (user.level > user.lastLevel) levelMod = (user.level - user.lastLevel) * 0.86;
    console.log('level mod: '+levelMod+' user expmod '+user.expMod+' last level: '+user.lastLevel);

	var newExpMod = user.expMod + levelMod;

	var expex = ' y tu experiencia se multiplicará por '+(1 + (newExpMod / 100)).toFixed(3);
	if (user.lastLevel > user.level) {
		expex = '. Hasta que no superes el nivel '+user.lastLevel+' no aumentará tu multiplicador de experiencia. (EXP x'+(1 + (newExpMod / 100)).toFixed(3)+')';
	}

	var totalBase = totalUserBases(user);
	var sp = (totalBase - (REBIRTH_PENALTY_PER_STAT * 4)) / STAT_INCREASE_PER_SKILL_POINT;
	sp += user.statPoints;
	sp *= REBIRTH_PENALTY;
	sp = Math.ceil(sp) + 1;
	if (sp < 3) sp = 3;
	if (peek) return 'Si vuelves al nivel 1 recuperarás '+sp+' puntos de habilidad'+expex+'.';
	if (!user.resetReady) {
		user.resetReady = true;
		return 'Realmente quieres volver al nivel 1? Recuperarás '+sp+' puntos de habilidad'+expex+'.';
	}
	database.users[nick] = generateUser();
	database.users[nick].expMod = newExpMod;
	database.users[nick].lastLevel = lastLevel;


	healUser(nick, Infinity);
	user = database.users[nick];
	user.statPoints += sp;
	return 'Has vuelto al nivel 1. Tienes '+user.statPoints+' puntos de habilidad. (EXP x'+newExpMod+')';
}
function totalUserBases(user, finalStatMode, weaponMode) {
	if (!user) return 0;
	var skillv = 0;
	for (var t in user.skills) {
		if (user.skills[t] > 0) skillv += (user.skills[t] * STAT_INCREASE_PER_SKILL_POINT);
	}
	var v = user.baseHP + user.baseMP + user.baseATK + user.baseDEF + user.baseSPD + skillv;
	if (!weaponMode) v -= 1000;
	if (v < 0) v = 0;
	if (finalStatMode) {
		v = getStatsFor(user, 'baseHP', true) + getStatsFor(user, 'baseMP', true) + getStatsFor(user, 'baseATK', true) + getStatsFor(user, 'baseDEF', true) + getStatsFor(user, 'baseSPD', true);
	}

	return v;
}
function totalSpentPoints(userObject, peek) {
	var bases = totalUserBases(userObject);
	var v = Math.ceil(bases / STAT_INCREASE_PER_SKILL_POINT);
	if (peek) {
		var p = userObject.level * MAX_STAT_POINTS_PER_LEVEL;
		return p;
	}
	return v;
}
function shortm(number) {
	var shortType = '';
	if (number > 1000) {
		number /= 1000;
		shortType = 'k';
	}
	if (number > 1000) {
		number /= 1000;
		shortType = 'm';
	}
	if (number > 1000) {
		number /= 1000;
		shortType = 'km';
	}
	if (number > 1000) {
		number /= 1000;
		shortType = 'b';
	}
	if (number > 1000) {
		number /= 1000;
		shortType = 'kb';
	}
	if (number > 1000) {
		number /= 1000;
		shortType = 't';
	}
	if (number > 1000) {
		number /= 1000;
		shortType = 'kt';
	}
	var n = Math.floor(number * 100) / 100;
	return n+''+shortType;
}
function hpBar(min, max, customColor) {
	if (min < 0) min = 0;
	if (max < 1) max = 1;
	var minn = min;
	var maxn = max;
	var p = min / max;
	var b = '\x031,1.';

	var min = Math.ceil(p * 20);
	if (min > 20) min = 20;
	if (min <= 20) b += '\x039,9';
	if (min <= 10) b += '\x038,8';
	if (min <= 5) b += '\x034,4';
	if (customColor) b += '\x03'+customColor+','+customColor;
	for (var x = 0; x < min; x++) b += '.';

	var max = 20 - min;
	b += '\x0315,15';
	for (var x = 0; x < max; x++) b += '.';

	b += '\x031,1.\x0f';
	return b+'('+shortm(minn)+'/'+shortm(maxn)+')';
}
function latestChanges() {
	var clog = changelog.reverse();
	var lc = [];
	for (var x = 0; x < 5; x++) {
		lc.push(clog[x]);
	}
	return lc.join(' | ');
}
function isUserInitialized(nick) {
	var u = database.users[nick];
	if (!u) return false;
	if (u.level > 1 || u.experience > 0) return true;
}
function top10(peekFrom) {

}
function searchName(name, object) {
	var bm = 0;
	var bmv = 0;
	var objs = [];
	for (var e in object) {
		objs.push(e);
		var s = object[e];
		var c = compare(name, s.name);
		if (c > bmv) {
			bm = e
			bmv = c;
		}
	}
	if (name == '$') return read(objs);
	return bm;
}
function searchMagic(name) {
	var bm = 0;
	var bmv = 0;
	var objs = [];
	for (var e in skills) {
		objs.push(e);
		var s = skills[e];
		var c = compare(name, s.name);
		if (c > bmv) {
			bm = e
			bmv = c;
		}
	}
	if (name == '$') return read(objs);
	return bm;
}
function cureStatus(who, toObj) {
	if (toObj.status.bad) {
		toObj.status.type = null;
		toObj.status.bad = false;
		toObj.status.turns = 0;
		toObj.status.strength = 0;
		return i_+who+' pierde todos sus estados perjudiciales.';
	}
	return '';
}
function tickStatus(who, name, peek) {
	var ts = '';
	if (!who) return;
	if (!who.status) {
		who.status = {
			'type': null,
			'turns': 0,
			'bad': false,
		}
	}
	var realName = name;
	var name = (who.name) ? who.name : name;
	var turns = who.status.turns;
	if (turns) {
		var st = {
			'fire': 'quemado',
			'poison': 'envenenado',
			'blind': 'cegado',
			'shock': 'paralizado',
			'freeze': 'congelado',
			'crit': 'hiperactivo',
			'rush': 'hiperactivo',
			'rush2': 'concentrado',
			'protect': 'protegido',
		}
		if (peek) {
			if (who.status.turns) return '('+color.lime+st[who.status.type]+' '+who.status.turns+'t'+color.r+')';
			if (who.status.turns <= 0 || !who.status.turns) return '';
		}
		who.status.turns--;
		if (who.status.type == 'fire' || who.status.type == 'poison') {
			var d = getStatsFor(who, 'baseHP', true);
			d = Math.ceil(d * 0.15);
            var reald = d;
            if (who.actualHP < reald) reald = who.actualHP;
			who.actualHP -= d;
			if (who.actualHP < 1) who.actualHP = 1;
			ts += name+' recibe '+shortm(d)+' daño a causa de';
			if (who.status.type == 'fire') ts += ' la quemadura.';
			if (who.status.type == 'poison') ts += 'l veneno.';
			if (who.status.inflictedBy) addUserToPot(who.status.inflictedBy, realName, reald);
		}
		if (who.status.type == 'protect') {
			var d = getStatsFor(who, 'baseHP', true);
			d = Math.ceil(d * 0.1);
			healUser(realName, d);
			ts += name+' recupera '+shortm(d)+' vida.';
		}
		if (who.status.turns > 0) {
			if (who.status.type == 'blind') ts = name+' sigue cegado.';
			if (who.status.type == 'shock') ts = name+' sigue paralizado.';
			if (who.status.type == 'freeze') ts = name+' sigue congelado.';
		}
		if (who.status.turns <= 0) {
			ts += ' '+name+' deja de estar '+st[who.status.type];
		}
		
	}
	if (turns < 1) {
		who.status = {
			'type': null,
			'bad': false,
			'turns': 0,
			'strength': 0,
		}
	}
	return ts;
}
function randomSkill(guy) {
	var u = database.users[guy];
	if (!u) return;
	var sk = u.skills;
	var names = [];
	for (var z in sk) {
		if (sk[z] > 0) names.push(skills[z].name);
	}
	return read(names);
}
function counterStrike(from, to, channel) {
	if (!to) to = '$default_boss';
	var fromObj = database.users[from];
	var toObj = database.users[to];
	if (!fromObj || !toObj) return;
	//Check for magic attack
	var rskill = randomSkill(to);
	var magicTest = magicAttack(to, from, rskill, true);
	if (rskill && magicTest) {
		var skillTarget = magicTest.target;
		var sender = to;
		var receiver = from;
		if (skillTarget == 'self') receiver = to;
		var msg = magicAttack(sender, receiver, rskill);
		if (channel) bot.say(channel, msg);
	}
	else {
		var msg = physicalAttack(to, from);
		if (channel) bot.say(channel, msg);
	}

	var m = killUser(to, from, channel);
	if (m) {
		if (channel) bot.say(channel, m);
		return;
	}
}
function magicAttack(sender, receiver, magic, peek, classSpecial) {
	var m = '';
	var extra = '';
	if (!classSpecial) {
		var id = searchMagic(magic);
		var sk = skills[id];
	}
	if (classSpecial) {
		var uz = database.users[sender];
		var classID = uz.battleClass;
		var sk = classSkills[classID];
	}
	if (!id) id = 0;


	if (!receiver) {
		if (sk.target == 'self') receiver = sender;
		if (sk.target == 'enemy') receiver = '$default_boss';
	}

	if (sender == receiver && sk.target == 'enemy') {
		return 'No puedes usar esa magia hacia ti mismo.';
	}

	var fromObj = database.users[sender];
	var toObj = database.users[receiver];

	var senderName = (fromObj.name) ? fromObj.name : sender;
	var receiverName = (toObj.name) ? toObj.name : receiver;

	if (!fromObj.skills && !classSpecial) fromObj.skills = [];
	if (!fromObj.skills[id] && !classSpecial) fromObj.skills[id] = 0;

	if (!magic) {
		if (peek) return false;
		var m = '';
		for (var e in fromObj.skills) {
			var s = fromObj.skills[e];
			if (s > 0) {
				if (!m) m = 'Magias aprendidas: ';
				var cost = skills[e].cost * s;
				m += skills[e].name+color.blue+'(lv' + s +' '+shortm(cost)+' MAGIA)'+ color.r + ''+i_;
			}
		}
		var esp = fromObj.battleClass;
		esp = classSkills[esp];
		m += '[Especial:'+color.red+' '+esp.name+color.r+'] '+esp.desc;
		if (!m) m = 'No has aprendido ninguna magia. Escribe '+color.blue+'aprender'+color.r+' para aprender alguna.';
		return m;
	}

    if (toObj == undefined) return 'El usuario no exise.';

    if (fromObj.actualHP <= 0) {
        return 'No puedes lanzar magia si estás muerto.';
    }
    if (toObj.actualHP <= 0 && sk.target == 'enemy') {
        return 'No puedes lanzar magia a un muerto.';
    }

    if (!fromObj || !toObj) {
        return 'No puedes usar magia contra ese usuario, intentalo de nuevo más tarde.';
    }

	if (!classSpecial) var skillLevel = fromObj.skills[id];
	if (classSpecial) var skillLevel = 1;
	var maxTurns = Math.ceil(skillLevel / 10);
	if (skillLevel > 0) {
		//Start magic attack
		var cost = skillLevel * sk.cost;
		var specialMod = (classSpecial) ? 1 : 10;
		var damageMod = (skillLevel / specialMod) * sk.damage;
		var pierce = false;
		var attackIsMagic = (sk.effect == 'physical' || sk.effect == 'addhp' || sk.effect == 'allcrit') ? false : true;
		if (damageMod < 0) pierce = true;
		var addmp = (sk.effect == 'addmp') ? Math.floor(fromObj.actualMP / 10) : 0;
		var addhp = (sk.effect == 'addhp') ? Math.floor(fromObj.actualHP / 10) : 0;
		var damage = Math.floor(damageFormula(sender, receiver, attackIsMagic, pierce) * damageMod + sk.damage + addmp + addhp);

		if (damage > 0 && toObj.actualHP <= 0) {
			if (peek) return false;
			return 'No puedes atacar a alguien muerto.';
		}
		if (damage < 0 && toObj.actualHP >= getStatsFor(toObj, 'baseHP', true)) {
			if (peek) return false;
			return 'No puedes curar a alguien que ya está al máximo de vida.';
		}


		var hit = sk.hit;
		if (fromObj.status.type == 'blind') hit *= 0.5;

		var r = false;
		if (Math.random() < hit) r = true;

		if (fromObj.actualMP >= cost) {
			if (peek) return sk;
			var s1 = tickStatus(fromObj, sender);
			var s2 = tickStatus(toObj, receiver);

			var s = [];
			if (s1) s.push(s1);
			if (s2) s.push(s2);

			if (s.length > 0) extra = s.join(', ')+' ';

			healUser(sender, -cost, true);

			var m = senderName+sk.msg+receiverName;
			if (!r) return extra+m+' y falla.';

			if (sk.effect == 'steal') {
				var stealSelect = read(['points', 'statPoints', 'experience', 'actualMP', 'actualHP']);
				if (toObj[stealSelect] > 0) {
					var steal = Math.floor(toObj[stealSelect]);
					steal = rand(0, steal);
					if (steal) {
						toObj[stealSelect] -= steal;
						fromObj[stealSelect] += steal;
						var stealex = {
							'points': 'puntos',
							'statPoints': 'puntos de habilidad',
							'experience': 'experiencia',
							'actualMP': 'MAGIA',
							'actualHP': 'VIDA',
						}[stealSelect];
						var bars = hpBar(toObj.actualHP, getStatsFor(toObj, 'baseHP', true))+' VIDA '+i_+hpBar(toObj.actualHP, getStatsFor(toObj, 'baseMP', true), 6)+' MAGIA ';
						return senderName+sk.msg+receiverName+'. '+senderName+' consigue robarle '+shortm(steal)+' '+stealex+'. '+bars+''+levelUp(sender);
					}
				}
				return senderName+sk.msg+receiverName+'. '+senderName+' se disculpa por las molestias.';
			}
			if (sk.effect == 'healmp') {
				var hp = Math.ceil(fromObj.actualHP / 2);
				var mp = Math.floor(getStatsFor(toObj, 'baseMP', true) / 4);
				if (fromObj.actualHP <= 1) return 'No puedes utilizar esta habilidad hasta que recuperes un poco de vida.';
				if (fromObj.baseHP > 0) fromObj.baseHP--;
				healUser(sender, -hp);
				healUser(receiver, mp, true);
				return senderName+' pierde '+shortm(hp)+' VIDA. '+senderName+sk.msg+receiverName+', recuperando '+shortm(mp)+' MAGIA';
			}

			var mpdrain = (sk.effect == 'mpdrain') ? true : false;
			var mpex = (mpdrain) ? ' a la MAGIA' : '';
			var mpex2 = (mpdrain) ? 'puntos de MAGIA' : 'puntos de VIDA';

            var realdmg = damage;
            if (toObj.actualHP < realdmg) realdmg = toObj.actualHP;

			healUser(receiver, -damage, mpdrain);
			if (sk.effect == 'allcrit') {
				var fromSPD = getStatsFor(fromObj, 'baseSPD', true);
				var toSPD = getStatsFor(toObj, 'baseSPD', true);
				if (fromSPD > toSPD) {
					if (rand(1,5) == 1) healUser(receiver, -Infinity);
				}
			}
			if (damage > 0) addUserToPot(sender, receiver, realdmg);

			var stealhpex = '';
			if (sk.effect == 'stealhp') {
				var heal = Math.ceil(damage / 10) + 1;
				healUser(sender, heal);
				var stealhpex = sender+' recupera '+shortm(heal)+' VIDA';
			}

			if (damage > 0) m += ' causando'+color.blue+' '+shortm(damage)+' puntos de daño'+mpex+'. ';
			if (damage < 0) m += ' recuperando'+color.blue+' '+shortm(Math.abs(damage))+' '+mpex2+'. ';
			if (!mpdrain) m += hpBar(toObj.actualHP, getStatsFor(receiver, 'baseHP'))+' VIDA '+i_+stealhpex;
			if (mpdrain) m += hpBar(toObj.actualMP, getStatsFor(receiver, 'baseMP'), 6)+' MAGIA '+i_+stealhpex;

			var st = userStatus(receiver);
			if (sk.effect == 'heal') {
				m += cureStatus(receiver, toObj);
			}

			var enterStatusMessage = {
				'blind': 'queda cegado.',
				'shock': 'está paralizado.',
				'freeze': 'se ha congelado.',
				'fire': 'se ha quemado.',
				'poison': 'ha sido envenenado.',
				'crit': 'se siente poderoso.',
				'rush': 'se siente concentrado',
				'rush2': 'se siente concentrado',
				'protect': 'se siente invencible.',
			}

			if (sk.effect != 'heal' && !toObj.status.type && sk.effect && sk.effect != 'addmp' && sk.effect != 'addhp' && sk.effect != 'mpdrain' && sk.effect != 'steal' && sk.effect != 'stealhp' && sk.effect != 'healmp' && sk.effect != 'allcrit') {
				toObj.status.type = sk.effect;
				if (sk.effect == 'physical') toObj.status.type = 'shock';
				toObj.status.turns = rand(0, maxTurns);
				if (toObj.status.turns < 2) toObj.status.turns = 2;
				toObj.status.bad = true;
				toObj.status.strength = skillLevel;
				toObj.status.inflictedBy = sender;
				if (sk.effect == 'crit' || sk.effect == 'protect' || sk.effect == 'rush' || sk.effect == 'rush2') toObj.status.bad = false;

				m += i_+receiverName+' '+enterStatusMessage[toObj.status.type];
			}
			return extra+m;
		}
		else {
			if (peek) return false;
			return 'Necesitas'+color.red+' '+cost+color.r+' MAGIA para lanzar'+color.blue+' '+sk.name;
		}
	}
	else {
		if (peek) return false;
		return 'No has aprendido esa magia. Escribe '+color.blue+'aprender '+sk.name+color.r+' para aprenderla.';
	}
}
function classInfo(classID) {
	var c = classes[classID];
	return c.name+' (+'+statNames[c.primary]+' | +'+statNames[c.secondary]+' | -'+statNames[c.weak]+')';
}
function getAllClassesByName() {
	var g =[];
	for (var a in classes) if (a > 0) g.push(classes[a].name);
	return g.join(', ');
}
function changeClass(username, className) {
	var search = searchName(className, classes);
	console.log('changeClass search result: '+search);
	if (!className || !search || search == 0) return 'Estas son todas las clases disponibles: '+getAllClassesByName()+'. Escribe '+color.blue+'clase'+color.r+' seguido del nombre de la clase deseada para cambiarla.';
	
	var u = database.users[username];
	if (u.battleClass == search) {
		return 'Tu clase actual es '+classInfo(u.battleClass);
	}
	else {
		u.battleClass = search;
		return 'Tu clase ha sido cambiada a '+classInfo(search);
	}
}
function displayItem(item, noPrice) {
	var stats = [];
	for (var di in statNamesObj) {
		var stat = statNamesObj[di];
		var base = stat.baseName;

		if (item[base] != 0) stats.push(item[base]+'/'+stat.name);
	}
	//return JSON.stringify(item);
	var p = '('+getPriceForItem(item)+'ph)';
	if (noPrice) p = ''
	return color.blue+''+item.name+''+color.gray+' '+p+' '+color.r+stats.join(' ');
}
function displayEquipment(userObject) {
	if (!userObject.equipment) userObject.equipment = new Equipment();
	var equip = userObject.equipment;
	var de = '';
	var index = 0;
	for (var x in equip) {
		de += '('+equipmentSlots[index].name+') '+displayItem(equip[x], true)+i_;
		index++;
	}
	return de;
}
function compareUsers(from, to) {
	var valueFrom = totalUserBases(from, true);
	var valueTo = totalUserBases(to, true);
	var value = (valueFrom / valueTo) * 100;

	return value.toFixed(3);
}
bot.addListener('message', function(from, to, text, message) {
    if (to == 'Lilim') console.log('<'+from+'> '+text);
	activateDeathTimer(from);
	var target = to;
	var sender = from;
	if (to == bot.nick) target = from;

	messageDelivery(from, target);
	checkStatsForUser(from);
	addUserToHostDatabase(from);
	var splitText = text.split(' ');
	splitText[0] = splitText[0].toLowerCase();

	if (!rand(0,17)) database.users[from].points += 1;
	healUser(from, 1, true);
	database.users[from].points = Math.ceil(database.users[from].points);

	var obj = {'from': from, 'to': to, 'text': text};
	io.emit('newMessage', obj);
	if (from == to) return;

		var tlc = text.toLowerCase();
	var lcnick = config.botName.toLowerCase();
	if ((tlc.match('vete') || tlc.match('fuera') || tlc.match('largo') || tlc.match('pokeball') || tlc.match('pokéball')) && tlc.match(lcnick)) {
		//bot.part(to, 'A sus ordenes, '+from);
		bot.say(to, 'Vete tu, payaso.');
		return;
	}
	if (tlc.match('allahu') && tlc.match('akbar') && from == 'Satanja') {
		bot.action(target, 'explota');

		setTimeout(function() {
			bot.disconnect('ALA ES GRANDE CERDOS CAPITALISTAS');
		}, 1000);
	}

	if (to == bot.nick || to == config.botName) {
	}
	else {
		if (splitText[0].match(bot.nick.toLowerCase()) || splitText[0].match(lcnick)) {
		}
		else {
			return;
		}
	}
	//Whois user
	whois(from);
	if (!me.channels) bot.whois(bot.nick, function(w) {
		me = w;
	});
	if (to == config.botName || tlc.match(bot.nick.toLowerCase()) || tlc.match(config.botName.toLowerCase())) {
		var toChan = false;
		var nuText = cleanMessage(text);
		if (tlc.match(bot.nick.toLowerCase()) || tlc.match(config.botName.toLowerCase())) {
			toChan = to;
		}

		if (memory[from]) {
			var i = memory[from];
			var index = i.index;

			addAnswer(index, nuText);

			if (!database.answers[index]) database.answers[index] = [];
			database.answers[index].push(cleanMessage(nuText));
		}
		addPhraseToDatabase(cleanMessage(nuText));
		addPhraseToDatabase(morph(cleanMessage(nuText)));

		var toSay = getAnswer(cleanMessage(nuText));
		var timeToSay = (toSay.length / rand(200, 400)) * 60;
		timeToSay *= 1000;

        timeToSay = 1;
		setTimeout(function() {
			aiSay(from, toSay, toChan, sender);
		}, timeToSay);
	}
});
function spawnBoss(from) {
	database.users['$default_boss'] = generateUser(from, 1);
	healUser('$default_boss', Infinity);
}
function Square(fixed) {
    this.type = (fixed) ? fixed : read([
    'treasure', 'field', 'inn', 'shop',
    'teleport', 'back', 'forward',
    'slow', 'haste', 'fee', 'win', 
    'key', 'magicDrain', 'backToStart', 'random',
    'increaseStat', 'decreaseStat', 'poison',
    'monster',
    ]);

    this.tier = 0;
    this.used = false;
    this.fieldType = '';
    this.fieldPrize = 'none';

    if (this.type == 'treasure') {
        //Treasure Square will generate an item based on its tier.
        /*
        Tier 1 - Your level
        Tier 2 - Your level x1.2
        Tier 3 - Your level x1.3
        Tier 5 - Your level x1.5 - Needs a key in order to get the item.
        */
        this.tier = rand(1,3);
        if (rand(0,1)) this.tier = 5;
    }
    if (this.type == 'field') {
        this.fieldType = read([
            'plains', 'forest', 'mountain',
        ]);
        this.fieldPrize = read([
            'item', 'gold', 'monster'
        ]);
    }


}
function newMap() {
    console.log('generatin a new map');
    var map = [];
    var pending = ['sprite_tower', 'sprite_hospital', 'sprite_shop', 'sprite_townhall', 'sprite_house', 'sprite_hotel', 'sprite_coliseum', 'sprite_mine', 'sprite_forest']
    for (var h = 0; h < 10; h++) {
        map[h] = [];
        for (var w = 0; w < 10; w++) {
            var r = 'sprite_none';
            if (!rand(0,1)) {
                var r = read(pending);
                pending.splice(pending.indexOf(r), 1);
            }
            map[h][w] = {
                'tile': r,
            }
        }
    }
    return map;
}
function newBoardGame(length) {
    var bg = [];
    for (var l = 0; l < length; l++) bg.push(new Square());
    bg[0] = new Square('start');
    bg.push(new Square('boss'));
    return bg;
}
function throwDice() {
    return rand(1, 6);
}
function advance(player, squares) {oardGame
    if (!player.square) player.square = 0;
    player.square += squares;
}
function getStatStars(user) {
    var stats = [];
    var max = 1;
    for (var e in statNames) {
        var stat = user[e];
        if (stat > max) max = stat;
    }
    for (var e in statNames) {
        var name = statNames[e];
        var tier = Math.ceil((user[e] / max) * 5);
        var stars = '';
        for (var t = 0; t < tier; t++) stars += '★';
        var str = stars+'/'+name;
        stats.push(str);
    }
    return stats.join(', ');
}
bot.addListener('message', function(from, to, text, message) {
	activateDeathTimer(from);
	var target = to;
	var sender = from;
	if (to == bot.nick) target = from;

    if (!canPlayHere(target)) {
        return;
    }
	checkStatsForUser(from);
	addUserToHostDatabase(from);
	var splitText = text.split(' ');
	splitText[0] = splitText[0].toLowerCase();

	if (!rand(0,17)) database.users[from].points += 1;
	healUser(from, 1, true);
	database.users[from].points = Math.ceil(database.users[from].points);
	var luser = database.users[from];
	if (!luser.commandNext) luser.commandNext = 0;
	if (!luser.commandHeat) luser.commandHeat = 0;
	var now = new Date();
	now = now.getTime();
	luser.commandHeat += 1.376;
	var diff = (luser.commandNext - now) / 1000;
	if (now < luser.commandNext) return;
	luser.commandNext = now + (luser.commandHeat * 1000);

	if (guessNumber) {
		var n = splitText[0];
		n = parseInt(n);
		if (n > 0 && n != NaN) {
			if (guessedNumbers.indexOf(n) >= 0 && n != guessNumber) {
				bot.say(target, 'El número '+n+' ya ha sido dicho. ('+displayNumbers()+')');
				return;
			}
			var lohi = lowerAndHigher(guessedNumbers, guessNumber, guessNumberMax);
			if (n < lohi.lower || n > lohi.higher) {
				bot.say(target, 'El número está entre el '+lohi.lower+' y el '+lohi.higher);
				return;
			}
			if (n == guessNumber) {
				database.users[from].points += guessNumberPoints;
				bot.say(target, 'Enhorabuena, el número era el '+guessNumber+'. '+from+' gana '+guessNumberPoints+' puntos.');
				resetGuessNumber();
				guessedNumbers = [];
				return;
			}
			else {
				guessNumberPoints = Math.floor(guessNumberPoints * POINT_DESCENT);
				if (guessNumberPoints < 1) guessNumberPoints = 1;
				var moless = (guessNumber < n) ? 'Menor' : 'Mayor';
				guessedNumbers.push(n);
				bot.say(target, moless + '. Inténtalo de nuevo por '+guessNumberPoints+' puntos. ('+displayNumbers()+')');
				return;
			}
		}
	}

	var obj = {'from': from, 'to': to, 'text': text};
	io.emit('newMessage', obj);
	if (from == to) return;

	/* Lilim help */
	if (splitText[0].match('help')) {
		var adh = splitText[1];
		if (!adh) adh = '';
		bot.say(from, help(adh));
		return;
	}


	/* Lilim Game */
	if (splitText[0].match('puntos')) {
		var see = (splitText[1]) ? splitText[1] : from;
		var uzer = database.users[see];
		if (!uzer) {
			bot.say(target, 'Ese usuario no existe. Inténtalo de nuevo más tarde.');
			return;
		}
		bot.say(target, see+' tiene '+uzer.points+' puntos. Puedes ganar más jugando a mis juegos: coc / numero / guess');
		return;
	}
	/* Lilim RPG */
	if (splitText[0] == 'top10') {
		var t = sortUsersByExp();
		var lt5 = '';
		for (var top5 = 0; top5 < 10; top5++) {
			lt5 += '#'+(top5 + 1)+' '+t[top5].name+' | ';
		}
		lt5 += 'Tu puesto es el '+sortUsersByExp(from);
		bot.say(target, lt5);
	}
	if (splitText[0] == 'renacer' || splitText[0] == 'renacer?') {
		var peek = (splitText[0] == 'renacer?') ? true : false;
		bot.say(target, resetUser(from, peek));
		return;
	}
	if (splitText[0] == 'clase') {
		bot.say(target, changeClass(from, splitText[1]));
		return;
	}
    if (splitText[0] == '_.upgrade') {
        bot.say(target, upgradePlayer(database.users[from]));
        return;
    }
    if (splitText[0] == '_.upgradeall' && from == 'Satanja') {
        for (var uz in database.users) console.log(upgradePlayer(database.users[uz]));
        return;
    }
	if (splitText[0] == '_.bar') {
		var min = splitText[1];
		var max = splitText[2];
		var col = splitText[3];
		bot.say(target, hpBar(min, max, col));
		return;
	}
	if (splitText[0] == '_.status') {
		var t = splitText[1];
		if (!t) t = from;
		bot.say(target, userStatus(t));
		return;
	}
	if (splitText[0] == '_.user') {
		var uz = splitText[1];
		var exists = isUserInitialized(uz);
		if (exists) bot.say(target, 'El usuario '+uz+' existe.');
		if (!exists) bot.say(target, 'El usuario '+uz+' no existe.');
	}
	if (splitText[0] == '_.tiempo') {
		var convert = parseInt(splitText[1]);
		var t = timeLeftTo(convert);
		var d = new Date();
		bot.say(target, 'Tiempo desde '+d.getTime()+' hasta '+convert+': '+t);
		return;
	}
    if (splitText[0] == '_.redist' && from == 'Satanja') {
        var user = (splitText[1]) ? splitText[1] : from;
        if (!splitText[2]) splitText[2] = '0.0.0.0.0.0';
        user = database.users[user];
        var build = splitText[2].split('.');

        var tot = 0;
        for (var bz in statNames) {
            tot += user[bz];
        }

        var percentages = [];

        for (var bz in statNames) {
            var val = (parseInt(user[bz]) / parseInt(tot)) * 100;
            val = Math.ceil(val)
            percentages.push(val);
        }

        bot.say(target, percentages.join('.'));

        return;
    }
    if (splitText[0] == '_.indemniza' && from == 'Satanja') {
        var user = (splitText[1]) ? splitText[1] : from;
        user = database.users[user];
        var total = 0;
        for (var bz in statNames) {
            bot.say(target, bz+' '+user[bz]);
            total += user[bz];
            user[bz] = 0;
        }
        for (var e in user.skills) {
            if (user.skills[e] > 0) {
                total += user.skills[e];
                user.skills[e] = 0;
            }
        }
        bot.say(target, 'Total: '+total+' ('+(total / STAT_INCREASE_PER_SKILL_POINT)+')');
        user.statPoints += Math.ceil(total / STAT_INCREASE_PER_SKILL_POINT);
        return;
    }
	if (text == '_.colores' && from == 'Satanja') {
		bot.say(target, 'barra 0/10 '+hpBar(0, 10)+' barra 5/10 '+hpBar(5, 10));
		return;
	}
	if (text == '_.users' && from == 'Satanja') {
		bot.say(target, 'Usuarios conocidos: ');
		bot.say(target, knownUsers.join(','));
		return;
	}
	if (splitText[0] == 'quien' && splitText[1] == 'es') {
		var hosts = searchUserHost(splitText[2]);
		bot.say(target, hosts);
		return;
	}
	if (splitText[0].match('jefe')) {
		var hp = database.users['$default_boss'].actualHP;
		if (hp > 0) {
			var mzg = getUserData('$default_boss');
			bot.say(target, mzg);
			return;
		}
		spawnBoss(from);
		var u = database.users['$default_boss'];
		bot.say(target, 'Un nuevo jefe ha aparecido en el canal! '+getUserData('$default_boss'));
		return;
	}
	if (splitText[0] == 'magia' || splitText[0] == 'especial') {
		var magic = splitText[1];
		var sendTo = splitText[2];
		var classSpecial = (splitText[0] == 'especial') ? true : false;
		if (classSpecial) {
			sendTo = magic;
			magic = '$';
		}

		var magicTest = magicAttack(from, sendTo, magic, true, classSpecial);
		if (magicTest.target == 'self' && !sendTo) sendTo = from;
		if (magicTest.target != 'self' && !sendTo) sendTo = '$default_boss';
        var seu = database.users[sendTo];
        var fromObj = database.users[from];
        if (seu == undefined) {
            bot.say(target, 'No puedes usar magia hacia "'+sendTo+'" porque no existe.');
            return;
        }
        if (seu.actualHP <= 0 || fromObj.actualHP <= 0) {
            bot.say(target, magicAttack(from, sendTo, magic, false, classSpecial));
            return;
        }
		bot.say(target, magicAttack(from, sendTo, magic, false, classSpecial));
		var m = killUser(from, sendTo);
        if (!magicTest) return;
		if (m && magicTest) {
			bot.say(target, m);
			return;
		}
		if (magicTest && magicTest.target != 'self') {
			counterStrike(from, sendTo, target);
		}
		return;
	}
	if (splitText[0] == 'aprender') {
		if (!splitText[1]) {
			var allskills = [];
			for (var as in skills) allskills.push(skills[as].name);
			bot.say(target, 'Puedes aprender una de las siguientes magias: '+color2.orange+allskills.join(color2.r+', '+color2.orange));
			return;
		}
		var magic = searchMagic(splitText[1]);
		var mname = skills[magic].name;
		var mdesc = skills[magic].desc;
		var skillCost = skills[magic].cost;
		var guy = database.users[from];
		if (!guy.skills) guy.skills = [];
		if (!guy.skills[magic]) guy.skills[magic] = 0;

		var times = parseInt(splitText[2]);
		if (!times) times = 1;
		if (times < 1) times = 1;
		var cost = times;

        var nowPoints = totalSpentPoints(guy);
        var nextPoints = nowPoints + cost;
        var max = totalSpentPoints(guy, true);
        if (nextPoints > max) {
            bot.say(target, 'No puedes aprender más magia hasta que subas de nivel.');
            return;
        }

		if (guy.statPoints >= cost) {
			guy.statPoints -= cost;
			guy.skills[magic] += times;
			skillCost = skillCost * guy.skills[magic];
			bot.say(target, 'Tu magia '+mname+' ha subido al nivel '+guy.skills[magic]+' (Coste: '+shortm(skillCost)+' MAGIA)'+i_+' '+mdesc);
			return;
		}
		else {
			bot.say(target, 'Necesitas 1 punto de habilidad para subir de nivel la magia '+mname);
			return;
		}
	}
	if (splitText[0].match('atac') || (splitText[0] == '_.atac' && from == 'Satanja')) {
		if (!canPlayHere(to)) {
			bot.say(from, 'No puedes utilizar ese comando en este canal.');
			return;
		}
		var attackTo = splitText[1];
		if (!attackTo) attackTo = '$default_boss';
		if (attackTo == from) {
			bot.say(target, 'No puedes atacarte a ti mismo so melón.');
			return;
		}
		var isAttackable = (database.users[attackTo] && database.users[attackTo].level > 0) ? true : false;
		if (!isAttackable && attackTo != '$default_boss' && attackTo != '$GOD') {
			bot.say(target, 'No puedes atacar a ese usuario. Intentalo de nuevo más tarde.');
			return;
		}


		var u = checkStatsForUser(attackTo);
		u = database.users[attackTo];
		var m = database.users[from];
		if (u.actualHP < 1 || !u.actualHP || m.actualHP < 1 || !m.actualHP) {
			bot.say(from, 'No puedes atacar a alguien muerto. No puedes atacar si estás muerto.');
			return;
		}
		var nokill = false;
		var fromy = (splitText[0] == '_.atac' && from == 'Satanja') ? '$GOD' : from;
		attack(fromy, attackTo, to, nokill);

		return;
	}
	if (splitText[0] == 'prueba') {
		var testFrom = splitText[1];
		var testTo = splitText[2];
		var gc = getChances(testFrom, testTo);
		bot.say(target, JSON.stringify(gc));
		return;
	}
	if (splitText[0] == '_.dmgme') {
		var pot = database.users[from].newKilledBy;
		var mzg = '';
		var total = 0;
		for (var e in pot) {
			var p = pot[e];
			total += p.damage;
		}
		for (var e in pot) {
			var p = pot[e];
			var percent = ((p.damage / total) * 100).toFixed(3);
			mzg += p.nick+' '+shortm(p.damage)+' ('+percent+'%) | ';
		}
		bot.say(target, mzg);
		return;
	}
	if (splitText[0] == 'equipo') {
		var f = from;
		if (splitText[1]) f = splitText[1];

		var userObject = database.users[f];

		bot.say(target, displayEquipment(userObject));

		return;
	}
	if (splitText[0] == '_.base') {
		var f = from;
		if (splitText[1]) f = splitText[1];

		var mzg = database.users[f];

        var bzz = '';
        for (var e in statNames) bzz += ' ['+e+':'+mzg[e]+'] ';

		bot.say(target, 'Bases: '+totalUserBases(mzg)+' ('+bzz+') '+i_+' Puntos de habilidad equivalentes: '+totalSpentPoints(mzg));

		return;
	}
	if (splitText[0] == 'compra') {
		var userObject = database.users[from];
		var i = userObject.nextItem;
		if (!i) {
			bot.say(target, 'No puedes comprar ningún objeto, primero crea uno escribiendo '+color2.blue+'crea'+color2.r);
			return;
		}
		var price = getPriceForItem(i);
		if (userObject.statPoints >= price) {
			bot.say(target, 'Has comprado '+i.name+' por '+price+' puntos de habilidad.');
			userObject.statPoints -= price;

			var oldItem = userObject.equipment[i.slot];
			var oldPrice = getPriceForItem(oldItem);
			oldPrice = Math.floor(oldPrice / 4) - 1;
			if (oldPrice > 0) {
				bot.say(target, 'Vendes tu '+oldItem.name+' por'+color2.blue+' '+oldPrice+' '+color2.r+'puntos de habilidad.');
				userObject.statPoints += oldPrice;
			}
			userObject.equipment[i.slot] = i;
			delete userObject.nextItem;
			return;
		}
		else {
			bot.say(target, 'Necesitas'+color2.blue+' '+price+' '+color2.r+'puntos de habilidad para comprar el objeto '+displayItem(i));
			return;
		}
		return;
	}
	if (splitText[0] == 'crea' || splitText[0] == 'forja') {
		var slot = splitText[1];

		if (!slot) {
			bot.say(target, 'Escribe '+color2.blue+'crea'+color2.r+' seguido del tipo de objeto y su nombre. Por ejemplo: '+color2.blue+'crea arma Espada de Cobre');
			return;
		}

		var name = [];
		for (var e in splitText) if (e >= 2) name.push(splitText[e]);
		name = name.join(' ');
		var tailor;
		if (splitText[0] == 'forja') tailor = database.users[from];

		var i = generateItem(slot, name, database.users[from].level, tailor);
		database.users[from].nextItem = i;
		bot.say(target, displayItem(i)+' escribe '+color2.blue+'compra'+color2.r+' para comprarlo.');
		return;
	}
	if (splitText[0] == '_.heat') {
		var u = database.users[from];
		bot.say(target, 'commandNext '+u.commandNext+' commandHeat '+u.commandHeat);
		return;
	}
    if (splitText[0] == 'memo') {
        var d = new Date();
        d = new Date(d.valueOf() + rand(2592000000, 124416000000));
        var old = fs.readFileSync('memo.txt', 'utf8');
        old += '\n';
        old += 'de '+from+' en '+target+' a las '+new Date()+': '+splitText.join(' ');
        fs.writeFile('memo.txt', old);

        bot.say(target, 'La nota ha sido enviada a los desarrolladores, espere una respuesta el próximo '+d);
        return;
    }
	if (splitText[0].match('_.dat')) {
		var f = from;
		if (splitText[1]) f = splitText[1];

		var mzg = database.users[f];
		bot.say(target, JSON.stringify(mzg));

		return;
	}
    if (splitText[0].match('stats')) {
        var f = from;
        if (splitText[1]) f = splitText[1];

        var user = database.users[f];

        var m = getStatStars(user);

        bot.say(target, m);

        return;
    }
	if (splitText[0].match('dat')) {
		var f = from;
		if (splitText[1]) f = splitText[1];

		var mzg = getUserData(f);
		bot.say(target, mzg);

		return;
	}
	if (splitText[0].match('_.daño')) {
		var mzg = '';
		mzg += from;
		mzg += ' Daño crítico: '+getCritDamage(from);
		var d = getStatsFor(from, 'baseATK') * 2;
		mzg += ' Máximo daño: '+d;
		var dd = Math.ceil(d * getCritDamage(from));
		mzg += ' Máximo golpe crítico: '+dd;
		bot.say(target, mzg);
		return;
	}
	if (splitText[0] == 'cura') {
		var toHeal = from;
		var healVariant = '';
		if (splitText[1]) {
			healVariant = 'all';
			if (splitText[1] == 'todo') healVariant = 'all';
			if (splitText[1] == 'vida') healVariant = 'hp';
			if (splitText[1] == 'magia') healVariant = 'mp';
		}
		if (splitText[2]) toHeal = splitText[2];

		var color = {
			'white': '\x030',
			'black': '\x031',
			'blue': '\x032',
			'green': '\x033',
			'red': '\x034',
			'brown': '\x035',
			'purple': '\x036',
			'orange': '\x037',
			'yellow': '\x038',
			'lime': '\x039',
			'cyan': '\x0310',
			'teal': '\x0311',
			'lblue': '\x0312',
			'pink': '\x0313',
			'gray': '\x0314',
			'lgray': '\x0315',
			'r': '\x0f',
		}

		var u = database.users[toHeal];
		if (!u) return;
		var percentHealth = 1 - (u.actualHP / getStatsFor(u, 'baseHP', true));
		var percentMana = 1 - (u.actualMP / getStatsFor(u, 'baseMP', true));
		var percentAll = (percentHealth + percentMana) / 2;
		var cost = {
			'all': Math.ceil(TOTAL_HEAL_PRICE * u.level * percentAll),
			'hp': Math.ceil(HEALTH_HEAL_PRICE * u.level * percentHealth),
			'mp': Math.ceil(MANA_HEAL_PRICE * u.level * percentMana),
		}
		if (!healVariant) {
			bot.say(target, 'Coste de curación: '+color.red+'TODO'+color.gray+' ('+cost.all+' puntos) '+color.r+'| '+color.red+'VIDA'+color.gray+' ('+cost.hp+' puntos) '+color.r+'| '+color.orange+'MAGIA'+color.gray+' ('+cost.mp+' puntos)');
			return;
		}
		cost = cost[healVariant];



		var mmme = database.users[from];
		if (mmme.points < cost) {
			var mz = (toHeal == from) ? 'curarte' : 'curar a '+toHeal;
			bot.say(target, 'Necesitas '+cost+' punto(s) para poder '+mz);
			return;
		}
		var max = getStatsFor(toHeal, 'baseHP');
		var maxm = getStatsFor(toHeal, 'baseMP');
        if (u.actualHP >= max && u.actualMP >= maxm) {
            bot.say(target, 'Tu vida y magia ya están al máximo.');
            return;
        }
		if (u.actualHP >= max && (healVariant == 'hp')) {
			var mz = (toHeal != from) ? toHeal+' ya está al máximo de vida. ' : 'Ya estás al máximo de vida. ';
			mz += 'Escribe '+color.blue+'cura magia'+color.r+' para restaurar solo la magia.';
			bot.say(target, mz);
			return;
		}
		if (u.actualMP >= maxm && (healVariant == 'mp')) {
			var mz = (toHeal != from) ? toHeal+' ya está al máximo de magia. ' : 'Ya estás al máximo de magia. ';
			mz += 'Escribe '+color.blue+'cura vida'+color.r+' para restaurar solo la vida.';
			bot.say(target, mz);
			return;
		}
		mmme.points -= cost;
		if (healVariant == 'all' || healVariant == 'hp') healUser(toHeal, Infinity);
		if (healVariant == 'all' || healVariant == 'mp') healUser(toHeal, Infinity, true);
		bot.say(target, toHeal+' curado al máximo por '+cost+' punto'+((cost > 1) ? 's' : '')+'. '+u.actualHP+'/'+getStatsFord(toHeal, 'baseHP')+'/VIDA '+u.actualMP+'/'+getStatsFord(toHeal, 'baseMP')+'/MAGIA');
		return;
	}
	if (splitText[0] == 'dar' && splitText[1] == 'puntos') {
		var who = splitText[2];
		var qty = parseInt(splitText[3]);
		var exists = isUserInitialized(who);
		if (exists) {
			var fromu = database.users[from];
			var tou = database.users[who];
			if (qty <= 0) {
				bot.say(target, 'No puedes darle '+qty+' puntos a nadie.');
				return;
			}
			if (fromu.points >= qty) {
				fromu.points -= qty;
				tou.points += qty;
				bot.say(target, from+' le da '+qty+' puntos a '+who+'. Ahora tiene '+tou.points+'.');
			}
			else {
				bot.say(target, 'No puedes darle '+qty+' puntos a '+who+' porque sólo tienes '+fromu.points);
			}
		}
		else {
			bot.say(target, 'No puedes darle puntos a '+who+'.');
		}
		return;
	}
	if (splitText[0].match('aumenta')) {
		var uz = database.users[from];
		if (!splitText[1]) return;
		var times = parseInt(splitText[2]);
		if (!times || parseInt(times) == NaN || times == NaN) times = 1;
		if (splitText[1].match('pu')) {
			if (!times) times = Math.floor(uz.points / SKILL_POINTS_COST);
			var cost = times * SKILL_POINTS_COST;
			if (uz.points >= cost) {
				uz.points -= cost;
				uz.statPoints += times;
				bot.say(target, 'Has perdido '+cost+' puntos y has comprado '+times+' puntos de habilidad.');
			}
			else {
				bot.say(target, 'Necesitas al menos '+cost+' puntos para comprar '+times+' puntos de habilidad.');
			}
		}
		if (splitText[1] == 'nivel') {
			var e = expForNextLevel(uz.level) - uz.experience;
			times = e;
			bot.say(target, increaseStat(from, 'experience', times));
			return;
		}
		if (splitText[1].match('vid')) bot.say(target, increaseStat(from, 'baseHP', times));
		if (splitText[1].match('mag')) bot.say(target, increaseStat(from, 'baseMP', times));
		if (splitText[1].match('ata')) bot.say(target, increaseStat(from, 'baseATK', times));
		if (splitText[1].match('def')) bot.say(target, increaseStat(from, 'baseDEF', times));
		if (splitText[1].match('vel')) bot.say(target, increaseStat(from, 'baseSPD', times));
		return;
	}
	/* Lilim Game: Pokewho */
	if (splitText[0] == 'guess') {
		if (guessGame) {
			bot.say(from, 'No puedes empezar otro juego de GUESS. Inténtalo más tarde.');
			return;
		}
		if (canPlayHere(to)) {
			bot.say(target, 'WHO IS THAT POKEMON?!');
			guessGame = setTimeout(function() {startGuessGame(to)}, 3000);
		}
		else {
			bot.say(from, 'Lo siento, ese juego no está permitido en este canal.');
		}
	}
	if (guessGameOptions && guessGameOptions.channel == to) {
		var pok = guessGameOptions.pokemon;
		if (text.toLowerCase() == pok.toLowerCase()) {
			bot.say(target, 'En efecto, el pokémon era '+pok+'. '+from+' ha ganado '+guessGameOptions.points+' puntos. Vuelve a jugar escribiendo "guess"');
			database.users[from].points += guessGameOptions.points;
			guessGame = '';
			guessGameOptions = '';
		}
		else {
			guessGameOptions.attempts++;
			guessGameOptions.points = Math.floor(guessGameOptions.points * POINT_DESCENT) + 1;
			if (guessGameOptions.attempts >= guessGameOptions.hidden.length) guessGameOptions.hidden[guessGameOptions.attempts] = pok;
			bot.say(target, '¡No! Sigue intentándolo por '+guessGameOptions.points+' puntos. Pista: '+guessGameOptions.hidden[guessGameOptions.attempts]);
		}
		return;
	}
	/* Lilim Game: Number */
	if (splitText[0].match('numero')) {
		if (guessNumber) {
			bot.say(from, 'No puedes empezar otra partida hasta que termine la que ya hay.');
		}
		if (!guessNumber) {
			var suggestion = splitText[1];
			var numax = 100;
			if (suggestion > 0 && suggestion != NaN) numax = suggestion;
			if (numax < 100) numax = 100;
			guessNumberMax = numax;
			bot.say(target, 'Adivina el número en el que estoy pensando por '+numax+' puntos. Es un número del 1 al '+numax);
			guessNumber = rand(1, numax);
			guessNumberPoints = numax * 0.5;
			guessedNumbers.push(guessNumber);
		}
		return;
	}
	/* Lilim Game: Cara o Cruz */
	if (splitText[0].match('coc') && (splitText[1] > 0)) {
		var coc = rand(0, 100);
		var select = splitText[1];
		var myPoints = database.users[from].points;
		if (myPoints < select) {
			bot.say(target, 'No puedes apostar tantos puntos. Sólo tienes '+myPoints);
			return;
		}
		var other = (select == 'CARA') ? 'CRUZ' : 'CARA';
		if (coc < 2) {
			bot.say(target, 'La moneda ha caído de lado. Te jodes.');
			return;
		}
		if (coc > 1 && coc <= 50) {
			database.users[from].points += parseInt(select);
			bot.say(target, 'CARA! Has ganado '+select+' puntos. Tienes '+database.users[from].points+' puntos.');
			return;
		}
		if (coc > 50) {
			database.users[from].points -= parseInt(select);
			bot.say(target, 'CRUZ! Pierdes '+select+' puntos. Tienes '+database.users[from].points+' puntos.');
			return;
		}
	}

	if (splitText[0] == 'compara') {
		var user1 = database.users[from];
		var user2 = database.users[splitText[1]];

		var c = compareUsers(user1, user2);

		bot.say(to, 'Probabilidades de victoria: '+c+'%');
		return;
	}
	if (text.match('info') && from == 'Satanja') {
		bot.say(to, 'Lilim v'+v.latestVersion+' Tengo '+database.phrasebook.length+' frases en mi base de datos. Y '+database.answers.length+' respuestas.');
		return;
	}
	if (splitText[0] == 'cambios') {
		bot.say(from, 'Hi. Soy Lilim, mi versión es la '+v.latestVersion+'. Escribe "help" para más información.');
		bot.say(from, 'Últimos cambios: '+latestChanges());
		return;
	}
	if (splitText[0] == 'guarda' && from == 'Satanja') {
		saveData();
		bot.say(target, 'He guardado todas las variables.');
		return;
	}
	if (text.match('baraja') && from == 'Satanja') {
		shufleData();
		bot.say(to, 'Hala, ya está.');
		return;
	}
	if (splitText[0] == 'repite') {
		bot.say(to, text);
		return;
	}
	if (splitText[0] == 'borra' && from == 'Satanja') {
		if (splitText[1] == 'respuestas') {
			database.answers = [];
			bot.say(to, 'He borrado todo. Estaras contento.');
		}
		if (splitText[1] == 'frase') {
			var index = splitText[2];
			var ph = database.phrasebook[index];
			if (!ph) {
				bot.say(to, 'No he encontrado la frase #'+index);
				return;
			}
			database.phrasebook.splice(index, 1);
			database.answers.splice(index, 1);
			shufleData();
			saveData();
			bot.say(to, 'He borrado la frase #'+index+' ('+ph+')');
			return;
		}
		return;
	}
	if (splitText[0] == 'busca' && splitText[1] == 'y' && splitText[2] == 'limpia') {
		if (splitText[3] == 'todos' && from == 'Satanja') {
			randomNumber = 0;
			var clea = setInterval(function() {
				database.phrasebook[randomNumber] = cleanMessage(database.phrasebook[randomNumber]);
				if (randomNumber % 50 == 0) bot.say(to, '('+randomNumber+'/'+database.phrasebook.length+')');
				randomNumber++;
				if (randomNumber >= database.phrasebook.length) {
					bot.say(to, 'Creo que ya he terminado.')
					clearInterval(clea);
				}
			}, 10);
			return;
		}
		var t = '';
		var term = splitText[3];
		for (var s in database.phrasebook) {
			database.phrasebook[s] = cleanMessage(database.phrasebook[s]);
			var ph = database.phrasebook[s];
			if (ph.match(term)) {
				t += '(#'+s+') '+ph+';';
			}
		}
		if (!t) t = 'Sin resultados.';
		bot.say(to, t);
		return;
	}
	if (text.match('mezcla')) {
		var f = text.split(' ');
		f.splice(0, 1);
		f = f.join(' ');

		bot.say(to, morph(f));
		return;
	}
    if (splitText[0] == '_sr' && from == 'Satanja') {
        for (var e in database.phrasebook) {
            if (e > 1000) database.phrasebook.splice(e, 1);
        }
        for (var e in database.answers) {
            if (e > 1000) database.answers.splice(e, 1);
        }
        bot.say(to, 'Tengo '+database.phrasebook.length+' frases.');
        return;
    }
	if (splitText[0] == 'limpia') {
		var f = text.split(' ');
		f.splice(0, 1);
		f = f.join(' ');

		var isSafe = isPhraseSafe(f);
		if (!isSafe) {
			bot.say(to, 'Mi papa me ha dicho que no puedo decir palabrotas.');
			return;
		}

		bot.say(to, cleanMessage(f));
		return;
	}
	if (splitText[0] == 'busca' && splitText[1] == 'duplicados') {
		if (splitText[2] == 'todos' && from == 'Satanja') {
			randomNumber = 0;
			var dup = setInterval(function() {
				if (randomNumber % 50 == 0) bot.say(to, '('+randomNumber+'/'+database.phrasebook.length+')');
				var dp = duplicate(randomNumber);
				if (dp) bot.say(to, '('+randomNumber+'/'+database.phrasebook.length+') '+dp);

				randomNumber++;
				if (randomNumber >= database.phrasebook.length) {
					bot.say(to, 'Creo que ya he terminado.')
					clearInterval(dup);
				}
			}, 40);
			return;
		}
		var term = splitText[2];
		bot.say(to, 'Ok dejame que busque...');
		var bm = bestMatch(term);
		var bmi = bm.index;
		bot.say(to, duplicate(bmi));
		return;
	}
	if (text.match('dile a ')) {
		var t = text.split(' ');
		var sendTo = t[2];
		var sendMsg = '';
		for (var x in t) {
			if (x >= 3) sendMsg += t[x]+' ';
		}
		if (!database.messages) database.messages = {};
		if (!database.messages[sendTo]) database.messages[sendTo] = [];
		database.messages[sendTo].push(sendMsg);
		bot.say(from, 'Ok, se lo dire.');
		return;
	}
	if (splitText[0] == 'busca' && splitText[1] == 'iguales') {
		var t = '';
		var term = splitText[2];
		for (var s in database.phrasebook) {
			var ph = database.phrasebook[s];
			if (ph.match(term)) {
				t += '(#'+s+') '+ph+';';

			}
		}
		if (!t) t = 'Sin resultados.';
		bot.say(to, t);
		return;
	}
	if (splitText[0] == 'busca') {
		var f = text.split(' ');
		f.splice(0, 1);
		f = f.join(' ');

		var c = bestMatch(f);
		if (c == undefined || c.index == undefined) {
			bot.say(to, 'Frase no encontrada.');
			return;
		}
		var val = Number(c.value);
		var ci = c.index
		c = database.phrasebook[c.index];
		var r = database.answers
		r = database.answers[ci];
		if (!r) r = '';
		r = r.length;
		bot.say(to, c+' (no. '+ci+' parecido '+(val * 100)+'%, respuestas: '+r+')');
		return;
	}
	if (splitText[0] == 'dime') {
		if (splitText[1] == 'frase') {
			var id = splitText[2];
			var ph = database.phrasebook[id];
			if (!ph) {
				bot.say(to, 'Frase no encontrada. Elige un numero del 0 al '+database.phrasebook.length);
				return;
			}
			bot.say(to, '(no. '+id+') '+ph);
			return;
		}
		if (splitText[1] == 'respuesta') {
			var id = splitText[2];
			var idr = splitText[3];
			var ph = database.answers[id];
			if (!ph) {
				bot.say(to, 'No hay respuestas.');
				return;
			}
			var phr = ph[idr];
			if (!phr) {
				bot.say(to, 'Respuesta no encontrada. 0/'+ph.length);
				return;
			}
			bot.say(to, '('+database.phrasebook[id]+' -> '+phr);
			return;
		}
	}
	if (splitText[0] == '^' && text.match(';;') && from == 'Satanja') {
		var t = text.split(' ');
		t.splice(0, 1);
		t = t.join(' ');
		t = t.split(';;');
		var question = cleanMessage(t[0]);
		var answer = cleanMessage(t[1]);
		var bm = database.phrasebook.indexOf(question);
		bm = bm.index;
		if (bm < 0 || bm == undefined) {
			database.phrasebook.push(question);
			bm = database.phrasebook.indexOf(question);
		}
		if (!database.answers[bm] || database.answers[bm].length <= 0) database.answers[bm] = [];
		database.answers[bm].push(answer);
		bot.say(from, 'La pregunta ('+question+' #'+bm+') ha sido actualizada con la respuesta ('+answer+' #'+database.answers[bm].length+')');
		return;
	}
	if (splitText[0] == 'responde') {
		var f = text.split(' ');
		f.splice(0, 1);
		f = f.join(' ');

		var c = bestMatch(f);
		if (c == undefined || c.index == undefined) {
			bot.say(to, 'Frase no encontrada.');
			return;
		}
		var ci = c.index;
		c = database.answers[c.index];
		if (!c) {
			bot.say(to, 'Sin respuestas.');
			return;
		}
		var randy = [read(c), read(c), read(c)];
		bot.say(to, 'Respuestas para (no '+ci+', '+c.length+' respuestas en total) = '+randy.join(' ||| '));
		return;
	}
});
function addAnswer(questionID, answer) {
    if (!database.answers[questionID]) {
        database.answers[questionID] = [];
    }
    database.answers[questionID].push(cleanMessage(answer));
    saveData();
}
function delAnswer(questionID, answerID) {
    if (answerID == undefined) {
        console.log('No answer ID specified. Deleting question ID '+questionID);
        database.answers.splice(questionID, 1);
        database.phrasebook.splice(questionID, 1);
    }
    else {
        console.log('Deleting answer ID '+answerID+' for quesstion ID '+questionID);
        database.answers[questionID].splice(answerID, 1);
    }
    saveData();
}
function isPhraseSafe(string) {
	var slc = string.toLowerCase();
	for (var ips in BANNED_WORDS) {
		var w = BANNED_WORDS[ips];
		w = w.toLowerCase();
		if (slc.match(w)) {
			return false;
		}
	}
	return true;
}
function duplicate(phrasebookID) {
	var t = '';
	var phrase = database.phrasebook[phrasebookID];

	for (var du in database.phrasebook) {
		var isSafe = isPhraseSafe(database.phrasebook[du]);
		if (du == phrasebookID && isSafe) continue;
		var ph = database.phrasebook[du];
		if (ph == phrase || !isSafe) {
			if (isSafe) {
				t += 'Duplicado en linea '+du+' borrado. ; ';
			}
			if (!isSafe) {
				t += 'La palabra en la linea '+du+' contenia palabrotas y ha sido borrada. ; ';
			}
			database.phrasebook.splice(du, 1);
			if (!database.answers[du]) database.answers[du] = [];
			var obj = JSON.parse(JSON.stringify(database.answers[du]));
			database.answers.splice(du, 1);
			if (!database.answers) database.answers = [];
			if (!database.answers[phrasebookID]) database.answers[phrasebookID] = [];
			for (var de in obj) {
				database.answers[phrasebookID].push(obj[de]);
			}
		}
	}
	return t;
}
function searchResults(term) {
	var results = [];
	for (var sr in database.phrasebook) {
		var ph = database.phrasebook[sr];
		var phs = ph.split(' ');
		for (var pht in phs) {
			if (phs[pht] == term) {
				results.push(ph);
				break;
			}
		}
	}
	return results;
}
function morph(string) {
	var words = string.split(' ');
	var rword = read(words);
	var results = searchResults(rword);
	for (var mp in results) {
		if (string == results[mp]) {
			results.splice(mp, 1);
			break;
		}
	}
	if (results.length <= 1) return string;
	var res = searchResults(rword);
	res = read(res);

	if (!res) res = string;

	var s1 = string.indexOf(rword);
	var s2 = res.indexOf(rword);

	string = string.slice(0, s1);
	res = res.slice(s2, res.length);

	return string + res;
}
function cleanMessage(string) {
    var bot_name = 'Lilim';
    if (config && config.botName) bot_name = config.botName;
    if (bot && bot.nick) bot_name = bot.nick;

	var string = string.split(' ');
	var nustring = [];
	for (var cm in string) {
        var wordz = string[cm];
        wordz = wordz.toLowerCase();

		wordz = wordz.replace('', '');
		wordz = wordz.replace('', '');
		wordz = wordz.replace('', '');
		wordz = wordz.replace('', '');

		if (wordz == '?') {
			nustring[(nustring.length - 1)] += '?';
			continue;
		}
		if (wordz == ':') continue;
		if (wordz.match(bot_name.toLowerCase())) continue;
		if (wordz.match('@')) continue;
		if (wordz.length == 0) continue;
		nustring.push(wordz);
	}
	return nustring.join(' ');
}
function compare(string1, string2) {
	var c1 = simil(string1, string2);
	var c2 = compare2(string1, string2);

	return Math.sqrt(c1 * c2);
}
function compare2(string1, string2) {
	if (!string1) string1 = '';
	if (!string2) string2 = '';
	//97-122
	var value = 1;
	var hit = 0;
	var miss = 0;
	var debugmsg = '';
	for (var let = 97; let <= 122; let++) {
		var c1 = count(string1, let);
		var c2 = count(string2, let);
		if (c1 == 0 && c2 == 0) continue;
		var mm = minMax(c1, c2);
		hit += mm;
		miss++;
	}
	var score1 = matchingChars(string1, string2) / string1.length;
	var score2 = matchingChars(string1, string2) / string2.length;
	var score3 = (hit / miss);
	return (score1 + score2 + score3) / 3;
}
function matchingChars(string1, string2) {
	var m = 0;
	for (var mc in string1) {
		var c = string1[mc];
		var lf = lookForChar(string2, c);
		lf = closerTo(mc, lf);
		if (lf.arrayID > -1) {
			m += (1 / (lf.distance + 1));
		}
	}
	return m;
}
function lookForChar(string, chara) {
	if (!string) string = '';
	string = string.toLowerCase();

	var result = [];
	for (var lfc in string) {
		if (string[lfc] == chara.toLowerCase()) result.push(lfc);
	}
	return result;
}
function closerTo(number, array) {
	var closer = {'arrayID': -1, 'distance': Infinity};
	for (var ct in array) {
		var n = parseInt(array[ct]);
		var dist = Math.abs(number - n);
		if (dist < closer.distance) closer = {
			'arrayID': parseInt(ct),
			'distance': dist,
		}
	}
	return closer;
}
function count(string, character) {
	var c = String.fromCharCode(character);
	if (!string) string = '';
	return string.toLowerCase().split(c).length - 1;
}
function minMax(num1, num2) {
	if (num1 == num2) return 1;
	if (num1 == 0 || num2 == 0) return 0;
	if (num1 < num2) return (num1 + 1) / (num2 + 1);
	return (num2 + 1) / (num1 + 1);
}
function addPhraseToDatabase(string) {
	for (var bw in BANNED_WORDS) {
		var w = BANNED_WORDS[bw].toLowerCase();
		var slc = string.toLowerCase();
		if (slc.match(w)) {
			return;
		}
	}
	var oldIndex = database.phrasebook.indexOf(string);
	if (oldIndex >= 0) {
	}
	else {
		database.phrasebook.push(string);
	}
	shufleData();
}
function bestMatch(string) {
	var best = {'index': -1, 'value': 0};
	var ixof = database.phrasebook.indexOf(string);
	if (ixof > -1) {
		best.index = ixof;
		best.value = 1;
		return best;
	}
	for (var bm in database.phrasebook) {
		var v = compare(database.phrasebook[bm], string);
		if (v > best.value && v >= 0.8) {
			best.index = bm;
			best.value = v;
		}
	}
	return best;
}
function getAnswer(string) {
	var bmt = bestMatch(string);

	var stringIndex = bmt.index;

	var possibleAnswers = (stringIndex > -1) ? database.answers[stringIndex] : [];
	if (!possibleAnswers) possibleAnswers = [];

	if (possibleAnswers.length > 0) {
		return read(possibleAnswers);
	}
	if (possibleAnswers.length <= 0) {
		return read(database.phrasebook);
	}
}
function aiSay(to, mess, toChan, sender) {
	if (!userWhoises[to]) return;
	var userchans = userWhoises[to].channels;

	var white = compareChannels(userchans, me.channels);

	if (!white) {
		//return;
	}

	var phraseIndex = database.phrasebook.indexOf(mess);
	memory[to] = {
		'index': phraseIndex,
		'message': mess,
	}
	var t = to;
	if (toChan) t = toChan;
	var ts = (sender) ? sender+': ' : '';
	if (!rand(0,3) || t == sender) ts = '';

	//Typos
	if (!rand(0,20)) mess += 'ç';

	bot.say(t, ts+''+mess);
}
function compareChannels(fromList, toList) {
	for (var f in fromList) {
		for (var t in toList) {
			if (fromList[f] == toList[t]) return true;
		}
	}
	return false;
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
function saveData() {
	shufleData();

	var db = JSON.stringify(database);
	fs.writeFile('database.json', db);
	console.log('Saved database. '+db.length+' characters.');
}
function shufleData() {
	//Shufle database
	return;
	while (database.phrasebook.length > database.answers.length) {
		database.answers.push([]);
	}

	var r = rand(0, database.phrasebook.length);
	for (var x = 0; x <= r; x++) {
		database.phrasebook.push(database.phrasebook.shift());
		database.answers.push(database.answers.shift());
	}
}
function loadData() {
	var dbf = fs.readFileSync('database.json', 'utf8');
	if (!dbf) {
		return;
	}
	var pl = fs.readFileSync('pokemonList.json', 'utf8');
	if (pl) pokemonList = JSON.parse(pl);

	var db = JSON.parse(dbf);
	database = db;
    if (!database.boardGame) database.boardGame = newBoardGame(100);
    if (database.map == undefined) database.map = newMap();
    if (database.nextBoardGame == undefined) database.nextBoardGame = 0;
    if (database.boardGamePlayers == undefined) database.boardGamePlayers = [];
    if (database.boardGameStarted == undefined) database.boardGameStarted = false;

	console.log('Loaded database. '+dbf.length+' characters.');
}

loadData();
setInterval(saveData, 120000);
setInterval(tickAllUsers, 1200);
