var manualEntries = [];
function readManual() {
	var m = '';
	m += '<center><img src="logo.png"></center><br>';
	m += translate('Tabla de Contenidos|Table of Contents')+'<br>';
	m += '<ol>';
	for (var r in manualEntries) {
		m += '<li onclick="readManualEntry('+r+')">'+manualEntries[r].title;
	}
	m += '</ol>';
	m += '<span id="manualEntry"></span><br><br>';
	manual.innerHTML = m;
	$('#blackCloser').fadeIn(100);
	$('#manual').slideDown(500);
}
function readManualEntry(index)  {
	var entry = manualEntries[index];
	var rme = '';
	rme += '<h2>'+entry.title+'</h2>';
	if (entry.image) rme += '<img src="'+entry.image+'"><br>';
	rme += '<i>'+entry.tooltip+'</i><br><br>';
	rme += entry.description;

	manualEntry.innerHTML = rme;
}
function addManualEntry(title, image, tooltip, description) {
	manualEntries.push({
		'title': title,
		'image': image,
		'tooltip': tooltip,
		'description': description,
	});
};

addManualEntry(
	translate('Guía Rápida: Cómo Jugar|Quick Guide: How to Play'),
	'',
	translate('|'),
	translate(
		'Para jugar, selecciona un modo de juego en la página principal.<br> \
Esta guía rápida estará enfocada en el modo de juego clásico, es decir, Ataque/Defensa.<br> \
El objetivo del juego es capturar la base enemiga, llevando una de tus unidades aliadas hasta ella.<br> \
- Haz click en uno de los núcleos de tu base (La izquierda es la base del Equipo Mapache, la derecha es la base del Equipo Boy Scout)<br> \
- Tras hacer click, aparecerá la ventana de selección de unidades, donde podrás invocar una unidad.<br> \
- Haz click en el botón "Pasar Turno" cuando no tengas nada más que hacer.<br> \
- Cada turno, los equipos reciben dinero, que pueden usar para comprar unidades o edificios.<br> \
- Haz click en una de tus unidades para seleccionarla, y haz click en un lugar del mapa para moverla.<br> \
- Si seleccionas una unidad enemiga, podrás atacarla.<br> \
- ¡Lleva a tus unidades a la base enemiga y captúrala!<br> \
<br> \
Para leer en más detalle los conceptos básicos, continúa leyendo todos los apartados de la Guía Rápida.<br> \
<br> \
Para obtener más información acerca de otros modos de juego, lee las secciones del manual dedicadas a ellos.<br> \
<br> \|To play, select a game mode from the main menu. <br> \
This quick guide will focus on the classic gameplay, namely Attack / Defense. <br> \
The goal is to capture the enemy base, taking one of your ally units there. <br> \
- Click one of the nuclei of your base (The left-hand side of the map is the Raccoon Team\'s base, while the right-hand side is the Boy Scout\'s base)<br> \
- After you click, the unit selection window will appear, and you may be able to spawn a unit.<br> \
- Click "End Turn" if you have nothing more to do.<br> \
- Each turn, your team will receive money, use it to recruit new units and buy some buildings.<br> \
- Click one of your units to select it, then click anywhere in the map to move your unit there.<br> \
- If you select an enemy unit, you can attack it.<br> \
- Lead your unit to the enemy base and capture it!<br> \
To read detailed information about the basics, read all the sections of the Quick Guide. <br> \
<br> \
For more information about other modes, read the manual sections dedicated to them.'
	)
);

addManualEntry(
	translate('Guía Rápida: Equipos|Quick Guide: Teams'),
	'guide/teams.png',
	translate('Equipo Mapache luchando contra el Equipo Boy Scout|Raccoon Team fighting against the Boy Scout team'),
	translate(
		'<h2>Equipos</h2><br> \
<h3>Equipo Mapache</h3><br> \
El equipo Mapache se encuentra a la izquierda del mapa. Sus unidades hacen mucho daño, pero son débiles.<br> \
La base del equipo es donde se encuentran los Sabios. Si los Sabios son capturados, el equipo pierde la partida.<br> \
<br> \
<h3>Equipo Boy Scout</h3><br> \
El Equipo Boy Scout se encuentra en la parte derecha del mapa. Sus unidades son robustas, y pueden<br> \
aguantar mucho daño, por lo que son ideales para el combate cuerpo a cuerpo.<br> \
Su base es el puesto de limonada. Si todos los núcleos del puesto son destruidos por los mapaches,<br> \
el equipo pierde la partida.<br> \
<br> \|<h2>Teams</h2> <br> \
<h3>Raccoon Team</h3><br> \
The Raccoon Team is on the left side of the map. Their units do much damage, but they are weak.<br> \
The base of the team is where the Sages are. If the Sages are captured, the team loses the game. <br> \
<br> \
<h3> Boy Scout Team </h3> <br> \
The Boy Scout team is on the right side of the map. Their units are robust and can take much damage, so they are ideal for close combat. <br> \
Its base is the lemonade stand. If all cores as are destroyed by raccoons, the team loses the game.'
	)
);

addManualEntry(
	translate('Guía Rápida: Unidades y Características|Quick Guide: Units and Stats'),
	'guide/units.png',
	translate('Base siendo capturada y algunas uidades defendiendo|Base being captured and some units defending'),
	translate(
		'Cada equipo necesita unidades para atacar la base enemiga, y también para defenderse de los ataques.<br> \
Las bases constan de 3 núcleos, si una unidad se pone encima de uno de ellos, ese núcleo es destruído.<br> \
Si los tres núcleos son destruídos, la partida termina, y ese equipo gana.<br> \
<h3>Invocar unidades</h3><br> \
Haz click en uno de tus tres núcleos para abrir la ventana de selección de unidades.<br> \
Después, haz click en la unidad deseada para invocarla. Si hay espacio suficiente en el mapa<br> \
y tienes dinero suficiente, la unidad será invocada y podrás moverla a partir del siguiente turno.<br> \
Las unidades cuestan dinero, pero al inicio de cada turno, el equipo obtiene un poco de dinero.<br> \
Si alguno de los núcleos del equipo ha sido destruído, la cantidad de dinero recibida es menor.<br> \
También se obtiene dinero por derrotar a unidades enemigas, así que, ¡No dejes que escape ese mapache a 1 de vida!<br> \
<h3>Características</h3><br> \
Las unidades tienen Vida, Ataque, Defensa y Movimiento.<br> \
La Vida indica la salud de la unidad, si ésta baja a 0, la unidad muere, así que protégelas para que esto no ocurra.<br> \
El Ataque mide la fuerza de la unidad. Cuanto mayor és, más daño hará en combate.<br> \
La Defensa indica la cantidad de daño que puede aguantar. Si una unidad tiene alta defensa, recibirá menos daño.<br> \
El Movimiento afecta al número de casillas que puede moverse. Además, hay casillas donde es más fácil moverse que otras.<br> \|Every team needs units to attack the enemy base, and also requires them to defend against attacks.<br> \
The bases consist of 3 cores, if an enemy unit is placed on top of one of them, that core is destroyed. <br> \
If all three nuclei are destroyed, the game ends, and that team wins. <br> \
<h3> Invoke units </h3><br> \
Click one of your cores to open the unit selection window.<br> \
Then click on the desired unit to invoke. If there is enough space on the map and you have enough money, the unit will be invoked and it will be able to move the next turn. <br> \
Units have a cost, but at the beginning of each turn, the team gets some money. <br> \
If any core of the team has been destroyed, the amount of money received is lower. <br> \
Money is also obtained by defeating enemy units, so do not let that raccoon escape with 1 HP!<br> \
<br> \
<h3> Stats </h3> <br> \
Units have HP, Attack, Defense and Movement. <br> \
HP indicates the health of the unit, if it goes down to 0, the unit dies, so  protect them to prevent this from happening.<br> \
Attack measures the strength of the unit. The higher it is, the more damage the unit will deal in combat.<br> \
Defense indicates the amount of damage it can take. A unit with high defense, receives less damage. <br> \
Movement affects the number of squares that can be travelled. In addition, there are boxes where it is easier to move than others.'
	)
);

