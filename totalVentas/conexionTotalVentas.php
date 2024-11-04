<?php
require_once "../session.php";

$id_turno=$_GET['id_turno'];
// Consulta para obtener los datos de la tabla

$sql = "SELECT c.id_cuenta, c.nombre_cliente, CASE WHEN c.estado=1 THEN 'CERRADA' WHEN c.estado=2 THEN 'MOROSOS'  END AS 'estado', c.fecha
FROM cuenta c WHERE eliminado=0 AND id_turno='$id_turno' ";
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

?>

