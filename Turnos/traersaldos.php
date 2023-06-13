<?php
require_once "../session.php";
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
// Consulta para obtener los datos de la tabla
    $fecha_inicio=$_POST['fecha_inicio'];
    $sql = "SELECT pago_efectivo,pago_transferencia,devuelta FROM pagos WHERE fecha >= '$fecha_inicio'";
    $resultado = $conn->query($sql);
    $datos=array();
    if ($resultado->num_rows > 0) {
      while ($row = $resultado->fetch_assoc()) {
          $datos[] = $row;}
  }
}
// Cerrar la conexión
$conn->close();

if (empty($datos)) {
    echo 'null';
  } else {
    echo json_encode($datos);
  }

?>