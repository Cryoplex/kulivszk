/*
BUGS

FIXES


FEATURES



0.0.1 null
0.0.2 El movimiento de una unidad ahora sólo puede subir mediante Uvas Arcoiris
0.0.3 El hielo ya no causa movimiento infinito cuando se pasa de hielo-escarcha o hielo-hielo muchas veces.
0.1.0 Los agujeros impiden atacar y ser atacado, el barro reduce el ataque al 50%.
0.2.0 Añadido un botón para activar/desactivar la IA.
0.2.1 Cambiados los iconos del mapa por fondo transparente. Añadida la hierba como fondo del mapa.
0.2.2 El movimiento de las unidades es siempre 3 para Boy Scouts y Mapaches. 
0.2.3 El botón "Pasar Turno" ahora desaparece un momento tras ser pulsado, para evitar que se pulse accidentalmente.
0.2.4 Añadido un marco luminoso para los personajes que no han sido movidos todavía.
0.2.5 Cambiada la posición de la información sobre unidades/terreno de derecha a izquierda, para mayor visibilidad.
-LC-
0.3.0 Puedes construir torres y murallas. Pulsa la tecla W para construir una muralla, y la tecla T para una torre.
0.4.0 Añadidas trampas: Mina explosiva, Veneno, Agujero con pinchos, Baya Mala y Roca Puntiaguda. Pulsa R para añadir una trampa. (Cuestan 8ç/limones)
0.5.0 Cambiado el nombre a "Lemontactics!"
-I-
0.5.1 Corregido un bug que causaba las nuevas unidades invocadas permanecer inmóviles si ya había una unidad en ese mismo sitio.
0.5.2 Ya no es posible pulsar el botón "Pasar Turno" durante el turno de la IA.
0.5.3 La IA ya no invoca unidades si los huecos están llenos.
0.5.4 Ahora la IA intenta invocar unidades sólo al final de cada turno.
0.5.5 La IA ya no intenta salirse del mapa si hay demasiados obstáculos en su camino.
0.5.6 Arreglado un bug que hacía las notificaciones del ratón ilegibles.
0.5.7 Arreglado un bug que causaba el dinero gastarse aunque una construcción no se hubiese finalizado.
0.5.8 Las murallas, torres y trampas ya no se pueden construir encima de otras unidades.
0.5.9 Arreglado un bug que causaba las trampas y otras construcciones ser construidas al moverse a otra casilla si la última vez que se intentaron construir hubo errores.
0.5.10 Ahora es posible empezar una nueva partida tras terminar otra sin recargar la página.
0.5.11 Arreglado un bug que causaba que las torres gastasen el ataque al hacer click en un lugar vacío.
0.5.12 La IA ahora no ataca a los muros en diagonal si puede rodearlos.
0.5.13 Movimiento de las unidades aumentado a 4.
0.5.14 La IA ya no se suicida contra unidades contra las que puede perder.
0.6.0 Grandes mejoras en la IA.
0.7.0 Las torres ahora contraatacan y además atacan al primer objetivo a la vista (Primero vertical y luego horizontal)
0.7.1 Cambiada la altura del mapa a 13 tiles para que sea simétrico.
0.7.2 Limones que obtienen los mapaches por turno (al inicio) reducidos a 16. ç que reciben los scouts (al inicio) reducidos a 16.
0.7.3 Movimiento en hielo/escarcha aumentados para evitar ciclos infinitos de la IA intentando ir por el hielo.
0.7.4 Ahora las torres sólo se pueden construir en tu lado del campo.
0.7.5 Cambiadas las animaciones de unidades inactivas.
0.7.6 Ahora el cursor de selección cambia de color cuando entras en modo de construcción y se vuelve rojo si está fuera de los límites.
0.7.7 El cursor de selección se vuelve rojo si no es posible construir algo en ese lugar. (Ya sea porque no hay dinero o no se puede encima de otra cosa.)
0.7.8 Ahora el cursor muestra un fantasma del edificio a construir cuando entras en modo de construcción.
0.7.9 Al pulsar la tecla E, se deja de construir.
0.8.0 Añadido un marcador que determina cuantos puntos tiene cada jugador y quien va ganando.
0.8.1 El estado de los enemigos ahora se muestra debajo del ratón.
0.8.2 Añadido un especulador de combates que te dice si vas a ganar o perder o empatar al pasar el ratón por encima de una unidad enemiga. (Ganar se considera reducir los HP del enemigo a cero y viceversa.)
0.9.0 Añadidas las tácticas de combate para la IA.
0.9.1 Añadida la táctica Agresiva. Es la táctica predefinida que siguen todas las unidades.
0.9.2 Añadida la táctica Defensiva. La IA sólo ataca a unidades de igual o menor nivel.
0.9.3 Añadida la táctica Protector. La IA intenta no separarse de sus aliados.
0.9.4 Añadida la táctica Patrulla. La IA se mueve sólo de arriba a abajo y rara vez hacia los lados.
0.9.5 Añadida la táctica Estratega. La IA hace lo posible por capturar la base enemiga.
0.9.6 Añadida la táctica Pasivo. La IA sólo ataca a quien le ataca primero.
0.10.0 Añadidas las aguas termales. Las unidades que pasan por ellas obtienen un estado de regeneración que aumenta 1HP/movimiento durante un mínimo de 3.
0.11.0 Añadido el modo supervivencia.
0.11.1 Añadido el modo supervivencia "Zombie" y el modo supervivencia "Vampiro".
0.11.2 Si un boy scout muere por un zombie, se convierte en un zombie.
0.11.3 Si un boy scout muere por un vampiro, se convierte en un mordido.
0.11.4 Añadidos niveles de dificultad para el modo supervivencia. Cada turno la dificultad aumenta en 0.1.
0.11.5 Añadidos jefes cada 10 niveles de dificultad en modo supervivencia.
0.11.6 Añadido el modo supervivencia "CAOS" donde se generan unidades aleatorias de todas las que existen.
0.11.7 El número máximo de enemigos a generar aumenta en +1 cada 10 niveles.
0.11.8 La IA ahora ataca a presas fáciles si puede ganar al 100%, ignorando cualquier objetivo.
0.11.9 La vida ahora puede ir más allá del 10. (De momento sólo en caso de modo supervivencia)
0.11.10 Los sabios ya no se mueven al atacar.
0.11.11 Aumentado el movimiento de los sabios de 1 a 2.
0.11.12 Arreglado el movimiento de los sabios que les impedía moverse en direcciones rectas, sólo en diagonal.
0.11.13 Añadida la táctica de IA "Berseker", que intenta atacar a cualquier cosa que tenga al alcance. (Ideal para zombies)
0.11.14 Reducido el ataque de la torre de los mapaches. Aumentado el ataque de la torre de los boy scouts. Aumentado el precio de las torres.
0.11.15 Ahora las unidades con más de 10 HP muestran la vida correctamente en lugar de ser X/10 siempre.
0.11.16 Reducido el efecto de las aguas termales a 2 turnos.
	Si vuelves a entrar, se aumenta en otro turno más, y así sucesivamente.
	Reducido el coste de movimiento en aguas termales.
0.11.17 En los extremos izquierdo y derecho ya sólo puede generarse hierba.
0.11.18 Ahora en la zona inmediatamente después del spawn (Núcleos), no puede haber otra cosa que hierba. (Al generar el mapa)
0.11.19 Los sprites de los jefes son un 25% más grandes. (Antes eran un 100% más grandes y quedaba feo)
0.11.20 Ahora la vida de las unidades generadas en modo survival tiene más posibilidades de aumentar.
0.11.21 Las unidades tienen menos probabilidades de subir de nivel al matar a un enemigo cuanto mayor sea el nivel de la unidad.
0.12.0 Añadida la ventana de unidades. Puedes pulsar la tecla S para abrirla y seleccionar qué unidad generar.
0.12.1 Reducido el dinero que se obtiene cada turno.
0.12.2 Las unidades metidas en agujeros no pueden ser atacadas por torres. En su lugar se pasa a la siguiente unidad.
0.12.3 Las unidades generadas en modo supervivencia ahora se pueden mover en el turno en el que aparecen.
0.12.4 Las unidades generadas en modo supervivencia ahora suben de nivel en lugar de stats si la dificultad es alta.
0.12.5 Los iconos de las unidades ahora se ven en direcciones diferentes dependiendo del equipo al que pertenezcan
0.12.6 Las barras de vida de las unidades ahora se ven en distintos colores dependiendo del equipo.
0.12.7 Pulsando la tecla 'U' accedes al modo de mejora. Puedes subir el nivel de cualquier unidad, incluso torres.
0.12.8 Ahora se pueden personalizar algunas de las variables del juego al inicio.
0.13.0 Los arbustos con bayas han sido eliminados de la generación de mapas.
	Ahora las bayas crecen aleatoriamente cada turno.
0.13.1 Reducidas las probabilidades de que crezcan bayas a 1/10 cada turno.
0.14.0 Añadida temperatura. El mapa empieza a 20ºC.
0.14.1 La temperatura sube y baja cada turno. Cada turno hay un 10% de probabilidades de una ola de frío/calor.
0.14.2 Cuando la temperatura es menor a 0ºC. La hierba se convierte en escarcha y el agua en hielo.
0.14.3 Reducido el aumento/reducción de temperatura durante una ola e frío/calor.
0.14.4 Si la temperatura es mayor a 0, los charcos de agua tienen una probabilidad de evaporarse, mayor cuanta mayor la temperatura.
0.14.5 Eliminados escarcha y hielo de la generación del mapa.
0.14.6 Cada turno hay un 10% probabilidades de lluvia. Cuando llueve se forman charcos de agua en el suelo.
0.14.7 Probabilidades de lluvia reducidas al 5%.
0.14.8 Añadido un icono medidor de tiempo atmosférico.
0.14.9 Si una unidad permanece mucho tiempo a baja temperatura, su movimiento se ve reducido.
	Si una unidad pasa mucho tiempo a 45ºC de temperatura ambiente, comienza a recibir daño por insolación.
0.15.0 Añadido el modo carrera. Añadida la casilla "Corrupción" las casillas de corrupción corrompen casillas adyacentes.
0.15.1 Si la corrupción ha consumido toda una columna del mapa, esta desaparece para siempre.
0.15.2 En el modo carrera, cada equipo empieza con una unidad.
0.15.3 Permanecer mucho tiempo encima de la corrupción puede matarte.
0.15.4 La IA ya no construye en modo carrera.
0.15.5 Los zombies transmiten una enfermedad al atacar que resta la vida. Si alguien infectado ataca a otra unidad, ésta también es infectada.
0.15.6 Al enfocar una unidad se muestra su rango (De tenerlo) para ataques a distancia.
0.15.7 Morir en el modo carrera ahora supone una derrota instantánea. (No es necesario pasar turno)
0.15.8 El selector de unidad ahora desaparece al pasar turno.
0.15.9 El selector de unidades ahora puede cerrarse haciendo click fuera de él.
0.15.10 Las aguas termales ahora recuperan vida cada turno si sigues encima al final del mismo.
0.15.11 Arreglado un bug que causaba invocar mapaches en modos de juego diferentes a Ataque/Defensa si no se seleccionaba un modo de spawn.
0.15.12 Si una unidad sale fuera del mapa, es eliminada en el modo carrera y pasa a ser una derrota.
0.15.13 Organizada la posición de los botones y demás del juego.
0.15.14 Ahora la anchura y altura del juego depende de la pantalla del ordenador.
0.15.15 Ahora el proceso de spawn consta de dos fases: Primero se elige qué spawnear y después se spawnea al clickear.
0.15.16 Ahora la IA spawnea unidades más veces.
0.15.17 Eliminado el botón de cambio de spawn y la tecla de acceso directo "S".
0.15.18 Los equipos ahora tienen diferentes nombres en cada modo de juego.
0.15.19 Aumentado el dinero recibido por turno y al matar unidades enemigas.
0.16.0 Añadido el Manual (En Español)
0.17.0 Añadidas setas. Las setas recuperan 2HP de daño pero envenenan durante 2 turnos. Los gnomos son inmunes al efecto.
0.17.1 Añadidos gnomos. Los gnomos son inmunes al efecto de las setas, además van plantando setas, hierba, flores y arbustos allá donde pasan.
0.17.2 Añadidas hadas. Las hadas pueden curar a aliados.
0.17.3 Añadidos duendes. Los duendes pueden robar dinero a las unidades enemigas.
0.18.0 actualizado el menú
-S-
0.18.1 Agrandados los botones del selector de unidades.
0.18.2 Mejorado el rendimiento de la ayuda de rango. (Las casillas marcadas de rojo que indican el rango de la unidad)
0.18.3 Corregidos algunos retrasos de actualización del mapa.
0.18.4 Ahora las unidades son invocadas en el mismo sitio.
0.18.5 Atacar a otra unidad justo al lado hace más daño.
0.18.6 Las unidades hacen más daño ahora cuanta mayor sea la distancia ante su enemigo.
0.18.7 Añadidos más sonidos
0.18.8 Eliminadas las tácticas Patrulla y Protector.
0.18.9 Ahora aparece dinero en el mapa que se puede coger.
0.18.10 La IA ahora utiliza el modo Ascenso.
0.18.11 Aumentado el precio de los mapaches y los Boy Scouts a 14ç.
0.18.12 Aumentado el precio de mejora de unidades.
0.18.13 Cambios en precios de varias unidades.
0.18.14 Subido el HP de las unidades a 30.
0.18.15 Ahora las torres y murallas pueden construirse en cualquier terreno.
0.18.16 Una unidad encima de la base enemiga es eliminada al inicio del turno.
0.18.17 Reducido el precio de todas las construcciones.
1.0.0 Release
1.0.1 Translated 50% of the manual.

*/

//Modifyable vars
var RACCOON_PRICE = 14;
var SCOUT_PRICE = 14;
var WALL_PRICE = 8;
var TOWER_PRICE = 16;
var TRAP_PRICE = 4;
var HP_PER_LEVELUP = 0;
var MAX_COON_LEMONS = 25;
var MIN_COON_LEMONS = 2;
var LEMONADE_RATE = 0.5;
var LEMONADE_PRICE = 0.5;
var LEMON_RATE = 108;

var wind = $(window);
var recommendedWidth = Math.floor(wind.width() / 32);
var recommendedHeight = Math.floor(wind.height() / 32) - 3;

/*
var DEFAULT_WIDTH = 31;
var DEFAULT_HEIGHT = 13;
*/
var DEFAULT_WIDTH = (recommendedWidth / 2);
var DEFAULT_HEIGHT = 7;

var UNIT_MAXHP = 30;
var DEFAULT_TEMPERATURE = 20;
var AI_MAX_AGGRESSIVITY = 1;
var MIN_TEMPERATURE = -15;
var AVG_TEMPERATURE = 20;
var MAX_TEMPERATURE = 45;

var aiTurn = 0;
var aiLoop = 0;
var spawn = 0;
var aiFocus = 0;
var buildmode = '';
var spawnmode = '';
var upgrademode = false;
var gameStarted = 0;

var teamA = '';
var teamB = '';

var records = {};
var recordNames = [
translate('Unidades destruidas|Units destroyed'),
translate('Daño causado|Damage caused'),
translate('Curación total|Total heal'),
translate('Unidades creadas|Units spawned'),
translate('Movimientos totales|Total movements'),
translate('Dinero ganado|Money earned'),
translate('Subidas de nivel|Level ups')];

//Weather related
var temperature = AVG_TEMPERATURE;
var temperatureTarget = 20;
var temperatureWave;
var raining = false;

var survivalMode = 0;
var survivalLevel = 0;
var survivalBoss = false;
var versusMode = '';
var corruptionMode = false;
var raceMode = false;

var lastCursorX = 0;
var lastCursorY = 0;

var turn = 0;
var turnumber = 0;
var scouts = {};
var coons = {};
var tiles = [];
var focusedUnit = 0;
var tileList = ['sprite_grass', 'sprite_flower', 'sprite_rock', 'sprite_dirt', 'sprite_hole',
'sprite_weeds', 'sprite_grasshole', 'sprite_mud',
'sprite_bush',
'sprite_hotsprings', 'sprite_shroom', 'sprite_money'];
var raceTileList = [
'sprite_grass', 'sprite_flower', 'sprite_rock', 'sprite_dirt', 'sprite_hole', 'sprite_weeds', 'sprite_nettle',
'sprite_grasshole', 'sprite_frost', 'sprite_ice', 'sprite_mud', 'sprite_blueberry', 'sprite_purpleberry',
'sprite_bush', 'sprite_rainbowgrape', 'sprite_goldberry', 'sprite_wall_broken', 'sprite_tower_broken',
'sprite_cannon_broken', 'sprite_barbedWire_broken', 'sprite_trap',
'sprite_poison', 'sprite_spikehole', 'sprite_badberry', 'sprite_hotsprings', 'sprite_corrupt1', 'sprite_shroom',
'sprite_money',
];
var sages = ['sprite_sage1', 'sprite_sage2', 'sprite_sage3'];
var stands = ['sprite_stand1', 'sprite_stand2', 'sprite_stand3'];

