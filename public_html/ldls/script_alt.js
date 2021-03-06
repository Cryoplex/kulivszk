var CHUNK_WIDTH = 39;
var CHUNK_HEIGHT = 29;

function Player(name, role, clanID) {
    this.name = name;
    this.role = role; //Rol seleccionado por el usuario
    this.level = 1; //El nivel básico es 1
    this.experience = 0; //Los jugadores empiezan a 0 de experiencia
    this.pv = 0; //Puntos de vida actuales
    this.pvx = 0; //Puntos de vida totales
    this.pa = 0; //Puntos de acción actuales
    this.pax = 0; //Puntos de acción totales
    this.ph = 5; //Los jugadores empiezan con 5 puntos de habilidad listos para gastar
    
    this.health = rand(350, 450); //Vida básica
    this.action = rand(150, 250); //Puntos de acción básicos
    this.attack = rand(50, 150); //Ataque básico
    this.defense = rand(50, 150); //Defensa básica
    this.speed = rand(50, 150); //Velocidad básica
    this.knowledge = rand(50, 150); //Sabiduría básica
    this.clan = clanID;
    this.gold = 1000; //El jugador empieza con 1000 oro.
    this.inventory = [];
    this.equipment = new Equipment();
    
    this.posX = 0;
    this.posY = 0;
    
    var clan = ldls.squads[clanID].clan;
    var csp = clanStartingPositions[clan];
    this.position = {
        'gameMap': {'x': csp.x, 'y': csp.y},
        'areaMap': {'x': 0, 'y': 0},
        'screenMap': {'x': 0, 'y': 0},
    };
    
    if (role == 'warrior') {
        this.health += 50;
        this.defense += 50;
        this.speed -= 50;
        this.knowledge -= 50;
    }
    if (role == 'hunter') {
        this.attack += 50;
        this.speed += 50;
        this.health -= 50;
        this.knowledge -= 50;
    }
    if (role == 'thief') {
        this.speed += 100;
        this.defense -= 50;
        this.attack -= 50;
    }
    if (role == 'mage') {
        this.knowledge += 100;
        this.health -= 50;
        this.attack -= 50;
    }
}
function Equipment() {
    this.weapon = -1;
    this.head = -1;
    this.body = -1;
    this.boots = -1;
    this.accesory = -1;
    this.shield = -1;
}
function calculateLevelUp(player) {
    var nextLevel = player.level + 1;
    var expToNextLevel = Math.pow(nextLevel, 3);
    if (player.experience >= expToNextLevel) {
        player.experience -= expToNextLevel;
        levelUp(player);
    }
}
function getBaseStatByID(id) {
    var basesByID = [
        'health', 'action', 'attack', 'defense', 'speed', 'knowledge',
        ];
    if (id) return basesByID[id];
    if (id == '$') return basesByID.length;
}
function levelUp(player) {
    var oldPlayer = JSON.parse(JSON.stringify(player));
    player.level++;
    addToLog('¡Subes al nivel '+player.level+'!', 1);
    var toPH = rand(1,3);
    player.ph += rand(1,3);
    
    var names = [
        ['health', 'Puntos de Vida'], ['action', 'Puntos de Acción'],
        ['attack', 'Ataque'], ['defense', 'Defensa'],
        ['speed', 'Velocidad'], ['knowledge', 'Sabiduría'],
    ];
    
    for (var n in names) {
        addToLog(statDifference(player, names[n][0], oldPlayer)+' '+names[n][1]);
    }
    var pvDiff = getPlayerData(player, 'health') - getPlayerData(oldPlayer, 'health');
    
    player.pv += pvDiff;
    
    addToLog('Recibes '+toPH+' puntos de habilidad.');
    
    calculateLevelUp(player);
}
function statDifference(player, stat, old) {
    var newStat = getPlayerData(player, stat);
    var oldStat = getPlayerData(old, stat);
    var difference = newStat - oldStat;
    return '+'+difference;
}
function addExperience(player, amount) {
    player.experience += amount;
    calculateLevelUp(player);
}
function getEquipmentModifier(player, stat) {
    var equip = player.equipment;
    var add = 0;
    for (var equipedItem in equip) {
        var item = equip[equipedItem];
        if (item < 0) continue;
        item = player.inventory[parseInt(item)];
        if (!item) return 0;
        if (item[stat]) add += item[stat];
    }
    return add;
}
function getPlayerData(player, dat, equipMode) {
    var levelModifier = (player.level / 100);
    var extra = 5;
    var equipMod = getEquipmentModifier(player, dat);
    if (equipMode) return equipMod;
    extra += equipMod;
    if (dat == 'health') extra += 15;
    if (dat == 'action') extra += 5;
    
    if (dat == 'role') {
        return {
            'warrior': 'Guardián',
            'hunter': 'Cazador',
            'thief': 'Rastreador',
            'mage': 'Ilusionista',
        }[player.role];
    }
    
    return Math.floor((levelModifier * player[dat]) + extra);
}
function newPlayer(name, role) {
    if (!name) name = playerName.value;
    var val = roleSelector.selectedIndex;
    if (!role) role = ['warrior', 'hunter', 'thief', 'mage'][val];
    var clanID = clanSelector.selectedIndex;
    ldls.players.push(new Player(name, role, clanID));
    $('#classSelector').fadeOut(1000);
    mapTest.style.display = 'inline-block';
    $('#gameButtons').slideDown(1000);
    update();
}
function healPlayer(playerID, amount) {
    var player = ldls.players[playerID];
    var maxpv = getPlayerData(player, 'health');
    player.pv += amount;
    if (player.pv > maxpv) player.pv = maxpv;
    if (player.pv < 0) player.pv = 0;
    update();
}
function givePlayerActionPoints(playerID, amount) {
    var player = ldls.players[playerID];
    var maxpa = getPlayerData(player, 'action');
    player.pa += amount;
    if (player.pa > maxpa) player.pa = maxpa;
    if (player.pa < 0) player.pa = 0;
    update();
}
function calculateExpGain(fromLevel, toLevel, condition) {
    var base = Math.pow((toLevel + 1), 2);
    var conditions = {
        'wild': 1,
        'player': 1.5,
        'midboss': 2,
        'boss': 2.5,
        'god': 3,
    }
    if (!condition) condition = 'wild';
    var difference = toLevel / fromLevel;
    base *= difference;
    base *= conditions[condition];
    return Math.ceil(base);
}
function buySkill(playerID, skillID) {
    var player = ldls.players[playerID];
    var skill = skills[skillID];
    
    if (player.ph < 1) {
        notification('No tienes puntos de habilidad.');
        return;
    }
    player.ph--;
    
    var e1 = skill.effect1;
    var e2 = skill.effect2;
    
    player[e1] += e2;
    addToLog('<small><i>[DEBUG] Variable '+e1+' aumentado en '+e2+'</i></small>', 1);
    update();
}
function Skill(name, description, effect1, effect2) {
    this.name = name;
    this.description = description;
    this.effect1 = effect1;
    this.effect2 = effect2;
}
function Squad(clanID) {
    this.clan = clanID;
    this.name = getSquadName(clanID)
}
function drawSquadList() {
    var o = '';
    
    var l = '';
    var clans = [
        'Luz', 'Agua', 'Hielo', 'Tierra', 'Viento', 'Rayo', 'Fuego', 'Sombra'
    ];
    
    for (var dsl in ldls.squads) {
        var sq = ldls.squads[dsl];
        var clanID = sq.clan;
        var ta = '['+clans[clanID]+'] '+sq.name;
        l += ta+'<br>';
        o += '<option>'+ta+'</option>';
    }
    if (clanSelector.selectedIndex < 1) clanSelector.innerHTML = o;
    return l;
}

