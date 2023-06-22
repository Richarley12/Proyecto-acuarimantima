
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <script src="https://kit.fontawesome.com/fa71233e36.js" crossorigin="anonymous"></script>
    <title>Usuarios Acuarimantima café-bar</title>
    <link href="../header/headers.css" rel="stylesheet">
    <link href="../ventas/ventas.css" rel="stylesheet"> 
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <link href="../Turnos/turnos.css" rel="stylesheet"> 
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.css">
    <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/checkout/">

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
            <h1 class="me-auto">Usuarios</h1>
            <div>
                <button class="btn btn-secondary me-2" type="button" onclick="limpiar()" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar usuario</button>
            </div>
        </div>
        <ul class="list-group mb-3">
        <div class="table-responsive rounded-3 resultado scroll">
        <table class="table table-striped table-sm" id="tablaClientes">
          <thead>
            <tr>
              <th scope="col" style= "width:2%">#</th>
              <th scope="col">Nombre</th>
              <th scope="col" style= "width:20%; text-align:center">Usuario</th>
              <th scope="col" style= "width:20%; text-align:center">Rol</th>
              <th scope="col" style= "width:10%; text-align:center"></th>
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
        <h1 class="modal-title fs-5">Crear usuario</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
                    <form class="row g-3">
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">Usuario</label>
                    <input type="text" class="form-control" id="usuarioNuevo" autocomplete="none"> 
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Password</label>
                    <input type="password" class="form-control" id="passwordNuevo"autocomplete="off">
                </div>
                <div class="col-md-6">
                    <label for="inputCity" class="form-label">Nombre Completo</label>
                    <input type="text" class="form-control" id="nombreCompleto"autocomplete="off">
                </div>
                <div class="col-md-4">
                    <label for="inputState" class="form-label">Rol</label>
                    <select class="form-select" id="rol">
                    <option >admon</option>
                    <option>user</option>
                    </select>
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
<script src="../usuarios/usuarios.js"></script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.js"></script>


</html>