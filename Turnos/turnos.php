<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <script src="https://kit.fontawesome.com/fa71233e36.js" crossorigin="anonymous"></script>
    <title>Turnos Acuarimantima café-bar</title>
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
    <div class="py-5 text-center">
      <h2>Turnos</h2>
    </div>
    <div class="row g-5">
      <!-- <div class="col-md-5 col-lg-4 order-md-last"> -->
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-primary">Abre tu turno</span>
          <button class="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" type="button" id="boton_modal"  onclick=abrir_cerrar() >
      </button>
        </h4>
        <ul class="list-group mb-3">
        <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Inicio en caja</h6>
            </div>
            <span class="text-body-secondary" id="inicio_en_caja"></span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Ventas Efectivo</h6>
            </div>
            <span class="text-body-secondary" id="ventas_efectivo"></span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Ventas transferencia</h6>
            </div>
            <span class="text-body-secondary" id="ventas_transferencia"></span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Compras Efectivo</h6>
            </div>
            <span class="text-body-secondary">En desarrollo</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Compras Tranferencia</h6>
            </div>
            <span class="text-body-secondary">En desarrollo</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total</span>
            <strong id="total">$0</strong>
          </li>
        </ul>
      <!-- </div> -->
      <h2>Turnos anteriores</h2>
      <fieldset>
      <div class="table-responsive rounded-3 resultado scroll">
        <table class="table table-striped table-sm" id="tablaTurnos">
          <thead>
            <tr>
              <th scope="col" style= "width:2%">#</th>
              <th scope="col">Encargado</th>
              <th scope="col" style= "width:10%; text-align:center">T. ventas</th>
              <th scope="col" style= "width:10%; text-align:center">T. compras</th>
              <th scope="col" style= "width:10%; text-align:center">I. caja</th>
              <th scope="col" style= "width:20%; text-align:center">fecha inicio</th>
              <th scope="col" style= "width:20%; text-align:center">fecha fin</th>
              <th scope="col" style= "width:10%; text-align:center">Total</th>
              <th scope="col" style= "width:2%; text-align:center"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              
            </tr>

          </tbody>
        </table>
      </div>
      <fieldset>
    </div>
  </main>

  <footer class="my-5 pt-5 text-body-secondary text-center text-small">
    <p class="mb-1">&copy; 2023 Acuarimántima Cafe-Bar</p>
  </footer>
</div>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="titulo"></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="apertura" style="display:none">
        <div class="row">
              <div class="col">
              <label for="recipient-name" class="col-form-label">Efectivo en caja:</label>
              </div>
              <div class="col">
                <input type="number" class="form-control input-sm numeric" style="direction: rtl; caret-color: transparent" id="efectivo_en_caja">
              </div>
            </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Observaciones:</label>
            <textarea class="form-control" id="observacion_apertura" ></textarea>
          </div>
        </form>
        <form id="cierre" style="display:none">
        <div class="row">
              <div class="col">
              <label for="recipient-name" class="col-form-label" >Efectivo previsto:</label>
              </div>
              <div class="col"  style="text-align:right">
              <span class="text-body-secondary" id="efectivo_previsto">$0</span>
              </div>
            </div>
            <span class="text-body-secondary"></span>
            <div class="row">
              <div class="col">
              <label for="recipient-name" class="col-form-label">Efectivo en caja:</label>
              </div>
              <div class="col">
                <input type="number" class="form-control input-sm numeric" style="direction: rtl; caret-color: transparent" id="previsto">
              </div>
            </div>
            <div class="mb-3">
            <label for="message-text" class="col-form-label">Observaciones:</label>
            <textarea class="form-control" id="observaciones_cierre"></textarea>
          </div>
        </form>
        <form id="resumen_turno" style="display:">
        <div class="row">
              <div class="col">
              <label for="recipient-name" class="col-form-label" >Encargado:</label>
              </div>
              <div class="col"  style="text-align:right">
              <span class="text-body-secondary" id="t_Encargado" ></span>
              </div>
            </div>
            <div class="row">
              <div class="col">
              <label for="recipient-name" class="col-form-label">Efectivo inicial:</label>
              </div>
              <div class="col"  style="text-align:right">
              <span class="text-body-secondary" id="efectivo_inicial" ></span>
              </div>
            </div>
            <div class="row">
              <div class="col">
              <label for="recipient-name" class="col-form-label" >Efectivo ventas:</label>
              </div>
              <div class="col"  style="text-align:right">
              <span class="text-body-secondary" id="t_Efectivoventas" ></span>
              </div>
            </div>
            <div class="row">
              <div class="col">
              <label for="recipient-name" class="col-form-label" >Efectivo cierre:</label>
              </div>
              <div class="col"  style="text-align:right">
              <span class="text-body-secondary" id="t_Efectivocierre" ></span>
              </div>
            </div>
            <div class="row">
              <div class="col">
              <label for="recipient-name" class="col-form-label">Transferencia ventas:</label>
              </div>
              <div class="col"  style="text-align:right">
              <span class="text-body-secondary" id="t_transferenciaventas" ></span>
              </div>
            </div>
            <div class="row">
              <div class="col">
              <label for="recipient-name" class="col-form-label">fecha inicio:</label>
              </div>
              <div class="col"  style="text-align:right">
              <span class="text-body-secondary" id="f_inicio"></span>
              </div>
            </div>
            <div class="row">
              <div class="col">
              <label for="recipient-name" class="col-form-label">Fecha fin:</label>
              </div>
              <div class="col"  style="text-align:right">
              <span class="text-body-secondary" id="f_fin"></span>
              </div>
            </div>
            <div class="mb-3">
            <label for="message-text" class="col-form-label">Observaciones apertura:</label>
            <textarea readonly="readonly" class="form-control" id="tobs_apertura"></textarea>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Observaciones cierre:</label>
            <textarea readonly="readonly" class="form-control" id="tobs_cierre"></textarea>
          </div>
      </form>
      </div>
     

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cerrar</button>
        <button type="button" class="btn btn-primary" id="guardar" onclick="ejecutar_turno()">Guardar</button>
      </div>
    </div>
  </div>
</div>
</body>
      <script src= "../Turnos/turnos.js"></script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.js"></script>

</html>