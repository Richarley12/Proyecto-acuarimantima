
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
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <link href="../Turnos/turnos.css" rel="stylesheet"> 
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.css">
    <link rel="stylesheet" href="../chosen_v1.8.7/chosen.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.33/moment-timezone-with-data.min.js"></script>
    
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
      <div class="d-flex justify-content-between align-items-center">
            <h1 class="me-auto" id="titulo">Deudores</h1>
            <h4 class="me-auto" id="deuda"></h4>
            <div>
            <label class="visually-hidden"  for="specificSizeInputName">Nombre</label>
            <select class="form-select form-select-sm" aria-label=".form-select-sm example" onchange=traer_cuentas_pendientes() id="Nombre">
            <option selected>Seleccione un deudor</option>
          </select>
            </div>
        </div>
        <ul class="list-group mb-3">
        <div class="table-responsive rounded-3 resultado scroll">
       
        <table class="table table-striped table-sm" id="tablaDeudores">
          <thead>
            <tr>
              <th scope="col" style= "text-align:center">fecha</th>
              <th scope="col" style= "width:20%; text-align:center">Total</th>
              <th scope="col" style= "width:20%; text-align:center">Pendiente</th>
              <th scope="col" style= "width:30%; text-align:center">Encargado</th>
              <th scope="col" style= "width:10%; text-align:center">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              
            </tr>

          </tbody>
        </table>
      </div>
        </ul>
      
      <!-- Modal -->
      <div class="modal fade modal-xl" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Cuenta</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            <div id="detalle_cuenta">
                            <fieldset>
                            <div class="bg-light border rounded-3 detalle scroll">
                              <table id="detalleCuenta" class="table table-striped table-hover table-fixed table-sm " >
                                <thead>
                                        <tr>
                                        <th scope="col" class="text-center" style="width: 20%">Concepto</th>
                                        <th scope="col" class="text-center" style="width: 8%">Cantidad</th>
                                        <th scope="col" class="text-center"style="width: 12%" >ValorxUn</th>
                                        <th scope="col" class="text-center"style="width: 20%" >Descu $</th>
                                        <th scope="col" class="text-center" style="width: 10%" >Total</th>
                                        <th scope="col" class="text-center" style="width: 12%" >Estado</th>
                                        </tr> 
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                              </div>
                              </fieldset>
                              <fieldset>
                              <div class="bg-light border rounded-3 detalle scroll">
                              <h5>Pagos realizados</h5>
                              <table id="detallePagos" class="table table-striped table-hover table-fixed table-sm " >
                                <thead>
                                        <tr>
                                        <th scope="col" class="text-center" >Fecha</th>
                                        <th scope="col" class="text-center" >Cantidad</th>
                                        <th scope="col" class="text-center" >Metodo</th>
                                        </tr> 
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                              </div>
                              </fieldset>
                              </div>
                              <div id="inputs_Pago">
                              <fieldset >
                      <legend style="font-size:medium; margin-bottom:5px; margin-top:15px;font-weight: bold;">Detalle de pago</legend>
                      <div class="box-body" >
                          <input type="hidden" name="detallesMdp" id="detallesMdp" value="1">
                          <div class="table-responsive">
                              <table class="table table-contrains" id="MediosPago">
                                  <thead>
                                  <tr>
                                      <th class="col-md-2">
                                          <label for="iniciar" class="text-sm">Medio de Pago</label>
                                      </th>

                                      <th class="col-md-2">
                                          <label for="iniciar" class="text-sm">Valor</label>
                                      </th>
                                  </tr>
                                  </thead>
                                  <!-- Fin linea -->
                                  <tbody id="camposMediosPago" class="mediopago-inicial">
                                  <tr id="trMediosPago-1">
                                      <td>
                                      <span class="form-control-label" style="vertical-align:-5px;">Efectivo</span>
                                      </td>
                                      <td>
                                          <input type="number" class="form-control input-sm numeric" style="border-radius: 3px; direction: rtl; caret-color: transparent" id="valor1" autocomplete="off"/>
                                      </td>
                                  </tr>
                                  <tr id="trMediosPago-1">
                                      <td>
                                      <span class="form-control-label" style="vertical-align:-5px;">Transferencia</span>
                                      </td>
                                      <td>
                                          <input type="text" class="form-control input-sm numeric" style="border-radius: 3px; direction: rtl; caret-color: transparent" id="valor2" autocomplete="off" />
                                      </td>
                                  </tr>
                                  
                                  </tbody>
                              </table>
                          </div>
                          <!-- Fin linea -->
                      </div>
                      <div id="alert" class="col-xs-12 text-center" style="margin-top:7px;"></div>
                      <!--Fin de línea-->
                      </fieldset>
                      <fieldset class="col-md-12" style="text-align: center;" >
    <legend style="font-size:medium; margin-bottom:5px; margin-top:15px;font-weight: bold;">Totales</legend>
    <div class="row" style="justify-content: center;">
        <div class="col-md-4 col-md-offset-2 col-xs-6" style="margin-bottom:3px; text-align: center; ">
            <span class="form-control-label" style="vertical-align:-5px;">TOTAL A PAGAR</span>
        </div>
        <div class="col-md-4 col-xs-6" style="margin-bottom:3px;">
            <input class="form-control input-sm numeric"style="text-align: right;font-size: 18px;font-weight: bold;border: 0px;border-radius: 2px;" value="0" id="totalCuenta" readonly>
        </div>
    </div>
    <!--Fin de línea-->
    <div class="row" style="justify-content: center;">
        <div class="col-md-4 col-md-offset-2 col-xs-6" style="margin-bottom:3px;">
            <span class="form-control-label" style="vertical-align:-5px;">TOTAL RECAUDO</span>
        </div>
        <div class="col-md-4 col-xs-6" style="margin-bottom:3px;">
            <input class="form-control input-sm numeric tooltip-warning tooltip-remover" data-placement="right"  data-trigger="manual" id="totalRecaudo" style="text-align:right; font-size:18px; font-weight:bold; border:0px;border-radius: 2px;" value="0" readonly />
        </div>
    </div>
    <!--Fin de línea-->
    <div class="row" style="justify-content: center;">
        <div class="col-md-4 col-md-offset-2 col-xs-6" style="margin-bottom:3px; text-align: center; ">
            <span class="form-control-label" style="vertical-align:-5px;">TOTAL A DEVOLVER</span>
        </div>
        <div class="col-md-4 col-xs-6" style="margin-bottom:3px;">
            <input class="form-control input-sm numeric"style="text-align: right;font-size: 18px;font-weight: bold;border: 0px;border-radius: 2px;" value="0" id="TotalDev" readonly>
        </div>
    </div>
    <div class="row" style="justify-content: center;">
        <div class="col-md-4 col-md-offset-2 col-xs-6" style="margin-bottom:3px; text-align: center; ">
            <span class="form-control-label" style="vertical-align:-5px;">TOTAL PENDIENTE</span>
        </div>
        <div class="col-md-4 col-xs-6" style="margin-bottom:3px;">
            <input class="form-control input-sm numeric"style="text-align: right;font-size: 18px;font-weight: bold;border: 0px;border-radius: 2px;" id="totalPendiente" value="0" readonly>
        </div>
    </div>
</fieldset>

 </div>
 </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cerrar</button>
                                    <button type="button" class="btn btn-primary" id="btn_pagar" >PAGAR</button>
                                </div>
                    </div>
                </div>
            </div>

    </div>
  </main>

  <footer class="my-5 pt-5 text-body-secondary text-center text-small">
    <p class="mb-1">&copy; 2023 Acuarimántima Cafe-Bar</p>
  </footer>
</div>

</body>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.js"></script>
<script src="../deudores/deudores.js" ></script>

</html>