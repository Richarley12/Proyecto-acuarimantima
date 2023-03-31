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

    <title>Acuarimantima</title>
</head>
<body>
<?php include '../header/header.php'?>

<div class="container">
<form class="row gx-3 gy-2 align-items-center">
  <div class="col-sm-3">
    <label class="visually-hidden" for="specificSizeInputName">Nombre</label>
    <input id="Nombre" type="text" class="form-control" placeholder="Nombre">
  </div>
  <div class="col-sm-3">
    <label class="visually-hidden" for="specificSizeInputName">Teléfono</label>
    <input type="number" class="form-control" id="specificSizeInputName" placeholder="Teléfono">
  </div>
  <div class="col-auto">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="autoSizingCheck2">
      <label class="form-check-label" for="autoSizingCheck2">
       Guardar
      </label>
    </div>
  </div>
  <div class="col-auto">
    <button type="button" class="btn btn-secondary" id="btnagregarMesa">AGREGAR MESA</button>
  </div>
</form>
</div>
<br>

<div class="container">
    <div class="container pb-3 resultado" >
      <div class="d-grid gap-3" style="grid-template-columns: 1fr 2fr;">
        <div class="bg-light  rounded-3 resultado container scroll" >
             
                <table id="cuentas" class="table table-striped table-hover table-fixed table-sm">
                <thead class="sticky-top">
                  <tr>
                    <th colspan="4">
                <div class="container  input-group">
                <form class="form-inline  input-group" role="search">
                <a class="navbar-brand">Mesas activas </a>
                <input class="form-control me-2" type="search" placeholder="Nombre" aria-label="Search">
                <button type="button" class="btn btn-dark" id="btnbuscar" >Buscar</button>
                </form>
              </div> 
              </th>       
              </tr>
                          <tr>
                            <th scope="col" style="width:30%">Nombre</th>
                            <!--<th scope="col" class="text-center" style="width:20%">Total</th>
                            <th scope="col" class="text-center" style="width:20%">Pendiente</th>-->
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
      <th scope="col" class="text-center" style="width: 8%">Cantidad</th>
      <th scope="col" class="text-center"style="width: 12%" >ValorxUn</th>
      <th scope="col" class="text-center"style="width: 20%" >Descu $</th>
      <th scope="col" class="text-center" style="width: 10%" >Descue%  </th>
      <th scope="col" class="text-center" style="width: 12%" >Total</th>
      <th scope="col" class="text-center"style="width: 20%">Opciones</th>
      <th scope="col" class="text-center" style="width: 8%"><button class="icono" id="btnAdd1"><i class="fa-sharp fa-regular fa-square-plus tamaño"></i></button></th>
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

  <div class=" container ">
    <div class="container pb-3 resultado">
      <div class="d-grid gap-3" style="grid-template-columns: 1fr 2fr;">
        <div class="bg-light border rounded-3">
          <div class="container">
            <nav class="navbar bg-body-tertiary">
              <div class="container  input-group">
                <form class="form-inline  input-group" role="search">
                <a class="navbar-brand">Mesas pagadas</a>
                <input class="form-control me-2" type="search" placeholder="Nombre" aria-label="Search">
                <button type="button" class="btn btn-dark">Buscar</button>
                </form>
              </div>
            </nav>
          </div>
        </div>
      <div class="bg-light border rounded-3 resultado scroll" >
      <table class="table table-striped table-hover table-fixed table-sm">
      <thead>
    <tr>
      <th scope="col" style="width: 40%">Concepto</th>
      <th scope="col" class="text-center" style="width: 8%">Cantidad</th>
      <th scope="col" class="text-center"style="width: 12%" >ValorxUn</th>
      <th scope="col" class="text-center"style="width: 10%" >Desc $</th>
      <th scope="col" class="text-center" style="width: 10%" >Desc %</th>
      <th scope="col" class="text-center" style="width: 12%" >Total</th>
      <th scope="col" class="text-center"style="width: 20%">Opciones</th>
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


  <script src="./ventas1.js"></script>

</body>
</html>