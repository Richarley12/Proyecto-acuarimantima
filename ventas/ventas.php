<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <link rel="stylesheet" href="./ventas.css">
     <script src="https://kit.fontawesome.com/fa71233e36.js" crossorigin="anonymous"></script>
     <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
     <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.33/moment-timezone-with-data.min.js"></script>
    <title>Acuarimantima</title>
</head>
<body>
<?php include '../header/header.php'?>

<div class="container">
<form class="row gx-3 gy-2 align-items-center">
  <div class="col-sm-3">
    <label class="visually-hidden" for="specificSizeInputName">Nombre</label>
    <input list="lista_clientes" id="Nombre" type="text" class="form-control" placeholder="Nombre" autocomplete="off">
    <datalist id="lista_clientes">
      </datalist>

  </div>
  <!-- <div class="col-sm-3">
    <label class="visually-hidden" for="specificSizeInputName">Teléfono</label>
    <input type="number" class="form-control" id="specificSizeInputName" placeholder="Teléfono">
  </div> -->
  <!-- <div class="col-auto">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="autoSizingCheck2">
      <label class="form-check-label" for="autoSizingCheck2">
       Guardar
      </label>
    </div>
  </div> -->
  <div class="col-auto">
    <button type="button" class="btn btn-dark" id="btnagregarMesa">AGREGAR MESA</button>
  </div>
  <!-- <div class="col-auto">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#gastoModal" onclick='limpiargastos()' >AGREGAR GASTO</button>
  </div> -->
</form>
</div>
<br>

<div class="container">
    <div class="container pb-3 resultado" >
      <div class="d-grid gap-3" style="grid-template-columns: 1fr 2fr;">
        <div class="bg-light  rounded-3 resultado container scroll" >
             
                <table id="cuentas" class="table table-striped table-hover table-sm table_id">
                <thead class="sticky-top">
                  <tr>
                    <th colspan="4">
                <div class="container  input-group">
                <span class="input-group-text" id="inputGroup-sizing-default">Mesas activas</span>
                 <!-- el buscador de las mesas activas está ligado al script del final -->
                <input type="text" class="form-control light-table-filter" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" type="search" placeholder="Nombre">
              </div> 
              </th>       
              </tr>
                            <tr>
                              <th scope="col" style="width:30%">Nombre</th>
                              <th scope="col" class="text-center" style="width:20%">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
              </table>
          </div>
      <div class="bg-light border rounded-3 resultado scroll">
      <table id="tabla1" class="table table-striped table-hover table-fixed table-sm ">
      <thead>
        <tr>
          <th colspan="2" id="Nombre_cliente">Seleccione un cliente</th>
          <th colspan="1">Total:</th>
          <th colspan="2"id="Total_cuenta"></th>
          <th colspan="2">Pendiente:</th>
          <th colspan="2" id="saldo_Pendiente"></th>
        </tr>
    <tr>
      <th style= "display:none"><label id="idCliente"></label></th>
      <th scope="col" style="width: 30%">
      <input disabled="true"  placeholder="Concepto" list="sugerencias" type="text" class="form-control concepto" id="concepto" autocomplete="off">
      <datalist id="sugerencias">
      </datalist>
    </th>
      <th scope="col" class="text-center"><button class="icono" id="btnAdd1"><i class="fa-sharp fa-regular fa-square-plus tamaño"></i></button></th>
      <th scope="col" class="text-center" style="width: 8%">Cantidad</th>
      <th scope="col" class="text-center"style="width: 12%" >ValorxUn</th>
      <th scope="col" class="text-center"style="width: 20%" >Descu $</th>
      <th scope="col" class="text-center" style="width: 10%" >Descue%  </th>
      <th scope="col" class="text-center" style="width: 12%" >Total</th>
      <th scope="col" class="text-right"style="width: 20%">Opciones</th>
    </tr> 
  </thead>
  <tbody>
   
  </tbody>
</table>
</div>
  </div>
  </div>
  </div>
 <br>