var funnyMessages = [
translate('Lo tienes claro.|Of course.'),
translate('Vamos, no te quedes atrás.|Come on, do not hold back.'),
translate('Ya te has cansado?|You tired?'),
translate('Mi abuela corre más rápido.|My grandma runs faster.'),
translate('Si vas a la izquierda ganas.|If you go left you win.'),
translate('¡He pisado una mierda!|I stepped on shit!'),
translate('Quiero ir a casa...|I wanna go home...'),
translate('¿Te duelen las patas ya?|Do your paws hurt already?'),
translate('Veo la luz.|I can see the light.'),
translate('Estoy cansado de tí.|I\'m tired of you'),
translate('Quién me diera un coche.|I wish I had a car.'),
translate('Era para dar conversación.|Just wanted to start a conversation.'),
translate('No saben bien estas bayas.|Those berries are not that good.'),
];

var sagesL = [];
var standsL = [];
var dirs = ['left', 'right', 'up', 'down', 'upleft', 'upright', 'downleft', 'downright'];

var infotile = {
	'sprite_grass': translate('Hierba - Sin efectos en el movimiento.|Grass - No effects in movement.'),
	'sprite_sage1': translate('Sabio Rojo - Genera limones para el equipo Mapache.|Red Sage - Generates lemons for the Raccoon Team.'),
	'sprite_sage2': translate('Sabio Amarillo - Genera limones para el equipo Mapache.|Yellow Sage - Generates lemons for the Raccoon Team.'),
	'sprite_sage3': translate('Sabio Verde - Genera limones para el equipo Mapache.|Green Sage - Generates lemons for the Raccoon Team.'),
	'sprite_stand1': translate('Núcleo de Limones - Genera limones para el equipo Boy Scout|Lemon Nexus - Generates lemons for the Boy Scout Team.'),
	'sprite_stand2': translate('Núcleo de Limonada - Convierte los limones en limonada para el equipo Boy Scout|Lemonade Nexus - Converts lemons into lemonade for the Boy Scout Team.'),
	'sprite_stand3': translate('Núcleo de Dinero - Convierte la limonada en dinero para el equipo Boy Scout|Money Nexus - Exchanges lemonade into money for the Boy Scout Team.'),

	'sprite_sage1_broken': translate('Aquí solía haber un sabio, pero ha sido capturado.|There once was a sage, but it has been capturated!'),
	'sprite_sage2_broken': translate('Aquí solía haber un sabio, pero ha sido capturado.|There once was a sage, but it has been capturated!'),
	'sprite_sage3_broken': translate('Aquí solía haber un sabio, pero ha sido capturado.|There once was a sage, but it has been capturated!'),
	'sprite_stand1_broken': translate('Núcleo Destruido por el equipo Mapache|The Raccoon Team has destroyed this Nexus.'),
	'sprite_stand2_broken': translate('Núcleo Destruido por el equipo Mapache|The Raccoon Team has destroyed this Nexus.'),
	'sprite_stand3_broken': translate('Núcleo Destruido por el equipo Mapache|The Raccoon Team has destroyed this Nexus.'),

	'sprite_flower': translate('Flores - Reduce a la mitad el daño recibido por las unidades que se encuentren encima.|Flowers - Damage taken is reduced to a half.'),
	'sprite_rock': translate('Piedras - Aumenta el daño causado por la unidad que se encuentra encima.|Rocks - Increases damage caused by units who step on it.'),
	'sprite_dirt': translate('Tierra - Aumenta el daño recibido por la unidad que se encuentra encima.|Dirt - Increases damage taken by units who step on it.'),
	'sprite_hole': translate('Agujero - Impide el movimiento durante un turno. No puedes atacar ni ser atacado.|Hole - If a unit steps on it, that unit loses a turn and cannot attack or be attacked.'),
	'sprite_weeds': translate('Hierba Alta - Dificulta el movimiento.|Tall Grass - Difficults movement.'),
	'sprite_nettle': translate('Ortiga - Causa daño al pisar la casilla.|Nettle - Causes 1HP Damage to units who step on it.'),
	'sprite_grasshole': translate('Trampa de Hojas - Se convierte en un agujero al pisar la casilla.|Trap Hole - Turns into a hole when who step on it, but does not cause a fall.'),
	'sprite_frost': translate('Escarcha - Facilita el movimiento.|Frost - Movement is easier here.'),
	'sprite_puddle': translate('Charco - Dificulta el movimiento.|Puddle - Difficults movement.'),
	'sprite_ice': translate('Hielo - Facilita mucho el movimiento.|Ice - Movement is a lot easier here.'),
	'sprite_mud': translate('Barro - Dificulta mucho el movimiento, reduce el daño causado por las unidades encima.|Mud - Difficults movement. Also reduces damage caused by units who step on it.'),

	'sprite_blueberry': translate('Arándanos - Recupera 5 VIDA|Blueberry Bush - Recover 5HP.'),
	'sprite_purpleberry': translate('Arándanos Púrpura - Recupera el 100% de VIDA|Purpleberry Bush - Recover 100% HP.'),
	'sprite_bush': translate('Arbusto - Antes hubo fruta, pero ahora no queda nada|Bush - There once was fruit, but now it is empty.'),
	'sprite_goldberry': translate('Baya de Oro - Sube un nivel|Golden Berry - Level up!'),
	'sprite_rainbowgrape': translate('Uva Arcoiris - Sube una característica al azar|Rainbowgrape Bush - Increases a random stat.'),

	'sprite_wall': translate('Muro - Detiene el avance del enemigo.|Wall - Stops the enemy from advancing.'),
	'sprite_barbedWire': translate('Alambre de Espino - Detiene el avance del enemigo.|Barbed Wire Fence - Stops the enemy from advancing.'),
	'sprite_wall_broken': translate('Muro (Roto) - Antes había un muro, pero ahora se puede atravesar.|Wall (Broken) - There used to be a wall, but now it is safe to pass through.'),
    'sprite_barbedWire_broken': translate('lambre de Espino (Roto) - Antes había un muro, pero ahora se puede atravesar.|Barbed Wire Fence (Broken) - There used to be a wall, but now it is safe to pass through.'),
    'sprite_tower': translate('Torre - Ataca a los enemigos en líneas horizontales y verticales.|Tower - Attacks enemies in horizontal and vertical rows.'),
	'sprite_tower_broken': translate('Torre (Rota) - Una torre rota que no supone un obstáculo.|Tower (Broken) - A broken tower that does not difficult movement.'),
	'sprite_cannon': translate('Torreta Ametralladora - Ataca a los enemigos en líneas horizontales y verticales.|Machine Gun Turret - Attacks enemies in horizontal and vertical rows.'),
	'sprite_cannon_broken': translate('Torreta Ametralladora (Rota) - Una torreta rota que no supone un obstáculo.|Machine Gun Turret (Broken) - A broken turret that does not difficult movement.'),
	'sprite_trap': translate('Mina Explosiva - Causa 5 de daño al pisarlo.|Explosive Mine - Causes 5 damage to units who step on it.'),

	'sprite_poison': translate('Veneno - Al pisarlo causa envenenamiento.|Explosive Mine - Causes poisoning to units who step on it.'),
	'sprite_spikehole': translate('Agujero Trampa - Causa 5 de daño al caer y hace perder un turno.|Spiked Hole - Causes 5 damage upon falling and loses a turn.'),
	'sprite_spikerock': translate('Roca Puntiaguda - Causa 1 de daño al pisarlo.|Spiky Rock - Causes 1 damage to units who step on it.'),
	'sprite_badberry': translate('Baya Mala - Reduce una característica al azar.|Bad Berry - Reduces a random stat.'),
	'sprite_hotsprings': translate('Aguas Termales - Recupera vida con el tiempo.|Hot Springs - HP increases over time.'),

	'sprite_corrupt1': translate('Agujero Negro - Causa daño al pasar y puede matar a la unidad que se encuentra encima.|Black Hole - Causes damage when stepping on it, also can cause death.'),
	'sprite_corrupt2': translate('Agujero Negro - Causa daño al pasar y puede matar a la unidad que se encuentra encima.|Black Hole - Causes damage when stepping on it, also can cause death.'),
	'sprite_corrupt3': translate('Agujero Negro - Causa daño al pasar y puede matar a la unidad que se encuentra encima.|Black Hole - Causes damage when stepping on it, also can cause death.'),
	'sprite_corrupt4': translate('Agujero Negro - Causa daño al pasar y puede matar a la unidad que se encuentra encima.|Black Hole - Causes damage when stepping on it, also can cause death.'),

	'sprite_shroom': translate('Seta - Recupera vida, pero envenena.|Mushroom - Recovers HP but poisons.'),
	'sprite_money': translate('Dinero - ¿A quién se le habrá caído?|Money - Who left this over here?'),

}
var aiTilePreferences = {
'sprite_money': -1,

//Tiles a coon should always step
'sprite_goldberry': 0, 'sprite_rainbowgrape': 0, 'sprite_hotsprings': 0,

//Good tiles to step on
'sprite_flower': 1, 'sprite_rock': 1,
'sprite_purpleberry': 1, 'sprite_blueberry': 1,

//Grass.
'sprite_grass': 2, 

//Neutral tiles
'sprite_ice': 3, 'sprite_frost': 3, 
'sprite_grasshole': 3, 'sprite_bush': 3,
'sprite_wall_broken': 3, 'sprite_cannon_broken': 3,
'sprite_tower_broken': 3, 'sprite_barbedWire_broken': 3,
'sprite_sage1_broken': 3, 'sprite_sage2_broken': 3, 'sprite_sage3_broken': 3,
'sprite_stand1_broken': 3, 'sprite_stand2_broken': 3, 'sprite_stand3_broken': 3,

//Movement reductors, combat fuckers, bad berry
'sprite_weeds': 4, 'sprite_puddle': 4,
'sprite_dirt': 4, 'sprite_hole': 4,
'sprite_badberry': 4,

//Low Damage tiles
'sprite_nettle': 5 , 'sprite_spikerock': 5,

//High Damage tiles
'sprite_trap': 6, 'sprite_spikehole': 6,
'sprite_poison': 6, 'sprite_shroom': 6,

//Death tiles
'sprite_corrupt1': 7, 'sprite_corrupt2': 7, 'sprite_corrupt3': 7, 'sprite_corrupt4': 7,
};

var teams = [coons, scouts];
var prototypes = {
	/*
	Each point in atk/def is valued at 1ç.
	Range and mov are valued at 2ç.
	If unit inflicts status condition, multiplies price by 2x.
	If unit can create copies, multiplies price by 3x.

	*/
	'sprite_boyScout': {'atk': 2, 'def': 4, 'mov': 4, 'range': 0, 'price': SCOUT_PRICE, 'name': 'Boy Scout'},
	'sprite_coon': {'atk': 4, 'def': 2, 'mov': 4, 'range': 0, 'price': RACCOON_PRICE, 'name': translate('Mapache|Raccoon')},

	'sprite_tower': {'atk': 2, 'def': 0, 'mov': 1, 'range': 7, 'price': TOWER_PRICE, 'name': translate('Torre|Tower')},
	'sprite_wall': {'atk': 0, 'def': 8, 'mov': 0, 'range': 0, 'price': WALL_PRICE, 'name': translate('Muralla|Wall')},

	'sprite_cannon': {'atk': 2, 'def': 1, 'mov': 1, 'range': 7, 'price': TOWER_PRICE, 'name': translate('Ametralladora|Machine Gun')},
	'sprite_barbedWire': {'atk': 0, 'def': 8, 'mov': 0, 'range': 0, 'price': WALL_PRICE, 'name': translate('Alambre de Espino|Barbed Wire Fence')},

	'sprite_traitorBoyScout': {'atk': 3, 'def': 3, 'mov': 4, 'range': 0, 'price': 10, 'name': translate('Scout Traidor|Traitor Scout')},
	'sprite_traitorCoon': {'atk': 3, 'def': 3, 'mov': 4, 'range': 0, 'price': 10, 'name': translate('Mapache Traidor|Traitor Raccoon')},

	'sprite_zombieScout': {'atk': 1, 'def': 2, 'mov': 2, 'range': 0, 'price': 42, 'name': 'Zombie'},
	'sprite_zombieCoon': {'atk': 2, 'def': 1, 'mov': 2, 'range': 0, 'price': 42, 'name': translate('Mapache Zombie|Zombie Raccoon')},

	'sprite_vampire': {'atk': 1, 'def': 1, 'mov': 5, 'range': 0, 'price': 36, 'name': translate('Vampiro|Vampire')},
	'sprite_bitten': {'atk': 1, 'def': 1, 'mov': 5, 'range': 0, 'price': 36, 'name': translate('Mordido|Bitten')},
	'sprite_priest': {'atk': 4, 'def': 6, 'mov': 4, 'range': 0, 'price': 36, 'name': translate('Sacerdote|Priest')},

	'sprite_fireSage': {'atk': 16, 'def': 1, 'mov': 2, 'range': 6, 'price': 33, 'name': translate('Sabio del Fuego|Fire Sage')},
	'sprite_windSage': {'atk': 6, 'def': 1, 'mov': 7, 'range': 6, 'price': 33, 'name': translate('Sabio del Viento|Wind Sage')},
	'sprite_earthSage': {'atk': 6, 'def': 11, 'mov': 2, 'range': 6, 'price': 33, 'name': translate('Sabio de la Tierra|Earth Sage')},
	'sprite_waterSage': {'atk': 6, 'def': 1, 'mov': 2, 'range': 11, 'price': 33, 'name': translate('Sabio del Agua|Water Sage')},

	'sprite_angel': {'atk': 2, 'def': 8, 'mov': 5, 'range': 0, 'price': 20, 'name': 'Angel'},
	'sprite_demon': {'atk': 8, 'def': 2, 'mov': 5, 'range': 0, 'price': 20, 'name': translate('Demonio|Demon')},

	'sprite_succubus': {'atk': 1, 'def': 3, 'mov': 3, 'range': 0, 'price': 30, 'name': translate('Súcubo|Succubus')},
	'sprite_fairy': {'atk': 3, 'def': 7, 'mov': 5, 'range': 5, 'price': 25, 'name': translate('Hada|Fairy')},

	'sprite_rppCoon': {'atk': 8, 'def': 2, 'mov': 2, 'range': 8, 'price': 30, 'name': translate('Lanzagranadas|RPP Raccoon')},
	'sprite_soldierCoon': {'atk': 5, 'def': 2, 'mov': 5, 'range': 4, 'price': 25, 'name': translate('Mapache Soldado|Soldier Raccoon')},

	'sprite_sniperScout': {'atk': 5, 'def': 1, 'mov': 2, 'range': 10, 'price': 30, 'name': translate('Francotirador|Sniper')},
	'sprite_soldierScout': {'atk': 4, 'def': 3, 'mov': 6, 'range': 3, 'price': 25, 'name': translate('Soldado|Soldier')},

	'sprite_goblin': {'atk': 1, 'def': 1, 'mov': 5, 'range': 0, 'price': 26, 'name': translate('Duende|Goblin')},
	'sprite_gnome': {'atk': 1, 'def': 1, 'mov': 5, 'range': 0, 'price': 26, 'name': translate('Gnomo|Gnome')},
};

var allUnits = [
				'sprite_coon', 'sprite_boyScout',
				'sprite_zombieCoon', 'sprite_zombieScout', 'sprite_vampire',
				'sprite_fireSage', 'sprite_windSage', 'sprite_waterSage', 'sprite_earthSage',
				'sprite_angel', 'sprite_demon', 'sprite_priest', 'sprite_succubus',
				'sprite_rppCoon', 'sprite_soldierCoon', 'sprite_sniperScout', 'sprite_soldierScout',
				'sprite_fairy', 'sprite_goblin', 'sprite_gnome',
];


//Sounds
var snd_step = new Audio("step.wav");
var snd_attack = new Audio("attack.wav");
var snd_fall = new Audio("fall.wav");
var snd_crack = new Audio("crack.wav");
var snd_turn = new Audio("turn.wav");
var snd_levelup = new Audio("levelup.wav");
var snd_splash = new Audio("splash.wav");
var snd_tower = new Audio("cannon.wav");
var snd_explosion = new Audio("explosion.wav");
var snd_mgun = new Audio("mgun.wav");
var snd_shot = new Audio("shot.wav");
var snd_sniper = new Audio("sniper.wav");
var snd_magic = new Audio("magic.wav");
var snd_heal = new Audio("heal.wav");
var explodeSound = snd_explosion;

