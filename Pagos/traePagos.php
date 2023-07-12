<?php
require_once "../session.php";
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD']== 'POST') {
    $accion=$_POST['accion'];
    if ($accion =='traer_pagos') {
        $sql="SELECT P.id_registro, C.id_cuenta, P.fecha, nombre_cliente, total_cuenta,responsable,pago_efectivo,pago_transferencia FROM pagos P JOIN cuenta C WHERE P.id_cuenta=C.id_cuenta AND eliminado=0 AND total is not null AND P.total_cuenta != 0";
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















