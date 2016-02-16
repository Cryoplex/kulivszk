function increaseValue(num) {
	combine.value += num;
}
function resetVariables() {
	if (!combine.value) combine.value = 0;
	if (!combine.monsters) combine.monsters = [];
	if (!combine.known) combine.known = [];
}
function saveGame() {
	localStorage.setItem('combine', JSON.stringify(combine));
	notification('Game Saved');
}
function loadGame() {
	var losto = localStorage.getItem('combine');
	if (!losto) return;
	combine = JSON.parse(losto);
	notification('Game Loaded');
}
function getPlainMonster(id) {
	if (id == 'r') id = rand(0, monsters.length-1);
	combine.monsters[combine.monsters.length] = {'id': id, 'level': 1, 'hpx': -1, 'mpx': -1,
	'quality': {'hp': 0, 'mp': 0, 'atk': 0, 'def': 0, 'mag': 0, 'agi': 0}
	};
	update('game_monsters');
}
function getBaseStat(id, base) {
	var bases = {'hp': 3, 'mp': 4, 'atk': 5, 'def': 6, 'mag': 7, 'agi': 8};
	return monsters[id][bases[base]];
}
function getStat(from, base) {
	var id = from.id;
	var level = from.level;
	var q = from.quality[base];
	if (!q) q = 0;
	var basestat = ((getBaseStat(id, base) + q) / 100) * level;
	var extra = (base == 'hp' || base == 'mp') ? 10 : 5;
	return Math.floor(basestat + extra);
}
function getMonsterList(combo) {
	if (!combine.monsters.length) return "You don't have monsters!";
	var l = '';

	if (combo) {
		for (var e in select) l += getMonsterStats(select[e], 1) + '<br>';
		return l;
	}
	for (var gml in combine.monsters) {
		l += getMonsterStats(gml) + '<br>';
	}
	return l;
}
function getMonsterStats(monsterid, com) {
	var monst = combine.monsters[monsterid];
	var moid = monst.id;
	if (monst.hpx < 0) monst.hpx = getStat(monst, 'hp');
	if (monst.mpx < 0) monst.mpx = getStat(monst, 'mp');
	var lft = Math.floor(moid / 10) * -96;
	var rgt = (moid % 10) * -96;
	var imj = '<i class="monster monster_test" style="background-position: '+lft+'px '+rgt+'px"></i>';
	var gms = '<div class="mostats">'+imj;

	if (monsterid == select[0] || monsterid == select[1]) com = 1;
	var exx = -1;
	if (monsterid == select[0]) exx = 0;
	if (monsterid == select[1]) exx = 1;

	if (!com) gms += '<input class="btn btn-default btn2" value="Add to Combinator" onclick="selectForCombination('+monsterid+')">';
	if (com) gms += '<input class="btn btn-default btn2" value="Remove from Combinator" onclick="deleteForCombination('+exx+')">';
	gms += '<br>';

	gms += monsters[moid][0] + ' Species (Rank '+monsters[moid][1]+' Level '+monst.level+')<br>';
	gms += '<small><table>';
	gms += '<tr><td>HP</td><td>'+getBar('hpbar_filled', monst.hpx, getStat(monst, 'hp'))+'</td>';
	gms += '<td>MP</td><td>'+getBar('mpbar_filled', monst.mpx, getStat(monst, 'mp'))+'</td></tr>';
	gms += '<tr><td>*</td><td>'+monst.hpx + '/' + getStat(monst, 'hp')+'</td>';
	gms += '<td>*</td><td>'+monst.mpx + '/' + getStat(monst, 'mp')+'</td></tr>';

	gms += '<tr><td>ATK</td><td>'+getStat(monst, 'atk')+'</td>';
	gms += '<td>DEF</td><td>'+getStat(monst, 'def')+'</td></tr>';
	gms += '<tr><td>MAG</td><td>'+getStat(monst, 'mag')+'</td>';
	gms += '<td>AGI</td><td>'+getStat(monst, 'agi')+'</td></tr></table></small>';


	return gms + '</div>';
}
function getBar(type, min, max) {
	var perc = Math.ceil((min / max) * 100);
	var empt = 100 - perc;
	console.log('Drawing bar '+min+', '+max+' '+perc+', '+empt);
	return '<div class="bar"><div class="'+type+'"" style="width: '+perc+'px"></div><div class="bar_empty" style="width: '+empt+'px"></div></div>'
}
function update(step) {
	//if (step == 'game_value' || !step) doc('game_value').innerHTML = shortNum(combine.value);
	if (step == 'game_monsters' || !step) doc('game_monsters').innerHTML = getMonsterList();

	var ex = '';
	if (select.length >= 2) ex = '<input class="btn btn-default" value="Combine These Monsters!" onclick="combination()">';
	if (step == 'game_combo' || !step) doc('game_combo').innerHTML = getMonsterList(1) + ex;

	doc('game_combo2').innerHTML = '';
	if (select.length >= 2) doc('game_combo2').innerHTML = combination(1);

	var completion = 0;
	var ul = '';
	for (var up in monsters) {
		ul += '[' + up + '] ' + getName(up, 1) + '<br>';
		if (combine.known[up]) completion++;
	}
	comp = Math.round((completion / monsters.length) * 10000) / 100;
	doc('game_known').innerHTML = 'Completed: ' + comp + ' %<br>'+ul;
}
function getName(id, hidd) {
	if (!id && id != 0) return;
	var elems = {
		'F': '(Fire)',
		'T': '(Thunder)',
		'I': '(Ice)',
		'A': '(Aqua)',
		'E': '(Earth)',
		'W': '(Wind)',
		'L': '(Light)',
		'D': '(Darkness)',
		'N': '(Null)',
		'S': '(Space)',
		'H': '(Time)',
		'J': '(Energy)',
	};
	if (elems[id]) return elems[id];
	var mon = monsters[id][0];
	if (hidd && !combine.known[id]) return '????????';
	return mon;
}
function combination(peek) {
	select = select.sort();
	var father = combine.monsters[select[0]];
	var mother = combine.monsters[select[1]];
	var fid = father.id;
	var mid = mother.id;
	var fat = monsters[fid][2];
	var mat = monsters[mid][2];

	var lev = Math.floor(((father.level + mother.level) / 2)) + rand(1,2);
	var possibleChilds = [fid, mid];
	if (combinations[fid][mid]) possibleChilds.push(combinations[fid][mid], combinations[fid][mid]);
	if (combinations[mid][fid]) possibleChilds.push(combinations[mid][fid], combinations[mid][fid]);

	if (combinations[fid][mat]) possibleChilds.push(combinations[fid][mat], combinations[fid][mat]);
	if (combinations[mid][fat]) possibleChilds.push(combinations[mid][fat], combinations[mid][fat]);

	if (fid == 10) possibleChilds.push(rand(0, monsters.length-1));
	if (mid == 10) possibleChilds.push(rand(0, monsters.length-1));

	var child = read(possibleChilds);
	if (peek) {
		var ll = '';

		for (var pc in possibleChilds) {
			var res = monsters[possibleChilds[pc]];
			ll += getName(possibleChilds[pc], 1) + ' Rank ' + res[1] + '<br>';
		}
		ll += '<br><br>';

		ll += '<b>'+getName(fid)+'</b><br>';
		for (var pc in combinations[fid]) {
			ll += '+ ' + getName(pc, 1) + ' = ' + getName(combinations[fid][pc], 1) + '<br>';
		}
		ll += '<br><br>';

		ll += '<b>'+getName(mid)+'</b><br>';
		for (var pc in combinations[mid]) {
			ll += '+ ' + getName(pc, 1) + ' = ' + getName(combinations[mid][pc], 1) + '<br>';
		}

		return ll;
	}

	var fqty = father.quality;
	var mqty = mother.quality;
	var cqty = {};
	for (var q in fqty) {
		cqty[q] = Math.ceil((fqty[q] + mqty[q]) / 2) + rand(1,2);
	}

	child = {'id': read(possibleChilds), 'level': lev, 'hpx': -1, 'mpx': -1,
	'quality': cqty
	};
	var ixf = select[1];
	var ixm = select[0];
	combine.monsters.splice(ixf, 1);
	combine.monsters.splice(ixm, 1);
	combine.monsters.push(child);
	select = [];

	notification('A new '+monsters[child.id][0]+' was born! Level: '+child.level);
	var bef = !combine.known[child.id];
	combine.known[child.id] = 1;
	if (bef) notification('New species discovered: '+getName(child.id));

		update();
	return child;
}
function selectForCombination(monsterid) {
	if (select.length >= 2) return;
	select.push(monsterid);
	update();
}
function deleteForCombination(monsterid) {
	if (select.length <= 0) return;
	select.splice(monsterid, 1);
	update();
}
function showDoc(docm) {
	hideAllTabs();
	doc(docm).style.display = 'block';
}
function hideAllTabs() {
	doc('tab_combine').style.display = 'none';
}