function newGame(aiEnabled) {
	turn = 1;
	aiTurn = 9;
	gameStarted = 1;
	if (aiEnabled == 'coon') aiTurn = 1;
	if (aiEnabled == 'boyScout') aiTurn = 0;
	records = [
	{
		'unitsKilled': 0,
		'totalDamage': 0,
		'totalHeal': 0,
		'unitsSpawned': 0,
		'totalMovements': 0,
		'goldEarned': 0,
		'levelUps': 0,
	},
	{
		'unitsKilled': 0,
		'totalDamage': 0,
		'totalHeal': 0,
		'unitsSpawned': 0,
		'totalMovements': 0,
		'goldEarned': 0,
		'levelUps': 0,
	},
	]

	//Team names
	teamA = translate('Equipo Mapache|Raccoon Team');
	teamB = translate('Equipo Boy Scout|Boy Scout Team');
	if (survivalMode == 'zombie') teamA = 'Zombies';
	if (survivalMode == 'chaos') teamB = translate('Equipo Caos|Chaos Team');
	if (versusMode == 'vampire') {
		teamA = translate('Equipo Infierno|Hell Team');
		teamB = translate('Equipo Cielo|Heaven Team');
	}



	turnumber = 0;
	scouts.units = [];
	scouts.nexus = [true, true, true];
	scouts.lemons = 0;
	scouts.lemonade = 0;
	scouts.money = 0;

	coons.units = [];
	coons.nexus = [true, true, true];
	coons.lemons = 0;
	coons.lemonade = 0;
	coons.money = 0;

	generatePanel(DEFAULT_WIDTH, DEFAULT_HEIGHT);
	newTurn();
	$('#debugOptions').slideUp(100);
	$('#gameOptionsDiv').slideUp(100);
	$('#moreOptions').slideDown(100);
	$('#gameOptions').slideDown(100);
	$('#battleground').slideDown(1000);
	$('#game').slideUp(100);
	$('#playerinfo').fadeIn(1000);
	$('#donateThing').fadeOut(100);
}
function closeAllStuff() {
	$('#spawnSelector').fadeOut(100);
	$('#manual').slideUp(500);
	$('#blackCloser').fadeOut(100);
}
function spawnSelectorMode(seeAvailables, targetWidth, targetHeight, team) {
	var availables = [];
	var uts = getAvailableUnits(turn);
	var l = translate('Unidades disponibles|Available units')+'<br>';

	for (var ssm in uts) {
		var unitospawn = "'"+uts[ssm]+"'";
		var uthumb = getUnitThumbnail(uts[ssm])
		if (!uthumb[1]) availables.push(uts[ssm]);
		l += '<div class="spawnyButton '+uthumb[1]+'" onclick="selectSpawn('+unitospawn+', '+targetWidth+', '+targetHeight+', '+team+')">'+uthumb[0]+'</div>';
	}
	if (seeAvailables) return availables;
	spawnSelector.innerHTML = l;
	if (turn == aiTurn) return;
	spawnSelector.style.display = 'block';
	$('#blackCloser').fadeIn(100);
}
function selectSpawn(unit, targetWidth, targetHeight, team) {
	spawnmode = unit;

	var toSpawn = prototypes[spawnmode];
	if (!buy(team, toSpawn.price, 1)) {
		mouseNotif(toSpawn.price+translate(' limones necesarios.| lemons required'), 'red');
		return;
	}
	//Check if units are spawned there.
	if (!isAreaClear(targetWidth, targetHeight)) {
		mouseNotif(translate('No hay espacio aquí.|There is no space here.'));
		return;
	}

	var t = (team == 0) ? 'coons' : 'boyScout';
	teams[team].units.push(new Unit(t, spawnmode, targetWidth, targetHeight));
	buy(team, toSpawn.price);

	closeAllStuff();
	updatePanel();
}
function getUnitThumbnail(unit) {
	var isGrayed = '';
	var price = prototypes[unit].price;
	var canBuy = (buy(turn, price, 1)) ? '' : 'gray';
	var gut = '<i class="sprite '+unit+'"></i> '+prototypes[unit].name+' ('+price+'ç)<br>';
	gut += prototypes[unit].atk+'AT   '+prototypes[unit].def+'DF   '+prototypes[unit].mov+'MV';
	return [gut, canBuy];
}
function getAvailableUnits(team) {
	var arr = [
	['sprite_coon', 'sprite_rppCoon', 'sprite_soldierCoon'],
	['sprite_boyScout', 'sprite_sniperScout', 'sprite_soldierScout'],
	];
	if (survivalMode) for (var a in arr[0]) arr[1].push(arr[0][a]);
	if (versusMode == 'vampire') {
		arr[0] = ['sprite_demon', 'sprite_succubus', 'sprite_vampire',
		'sprite_goblin',
		];
		arr[1] = ['sprite_priest', 'sprite_angel',
		'sprite_coon', 'sprite_rppCoon', 'sprite_soldierCoon',
		'sprite_boyScout', 'sprite_sniperScout', 'sprite_soldierScout',
		'sprite_fairy', 'sprite_gnome'];
	}
	if (survivalMode == 'chaos' || versusMode == 'chaos') arr = [allUnits, allUnits];
	return arr[team];
}
function deturm() {
	//Debug command
	newTurn();
}
function survivalSpawn() {
	var chances = 2;
	if (survivalMode == 'zombie') {
		unit = red('sprite_zombieCoon', 'sprite_zombieScout');
	}
	if (survivalMode == 'coon') {
		unit = red('sprite_coon', 'sprite_rppCoon', 'sprite_soldierCoon');
		unit = 'sprite_coon';
		if (survivalBoss) {
			unit = red('sprite_fireSage', 'sprite_windSage', 'sprite_earthSage', 'sprite_waterSage');
			if (survivalBoss < 2) survivalBoss = 0;
		}
	}
	if (survivalMode == 'chaos') {
		unit = read(allUnits);
	}
	if (teams[0].units.length < 1 || survivalBoss) chances = 1;
	if (rand(1,chances) == 1) spawnUnitHere(0, unit, 0, rand(0,(DEFAULT_HEIGHT-1)));
}
function tickTemperature() {
	if (temperature == temperatureTarget) {
		temperatureTarget = rand(MIN_TEMPERATURE, MAX_TEMPERATURE);
		if (temperatureWave) temperatureWave = '';
		if (rand(1,10) == 1 && !temperatureWave) {
			temperatureWave = red('cold', 'hot');
			if (temperatureWave == 'cold') temperatureTarget = temperature -= rand(10,30);
			if (temperatureWave == 'hot') temperatureTarget = temperature += rand(10,30);
		}
	} else {
		if (temperature > temperatureTarget) temperature -= rand(0,1);
		if (temperature < temperatureTarget) temperature += rand(0,1);
		if (temperatureWave == 'cold') temperature -= rand(0,1);
		if (temperatureWave == 'hot') temperature += rand(0,1);
	}
	if (rand(1,20) == 1) raining = !raining;
}
function tickTemperatureFor(unit) {
	if (temperature > MIN_TEMPERATURE && temperature < MAX_TEMPERATURE) {
		if (unit.temp > 0) unit.temp -= 1;
		if (unit.temp < 0) unit.temp += 1;
	}
}
function newTurnUnitChanges(team, unit) {
	var u = teams[team].units[unit];
	u.unitID = unit;
	u.team = team;
	u.moved = 0;
	if (u.temp < -10) u.moved = 99;
	tickTemperatureFor(u);
	var steppedOn = tileHere(u.width, u.height);
	if (steppedOn == 'sprite_hotsprings') healUnit(u, 1);
	if (steppedOn.match('corrupt')) damageUnit(u, rand(0,1), 1);
	if (steppedOn.match('sage') && team == 1) damageUnit(u, u.hp, 1);
	if (steppedOn.match('stand') && team == 0) damageUnit(u, u.hp, 1);

	if (u.poison) {
		damageUnit(u, 2);
	}
	if (u.regen) {
		healUnit(u, 2);
	}
	if (u.disease && !u.zombie) {
		damageUnit(u, 3, 1);
	}
}
function healUnit(unitObject, amount) {
	unitObject.hp += amount;
	if (unitObject.hp > unitObject.hpx) unitObject.hp = unitObject.hpx;
	records.totalHeal += amount;
	if (amount) {
		onUnitNotification(unitObject.width, unitObject.height, '+'+amount+'HP', 1);
		snd_heal.play();
	}
}
function damageUnit(unitObject, amount, hard) {
	unitObject.hp -= amount;
	if (unitObject.hp <= 0) {
		if (hard) killUnit(teams[unitObject.team], unitObject.unitID);
		if (!hard) unitObject.hp = 1;
	}
	if (amount) onUnitNotification(unitObject.width, unitObject.height, '<span class="red">-'+amount+'HP</span>', 1);
}
function newTurn() {
	if (!gameStarted) return;

	snd_turn.play();

	spawn = 0;

	//Spawn zombies if survival
	if (survivalMode && turn == 1) {
		var spawnWeight = Math.floor(survivalLevel/10)+1
		for (var sms = 0; sms < spawnWeight; sms++) survivalSpawn();
		survivalLevel += 1
		if (survivalLevel % 10 == 0) {
			survivalBoss = rand(1,(survivalLevel/10));
		}
	}

	//Weather
	tickTemperature();

	buildmode = '';
	upgrademode = '';
	turnumber++;
	turn = (turn == 0) ? 1 : 0;

	var firstAvailableUnit = getAvailableUnits(turn)[0];
	spawnmode = firstAvailableUnit;

	if (turn == 0) {
		var bef = coons.lemons;
		var sml = Math.ceil((MAX_COON_LEMONS * (getNexus(0) / 3)) + MIN_COON_LEMONS);
		if (!survivalMode) coons.lemons += sml;
		if (coons.money) coons.lemons += Math.ceil(coons.money * 0.25);
		if (!survivalMode) records[0].goldEarned += sml;

		for (var e in coons.units) newTurnUnitChanges(0, e);
	}
	else {
		//Get new lemons
		var lemod = (scouts.nexus[0]) ? 1 : 0.5;
		scouts.lemons += Math.ceil(LEMON_RATE * lemod);

		//Make lemonade
		var lemod = (scouts.nexus[1]) ? 1 : 0.5;
		var tolemonade = Math.ceil(scouts.lemons * lemod);
		scouts.lemons -= tolemonade;
		scouts.lemonade += Math.ceil(tolemonade * LEMONADE_RATE);
		
		//Sell Lemonade
		var lemod = (scouts.nexus[2]) ? 1 : 0.5;
		var tomoney = Math.ceil(scouts.lemonade * lemod);
		scouts.lemonade -= tomoney;
		var sma = Math.ceil(tomoney * LEMONADE_PRICE)
		scouts.money += sma;
		records[1].goldEarned += sma;

		for (var e in scouts.units) newTurnUnitChanges(1, e);
	}

	$('#newTurnButton').slideUp(1);
	closeAllStuff();
	var ntb = setTimeout(function() {
		if (turn != aiTurn) $('#newTurnButton').slideDown(375);
	}, 375);
	focusedUnit = 0;

	checkTeamTurretAutoAttackStatus(turn);

	//Corruption
	for (var b in tiles) {
		for (var c in tiles[b]) {
			var isCorrupted = checkCorruption(b, c);
			if (isCorrupted) {
				var th = tileHere(b, c);
				if (!th.match('sage') && !th.match('stand') && !th.match('corrupt'));
				changeTile(b, c, 'sprite_corrupt1');
			}
		}
	}
	//Berry growth & weather effects
	for (var b in tiles) {
		var bush = tiles[b].indexOf('sprite_bush');
		if (bush >= 0 && rand(1,10) == 1) {
			var num = rand(1,100);
			if (num < 50) changeTile(b, bush, 'sprite_blueberry');
			if (num < 25) changeTile(b, bush, 'sprite_purpleberry');
			if (num < 12) changeTile(b, bush, 'sprite_rainbowgrape');
			if (num < 6) changeTile(b, bush, 'sprite_goldberry');
		}

		for (var c in tiles[b]) {
			var th = tileHere(b, c);
			if (th == 'sprite_grass' && !rand(0,100)) {
				if (temperature <= 0) changeTile(b, c, 'sprite_frost');
			}
			if (th == 'sprite_grass' && !rand(0,100)) {
				if (raining == true) changeTile(b, c, 'sprite_puddle');
			}

			if (th == 'sprite_puddle' && !rand(0,100)) {
				if (temperature <= 0) changeTile(b, c, 'sprite_ice');
			}
			if (th == 'sprite_ice' && !rand(0,100)) {
				if (temperature > 0) changeTile(b, c, 'sprite_puddle');
			}
			if (th == 'sprite_frost' && !rand(0,100)) {
				if (temperature > 0) changeTile(b, c, 'sprite_grass');
			}

			if (th == 'sprite_puddle' && !raining && !rand(0,100)) {
				if (temperature > 0) {
					var rc = rand(0,99);
					if (rc < temperature) changeTile(b, c, 'sprite_grass');
				}
			}
			if (th == 'sprite_corrupt1' && !rand(0,1)) changeTile(b, c, 'sprite_corrupt2');
			if (th == 'sprite_corrupt2' && !rand(0,1)) changeTile(b, c, 'sprite_corrupt3');
			if (th == 'sprite_corrupt3' && !rand(0,1)) changeTile(b, c, 'sprite_corrupt4');
		}
	}
	if (raceMode) {
		if (turn == 0) expandPanel();
		var otherTeam = (turn == 0) ? 1 : 0;
		var u = teams[otherTeam].units[0];
		setTimeout(function() {
			if (!rand(0,2))onUnitNotification(u.width, u.height, read(funnyMessages), 1);
		}, 100);
	}
	updatePanel();
}
function checkTeamTurretAutoAttackStatus(team) {
	//Turret auto-attack
	for (var taa in teams[team].units) {
		var ut = teams[team].units[taa];
		if (!ut.auto) continue;
		var sceu = seekClosestEnemyUnit(ut);
		if (!sceu) {
			ut.moved = 99;
			continue;
		}
		var iwr = isUnitWithinRange(ut, sceu);
		if (!iwr) ut.moved = 99;
	}
	updatePanel();
}
function getAutoUnit() {
	for (var gau in teams[turn].units) {
		var u = teams[turn].units[gau];
		if (u.auto && u.moved < u.mov) {
			return {'object': u, 'id': gau};
		}
	}
}
function autoAttack() {
	if (!getAutoUnit()) return;
	checkTeamTurretAutoAttackStatus(turn);
	var unit = getAutoUnit();
	unitID = Number(unit.id);
	unit = unit.object;
	var target = seekClosestEnemyUnit(unit);
	if (!target || !target.width || !target.height) {
		unit.moved = 99;
		return;
	}
	focusy(turn, unitID);
	action(target.width, target.height);
}
function mostValuableEnemy(from) {
	var enemyTeam = getEnemyTeam(from.team);
	var most = {'unitID': -1, 'value': -Infinity};
	for (var mve in enemyTeam.units) {
		var un = enemyTeam.units[mve];
		if (!un.unitID) continue;
		var val = unitValue(un.team, un.unitID);
		val -= distance(un, from);
		if (val > most.value) most = {
			'unitID': mve,
			'value': val
		}
	}
	if (most.unitID < 0) {
		var nuclei = (from.team == 0) ? standsL : sagesL;
		return read(nuclei);
	}
	return enemyTeam.units[most.unitID];
}
function closestEnemy(from) {
	var closer = {'width': from.width, 'height': from.height, 'distance': Infinity};
	var enemyTeam = getEnemyTeam(turn);
	for (var e in enemyTeam.units) {
		var ut = enemyTeam.units[e];
		if (ut.width == from.width && ut.height == from.height) continue;
		var disw = Math.abs(from.width - ut.width);
		var dish = Math.abs(from.height - ut.height);
		var distance = disw + dish;
		if (distance < closer.distance) {
			closer.width = ut.width;
			closer.height = ut.height;
			closer.distance = distance;
		}
	}
	if (closer.distance == Infinity) {
		var nuclei = (from.team == 0) ? standsL : sagesL;
		return read(nuclei);
		return 0;
	}
	return closer;
}
function isUnitWithinRange(from, to) {
	var dis = distance(from, to);
	if (dis <= from.range) return true;
	return false;
}
function seekClosestEnemyUnit(from) {
	var closer = {'unit': {}, 'width': 0, 'height': 0, 'distance': Infinity};
	var enemyTeam = getEnemyTeam(from.team);
	for (var sceu in enemyTeam.units) {
		var u = enemyTeam.units[sceu];
		if (u.status == 'on_a_hole') continue;
		if (isUnitWithinRange(from, u)) {
			var dist = distance(from, u);
			if (dist < closer.distance) closer = {
				'unit': u,
				'width': u.width,
				'height': u.height,
				'distance': dist
			}
		}
	}
	if (!closer) return false;
	return closer;
}
function closerTarget(width, height, ally, tUnit) {
	if (ally == 'hi') {
		var closer = {'width': width, 'height': height, 'distance': Infinity};
		for (var ee in teams[turn].units) {
			var ut = teams[turn].units[ee];
			if (ut.width == width && ut.height == height) continue;
			var disw = Math.abs(width - ut.width);
			var dish = Math.abs(width - ut.height);
			var distance = disw + dish;
			if (distance < closer.distance) {
				closer = {
					'width': ut.width,
					'height': ut.height,
					'distance': distance
				}
			}
		}
		return closer;

	}
	//Vertical scan
	for (var ct = height; ct < DEFAULT_HEIGHT; ct++) {
		var vrt = validRangedTarget(width, ct, tUnit);
		if (vrt) return vrt;
	}
	for (var ct = height; ct >= 0; ct--) {
		var vrt = validRangedTarget(width, ct, tUnit);
		if (vrt) return vrt;
	}

	//Horizontal scan
	for (var ct = width; ct < DEFAULT_WIDTH; ct++) {
		var vrt = validRangedTarget(ct, height, tUnit);
		if (vrt) return vrt;
	}
	for (var ct = width; ct >= 0; ct--) {
		var vrt = validRangedTarget(ct, height, tUnit);
		if (vrt) return vrt;
	}
}
function validRangedTarget(uwidth, uheight, tUnit) {
	var unith = unitHere(uwidth, uheight);
	if (!unith || !unith.enemy) return;
	var unitObject = getEnemyTeam(turn).units[unith.unit];
	var inRange = (distance(tUnit, unitObject) <= tUnit.range) ? true : false;
	if (unith.enemy && unitObject.status != 'on_a_hole' && inRange) return {'width': uwidth, 'height': uheight};
}
function getNexus(team) {
	var count = 0;
	for (var e in teams[team].nexus) if (teams[team].nexus[e]) count++;
	return count;
}
function expandPanel() {
	tiles.splice(0, 1);
	for (var u in coons.units) {
		var ut = coons.units[u];
		ut.width--;
		if (ut.width < 0) killUnit(teams[ut.team], ut.unitID);
	}
	for (var u in scouts.units) {
		var ut = scouts.units[u];
		ut.width--;
		if (ut.width < 0) killUnit(teams[ut.team], ut.unitID);
	}

	tiles.push([]);
	for (var h = 0; h < DEFAULT_HEIGHT; h++) {
		var tl = tileList;
		if (raceMode) tl = raceTileList;
		tiles[tiles.length-1][h] = red('sprite_grass', read(tl));
	}
	if (raceMode) {
		for (var r = 0; r < DEFAULT_HEIGHT; r++) changeTile(0, r, 'sprite_corrupt4');
	}
	updatePanel();
}
function generatePanel(width, height) {
	var first = 0;
	var last = width-1;
	var half = Math.floor(height / 2) - 1;
	var whalf = Math.floor(width / 2) - 1;
	for (var w = 0; w < width; w++) {
		tiles[w] = [];
		for (var h = 0; h < height; h++) {
			var tl = (raceMode) ? raceTileList : tileList;
			var other = (w == first || w == last) ? 'sprite_grass' : read(tl);
			var choose = red('sprite_grass', other);
			tiles[w][h] = choose;

			if (w < 2 && raceMode) tiles[w][h] = 'sprite_corrupt1';
			if (h >= half && h <= half+2 && !survivalMode && !raceMode) {
				if (w == first) {
					tiles[w][h] = sages[h-half];
					sagesL.push({'width': w, 'height': h});
				}
				if (w == (first+1)) tiles[w][h] = 'sprite_grass';
			}
			if (h >= half && h <= half+2 && !raceMode) {
				if (w == last) {
					tiles[w][h] = stands[h-half];
					standsL.push({'width': w, 'height': h});
				}
				if (w == (last-1)) tiles[w][h] = 'sprite_grass';
			}
			if (h == half && w == whalf && corruptionMode) tiles[w][h] = 'sprite_corrupt1';
			
		}
	}
	if (raceMode) {
		spawnUnitHere(0, 'sprite_coon', 10, 0);
		spawnUnitHere(1, 'sprite_coon', 10, (DEFAULT_HEIGHT)-1);

	}
	updatePanel();
}
function tileHere(wh, hh) {
	if (wh < 0 || wh >= DEFAULT_WIDTH || hh < 0 || hh >= DEFAULT_HEIGHT) return 'void';
	return tiles[wh][hh];
}
function updateRange(unit) {
	range_overlay.innerHTML = '';
	if (unit == undefined) return '';
	if (unit.range > 0) {
		for (var c in coons.units) {
			var obj = coons.units[c];
			if (obj == undefined) continue;
			if (isUnitWithinRange(unit, obj) && obj != unit && obj.team != unit.team) {
				range_overlay.innerHTML += '<range style="top: '+((obj.height * 32) - 16)+'px; left: '+((obj.width * 32) - 16)+'px"></range>';
			}
		}

		for (var s in scouts.units) {
			var obj = scouts.units[s];
			if (obj == undefined) continue;
			if (isUnitWithinRange(unit, obj) && obj != unit && obj.team != unit.team) {
				range_overlay.innerHTML += '<range style="top: '+((obj.height * 32) - 16)+'px; left: '+((obj.width * 32) - 16)+'px"></range>';
			}
		}
	}
	return '';
}
function updatePanel() {
	if (!gameStarted) return;
	moveFocuser();

	var l = '';
	var width = tiles.length;
	var height = tiles[0].length;
	battleground.style.width = (32*(width))+'px';
	battleground.style.height = (32*height)+'px';
	for (var h = 0; h < height; h++) {
		for (var w = 0; w < width; w++) {
			var extraClass = '';
			var fu = focusedUnit;
			if (fu) {
				var unit = teams[fu.team].units[fu.unit];
				var obj = {'width': w, 'height': h};
				if (unit && unit.range && isUnitWithinRange(unit, obj)) {
					var thisTileObject = {'width': w, 'height': h};
					var dist = distance(thisTileObject, unit);
					if (dist <= unit.range) {
						//extraClass = 'rangeOverlay';
					}
				}
			}
			l += '<div id="tile_'+w+'_'+h+'" class="sprite '+tiles[w][h]+' '+extraClass+'" onclick="action('+w+', '+h+')" onmouseover="highlight('+w+', '+h+', 1)" onmouseleave="highlight('+w+', '+h+', 0)"></div>';
		}
		l += '<div class="tileBreak"></div>';
	}
	l += updateUnits();
	battleground.innerHTML = l;
	updateInfo();
}
function lifeBar(guy) {
	var w = (guy.width * 32)+'px';
	var h = ((guy.height * 32))+'px';
	var barClass = (guy.team == 0) ? 'coonBar' : 'scoutBar';
	var realbar = realDrawBar(guy.hp, guy.hpx).replace('commonFilled', 'commonFilled '+barClass);

	var price = getUpgradePrice(guy);
	var pric = (upgrademode) ? translate('Ascenso: |Upgrade: ')+price+'ç' : '';
	if (guy.team != turn) pric = '';
	if (!buy(guy.team, price, 1)) pric = '<span class="red">'+pric+'</span>';
	var bar = '<div class="barContainer" style="top: -16px; position: relative"><big style="pointer-events: none; user-select: none">'+pric+'</big><br>'+guy.level+' '+realbar+'</div>';
	return '<span class="noselect">'+bar+'</span>';
}
function getTempColor(unit) {
	if (unit.temp < -5) return 'rgba(0, 128, 255, 0.5)';
	if (unit.temp <= -10) return 'rgba(0, 128, 255, 1)';

	if (unit.temp > 5) return 'rgba(255, 128, 0, 0.5)';
	if (unit.temp >= 10) return 'rgba(255, 128, 0, 1)';
}
function getUnitExtraClasses(u, scout) {
	var ex = (turn == 0) ? 'canMove': '';
	ex += ' spriteUnit';
	ex += ' sprite';
	ex += ' '+u.type;
	if (!canThisUnitMove(u) && turn == 0)  ex = 'cannotMove';
	if (u.moved >= u.mov) ex += ' gray';	
	if (u.poison) ex += ' poisoned';
	if (u.regen) ex += ' regen';
	if (u.disease) ex += ' disease';
	if (u.boss) ex += ' boss';
	if (scout) ex += ' scout_side';
	return ex;
}
function updateUnits() {
	var ll = ''

	for (var uu in coons.units) {
		var u = coons.units[uu];
		if (u.hp <= 0) continue;
		var ex = (turn == 0) ? 'canMove': '';
		if (!canThisUnitMove(u) && turn == 0)  ex = 'cannotMove';
		if (u.moved >= u.mov) ex = 'gray';
		if (u.poison) ex += ' poisoned';
		if (u.regen) ex += ' regen';
		if (u.disease) ex += ' disease';
		if (u.boss) ex += ' boss';
		ll += '<div id="team_0_unit_'+uu+'" onclick="focusy(0, '+uu+')" class="'+ex+' spriteUnit sprite '+u.type+'" onmouseover="highlightUnit(0, '+uu+')" onmouseleave="highlightUnit(-1)"style="top: '+u.height * 32+'px; left: '+u.width * 32+'px; background-color: '+getTempColor(u)+'">'+lifeBar(u)+'</div>';
	}
	for (var uu in scouts.units) {
		var u = scouts.units[uu];
		if (u.hp <= 0) continue;
		var ex = (turn == 1) ? 'canMove': '';
		if (u.moved >= u.mov) ex = 'gray';
		if (u.poison) ex += ' poisoned';
		if (u.regen) ex += ' regen';
		if (u.disease) ex += ' disease';
		if (u.boss) ex += ' boss';
		ll += '<div id="team_1_unit_'+uu+'" onclick="focusy(1, '+uu+')" class="'+ex+' spriteUnit scout_side sprite '+u.type+'" onmouseover="highlightUnit(1, '+uu+')" onmouseleave="highlightUnit(-1)" style="top: '+u.height * 32+'px; left: '+u.width * 32+'px; background-color: '+getTempColor(u)+'">'+lifeBar(u)+'</div>';
	
	}
	return ll;
}
function onUnitNotification(team, unit, text, coordinateMode) {
	var textlength = text.length;

	var tile = '#team_'+team+'_unit_'+unit;
	if (coordinateMode) {
		var tilew = team;
		var tileh = unit;
		tile = '#tile_'+tilew+'_'+tileh;
	}
	var to = $(tile).offset();

	var not = document.createElement('span');
	not.className = 'unitNotification';
	not.style.top = (to.top)+'px';
	not.style.left = (to.left)+'px';
	not.innerHTML = text;
	document.body.appendChild(not);
	$(not).fadeIn(100);
	$(not).animate({top: '-=32'}, textlength*100).fadeOut(textlength*100);
}
function focusy(team, unit) {
	var fu = focusedUnit;
	updateRange(teams[team].units[unit]);
	if (fu) {
		var fuu = teams[fu.team].units[fu.unit];
		if (fuu && fuu.archetype == 'fairy') {
			var focusTarget = teams[team].units[unit];
			action(focusTarget.width, focusTarget.height);
		}
	}
	if (team != turn) {
		if (unit == undefined) return;
		var unitThere = teams[team].units[unit];
		if (unitThere) action(unitThere.width, unitThere.height);
		return;
	}
	if ((team == undefined || unit == undefined) && (team != 0 || unit != 0)) return;
	if (upgrademode) {
		var thisUnit = teams[team].units[unit];
		var price = getUpgradePrice(thisUnit);

		if (buy(team, price, 1)) {
			buy(team, price);
			levelUp(thisUnit, 1, 'upgrade');
			upgrademode = false;
		}
		else {
			mouseNotif(translate('No hay dinero. |No money. ')+price+translate('ç necesarios.|ç needed.'));
		}
	}
	focusedUnit = {'team': team, 'unit': unit};
	moveFocuser();
}
function getUpgradePrice(who) {
	var p = prototypes[who.type].price;
	var levelMod = Math.pow(who.level, 2);
	p = Math.ceil((p / 3) * levelMod);
	return p;
}
function Unit(team, type, width, height, father) {
	//Inheritance in case of conversion.
	var inherit = {
		'atk': 0,
		'def': 0,
		'mov': 0,
		'level': 0
	}
	if (father) for (var e in father) inherit[e] = father[e];

	this.name = (type != 'sprite_coon' && type != 'sprite_boyScout') ? getNewName('sprite_boyScout') : getNewName(type);
	this.team = turn;

	records[this.team].unitsSpawned++;

	this.movable = 1;
	this.strength = '';
	this.counter = 1;
	this.cannotLevelUp = 0;
	this.poison = 0;
	this.regen = 0;
	this.disease = 0;
	this.lastWidth = 0;
	this.lastHeight = 0;
	this.auto = 0;
	this.range = prototypes[type].range;
	this.suck = 0;
	this.archetype = '';
	this.temp = 0;
	this.shotSound = '';
	this.explodeSound = '';
	this.passable = 1;
	if (type.match('coon') || type.match('Coon')) this.archetype = 'coon';
	if (type.match('scout') || type.match('Scout')) this.archetype = 'scout';
	if (type == 'sprite_vampire') {
		this.suck = 1;
		this.archetype = 'evil';
	}
	if (type == 'sprite_fairy') {
		this.shotSound = snd_magic;
		this.explodeSound = snd_heal;
		this.projectile = 'sprite_ammoLove';
		this.archetype = 'fairy';
	}
	if (type == 'sprite_priest') this.archetype = 'priest';
	if (type == 'sprite_succubus') this.archetype = 'succubus';
	this.projectile = 'sprite_ammoLemon';
	if (type.match('Sage')) {
		this.shotSound = snd_magic;
		this.counter = 0;
		var projs = {
			'sprite_fireSage': 'sprite_ammoFire',
			'sprite_waterSage': 'sprite_ammoWater',
			'sprite_windSage': 'sprite_ammoWind',
			'sprite_earthSage': 'sprite_ammoEarth',
		};
		this.projectile = projs[type];
	}
	if (type == 'sprite_goblin') {
		this.archetype = 'stealer';
	}
	if (type.match('soldier') || type == 'sprite_rppCoon' || type == 'sprite_sniperScout') {
		this.projectile = 'sprite_ammoShot';
		if (type == 'sprite_soldierCoon') this.shotSound = snd_mgun;
		if (type == 'sprite_soldierScout') this.shotSound = snd_shot;
		if (type == 'sprite_sniperScout') this.shotSound = snd_sniper;

		if (type == 'sprite_rppCoon') {
			this.projectile = 'sprite_ammoPomegranate';
		}
	}

	if (type == 'sprite_tower' || type == 'sprite_wall' || type == 'sprite_barbedWire' || type == 'sprite_cannon') {
		if (type == 'sprite_cannon') {
			this.projectile = 'sprite_ammoShot';
			this.shotSound = snd_mgun;
		}
		this.movable = 0;
		this.counter = 0;
		this.cannotLevelUp = 1;
		this.auto = 1;
		this.passable = 0;
	}
	this.width = width;
	this.height = height;
	this.type = type;
	this.level = 1 + inherit.level;
	this.hpx = UNIT_MAXHP;
	this.atk = prototypes[type].atk + rand(0, inherit.atk);
	this.def = prototypes[type].def + rand(0, inherit.def);
	this.mov = prototypes[type].mov + rand(0, inherit.mov);
	this.boss = 0;
	this.bite = 0;
	this.zombie = 0;
	if (type == 'sprite_bitten') this.bite = 13;

	this.status = '';

	this.moved = (team == 'spawned') ? 0 : this.mov;
	this.tactic = rand(0,6);
	if (type.match('zombie')) {
		this.tactic = red(0, 6);
		this.zombie = 1;
		this.disease = 1;
	}
	if (survivalMode && this.tactic == 2) this.tactic = 0;
	if (survivalMode && this.tactic == 3) this.tactic = 0;
	if (this.atk == 0) this.tactic = 5;
	if (raceMode) this.tactic = 4;
	if (this.tactic == 2 || this.tactic == 3) this.tactic = red(rand(0,1), rand(4,6));
	this.target = -1;
	/* Tactics
	0 - Aggresive: Tries to kill enemy units.
	1 - Defensive: Tries to kill weaker units.
	2 - Protective: Stays near allies.
	3 - Patrol: Moves near the base and defends it.
	4 - Strategic: Attempts to capture the enemy base.
	5 - Passive: Never attacks unless provoked.
	6 - Berseker: Always attacks a nearby enemy unit.
	*/

	/* Survival Mode only */
	if (survivalMode && team == 'spawned' && !father) {
		var levelIncrease = Math.floor(survivalLevel/10);
		var maxMov = Math.floor(levelIncrease/10);
		if (survivalBoss) {
			this.boss = 1;
			levelIncrease += survivalBoss;
			survivalBoss = false;
		}
		var statAdd = {
			'atk': 0,
			'def': 0,
			'hp': 0,
			'mov': 0,
		}
		for (var sml = 0; sml < levelIncrease; sml++) {
			if (rand(0,1)) {
				statAdd.atk += rand(0, prototypes[type].atk);
				statAdd.def += rand(0, prototypes[type].mov);
				statAdd.mov += rand(0, maxMov);
				this.level++;
			}
			statAdd.hp += rand(0, levelIncrease);
		}
		this.atk += statAdd.atk;
		this.def += statAdd.def;
		this.hpx += statAdd.hp;
		this.mov += statAdd.mov;
	}

	this.hp = this.hpx;
	if (this.zombie) this.hp = rand(1,this.hpx);
}
function getTacticName(tacticID) {
	var names = [
	translate('Agresivo|Aggressive'),
	translate('Defensivo|Defensive'),
	translate('Protector|Protective'),
	translate('Patrulla|Patrol'),
	translate('Estratega|Strategic'),
	translate('Pasivo|Passive'),
	'Berseker',
	];
	return names[tacticID];
}
/* Taken from lemontastic */
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

	if (type == 'sprite_boyScout') return n1;
	if (type == 'sprite_coon') return n2;
}

