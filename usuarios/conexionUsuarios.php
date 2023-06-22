<?php

include_once '../session.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD']=='POST') {
    // Obtener los parámetros de la solicitud
    $accion=isset($_POST['accion'])? $_POST['accion']:'';
    //valida qué tipo de accion va a realizar
    if ($accion=="guardar_Usuario") {
            $nombre=$_POST['nombre'];
            $contrasena=$_POST['contraseña'];
            $rol=$_POST['rol'];
            $usuario=$_POST['usuario'];
            $saltedPassword = $contrasena;
            $hash = password_hash($saltedPassword, PASSWORD_BCRYPT);
            $sql= "INSERT INTO usuarios (usuario,contrasena,nombre,rol) VALUES ('$usuario','$hash','$nombre','$rol');";
            if (mysqli_query($conn, $sql)) {   
                $response = array(
                    'mensaje' => 'Usuario guardado');
                }else { 
                   $response = array(
                    'mensaje' => 'Error al guardar'); 
                  }
                  echo json_encode($response);
    } elseif ($accion=="eliminar_Usuario") {
        $id_usuario = $_POST['id_usuario'];
        $sql = "UPDATE usuarios SET eliminado = 1 WHERE id_usuario = $id_usuario";
        if (mysqli_query($conn, $sql)) {   
            $response = array(
                'mensaje' => 'Usuario eliminado');
            }else { 
               $response = array(
                'mensaje' => 'Error al eliminar'); 
              }
              echo json_encode($response);
    }
}
$conn->close();

?>