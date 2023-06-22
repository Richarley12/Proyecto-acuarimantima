<?php
require_once "./session.php";
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $usuario = $_POST['usuario'];
  $password = $_POST['contrasena'];
  $sql = "SELECT * FROM usuarios WHERE usuario = '$usuario' AND eliminado = 0";
  $result = $conn->query($sql);
  $info = array();
  
  if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      $info[] = $row;
    }

    if (!empty($info)) {
      foreach ($info as $item) {
        $contrasena = $item['contrasena'];
        $usuario = $item['usuario'];
        $nombre = $item['nombre'];
        $rol = $item['rol'];
        $eliminado = $item['eliminado'];
        $id_usuario= $item['id_usuario'];
        if ($eliminado==0) {
          if (password_verify($password, $contrasena)) {
            $response = array(
              'mensaje' => 'La contraseña es correcta',
              'rol' => $rol,
              'usuario'=> $usuario,
              'nombre'=> $nombre,
              'id_'=> $id_usuario
            );
          } else {
            $response = array(
              'mensaje' => 'La contraseña es incorrecta',
            );
          }
        } else {
          $response = array(
            'mensaje' => 'Este usuario fue eliminado'
          );
        }
      }
    }
  } else {
    $response = array(
      'mensaje' => 'No se encontró ningún usuario'
    );
  }

  echo json_encode($response);
}

$conn->close();
?>