function mutatio(value) {
	var max = rand(0, value);
	return value+max;
}
function changeTile(w, h, newTile) {
	if (!tiles[w]) return;
	if (!tiles[w][h]) return;
	tiles[w][h] = newTile;
	var n = 'tile_'+w+'_'+h;
	doc(n).className = 'sprite '+tiles[w][h];
}
function breakNexus(sprite) {
	snd_crack.play();
	if (sprite == 'sprite_stand1') scouts.nexus[0] = false;
	if (sprite == 'sprite_stand2') scouts.nexus[1] = false;
	if (sprite == 'sprite_stand3') scouts.nexus[2] = false;

	if (sprite == 'sprite_sage1') coons.nexus[0] = false;
	if (sprite == 'sprite_sage2') coons.nexus[1] = false;
	if (sprite == 'sprite_sage3') coons.nexus[2] = false;

	if (getNexus(0) == 0) {
		win(translate('¡'+teamB+' gana!|'+teamB+' wins!'), turn);
	}
	if (getNexus(1) == 0) {
		win(translate('¡'+teamA+' gana!|'+teamA+' wins!'), turn);
	}
}
function win(message) {
	gameStarted = false;
	$('#battleground *').each(function() {
		$(this).fadeOut(3000);
	});
	winMessageMessage.innerHTML = message;
	winMessageExtra.innerHTML = '('+translate('En tan sólo |It costed only ')+turnumber+translate(' turnos| turns')+'.)';

	var sts = '<table>';
	sts += '<tr><td><i class="sprite sprite_ammoLemon"></td><td>'+translate('Equipo Mapache|Raccoon Team')+'</td><td>'+translate('Equipo Boy Scout|Boy Scout Team')+'</td></tr>';
	var index = 0;
	for (var h in records[0]) {
		sts += '<tr><td>'+recordNames[index]+'</td><td>'+records[0][h]+'</td><td>'+records[1][h]+'</td></tr>';
		index++;
	}
	sts += '</table>';

	winMessageStats.innerHTML = sts;
	$('#winMessage').fadeIn(2000);
	$('#winMessageBack').fadeIn(1000);
}
function resetGame() {
	raceMode = false;
	survivalMode = 0;
	$('#winMessage').slideUp(1000);
	$('#gameOptionsDiv').slideDown(100);
	$('#moreOptions').slideUp(100);
	$('#gameOptions').slideUp(100);
	$('#winMessageBack').slideUp(1000);
	$('#game').slideDown(1000);
	$('#donateThing').fadeIn(100);
	scouts = {};
    coons = {};
    records = {};
    tiles = [];
    focusedUnit = 0;
    teams = [coons, scouts];

	gameStarted = 0;
	$('#debugOptions').slideDown(1000);
	$('#newTurnButton').fadeOut(1000);
	$('#playerinfo').effect('explode', 1000);
	$('#battleground').slideUp(1000, function() {
		battleground.innerHTML = '';
	});
}
function moveUnit(tUnit, direction, unitid) {
	if (tUnit.moved > tUnit.mov) return;
	var dirID = Number.isInteger(direction);
	if (!dirID) dirID = dirs.indexOf(direction);
	if (dirID > 4) {
		var directionsByOrder = [
		'up',
		'upright',
		'right',
		'downright',
		'down',
		'downleft',
		'left',
		'upleft',
		]
		dirID = directionsByOrder.indexOf(dirs[dirID]);
		//Check enemy towers.
		var left = (dirID - 1);
		var right = (dirID + 1);
		if (left < 0) left = 7;
		if (right > 7) right = 0;
		left = directionsByOrder[left];
		right = directionsByOrder[right];
		console.log('Diagonal movement to '+left+' '+right);
		var leftSquare = directionFromHere(tUnit.width, tUnit.height, left);
		var rightSquare = directionFromHere(tUnit.width, tUnit.height, right);

		var leftUnit = unitHere(leftSquare.width, leftSquare.height);
		var rightUnit = unitHere(rightSquare.width, rightSquare.height);

		console.log('Left unit: '+leftUnit.unit+' Right: '+rightUnit.unit);
		var blocks = 0;
		if (leftUnit.enemy) {
			console.log('Left unit is an enemy!');
			var lu = teams[leftUnit.team].units[leftUnit.unit];
			if (!lu.passable) {
				blocks++;
			}
		}
		if (rightUnit.enemy) {
			console.log('Right unit is an enemy!');
			var ru = teams[rightUnit.team].units[rightUnit.unit];
			if (!ru.passable) {
				blocks++;
			}
		}
		if (blocks == 2) return;
	}

	var target = directionFromHere(tUnit.width, tUnit.height, direction);

	tUnit.lastWidth = tUnit.width;
	tUnit.lastHeight = tUnit.height;

	var tw = target.width;
	var th = target.height;
	if (tw > DEFAULT_WIDTH || th > DEFAULT_HEIGHT) return;
	var there = tiles[target.width][target.height];
	if (unitHere(target.width, target.height)) return unitHere(target.width, target.height);
	if (!tUnit.movable) return;
	var movementCost = 1;
	if (there != 'sprite_grass') movementCost = 2;
	if (there == 'sprite_grass' && tUnit.type == 'sprite_gnome' && !rand(0,10)) {
		var possibleTiles = ['sprite_flower', 'sprite_shroom', 'sprite_weeds', 'sprite_bush'];
		changeTile(tw, th, read(possibleTiles));
	}
	if (there == 'sprite_weeds' || there == 'sprite_puddle') movementCost = 3;
	if (there == 'sprite_frost') movementCost = 0.25;
	if (there == 'sprite_ice') movementCost = 0.125;
	if (there == 'sprite_ice' || there == 'sprite_frost' || there == 'sprite_puddle') {
		if (tUnit.temp > 0) tUnit.temp -= 2;
	}
	if (there == 'sprite_mud') movementCost = 4;
	if ((there == 'sprite_nettle' || there == 'sprite_spikerock')) damageUnit(tUnit, 1);
	if (there.match('hole')) movementCost = 99;
	if (there == 'sprite_grasshole') changeTile(tw, th, 'sprite_hole');
	if (there == 'sprite_money') {
		var toAdd = rand(1, (MAX_COON_LEMONS*2));
		var addy = toAdd * -1;
		toAdd = '+'+toAdd+'ç';
		onUnitNotification(tw, th, toAdd, 1);
		buy(tUnit.team, addy);
		changeTile(tw, th, 'sprite_grass');
	}
	if (there == 'sprite_trap') {
		changeTile(tw, th, 'sprite_grass');
		damageUnit(tUnit, 5);
		snd_explosion.pause();
		snd_explosion.currentTime = 0;
		snd_explosion.play();
	}

	tUnit.status = '';
	if (there == 'sprite_flower') {
		tUnit.status = 'extradef';
	}
	if (there == 'sprite_rock') {
		tUnit.status = 'extraatk';
	}
	if (there == 'sprite_dirt') {
		tUnit.status = 'extradmg';
	}
	if (there == 'sprite_hole') {
		tUnit.status = 'on_a_hole';
	}
	if (there.match('corrupt')) {
		damageUnit(tUnit, rand(0,1), 1);
		snd_crack.play();
		movementCost = 1;
	}
	if (there == 'sprite_spikehole') {
		damageUnit(tUnit, 5);
	}
	if (there == 'sprite_mud') {
		tUnit.status = 'lessdmg';
	}
	if (there == 'sprite_poison') {
		tUnit.poison = 3;
	}
	if (there == 'sprite_shroom') {
		if (tUnit.type == 'sprite_gnome') tUnit.regen += 2;
		if (tUnit.type != 'sprite_gnome') tUnit.poison += 2;
		healUnit(tUnit, 2);
		changeTile(tw, th, 'sprite_grass');
	}
	if (there == 'sprite_hotsprings') {
		if (tUnit.temp < 0) tUnit.temp += 2;
		movementCost = 0.5;
	}

	if (tUnit.poison) {
		damageUnit(tUnit, 1);
		tUnit.poison -= rand(0,1);
		snd_crack.play();
		if (tUnit.poison == 0) snd_splash.play();
	}
	if (tUnit.disease && !tUnit.type.match('zombie')) {
		damageUnit(tUnit, rand(0,1), 1);
		snd_splash.play();
	}
	if (tUnit.regen) {
		healUnit(tUnit, 1);
		tUnit.regen -= rand(0,1);
		if (tUnit.regen == 0) snd_splash.play();
	}
	if (tUnit.bite) {
		tUnit.bite -= 1;
		if (tUnit.bite <= 0) {
			tUnit.type = 'sprite_vampire';
			tUnit.atk = Math.ceil(tUnit.atk * 2);
			if (tUnit.def < 0) tUnit.def = 0;
			tUnit.def = Math.ceil(tUnit.def * 2);
			tUnit.mov = Math.ceil(tUnit.mov * 2);
		}
	}
	//Effects of weather
	if (temperature < MIN_TEMPERATURE && rand(0,1)) {
		movementCost += Math.abs(tUnit.temp);
		tUnit.temp -= 1;
	}
	if (temperature > MAX_TEMPERATURE && rand(0,1)) {
		tUnit.temp += 1;

		var sunDamage = rand(0, tUnit.temp);
		damageUnit(tUnit, sunDamage);
	}

	if (there == 'sprite_blueberry' && tUnit.hp < tUnit.hpx) {
		changeTile(tw, th, 'sprite_bush');
		var heal = 5;
		healUnit(tUnit, heal);
	}
	if (there == 'sprite_purpleberry' && tUnit.hp < tUnit.hpx) {
		changeTile(tw, th, 'sprite_bush');
		var heal = tUnit.hpx - tUnit.hp;
		healUnit(tUnit, heal);
	}
	if (there == 'sprite_goldberry') {
		changeTile(tw, th, 'sprite_bush');
		levelUp(tUnit, true);
	}
	if (there == 'sprite_rainbowgrape' || there == 'sprite_badberry') {
		changeTile(tw, th, 'sprite_bush');
		var r = red('atk', 'def', 'mov');
		var names = {'atk': translate('Ataque|Attack'), 'def': translate('Defensa|Defense'), 'mov': translate('Movimiento|Movement')};
		var qty = (there == 'sprite_badberry') ? -1 : 1;
		tUnit[r] += qty;
		onUnitNotification(tUnit.width, tUnit.height, names[r]+' +1', 1);
	}

	if (turn == 0) {
		var breakIt = 0;
		if (there == 'sprite_stand1') {
			changeTile(tw, th, 'sprite_stand1_broken');
			var breakIt = 1;
		}
		if (there == 'sprite_stand2') {
			changeTile(tw, th, 'sprite_stand2_broken');
			var breakIt = 1;
		}
		if (there == 'sprite_stand3') {
			changeTile(tw, th, 'sprite_stand3_broken');
			var breakIt = 1;
		}
		if (breakIt) {
			breakNexus(there);
			movementCost = 99;
		}
	}
	if (turn == 1) {
		var breakIt = 0;
		if (there == 'sprite_sage1') {
			changeTile(tw, th, 'sprite_sage1_broken');
			var breakIt = 1;
		}
		if (there == 'sprite_sage2') {
			changeTile(tw, th, 'sprite_sage2_broken');
			var breakIt = 1;
		}
		if (there == 'sprite_sage3') {
			changeTile(tw, th, 'sprite_sage3_broken');
			var breakIt = 1;
		}
		if (breakIt) {
			breakNexus(there);
			movementCost = 99;
		}
	}
	if (tUnit.moved <= 0 && movementCost < 0) movementCost = 0;
	tUnit.moved += movementCost;
	if (direction == 'left') tUnit.width--;
	if (direction == 'right') tUnit.width++;
	if (direction == 'up') tUnit.height--;
	if (direction == 'down') tUnit.height++;

	if (direction == 'upleft') {
		tUnit.width--;
		tUnit.height--;
	}
	if (direction == 'upright') {
		tUnit.width++;
		tUnit.height--;
	}
	if (direction == 'downleft') {
		tUnit.width--;
		tUnit.height++;
	}
	if (direction == 'downright') {
		tUnit.width++;
		tUnit.height++;
	}
	if (tUnit.width >= (DEFAULT_WIDTH-2) && raceMode) expandPanel();
	var tile = '#tile_'+tUnit.width+'_'+tUnit.height;
	document.body.scrollLeft = ($(tile).offset().left - 256);

	var unit_tile = 'team_'+unitid.team+'_unit_'+unitid.unit;

	doc(unit_tile).style.left = tUnit.width * 32+'px';
	doc(unit_tile).style.top = (tUnit.height * 32)+'px';

	var exclass = getUnitExtraClasses(tUnit, focusedUnit.team);
	doc(unit_tile).className = exclass;
	doc(unit_tile).innerHTML = lifeBar(tUnit);

	moveFocuser();
	if (there == 'sprite_puddle' || there == 'sprite_mud') {
		snd_splash.play();
	}
	else if (there == 'sprite_hole') {
		snd_fall.play();
	}
	else {
		snd_step.play();
	}
	records[tUnit.team].totalMovements++;

	updateRange(tUnit);
}
function unitHere(w, h) {
	for (var uh in coons.units) {
		var ut = coons.units[uh];
		var enemy = (turn == 0) ? 0 : 1;
		if (ut.width == w && ut.height == h) return {'team': 0, 'unit': uh, 'enemy': enemy};
	}
	for (var uh in scouts.units) {
		var ut = scouts.units[uh];
		var enemy = (turn == 1) ? 0 : 1;
		if (ut.width == w && ut.height == h) return {'team': 1, 'unit': uh, 'enemy': enemy};
	}
	return 0;
}
function directionFromHere(w, h, dir) {
	if (Number.isInteger(dir)) dir = dirs[dir];
	if (dir == 'left') w--;
	if (dir == 'right') w++;
	if (dir == 'up') h--;
	if (dir == 'down') h++;

	if (dir == 'upleft') {
		w--;
		h--;
	}
	if (dir == 'upright') {
		w++;
		h--;
	}
	if (dir == 'downleft') {
		w--;
		h++;
	}
	if (dir == 'downright') {
		w++;
		h++;
	}
	return {'width': w, 'height': h};
}
function getDirection(fromw, fromh, tow, toh) {
	if (fromw > tow && fromh > toh) return 'upleft';
	if (fromw > tow && fromh < toh) return 'downleft';
	if (fromw < tow && fromh > toh) return 'upright';
	if (fromw < tow && fromh < toh) return 'downright';

	if (fromw > tow) return 'left';
	if (fromw < tow) return 'right';
	if (fromh < toh) return 'down';
	if (fromh > toh) return 'up';
}
function levelUp(guy, force, upmode) {
	var type = guy.type;
	if (guy.cannotLevelUp && !force) {
		return;
	}
	var chances = rand(1, guy.level);
	if (chances != 1 && !force) return;
	snd_levelup.play();

	guy.level++;
	healUnit(guy, HP_PER_LEVELUP);

	var atkPerLevelUp = prototypes[type].atk / 10;
	var defPerLevelUp = prototypes[type].def / 10;
	atkPerLevelUp += (atkPerLevelUp*Math.random() + rand(0,1));
	defPerLevelUp += (defPerLevelUp*Math.random() + rand(0,1));

	if (upmode) {
		if (guy.range) guy.range += rand(0,1);
		if (guy.mov) guy.mov += rand(0,1);
	}

	guy.atk += atkPerLevelUp;
	guy.def += defPerLevelUp;

	var message = translate('Nivel |Level ')+guy.level;
	if (upmode) message = translate('¡Ascenso! |Upgrade! ')+message;
	onUnitNotification(guy.width, guy.height, message, 1);

	records[guy.team].levelUps++;
}
function bonus(team, level) {
	if (team == 1) {
		var q = (level * 8)
		scouts.money += q;
		records[1].goldEarned += q;
	}
	else {
		var q = (level * 8);
		coons.lemons += q;
		records[0].goldEarned += q;
	}
}
function damageFormula(from, to, simul) {
	if (raceMode) return 0;
	if (from.disease && rand(0,1) && !to.type.match('zombie') && !simul) to.disease = 1;
	var at = from.atk;
	var de = to.def;
	var dist = distance(from, to);
	if (dist > 2) {
		var distMod = 1+(dist/10);
		at = Math.ceil(at * distMod);
	}

	if (from.status == 'extraatk') at *= 1.5;  //Rock: Increases attack to 150% before attacking.
	if (to.status == 'extradef') de *= 1.5;    //Flower: Increases defense to 150% before receiving the attack.

	if (to.status == 'extradmg') de *= 0.5;   //Dirt: Decreases defense to 50% before being attacked.
	if (from.status == 'lessdmg') at *= 0.5;  //Mud: Decreases attack to 50% before attacking.

	if (from.status == 'on_a_hole' || to.status == 'on_a_hole') { //Hole: Blocks all attacks.
		return 0;
	}

	var d = mutatio(at) - de;
	if (d < 1) d = 1;
	if (from.archetype == 'priest' && to.archetype == 'evil') d = (from.hp + to.hp + from.atk + to.atk + from.def + to.def) * 3 * from.level * to.level;
	if (from.archetype == 'evil' && to.archetype == 'priest') d = 0;
	if (from.archetype == 'succubus') {
		var chances = to.level;
		if (!rand(0,chances)) {
			var check = checkConversion(from, to, 1);
			if (check && !simul) spawnUnitHere(from.team, check, to.width, to.height, to);
			return 0;
		}
	}

	return Math.ceil(d);
}
function checkConversion(from, to, succubus) {
	if (from.zombie && !to.zombie) {
		if (to.archetype == 'coon') return 'sprite_zombieCoon';
		if (to.archetype == 'scout') return 'sprite_zombieScout';
	}
	if (from.type == 'sprite_vampire') {
		if (to.archetype == 'scout') return 'sprite_bitten';
	}
	if (from.archetype == 'succubus' && succubus) {
		if (to.archetype == 'coon') return 'sprite_traitorCoon';
		if (to.archetype == 'scout') return 'sprite_traitorBoyScout';
	}
}
function steal(fromGuy, toGuy, amount) {
	if (fromGuy.team == 0) {
		teams[toGuy.team].money -= amount;
		teams[fromGuy.team].lemons += amount;
	}
	else {
		teams[toGuy.team].money -= amount;
		teams[fromGuy.team].lemons += amount;	
	}
	snd_splash.play();
	setTimeout(function() {onUnitNotification(toGuy.width, toGuy.height, '-'+amount+'ç', 1)}, 100);
	setTimeout(function() {onUnitNotification(fromGuy.width, fromGuy.height, '+'+amount+'ç', 1)}, 800);
}
function attack(pov, from, to, simulation) {
	var pov2 = (pov == 0) ? 1 : 0;
	var enemyTeam = (pov == 0) ? scouts : coons;
	var allyTeam = teams[pov];

	var fromn = from;
	var ton = to;

	var from = allyTeam.units[fromn];
	var to = enemyTeam.units[ton];

	var dist = distance(from, to);
	var isRanged = false;
	if (dist > 1) isRanged = true;
	if (dist <= 1) isRanged = false;

	if (!from || !to) return;

	if (!simulation) from.moved = 99;

	//Ally attack
	var dmg = damageFormula(from, to, simulation);
	if (!isRanged) dmg = Math.ceil(dmg * 1.5);

	var condition1 = (to.hp - dmg);

	if (from.archetype == 'stealer' && !simulation) {
		var stealMax = (from.atk + from.mov) * from.level;
		var stealin = rand(0, stealMax);
		if (from.team == 0) {
			var mon = enemyTeam.money;
			if (stealin > mon) stealin = mon;
			if (stealin) {
				steal(from, to, stealin);
				return;
			}
		}
		else {
			var mon = enemyTeam.lemons;
			if (stealin > mon) stealin = mon;
			if (stealin) {
				steal(from, to, stealin);
				return;
			}
		}
	}
	if (!simulation) {
		to.hp -= dmg;
		onUnitNotification(to.width, to.height, '-'+dmg+'HP', 1);
		records[pov].totalDamage += dmg;
		if (from.suck) healUnit(from, 1);
	}
	if (to.hp <= 0) {
		snd_fall.play();

		bonus(pov, to.level);
		levelUp(from);
        var check = checkConversion(from, to);
		if (check) spawnUnitHere(pov, check, to.width, to.height, to);

		setTimeout(function() {killUnit(enemyTeam, ton)}, 100);
		records[pov].unitsKilled++;
		return;
	}
	if (!simulation) if (!to.counter || !from.counter || isRanged) return;

	//Enemy attack
	var dmg = damageFormula(to, from, simulation);
	var condition2 = (from.hp - dmg);

	if (!simulation) {
		from.hp -= dmg;
		onUnitNotification(from.width, from.height, '-'+dmg+'HP', 1);
		records[pov2].totalDamage += dmg;
	}
	if (from.hp <= 0) {
		snd_fall.play();

		var pov2 = (pov == 0) ? 1 : 0;
		bonus(pov2, from.level);
		levelUp(to);
		var check = checkConversion(to, from);
		var pov2 = (pov == 0) ? 1 : 0;
		if (check) spawnUnitHere(pov2, check, from.width, from.height, from);

		setTimeout(function() {killUnit(allyTeam, fromn)}, 100);
		records[pov2].unitsKilled++;
		return;
	}
	if (simulation) {
		if (condition1 < condition2) return -1;
		if (condition2 < condition1) return 1;
		return 0;
	}
	if (!simulation) {
		snd_attack.play();
	}
	
}
function killUnit(team, id) {
	var thisUnit = team.units[id];
	var thisw = thisUnit.width;
	var thish = thisUnit.height;
	if (thisUnit.type == 'sprite_tower') {
		changeTile(thisw, thish, 'sprite_tower_broken');
	}
	if (thisUnit.type == 'sprite_wall') {
		changeTile(thisw, thish, 'sprite_wall_broken');
	}
	if (thisUnit.type == 'sprite_barbedWire') {
		changeTile(thisw, thish, 'sprite_barbedWire_broken');
	}
	if (thisUnit.type == 'sprite_cannon') {
		changeTile(thisw, thish, 'sprite_cannon_broken');
	}
	team.units.splice(id, 1);
	if (team.units.length < 1 && raceMode) {
		if (scouts.units.length < 1)
			win(translate('¡El equipo Mapache ha ganado la carrera!|The Raccoon team wins the race!'));
		if (coons.units.length < 1)
			win(translate('¡El equipo Boy Scout ha ganado la carrera!|The Boy Scout team wins the race!'));
	}
	snd_fall.play();
	checkAllUnitIDs();
}
function checkAllUnitIDs() {
	for (var uid in coons.units) {
		coons.units[uid].team = 0;
		coons.units[uid].unitID = uid;
	}
	for (var uid in scouts.units) {
		scouts.units[uid].team = 1;
		scouts.units[uid].unitID = uid;
	}
}
function getRandomCoordinate() {
	return {'width': rand(0, (DEFAULT_WIDTH-1)), 'height': rand(0, (DEFAULT_HEIGHT-1))};
}
function randomWallBaseSpot(type) {
	var baseWallMaxDistance = Math.floor(DEFAULT_HEIGHT/2);
	if (type == 'trap') baseWallMaxDistance += 2;
	if (type == 'tower') baseWallMaxDistance -= 2;
	var baseWidth = (aiTurn == 0) ? 2 : (DEFAULT_WIDTH - 2);
	var baseHeight = Math.floor(DEFAULT_HEIGHT/2);
	var distanceWidth = rand(0, baseWallMaxDistance);
	if (aiTurn == 1) distanceWidth *= -1;
	var distanceLeft = baseWallMaxDistance - Math.abs(distanceWidth);
	var distanceHeight = distanceLeft * red(-1, 1);

	console.log('Base is located at: '+baseWidth+' '+baseHeight);

	var pos = {
		'width': (baseWidth + distanceWidth),
		'height': (baseHeight + distanceHeight),
	}
	console.log('Position is: '+pos.width+' '+pos.height);
	var bh = unitHere(pos.width, pos.height);
	if (bh) return;
	return pos;
}
function aiBuildingSimulator(debug) {
	if (survivalMode && turn == 0) return; //No buildings in survival mode.
	if (!debug && turn != aiTurn) return; //What a nice rhyme here haha jk.
	var where = getRandomCoordinate();
	var what = red(0, red(0,1), red(0,1,2));
	var builds = ['tower', 'wall', 'trap'];
	var prices = [TOWER_PRICE, WALL_PRICE, TRAP_PRICE];
	buildmode = builds[what];
	//Base Wall
	where = randomWallBaseSpot(buildmode);
	if (!where || tileHere(where.width, where.height) == 'void') {
		console.log('Building is not permited here.');
		return;
	}
	console.log('Will build a '+buildmode);

	var futureBuilding = getBuildingHere(buildmode, where.width, where.height, debug);
	if (!futureBuilding.error) action(where.width, where.height);
}
function moveFocuser() {
	//Focuser
	if (focusedUnit != undefined) {
		if (teams[focusedUnit.team] == undefined) return;
		var unit = teams[focusedUnit.team].units[focusedUnit.unit];
		var off = {'top': (unit.height * 32), 'left': (unit.width * 32)};
		if (off != undefined) {
			focuser.style.opacity = 1;
			focuser.style.top = (off.top)+'px';
			focuser.style.left = off.left+'px';
		}
		if (off == undefined) focuser.style.opacity = 0;
	}
}
function artificialIntelligenceMovement() {
	if (!gameStarted) return;

	moveFocuser();

	if (aiLoop) aiTurn = turn;
	if (turn != aiTurn) return;
	if (!canMove(aiTurn)) {
		//If there are no more units available for moving, the AI spawns some units then ends its turn.
		aiSpawn();
		newTurn();
	}
	//If there are units that can move, the AI tries to move them.
	aiStep();
}
function spawnUnitHere(team, type, width, height, father) {
	teams[team].units.push(new Unit('spawned', type, width, height, father));
	updatePanel();
}
function aiSpawn() {
	//The AI selects a random unit from the roster to spawn.
	var selectToSpawn = read(spawnSelectorMode(1));
	spawnmode = selectToSpawn;
	//Spawn Phase 1: Units
	if (!spawn && selectToSpawn) {
		if (aiTurn == 0) {
			for (var xx in sagesL) {
				if (!aiSageAreaClear(xx)) continue;
				if (!rand(0,1)) {
					//50% chances of spawn
					selectSpawn(selectToSpawn, sagesL[xx].width, sagesL[xx].height, 0);
				}
			}
			spawn = 1;
		}
		if (aiTurn == 1) {
			for (var xx in standsL) {
				if (!aiSageAreaClear(xx)) continue;
				if (!rand(0,1)) {
					//50% chances of spawn
					selectSpawn(selectToSpawn, standsL[xx].width, standsL[xx].height, 1);
				}
			}
			spawn = 1;
		}
	}
	//Spawn Phase 2: Buildings
	while (rand(0,10)) aiBuildingSimulator();

	//Spawn Phase 3: Upgrades
	var ru = teams[aiTurn].units;
	var rumax = ru.length - 1;
	ru = rand(0, rumax);
	if (teams[aiTurn].units[ru] && !raceMode && !survivalMode) {
		upgrademode = true;
		focusy(aiTurn, rumax);
	}
}
function aiSageAreaClear(sageID) {
	if (aiTurn == 0) {
		var sage = sagesL[sageID];
	}
	if (aiTurn == 1) {
		var sage = standsL[sageID];
	}
	if (isAreaClear(sage.width, sage.height)) return 1;
}
function getRandomFocus(team) {
	var enemies = getEnemyTeam(team);
    var num = enemies.units.length - 1;
	var foc = rand(0, num);
	
	return foc;
}
function isValidTarget(allyTeam, num) {
	var enemy = getEnemyTeam(allyTeam);
	var max = enemy.units.length;
	if (num < 0 || num >= max) return;
	return 1;
}
function canIGoThereNow(fromw, fromh, tow, toh) {

}
function aiStep() {
	console.log('Trying to move.');
	var mainObjective = (turn == 1) ? sagesL : standsL;
	mainObjective = read(mainObjective);

	//Select guy: Selects the first unit that can move.
	var randomGuy = canMove(aiTurn);
	aiFocus = randomGuy.unitID;
	var guy = aiFocus;
	focusy(aiTurn, aiFocus);
	console.log('Selected guy number '+randomGuy.unitID);

	//Move guy
	var thisGuy = getFocusedUnit();
	if (thisGuy) {
		focus = thisGuy.target;
		var nuFocus = -1;
		if (!isValidTarget(aiTurn, focus) || rand(0,1)) nuFocus = mostValuableEnemy(thisGuy).unitID;
		if (nuFocus >= 0) thisGuy.target = nuFocus;

		var enemies = getEnemyTeam(aiTurn);
		focus = enemies.units[thisGuy.target];
		if (turn == 1 && survivalMode) {
			//Why focus sages?!
		}
		else {
			if (!focus || !rand(0,10) || thisGuy.tactic == 4) focus = mainObjective;
		}
		if (thisGuy.tactic == 6 && closestEnemy(thisGuy)) focus = closestEnemy(thisGuy);

		if (!focus) focus = getRandomCoordinate();
		var w = focus.width;
		var h = focus.height;

		var iac = isAreaClear(thisGuy.width, thisGuy.height, 8, 0, 1, w, h);
		var vt = 0;
		if (thisGuy.range > 0 && !raceMode) {
			vt = closerTarget(thisGuy.width, thisGuy.height, 0, thisGuy);
			if (vt) {
				action(vt.width, vt.height);
				return;
			}
		}
		if (iac && !raceMode) {
			action(w, h);
			return;
		}

		if (thisGuy.tactic == 2) {
			var ct = closerTarget(thisGuy.width, thisGuy.height, 'hi', thisGuy);
			if (!ct) ct = getRandomCoordinate();
			w = ct.width+rand(-1,1);
			h = ct.height+rand(-1,1);
		}

		var freeSpace = -1;

		//Check if enemy units nearby
		for (var aic = 0; aic < 4; aic++) {
			var ucheck = directionFromHere(thisGuy.width, thisGuy.height, aic);
			var isEnemyHere = unitHere(ucheck.width, ucheck.height);
			if (!isEnemyHere) freeSpace = aic;
			if (isEnemyHere.enemy) {
				//Check enemy level
				var targetUnit = teams[isEnemyHere.team].units[isEnemyHere.unit];
				var lev = targetUnit.level;

				//Compare enemy strength
				var points = 5;
				if (thisGuy.level > targetUnit.level) points--;
				if (thisGuy.hp > targetUnit.hp) points--;
				if (thisGuy.atk > targetUnit.atk) points--;
				if (thisGuy.def > targetUnit.def) points--;
				var winChances = rand(1, points);
				if (thisGuy.tactic == 1) winChances = (thisGuy.level >= targetUnit.level) ? 1 : 2;
				if (thisGuy.tactic == 5) winChances = 2;
				if (thisGuy.status == 'on_a_hole' || targetUnit.status == 'on_a_hole') winChances = 2;
				if (thisGuy.tactic == 6) winChances = 1;

				if (winChances <= 1 && !raceMode) action(ucheck.width, ucheck.height);
			}
		}
		//Check available paths
		if (raceMode) {
			w = (DEFAULT_WIDTH - 1);
			h = rand(0, (DEFAULT_HEIGHT - 1));
		}

		var bestDir = aiGetBestDirection(thisGuy.width, thisGuy.height, w, h);
		if (thisGuy.tactic == 3 && rand(1,10) != 1) {
			//Patrol tactic, goes up and down
			bestDir = rand(2,3);
		}
		if (!rand(0,10) || thisGuy.status == 'on_a_hole') bestDir = rand(0,7);
		var dir = directionFromHere(thisGuy.width, thisGuy.height, bestDir);

		var targ = directionFromHere(thisGuy.width, thisGuy.height, bestDir);
		var uhh = unitHere(targ.width, targ.height);

		//Movement
		action(targ.width, targ.height);
	}

}
function randomDirection(unit) {
	var wi = unit.width;
	var he = unit.height;
	var directions = ['up', 'down', 'left', 'right', 'upleft', 'upright', 'downleft', 'downright'];

	var targ = directionFromHere(wi, he, read(directions));
	return targ;
}
function freeSpace(unit) {
	var wi = unit.width;
	var he = unit.height;

	var directions = ['up', 'down', 'left', 'right', 'upleft', 'upright', 'downleft', 'downright'];
	for (var fs in directions) {
		var targ = directionFromHere(wi, he, directions[fs]);
		if (!unitHere(targ.width, targ.height)) return targ;
	}
}
function canMove(team) {
	if (!gameStarted) return;
	if (survivalMode && coons.units.length < 1) return;
	var unitsThatCanMove = 0;
	var units = teams[team].units.length;
	if (units < 0) return;
	for (var cm = 0; cm < units; cm++) {
		var unit = teams[team].units[cm];
		if (!canThisUnitMove(unit)) continue;
		if (!hasMoved(team, cm) && unit.movable) return unit;
	}
	return unitsThatCanMove;
}
function canThisUnitMove(unit) {
	if (isAreaSurrounded(unit.width, unit.height)) return false;
	return true;
}
function getFocusedUnit() {
	var team = focusedUnit.team;
	var unt = focusedUnit.unit;
	if (!teams[team]) return;
	return teams[team].units[unt];
}
function getEnemyTeam(team) {
	if (team == 0) return scouts;
	if (team == 1) return coons;
}
function hasMoved(team, unt, peek) {
	var guyz = teams[team].units[unt];
	if (!guyz) return 1;
	if (!guyz.movable) return 1;
	var moved = guyz.moved;
	var mov = guyz.mov;
	if (peek) return guyz;
	if (moved >= mov) return 1;
}
function buy(teamID, cost, simul) {
	var msg = translate('Necesitas |You need ')+cost;
	msg += (turn == 0) ? translate(' limones| lemons') : 'ç citros';
	if (teamID == 0) {
		//Coons buy with lemons.
		if (coons.lemons < cost) {
			if (simul) return 0;
			mouseNotif('<span class="red">'+msg+'</span>');
			return;
		}
		if (simul) return 1;
		coons.lemons -= cost;
	}
	else {
		//Scouts buy with money.
		if (scouts.money < cost) {
			if (simul) return 0;
			mouseNotif('<span class="red">'+msg+'</span>');
			return;
		}
		if (simul) return 1;
		scouts.money -= cost;
	}
	var ex = (turn == 0) ? '' : 'ç';
	if (cost < 0) mouseNotif('-'+cost+ex);
	return 1;
}
function mouseNotif(text, textClass, longer) {
	if (text < 0) {
		mouseNotification.innerHTML = '';
		$('#mouseNotification').hide();
		return;
	}
	lastCursorX = cursorX;
	lastCursorY = cursorY;

	if (!textClass) textClass = 'white';
	mouseNotification.innerHTML = '<span class="'+textClass+'">'+text+'</span>';
	var bodyLength = $('body').width() / 2;
	var mul = (cursorX > bodyLength) ? -1 : 0;
	var add = $('#mouseNotification').width() + 48;
	mouseNotification.style.left = (cursorX+16+(add*mul))+'px';
	mouseNotification.style.top = (cursorY+64)+'px';
	$('#mouseNotification').stop();
	var time = (longer) ? 20000 : 2000;
	$('#mouseNotification').fadeIn(100).fadeOut(time);
}
function hideMouseNotification() {
	//$('#mouseNotification').fadeOut(100);
}
function closer(fromw, fromh, tow, toh) {
	var customDirs = ['up', 'upright', 'right', 'downright', 'down', 'downleft', 'left', 'upleft'];
	var scores = [0, 1, 2, 3, 4, 3, 2, 1];

	var bestDirection = getDirection(fromw, fromh, tow, toh);
	var ix = customDirs.indexOf(bestDirection);
	if (ix < 0 || ix > scores.length) return;

	while (scores[ix] != 0) cycle(scores);

	var dirScores = {};

	for (var clos = 0; clos < 8; clos++) {
		dirScores[customDirs[clos]] = (scores[clos] * AI_MAX_AGGRESSIVITY);
	}

	
	return dirScores;
}
function aiGetBestDirection(fromWidth, fromHeight, toWidth, toHeight) {
	var tileScore = isAreaClear(fromWidth, fromHeight, 8, true);
	var dirScore = closer(fromWidth, fromHeight, toWidth, toHeight);
	var totalScore = [];
	for (var gbd = 0; gbd < 8; gbd++) {
		var i2dir = dirs[gbd];
		var ex = 0;
		if (gbd == 1 || gbd == 5 || gbd == 7) {

		}
		else {
			if (raceMode) ex += 99;
		}
		totalScore[gbd] = tileScore[i2dir] + dirScore[i2dir] + ex;
	}
	var bestIndex = 0;
	var alternate = 0;
	for (var g = 0; g < 8; g++) {
		if (totalScore[g] < totalScore[bestIndex]) bestIndex = g;
	}
	if (fromWidth <= 0 || fromHeight <= 0 || fromWidth >= DEFAULT_WIDTH || fromHeight >= DEFAULT_HEIGHT) return rand(0,8);
	return bestIndex;
}
function cycle(array) {
	array.push(array.shift());
	return array;
}
function isAreaSurrounded(wth, hgt) {
	var obstacles = 0;
	for (var ias = 0; ias < 8; ias++) {
		var dir = directionFromHere(wth, hgt, ias);
		if (dir.width >= DEFAULT_WIDTH || dir.width < 0 || dir.height < 0 || dir.height >= DEFAULT_HEIGHT || unitHere(dir.width, dir.height)) obstacles++;
	}
	if (obstacles >= 8) return true;
	return false;
}
function checkCorruption(width, height) {
	var thisTile = tileHere(width, height);
	if (thisTile.match('sage') || thisTile.match('stand') || thisTile.match('corrupt')) return 0;
	for (var cc = 0; cc < 4; cc++) {
		if (cc > 1 && !rand(0,1)) continue;
		var dir = directionFromHere(width, height, cc);
		var there = tileHere(dir.width, dir.height);
		if (there.match('corrupt') && there != 'sprite_corrupt1') return 1;
	}
}
function isAreaClear(wth, hgt, mode, tiles, targetCheck, targetw, targeth) {
	/* Modes:
	0 - Check this tile
	2 - Checks left and right tiles.
	4 - Checks left, right, up and down tiles.
	8 - Checks all directions, including diagonal. */
	if (mode == 0 || !mode) {
		var uh = unitHere(wth, hgt);
		if (uh) return 0;
		return 1;
	}
	var directions = {};
	for (var iac = 0; iac < mode; iac++) {
		var dir = directionFromHere(wth, hgt, iac);
		if (targetCheck) {
			var there = tileHere(dir.width, dir.height);

			if (targetw == dir.width && targeth == dir.height) return 1;
			if (there.match('sage') && turn == 1) return 1;
			if (there.match('stand') && turn == 0) return 1;
			var ut = unitHere(targetw, targeth);
			if (ut && ut.enemy) {
				ut = teams[ut.team].units[ut.unit];
				var me = unitHere(wth, hgt);
				me = teams[me.team].units[me.unit];
				if (me.atk > (ut.hp + ut.def)) return 1;
				if (ut.hp == 1) return 1;
			}
		}
		

		if (dir.width < 0 || dir.height < 0 || dir.width >= DEFAULT_WIDTH || dir.height >= DEFAULT_HEIGHT) continue;
		var unitCheck = unitHere(dir.width, dir.height);
		if (unitCheck && !tiles) return false;
		var there = tileHere(dir.width, dir.height);
		var tileScore = aiTilePreferences[there];
		if (!tileScore) tileScore = 0;
		if (there.match('sage')) tileScore = (turn == 0) ? 99: -99;
		if (there.match('stand')) tileScore = (turn == 1) ? 99: -99;
		if (unitCheck || rand(1,10) == 1) tileScore += 99;

		directions[dirs[iac]] = tileScore;
	}
	if (targetCheck) return;
	if (tiles) return directions;
	return true;

}
function noBuildMode() {
	buildmode = '';
}
function getBuildingPermissions(team) {
	var half = Math.floor(DEFAULT_WIDTH/2);
	if (team == 0) return {'minWidth': 0, 'maxWidth': half};
	if (team == 1) return {'minWidth': half, 'maxWidth': (DEFAULT_WIDTH-1)};
}
function getBuildingHere(bmode, width, height, force) {
	var cantbuild = translate('No puedes construir aquí.|You can\'t build here.');
	var nomoney = translate('No hay dinero.|No money.');

	var build = '';
	var perm = getBuildingPermissions(turn);
	var panel = tileHere(width, height);

	if (width > perm.maxWidth || width < perm.minWidth) {
		var err = translate('Construcción fuera de los límites.|Building out of boundaries.');
	}
	if (unitHere(width, height)) var err = cantbuild;



	if (bmode == 'tower') var toBuild = (turn == 0) ? 'sprite_cannon' : 'sprite_tower';
	var builds = {
		'tower': {
			'variant': ['sprite_cannon', 'sprite_tower'],
			'price': TOWER_PRICE,
		},
		'wall': {
			'variant': ['sprite_barbedWire', 'sprite_wall'],
			'price': WALL_PRICE,
		},
		'trap': {
			'price': TRAP_PRICE,
		}
	};

	var pr = (!builds[bmode]) ? 0 : builds[bmode].price;
	if (bmode != 'trap' && builds && builds[bmode]) var toBuild = builds[bmode].variant[turn];

	if (buy(turn, pr, 1) && true && bmode != 'trap') {
		build = toBuild;
	}
	else {
		err = nomoney;
	}

	if (bmode == 'trap') {
		var toBuild = 'sprite_trap';
		var there = panel;
		if (there == 'sprite_flower') toBuild = 'sprite_nettle';
		if (there == 'sprite_weeds') toBuild = 'sprite_grasshole';
		if (there == 'sprite_hole') toBuild = 'sprite_spikehole';
		if (there == 'sprite_rock') toBuild = 'sprite_spikerock';
		if (there == 'sprite_bush' || there.match('berry') || there == 'sprite_rainbowgrape') toBuild = 'sprite_badberry';
		if (there == 'sprite_puddle' || there == 'sprite_frost' || there == 'sprite_ice' || there == 'sprite_mud') toBuild = 'sprite_poison';
		if (there.match('sage') || there.match('stand') || there == 'sprite_trap' || there.match('spike')) {
			toBuild = '';
		}
		else {
			if (buy(turn, TRAP_PRICE, 1)) {
				build = toBuild;
				err = '';
			}
			else {
				build = '';
				err = nomoney;
			}
		}
	}


	if (!build) err = translate('No puedes construir aquí.|Can\'t build here.');

	if (force) err = '';

	return {'building': build, 'error': err};
}
function distance(from, to) {
	var dw = Math.abs(from.width - to.width);
	var dh = Math.abs(from.height - to.height);
	return dw + dh;
}
function preSpawn(team, width, height) {
	if ($('#spawnSelector').css('display') == 'none') {
		spawnSelectorMode(0, width, height, team);
	} else {
		closeAllStuff();
	}
}
function action(width, height) {
	if (width > DEFAULT_WIDTH || height > DEFAULT_HEIGHT || width < 0 || height < 0) return;
	//Get focused unit
	var toMove, theUnit;
	if (focusedUnit.team == turn) {
		toMove = focusedUnit.unit;
		theUnit = teams[focusedUnit.team].units[toMove];
	}

	var panel = tiles[width][height];
	var sucess = 0;

	if (buildmode && !raceMode) {
		var team = teams[turn];

		if (buildmode == 'debug') {
			var unit = read(allUnits);
			
			team.units.push(new Unit('debug', unit, width, height));
		}
		var perm = getBuildingPermissions(turn);
		if (width > perm.maxWidth || width < perm.minWidth) {
			mouseNotif(translate('Construcción fuera de los límites.|Building out of boundaries.'));
			return noBuildMode();
		}

		if (unitHere(width, height)) return noBuildMode();
		if (true) {
			if (buildmode == 'tower') {
				if (!buy(turn, TOWER_PRICE)) return noBuildMode();

				var toBuild = (turn == 0) ? 'sprite_cannon' : 'sprite_tower';
				changeTile(width, height, toBuild);
				team.units.push(new Unit('scouts', toBuild, width, height));
				sucess = 1;
			}
			if (buildmode == 'wall') {
				if (!buy(turn, WALL_PRICE)) return noBuildMode();

				var toBuild = (turn == 0) ? 'sprite_barbedWire' : 'sprite_wall';
				changeTile(width, height, toBuild);
				team.units.push(new Unit('scouts', toBuild, width, height));
				sucess = 1;
			}
		}
		if (buildmode == 'trap') {
			var toBuild = 'sprite_trap';
			var there = tiles[width][height];
			if (there == 'sprite_flower') toBuild = 'sprite_nettle';
			if (there == 'sprite_weeds') toBuild = 'sprite_grasshole';
			if (there == 'sprite_hole') toBuild = 'sprite_spikehole';
			if (there == 'sprite_rock') toBuild = 'sprite_spikerock';
			if (there == 'sprite_bush' || there.match('berry') || there == 'sprite_rainbowgrape') toBuild = 'sprite_badberry';
			if (there == 'sprite_puddle' || there == 'sprite_frost' || there == 'sprite_ice' || there == 'sprite_mud') toBuild = 'sprite_poison';
			if (there.match('sage') || there.match('stand') || there == 'sprite_trap' || there.match('spike')) {
				sucess = 0;
			}
			else {
				if (!buy(turn, TRAP_PRICE)) return noBuildMode();
				changeTile(width, height, toBuild);
			    sucess = 1;
			}
		}
		
		buildmode = '';
		if (!sucess) mouseNotif(translate('No puedes construír aquí.|You can\'t build here.'));
		updatePanel();
		return;
	}


	var canMove = 1;
	if (panel == 'sprite_sage1' || panel == 'sprite_sage2' || panel == 'sprite_sage3') {
		var side = {'sprite_sage1': 0, 'sprite_sage2': 1, 'sprite_sage3': 2}[panel];
		if (turn == 0) {
			spawnSelectorMode(0, width, height, 0);

			canMove = 0;
		}
	}
	if (panel == 'sprite_stand1' || panel == 'sprite_stand2' || panel == 'sprite_stand3') {
		var side = {'sprite_stand1': 0, 'sprite_stand2': 1, 'sprite_stand3': 2}[panel];
		if (turn == 1) {
			spawnSelectorMode(0, width, height, 1);

			canMove = 0;
		}
	}
	var willMove = 1;

	if (focusedUnit.team == turn && canMove) {
		var targetW = width;
		var targetH = height;
		if (theUnit.moved < theUnit.mov) {
			var direct = getDirection(theUnit.width, theUnit.height, targetW, targetH);

			if (theUnit.type == 'sprite_tower' || theUnit.type == 'sprite_cannon' || theUnit.range > 1) {
				//Tower attacks
				var tgt = unitHere(width, height);
				var uh;
				if (tgt) uh = teams[tgt.team].units[tgt.unit];
				var dis;
				if (uh) var dis = distance(theUnit, uh);

				if (uh && tgt && !tgt.enemy && isUnitWithinRange(theUnit, uh)) {
					//Ally to ally attack
					if (!unitHere(width, height)) return;

					if (theUnit.archetype == 'fairy') {
						snd_magic.play();
						var str = '#team_'+tgt.team+'_unit_'+tgt.unit;
						var pos = $('#focuser').offset();
						var postgt = $(str).offset();
						var proj = 'sprite_ammoLove';
						projectiles.innerHTML = '<div class="projectile sprite '+proj+'" style="top: '+pos.top+'px; left: '+pos.left+'px"></div>';

						$('.projectile').animate({
							top: postgt.top+'px',
							left: postgt.left+'px',
						}, 800, function() {
							snd_splash.play();
					    });
					    $('.projectile').effect('explode', 1200);
					    var targetUnit = teams[tgt.team].units[tgt.unit];
					    var healMax = (theUnit.atk + theUnit.def) * theUnit.level;
					    var heal = rand(1,healMax);
						theUnit.moved = 99;
						setTimeout(function() {
							updatePanel();
							projectiles.innerHTML = '';
							healUnit(targetUnit, heal);
						}, 1200);
					}
					willMove = 0;
				}
				if (dis && dis <= theUnit.range && tgt && uh && tgt.enemy && isUnitWithinRange(theUnit, uh)) {
					if (!unitHere(width, height)) return;
					var wait = 600;
					if (1 == 2) {
						wait = 60;

						snd_tower.play();
					}
					else {
						var shotSound = theUnit.shotSound;
						if (!shotSound) shotSound = snd_tower;
						shotSound.play();

						explodeSound = theUnit.explodeSound;
						if (!explodeSound) explodeSound = snd_explosion;

						var str = '#team_'+tgt.team+'_unit_'+tgt.unit;
						var pos = $('#focuser').offset();
						var postgt = $(str).offset();
						var proj = 'sprite_ammoLemon';
						if (theUnit.projectile) proj = theUnit.projectile;

						projectiles.innerHTML = '<div class="projectile sprite '+proj+'" style="top: '+pos.top+'px; left: '+pos.left+'px"></div>';
						$('.projectile').animate({
							top: postgt.top+'px',
							left: postgt.left+'px',
						}, 675, function() {
							explodeSound.play();
					    });
					    $('.projectile').effect('explode', 450);
					    wait = 600;
					}
					theUnit.moved = 99;
					var afterAnim = setTimeout(function() {
						attack(turn, toMove, tgt.unit);
						updatePanel();
						projectiles.innerHTML = '';
						willMove = 0;
					}, wait);
				}
			}
			var unitid = {'team': focusedUnit.team, 'unit': toMove}
			if (willMove) var moved = moveUnit(theUnit, direct, unitid);
			if (moved && willMove) {
				if (moved.team != turn) {
					attack(turn, toMove, moved.unit);
				}
			}
		}
	}


	//updatePanel();
}
function unitValue(team, unit) {
	var u = teams[team].units[unit];
	var objective = (team == 0) ? u.width : ((DEFAULT_WIDTH-1) - u.width);
	if (raceMode) objective = u.width;
	var lev = (raceMode) ? 0 : u.level;
	objective += lev;
	var mod = u.hp/u.hpx;
	return (objective * mod);
}
function getWinningSide() {
	var teamValues = [getNexus(0), getNexus(1)];
	for (var gws = 0; gws < 2; gws++) {
		for (ut in teams[gws].units) {
			teamValues[gws] += unitValue(gws, ut);
		}
		teamValues[gws] += (teams[gws].lemons + teams[gws].money + teams[gws].lemonade);
		teamValues[gws] *= getNexus(gws);
	}

	var min = teamValues[0];
	var max = teamValues[0] + teamValues[1];
	var p1 = teamValues[1];
	var perc0 = (teamValues[0]/max)*100+'%';
	var perc1 = (teamValues[1]/max)*100+'%';
	var enemy = 'markerBarCoon';
	if (survivalMode == 'zombie') enemy = 'markerBarZombie';
	if (survivalMode == 'chaos') enemy = 'markerBarChaos';
	return '<div class="markerBar '+enemy+'" style="width: '+perc0+'">'+round(min)+'</div><div class="markerBar markerBarScout" style="width: '+perc1+'">'+round(p1)+'</div><div class="tileBreak"></div>';
}
function getTemperatureSprite() {
	if (raining) {
		if (temperature <= 0) return 'sprite_weatherColdRain';
		if (temperature > 0) return 'sprite_weatherHotRain';
	}
	if (temperatureWave) {
		if (temperatureWave == 'cold') return 'sprite_weatherColdWave';
		if (temperatureWave == 'hot') return 'sprite_weatherHotWave';
	}
	if (temperature < 5) return 'sprite_weatherCold';
	if (temperature > 25) return 'sprite_weatherHot';
	return 'sprite_weatherAverage';
}
function updateInfo() {
	if (!gameStarted) return;

	var str1 = translate('Dinero|Money')+': ';
	var str2 = translate('Unidades|Units')+': ';

	var sm = (survivalLevel) ? '('+survivalLevel+')' : '';
	var l = '';
	var termoex = '';
	if (temperatureWave == 'cold') termoex = 'tempCold';
	if (temperatureWave == 'hot') termoex = 'tempHot';
	var isRaining = (raining) ? ' '+translate('(Lluvia)|(Rain)') : '';
	l += '<span class="termo '+termoex+'">'+translate('Temperatura |Temperature ')+temperature+'ºC <b class="weatherSprite '+getTemperatureSprite()+'">'+'</b>'+isRaining+'</span>';
	l += getWinningSide()+'';
	var isActiveCoon = (turn == 0) ? 'active' : '';
	var isActiveScout = (turn == 1) ? 'active' : '';

	l += '<div class="team '+isActiveCoon+'">';
	l += '<b>'+teamA+'</b><br>'+str1+coons.lemons+'ç'+str2+coons.units.length+'</div>';

	l += '<div class="team '+isActiveScout+'" style="float: right">';
	l += '<b>'+teamB+'</b><br>'+str1+scouts.money+'ç'+str2+scouts.units.length+'</div>';

	playerinfo.innerHTML = l;

}
function highlight(width, height, really) {
	if (!unitHere(width, height)) highlightUnit(-1);
	var tile = '#tile_'+width+'_'+height;
	var bord = (really) ? 'highlightSquare' : 'stopHighlight';
	var isRangeHighlighted = $(tile).attr('class').match('rangeOverlay');
	$(tile).attr('class', 'sprite '+tileHere(width, height));
	if (isRangeHighlighted) $(tile).addClass('rangeOverlay');
	var ghost = '';

	if (buildmode && buildmode != 'debug' && really) {
		var cl = 'highlightSquareBuildMode';
		var limit = getBuildingPermissions(turn);
		var gbh = getBuildingHere(buildmode, width, height)
		var error = gbh.error;
		var toBuild = gbh.building;
		if (toBuild) ghost = ' ghost '+toBuild
		if (ghost) $(tile).attr('class', 'sprite');

		if (width < limit.minWidth || width > limit.maxWidth || error) cl = 'highlightSquareOutLimits';
		if (really) bord += ' '+cl+' ';
	}
	info.innerHTML = infotile[tiles[width][height]];

	$(tile).removeClass('stopHighlight');
	$(tile).removeClass('highlightSquare');
	$(tile).removeClass('highlightSquareBuildMode');
	$(tile).removeClass('highlightSquareOutLimits');
	$(tile).addClass(bord+' '+ghost);
}
function highlightUnit(team, uit) {
	if (team < 0) {
		mouseNotif(-1);
		return;
	}
	var guy = teams[team].units[uit];
	var hlu = '<div style="font-size: 10px; color: white">';
	var fu = (focusedUnit) ? focusedUnit : '';
	if (focusedUnit) fu = teams[fu.team].units[fu.unit];
	hlu += '<b>'+prototypes[guy.type].name +'</b> ('+getTacticName(guy.tactic)+')<br>';
	hlu += translate('Nivel |Level ')+guy.level+' - '+translate('VIDA|HIT POINTS')+': '+guy.hp+'/'+guy.hpx+'<br>';
	if (guy.strength) hlu += '<small>'+guy.strength+'</small><br>';
	hlu += translate('ATAQUE|ATTACK')+': '+Math.floor(guy.atk)+' - ';
	hlu += translate('DEFENSA|DEFENSE')+': '+Math.floor(guy.def)+'<br>';
	hlu += translate('Movimiento|Movement')+': '+Math.floor(guy.moved)+'/'+guy.mov+'<br>';
	if (team != turn && fu) hlu += translate('Probabilidades de Victoria|Win Chances')+': '+battleSimulator(focusedUnit.unit, uit);


	hlu += '</div>';
	mouseNotif(hlu, '', 1);
}
function battleSimulator(from, to) {
	var c = [0, 0, 0];
	var times = 10;
	for (var d = 0; d < times; d++) {
		var result = attack(turn, from, to, 1);
		if (result < 0) c[0] += 1;
		if (result == 0) c[1] += 1;
		if (result > 0) c[2] += 1;
	}
	var c0 = round((c[0]/times)*100);
	var c1 = round((c[1]/times)*100);
	var c2 = round((c[2]/times)*100);

	var ct0 = translate('V|W');
	var ct1 = translate('E|D');
	var ct2 = translate('D|L');
	var cl = '';
	if (c0 > c2) cl = 'green';
	if (c2 > c0) cl = 'red';

	return '<b class="'+cl+'">'+c0 + '/'+ c1 + '/' + c2+'</b>';

	return attack(turn, from, to, 1);
}
function winChance(from, to) {
	var c = from.atk - to.def;
	if (c > to.hp) return '99% Win';
	var d = (from.atk * 2) - to.def;
	if (d > to.hp) return '50% Win';
	var e = (to.atk * 2) - from.def;
	if (e > from.hp) return '50% Lose';
	var f = to.atk - from.def;
	if (f > from.hp) return '99% Lose';
	return '99% Draw';
}

