<!DOCTYPE html>
<html>
<head><title>Arch Lemon Studios Feedback | Thanks for your message!</title></head>
<body>

	<?php

	$from = $_POST['from'];
	$name = $_POST['yourname'];
	$email = $_POST['youremail'];
	$subject = $_POST['subject'];
	$msg = $_POST['yourmsg'];

	$string = "[$subject] Name: $name (Mail: $email) from $from says: $msg\n---\n";

	$file = "messages.txt";
	file_put_contents($file, $string, FILE_APPEND);

	?>
	<h1>Thanks. Your message will be reviewed coon.</h1>


</body>
</html>
</html>