<!DOCTYPE html>
<html>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
</head>
<body>
	<input type="textarea" id="textoutput">
	<pre id="textinput"></pre>
		<h4 id="userbar"></h4>

	<pre>

	<span id="vampname">Dracula</span> the Vampire <span id="vamphp">10/10</span><img src="http://lemontastic.archlemon.com/beta/img/scouts/scout2e.png">
	<input type="button" value="Stab Vampire" onclick="stabVampire()">
	</pre>

	<pre id="asdf"></pre>

	<span id="php"></span><br>

	<input type="textbox" id="textie"><input type="button" value="send" onclick="say()">


	<script src="http://www.archlemon.com/common.js"></script>
	<script>
	var connected = false;
	var save;
	function gt(item) {
		return localStorage.getItem(item);
	}
	function st(item, value) {
		localStorage.setItem(item, value);
	}
	function reset() {
		save = undefined;
		st('save', save);
		document.cookie = 'name=';
		document.cookie = 'killed=';
	}
	if (!gt('save')) {
		console.log('Save file not found.');
		var save = {
			'id': Math.round(Math.random()*1e16),
		};
		st('save', JSON.stringify(save));
	}
	else {
		save = JSON.parse(gt('save'));
	}
	//Stop loading phase
	if (!save.name) {
		connected = false;
		var nuname = prompt('Select a new name for your guy: ');
		save.name = nuname || 'Random Guy #'+Math.round(Math.random()*1000);
		saveAll();
		connected = true;
	}
	connected = true;
	if (connected) {
		$('#asdf').load('readlog.php?action=login');
	}

	function stabVampire() {
		if (!save.killed) save.killed = 0;
		save.killed += 1;
		saveAll();
		$('#asdf').load('readlog.php?action=stab');
	}
	function saveAll() {
		var stringy = JSON.stringify(save);
		st('save', stringy);
		document.cookie = 'name='+save.name;
		document.cookie = 'killed='+save.killed;
		document.cookie = 'id='+save.id;
	}
	function allTimeShit() {
		$('#asdf').load('readlog.php');
		document.getElementById('userbar').innerHTML = save.name +" the Vampire Slayer. Total vampires slain: "+save.killed;

		//var x = $('#vampname').load('readlog.php?action=spawn');
	}
	function say() {
		var text = screw(document.getElementById('textie').value);
		$('#asdf').load('readlog.php?action=write&text='+text);
	}

	window.onbeforeunload = function() {
		alert('ARE YOU LEAVING US ALONE WITH ALL OF THOSE VAMPIRES?!');
		$('#asdf').load('readlog.php?action=logout');
	}
	var t = setInterval(allTimeShit, 100);

	saveAll();

	var inp = document.getElementById('textinput').innerHTML.split('\n');

	function crawl() {
		var l = "";
		var inp = document.getElementById('textinput').innerHTML.split('\n');
		for (x in inp) {
			var z = inp[x].split(',');
			if (z[2] == 'true') continue;
			l += z[0]+':'+z[1]+':1-1:5,';
		}
		document.getElementById('textoutput').value = l;
	}
	</script>

</body>
</html>