addManualEntry(
	translate('Guía Rápida: Construcciones|Quick Guide: Buildings'),
	'guide/towers.png',
	translate('Torres, murallas y trampas|Towers, walls and traps'),
	translate(
		'Cada equipo puede comprar diversas construcciones. Pero sólo en la mitad del campo que le pertenece.<br> \
<h3>Torre</h3><br> \
Para construir una torre, pulsa la tecla (T) y elige su emplazamiento. Si es posible construirla en ese lugar<br> \
aparecerá el recuadro de color azul. Si no, será rojo.<br> \
Las torres hacen daño automáticamente a las unidades que pasan cerca, pero sólo en línea recta.<br> \
Es posible destruir las torres atacándolas.<br> \
<h3>Muralla</h3><br> \
Las murallas sirven para detener el avance del enemigo.<br> \
Tienen una alta defensa, por lo que pueden aguantar muchos golpes antes de ser destruídas.<br> \
También son más baratas que las torres.<br> \
Para construír una muralla, pulsa la tecla (W) y elige el lugar.<br> \
<h3>Trampas</h3><br> \
Para construir una trampa, pulsa la tecla (T) y elige un lugar.<br> \
Las trampas hacen que el enemigo reciba daño, pierda movimientos o incluso se envenene.<br> \
Dependiendo del lugar donde las construyas, el terreno cambiará y se convertirá en una trampa.<br> \
Por lo general, puedes colocar minas, que hacen daño a las unidades que se ponen encima, si colocas una trampa en la hierba.<br> \
Las zonas de agua, por ejemplo, se transforman en veneno, que causa daño progresivamente.<br> \
¡Sorprende a tus enemigos poniendo pinchos en un agujero. Cuando caigan, recibirán mucho daño!.<br> \
Para una lista completa de trampas, leer la sección del manual dedicada a trampas.<br> \
<br> \
Si vas a dejar de construir, puedes pulsar la tecla (E) para cancelar el modo de construcción.<br> \|Every team can buy various structures. But only in their half of the map. <br> \
<h3>Tower</h3><br> \
To build a tower, press the (T) key and select your location. If it is possible to build in that place a blue box will appear. If not, it will be red. <br> \
Towers damage enemy units that are in their range, but only in straight lines. <br> \
It is possible to destroy towers by attacking them. <br> \
<h3> Wall </h3> <br> \
Walls serve to stop the advance of the enemy. <br> \
They have a high defense, so they can withstand many hits before being destroyed. <br> \
They are also cheaper than towers. <br> \
To build a wall, press the (W) button and choose the location. <br> \
<h3> Traps </h3> <br> \
To build a trap, press the (T) button and choose a location. <br> \
Traps make the enemy take damage, lose movements or even poison him. <br> \
Depending on where they are built, the land will change and become a different kin of trap. <br> \
Usually, you can lay mines over grass, which hurt the units that are placed on top. <br> \
Water zones, for example, become poison, that causes damage progressively. <br> \
Surprise your enemy by putting spikes in holes. When they fall, they will receive a lot of damage! <br> \
For a complete list of traps, read the manual section dedicated to traps.<br><br>If you are going to stop building, you can press the (E) key to cancel the construction.'
	)
);

addManualEntry(
	translate('Guía Rápida: Combate|Quick Guide: Combat'),
	'guide/combat.png',
	translate('Dos unidades en mitad de un combate|A pair of units during a combat'),
	translate(
		'Puedes atacar cuerpo a cuerpo a una unidad enemiga adyacente a la tuya.<br> \
Si el ataque se efectúa en las casillas adyacentes, habrá un contraataque, y ambas unidades recibirán daño.<br> \
Si por el contrario, el ataque se efectúa en una diagonal, sólo la unidad enemiga recibirá daño, aunque el daño será menor.<br> \
Aprovecha para realizar ataques sorpresa desde diferentes puntos del mapa.<br> \
Hay unidades que tienen un rango de ataque, como por ejemplo el Francotirador, o el Mapache Soldado.<br> \
Cuando selecciones una de estas unidades, su rango aparecerá en el mapa.<br> \
Puedes atacar desde lejos y la unidad enemiga no podrá contraatacar. Cuanta más distancia haya entre el ataque, más daño recibirá, por lo que ten cuidado con los Francotiradores.<br> \
<br> \
Si una unidad derrota a otra en combate, sube de nivel, aumentando sus características.<br> \|You can melee attack an enemy unit adjacent to yours. <br> \
If the attack is carried out in adjacent squares, there will be a counter-attack, and both units will receive damage. <br> \
If, however, the attack is carried out in diagonal, only the enemy unit will be hurt, while receiving less damage. <br> \
Take advantage on it to make surprise attacks from different locations. <br> \
There are units that have a range of attack, such as the Sniper, or Raccoon Soldier. <br> \
When you select one of these units, the range will appear on the map. <br> \
You can attack from afar and the enemy unit will not fight back. The further the target unit is, the more damage will receive, so watch out for Snipers.<br> \
<br> \
If one unit defeats another in battle, it levels up, increasing its stats.'
	)
);

addManualEntry(
	translate('Terreno: Terrenos Básicos|Terrain: Basic Terrain'),
	'guide/map.png',
	translate('Varios tipos de terreno|Various types of terrain'),
	translate(
		'Los terrenos básicos son aquellos que aparecen con frecuencia en los mapas. Suelen tener efectos positivos y neutrales.<br> \
		<img src="background.png"> <b>Hierba</b><br> \
No tiene ningún efecto negativo ni positivo en el movimiento.<br> \
Cualquier unidad gasta 1 punto de movimiento al pasar por esta casilla.<br> \
Cualquier casilla que no sea hierba cuesta 2 puntos de movimiento en su lugar.<br> \
(Excepto casillas especiales.)<br> \
Si se construye una trampa encima, se convierte en una Mina Explosiva.<br> \
<br> \
<span class="sprite sprite_flower"></span> <b>Flores</b><br> \
Terreno básico del mapa.<br> \
Si una unidad se encuentra encima, aumenta su defensa temporalmente durante los combates.<br> \
Si construyes una trampa encima, ésta se convierte en una Ortiga.<br> \
<br> \
<span class="sprite sprite_rock"></span> <b>Rocas</b><br> \
Terreno básico del mapa.<br> \
Si una unidad se encuentra encima, aumenta su ataque temporalmente durante los combates.<br> \
Si construyes una trampa encima, ésta se convierte en una Roca Afilada.<br> \
<br> \
<span class="sprite sprite_dirt"></span> <b>Tierra</b><br> \
Terreno básico del mapa.<br> \
Si una unidad se encuentra encima, recibe más daño en los combates. ¡Evita luchar en casillas de tierra!<br> \
<br> \
<span class="sprite sprite_hole"></span> <b>Agujero</b><br> \
Si caes en un agujero pierdes un turno.<br> \
También hace que no puedas atacar ni ser atacado, así que puede tener un lado bueno.<br> \
Si construyes una trampa encima, se convertirá en un Agujero Trampa.<br> \
<br> \
<span class="sprite sprite_weeds"></span> <b>Hierba Alta</b><br> \
Terreno básico del mapa.<br> \
No tiene ningún efecto especial, sólo reduce el movimiento,<br> \
así que tardas más en atravesar hierba alta que otro tipo de casillas.<br> \
Si construyes una trampa encima, se convierte en una Trampa de Hojas.<br> \
<br> \
<span class="sprite sprite_mud"></span> <b>Barro</b><br> \
Dificulta el movimiento y además reduce el ataque en combates.<br> \
Se convierte en Veneno al construir una trampa encima.<br> \
<br> \
<span class="sprite sprite_hotsprings"></span> <b>Aguas Termales</b><br> \
Una unidad encima de las aguas termales recupera vida cada turno y gana regeneración.<br> \
Si una unidad tiene regeneración, aumenta su vida cada vez que se mueve,<br> \
pero el efecto se pasa con el tiempo.<br> \
<br> \
<span class="sprite sprite_shroom"></span> <b>Seta</b><br> \
Recupera 2HP pero envenena durante 2 turnos.<br> \
Los gnomos son inmunes a su efecto, y en su lugar obtienen regeneración.<br> \
<br> \|These are some terrain features that appear frequently on maps. They have positive to neutral effects. <br> \
<img src = "background.png"><b> Grass </b><br> \
It has no negative or positive effect on movement. <br> \
Any unit spends 1 movement point to pass this square. <br> \
Any cell other than grass costs 2 movement points instead. <br> \
(Except special boxes.) <br> \
If a trap is built up, it becomes a land mine. <br> \
<br> \
<span class = "sprite sprite_flower"> </span> <b> Flowers </b> <br> \
If a unit is stepped there, increases its defense temporarily during a fight. <br> \
If you build up a trap, it becomes a nettle. <br> \
<br> \
<span class = "sprite sprite_rock"> </span> <b> Rocks </b> <br> \
Increases damage of units in battle. <br> \
If you build up a trap, it becomes a spiky rock. <br> \
<br> \
<span class = "sprite sprite_dirt"> </span> <b> Dirt </b> <br> \
Any unit stepped in it takes more damage in battle. Avoid fighting in this square!<br> \
<br> \
<span class = "sprite sprite_hole"> </span> <b> Hole </b> <br> \
If you fall into a hole you lose a turn. <br> \
It also makes you can not attack or be attacked, so it can have a good side. <br> \
If you build up a trap, it will become a Spiked Hole. <br> \
<br> \
<span class = "sprite sprite_weeds"> </span> <b> Tall Grass </b> <br> \
Basic terrain feature. <br> \
It has no special effect, only reduces the movement <br> \
so it takes longer to pass through tall grass. <br> \
If you build a trap over, it becomes a grass hole. <br> \
<br> \
<span class = "sprite sprite_mud"> </span> <b> Mud </b> <br> \
It hampers movement and reduces the attack in combat. <br> \
It becomes poison when building traps there. <br> \
<br> \
<span class = "sprite sprite_hotsprings"> </span> <b> Hot Springs </b> <br> \
A unit on the hot springs gets life each turn. <br> \
If a unit has regeneration, its life is recovered every time it moves, <br> \
but the effect wears off over time.'
	)
);