function levelUpTest() {
    var enemyLevel = parseInt(enemyLevelTest.value);
    addToLog('Atacas al monstruo de nivel '+enemyLevel+' y lo derrotas.');
    var exp = calculateExpGain(ldls.players[0].level, enemyLevel);
    addToLog('Ganas '+exp+' puntos de experiencia.');
    addExperience(ldls.players[0], exp);
    update();
}
function getSquadName(clanID) {
    var clans = [
        'light', 'darkness', 'fire', 'water', 'earth', 'wind', 'ice', 'lightning'
    ];
    var clan = clans[clanID]
    var gender = red('male', 'female');
    var p = (gender == 'male') ? 'Los ' : 'Las ';
    var adj = read(adjectives[clan]);
    
    if (adj.match('-')) {
        if (gender == 'male') adj = adj.replace('-', 'o');
        if (gender == 'female') adj = adj.replace('-', 'a');
    }
    if (adj.match(',')) {
        if (gender == 'male') adj = adj.replace(',', 'e');
        if (gender == 'female') adj = adj.replace(',', 'a');
    }
    
    return p + read(animals[gender]) + ' ' + adj;
}
function generateMap(map, width, height, mapType) {
    for (var y = 0; y < height; y++) {
        map[y] = [];
        for (var x = 0; x < width; x++) {
            map[y][x] = morphMapTile(worldMap, x, y, 'world');
        }
    }
}
function drawMap(map) {
    mapDiv.style.width = (map.length * 8)+'px';
    mapDiv.style.height = (map.length * 8)+'px';
    var m = '';
    for (var y = 0; y < map.length; y++) {
        var thisRow = map[y];
        for (var x = 0; x < thisRow.length; x++) m += '<span class="tile '+thisRow[x]+'" style="top: '+(y * 8)+'px; left: '+(x * 8)+'px"></span>';
    }
    return m;
}

