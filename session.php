<?php
// Conectar a la base de datos
$servername= "localhost";
$username="root";
$password = "";
$dbname = "prueba";

//creo la conexión al servidor
$conn = new mysqli($servername,$username,$password,$dbname);

// Comprobar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