addManualEntry(
	translate('Terreno: Trampas|Terrain: Traps'),
	'guide/traps.png',
	translate('Varias trampas tras Alambre de Espino|Various traps after a Barbed Wire Fence'),
	translate('Las trampas son tipos de terreno que son colocados por los diferentes equipos. Tienen efectos negativos para las unidades y deben ser evitadas a toda costa.<br> \
		<span class="sprite sprite_nettle"></span> <b>Ortiga</b><br> \
Causa 1HP daño a las unidades que la pisan. Puede ser creada construyendo una trampa encima de flores.<br> \
<br> \
<span class="sprite sprite_trap"></span> <b>Mina Explosiva</b><br> \
Causa 5HP de daño a las unidades que se ponen encima, cuidado con pisarlas. Son creadas al construir una trampa encima de la hierba.<br> \
<br> \
<span class="sprite sprite_poison"></span> <b>Veneno</b><br> \
Envenena a la unidad que lo pisa. Una unidad envenenada pierde 1HP cada vez que se mueve. Por suerte el efecto se pasa con el tiempo.<br> \
Es creado al convertir en trampa hielo, charcos, escarcha o barro.<br> \
<br> \
<span class="sprite sprite_spikehole"></span> <b>Agujero Trampa</b><br> \
Causa 5HP de daño a las unidades que caen en él, y además pierden un turno.<br> \
Es creado al convertir en trampa un agujero.<br> \
<br> \
<span class="sprite sprite_spikerock"></span> <b>Roca Puntiaguda</b><br> \
Causa 1HP de daño a las unidades que la pisan.<br> \
Es creado al construir una trampa encima de rocas.<br> \
<br> \
<span class="sprite sprite_grasshole"></span> <b>Trampa de Hojas</b><br> \
Si una unidad la pisa, ¡Se convierte en un agujero!<br> \|Traps are types of buildings which are placed by the different teams. They have negative effects for units and should be avoided at all costs. <br> \
		<span class="sprite sprite_nettle"> </span> <b> Nettle </b> <br> \
Causes 1HP damage to units that pass by. It can be created by building a trap over flowers. <br> \
<br> \
<span class="sprite sprite_trap"> </span> <b> Explosive Mine </b> <br> \
Causes 5HP damage to the units that are placed on top, careful to step on them. They are created by building a trap on the grass and some other types of terrain. <br> \
<br> \
<span class="sprite sprite_poison"> </span> <b> Poison </b> <br> \
Poisons unit that steps on it. A poisoned unit loses 1 HP every time it moves. The effect lasts for a minimum of 3 movements. <br> \
It is created when converting to trap ice, puddles, frost or mud. <br> \
<br> \
<span class="sprite sprite_spikehole"> </span> <b> Spiked Hole </b> <br> \
Causes 5HP damage to units that fall into it, they also lose a turn. <br> \
It is created by turning a regular hole into a trap. <br> \
<br> \
<span class="sprite sprite_spikerock"> </span> <b> Spiky Rock </b> <br> \
Causes 1HP damage to units that step in it. <br> \
It is created when building a trap on top of rocks. <br> \
<br> \
<span class = "sprite sprite_grasshole"> </span> <b> Grass Hole </b> <br> \
If a unit passes by, it becomes a hole and that unit loses a turn.')
);

addManualEntry(
	translate('Terreno: Bayas|Terrain: Berries (Incomplete)'),
	'guide/berries.png',
	translate('Algunos arbustos con Bayas|Some bushes with Berries'),
	translate('Las Bayas crecen en el mapa al inicio de cada turno. Hay algunas bayas que son más raras que otras, y cada una tiene efectos distintos. Para que una baya crezca, antes tiene que haber un arbusto sin bayas en él, y al siguiente turno, ¡Es posible que aparezca una nueva baya!<br> \
		La excepción de esta lista es la Baya Mala, que es en realidad una trampa. Si un arbusto es convertido en trama, éste pasa a ser una Baya Mala, así que, no te confundas, ¡Que esa no se come!<br> \
		<span class="sprite sprite_bush"></span> <b>Arbusto</b><br> \
Misteriosa planta en la que crecen diversas Bayas.<br> \
Se convierte en una Baya Mala al construir una trampa encima.<br> \
<br> \
<span class="sprite sprite_badberry"></span> <b>Baya Mala</b><br> \
Reduce una característica al azar, es muy peligroso comérsela.<br> \
Se crea al construir una trampa encima de un arbusto, o un arbusto con bayas.<br> \
<br> \
<span class="sprite sprite_blueberry"></span> <b>Arándano</b><br> \
Recupera 5HP. Es la baya más común.<br> \
<br> \
<span class="sprite sprite_purpleberry"></span> <b>Arándano Púrpura</b><br> \
Recupera los HP al 100%. Es un poco más rara que el Arándano, pero merece la pena.<br> \
<br> \
<span class="sprite sprite_rainbowgrape"></span> <b>Uva Arcoiris</b><br> \
Aumenta una característica al azar: Ataque, Defensa o Movimiento.<br> \
Es bastante raro encontrar de estas bayas.<br> \
<br> \
<span class="sprite sprite_goldberry"></span> <b>Baya Dorada</b><br> \
La baya más rara de todas y la más valiosa.<br> \
Sube un nivel a la unidad que la alcanza. Es importante defender estos arbustos y evitar que el enemigo disfrute de sus efectos.<br> \
<br> \|Berries grow in the map at the beginning of each shift. There are some berries that are rarer than others, and each has different effects. For a berry grow before there must be no berries on the bush, and the next turn, may appear a new berry!<br> \
<br> \
		The exception to this list is the Baya Mala, which is actually a trap. If a bush is converted into frame, it becomes a Baya Mala, so no mistake, That this is not eaten!<br> \
<br> \
		<span class = "sprite sprite_bush"> </span> <b> sprite_bush </b> <br> \
Mysterious plant growing in various berries. <br> \
It becomes poison to build up a trap. <br> \
<br> \
<span class = "sprite sprite_badberry"> </span> <b> Bad Berry </b> <br> \
Reduces random characteristic is very dangerous to eat it. <br> \
It is created to build a trap over a bush or shrub with berries. <br> \
<br> \
<span class = "sprite sprite_blueberry"> </span> <b> Cranberry </b> <br> \
Retrieves 5HP. It is the most common berry. <br> \
<br> \
<span class = "sprite sprite_purpleberry"> </span> <b> Blueberry Purple </b> <br> \
Recovers HP to 100%. It\'s a bit rarer than Blueberry, but worth it. <br> \
<br> \
<span class = "sprite sprite_rainbowgrape"> </span> <b> Uva Rainbow </b> <br> \
Increases a characteristic random. Attack, Defense or movement <br> \
It is quite rare to find these berries. <br> \
<br> \
<span class = "sprite sprite_goldberry"> </span> <b> Baya Dorada </b> <br> \
The rarest of all and the most valuable berry. <br> \
Step up to the unit that reaches it. It is important to defend these bushes and prevent the enemy enjoy its effects.')
);

