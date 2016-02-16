<?php
$action = $_GET['action'];
$text = $_COOKIE['text'];
$me = $_COOKIE['me'];

if ($action == 'send') {
	shell_exec('tail -n +2 log');
	file_put_contents("log", "&lt".$me."&gt ".$text."\n", FILE_APPEND);
}
echo shell_exec('tail -n 100 log');
?>