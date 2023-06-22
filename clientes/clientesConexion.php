<?php

include_once "../session.php";
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD']=='POST') {

    $accion= isset($_POST['accion'])?$_POST['accion']:'';

    if ($accion=='guardar_Cliente') {
        $nombre=$_POST['nombre'];
        $telefono=$_POST['telefono'];
        $sql="INSERT INTO clientes (nombre_cliente,telefono) VALUES ('$nombre','$telefono')";
        if (mysqli_query($conn,$sql)) {
            $response=array(
                'mensaje'=>'Cliente guardado');
        }else {
            $response=array(
            'mensaje'=> 'Error al guardar');
        }
        echo json_encode($response);
    } elseif ($accion=='traer_clientes') {
        $sql="SELECT * FROM clientes WHERE eliminado =0";
        $resultado = $conn->query($sql);
        if ($resultado->num_rows > 0) {
            $response=array();
            while ($row = $resultado->fetch_assoc()) {
                $response[] = $row;
            }
        } else {
            $response=array(
                'mensaje'=> 'Error al consultar');
        }
        echo json_encode($response);
    }elseif ($accion=="eliminar_cliente") {
        $id_cliente = $_POST['id_cliente'];
        $sql = "UPDATE clientes SET eliminado = 1 WHERE id_cliente = $id_cliente";
        if (mysqli_query($conn, $sql)) {   
            $response = array(
                'mensaje' => 'Cliente eliminado');
            }else { 
               $response = array(
                'mensaje' => 'Error al eliminar'); 
              }
              echo json_encode($response);
    }elseif ($accion=="editar_cliente") {
        $id_cliente = $_POST['id_cliente'];
        $nombre=$_POST['nombre'];
        $telefono=$_POST['telefono'];
        $sql = "UPDATE clientes SET nombre_cliente='$nombre', telefono=$telefono WHERE id_cliente =$id_cliente ";
        if (mysqli_query($conn, $sql)){
            $response = array('mensaje' =>'Datos actualizados correctamente','datos'=>$nombre.' '.$telefono,'id_cliente'=>$id_cliente );}
            else{$response = array(
                'mensaje' => 'Error al editar'); 
              } echo json_encode($response);
    }

}
$conn->close();

?>