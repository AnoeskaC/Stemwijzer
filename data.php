<?php 

$servername = "localhost";
$username = "root";
$password = "root";

	try {
	    $conn = new PDO("mysql:host=$servername;dbname=stemwijzer_database", $username, $password);
	    // set the PDO error mode to exception
	    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	    //echo "Connected successfully". '<br>'; 
	    }
	catch(PDOException $e)
	    {
	    echo "Connection failed: " . $e->getMessage();
	    }




function getParties(){
	global $conn;
	$sql = 'SELECT * FROM parties';
	$statement = $conn->prepare($sql);
	$statement->execute();
	$parties = $statement->fetchAll(PDO::FETCH_CLASS);
	//print_r($result);
	header('Content-Type: application/json; charset=utf-8');
	$json = json_encode($parties);

	echo $json;
	
}

getParties();