function morphMapTile(map, posX, posY, mapType) {
    var surroundTiles = [];
    if (map[posY - 1] && map[posY - 1][posX]) surroundTiles.push(map[posY - 1][posX]);
    if (map[posY + 1] && map[posY + 1][posX]) surroundTiles.push(map[posY + 1][posX]);
    if (map[posY] && map[posY][posX - 1]) surroundTiles.push(map[posY][posX - 1]);
    if (map[posY] && map[posY][posX + 1]) surroundTiles.push(map[posY][posX + 1]);
    
    if (surroundTiles.length < 1) surroundTiles.push(read(tiles[mapType]));
    
    var select = read(surroundTiles);
    if (!rand(0,2)) {
        var ix = tiles[mapType].indexOf(select);
        ix += red(-1, 1);
        var morph = tiles[mapType][ix];
        if (morph) select = morph;
    }
    return select;
}
function MapArea(name) {
    this.name = name;
    this.places = [];
    for (var may = 0; may < 5; may++) {
        this.places[may] = [];
        for (var max = 0; max < 5; max++) {
            var toAdd = new Place(read(placeTypes));
            if (may == 2 && max == 2) toAdd = new Place('capital');
            this.places[may][max] = toAdd;
        }
    }
}
function Place(type) {
    this.type = type;

    //this.squares = new Dungeon(CHUNK_WIDTH, CHUNK_HEIGHT); //DEBUG
}
function Dungeon(width, height) {
    var arr = [];

    //Genera un mapa vacío
    for (var y = 0; y < height; y++) {
        arr[y] = [];
        for (var x = 0; x < width; x++) {
            arr[y][x] = new Square(x, y, 'void');
        }
    }

    //Genera habitaciones al azar
    var attempts = 10; //El número máximo de fallos que se permiten cometer a la hora de colocar habitaciones
    while (attempts > 0) {
        console.log('Dungeon generator attempts '+attempts);
        //Elige un tamaño de la habitación, que es un número del 0*2+5 (5) al 3*2+5 (11), conteniendo sólo números impares
        var sizex = (rand(0, 3) * 2) + 5;
        var sizey = (rand(0, 3) * 2) + 5;

        //Selecciona dos coordenadas al azar.
        //Empieza a contar 3 casillas desde 0 y no se pasa de la longitud de la habitación, para evitar que esté muy cerca del borde
        var maxwidth = width - sizex - 3;
        var maxheight = height - sizey - 3;
        var rx = rand(3, maxwidth);
        if (rx % 2 != 0) rx--;
        var ry = rand(3, maxheight);
        if (ry % 2 != 0) ry--;
        var maxx = rx + sizex;
        var maxy = ry + sizey;

        //Comprueba si no hay otra habitación en el área
        var from = {'x': rx, 'y': ry};
        var to = {'x': maxx, 'y': maxy};
        var clean = checkForRooms(arr, from, to);

        if (clean) checkForRooms(arr, from, to, true); //Genera un cuarto
        if (!clean) {
            //Si no puede crear una habitación ahí, elimina uno de los intentos.
            attempts--;
        }
    }
    //Genera caminos al azar
    while (getNewOddVoid(arr)) {
        var oddVoid = getNewOddVoid(arr);
        arr[oddVoid.y][oddVoid.x] = new Square(oddVoid.x, oddVoid.y, 'path_raw');
        expandPath(arr, oddVoid.x, oddVoid.y);
    }


    return arr;
}
function expandPath(array, x, y, direction) {
    var directions = {
    'left': {'x': (x - 2), 'y': y},
    'right': {'x': (x + 2), 'y': y},
    'top': {'x': x, 'y': (y - 2)},
    'bottom': {'x': x, 'y': (y + 2)},
    };
    var directions2 = {
    'left': {'x': (x - 1), 'y': y},
    'right': {'x': (x + 1), 'y': y},
    'top': {'x': x, 'y': (y - 1)},
    'bottom': {'x': x, 'y': (y + 1)},
    };
    if (!direction) direction = read(['left', 'right', 'top', 'bottom']);

    var minx = 0;
    var miny = 0;
    var maxx = array[0].length;
    var maxy = array.length;

    var dir = directions[direction];
    var dir2 = directions2[direction];
    if (isLimit(array, dir.x, dir.y)) return;
    var check = array[dir.y][dir.x];
    var check2 = array[dir2.y][dir2.x];

    if (check.type == 'path') {
        array[dir2.y][dir2.x] = new Square(dir2.x, dir2.y, 'path');
    }
    array[y][x] = new Square(x, y, 'path');
}
function pathFind(array, from, to) {

}
function isLimit(array, checkx, checky) {
    var minx = 0;
    var miny = 0;
    var maxx = (array[0].length - 1);
    var maxy = (array.length - 1);

    if (checkx <= minx || checkx >= maxx) return true;
    if (checky <= miny || checky >= maxy) return true;
}
function getNewOddVoid(array) {
    for (var y in array) {
        if (y % 2 == 0) continue;
        for (var x in array[y]) {
            if (x % 2 == 0) continue;
            var square = array[y][x];
            if (square.type == 'void') return {'x': x, 'y': y};
        }
    }
}
function checkForRooms(array, from, to, drawMode) {
    var ry = from.y;
    var rx = from.x;
    var maxy = to.y;
    var maxx = to.x;

    if (!drawMode) {
        rx--;
        ry--;
        maxx++;
        maxy++;
    }

    var clean = true;
    var bwalls = [];
    for (var cy = ry; cy < maxy; cy++) {
        for (var cx = rx; cx < maxx; cx++) {
            if (drawMode) {
                if (cx == rx || cx == (maxx - 1) || cy == ry || cy == (maxy - 1)) {
                    var corners = {
                        'topleft': (cx == rx && cy == ry),
                        'topright': (cx == (maxx - 1) && cy == ry),
                        'botleft': (cx == rx && cy == (maxy - 1)),
                        'botright': (cx == (maxx - 1) && cy == (maxy - 1)),
                    }
                    if (corners.topleft || corners.topright || corners.botright || corners.botleft) {
                        array[cy][cx] = new Square(cy, cx, 'corner');
                    }
                    else {
                        if (cx % 2 == 1 || cy % 2 == 1) {
                            array[cy][cx] = new Square(cy, cx, 'bwall');
                            bwalls.push({'x': cx, 'y': cy});
                        }
                        else {
                            array[cy][cx] = new Square(cy, cx, 'wall');
                        }
                    }
                }
                else {
                    array[cy][cx] = new Square(cy, cx, 'room');
                }
            }
            if (array[cy][cx].type == 'room' && !drawMode) {
                clean = false;
                break;
            }
        }
    }
    if (drawMode) {
        do {
            //Selecciona un muro aleatorio (rompible)
            var rw = read(bwalls);
            var rwx = rw.x;
            var rwy = rw.y;
            array[rwy][rwx] = new Square(rwx, rwy, 'door');
        } while (rand(0,1));
    }
    return clean;
}
function Square(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
}
function Item(prototype) {
    var vals = ['type', 'name', 'basePrice', 'health', 'action', 'attack', 'defense', 'speed', 'knowledge', 'sprite'];
    this.type;
    this.name;
    this.basePrice;
    this.sprite = 'sprite_item';

    this.health;
    this.action;
    this.attack;
    this.defense;
    this.speed;
    this.knowledge;

    if (prototype) {
        for (var p in vals) {
            var val = vals[p];
            if (prototype[val] != undefined) this[val] = prototype[val];
        }
    }
}

