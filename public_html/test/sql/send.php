<?php
	$conn = mysqli_connect("localhost", "chucknorris", "98817736", "archlemon");

	if (!$conn) die("Connection failed: " . mysqli_connect_error());

	// sql to create table
	$sql = "CREATE TABLE lemontastic (
	id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name TEXT,
	value TEXT
	)";

	function search($name) {
		$conn = mysqli_connect("localhost", "chucknorris", "98817736", "archlemon");

		$sql = "SELECT * FROM lemontastic WHERE name='$name'";
		if (mysqli_query($conn, $sql)) return 1;
	}
	function update($name, $newValue) {
		$conn = mysqli_connect("localhost", "chucknorris", "98817736", "archlemon");

		$sql = "DELETE FROM lemontastic WHERE name='$name'";
		mysqli_query($conn, $sql);

		$sql = "INSERT INTO lemontastic (name, value)
		VALUES ('$name', '$newValue')";
		mysqli_query($conn, $sql);
	}

	$get = $_GET['q'];
	$sql = "SELECT * FROM lemontastic WHERE name='$get'";
	$result = mysqli_query($conn, $sql);

	if (mysqli_num_rows($result) > 0) {
	    // output data of each row
	    while($row = mysqli_fetch_assoc($result)) {
	        echo $row["value"];
	    }
	} else {
	    echo "0 results";
	}

	$act = $_GET['act'];
	if ($act == 'steal') {
		$conn = mysqli_connect("localhost", "chucknorris", "98817736", "archlemon");
		$sql = "SELECT value FROM lemontastic WHERE name='bank'";
		$oldValue = mysqli_query($conn, $sql);
		$oldValue = mysqli_fetch_assoc($oldValue)["value"];
		$oldValue = $oldValue - 2;
		update("bank", $oldValue);
	}
	if ($act == 'tip') {
		
	}

	mysqli_close($conn);
?>