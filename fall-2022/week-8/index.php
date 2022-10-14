<?php
$servername = 'localhost';
$username   = 'root';
$password   = 'password';
$dbname     = 'grocery';

// Create connection
$conn = new mysqli( $servername, $username, $password, $dbname );

// Check connection
if ( $conn->connect_error ) {
	die( 'Connection failed: ' . $conn->connect_error );
}
echo 'Connected successfully<br>';


$sql    = 'SELECT id, name, qty, got FROM items WHERE got = 1';
$result = $conn->query( $sql );

if ( $result->num_rows > 0 ) {
	// output data of each row
	while ( $row = $result->fetch_assoc() ) {
		echo 'id: ' . $row['id'] . ' - Name: ' . $row['name'] . ' - ' . $row['qty'] . '<br>';
	}
} else {
	echo '0 results';
}
$conn->close();
