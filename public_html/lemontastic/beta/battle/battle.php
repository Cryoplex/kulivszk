<?php
$act = $_COOKIE['action'];
$id = $_COOKIE['id'];
$data = $_COOKIE['helpers'];
if ($act == 'get') {
	shell_exec('ls database > db.txt');
	echo shell_exec('shuf -n 1 db.txt');
}
if ($act == 'set') {
	$fn = "database/".$id.".txt";
	file_put_contents($fn, $data);
	echo "Data: ".$data." Filename: ".$fn." ".shell_exec('tail -n 10 $fn')." written.";
}
?>