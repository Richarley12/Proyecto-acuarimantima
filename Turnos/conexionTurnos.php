<?php

require_once "../session.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $accion = $_POST['accion'];

if ($accion == 'abrirturno') {
    $encargado=$_POST['encargado'];
    $saldo_inicial=$_POST['saldo_inicial'];
    $observacion_apertura=$_POST['observacion_apertura'];
    $fecha=$_POST['fecha'];
    $sql = "INSERT INTO turno (encargado, saldo_inicial, observacion_apertura, fecha_inicio)
    SELECT nombre, '$saldo_inicial', '$observacion_apertura', '$fecha'
    FROM usuarios
    WHERE id_usuario = '$encargado'";
    if (mysqli_query($conn, $sql)) {   
      echo "Turno abierto correctamente";
      } else { 
        echo "Error al actualizar registro: " . mysqli_error($conn); 
      }
  } else if($accion == 'cerrarturno'){
          $ventas_efectivo=$_POST['ventas_efectivo'];
          $ventas_transferencia=$_POST['ventas_transferencia'];
          $total=$_POST['total'];
          $efectivo_cierre=$_POST['efectivo_cierre'];
          $egresos_efectivo=$_POST['egresos_efectivo'];
          $egresos_transferencia=$_POST['egresos_transferencia'];
          $observacion_cierre=$_POST['observacion_cierre'];
          $id_turno=$_POST['id_turno'];
          $fecha=$_POST['fecha'];
          $sql = "UPDATE turno SET pagos_efectivo='$ventas_efectivo', pago_transferencia='$ventas_transferencia', efectivo_cierre=' $efectivo_cierre',observacion_cierre='$observacion_cierre',fecha_fin='$fecha', egresos_efectivo='$egresos_efectivo', egresos_transferencias='$egresos_transferencia' WHERE id_turno='$id_turno'";
          if (mysqli_query($conn, $sql)) {   
            echo "Turno cerrado";
            } else { 
              echo "Error: " . mysqli_error($conn); 
            }
  } else if ($accion=='actualizar_Estado') {
    $id_cuenta=$_POST['id_cuenta'];
    $estado=$_POST['estado'];
    $sql="UPDATE cuenta SET estado='$estado' WHERE id_cuenta='$id_cuenta'";
    if (mysqli_query($conn, $sql)) {   
      echo "Estado actualizado";
      } else { 
        echo "Error: " . mysqli_error($conn); 
      }
  }
}
// Cerrar la conexión
$conn->close();

?>