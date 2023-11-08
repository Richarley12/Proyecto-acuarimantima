
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <script src="https://kit.fontawesome.com/fa71233e36.js" crossorigin="anonymous"></script>
    <title>Gastos Acuarimantima café-bar</title>
    <link href="../header/headers.css" rel="stylesheet">
    <link href="../ventas/ventas.css" rel="stylesheet"> 
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="../Turnos/turnos.css" rel="stylesheet"> 
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.css">
    
    <!-- Favicons -->
<link rel="apple-touch-icon" href="/docs/5.3/assets/img/favicons/apple-touch-icon.png" sizes="180x180">
<link rel="mask-icon" href="/docs/5.3/assets/img/favicons/safari-pinned-tab.svg" color="#712cf9">
<meta name="theme-color" content="#712cf9">

</head>
<body class="bg-body-tertiary" >
<?php include '../header/header.php'?>
<div class="container">
  <main>
    
    <div class="row g-5">
      <!-- <div class="col-md-5 col-lg-4 order-md-last"> -->
      <div class="d-flex justify-content-between align-items-center">
            <h1 class="me-auto">Gastos</h1>
            <div>
                <button class="btn btn-secondary me-2" type="button" onclick="limpiar()" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar gasto</button>
            </div>
        </div>
        <ul class="list-group mb-3">
        <div class="table-responsive rounded-3">
       
        <table class="table table-striped table-sm" id="tablaGastos">
          <thead>
            <tr>
              <th scope="col" style= "width:2%">#</th>
              <th scope="col" style= "width:30%; text-align:center">Fecha</th>
              <th scope="col" style= "width:30%; text-align:center">Concepto</th>
              <th scope="col" style= "width:20%; text-align:center">Valor Total</th>
              <th scope="col" style= "width:18%; text-align:center">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              
            </tr>

          </tbody>
        </table>
      </div>
        </ul>
      <!-- </div> -->
      
      <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Detalle gasto</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      
      <table id="tabla1" class="table table-striped table-hover table-fixed table-sm ">
      <thead>
        <tr>
          <th style="padding:10px"  class="text-right" colspan="6" id="Nombre_cliente">Seleccione un concepto</th>
          <th colspan="3" scope="col" style="width: 30%">
      <input placeholder="Concepto" list="sugerencias_conceptos" type="text" class="form-control" id="concepto" autocomplete="off">
      <datalist id="sugerencias_conceptos" style="color:black" >
        <option value="Minorista">Minorista</option>
        <option value="Cerveza">Cerveza</option>
        <option value="Licores">Licores</option>
        <option value="Varios">Varios</option>
      </datalist>
        </tr>
    <tr>
    <th scope="col" class="text-center" style="width: 2%;"></th>
      <th scope="col" style="width: 30%">
      <input placeholder="Producto" list="sugerencias" type="text" class="form-control" id="producto" autocomplete="off">
      <datalist id="sugerencias">
      </datalist>
    </th>
      <th scope="col" class="text-center" style="width: 8%;padding:10px">Cantidad</th>
      <th scope="col" class="text-center"  style="width: 8%">
        <input type="number" class="form-control" style="width: 100%" id="cantidad">
    </th>
      <th scope="col" class="text-center"style="width: 12%; padding:10px" >ValorxUn</th>
      <th scope="col" class="text-center"  style="width: 12%">
        <input type="number" class="form-control" style="width: 100%" id="valorxUn" >
    </th>
      <th scope="col" class="text-center" style="width: 12%; padding:10px" >Total</th>
      
      <th scope="col" class="text-center" style="padding:10px" ><button class="icono" id="btnAdd1"><i class="fa-sharp fa-regular fa-square-plus tamaño"></i></button></th>
    </tr> 
  </thead>
  <tbody>
   
  </tbody>
</table>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" onclick="guardar()">Guardar</button>
      </div>
    </div>
  </div>
</div>
      <fieldset>
      
      <fieldset>
    </div>
  </main>

  <footer class="my-5 pt-5 text-body-secondary text-center text-small">
    <p class="mb-1">&copy; 2023 Acuarimántima Cafe-Bar</p>
  </footer>
</div>

</body>
<script src="../gastos/gastos.js"></script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>


</html>