function increaseValue(num) {
	game.value += num;
	update('game_value');
}
function resetVariables() {
	if (!game.value) game.value = 0;
}
function saveGame() {
	localStorage.setItem('game', JSON.stringify(game));
}
function loadGame() {
	var losto = localStorage.getItem('game');
	if (!losto) return;
	game = JSON.parse(losto);
}
function newCoonGame() {
	newGame('coon');
}
function newScoutGame() {
	newGame('boyScout');
}
function showDebugOptions() {
	$('#debugOptions').fadeIn(100)
}
function newSurvivalGame(type) {
	if (type == 0) {
		survivalMode = 'coon';
	}
	if (type == 1) {
		survivalMode = 'zombie';
	}
	if (type == 2) {
		versusMode = 'vampire';
	}
	if (type == 4) {
		versusMode = 'vampire';
		newGame('coon');
		return;
	}
	if (type == 3) {
		survivalMode = 'chaos';
	}
	newGame('boyScout');
}
function newRaceGame(noIA) {
	raceMode = true;
	if (!noIA) newGame('coon');
	if (noIA) newGame();
}
function newMultiplayerGame(type) {
	if (type == 1) {
		versusMode = 'vampire';
	}
	if (type == 2) {
		versusMode = 'chaos';
	}
	if (type == 3) survivalMode = 'coon';
	if (type == 4) survivalMode = 'zombie';
	if (type == 5) survivalMode = 'chaos';
	newGame();
}
function getMainMenu(type) {
	var gmm = '';

	gmm += '<div style="text-align: center"><img src="logo.png" style="zoom: 300%; image-rendering: pixelated"></img></div><br>';
	
	if (!type) gmm += '<center>'+translate('Elige un modo de juego|Choose a game mode')+'</center>';
	if (type) gmm += '<center>'+translate('Elige una variante|Choose a game variant')+'</center>';

	if (type && type != 3 && type != 4) {
		gmm += '<div class="mainButtonTip">'+translate('Ataque (Lado izquierdo)|Attack (Left hand side)')+'</div>';
		gmm += '<div class="mainButtonTip">'+translate('Defensa (Lado derecho)|Defense (Right hand side)')+'</div>';
	}

	if (type == 1) {
		gmm += '<div class="mainButton coonGameMode" onclick="newCoonGame()">'+
		'<i class="sprite sprite_soldierCoon"></i>'+
		'<i class="sprite sprite_tower"></i>'+
		translate('Ataque<br><small>¡Controla al equipo Mapache y destroza a esos molestos Boy Scouts!</small>\
			|Attack<br><small>Control the Raccoon team and destroy those pesky Boy Scouts!</small>')+'</div>';

		gmm += '<div class="mainButton scoutGameMode" onclick="newScoutGame()">'+
		'<i class="sprite sprite_cannon"></i>'+
		'<i class="sprite sprite_sniperScout scout_side"></i>'+
		translate('Defensa<br><small>¡Lidera el equipo Boy Scout y defiéndete de esas criaturas peludas!</small>\
			|Defense<br><small>Lead the Boy Scout team and defend against those furry creatures!</small>')+'</div>';
		
		gmm += '<div class="mainButton coonGameMode" onclick="newSurvivalGame(4)">'+
		'<i class="sprite sprite_succubus"></i>'+
		'<i class="sprite sprite_angel scout_side"></i>'+
		translate('Infierno contra Cielo<br><small>¡Pásate al lado oscuro, demuestra quién manda!</small>\
		|Heaven vs Hell<br><small>Turn to the Dark Side, prove who rocks!</small>')+'</div>';

		gmm += '<div class="mainButton scoutGameMode" onclick="newSurvivalGame(2)">'+
		'<i class="sprite sprite_vampire"></i>'+
		'<i class="sprite sprite_priest scout_side"></i>'+
		translate('Cielo contra Infierno<br><small>¡Aplasta a esos seres infames con tu Biblia!</small>\
			|Heaven vs Hell<br><small>Smash those vile creatures with your Bible!</small>')+'</div>';
	}
	if (type == 2) {

		gmm += '<div class="mainButton" style="opacity: 0"></div>';

		gmm += '<div class="mainButton scoutGameMode" onclick="newSurvivalGame(0)">'+
		'<i class="sprite sprite_waterSage"></i>'+
		'<i class="sprite sprite_boyScout scout_side"></i>'+
		translate('Supervivencia<br><small>Resiste las oleadas de mapaches, ¡Cuidado con los sabios!</small>\
			|Survival<br><small>Resist the raccoon waves, watch out for sages!</small>')+'</div>';

		gmm += '<div class="mainButton" style="opacity: 0"></div>';

		gmm += '<div class="mainButton scoutGameMode" onclick="newSurvivalGame(1)">'+
		'<i class="sprite sprite_zombieScout"></i>'+
		'<i class="sprite sprite_zombieCoon"></i>'+
		translate('Supervivencia: Zombie<br><small>¿Cuántos turnos podrás aguantar?</small>\
			|Survival: Zombie<br><small>How many turns will you last?</small>')+'</div>';

		gmm += '<div class="mainButton" style="opacity: 0"></div>';

		gmm += '<div class="mainButton scoutGameMode" onclick="newSurvivalGame(3)">'+
		'<i class="sprite '+read(allUnits)+'"></i>'+
		'<i class="sprite '+read(allUnits)+' scout_side"></i>'+
		translate('Supervivencia: CAOS<br><small>La aventura más loca de la historia.</small>\
			|Survival: CHAOS<br><small>The craziest aventure ever.</small>')+'</div>';
	}
	if (type == 3) {
		gmm += '<div class="mainButton" onclick="newRaceGame()">'+
		'<i class="sprite sprite_coon"></i>'+
		'<i class="sprite sprite_coon"></i>'+
		translate('Carrera<br><small>Una carrera contra los agujeros negros.</small>\
			|Race<br><small>A race against the black holes.</small>')+'</div>';

		gmm += '<div class="mainButtonTip">'+translate('(No hay variantes del modo Carrera)|(There are no variants for Race Mode)')+'</div>';
	}
	if (type == 4) {
		gmm += '<div class="mainButton" onclick="newGame()">'+
		'<i class="sprite sprite_boyScout"></i>'+
		'<i class="sprite sprite_traitorBoyScout scout_side"></i>'+
		translate('Clásico<br><small>Equipo Mapache contra Equipo Boy Scout</small>\
			|Classic<br><small>Raccoon Team versus Boy Scout team</small>')+'</div>';

		gmm += '<div class="mainButton" onclick="newMultiplayerGame(1)">'+
		'<i class="sprite sprite_demon"></i>'+
		'<i class="sprite sprite_angel scout_side"></i>'+
		translate('Cielo contra Infierno<br><small>Modo clásico con unidades fantásticas extra.</small>\
			|Heaven vs Hell<br><small>Classic mode with extra fantasy units.</small>')+'</div>';

		gmm += '<div class="mainButton" onclick="newMultiplayerGame(2)">'+
		'<i class="sprite '+read(allUnits)+'"></i>'+
		'<i class="sprite '+read(allUnits)+' scout_side"></i>'+
		translate('Todas las Unidades<br><small>Modo clásico con todas las unidades que existen</small>\
			|All Units Available<br><small>Classic mode with all existing units</small>')+'</div>';

		gmm += '<div class="mainButton" onclick="newMultiplayerGame(3)">'+
		'<i class="sprite sprite_waterSage"></i>'+
		'<i class="sprite sprite_boyScout scout_side"></i>'+
		translate('Supervivencia<br><small>Modo supervivencia contra Mapaches y Sabios</small>\
			|Survival<br><small>Survival mode with Raccoons and Sages</small>')+'</div>';

		gmm += '<div class="mainButton" onclick="newMultiplayerGame(4)">'+
		'<i class="sprite sprite_zombieCoon"></i>'+
		'<i class="sprite sprite_zombieScout"></i>'+
		translate('Supervivencia: Zombie<br><small>Modo supervivencia contra Zombies</small>\
			|Survival: Zombie<br><small>Survival mode with Zombies</small>')+'</div>';

		gmm += '<div class="mainButton" onclick="newMultiplayerGame(5)">'+
		'<i class="sprite '+read(allUnits)+'"></i>'+
		'<i class="sprite '+read(allUnits)+' scout_side"></i>'+
		translate('Supervivencia: CAOS<br><small>Modo supervivencia con todas las unidades que existen</small>\
			|Survival: CHAOS<br><small>Survival mode with all existing units</small>')+'</div>';

		gmm += '<div class="mainButton" onclick="newMultiplayerGame(5)">'+
		'<i class="sprite sprite_coon"></i>'+
		'<i class="sprite sprite_coon scout_side"></i>'+
		translate('Carrera<br><small>Modo carrera</small>\
			|Race<br><small>Race mode</small>')+'</div>';



	}
	if (!type) {
		gmm += '<div class="mainButton mainButtonBig" onclick="getMainMenu(1)">'+
		'<i class="sprite sprite_coon"></i>'+
		'<i class="sprite sprite_boyScout scout_side"></i>'+
		translate('Clásico<br><small>Modo clásico. Ataca la base enemiga y defiende la tuya.</small>\
			|Classic<br><small>Classic mode. Attack enemy base and defend yours.</small>')+'</div>';

		gmm += '<div class="mainButton mainButtonBig" onclick="getMainMenu(2)">'+
		'<i class="sprite sprite_zombieCoon"></i>'+
		'<i class="sprite sprite_boyScout scout_side"></i>'+
		translate('Supervivencia<br><small>Aguanta infinitas oleadas de enemigos.</small>\
			|Survival<br><small>Hold on infinite waves of enemies.</small>')+'</div>';

		gmm += '<div class="mainButton mainButtonBig" onclick="getMainMenu(3)">'+
		'<i class="sprite sprite_coon"></i>'+
		'<i class="sprite sprite_coon scout_side"></i>'+
		translate('Carrera<br><small>¡Echa a tus oponentes del mapa siendo el más rápido!</small>\
			|Race<br><small>Kick your opponent from the map being the fastest!</small>')+'</div>';

		gmm += '<div class="mainButton mainButtonBig" onclick="getMainMenu(4)">'+
		'<i class="sprite sprite_boyScout"></i>'+
		'<i class="sprite sprite_traitorBoyScout scout_side"></i>'+
		translate('Multijugador<br><small>Juega con otra persona en la misma pantalla.</small>\
			|Multiplayer<br><small>Play with a friend using the same screen.</small>')+'</div>';

		gmm += '<div class="mainButton mainButtonBig manualGameMode" onclick="readManual()">'+
		'<i class="sprite sprite_sage2"></i>'+
		'<i class="sprite sprite_sage1 scout_side"></i>'+
		translate('Manual<br><small>Aprende cómo jugar y descubre cosas nuevas.</small>\
			|Manual<br><small>Learn the game mechanics and discover new stuff.</small>')+'</div>';
	}
	if (type) {
		gmm += '<div class="mainButton mainButtonBig" onclick="getMainMenu()">'+
		translate('Volver<br><small>Vuelve al menú anterior.</small>\
			|Back<br><small>Go back to the previous menu.</small>')+'</div>';
	}

	/*
	gmm += '<div class="mainButton" style="opacity: 0"></div>';
	gmm += '<div class="mainButton" style="opacity: 0"></div>';
	gmm += '<div class="mainButton" style="opacity: 0"></div>';
	*/



	gmm += '<div class="footer"><button style="position: fixed; right: 8px; bottom: 0px" z-index: 9999; onclick="showDebugOptions()">'+translate('Mostrar opciones ocultas|Show hidden options')+'</button>';
	gmm += '&copy2016 ArchLemon Studios <img src="../lemontastic/beta/img/idea.png" alt="feedback" title="feedback"> Feedback: kulivszk@gmail.com</div>';
	donateButton.title = translate('Dame de comer|Buy me a food');

	doc('game').innerHTML = gmm;
}
function update(step) {
	if (step == 'game_value' || !step) doc('game_value').innerHTML = shortNum(game.value);
}

$(document).ready(function() {
	$('#body').keypress(function(evt) {
		//116: T
		if (evt.which == 116) {
			buildmode = 'tower';
		}
		//117: U
		if (evt.which == 117) {
			upgrademode = !upgrademode;
			updatePanel();
		}
		//119: W
		if (evt.which == 119) {
			buildmode = 'wall';
		}
		//114: R
		if (evt.which == 114) {
			buildmode = 'trap';
		}
		//101: E
		if (evt.which == 101) {
			buildmode = '';
			upgrademode = '';
		}
		//100: D
		if (evt.which == 100) {
			buildmode = 'debug';
		}
	})
});

$(document).on('mousemove', function(e){
    $('#mouseNotification').css({
       left:  e.pageX - $(window).scrollLeft(),
       top:   (e.pageY+32) - $(window).scrollTop(),
    });
});

//Some translations
newTurnButton.value = translate('Pasar Turno|End Turn');

var game = {};
loadGame();
resetVariables();
var t = setInterval(autoAttack, 1200);
var aimi = setInterval(artificialIntelligenceMovement, 400);
getMainMenu();