addManualEntry(
	translate('Terreno: Clima|Terrain: Weather (Incomplete)'),
	'guide/frozen.png',
	translate('Terreno helado y unidades en proceso de congelación|Frozen terrain and units starting to freeze'),
	translate('Estos tipos de terreno son especiales dependiendo de las condiciones atmosféricas. La lluvia, el frío y el calor causa diferentes efectos en el mapa.<br> \
		<span class="sprite sprite_frost"></span> <b>Escarcha</b><br> \
El coste de movimiento es menor en esta casilla, lo que significa que puedes atravesar varias a la vez sin gastar movimientos.<br> \
Se forma encima de la hierba cuando la temperatura es menor a 0ºC al inicio de cada turno.<br> \
Se convierte en Veneno al construir una trampa encima.<br> \
<br> \
<span class="sprite sprite_ice"></span> <b>Hielo</b><br> \
El coste de movimiento es menor en esta casilla, lo que significa que puedes atravesar varias a la vez sin gastar movimientos.<br> \
Se forma en los charcos de agua cuando la temperatura es menor a 0ºC al inicio de cada turno.<br> \
Se convierte en Veneno al construir una trampa encima.<br> \
<br> \
<span class="sprite sprite_puddle"></span> <b>Charco</b><br> \
Dificulta el movimiento.<br> \
Se forma en la hierba cuando llueve.<br> \
Se evapora cuando la temperatura es mayor a 0ºC y se congela si es menor a 0ºC.<br> \
Se convierte en Veneno al construir una trampa encima.<br> \
<br> \|These are special types of land depending on atmospheric conditions. Rain, cold and heat cause different effects on the map. <br> \
		<span class = "sprite sprite_frost"> </span> <b> frost </b> <br> \
The movement cost is lower in this box, which means you can go through several at once without spending movements. <br> \
It is formed above the grass when the temperature is below 0 ° C at the start of each shift. <br> \
It becomes poison to build up a trap. <br> \
<br> \
<span class = "sprite sprite_ice"> </span> <b> ice </b> <br> \
The movement cost is lower in this box, which means you can go through several at once without spending movements. <br> \
It forms in the pools of water when the temperature is below 0 ° C at the start of each shift. <br> \
It becomes poison to build up a trap. <br> \
<br> \
<span class = "sprite sprite_puddle"> </span> <b> puddle </b> <br> \
Hampers movement. <br> \
It forms in the grass when it rains. <br> \
It evaporates when the temperature is above freezing 0 and if it is less than 0 ° C. <br> \
It becomes poison to build up a trap.')
);

addManualEntry(
	translate('Terreno: Especiales|Terrain: Special Terrain (Incomplete)'),
	'guide/corrupt.png',
	translate('Mapa siendo devorado por la Corrupción|Map bein eaten by Corruption'),
	translate(
		'Estos son tipos de terreno que tienen algún tipo de condición especial de aparición, como por ejemplo ser creados por un equipo, aparecer sólo una vez en cada mapa, o, en el caso de la Corrupción, sólo está disponible en el Modo Carrera<br> \
		<span class="sprite sprite_sage1"></span><span class="sprite sprite_sage2"></span><span class="sprite sprite_sage3"></span> <b>Sabio</b><br> \
Los sabios son el núcleo de la base del Equipo Mapache.<br> \
Cada Sabio genera dinero para el equipo. Si los tres son capturados, la partida termina y pierde el Equipo Mapache.<br> \
Hacer click en un sabio lleva a la ventana de selección de unidades, donde es posible invocar nuevas unidades.<br> \
<br> \
<span class="sprite sprite_stand1"></span><span class="sprite sprite_stand2"></span><span class="sprite sprite_stand3"></span> <b>Puesto de Limonada</b><br> \
El puesto de limonada es el núcleo de la base del Equipo Boy Scout.<br> \
Cada núcleo genera dinero para el equipo. Si los tres son capturados, la partida termina y pierde el Equipo Boy Scout.<br> \
Hacer click en uno de ellos lleva a la ventana de selección de unidades, donde es posible invocar nuevas unidades.<br> \
<br> \
<span class="sprite sprite_wall_broken"></span> <b>Muro Roto</b><br> \
Restos de una muralla del Equipo Boy Scout.<br> \
<br> \
<span class="sprite sprite_barbedWire_broken"></span> <b>Alambre de Espino Roto</b><br> \
Restos de una muralla del Equipo Mapache.<br> \
<br> \
<span class="sprite sprite_tower_broken"></span> <b>Torre Rota</b><br> \
Restos de una torre del Equipo Boy Scout.<br> \
<br> \
<span class="sprite sprite_cannon_broken"></span> <b>Cañón Roto</b><br> \
Restos de una torre del Equipo Mapache.<br> \
<br> \
<span class="sprite sprite_corrupt1"></span><span class="sprite sprite_corrupt2"></span><span class="sprite sprite_corrupt3"></span><span class="sprite sprite_corrupt4"></span> <b>Corrupción</b><br> \
La corrupción son agujeros negros que absorben el mapa en el modo Carrera.<br> \
Las unidades que se encuentran encima pierden 1HP cada turno. Si se mueven hacia la corrupción, pueden seguir perdiendo 1HP por cada movimiento hasta causar la muerte.<br> \
<br> \|These are types of land that have some sort of special status of appearance, such as being created by a team, appear only once on each map, or, in the case of Corruption, is only available in Career Mode < br> \<br> \		<span class = "sprite sprite_sage1"> </span> <span class = "sprite sprite_sage2"> </span> <span class = "sprite sprite_sage3"> </span> <b> Sage </b> <br> \<br> \The wise are the core of the base of Raccoon Team. <br> \<br> \Every Wise generates money for equipment. If the three are captured, the game ends and you lose the Raccoon Team. <br> \<br> \Click leads to a wise selection window units, where it is possible to invoke new units. <br> \<br> \<br> \<br><br> \<span class = "sprite sprite_stand1"> </span> <span class = "sprite sprite_stand2"> </span> <span class = "sprite sprite_stand3"> </span> <b> Lemonade Stand </b> < br> \<br> \The lemonade stand is the core of the base of the Boy Scout Team. <br> \<br> \Each core generates money for equipment. If the three are captured, the game ends and you lose the Raccoon Team. <br> \<br> \Click leads to a wise selection window units, where it is possible to invoke new units. <br> \<br> \<br> \<br><br> \<span class = "sprite sprite_wall_broken"> </span> <b> Wall Broken </b> <br> \<br> \Remains of a wall of the Boy Scout Team. <br> \<br> \<br> \<br><br> \<span class = "sprite sprite_barbedWire_broken"> </span> <b> Barbed Wire Broken </b> <br> \<br> \Remains of a wall Raccoon Team. <br> \<br> \<br> \<br><br> \<span class = "sprite sprite_tower_broken"> </span> <b> Broken Tower </b> <br> \<br> \Remains of a wall of the Boy Scout Team. <br> \<br> \<br> \<br><br> \<span class = "sprite sprite_wall_broken"> </span> <b> Wall Broken </b> <br> \<br> \Remains of a wall Raccoon Team. <br> \<br> \<br> \<br><br> \<span class = "sprite sprite_corrupt1"> </span> <span class = "sprite sprite_corrupt2"> </span> <span class = "sprite sprite_corrupt3"> </span> <span class = "sprite sprite_corrupt4"> </span> <b> Corruption </b> <br> \<br> \Corruption are black holes that absorb the map in career mode. <br> \<br> \Units that are above lose 1 HP each turn. If they move towards corruption, they can continue to lose 1 HP per movement even death. <br> \<br> \<br>'
	)
);

addManualEntry(
	translate('Marcador|Scoreboard (Incomplete)'),
	'',
	translate('|'),
	translate(
		'Cada equipo obtiene una serie de puntos que aparecen en el marcador.<br> \
Aunque una puntuación alta no siempre significa algo bueno, sí que indica qué equipo tiene más posibilidades de ganar.<br> \
De todas formas, siempre puedes remontar con una diferencia de 1000 puntos.<br> \
<br> \
La puntuación se determina teniendo en cuenta varios factores.<br> \
¡Ojo, no es necesario aprendérselos!<br> \
<b>Núcleos</b> Si todavía conservas tus tres núcleos, consigues 1 punto por cada uno de ellos, y la puntuación total se multiplica por el número de núcleos restantes.<br> \
<b>Unidades</b> Cada unidad vale una puntuación. Pero hay que tener varias cosas en cuenta.<br> \
- Nivel. Cuanto mayor sea el nivel, más vale la unidad.<br> \
- Posición. Cuanto más cerca esté de la base enemiga, más vale.<br> \
- Vida. La unidad pierde puntos proporcionales a la vida que le falta.<br> \
Así que una unidad de alto nivel, cerca de tu base y a tope de vida, siempre es más peligrosa para la puntuación que una unidad recién invocada.<br> \
<b>Dinero</b> Además de las unidades y los núcleos, se ganan puntos por el dinero que se tiene.<br> \|Every team gets a series of dots on the scoreboard. <br> \<br> \Although a high score does not always mean a good thing, it does indicate which team has more chances of winning. <br> \<br> \Anyway, you can always climb with a difference of 1000 points. <br> \<br> \<br> \<br><br> \The score is determined by taking into account several factors. <br> \<br> \Mind you, it is not necessary learn them!<br> \<br><br> \<B> core </b> If you still preserves your three cores, you get 1 point for each, and the total score is multiplied by the number of remaining cores. <br> \<br> \<B> Units </b> Each unit is worth a score. But keep several things in mind. <br> \<br> \LEVEL The higher the level, the better the unit. <br> \<br> \posición The closer you are to the enemy base, better. <br> \<br> \Life The unit loses points proportional to life is missing. <br> \<br> \So a high-level unit near your base and top of life, it is always dangerous to the newly invoked score one. <br> \<br> \. <B> Money </b> In addition to the units and the cores, you earn points for the money you have <br>'
	)
);

