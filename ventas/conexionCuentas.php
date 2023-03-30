<?php
require_once "../session.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Obtener los parámetros de la solicitud
    $accion = isset($_POST['accion']) ? $_POST['accion'] : '';
    //valida qué tipo de accion va a realizar
    if ($accion=='insertar') {
        $nombre=$_POST['nombre'];
        $sql = "INSERT INTO cuenta (nombre_cliente) VALUES ('$nombre')";
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
    }
} 


// Cerrar la conexión
$conn->close();
?>