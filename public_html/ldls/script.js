var changelog = [
'--- Añadido lo básico', 
'-- Añadida prueba de ganancia de experiencia.', 
'--- Cambiadas abreviaciones a ATQ, DEF, VEL, SAB', 
'--- Arreglada la experiencia recibida', 
'-- Añadida prueba de combate usando niveles y experiencia.', 
'---- Arreglada experiencia no siendo calculada correctamente al subir de nivel.', 
'--- Las subidas de nivel ahora muestran cambios en las características respecto al nivel anterior.', 
'---- Arreglado un error al mostrar mensajes de subida de nivel.', 
'-- Añadidos botones para curar y hacer daño. Mejorado el aspecto de la pagina.', 
'--- Los puntos de acción se recuperan con el tiempo.', 
'-- Añadidas habilidades básicas.', 
'-- Añadidos clanes (grupos) de prueba', 
'--- Eliminado "Zorras" de las palabras para clanes.', 
'--- Eliminadas algunas palabras mas de los clanes.', 
'--- Añadido un selector de profesión y un selector de clan a la pantalla de creación de personaje.', 
'-- Añadido mapa de prueba', 
'--- Ahora se muestra el clan al que pertenece tu personaje.', 
'--- En el mapa de prueba aparece una animacion de color rojo para indicar tu posicion', 
'--- En el mapa de prueba puedes moverte con las flechas para cambiar de posicion.', 
'---- Arreglado el mapa que mostraba la coordenada X en el lugar de la Y y viceversa.', 
'--- Al elegir un clan, el "personaje" aparece inmediatamente en la casilla del mapa de prueba que corresponde a ese clan.', 
'---- Arreglado un bug que ocultaba los datos despues de "Clan" en la barra derecha.',
'--- Actualizada la librería common.js',
'--- Añadido un botón para ver los cambios de la versión',
'--- Añadido guardado de datos',
'---- Cambiado el nombre de la variable/objeto global a ldls',
'---- La variable players ahora se guarda cada 30 segundos',
'---- La "pantalla" de creación de personaje desaparece si ya hay un personaje previamente guardado.',
'---- Los clanes ahora se guardan al guardar la partida.',
'--- Junto con las areas de los mapas se genera un mapa dentro con diversos puntos.',
'---- Arreglado ciclo infinito en la generación de mapas',
'--- Ahora se puede cambiar la vista entre mapa del mundo y mapa de la región (No se puede mover dentro del mapa de la región)',
'--- EL personaje se puede mover dentro del área, y al llegar al borde pasa a la siguiente.',
'---- El personaje ya se puede mover hasta todos los límites, una vez llegado al límite, no podrá moverse más.',
'--- En el mapa ahora se ve una imagen para saber dónde estás.',
'--- Cambiados los botones de "ver mapa" por iconos cutres',
'-- Ahora se puede mover en el mapa  usando las teclas QWEADZXC (Q = arriba izquierda, W = arriba, etc)',
'-- Añadidas ciudades y demás lugares con una imagen.',
'-- Añadidas tiendas, aparecen en ciudades, pueblos y capitales.',
'-- Cada jugador empieza con 1000G',
'-- Los jugadores ahora tienen un inventario.',
'--- El inventario aparece en la esquina inferior derecha de la pantalla.',
'--- Añadido un botón para borrar todos tus datos en la esquina inferior izquierda de la pantalla.',
'--- Ahora puedes comprar objetos en las tiendas, que se añaden a tu inventario.',
'---- Arreglado un bug que hacía desaparecer los botones de curar al jugador etc al recargar la página.',
'---- Arreglados trozos del mapa mostrándose más grandes de lo normal y descuadrando la página.',
'---- Movidos los botones de movimiento del "personaje" a la derecha, debajo de los botones del mapa.',
'---- Añadido icono de casa para el mapa de la zona.',
'---- Movidos todos los iconos de cambio de mapa en horizontal en lugar de vertical.',
'---- Centrado el mapa, añadidos colores más amistosos para la vista.',
'--- Extendidos los objetos, ahora es posible añadir nuevos campos como basePrice (precio), attack, defense, etc.',
'--- Las tiendas ahora usan el nuevo modelo de objetos, así como el inventario.',
'--- Añadidos nuevos sprites de prueba (cofre, bolsa, espada, escudo)',
'--- Ahora es posible acceder al inventario pulsando el icono del cofre, lo cual oculta el mapa.',
'--- Los objetos ahora muestran un icono al lado del nombre, por defecto es el icono de la bolsa.',
'---- Arreglados algunos fallos críticos al iniciar el "juego".',
];