addManualEntry(
	translate('Probabilidades de Victoria|Win Chances (Incomplete)'),
	'',
	translate('|'),
	translate(
		'Tras seleccionar una unidad, al pasar el ratón por encima de una unidad enemiga,<br> \
se muestra la "Probabilidad de Victoria". Que es un número que determina cómo de probable es vencer a esa unidad.<br> \
El primer número muestra las probabilidades de Victoria. Si es alto, el mensaje aparecerá en verde.<br> \
Eso significa que vas a salir ganando, y posíblemente hasta consigas derrotar a esa unidad.<br> \
El segundo número indica las probabilidades de Empate.<br> \
Y el tercero indica las probabilidades de Derrota.<br> \
Si el número es más alto que el de Victoria, el mensaje aparecerá en rojo, ¡Eso indica peligro!<br> \
Puedes planear tu estrategia atacando a unidades que consideres seguro atacar, pero, en ocasiones, hay que asumir algunos riesgos.<br> \
Y por supuesto, ignora las probabilidades cuando ataques desde lejos, porque nadie va a contraatacar.<br> \|After selecting a unit, hovering over an enemy unit, <br> \
<br>the "Probability of Victoria" is displayed. Which it is a number that determines how likely beat that unit. <br> \
<br>The first number shows the odds of Victoria. If it\'s high, the message in green. <br> \
<br>That means you\'ll be best served, and possibly even get defeat that unit. <br> \
<br>The second number indicates the likelihood of a tie. <br> \
<br>The third indicates the likelihood of defeat. <br> \
<br>If the number is higher than that of Victoria, the message will appear in red, indicating That danger!<br><br><br>You can plan your strategy to attack units attacking you consider safe, but sometimes you have to take some risks. <br> \
<br>And of course, ignore the odds when attacking from a distance, because no one will fight <br> \
')
);

addManualEntry(
	translate('IA: Tácticas|AI: Tactics (Incomplete)'),
	'',
	translate('|'),
	translate(
		'Al luchar contra la Inteligencia Artificial. Ésta utiliza varios modos conocidos como tácticas.<br> \
Una unidad invocada por la IA siempre tendrá una táctica, que determina su comportamiento.<br> \
<b>Agresivo</b> Las unidades agresivas siempre intentan matar a otras unidades en combate. Por lo general buscan presas específicas y no paran hasta darles caza. Aunque suelen luchar con cabeza.<br> \
<b>Defensivo</b> Las unidades defensivas se mueven con cuidado y sólo atacan cuando ven que tienen una alta probabilidad de ganar.<br> \
<b>Protector</b> Las unidades protectoras intentan permanecer cerca de sus aliados para cubrirles y atacan a unidades de la zona.<br> \
<b>Patrulla</b> Las unidades en modo patrulla rara vez salen de la base. Suelen atacar cuando encuentran a alguien al alcance.<br> \
<b>Estratega</b> Las unidades estrategas ignoran los peligros del enemigo y van a por un único objetivo: La base enemiga. Son buenas esquivando trampas y huyendo de los problemas.<br> \
<b>Pasivo</b> Las unidades pasivas se mueven buscando un objetivo fijo, pero tienden a ignorar a cualquier unidad que no sea la que buscan, por lo que sólo atacan si se ven amenazadas.<br> \
<b>Berseker</b> Las unidades berseker están cegadas por la ira. Se mueven buscando siempre a la unidad enemiga más cercana, y siempre atacan sin pensarlo, aunque esa unidad sea mucho más fuerte.<br> \|When you fight the Artificial Intelligence. It uses several modes known as tactical. <br> \<br>A unit invoked by the IA will always have a tactic, which determines their behavior. <br> \<br><B> Aggressive </b> Aggressive units are always trying to kill other units in combat. Usually they seek specific dams and do not stop until hunt them. Although often struggle with his head. <br> \<br><B> Defensive </b> The defensive units move carefully and only attack when they see they have a high probability of winning. <br> \<br><B> Protector </b> The protective units try to stay close to its allies to cover them and attack units in the area. <br> \<br><B> Patrol </b> The units on patrol so rarely leave the base. Usually they attack when they find someone within reach. <br> \<br><B> Strategist </b> The strategists units ignore the dangers of the enemy and go for one goal: The enemy base. They are good dodging traps and avoiding problems. <br> \<br><B> Passive </b> Passive units move looking for a fixed target, but tend to ignore any unit other than looking, so only attack if threatened. <br> \<br><B> Berseker </b> The berseker units are blinded by anger. . They move always looking for the nearest enemy unit, and always attack without thinking, although that unit is much stronger'
	)
);

addManualEntry(
	translate('Modo Supervivencia|Survival Mode (Incomplete)'),
	'',
	translate('|'),
	translate(
		'El modo supervivencia es un modo especial de juego donde sólo sabes una cosa: Vas a perder.<br> \
En el modo supervivencia, las unidades van apareciendo aleatoriamente cada turno, y cuantos más turnos<br> \
aguantas, más fuertes se vuelven.<br> \
Los cambios en las unidades se hacen evidentes al pasar turnos de diez en diez.<br> \
Cada diez turnos, una unidad especialmente fuerte aparece, y se conoce como "Jefe".<br> \
Los jefes son más grandes de lo normal, y suelen tener más vida.<br> \
De los cambios de características que puede sufrir una unidad del modo supervivencia, existen:<br> \
<b>Vida</b>: Las unidades empiezan a ganar vida extra a partir de 10 turnos.<br> \
<b>Ataque y Defensa</b>: Las unidades ganan ataque y defensa desde el inicio.<br> \
<b>Movimiento</b>: En raras ocasiones, una unidad puede aparecer con movimiento aumentado. Por lo general aumenta hasta +1 por cada 10 turnos.<br> \
<br> \
Existen varios modos de juego dentro del modo Supervivencia.<br> \
<h3>Supervivencia</h3><br> \
En el modo clásico de supervivencia, tienes que defender tu base de los ataques de los mapaches.<br> \
Cada 10 turnos, aparecerá un Sabio. Los Sabios son unidades muy peligrosas que atacan con magia desde la distancia.<br> \
A pesar de tener un alto ataque y alcance, su defensa es muy limitada, así que puedes ir sigilosamente hacia ellos y atacarles por la retaguardia.<br> \
<br> \
<h3>Supervivencia: Zombie</h3><br> \
Tu mayor (y único) enemigo en este modo es el Zombie.<br> \
Son unos adversarios lentos y débiles, pero ten cuidado si te superan en número.<br> \
Si un zombie derrota en combate a un Boy Scout o un Mapache, éste se convierte en un zombie.<br> \
Además, sus ataques pueden causar Enfermedad, que causa la pérdida de vida al moverse.<br> \
Los zombies siempre tienen el estado Enfermedad, pero son inmunes a sus efectos.<br> \
Una unidad con Enfermedad puede contagiar a otra al atacarle.<br> \
<br> \
<h3>Supervivencia: CAOS</h3><br> \
El modo de supervivencia más loco.<br> \
En este modo, se te está permitido invocar cualquier tipo de unidad de las que existen.<br> \
Las unidades enemigas también son aleatorias, así que es impredecible.<br> \
<br> \|The survival mode is a special game mode where you only know one thing. You\'re going to lose <br> \<br>In survival mode, units are appearing randomly each turn, and the more turns <br> \<br>stand it, the stronger they become. <br> \<br>Changes in the units are evident to spend tens shifts. <br> \<br>Ten turns, a particularly strong drive appears, and is known as "Chief". <br> \<br>The heads are larger than normal, and usually have more life. <br> \<br>Changes of characteristics that may suffer a unit of survival mode, there are: <br> \<br><B> Life </b>: Units start to earn extra life from 10 turns <br> \.<br><B> Attack and Defense </b>: Units gain attack and defense from the start <br> \.<br><B> Move </b>: On rare occasions, a unit may appear with increased movement. Usually it increases to  1 for every 10 turns. <br> \<br><br><br><br>There are several modes of play in the survival mode. <br> \<br><H3> Survival </ h3> <br> \<br>In the classic survival mode, you have to defend your base from attacks by raccoons. <br> \<br>10 turns, a Sage appear. The Sages are very dangerous attacking units with magic from a distance. <br> \<br>Despite having a high attack and scope, their defense is very limited, so you can go quietly to them and attack them from the rear. <br> \<br><br><br><br><H3> Survival </ h3> <br> \<br>Your biggest (and only) enemy in this mode is the Zombie. <br> \<br>They\'re slow and weak opponents, but beware if you outnumbered. <br> \<br>If a zombie defeat in combat a Boy Scout or a raccoon, it becomes a zombie. <br> \<br>In addition, their attacks can cause disease, which causes loss of life to move. <br> \<br>Zombies always have the disease state, but are immune to its effects. <br> \<br>A unit with disease can infect other to attack. <br> \<br><br><br><br><H3> Survival </ h3> <br> \<br>Survival mode crazier. <br> \<br>In this mode, you are allowed to invoke any kind of unity of the world. <br> \<br>Enemy units are also random, so it\'s unpredictable. <br> \<br><br>'
	)
);

