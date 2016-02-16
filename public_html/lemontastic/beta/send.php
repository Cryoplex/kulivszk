<?php
//send.php?type=MSG&from=id&to=id&msg=TEXT
//send.php?type=BUY&from=id&to=id&msg=TEXT

$type = $_GET['type'];
$from = $_GET['from'];
$to = $_GET['to'];
$msg = $_GET['msg'];

if ($type == 'MSG' || $type == 'BUY') {
	$qty = $_GET['qty'];
	$price = $_GET['price'];

	$filename = 'msgto/'.$to.'.txt';
	if ($type == 'BUY') {
		$msg = $qty."q".$price."q";
	}
	file_put_contents($filename, $type."_".$from."_".$msg."_-_"."\n", FILE_APPEND);
	echo $msg." sent";
}
if ($type == 'CHECK') {
	$id = $_GET['id'];

	$filename = 'msgto/'.$id.'.txt';
	$exists = file_exists($filename);
	if ($exists) {
		echo shell_exec("tail -n 100 $filename");
		fopen($filename, 'w');
	}
	else {
		echo "0";
	}
}
?>
---

<script>
var dataz = JSON.parse(localStorage.getItem('data'));

</script>