<?php
require_once "../session.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // Obtener los parámetros de la solicitud
    $usuario=$_POST['usuario']
    $contraseña=$_POST['contraseña']

          $sql = "SELECT * FROM productos WHERE usuario= $usuario AND contraseña=$contraseña AND eliminado=0 ";
          if (mysqli_query($conn, $sql)) {   
          echo "Eliminado correctamente";
          } else { 
            echo "Error al actualizar registro: " . mysqli_error($conn); 
          }
        }
// Cerrar la conexión
$conn->close();

?>