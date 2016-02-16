<?php
$act = $_GET['act'];
$who = $_COOKIE['user'];
$msg = $_COOKIE['msg'];
$from = $_COOKIE['from'];

function write($what, $where) {
	file_put_contents($where, $what."\n", FILE_APPEND);
}
function get($what, $replace) {
	$dbase = file('database.txt');
	$dbase = explode(";", $dbase[0]);

	foreach ($dbase as $var) {
		$varname = explode('=', $var);
		if ($what == $varname[0]) {
			if ($replace) {
				$var = $what."=".$replace;
				break;
			}
			return $varname[0]."=".$varname[1];
		}
	}
	$dbase = join($dbase, ";");

	file_put_contents('database.txt', $dbase);

	return join(file('database.txt'), ";");

	echo shell_exec('tail -n 999 database.txt');
}
if ($act == 'send') {
	$msg = '['.$who.'] '.$msg;
	write($msg, 'messages.txt');
}
if ($act == 'read') {
	echo shell_exec('tail -n 25 messages.txt');
}
if ($act == 'login') {
	$word = $who.' logged in.';
	write($word, 'messages.txt');
	echo $word;
}
if ($act == 'varWrite') {
	$varName = $_COOKIE['var'];
	$varValue = $_COOKIE['val'];
	get($varName, $varValue);
}
if ($act == 'varRead') {
	$varName = $_COOKIE['var'];
	echo get($varName);
}
if ($act == 'debug') {
	$db = get('var1', 38987);
	echo $db;
}
if ($act == 'stab') {
	$vname = $from.'killed';
	$old = get($vname);
	$old += 1;
	get($vname, $old);
	write($from." ha matado a un zombie. ¡Ya ha matado ".$old." zombies en total!", "messages.txt");
}
echo shell_exec('tail -n 100 messages.txt');


?>
