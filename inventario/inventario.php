<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <script src="https://kit.fontawesome.com/fa71233e36.js" crossorigin="anonymous"></script>
    <title>Inventario Acuarimantima café-bar</title>
    <link href="../header/headers.css" rel="stylesheet">
    <link href="../ventas/ventas.css" rel="stylesheet"> 
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <link href="../productos/producto.css" rel="stylesheet"> 
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.5/css/jquery.dataTables.css" />
    <script src="https://cdn.datatables.net/1.13.5/js/jquery.dataTables.js"></script>
</head>
<body>


<?php include '../header/header.php'?>    
<div class="container">
    <div class="row align-items-center">
        <div class="col-sm-4">
            <h1>Inventario</h1>
        </div>
        <div class="col">
            <div class="input-group">
                <input class="form-control me-2 light-table-filter" type="text" placeholder="Buscar" aria-label="Search" data-table="table_id" id="input-buscador">
            </div>
        </div>
    <div class="row">
        <div class="col">
        <button type="button" class="btn btn-primary" data-bs-toggle='modal' data-bs-target='#staticBackdrop' onclick=salidas() >Salidas</button>
        </div>
        <div class="col">
    <button type="button" class="btn btn-secondary">Entradas</button>
    </div>
    <div class="col">
    <button type="button" class="btn btn-dark">Existencias</button>
    </div>
    </div>
       
    </div>
</div>

<div class="container table-responsive scroll" style="max-height: 500px;">
<table class="table table-striped table_id" id="tabla" style="display:none">
  <thead>
    <tr>
      <th scope="col" style="width:50%; text-align:center">Fecha</th>
      <th scope="col" style="width:40%">Nombre</th>
      <th scope="col"style="width:10%; text-align:center">Cantidad</th>
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
                                <h1 class="modal-title fs-5" id="titulo"></h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick=limpiar()></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                <div class="col-md-4 position-relative">
                                <label for="validationTooltip05" class="form-label">Fecha inicio</label>
                                    <input type="date" class="form-control" id="fechaInicio" name="trip-start">
                                </div>
                                    <div class="col-md-4 position-relative">
                                        <label for="validationTooltip05" class="form-label">Fecha Fin</label>
                                        <input type="date" class="form-control" id="fechaFin" name="trip-start">
                                    </div>
                                    <div class="col-md-4 position-relative">
                                    <div class="form-check form-switch">
                                        <br>
                                        <label class="form-check-label" for="flexSwitchCheckDefault">Traer todas las salidas</label>
                                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                                        </div>
                                        </div>
                                </div>
                                        
                            </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick=limpiar() >Cerrar</button>
                                    <button type="button" class="btn btn-primary" onclick=pintar()>Consultar</button>
                                </div>
                    </div>
                </div>
            </div>
            

</body>
<footer class="my-5 pt-5 text-body-secondary text-center text-small">
    <p class="mb-1">&copy; 2023 Acuarimántima Cafe-Bar</p>
  </footer>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.js"></script>
<script src="../inventario/inventario.js"></script>
<script src="../productos/buscador.js"></script>
</html>