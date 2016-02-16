<?php
	$conn = mysqli_connect('localhost', 'chucknorris', '98817736', 'archlemon');

	$sql = "SELECT * FROM variables";
	echo mysqli_query($conn, $sql);

	mysqli_close($conn);
?>