function drawInventory(player) {
    var di = '<h2 style="text-align: center">Inventario</h2><br>';
    for (var h in player.inventory) {
        di += '<div class="shopItem" title="'+JSON.stringify(player.inventory[h])+'">'+showItemData(player.inventory[h])+'</div>';
    }
    if (player.inventory.length <= 0) di += '<i>Parece que no tienes ningún objeto...</i>';
    di += '<div class="button bottomButton" onclick="showInventory(1)">(Volver al mapa)</div>';
    gameInventory.innerHTML = di;
}
function showItemData(item) {
    var r = '<i class="sprite '+item.sprite+'"></i>';
    r += item.name+' ('+item.basePrice+'G)';
    if (item.attack) r += '<br>+'+item.attack+'ATQ';
    if (item.defense) r += '<br>+'+item.defense+'DEF';
    return r;
}
function showInventory(reverse) {
    if (!reverse) {
        $('#gameInventory').fadeIn(100);
        $('#gameMapTest').fadeOut(100);
        $('#gameButtons').fadeOut(100);
    }
    if (reverse) {
        $('#gameInventory').fadeOut(100);
        $('#gameMapTest').fadeIn(100);  
        $('#gameButtons').fadeIn(100);

    }
}
function printPlayerData(player) {
    var l = '';
    
    l += 'Jugador '+player.name+' el '+getPlayerData(player, 'role')+'<br>'+
    'Clan: '+ldls.squads[player.clan].name+'<br>'+
    'Nv. '+player.level+' ('+player.experience+'/'+Math.pow((player.level + 1), 3)+' experiencia)<br>'+
    dataBar(player.pv, getPlayerData(player, 'health'), '#23cf12')+' PV<br>'+
    dataBar(player.pa, getPlayerData(player, 'action'), '#a8190e')+' PA<br>'+
    player.ph+' PH<br>'+
    getPlayerData(player, 'attack')+' ATQ<br>'+
    getPlayerData(player, 'defense')+' DEF<br>'+
    getPlayerData(player, 'speed')+' VEL<br>'+
    getPlayerData(player, 'knowledge')+' SAB<br>';
    
    return l;
}
function showMap() {
    mapDiv.innerHTML = drawMap(worldMap);
    $('#mapDiv').slideDown(1000);
}
function dataBar(min, max, color) {
    var minwidth = (min / max) * 64;
    var maxwidth = 64 - minwidth;
    var l = '<span style="width: '+minwidth+'px; background-color: '+color+'" class="bar"></span>';
    l += '<span style="width: '+maxwidth+'px; background-color: #888" class="bar"></span>';
    return l;
    
}
function calculateLevelTest() {
    var from = ldls.players[0].level;
    var to = parseInt(enemyLevelTest.value);
    
    var f = calculateExpGain(from, to);
    
    enemyLevelTestOutput.value = f;
}
function toggleSkillSelector() {
    if (!skillSelector) skillSelector = true;
    if (skillSelector) {
        var l = '';
        for (var s in skills) {
            var skill = skills[s];
            l += '<div class="skillButton" onclick="buySkill(0, '+s+')">'+skill.name+' '+skill.description+'</div>';
        }
        skillSelectorDiv.innerHTML = l;
        
    }
    else {
        skillSelectorDiv.innerHTML = 'Cambiar habilidades';
    }
}
function getMap(which) {
    var gm = '';
    if (!ldls || !ldls.players || !ldls.players[0]) return;
    var playerPos = ldls.players[0].position;
    for (var y in gameMap) {
        if (which != 'gameMap') break;
        for (var x in gameMap[y]) {
            var exClass = '';
            if (playerPos.gameMap.x == x && playerPos.gameMap.y == y) exClass = "youAreHere";
            var toAdd = '<span class="gameMapMarker '+exClass+'">['+gameMap[y][x].name+']</span>';
            gm += toAdd;
        }
        gm += '<br>';
    }
    var placeMap = gameMap[playerPos.gameMap.y][playerPos.gameMap.x].places;
    for (var y in placeMap) {
        if (which != 'placeMap') break;
        for (var x in placeMap[y]) {
            var exClass = '';
            if (playerPos.areaMap.x == x && playerPos.areaMap.y == y) exClass = "youAreHere";
            var toAdd = '<span class="placeMapMarker '+exClass+'">['+placeMap[y][x].type+']</span>';
            gm += toAdd;
        }
        gm += '<br>';
    }
    
    if (which == 'gameMap') {
        mapTest.style.background = 'url(./img/map.png)';
        mapTest.style.backgroundSize = '480px 480px';
        mapTest.style.width = '480px';
    }
    if (which == 'placeMap') {
        mapTest.style.background = 'url(./img/map.png)';
        mapTest.style.backgroundSize = '1440px 1440px';
        mapTest.style.width = '480px';
        mapTest.style.backgroundPosition = -(playerPos.gameMap.x * 480)+'px '+-(playerPos.gameMap.y * 480)+'px';
    }
    if (which == 'screenMap') {
        var btype = placeMap[playerPos.areaMap.y][playerPos.areaMap.x];
        var f = btype.type+'.png';
        mapTest.style.background = 'url(./img/test/'+f+')';
        mapTest.style.width = '480px';
        mapTest.style.height = '480px';
        mapTest.style.backgroundSize = '480px 480px';
        var i = '';
        if (btype.type == 'town' || btype.type == 'city' || btype.type == 'capital') {
            i = '<h2>Tienda de '+btype.type+'</h2>';
            var items = [0, 1, 2, 3, 4];
            i += drawShop(items);
        }
        gm = '<div style="width: 480px; height: 480px; overflow-y: scroll; background-color: rgba(255, 255, 255, 0.5)">'+i+'</div>';
    }
    
    
    mapTest.innerHTML = gm;
}
function drawShop(itemIDs) {
    var i = '';
    for (var e in itemIDs) {
        var id = itemIDs[e];
        var item = itemList[id];
        i += '<div class="button shopItem" title="'+JSON.stringify(item)+'" onclick="buyItem('+id+', '+item.basePrice+')">'+item.name+' ('+item.basePrice+'G)</div>';
    }
    return i;
}
function buyItem(item, price) {
    var it = itemList[item];
    var pl = ldls.players[0];
    if (pl.gold < price) alert('No tienes dinero para comprar eso. Necesitas '+price+'G');
    if (pl.gold >= price) {
        pl.gold -= price;
        pl.inventory.push(it);
        alert('Has comprado '+JSON.stringify(it)+' con éxito.');
        update();
    }
}
function seeMap(which) {
    selectedMap = which;
    update();
}
function move(from, direction) {
    return {
        'x': from.x + getDirection(direction, 0),
        'y': from.y + getDirection(direction, 1)
    }
}
function getDirection(direction, place) {
    var dirNames = {
        'up': 0,
        'right': 1,
        'down': 2,
        'left': 3,
        
        'upright': 4,
        'downright': 5,
        'upleft': 6,
        'downleft': 7,
    }
    if (isNaN(direction)) direction = dirNames[direction];
    return [
        [0, -1], //Arriba
        [1, 0],  //Derecha
        [0, 1],  //Abajo
        [-1, 0], //Izquierda
        
        [1, -1], //Arriba derecha
        [1, 1], //Abajo derecha
        [-1, -1], //Arriba izquierda
        [-1, 1], //Abajo derecha
    ][direction][place];
}
function moveGuy(direction) {
    var guyPos = ldls.players[0].position;
    
    guyPos.areaMap = move(guyPos.areaMap, direction);
    
    if (guyPos.areaMap.x < 0) {
        guyPos.gameMap.x--;
        if (guyPos.gameMap.x < 0) {
            guyPos.gameMap.x = 0;
            guyPos.areaMap.x = 0;
        }
        else {
            guyPos.areaMap.x = (gameMap[guyPos.gameMap.y][guyPos.gameMap.x].places.length - 1);
        }
    }
    if (guyPos.areaMap.y < 0) {
        guyPos.gameMap.y--;
        if (guyPos.gameMap.y < 0) {
            guyPos.gameMap.y = 0;
            guyPos.areaMap.y = 0;
        }
        else {
            guyPos.areaMap.y = (gameMap[guyPos.gameMap.y][guyPos.gameMap.x].places[0].length - 1);
        }
    }
    
    if (guyPos.areaMap.x >= gameMap[guyPos.gameMap.y][guyPos.gameMap.x].places.length) {
        var maxWidth = gameMap[guyPos.gameMap.y][guyPos.gameMap.x].places.length - 1;
        guyPos.gameMap.x++;
        if (guyPos.gameMap.x >= gameMap.length) {
            guyPos.gameMap.x = gameMap.length - 1;
            guyPos.areaMap.x = maxWidth;
        }
        else {
            guyPos.areaMap.x = 0;
        }
    }
    if (guyPos.areaMap.y >= (gameMap[guyPos.gameMap.y][guyPos.gameMap.x].places[0].length)) {
        var maxHeight = gameMap[guyPos.gameMap.y][guyPos.gameMap.x].places[0].length - 1;
        guyPos.gameMap.y++;
        if (guyPos.gameMap.y >= gameMap[0].length) {
            guyPos.gameMap.y = gameMap[0].length - 1;
            guyPos.areaMap.y = maxHeight;
        }
        else {
            guyPos.areaMap.y = 0;
        }
    }

    
    update();
}
function drawMovementMap(visionX, visionY) {
    var mainPlayer = ldls.players[0];
    if (!mainPlayer) return;
    var myPos = {
        'x': mainPlayer.posX,
        'y': mainPlayer.posY,
    }
    mapDiv.style.width = (map.length * 8)+'px';
    mapDiv.style.height = (map.length * 8)+'px';
    var m = '';
    for (var y = 0; y < map.length; y++) {
        var thisRow = map[y];
        for (var x = 0; x < thisRow.length; x++) {
            m += '<span class="tile '+thisRow[x]+'" style="top: '+(y * 8)+'px; left: '+(x * 8)+'px"></span>';
        }
        
    }
    return m;
}


