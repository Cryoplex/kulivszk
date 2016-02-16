<?php
	session_start();

	if (!$_GET['action']) echo shell_exec('tail -n 10 log');


	$you = $_COOKIE['name'];
	$tot = $_COOKIE['killed'];
	$cookieID = $_COOKIE['id'];

	function write($text, $file) {
		if (!$file) $file = "log";
		$time = date('H:i:s');
		file_put_contents($file, "[".$time."] ".$text."\r\n", FILE_APPEND);
	}
	function spawnVampire() {
		$file = fopen("data/vampire", "w");
		$newName = shell_exec('shuf -n 1 vamps.txt');
		file_put_contents($file, $newName.":10");

		$vamp = new Vampire();
		array_push($vampires, $vamp);
		write($vamp . " " . $newName . " " . $vampires);
	}
	class Vampire {

	}
	$vampires = array();
	spawnVampire();
	write("Load");

	function read($file) {
		$f_contents = file($file);
		$line = $f_contents[array_rand($f_contents)];
		$data = $line;
		return str_replace("\n", "", $data);
	}
	function add_player($filename, $filecontent) {
		//shell_exec("echo 'null' > people/$filename.txt");
		$file = fopen($filename, "w");
		write($filecontent, $filename);
	}
	$filename = 'people/'.$cookieID.'.txt';
	$filecontent = "Name: ".$you." (ID: ".$cookieID.")\nVampires killed: ".$tot;

	add_player($filename, $filecontent);
	$act = $_GET['action'];
	if ($act == 'stab') {
		$verbs = shell_exec('shuf -n 1 stabs.txt');
		$dies = shell_exec('shuf -n 1 dies.txt');
		write($you." ".read('stabs.txt')." the vampire. The vampire ".read('dies.txt')."! Total vampires slain by ".$you.": ".$tot);
	}
	if ($act == 'login') {
		write($you." just logged in.");
	}
	if ($act == 'logout') {
		write($you." logged out. Bye bye!");
	}
	if ($act == 'spawn') {
		spawnVampire();
	}
	if ($act == 'write') {
		$text = $_GET['text'];
		write($you." says: ".$text);
	}
?>