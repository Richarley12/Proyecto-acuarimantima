<?php

require_once "../session.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $accion = $_POST['accion'];

if ($accion == 'abrirturno') {
    $encargado=$_POST['encargado'];
    $saldo_inicial=$_POST['saldo_inicial'];
    $observacion_apertura=$_POST['observacion_apertura'];

    $sql = "INSERT INTO turno (encargado,saldo_inicial,observacion_apertura,fecha_inicio) VALUES ('$encargado','$saldo_inicial','$observacion_apertura',NOW())";

    if (mysqli_query($conn, $sql)) {   
      echo "Turno abierto correctamente";
      } else { 
        echo "Error al actualizar registro: " . mysqli_error($conn); 
      }
  } 
}
// Cerrar la conexión
$conn->close();

?>