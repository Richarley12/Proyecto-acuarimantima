function pintarProductos(id) {
    document.getElementById("tabla1").getElementsByTagName('tbody')[0].innerHTML = "";//limpia la tabla antes de traer los datos
    let id=document.getElementById("idCliente").textContent
    traerProductos(id)
    .then((cuentas) =>{
        if(cuentas.length===0){
          document.getElementById("tabla1").getElementsByTagName('tbody')[0].innerHTML="<tr><td colspan='9' style='text-align:center;'>Agregue un producto</td></tr>";
        } else{
        let cTotal=0;
        let cPagado=0;
        cuentas.forEach(cuenta => {
          let total= (cuenta.valor*cuenta.cantidad)-cuenta.descuento_valor;
           if (cuenta.eliminado === "0") {
            var row = "<tr><td>" + cuenta.nombre_producto + "</td>"+"<td></td><td style='text-align:center'>";
            if (cuenta.pagado === "0") {
              row += "<button onclick='suma(" + 1 + ", " + JSON.stringify(cuenta)+")' type='button' class='sum_rest'><i class='fa-solid fa-plus fa-1xs'></i></button>  " + cuenta.cantidad + "   <button onclick='resta(" + 1 + "," + JSON.stringify(cuenta)+")' type='button' class='sum_rest'><i class='fa-solid fa-minus'></i></button>";
            } else {
              row += cuenta.cantidad;
            }
            row += "</td><td style='text-align:center'>" + formatoMoneda(cuenta.valor) +"</td><td style='text-align:center'>"+ formatoMoneda(cuenta.descuento_valor) +"</td><td style='text-align:center'>";
            if (cuenta.pagado === "0") {
              row += "<button onclick='suma(" + 0 + "," + JSON.stringify(cuenta)+")' type='button' class='sum_rest'><i class='fa-solid fa-plus fa-1xs'></i></button>  " + cuenta.descuento_porc + "   <button onclick='resta(" + 0 + "," + JSON.stringify(cuenta)+")' type='button' class='sum_rest'><i class='fa-solid fa-minus'></i></button>";
            } else {
              row += cuenta.descuento_porc;
            }
            row += "</td><td style='text-align:center'>"+ formatoMoneda(total) +"</td>";
            if (cuenta.pagado === "0") {
              row += "<td style='text-align:center'><button onclick='modalPagocuentaTotal("+2+"," + JSON.stringify(cuenta)+")' type='button' data-bs-toggle='modal' data-bs-target='#staticBackdrop' class='icono'><i class='fa-solid fa-money-bill'></i></button> <button type='button' class='icono'><i class='fa-solid fa-trash'></i></button></td></tr>";
            } else {
              row += "<td>PAGADO</td></tr>";
            }
                document.getElementById("tabla1").getElementsByTagName('tbody')[0].innerHTML += row;
                cTotal+=total
                cPagado+=parseInt(cuenta.valor_pagado)
              }   
        })
        let cuenta=document.getElementById("idCliente").textContent
        let saldo_Pendiente=cTotal-cPagado;
        cuentaTotal(cuenta,cTotal,cPagado,saldo_Pendiente);
        document.getElementById("Total_cuenta").textContent=formatoMoneda(cTotal);
        document.getElementById("saldo_Pendiente").textContent=formatoMoneda(saldo_Pendiente);
      };
      })
      .catch((error) => {
        console.log(error);
      });
    }