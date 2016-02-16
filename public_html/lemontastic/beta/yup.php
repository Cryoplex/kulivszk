<!DOCTYPE html>
<html>
<head>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<style>
span {
	display: none;
}
</style>
</head>

<body>
	<span id="textFile">
	<?php

	$f_contents = file("testfile.txt");
	$line = $f_contents[array_rand($f_contents)];
	$data = $line;

	$some = rand() % 100;
	if ($some == 50) {
		$myfile = fopen("testfile.txt", "w");
	}
	else {
		$myfile = fopen("testfile.txt", "r+");
	}

	$hasID = htmlspecialchars($_GET["name"]);
	$ident = $_GET['id'];

	$test = shell_exec('tail -n 1 testfile.txt');
	echo $test;

	if ($hasID) {
		$level = htmlspecialchars($_GET["level"]);
		if ($level < 1) return;

		$txt = "_-_name=".$hasID;
		$txt = $txt."_-_limones=".htmlspecialchars($_GET["limones"]);
		$txt = $txt."_-_dollars=".htmlspecialchars($_GET["dollars"]);
		$txt = $txt."_-_pic=".htmlspecialchars($_GET["pic"]);
		$txt = $txt."_-_level=".$level;
		$txt = $txt."_-_id=".htmlspecialchars($_GET["id"]);
		$txt = $txt."_-_played=".htmlspecialchars($_GET["played"]);
		$txt = $txt."_-_";

		file_put_contents("testfile.txt", $txt."\r\n", FILE_APPEND);

		fopen("playerdata/".$ident.".txt", "w");
		file_put_contents("playerdata/".$ident.".txt", $txt."\r\n", FILE_APPEND);

		fclose($myfile);
	}

	?>
	</span>
	<h1 id="crypty"></h1>

	<span id="ls">
		<?php echo "\n".shell_exec('ls playerdata')."\n"; ?>
	</span>
	<span id="lastRandomStand">
		<?php
			//Last lemonade stand
			$random_stand = $_COOKIE['ltLastID'];
			$fname = 'playerdata/'.$random_stand;
			echo shell_exec("tail -n 1 $fname");
		?>
	</span>

	<b id="jquery">null</b>


	<script src="http://www.archlemon.com/common.js"></script>

	<script>
	var firstTime = true;
	var randomLine = document.getElementById('lastRandomStand').innerHTML;
	randomLine = randomLine.split('_-_');
	var obj = {};
	for (x in randomLine) {
		var splitty = randomLine[x].split('=');
		if (splitty.length > 1) {
			obj[splitty[0]] = splitty[1];
		}
	}

	var canContinue = true;
	localStorage.setItem('lastPlayer', JSON.stringify(obj));

	randie = Math.ceil(Math.random()*1e5);
	var randomName = 'Random Guy No. '+randie;

	if (!localStorage.getItem('postName')) localStorage.setItem('postName', randomName);
	if (!localStorage.getItem('limones')) localStorage.setItem('limones', 0);
	if (!localStorage.getItem('dollars')) localStorage.setItem('dollars', 0);

	var data = JSON.parse(localStorage.getItem('data'));
	if (data.mvh) var mvhHelper = data.mvh;
	if (!data.mvh) {
		data.mvh = ['img/scout2.png', [0, 0, 0]];
	}
	var ident = data.ident;
	var played = localStorage.getItem('played');

	function asdf() {
		firstTime = false;
		var txt = {
			'name': localStorage.getItem('postName'),
			'limones': localStorage.getItem('limones'),
			'dollars': localStorage.getItem('dollars'),
			'mvhPic': data.mvh[0],
			'mvhLevel': data.mvh[1][2],
			'id': ident,
			'played': played,
		};
		var test = "yup.php?";
		test += "name="+screw(txt.name);
		test += "&limones="+txt.limones;
		test += "&dollars="+txt.dollars;
		test += "&pic="+txt.mvhPic;
		test += "&level="+txt.mvhLevel;
		test += "&id="+ident;
		test += "&played="+played;

		window.location.href = test
	}
	function validGuy(string) {
		if (!string) return false;
		if (!string.match('txt')) return false;
		if (string.split('.')[0] == ident) return false;
		return true;
	}
	function getRandomGuy(ident) {
		var userlist = document.getElementById('ls').innerHTML;
		userlist = userlist.split("\n");
		var randomStand = read(userlist);

		while (!validGuy(randomStand)) randomStand = read(userlist);

		return randomStand;
	}
	var interval = Math.ceil(Math.random()*2000+9000);

	var randomStand = getRandomGuy(ident);

	document.cookie = 'ltLastID='+randomStand;

	if (canContinue) var x = setTimeout(asdf, interval);

	</script>
</body>
</html>