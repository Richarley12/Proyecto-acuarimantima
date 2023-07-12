<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generador de Gráfico</title>
    <link rel="stylesheet" href="estilo.css">
</head>

<body>
<?php include '../header/header.php'?>


    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div class="col p-4 d-flex flex-column position-static">
                        <h4 style="text-align:center">Ingresos</h2>
                        <div id="piechart" style=" width:100vh ;height:50vh;"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div class="col p-4 d-flex flex-column position-static">
                        <h4 style="text-align:center">Productos vendidos</h2>
                        <div id="piechart_3d" style=" width:100vh ;height:50vh;"></div>
                    </div>
                </div>
            </div> 
        </div>
        <div class="row">
            <div class="col-md-6">
                <table class="table">
                <div id="piechart" ></div>
                </table>
            </div>
            <div class="col-md-6">
                <table class="table">
                <div id="piechart" ></div>
                </table>
            </div>
        </div>
    </div>
    <!-- <div class="row mb-2">
        <div class="col-md-6">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                    <h4 style="text-align:center">Datos semanales</h2>
                    <div id="piechart" style="height:50vh;" ></div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                    <div id="piechart" style="width: 50vh; height:50vh ;" ></div>
                </div>
            </div>
        </div>
    </div>
    <div class="row mb-2">
        <div class="col-md-6">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                    <div id="piechart" style="width:50vh; height: 50vh;" ></div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div class="col p-4 d-flex flex-column position-static">
                    <div id="piechart" style="width: 50vh; height: 50vh;" ></div>
                </div>
            </div>
        </div>
    </div> -->

    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>      
    <script src="script.js"></script>
</body>

</html>