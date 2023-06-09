
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <script src="https://kit.fontawesome.com/fa71233e36.js" crossorigin="anonymous"></script>
    <title>Clientes Acuarimantima café-bar</title>
    <link href="../header/headers.css" rel="stylesheet">
    <link href="../ventas/ventas.css" rel="stylesheet"> 
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="../Turnos/turnos.css" rel="stylesheet"> 
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.css">
    <!-- <link rel="stylesheet" href="../chosen_v1.8.7/docsupport/style.css"> -->
    <!-- <link rel="stylesheet" href="../chosen_v1.8.7/docsupport/prism.css"> -->
    <link rel="stylesheet" href="../chosen_v1.8.7/chosen.css">
    
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
            <h1 class="me-auto">Clientes</h1>
            <div>
                <button class="btn btn-secondary me-2" type="button" onclick="limpiar()" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar Cliente</button>
            </div>
        </div>
        <ul class="list-group mb-3">
        <div class="table-responsive rounded-3">
       
        <table class="table table-striped table-sm" id="tablaClientes">
          <thead>
            <tr>
              <th scope="col" style= "width:2%">#</th>
              <th scope="col">Nombre</th>
              <th scope="col" style= "width:20%; text-align:center">Telefono</th>
              <th scope="col" style= "width:10%; text-align:center">opciones</th>
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
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">Crear cliente</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div style="display:none" class="col-md-6">
                    <input type="text" class="form-control" id="id_cliente"autocomplete="off">
                </div>
                    <form class="row g-3">
                <div class="col-md-6">
                    <label for="inputCity" class="form-label">Nombre Completo</label>
                    <input type="text" class="form-control" id="nombreCompleto"autocomplete="off">
                </div>
                <div class="col-md-6">
                    <label for="inputNumber" class="form-label">Telefono</label>
                    <input type="number" class="form-control" id="telefono"autocomplete="off">
                </div>
                </form>
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
<script src="../chosen_v1.8.7/chosen.jquery.js"></script>
<script src="../clientes/clientes.js"></script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>


</html>