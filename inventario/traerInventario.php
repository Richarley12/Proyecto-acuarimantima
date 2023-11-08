<?php
require_once "../session.php";
header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
$accion=$_POST['accion'];

if($accion=='salidas'){
    $fechainicio=$_POST['fechainicio'];
    $fechafin=$_POST['fechafin'];
    $sql= "SELECT id_registro, DC.id_cuenta, nombre_producto, SUM(cantidad) AS cantidad, C.fecha AS fecha, TIME(C.fecha) AS hora
    FROM detalle_cuenta DC
    JOIN cuenta C ON DC.id_cuenta = C.id_cuenta
    WHERE DC.id_cuenta IN (
        SELECT id_cuenta
        FROM cuenta
        WHERE (DATE(fecha) BETWEEN '$fechainicio' AND ' $fechafin') AND (eliminado = 0)
    ) AND DC.eliminado = 0
    GROUP BY DATE(fecha), nombre_producto
    ORDER BY fecha DESC";
     $resp=mysqli_query($conn, $sql);
     $resultado=array();
     if ($resp->num_rows>0) {
         while ($row=$resp->fetch_assoc()){
             $resultado[]=$row;
         }
     } else {
         $resultado = array('mensaje'=>'Error al consultar');
     } 
     echo json_encode($resultado);
}

}

$conn->close();

?>

