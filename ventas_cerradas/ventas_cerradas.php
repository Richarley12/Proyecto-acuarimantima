<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <link rel="stylesheet" href="../ventas/ventas.css">
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
  <div class="row">
    <div class="col-lg-4 resultado">
      <div class="pb-3">
        <div class="bg-light rounded-3 container resultado scroll">
          <table id="cuentasPagadas" class="table table-striped table-hover table-fixed table-sm">
            <thead class="sticky-top">
              <tr>
                <th colspan="4">
                  <div class="container input-group">
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
      </div>
    </div>

    <div class="col-lg-8 resultado">
      <div class="row">
        <div class="col ventascerradas">
          <div class="bg-light border rounded-3 ventascerradas scroll">
            <div class="seccion-1">
              <table class="table table-striped table-hover table-fixed table-sm" id="tabla2">
                <thead>
                  <tr>
                    <th colspan="3" id="Nombre_clienteP">Seleccione un cliente</th>
                    <th colspan="1">Total:</th>
                    <th colspan="2"id="Total_cuentaP"></th>
                  </tr>
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
      <div class="row ">
        <div class="col ventascerradas">
          <div class="bg-light border rounded-3 ventascerradas scroll">
            <div class="seccion-2">
              <h5>Pagos realizados</h5>
              <table id="detallePagos" class="table table-striped table-hover table-fixed table-sm">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  
  <script src="../ventas_cerradas/ventas_cerradas.js"></script>
</body>
<footer class="my-5 pt-5 text-body-secondary text-center text-small">
    <p class="mb-1">&copy; 2023 Acuarimántima Cafe-Bar</p>
  </footer>
</html>