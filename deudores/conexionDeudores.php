<?php
require_once "../session.php";
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $accion= isset($_POST['accion'])?$_POST['accion']:'';

  if ($accion=='consultar_Cuentas') {
            // Consulta para obtener los datos de la tabla
            $sql = "SELECT c.*
            FROM cuenta c
            JOIN turno t ON c.id_turno = t.id_turno
            WHERE c.eliminado = 0
              AND c.estado = 0
              AND c.total IS NOT NULL
              AND c.saldo_pendiente != 0
              AND t.fecha_fin IS NOT NULL";
            $resultado = $conn->query($sql);
            // Crear un array para almacenar los datos
            $cuentas = array();
            // Obtener los datos y almacenarlos en el array
            if ($resultado->num_rows > 0) {
                while ($row = $resultado->fetch_assoc()) {
                    $cuentas[] = $row;
                }
              }else {
                $cuentas=array(
                    'mensaje'=> 'Error al consultar');
            }
          // Convertir el array de datos a JSON
          echo json_encode($cuentas);
  } else if ($accion=='consultar_Pagos') {
    $id_cuenta=$_POST['id_cuenta'];
    $sql = "SELECT * FROM pagos WHERE id_cuenta='$id_cuenta'";
    $resultado = $conn->query($sql);
            // Crear un array para almacenar los datos
            $result = array();
            // Obtener los datos y almacenarlos en el array
            if ($resultado->num_rows > 0) {
                while ($row = $resultado->fetch_assoc()) {
                    $result[] = $row;
                }
              }else {
                $result=array(
                    'mensaje'=> 'Error al consultar');
            }
          // Convertir el array de datos a JSON
          echo json_encode($result);
  }
}
// Cerrar la conexión
$conn->close();
?>

