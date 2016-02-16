<?php
session_start();

$action = $_COOKIE['act'];

if ($action == 'buy') {
	$itemID = $_COOKIE['id'];
}

if ($action == 'sell') {
	$val = $_POST['value']."\n";

	file_put_contents("itemlist.txt", $val, FILE_APPEND);

	//echo shell_exec('tail -n 1 itemlist.txt');
	echo $val;
}

if ($action == 'getlist') {
	echo shell_exec('tail -n 100 itemlist.txt');
}


unset($_COOKIE['act']);
?>