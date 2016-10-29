var changelog = [
	'- Lilim RPG Online!',
];

function displayItem2(item, noPrice, alt) {
	var stats = [];
	for (var di in statNamesObj) {
		var stat = statNamesObj[di];
		var base = stat.baseName;

		if (item[base] != 0) stats.push(item[base]+'/'+stat.name);
	}
	//return JSON.stringify(item);
	var p = '('+getPriceForItem(item)+'ph)';
	if (noPrice) p = ''
	if (alt) return stats.join(' ');
	return '<span class="blue">'+item.name+'</span><span class="gray">'+' '+p+' '+'</span>';
}
function spawnBoss2() {
	socket.emit('action', {'action': 'spawnBoss'});
}
function atac() {
	socket.emit('action', {'action': 'atac', 'to': lastUserData});
}