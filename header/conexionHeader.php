<?php
require_once "../session.php";
header('Content-Type: application/json');

// Consulta para obtener los datos de la tabla
$sql = "SELECT * FROM usuarios";
$resultado = $conn->query($sql);
// Crear un array para almacenar los datos
$usuario = array();
// Obtener los datos y almacenarlos en el array
if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $usuario[] = $row;}
}
// Cerrar la conexión
$conn->close();
// Convertir el array de datos a JSON
    echo json_encode($usuario);
  
?>