addManualEntry(
	translate('Teclas de Acceso Rápido|Hotkeys (Incomplete)'),
	'',
	translate('|'),
	translate(
		'Siempre que sea tu turno, puedes pulsar las siguientes teclas de acceso directo.<br> \
(W) - Construye un muro. Los muros cuestan '+WALL_PRICE+'ç. Pueden construise en cualquier parte de tu lado del campo.<br> \
(E) - Salir del modo de construcción. Cancela la construcción de torres, muros y trampas.<br> \
(R) - Coloca una trampa. Las trampas cuestan '+TRAP_PRICE+'ç. Puedes construir trampas en diversos tipos de terrenos.<br> \
(T) - Construye una torre. Las torres cuestan '+TOWER_PRICE+'ç Pueden construise en cualquier parte de tu lado del campo.<br> \
(U) - Modo Mejora. Selecciona el modo Mejora y haz click en una de tus unidades para subirle un nivel.<br> \
Mediante este método, es posible aumentar el nivel de las torres, para hacerlas más poderosas.<br> \
Ten en cuenta que el coste para subir de nivel aumenta con cada uso.<br> \|Wherever you turn, you can press the following shortcut keys. <br> \<br>(W) - Build a wall. The walls cost \'  WALL_PRICE  \' ç. And they can only be built on grass. <br> \<br>(E) - exit the building. Cancel the construction of towers, walls and traps. <br> \<br>(R) - Place a trap. Cost traps \'  TRAP_PRICE  \' ç. You can build traps in various types of terrain. <br> \<br>(T) - Build a tower. The towers cost \'  TOWER_PRICE  \' ç and can be built only on grass. <br> \<br>(U) - Enhanced Mode. Select the Upgrade mode and click one of your units to bring them up a level. <br> \<br>By this method, it is possible to increase the level of the towers to make them more powerful. <br> \<br>. Please note that the cost to level increases with each use <br>'
	)
);
addManualEntry(
	translate('Tiempo Atmosférico|Weather (Incomplete)'),
	'',
	translate('|'),
	translate(
		'Al inicio de cada turno, el tiempo atmosférico va cambiando, dando lugar a distintos fenómenos.<br> \
Hay dos factores que cambian, la temperatura y la lluvia.<br> \
Ambos tienen efectos positivos o negativos.<br> \
<br> \
<h3>Temperatura</h3><br> \
<b>Calor</b><br> \
Cuando hace calor, los charcos de agua se secan y el hielo y la escarcha se derrite.<br> \
<b>Ola de Calor</b><br> \
Durante una ola de calor, las unidades pueden entrar en insolación si permanecen mucho tiempo en movimiento.<br> \
La insolación causa daño, aunque no llega a matar.<br> \
Para evitarlo, una unidad insolada puede quedarse quieta hasta que el efecto se pase, entrar en charcos de agua o hielo. Aunque es raro ver hielo con mucho calor, ¿No?<br> \
<br> \
<b>Frío</b><br> \
Cuando hace frío, los charcos de agua se congelan dando lugar a Hielo, y la hierba se convierte en Escarcha.<br> \
Si hace frío y además llueve, es posible que el mapa se convierta en una <i>pista de esquí gigante</i><br> \
<b>Ola de Frío</b><br> \
Una ola de frío es una condición meteorológica bastante seria, que puede causar el congelamiento de las unidades.<br> \
Una unidad fría pierde movilidad y con el tiempo se congela, dando lugar a una parálisis temporal.<br> \
Si el tiempo mejora, la unidad dejará de estar congelada, pero eso puede evitarse pasando por unas Aguas Termales.<br> \
<br> \
<b>Lluvia</b><br> \
La lluvia es un evento que causa charcos de agua aparecer en el mapa. Lo cual puede ser una molestia en algunas ocasiones, pero puede ser beneficioso si la lluvia se combina con tiempo frío.<br> \|At the beginning of each shift, the weather is changing, giving rise to different phenomena. <br> \<br>There are two factors that change, temperature and rain. <br> \<br>Both have positive or negative effects. <br> \<br><br><br><br><H3> Temperature </ h3> <br> \<br><B> Heat </b> <br> \<br>In hot weather, the pools of water and dry ice and frost melts. <br> \<br><B> Heat </b> <br> \<br>During a heat wave, the units may come into heat stroke if left too long on the move. <br> \<br>Heat stroke causes damage, but does not kill. <br> \<br>To avoid a heatstroke unit can stand still until wears off, into puddles or ice. Although it is rare to see ice with hot, right?<br><br><br><br><br><br><B> Cool </b> <br> \<br>In cold weather, water puddles freeze leading to ice, and the grass becomes Frost. <br> \<br>If it\'s cold and it rains, you may map ski giant becomes a <i> </ i> <br> \<br><B> Cool </b> <br> \<br>A cold snap is a pretty serious weather conditions, which can cause freezing units. <br> \<br>A cold unit loses mobility and eventually freezes, resulting in a temporary paralysis. <br> \<br>If the weather improves, the unit will not be frozen, but that can be avoided through a hot spring. <br> \<br><br><br><br><B> Clear </b> <br> \<br>Rain is an event that causes puddles appear on the map. . This can be a nuisance at times, but can be beneficial if the rain combined with cold weather <br>'
	)
);
addManualEntry(
	translate('Modo Carrera|Race Mode (Incomplete)'),
	'',
	translate('|'),
	translate(
		'El Modo Carrera utiliza sólo dos unidades, la tuya y la del enemigo.<br> \
El objetivo es simple, tienes que avanzar hacia la parte derecha del mapa y la última unidad en pie es la ganadora.<br> \
Para complicar las cosas, existe un fenómeno llamado Corrupción, que causa la desaparición de partes específicas del mapa.<br> \
La corrupción causa daño a las unidades que caminan por encima, hasta llegar a la muerte.<br> \
Existen dos formas diferentes de perder en el modo Carrera.<br> \
Una de ellas es morir por una exposición prolongada a la Corrupción.<br> \
La otra es ser absorbido por el borde de la pantalla al inicio de un turno.<br> \
Para evitar perder, mantente en continuo movimiento, y haz lo posible por comer Uvas Arcoiris.<br> \
Si comes Uvas Arcoiris, es posible que aumente el movimiento de tu unidad, dándote una ventaja frente al enemigo.<br> \|The career mode uses only two units, yours and that of the enemy. <br> \<br>The goal is simple, you have to move towards the right side of the map and the last unit standing is the winner. <br> \<br>To complicate matters, there is a phenomenon called corruption, causing the disappearance of specific parts of the map. <br> \<br>Corruption harms units walking over, reaching death. <br> \<br>There are two different ways to lose in Career Mode. <br> \<br>One is dying from prolonged exposure to corruption. <br> \<br>The other is being absorbed by the edge of the screen at the start of a shift. <br> \<br>To avoid losing, stay on the move, and do your best to eat grapes Rainbow. <br> \<br>If you eat grapes Rainbow, may increase the movement of your unit, giving you an advantage over the enemy'
	)
);

