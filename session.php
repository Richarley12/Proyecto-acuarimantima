<?php
// Conectar a la base de datos

// $servername= "localhost";
// $username="u493973480_acuacafebar";
// $password = "Caboxa1234.";
// $dbname = "u493973480_acuarimantima";

$servername= "localhost";
$username="root";
$password = "";
$dbname = "bar_prueba";

//creo la conexión al servidor
$conn = new mysqli($servername,$username,$password,$dbname);

// Comprobar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
