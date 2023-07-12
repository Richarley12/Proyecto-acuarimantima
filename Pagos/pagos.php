<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <script src="https://kit.fontawesome.com/fa71233e36.js" crossorigin="anonymous"></script>
    <title>Pagos Acuarimantima café-bar</title>
    <link href="../header/headers.css" rel="stylesheet">
    <link href="../ventas/ventas.css" rel="stylesheet"> 
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <link href="../productos/producto.css" rel="stylesheet"> 
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.css">
</head>
<body>


<?php include '../header/header.php'?>    
<div class="container">
    <div class="row align-items-center">
        <div class="col-sm-4">
            <h1>Pagos</h1>
        </div>
        <div class='row'>
    <div class="col-md-3 position-relative">
        <label for="validationTooltip03" class="form-label">Buscar</label>
        <input class="form-control me-2 light-table-filter" type="text" placeholder="" aria-label="Search" data-table="table_id" id="input-buscador">
    </div>
    <div class="col-md-3 position-relative">
        <label for="inputState" class="form-label">Método pago</label>
        <select class="form-select" id="m_Pago">
            <option default=""></option>
            <option>Efectivo</option>
            <option>Transferencia</option>
        </select>
    </div>
    <div class="col-md-2 position-relative">
        <label for="validationTooltip05" class="form-label">Fecha inicio</label>
        <input type="date" class="form-control" id="fechaInicio" name="trip-start">
    </div>
    <div class="col-md-2 position-relative">
        <label for="validationTooltip05" class="form-label">Fecha Fin</label>
        <input type="date" class="form-control" id="fechaFin" name="trip-start">
    </div>
    <div class="col d-flex justify-content-center align-items-center my-2">
        <label for=""></label>
        <button type="button" class="btn btn-dark" onclick="filtrar()">Filtrar</button>
    </div>
    
    <div class="col d-flex justify-content-center align-items-center my-2">
        <label for=""></label>
        <button type="button" class="btn btn-success" onclick="limpiar()" >Limpiar</button>
    </div>
</div>
<hr style="border: none; border-top: 1px solid transparent;">        

<div class="container table-responsive resultado scroll" style="max-height: 500px;">
<table class="table table-striped table_id" id="tabla">
  <thead>
    <tr>
      <th scope="col"style="width:20%">Fecha</th>
      <th scope="col" style="width:20%">Cliente</th>
      <th scope="col" style="width:15%">Total pagado</th>
      <th scope="col" style="width:20%">Encargado</th>
      <th scope="col" style="width:20%">Método pago</th>
      <!-- <th scope="col"style="width:5%">Opciones</th> -->
    </tr>
    </thead>
    <tbody>
    
    </tbody>
    </table>
    </div>
</body>
<footer class="my-5 pt-5 text-body-secondary text-center text-small">
    <p class="mb-1">&copy; 2023 Acuarimántima Cafe-Bar</p>
  </footer>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.js"></script>
<script src="pagos.js"></script>
<script src="../productos/buscador.js"></script>
</html>