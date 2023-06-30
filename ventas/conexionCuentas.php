<?php
require_once "../session.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Obtener los parámetros de la solicitud
    $accion = isset($_POST['accion']) ? $_POST['accion'] : '';
    //valida qué tipo de accion va a realizar
    if ($accion=='insertar') {
        $id_cliente = ($_POST['id_cliente'] === '0') ? null : $_POST['id_cliente'];
        $nombre=$_POST['nombre'];
        $id_turno=$_POST['id_turno'];
        $encargado=$_POST['encargado'];
        $sql = "INSERT INTO cuenta (id_cliente,nombre_cliente,responsable,id_turno,fecha) VALUES ('$id_cliente','$nombre','$encargado','$id_turno',NOW())";
        if (mysqli_query($conn, $sql)) {
            echo "Mesa agregada";
            } else { 
              echo "Error: " . mysqli_error($conn); 
            }
    } else if($accion=='insertarProducto') {
        $id_cuenta=$_POST['id_cuenta'];
        $id_producto=$_POST['id_producto'];
        $nombre=$_POST['nombre'];
        $cantidad=$_POST['cantidad'];
        $valor=$_POST['valor'];
            $sql = "INSERT INTO detalle_cuenta (id_cuenta,id_producto,nombre_producto,cantidad,valor) VALUES ('$id_cuenta','$id_producto','$nombre','$cantidad','$valor')";
            if (mysqli_query($conn, $sql)) {   
                echo "Producto agregado";
                } else { 
                  echo "Error: " . mysqli_error($conn); 
                }
    } else if($accion=='cambiarCantidad'){
        $id_registro=$_POST['id_registro'];
        $cantidad=$_POST['cantidad'];

        $sql="UPDATE detalle_cuenta SET cantidad='$cantidad' WHERE id_registro='$id_registro'";
        if (mysqli_query($conn, $sql)) {   
                echo "Producto actualizado";
                } else { 
                  echo "Error: " . mysqli_error($conn); 
                }
      } else if ($accion=='actualizaTotal') {
        $id_cuenta=$_POST['id_cuenta'];
        $total=$_POST['total'];
        $cPagado=$_POST['cPagado'];
        $spendiente=$_POST['saldo_Pendiente'];

        $sql="UPDATE cuenta SET total='$total', saldo_Pendiente='$spendiente', saldo_pagado='$cPagado' WHERE id_cuenta='$id_cuenta'";
        if (mysqli_query($conn, $sql)) {   
          echo "Total actualizado";
          } else { 
            echo "Error: " . mysqli_error($conn); 
          }
      } else if($accion=='cambiarPorcentaje'){
        $id_registro=$_POST['id_registro'];
        $porcentaje=$_POST['porcentaje'];
        $descuento_valor=$_POST['descuento_valor'];

        $sql="UPDATE detalle_cuenta SET descuento_porc='$porcentaje', descuento_valor='$descuento_valor' WHERE id_registro='$id_registro'";
        if (mysqli_query($conn, $sql)) {   
                echo "Producto actualizado";
                } else { 
                  echo "Error: " . mysqli_error($conn); 
                }
      } elseif ($accion=='eliminar'){
        $id_registro=$_POST['id_registro'];
        $sql = "UPDATE  detalle_cuenta SET eliminado=1 WHERE id_registro='$id_registro'";
        if (mysqli_query($conn, $sql)) {   
          echo "Producto Eliminado";
          } else { 
            echo "Error: " . mysqli_error($conn); 
          }
      }
} 

// Cerrar la conexión
$conn->close();
?>