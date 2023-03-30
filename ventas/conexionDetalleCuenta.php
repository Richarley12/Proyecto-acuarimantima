<?php
require_once "../session.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id_cuenta=$_POST['id_cuenta'];
// Consulta para obtener los datos de la tabla
$sql = "SELECT * FROM `detalle_cuenta` WHERE id_cuenta='$id_cuenta' AND eliminado=0";
$resultado = $conn->query($sql);
// Crear un array para almacenar los datos
$cuentas = array();

// Obtener los datos y almacenarlos en el array
if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $cuentas[] = $row;
    }
}
// Cerrar la conexión
$conn->close();

// Convertir el array de datos a JSON
echo json_encode($cuentas);
}
?>

