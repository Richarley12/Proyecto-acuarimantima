<?php
require_once "../session.php";
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los parámetros de la solicitud
    $fecha_inicio = isset($_POST['fecha_inicio']) ? $_POST['fecha_inicio'] : '';

    // Consulta para obtener los datos de pagos
    $sqlPagos = "SELECT pago_efectivo, pago_transferencia, devuelta FROM pagos WHERE fecha >= '$fecha_inicio'";
    $resultadoPagos = mysqli_query($conn, $sqlPagos);

    // Consulta para obtener los datos de egresos
    $sqlEgresos = "SELECT valor, metodo_pago FROM egresos WHERE fecha >= '$fecha_inicio' AND eliminado = 0";
    $resultadoEgresos = mysqli_query($conn, $sqlEgresos);

    // Verificar si las consultas fueron exitosas
    if ($resultadoPagos && $resultadoEgresos) {
        // Crear arreglos para almacenar los datos de pagos y egresos
        $datosPagos = array();
        $datosEgresos = array();

        // Obtener los datos de pagos
        while ($rowPagos = mysqli_fetch_assoc($resultadoPagos)) {
            $datosPagos[] = $rowPagos;
        }

        // Obtener los datos de egresos
        while ($rowEgresos = mysqli_fetch_assoc($resultadoEgresos)) {
            $datosEgresos[] = $rowEgresos;
        }

        // Combinar los datos de pagos y egresos en un arreglo
        $datosCombinados = array(
            'pagos' => $datosPagos,
            'egresos' => $datosEgresos
        );

        // Devolver los datos combinados como respuesta JSON
        echo json_encode($datosCombinados);
    } else {
        // Error en las consultas
        echo json_encode(array('mensaje' => 'Error en la consulta'));
    }
} else {
    // Método de solicitud incorrecto
    echo json_encode(array('mensaje' => 'Método de solicitud incorrecto'));
}

// Cerrar la conexión
$conn->close();
?>