var elements = [
'F',	//Fire
'T',	//Thunder
'I',	//Ice

'A',	//Aquatic
'W',	//Wind
'E',	//Earth

'L',	//Light
'D',	//Darkness
'N',	//Null (No element)

'S',	//Space
'H',	//Time
'J',	//Energy
];
//Monster 			Name	Tier	Element		Base HP		Base MP		Base ATK	Base DEF	Base MAG		Base AGI
//Name		Monster Species Name
//Tier		Monster Tier. Every combination may lead to a monster from the next tier.
//Base HP	Basic Hit Points. If HP go to zero, the monster dies.
//Base MP	Basic Magic Points. Let use skills that consume MP.
//Base ATK	Basic Attack. Determines the force of physical attacks of that monster.
//Base DEF	Basic Defense. Determines resistance against physical attacks.
//Base MAG 	Basic Magic. Determines both power and resistance to magical attacks.
//Base AGI 	Basic Agility. Determines the speed and rate of evasion in battles.
var monsters = [
//0
['Dummy', 0, 'N', 0, 0, 0, 0, 0, 0],
//1
['Null Elemental', 0, 'N', 51, 51, 51, 51, 51, 51],
//2
['Fire Elemental', 1, 'F', 40, 51, 62, 51, 62, 40],
//3
['Thunder Elemental', 1, 'T', 51, 51, 40, 40, 62, 62],
//4
['Ice Elemental', 1, 'I', 62, 51, 40, 62, 40, 51],
//5
['Aqua Elemental', 2, 'A', 62, 75, 50, 50, 75, 62],
//6
['Wind Elemental', 2, 'W', 50, 50, 75, 62, 62, 75],
//7
['Earth Elemental', 2, 'E', 75, 50, 62, 75, 62, 50],
//8
['Light Elemental', 3, 'L', 75, 75, 75, 75, 75, 75],
//9
['Darkness Elemental', 3, 'D', 75, 75, 75, 75, 75, 75],
//10
['Mystery', 0, 'N', 30, 30, 30, 30, 30, 30],
//11
['Space Elemental', 4, 'S', 135, 18, 108, 108, 18, 90],
//12
['Time Elemental', 4, 'H', 90, 90, 18, 18, 18, 180],
//13
['Energy Elemental', 4, 'J', 18, 135, 18, 90, 135, 90],
//14
['Rabbit', 1, 'N', 62, 62, 62, 62, 62, 90],
//15
['Dragon', 1, 'N', 62, 62, 62, 90, 62, 62],
//16
['Tiger', 1, 'N', 62, 62, 90, 62, 62, 62],
//17
['Monkey', 1, 'N', 62, 62, 62, 62, 62, 90],
//18
['Dog', 1, 'N', 90, 62, 62, 62, 62, 62],
//19
['Sheep', 1, 'N', 62, 62, 62, 90, 62, 62],
//20
['Bull', 1, 'N', 62, 62, 90, 62, 62, 62],
//21
['Pig', 1, 'N', 90, 62, 62, 62, 62, 62],
//22
['Snake', 1, 'N', 62, 62, 62, 62, 90, 62],
//23
['Rat', 1, 'N', 62, 62, 62, 62, 62, 90],
//24
['Horse', 1, 'N', 62, 62, 62, 62, 62, 90],
//25
['Rooster', 1, 'N', 62, 62, 90, 62, 62, 62],

];
var combinations = [
//Combos for 0 (Dummy)
{1: 10, 'N': 1},
//Combos for 1 (Null Elemental)
{0:10, 1: 14, 2: 15, 3: 16, 4: 17, 5: 18, 6: 19, 7: 20, 8: 21, 9: 22, 11: 23, 12: 24, 13: 25,
	'F': 1, 'T': 1, 'I': 1, 'A': 1, 'W': 1, 'E': 1, 'L': 1, 'D': 1, 'N': 1},
//Combos for 2 (Fire Elemental)
{4: 5, 5: 1, 6: 1, 'F': 8},
//Combos for 3 (Thunder Elemental)
{5: 3, 9: 8, 'D': 6},
//Combos for 4 (Ice Elemental)
{3: 5, 5: 4, 'F': 5},
//Combos for 5 (Aqua Elemental)
{2: 1, 4: 4, 'I': 4},
//Combos for 6 (Wind Elemental)
{2: 1, 6: 3},
//Combos for 7 (Earth Elemental)
{5: 7},
//Combos for 8 (Light Elemental)
{9: 8, 'D': 8},
//Combos for 9 (Darkness Elemental)
{8: 9, 'L': 9},
//Combos for 10 (Mystery)
{},
//Combos for 11 (Space Elemental)
{'S': 11},
//Combos for 12 (Time Elemental)
{'H': 12},
//Combos for 13 (Energy Elemental)
{'J': 13},
//Combos for 14 (Rabbit)
{1: 1},
{2: 2},
{3: 3},
{4: 4},
{5: 5},
{6: 6},
{7: 7},
{8: 8},
{9: 9},
{11: 11},
{12: 12},
{13: 13},

];

var combine = {};
loadGame();
var select = [];
resetVariables();
var t = setInterval(saveGame, 60000);
var t2 = setInterval(function() {update('game_combo2')}, 50);
update();