addManualEntry(
	translate('Lista de Unidades|Unit List (Incomplete)'),
	'',
	translate('|'),
	translate(
		' '+getUnitThumbnail('sprite_boyScout')+' <br> \
El Boy Scout es la unidad básica del Equipo Boy Scout.<br> \
Tiene una defensa media y un ataque bajo, por lo que destaca en estrategias defensivas.<br> \
<br> \
 '+getUnitThumbnail('sprite_soldierScout')+' <br> \
El Soldado es una unidad del Equipo Boy Scout que es medianamente barata y versátil.<br> \
Su movimiento es bastante alto comparado con el de otras unidades, por lo que es fácil planear estrategias. Por otra parte, su rango es limitado y su rendimiento en combate es mediocre, por eso es imprescindible no utilizarla como carne de cañón.<br> \
<br> \
 '+getUnitThumbnail('sprite_sniperScout')+' <br> \
El Francotirador es una unidad cara, con un ataque decente y un impresionante rango.<br> \
Es perfecto para defender tu base de los ataques enemigos patrullando la zona y eliminando cualquier enemigo al alcance.<br> \
<br> \
 '+getUnitThumbnail('sprite_tower')+' <br> \
La torre es una unidad defensiva inmóvil del Equipo Boy Scout.<br> \
Es algo cara de construir, pero ataca automáticamente a los enemigos que se encuentran al alcance, así que se puede utilizar como centinela para proteger la base.<br> \
<br> \
 '+getUnitThumbnail('sprite_wall')+' <br> \
El muro es una unidad defensiva inmóvil del Equipo Boy Scout.<br> \
Su coste es barato. A pesar de no poder atacar, su defensa es alta y sirve de gran ayuda combinada con torres y trampas.<br> \
<br> \
 '+getUnitThumbnail('sprite_coon')+' <br> \
El Mapache es la unidad básica del equipo Mapache.<br> \
Tiene un ataque medio y una defensa baja. Es excelente en el combate cuerpo a cuerpo, y causa graves daños si se utiliza en gran número.<br> \
<br> \
 '+getUnitThumbnail('sprite_soldierCoon')+' <br> \
El Mapache Soldado es una unidad del equipo Mapache medianamente barata.<br> \
Su ataque es mayor al del Mapache, pero cuenta con una menor defensa. Al atacar a distancia, se puede utilizar como artillería pesada contra murallas y torres.<br> \
<br> \
 '+getUnitThumbnail('sprite_rppCoon')+' <br> \
El Mapache Lanzagranadas es una unidad de asedio del equipo Mapache.<br> \
Su coste es caro, pero tiene un ataque alto y un rango mayor al del soldado mapache, a pesar de su baja movilidad. Es perfecta para el asedio de torres y murallas, para abrir paso a unidades más ligeras.<br> \
<br> \
 '+getUnitThumbnail('sprite_cannon')+' <br> \
La torreta ametralladora es una unidad defensiva inmóvil del Equipo Mapache.<br> \
Es algo cara de construir, pero ataca automáticamente a los enemigos que se encuentran al alcance, así que se puede utilizar como centinela para proteger la base.<br> \
<br> \
 '+getUnitThumbnail('sprite_barbedWire')+' <br> \
El alambre de espino es una unidad defensiva inmóvil del Equipo Mapache.<br> \
Su coste es barato. A pesar de no poder atacar, su defensa es alta y sirve de gran ayuda combinada con torres y trampas.<br> \
<br> \
 '+getUnitThumbnail('sprite_traitorBoyScout')+' <br> \
El Boy Scout Traidor es una unidad hostil invocada por los Súcubos.<br> \
<br> \
 '+getUnitThumbnail('sprite_traitorCoon')+' <br> \
El Mapache Traidor es una unidad hostil invocada por los Súcubos.<br> \
<br> \
 '+getUnitThumbnail('sprite_zombieScout')+' <br> \
El Zombie es una unidad hostil del modo supervivencia. Al atacar puede causar Enfermedad, que baja la vida del afectado rápidamente hasta la muerte. Los Zombies son creados cuando otro zombie mata a un Boy Scout.<br> \
<br> \
 '+getUnitThumbnail('sprite_zombieCoon')+' <br> \
El Zombie Mapache es una unidad hostil del modo supervivencia. Al atacar puede causar Enfermedad, que baja la vida del afectado rápidamente hasta la muerte. Los Zombies Mapache son creados cuando otro zombie mata a un Mapache.<br> \
<br> \
 '+getUnitThumbnail('sprite_vampire')+' <br> \
El Vampiro es una unidad temible del modo Cielo contra Infierno. Tiene una alta capacidad de movimiento, y recupera vida al atacar a sus enemigos. Si un vampiro mata a un Boy Scout, éste es convertido en un Mordido, que con el tiempo se convierte en otro vampiro más.<br> \
<br> \
 '+getUnitThumbnail('sprite_bitten')+' <br> \
El Mordido es un Boy Scout que ha sufrido el ataque de un vampiro y ha muerto. Tras moverse 13 veces, el mordido se convierte en otro Vampiro.<br> \
<br> \
 '+getUnitThumbnail('sprite_priest')+' <br> \
El Sacerdote es una unidad disponible en la lucha contra los Vampiros. Cuando un Sacerdote ataca a un vampiro, éste recibe una alta cantidad de daño, que le ocasiona la muerte. Los sacerdotes no pueden ser convertidos en zombies, ni vampiros, y son incapaces de traicionar.<br> \
<br> \
 '+getUnitThumbnail('sprite_fireSage')+' <br> \
El Sabio de Fuego es uno de los cuatro sabios. Utiliza bolas de fuego para atacar, su rango es menor al de una torre y su defensa es baja, por lo que es vulnerable a ataques cuerpo a cuerpo. A diferencia de los Mapaches, es inmune a conversiones en zombie o en Traidor.<br> \
<br> \
 '+getUnitThumbnail('sprite_windSage')+' <br> \
El Sabio de Viento es uno de los cuatro sabios. Utiliza rayos para atacar, su rango es menor al de una torre y su defensa es baja, por lo que es vulnerable a ataques cuerpo a cuerpo. A diferencia de los Mapaches, es inmune a conversiones en zombie o en Traidor.<br> \
<br> \
 '+getUnitThumbnail('sprite_earthSage')+' <br> \
El Sabio de la Tierra es uno de los cuatro sabios. Utiliza pedruscos para atacar, su rango es menor al de una torre y su defensa es baja, por lo que es vulnerable a ataques cuerpo a cuerpo. A diferencia de los Mapaches, es inmune a conversiones en zombie o en Traidor.<br> \
<br> \
 '+getUnitThumbnail('sprite_waterSage')+' <br> \
El Sabio de Agua es uno de los cuatro sabios. Utiliza lluvia para atacar, su rango es menor al de una torre y su defensa es baja, por lo que es vulnerable a ataques cuerpo a cuerpo. A diferencia de los Mapaches, es inmune a conversiones en zombie o en Traidor.<br> \
<br> \
 '+getUnitThumbnail('sprite_angel')+' <br> \
El Angel es una unidad defensiva disponible en el modo Cielo contra Infierno. Su ataque es mayor al de un Boy Scout y aunque es en realidad un Mapache, es inmune a conversiones en zombie o traiciones.<br> \
<br> \
 '+getUnitThumbnail('sprite_demon')+' <br> \
El Demonio es una unidad ofensiva disponible en el modo Cielo contra Infierno. Comparte características con los Mapaches, pero tiene una defensa ligeramente mayor. No puede ser convertido en zombie ni en traidor.<br> \
<br> \
 '+getUnitThumbnail('sprite_succubus')+' <br> \
Los Súcubos son criaturas malvadas que hipnotizan a los Boy Scouts y Mapaches y pueden llegar a convertirlos en traidores. Frente a unidades que no sucumben a sus encantos, son débiles, por lo que son vulnerables al combate a distancia.<br> \
<br> \
 '+getUnitThumbnail('sprite_fairy')+' <br> \
Las hadas pueden curar a aliados que estén a su alcance. No son muy fuertes y sus curaciones tampoco, pero aumentan con su nivel.<br> \
<br> \
 '+getUnitThumbnail('sprite_gnome')+' <br> \
Los Gnomos son seres pacíficos de la tierra. Allá donde pasan, hacen aparecer setas y otro tipo de plantas. Son inmunes al veneno de las setas y se mueven muy rápido.<br> \
<br> \
 '+getUnitThumbnail('sprite_goblin')+' <br> \
Los Duendes son débiles en combate, pero sirven para robar dinero de las arcas del equipo enemigo.<br> \
<br>|'+getUnitThumbnail('sprite_boyScout')+' <br> \
El Boy Scout es la unidad básica del Equipo Boy Scout.<br> \
Tiene una defensa media y un ataque bajo, por lo que destaca en estrategias defensivas.<br> \
<br> \
 '+getUnitThumbnail('sprite_soldierScout')+' <br> \
El Soldado es una unidad del Equipo Boy Scout que es medianamente barata y versátil.<br> \
Su movimiento es bastante alto comparado con el de otras unidades, por lo que es fácil planear estrategias. Por otra parte, su rango es limitado y su rendimiento en combate es mediocre, por eso es imprescindible no utilizarla como carne de cañón.<br> \
<br> \
 '+getUnitThumbnail('sprite_sniperScout')+' <br> \
El Francotirador es una unidad cara, con un ataque decente y un impresionante rango.<br> \
Es perfecto para defender tu base de los ataques enemigos patrullando la zona y eliminando cualquier enemigo al alcance.<br> \
<br> \
 '+getUnitThumbnail('sprite_tower')+' <br> \
La torre es una unidad defensiva inmóvil del Equipo Boy Scout.<br> \
Es algo cara de construir, pero ataca automáticamente a los enemigos que se encuentran al alcance, así que se puede utilizar como centinela para proteger la base.<br> \
<br> \
 '+getUnitThumbnail('sprite_wall')+' <br> \
El muro es una unidad defensiva inmóvil del Equipo Boy Scout.<br> \
Su coste es barato. A pesar de no poder atacar, su defensa es alta y sirve de gran ayuda combinada con torres y trampas.<br> \
<br> \
 '+getUnitThumbnail('sprite_coon')+' <br> \
El Mapache es la unidad básica del equipo Mapache.<br> \
Tiene un ataque medio y una defensa baja. Es excelente en el combate cuerpo a cuerpo, y causa graves daños si se utiliza en gran número.<br> \
<br> \
 '+getUnitThumbnail('sprite_soldierCoon')+' <br> \
El Mapache Soldado es una unidad del equipo Mapache medianamente barata.<br> \
Su ataque es mayor al del Mapache, pero cuenta con una menor defensa. Al atacar a distancia, se puede utilizar como artillería pesada contra murallas y torres.<br> \
<br> \
 '+getUnitThumbnail('sprite_rppCoon')+' <br> \
El Mapache Lanzagranadas es una unidad de asedio del equipo Mapache.<br> \
Su coste es caro, pero tiene un ataque alto y un rango mayor al del soldado mapache, a pesar de su baja movilidad. Es perfecta para el asedio de torres y murallas, para abrir paso a unidades más ligeras.<br> \
<br> \
 '+getUnitThumbnail('sprite_cannon')+' <br> \
La torreta ametralladora es una unidad defensiva inmóvil del Equipo Mapache.<br> \
Es algo cara de construir, pero ataca automáticamente a los enemigos que se encuentran al alcance, así que se puede utilizar como centinela para proteger la base.<br> \
<br> \
 '+getUnitThumbnail('sprite_barbedWire')+' <br> \
El alambre de espino es una unidad defensiva inmóvil del Equipo Mapache.<br> \
Su coste es barato. A pesar de no poder atacar, su defensa es alta y sirve de gran ayuda combinada con torres y trampas.<br> \
<br> \
 '+getUnitThumbnail('sprite_traitorBoyScout')+' <br> \
El Boy Scout Traidor es una unidad hostil invocada por los Súcubos.<br> \
<br> \
 '+getUnitThumbnail('sprite_traitorCoon')+' <br> \
El Mapache Traidor es una unidad hostil invocada por los Súcubos.<br> \
<br> \
 '+getUnitThumbnail('sprite_zombieScout')+' <br> \
El Zombie es una unidad hostil del modo supervivencia. Al atacar puede causar Enfermedad, que baja la vida del afectado rápidamente hasta la muerte. Los Zombies son creados cuando otro zombie mata a un Boy Scout.<br> \
<br> \
 '+getUnitThumbnail('sprite_zombieCoon')+' <br> \
El Zombie Mapache es una unidad hostil del modo supervivencia. Al atacar puede causar Enfermedad, que baja la vida del afectado rápidamente hasta la muerte. Los Zombies Mapache son creados cuando otro zombie mata a un Mapache.<br> \
<br> \
 '+getUnitThumbnail('sprite_vampire')+' <br> \
El Vampiro es una unidad temible del modo Cielo contra Infierno. Tiene una alta capacidad de movimiento, y recupera vida al atacar a sus enemigos. Si un vampiro mata a un Boy Scout, éste es convertido en un Mordido, que con el tiempo se convierte en otro vampiro más.<br> \
<br> \
 '+getUnitThumbnail('sprite_bitten')+' <br> \
El Mordido es un Boy Scout que ha sufrido el ataque de un vampiro y ha muerto. Tras moverse 13 veces, el mordido se convierte en otro Vampiro.<br> \
<br> \
 '+getUnitThumbnail('sprite_priest')+' <br> \
El Sacerdote es una unidad disponible en la lucha contra los Vampiros. Cuando un Sacerdote ataca a un vampiro, éste recibe una alta cantidad de daño, que le ocasiona la muerte. Los sacerdotes no pueden ser convertidos en zombies, ni vampiros, y son incapaces de traicionar.<br> \
<br> \
 '+getUnitThumbnail('sprite_fireSage')+' <br> \
El Sabio de Fuego es uno de los cuatro sabios. Utiliza bolas de fuego para atacar, su rango es menor al de una torre y su defensa es baja, por lo que es vulnerable a ataques cuerpo a cuerpo. A diferencia de los Mapaches, es inmune a conversiones en zombie o en Traidor.<br> \
<br> \
 '+getUnitThumbnail('sprite_windSage')+' <br> \
El Sabio de Viento es uno de los cuatro sabios. Utiliza rayos para atacar, su rango es menor al de una torre y su defensa es baja, por lo que es vulnerable a ataques cuerpo a cuerpo. A diferencia de los Mapaches, es inmune a conversiones en zombie o en Traidor.<br> \
<br> \
 '+getUnitThumbnail('sprite_earthSage')+' <br> \
El Sabio de la Tierra es uno de los cuatro sabios. Utiliza pedruscos para atacar, su rango es menor al de una torre y su defensa es baja, por lo que es vulnerable a ataques cuerpo a cuerpo. A diferencia de los Mapaches, es inmune a conversiones en zombie o en Traidor.<br> \
<br> \
 '+getUnitThumbnail('sprite_waterSage')+' <br> \
El Sabio de Agua es uno de los cuatro sabios. Utiliza lluvia para atacar, su rango es menor al de una torre y su defensa es baja, por lo que es vulnerable a ataques cuerpo a cuerpo. A diferencia de los Mapaches, es inmune a conversiones en zombie o en Traidor.<br> \
<br> \
 '+getUnitThumbnail('sprite_angel')+' <br> \
El Angel es una unidad defensiva disponible en el modo Cielo contra Infierno. Su ataque es mayor al de un Boy Scout y aunque es en realidad un Mapache, es inmune a conversiones en zombie o traiciones.<br> \
<br> \
 '+getUnitThumbnail('sprite_demon')+' <br> \
El Demonio es una unidad ofensiva disponible en el modo Cielo contra Infierno. Comparte características con los Mapaches, pero tiene una defensa ligeramente mayor. No puede ser convertido en zombie ni en traidor.<br> \
<br> \
 '+getUnitThumbnail('sprite_succubus')+' <br> \
Los Súcubos son criaturas malvadas que hipnotizan a los Boy Scouts y Mapaches y pueden llegar a convertirlos en traidores. Frente a unidades que no sucumben a sus encantos, son débiles, por lo que son vulnerables al combate a distancia.<br> \
<br> \
 '+getUnitThumbnail('sprite_fairy')+' <br> \
Las hadas pueden curar a aliados que estén a su alcance. No son muy fuertes y sus curaciones tampoco, pero aumentan con su nivel.<br> \
<br> \
 '+getUnitThumbnail('sprite_gnome')+' <br> \
Los Gnomos son seres pacíficos de la tierra. Allá donde pasan, hacen aparecer setas y otro tipo de plantas. Son inmunes al veneno de las setas y se mueven muy rápido.<br> \
<br> \
 '+getUnitThumbnail('sprite_goblin')+' <br> \
Los Duendes son débiles en combate, pero sirven para robar dinero de las arcas del equipo enemigo.<br> \
<br>')
);


/* 

addManualEntry(
	translate('Test|Test'),
	'',
	translate('|'),
	translate(
		'|'
	)
);

*/