function increaseValue(num) {
    ldls.value += num;
    update('game_value');
}
function resetVariables(hard) {
    if (hard) {
        ldls = {};
        localStorage.removeItem('ldls');
        saveGame();
        loadGame();
        window.location = window.location;
    }
    if (!ldls.value) ldls.value = 0;
}
function saveGame() {
    localStorage.setItem('ldls', JSON.stringify(ldls));
    notification('Game Saved');
}
function loadGame() {
    var losto = localStorage.getItem('ldls');
    if (!losto) return;
    ldls = JSON.parse(losto);
    notification('Game Loaded');
}
function update(step) {
    document.title = gameInfo.name+' '+gameInfo.version;

    if (!ldls) return;
    if (!ldls.players) return;

    if (ldls.players[0]) {
    	playerStats.innerHTML = printPlayerData(ldls.players[0]);
    	classSelector.style.display = 'none';
    	drawInventory(ldls.players[0]);
    }
    if (!ldls.players[0]) {
        classSelector.style.display = 'inline-block';
        mapTest.style.display = 'none';
    }
    clanList.innerHTML = drawSquadList();
    getMap(selectedMap);
}
function time() {
    var d = new Date();
    return '['+d.getUTCHours()+':'+d.getUTCMinutes()+':'+d.getUTCSeconds()+'] ';
}
function addToLog(what, notify) {
    gameLog.innerHTML += '<br>'+time()+what;
    if (notify) notification(what);
    
    gameLog.scrollTop = gameLog.scrollHeight;
}
$('body').on('keypress', function(evt) {
    var key = String.fromCharCode(evt.charCode).toLowerCase();
    if (key == 'q') moveGuy('upleft');
    if (key == 'w') moveGuy('up');
    if (key == 'e') moveGuy('upright');
    if (key == 'a') moveGuy('left');
    if (key == 'd') moveGuy('right');
    if (key == 'z') moveGuy('downleft');
    if (key == 'x') moveGuy('down');
    if (key == 'c') moveGuy('downright');
});

var selectedMap = 'gameMap';
var ldls = {};
var gameInfo = {
    'name': 'LDLS',
    'version': changes(changelog).latestVersion,
    'changelog': changes(changelog).changelog,
}
loadGame();
resetVariables();
var t = setInterval(saveGame, 60000);
var skillSelector = false;
setInterval(update, 5000);
update();