var tiles = {
    'world': [
        'tile_deepSea',
        'tile_sea',
        'tile_beach',
        'tile_plains',
        'tile_forest',
        'tile_highland',
        'tile_mountain',
    ],
    'city': [
    ],
    'town': [
    ],
    'dungeon': [
    ],
}
var placeTypes = [
    'town',
    'city',
    'forest',
    'mountain',
    'plains',
    'dungeon',
    'tower',
    'evil',
    'witch_house',
    'dragon_den',
]
var worldMap = [];
generateMap(worldMap, 30, 30, 'world');
var detailMap = [];
generateMap(detailMap, 300, 300, 'world');

var gameMap = [ [ new MapArea('lightArea'),   new MapArea('waterArea'), new MapArea('iceArea')    ],
                [ new MapArea('earthArea'),   new MapArea('evilArea'),  new MapArea('windArea')   ],
                [ new MapArea('thunderArea'), new MapArea('fireArea'),  new MapArea('shadowArea') ], ];
var clanStartingPositions = [
    {'x': 0, 'y': 0}, {'x': 1, 'y': 0}, {'x': 2, 'y': 0},
    {'x': 0, 'y': 1},                   {'x': 2, 'y': 1},
    {'x': 0, 'y': 2}, {'x': 1, 'y': 2}, {'x': 2, 'y': 2},
];

