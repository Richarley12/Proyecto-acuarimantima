<?php
require_once "../session.php";
header('Content-Type: application/json');

// Consulta para obtener los datos de la tabla
$sql = "SELECT * FROM turno";
$resultado = $conn->query($sql);
// Crear un array para almacenar los datos
$turnos = array();
// Obtener los datos y almacenarlos en el array
if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $turnos[] = $row;}
}
// Cerrar la conexión
$conn->close();
// Convertir el array de datos a JSON
if (empty($turnos)) {
    echo 'null';
  } else {
    echo json_encode($turnos);
  }


?>