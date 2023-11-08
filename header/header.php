<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.108.0">
    <title>Acuarimantima</title>
    <link rel="canonical" href="https://getbootstrap.com/docs/5.3/examples/headers/">
    <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

    <style>
    .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  @media (min-width: 768px) {
    .bd-placeholder-img-lg {
      font-size: 3.5rem;
    }
  }

  .b-example-divider {
    height: 3rem;
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
  }

  .b-example-vr {
    flex-shrink: 0;
    width: 1.5rem;
    height: 100vh;
  }

  .bi {
    vertical-align: -.125em;
    fill: currentColor;
  }

  .nav-scroller {
    position: relative;
    z-index: 2;
    height: 2.75rem;
    overflow-y: hidden;
  }

  .nav-scroller .nav {
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
  }
  
  /* Estilo personalizado para hacer el menú visible por encima de otros elementos */
  .navbar-fixed-top {
    position: absolute;
    width: 100%;
    z-index: 9999;
  }
    </style>
    <!-- Custom styles for this template -->
    <link href="../header/headers.css" rel="stylesheet">
<body>
   

<main>
    <header class="py-3 mb-3 border-bottom">
        <div class="container-fluid d-grid gap-3 align-items-center" style="grid-template-columns: 1fr 2fr;">
          <div class="dropdown">
            <a href="#" class="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none dropdown-toggle" onclick="permisos()" data-bs-toggle="dropdown"  aria-expanded="false">
              <img src="../menu_prinicpal.png" alt="mdo" width="55" height="40">
            </a>
            <ul class="dropdown-menu text-small shadow header-container" style="position: absolute; z-index: 9999;">
              <li><a class="dropdown-item" href="../Turnos/turnos.php">Turnos</a></li>
              <li><a class="dropdown-item" href="../ventas/ventas.php">Ventas</a></li>
              <li><a class="dropdown-item"  href="../ventas_cerradas/ventas_cerradas.php">Ventas cerradas</a></li>
              <li><a class="dropdown-item" href="../clientes/clientes.php">Clientes</a></li>
              <li><a class="dropdown-item" href="../deudores/deudores.php">Deudores</a></li>
              <li><a class="dropdown-item" href="../productos/productos.php">Productos</a></li>
              <div id="administrativo">
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item" href="../Pagos/pagos.php">Pagos</a></li>
              <li><a class="dropdown-item" href="../gastos/gastos.php">Gastos</a></li>
              <li><a class="dropdown-item" href="../construccion/construccion.php">Reportes</a></li>
              <li><a class="dropdown-item" href="../usuarios/usuarios.php">Usuarios</a></li>
              <li><a class="dropdown-item" href="../inventario/inventario.php">Inventario</a></li>
              <li><a class="dropdown-item" href="../construccion/construccion.php">Total Ventas</a></li>
              <li><a class="dropdown-item" href="../construccion/construccion.php">Nómina</a></li>
              <li><a class="dropdown-item" href="../construccion/construccion.php">Dashboard</a></li>
              </div>          
            </ul>
          </div>
          <div class="d-flex align-items-center">
            <form class="w-100 me-3" role="search">  
            </form>
            <div class="flex-shrink-0 dropdown">
              <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="../lovepik-mens-icon-png-image_401552890_wh1200.png" alt="mdo" width="32" height="32" class="rounded-circle">
              </a>
              <ul class="dropdown-menu text-small shadow">
                <li class="dropdown-item" id="nombre_usuario"></li>
                <!-- <li><a class="dropdown-item" href="#">Settings</a></li>
                <li><a class="dropdown-item" href="#">Profile</a></li> -->
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="../index.html">Desconectarse</a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </main>
</body>

<script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
<script src="../header/header.js"></script>
<?php  ?>

</html>