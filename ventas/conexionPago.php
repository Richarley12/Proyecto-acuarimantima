<?php
require_once "../session.php";
if ($_SERVER['REQUEST_METHOD']=='POST') {
    // Obtener los parámetros de la solicitud
    $accion = isset($_POST['accion']) ? $_POST['accion'] : '';
    $id_detallecuenta= isset($_POST['id_detallecuenta']) ? $_POST['id_detallecuenta'] : null;
    if($accion=='insertarPago'){
        $id_cuenta=$_POST['id_cuenta'];
        $pago_efectivo=$_POST['pago_efectivo'];
        $pago_transferencia=$_POST['pago_transferencia'];
        $totalcuenta=$_POST['totalcuenta'];
        $devuelta=$_POST['devuelta'];
        $fecha=$_POST['fecha'];
        $sql= "INSERT INTO pagos (id_cuenta,id_detallecuenta,pago_efectivo,pago_transferencia,total_cuenta,devuelta,fecha) VALUES ('$id_cuenta','$id_detallecuenta','$pago_efectivo','$pago_transferencia','$totalcuenta','$devuelta','$fecha')";
        if (mysqli_query($conn, $sql)) {   
            echo "Pago agregado";
            } else { 
              echo "Error: " . mysqli_error($conn); 
            }
    } else if ($accion=='modificardetalleCuenta'){
        $id_registro=$_POST['id_registro'];
        $valorPagado=$_POST['valorPagado'];
        $sql="UPDATE detalle_cuenta SET valor_pagado='$valorPagado', pagado= 1 WHERE id_registro='$id_registro'";
        if (mysqli_query($conn, $sql)) {   
                echo "Producto actualizado";
                } else { 
                  echo "Error: " . mysqli_error($conn); 
                }
    } elseif ($accion=='consultaCuenta') {
      $id_cuenta=$_POST['id_cuenta'];
      $sql = "SELECT * FROM cuenta WHERE id_cuenta='$id_cuenta' AND eliminado=0";
      $resultado = $conn->query($sql);
      $cuentas = array();
      if ($resultado->num_rows > 0) {
        while ($row = $resultado->fetch_assoc()) {
          $cuentas[] = $row;
        }
        echo json_encode($cuentas); // Devuelve el resultado en formato JSON
      } else {
        echo json_encode([]); // Devuelve un array vacío en formato JSON si no hay resultados
      }} else if ($accion=='cuentaPagada') {
    $id_cuenta=$_POST['id_cuenta'];
    $sql="UPDATE cuenta SET estado = '1', saldo_pagado=total, saldo_pendiente='0' WHERE id_cuenta='$id_cuenta'";
    if (mysqli_query($conn, $sql)) {   
      echo "Cuenta actualizada";
      } else { 
        echo "Error: " . mysqli_error($conn); 
      }
  }else if ($accion=='registrar_Gasto') {
        $observacion_gasto=$_POST['observacion_gasto'];
        $valor=$_POST['valor'];
        $producto=$_POST['producto'];
        $metodo=$_POST['metodo'];
        $fecha=$_POST['fecha'];
        // Iniciar la transacción
        mysqli_begin_transaction($conn);
      try {
        $sql_egreso ="INSERT INTO egresos (concepto,valor,fecha,metodo_pago,observaciones) VALUES ('compra turno','$valor','$fecha','$metodo','$observacion_gasto')";
        mysqli_query($conn, $sql_egreso);
        $id_egreso = mysqli_insert_id($conn); // Obtener el id_egreso insertado
        $sql_detalle ="INSERT INTO detalle_egreso (id_egreso,producto,valor,cantidad) VALUES ('$id_egreso','$producto','$valor',1)";
        mysqli_query($conn, $sql_detalle);
        mysqli_commit($conn);
        echo json_encode("Gasto registrado correctamente") ;
      } catch (\Throwable $th) {
        mysqli_rollback($conn);
        echo json_encode("Error al insertar los datos: " . $e->getMessage());
      }
  }

}

// Cerrar la conexión
$conn->close();

?>