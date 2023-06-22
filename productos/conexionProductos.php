<?php

require_once "../session.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Obtener los parámetros de la solicitud
      $accion = isset($_POST['accion']) ? $_POST['accion'] : '';
  //valida qué tipo de acción va a realizar
      if ($accion == 'eliminar') {
          $id_producto = $_POST['id_producto'];
          $sql = "UPDATE productos SET eliminado = 1 WHERE id_producto = $id_producto";
          if (mysqli_query($conn, $sql)) {   
          echo "Eliminado correctamente";
          } else { 
            echo "Error al actualizar registro: " . mysqli_error($conn); 
          }}
    //valida qué tipo de acción va a realizar        
          else if ($accion == 'guardarnuevo') {
            $nombre=$_POST['nombre'];
            $valor=$_POST['valor'];
            $sql = "INSERT INTO productos (nombre,valor) VALUES ('$nombre','$valor')";
            if (mysqli_query($conn, $sql)) {   
              echo "Producto guardado correctamente";
              } else { 
                echo "Error al actualizar registro: " . mysqli_error($conn); 
              }
          }
    //valida qué tipo de acción va a realizar
          else if ($accion == 'guardarviejo'){
            $id_producto = $_POST['id_producto'];
            $nombre=$_POST['nombre'];
            $valor=$_POST['valor'];
            $sql = "UPDATE productos SET nombre='$nombre',valor='$valor' WHERE id_producto=$id_producto;";
            if (mysqli_query($conn, $sql)) {   
              echo "Producto actualizado correctamente";
              } else { 
                echo "Error al actualizar registro: " . mysqli_error($conn); 
              }
          }
          }
        
// Cerrar la conexión
$conn->close();
?>