var animals = {
'male': [
"Alces", "Antílopes", "Arenques", "Atunes", "Bueyes", "Búfalos", "Búhos", "Buitres", "Burros", "Caballos", "Caimanes", "Calamares", "Camaleones", "Camarones", "Camellos", "Canarios", "Cangrejos", "Canguros", "Caracoles", "Castores", "Cerdos", "Chacales", "Chimpances", "Chinches", "Ciervos", "Cisnes", "Cocodrilos", "Colibries", "Conejos", "Cuervos", "Dromedarios", "Elefantes", "Erizos", "Escarabajos", "Escorpiones", "Flamencos", "Gallos", "Gansos", "Gatos", "Gorilas", "Gorriones", "Grillos", "Guepardos", "Gusanos", "Halcones", "Hipopotamos", "Hurones", "Jabalies", "Koalas", "Leones", "Leopardos", "Linces", "Lobos", "Loros", "Mamuts", "Manatíes", "Mandriles", "Mapaches", "Mejillones", "Monos", "Murciélagos", "Osos", "Pájaros", "Patos", "Pavos", "Pelícanos", "Periquitos", "Perros", "Pingüinos", "Pollos", "Potros", "Pulpos", "Pumas", "Ratones", "Renos", "Rinocerontes", "Ruiseñores", "Salmones", "Saltamontes", "Sapos", "Tejones", "Terneros", "Tiburones", "Tigres", "Topos", "Toros", "Tritones", "Tucanes", "Visones", "Zorros"
],
'female': [
"Abejas", "Águilas", "Anchoas", "Anguilas", "Arañas", "Ardillas", "Avestruces", "Avispas", "Babosas", "Ballenas", "Cabras", "Cebras", "Cigarras", "Cobayas", "Codornices", "Comadrejas", "Cucarachas", "Delfines", "Focas", "Gacelas", "Gallinas", "Garrapatas", "Gaviotas", "Golondrinas", "Grullas", "Hienas", "Hormigas", "Urracas", "Iguanas", "Jirafas", "Lagartijas", "Langostas", "Libelulas", "Liebres", "Llamas", "Lombrices", "Luciérnagas", "Mantis", "Mariposas", "Marmotas", "Medusas", "Mofetas", "Morsas", "Moscas", "Mulas", "Nutrias", "Orcas", "Palomas", "Panteras", "Orugas", "Ostras", "Ovejas", "Polillas", "Pulgas", "Ranas", "Ratas", "Salamandras", "Sardinas", "Serpientes", "Tortugas", "Truchas", "Vacas", "Víboras", "Yeguas",
]
};
var adjectives = {
'light': ["Blanc-s", "Sagrad-s", "Luminos-s", "Sant-s", "Celestiales", "Angelicales"],
'darkness': ["Negr-s", "Malvad-s", "Odios-s", "Oscur-s", "Caníbales", "Sarnos-s", "Apestos-s", "Podrid-s", "Infernales", "Mortales", "Letales", "Mortífer-s", "Grotesc-s", "Asqueros-s", "Demoníac-s"],
'fire': ["Roj-s", "Ardientes", "Furios-s", "Loc-s", "Caluros-s", "Volcánic-s"],
'water': ["Azules", "Grumos-s", "Gelatinos-s"],
'earth': ["Dur-s", "Terrestres", "Rocos-s", "Aplastador,s", "Bestiales", "Brutales"],
'wind': ["Ladron,s", "Asesin-s", "Sigilos-s"],
'ice': ["Frí-s", "Frígid-s", "Helad-s", "Escalofriantes", "Congelad-s"],
'lightning': ["Astut-s", "Trampos-s", "Rápid-s"],
}
var itemList = [
new Item({'name': 'Objeto', 'basePrice': 100}),
new Item({'name': 'Cosa', 'basePrice': 50}),
new Item({'name': 'Espada', 'basePrice': 300, 'attack': 5, 'sprite': 'sprite_sword'}),
new Item({'name': 'Pocion', 'basePrice': 10}),
new Item({'name': 'Escudo', 'basePrice': 10, 'defense': 5, 'sprite': 'sprite_shield'}),
];

if (!ldls.players) ldls.players = [];
var skills = [];
skills.push(new Skill('Ataque', 'Aumenta el ataque máximo.', 'attack', 10));
skills.push(new Skill('Defensa', 'Aumenta la defensa máxima.', 'defense', 10));
skills.push(new Skill('Velocidad', 'Aumenta la velocidad máxima.', 'speed', 10));
skills.push(new Skill('Sabiduría', 'Aumenta la sabiduría máxima.', 'knowledge', 10));
skills.push(new Skill('Energía', 'Aumenta los PA máximos.', 'action', 20));
skills.push(new Skill('Resistencia', 'Aumenta los PV máximos.', 'health', 40));

if (!ldls.squads) {
    ldls.squads = [];
    for (var x = 0; x < 9; x++) {
        for (var xx = 0; xx < 3; xx++) ldls.squads.push(new Squad(x));
    }
}
drawSquadList();

setInterval(function() {
    for (var p in ldls.players) givePlayerActionPoints(p, 0.2);
}, 1000);