<!-- 
  <div class=" container ">
    <div class="container pb-3 resultado">
      <div class="d-grid gap-3" style="grid-template-columns: 1fr 2fr;">
      <div class="bg-light  rounded-3 resultado container scroll" >
             
             <table id="cuentasPagadas" class="table table-striped table-hover table-fixed table-sm">
             <thead class="sticky-top">
               <tr>
                 <th colspan="4">
             <div class="container  input-group">
             <span class="input-group-text" id="inputGroup-sizing-default">Mesas pagadas</span>
           </div> 
           </th>       
           </tr>
                         <tr>
                           <th scope="col" style="width:30%">Nombre</th>
                         </tr>
                     </thead>
                     <tbody>
                     
                     </tbody>
           </table>
       </div>
      <div class="bg-light border rounded-3 resultado scroll" >
      <table class="table table-striped table-hover table-fixed table-sm" id="tabla2">
      <thead>
      <tr>
          <th colspan="3" id="Nombre_clienteP">Seleccione un cliente</th>
          <th colspan="1">Total:</th>
          <th colspan="2"id="Total_cuentaP"></th>
    <tr>
      <th scope="col" style="width: 40%">Concepto</th>
      <th scope="col" class="text-center" style="width: 8%">Cantidad</th>
      <th scope="col" class="text-center"style="width: 12%" >ValorxUn</th>
      <th scope="col" class="text-center"style="width: 10%" >Desc $</th>
      <th scope="col" class="text-center" style="width: 10%" >Desc %</th>
      <th scope="col" class="text-center" style="width: 12%" >Total</th>
    </tr>
  </thead>
  <tbody>
   

  </tbody>
  
</table>
</div>
      </div>
    </div>
  </div>
  </div> -->
<!-- Modal -->

<div class="modal fade modal-xl" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Cuenta</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                            <fieldset>
                            <div class="bg-light border rounded-3 detalle scroll" id="divtabla">
                              <table id="detalleCuenta" class="table table-striped table-hover table-fixed table-sm " >
                              <thead>
                        <tr>
                          <th style= "width:2%"><button class="icono"><i class="fa-solid fa-check-double"></i></button></th>
                          <th scope="col" class="text-center" style="width: 20%">Concepto</th>
                          <th scope="col" class="text-center" style="width: 8%">Cantidad</th>
                          <th scope="col" class="text-center"style="width: 12%" >ValorxUn</th>
                          <th scope="col" class="text-center"style="width: 20%" >Descu $</th>
                          <th scope="col" class="text-center" style="width: 10%" >Descue%  </th>
                          <th scope="col" class="text-center" style="width: 12%" >Total</th>
                        </tr> 
                      </thead>
                          <tbody>
                          </tbody>
                        </table>
                              </div>
                              <fieldset>
                      <legend style="font-size:medium; margin-bottom:5px; margin-top:15px;font-weight: bold;">Detalle de pago</legend>
                      <div class="box-body">
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
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cerrar</button>
                                    <button type="button" class="btn btn-primary" onclick=Pago() >PAGAR</button>
                                </div>
                    </div>
                </div>
            </div>
            

<!-- Modal -->
<!-- <div class="modal fade" id="gastoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="gastoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="gastoModalLabel">Registrar gasto</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form class="form-inline">
          <div class="row g-3">
            <div class="col-md-6">
              <label for="inputCity" class="form-label">Nombre gasto</label>
              <input type="text" class="form-control" id="nombreGasto" autocomplete="off">
            </div>
            <div class="col-md-3">
              <label for="inputNumber" class="form-label">Valor</label>
              <input type="number" class="form-control" id="valor" autocomplete="off">
            </div>
            <div class="col-md-3">
            <label for="inputState" class="form-label">Método</label>
                    <select class="form-select" id="metodo_pago">
                    <option>Efectivo</option>
                    <option>Transferencia</option>
                    </select>
            </div>
          </div>
        </form>
                <form class="row g-3">
                <div class="mb-3">
            <label for="message-text" class="col-form-label">Observaciones:</label>
            <textarea class="form-control" id="observacion_gasto" ></textarea>
          </div>
          </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button type="button" class="btn btn-primary" onclick='agregar_Gasto()' >Guardar</button>
      </div>
    </div>
  </div>
</div> -->

  <script src="./ventas1.js"></script>
  <!-- el buscador de las mesas activas está ligado en este script -->
  <script src="../productos/buscador.js"></script>
</body>
<footer class="my-5 pt-5 text-body-secondary text-center text-small">
    <p class="mb-1">&copy; 2023 Acuarimántima Cafe-Bar</p>
  </footer>
</html>