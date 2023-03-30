<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <script src="https://kit.fontawesome.com/fa71233e36.js" crossorigin="anonymous"></script>
    <title>Acuarimantima</title>
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
    <div class="row gx-3 gy-2 align-items-center justify-content-between">
        <div class="col-sm-4">
            <h1>Productos</h1>
        </div>
       <div class="col-auto ">
       <input class="form-control me-2 light-table-filter" type="text" placeholder="Nombre" aria-label="Search" data-table="table_id" id="input-buscador" >
       </div>
        <div class="col-auto ">
        <button type="button" class="btn btn-secondary ml-auto" data-bs-toggle='modal' data-bs-target='#staticBackdrop' >AGREGAR PRODUCTO</button>
    </div>
    </div>
</div>

<div class="container table-responsive scroll" style="max-height: 500px;">
<table class="table table-striped table_id" id="tabla">
  <thead>
    <tr>
      <th scope="col"style="width:5%">Cod</th>
      <th scope="col" style="width:50%">Nombre</th>
      <th scope="col" style="width:40%">Valor</th>
      <th scope="col"style="width:5%">Opciones</th>
    </tr>
    </thead>
    <tbody>
    
    </tbody>
    </table>
    </div>
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Producto</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick=limpiar()></button>
                            </div>
                            <div class="modal-body">
                                        <ul class="text align-center" style="list-style: none">
                                        <li class="">
                                        <label for="">Codigo:</label> <br>
                                        <input type="text" placeholder="Asignación automática" id="codigo" disabled>
                                        </li>
                                        <li>
                                        <label for="">Nombre:</label> <br>
                                        <input type="text" placeholder="Ingrese el nombre" id="nombre" required>
                                        </li>
                                        <li>
                                        <label for="">Valor:</label> <br>
                                        <input type="number" placeholder="Ingrese el valor" id="valor"required>
                                        </li>
                                    </ul>  
                            </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick=limpiar() >Cerrar</button>
                                    <button type="button" class="btn btn-primary" onclick=guardar() >Guardar</button>
                                </div>
                    </div>
                </div>
            </div>
            

</body>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.js"></script>
<script src="../productos/pintarProductos.js"></script>
<script src="../productos/buscador.js"></script>
</html>