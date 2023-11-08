

$(document).ready(function() {
    mesas_Pagadas()
  });

  function formatoMoneda(valor) {

    let formatted = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(valor);
  return formatted.replace(/(\.|,)00$/g, "");
  }

  function traer_turnos() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type:"POST",
        url:"../Turnos/traerturnos.php",
        data:{
          accion:'traerturnos'
        },
        datatype:"json",
        success: function(data){
          resolve(data);
        }, error: function(xhr, status, error) {
          reject(error);
        }
  })})}

function mesas_Pagadas() {
    traer_turnos()
    .then((data)=>{
      if (data.length>1) {
        ultimo_turno= data[data.length - 1]
      }else {
        ultimo_turno= data[0]
      }
      if (data.length===0 ||ultimo_turno.fecha_fin!==null){
        document.getElementById("cuentasPagadas").getElementsByTagName('tbody')[0].innerHTML = ""
      } else{
        document.getElementById("cuentasPagadas").getElementsByTagName('tbody')[0].innerHTML = "";//limpia la tabla antes de traer los datos
        $.ajax({
          type: "GET",
          url: "../ventas/conexionVentas.php",
          data:{
            id_turno:ultimo_turno.id_turno
          },
          dataType: "json",
          success: function(data) {
            var cuentas = data; // declarar e inicializa la variable productos aquí
            cuentas.forEach(cuenta => {
                if (cuenta.eliminado === "0" && cuenta.estado==="1"&& cuenta.id_turno===ultimo_turno.id_turno ) {
                    var row = "<tr><td onclick='pintarProductosPagados(" + JSON.stringify(cuenta)+")'>" + cuenta.nombre_cliente + "</td></tr>";
                    document.getElementById("cuentasPagadas").getElementsByTagName('tbody')[0].innerHTML += row;
                  }
            });
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
          }
        });
      }
  })
  }

 async function pintarProductosPagados(cuenta) {
    document.getElementById("Nombre_clienteP").textContent=cuenta.nombre_cliente
    let id = cuenta.id_cuenta
    document.getElementById("tabla2").getElementsByTagName('tbody')[0].innerHTML = "";
    document.getElementById("detallePagos").getElementsByTagName('tbody')[0].innerHTML="";//limpia la tabla antes de traer los datos
   await traerProductos(id)
      .then((cuentas) => {
        let cTotal=0
        cuentas.forEach(cuenta => {
          let total = (cuenta.valor * cuenta.cantidad) - cuenta.descuento_valor;
          if (cuenta.eliminado === "0") {
            var row = "<tr><td>" + cuenta.nombre_producto + "</td>"+"<td style='text-align:center'>"+ cuenta.cantidad+"</td><td style='text-align:center'>" + formatoMoneda(cuenta.valor) +"</td><td style='text-align:center'>"+ formatoMoneda(cuenta.descuento_valor) +"</td><td style='text-align:center'>"+ cuenta.descuento_porc+"</td><td style='text-align:center'>"+ formatoMoneda(total) +"</td></tr>";
            document.getElementById("tabla2").getElementsByTagName('tbody')[0].innerHTML += row;
            cTotal+=total
          }
          document.getElementById("Total_cuentaP").textContent=formatoMoneda(cTotal);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    await pagos_Realizados(id).then((pagos) => {
      pagos.forEach(pago=>{
        let row= "<tr><td style='text-align:center'>"+ formato_Fecha(pago.fecha)+ "</td><td style='text-align:center'>"+formatoMoneda(pago.total_cuenta)
        if (pago.pago_efectivo!=0) {
          row+= "</td><td style='text-align:center'>Efectivo</td></tr>"
        } else {
          row+= "</td><td style='text-align:center'>Transferencia</td></tr>"
        }
        document.getElementById("detallePagos").getElementsByTagName('tbody')[0].innerHTML +=row
       })
    })
  }

  function traerProductos(id_cuenta) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        url: "../ventas/conexionDetalleCuenta.php",
        data: {
          id_cuenta: id_cuenta
        },
        dataType: "json",
        success: function(data) {
          resolve(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          reject(errorThrown);
        }
      });
    });
  }

  function pagos_Realizados(id_cuenta) {
    return new Promise(function (resolve,reject) {
      $.ajax({
          type: "POST",
          url: "../deudores/conexionDeudores.php",
          dataType: "json",
          data:{
              accion:'consultar_Pagos',
              id_cuenta : id_cuenta
          },
          success: function(data) {
              resolve(data)
          },
          error: function(jqXHR, textStatus, errorThrown) {
            reject(textStatus, errorThrown);
          }
        });
  })
  }
  

  function formato_Fecha(fechaString) {
    const fecha = new Date(fechaString);
  
    const opcionesFormato = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    };
  
    return fecha.toLocaleDateString('es-CO', opcionesFormato);
  }