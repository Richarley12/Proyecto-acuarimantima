
let inputRecaudo1=document.getElementById("valor1")
let inputRecaudo2=document.getElementById("valor2")
let botonPago=document.getElementById("btn_pagar")

//función que modifica el número entero y lo muestra en pesos Colombianos
function formatoMoneda(valor) {
  let formatted = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(valor);
return formatted.replace(/(\.|,)00$/g, "");
}

var fechaHoraActual = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');

//función que modifica el formato de fecha de la base de datos y la muestra más sencilla con el día
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
//funcion que me pinta las cuentas del cliente seleccionado
function traer_cuentas_pendientes() {
    let cliente_seleccionado= document.getElementById("Nombre").value
    document.getElementById('tablaDeudores').getElementsByTagName('tbody')[0].innerHTML=""
    document.getElementById("Nombre").value= "Seleccione un deudor"
    mesas_Pendientes().then((data)=>{
      data.forEach(cuenta=>{
        let total_deuda=0
        if (cliente_seleccionado==cuenta.nombre_cliente) {
          document.getElementById('titulo').innerHTML=cliente_seleccionado
          row = "<tr><td style='text-align:center'>"+formato_Fecha(cuenta.fecha)+"</td><td style='text-align:center'>"+formatoMoneda(cuenta.total)+"</td><td style='text-align:center'>"+formatoMoneda(cuenta.saldo_pendiente)+"</td><td style='text-align:center'>"+cuenta.responsable+"</td><td style='text-align:center'><button type='button' data-bs-toggle='modal' data-bs-target='#staticBackdrop' class='icono' onclick='ver_DetalleCuenta("+JSON.stringify(cuenta) +")' ><i class='fa-solid fa-money-bill'></i></button> <button type='button' class='icono' data-bs-toggle='modal' data-bs-target='#staticBackdrop' onclick='ver_DetalleCuenta("+JSON.stringify(cuenta)+","+1+")' ><i class='fa-solid fa-eye''></i></button></td></tr>"
          document.getElementById('tablaDeudores').getElementsByTagName('tbody')[0].innerHTML +=row
          total_deuda+=cuenta.saldo_pendiente
          document.getElementById("deuda").innerHTML=formatoMoneda(total_deuda)
        }
          
      })  
    })
    }
//función que se ejecuta al cargar la página
     $(document).ready(function () {
        //funcion que me muestra en el select sólo los clientes con cuentas abiertas
        traer_clientes_pendientes()
       })
//funcion que consulta cuáles clientes tienen cuentas abiertas y los trae
   async function traer_clientes_pendientes(){
    let buscador_cliente = document.getElementById("Nombre");
    let mesas = await mesas_Pendientes()
    let clientes_deudores = mesas.filter((mesa, index, arr) => {
        return arr.findIndex((m) => m.nombre_cliente === mesa.nombre_cliente) === index;
      });
      clientes_deudores=clientes_deudores.map(mesa=>mesa.nombre_cliente)
      clientes_deudores.forEach(cliente=>{
        let row = "<option>"+cliente+"</option>"
                   buscador_cliente.innerHTML += row
      })
    }
//funcion que me trae todas las cuentas abiertas
function mesas_Pendientes() {
    return new Promise(function (resolve,reject) {
        $.ajax({
            type: "POST",
            url: "conexionDeudores.php",
            dataType: "json",
            data:{
                accion:'consultar_Cuentas'
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
//Función que regula que al abrir el modal se abra el detalle de la cuenta o para el pago
async function ver_DetalleCuenta(cuenta,bandera) {
  limpiar()
  if (bandera==1) {
    document.getElementById('inputs_Pago').style.display="none"
    document.getElementById('btn_pagar').style.display="none"
    let productos= await traer_detalleCuenta(cuenta.id_cuenta)
    let pagos= await pagos_Realizados(cuenta.id_cuenta)
    let cTotal=0;
    productos= ordenar(productos)
    productos.forEach(cuenta => {
        let total= (cuenta.valor*cuenta.cantidad)-cuenta.descuento_valor;
             let row = "<tr><td>" + cuenta.nombre_producto + "</td><td style='text-align:center'>" + cuenta.cantidad + "</td><td style='text-align:center'>" + formatoMoneda(cuenta.valor) +"</td><td style='text-align:center'>"+ formatoMoneda(cuenta.descuento_valor) +"</td><td style='text-align:center'>" + formatoMoneda(total) + "</td>";
             if(cuenta.pagado==1){
              row+="<td style='text-align:center'>PAGADO</td></tr>" 
             } else {
              row += "<td style='text-align:center'>PENDIENTE</td></tr>"
             };
             document.getElementById("detalleCuenta").getElementsByTagName('tbody')[0].innerHTML += row;
             cTotal+=total
     })
     pagos.forEach(pago=>{
      let row= "<tr><td style='text-align:center'>"+ formato_Fecha(pago.fecha)+ "</td><td style='text-align:center'>"+formatoMoneda(pago.total_cuenta)
      if (pago.pago_efectivo!=0) {
        row+= "</td><td style='text-align:center'>Efectivo</td></tr>"
      } else {
        row+= "</td><td style='text-align:center'>Transferencia</td></tr>"
      }
      
      document.getElementById("detallePagos").getElementsByTagName('tbody')[0].innerHTML +=row
     })
  } else {
      document.getElementById('detalle_cuenta').style.display="none"
      let cantidades= []
      let tdevolver=0
      let cTotal= cuenta.saldo_pendiente;
      document.getElementById("totalCuenta").value=formatoMoneda(cTotal);
      document.getElementById("totalPendiente").value= formatoMoneda(cTotal)
      inputRecaudo1.addEventListener("input",function () {
        resultado=[]
        cantidades= detallePago(cTotal,tdevolver)
        resultado.push({
          cantidades: cantidades,
          cuenta: cuenta
        });
       })
       inputRecaudo2.addEventListener("input",function () {
        resultado=[]
        cantidades= detallePago(cTotal,tdevolver)
        resultado.push({
          cantidades: cantidades,
          cuenta: cuenta
        });
       })
  botonPago.addEventListener("click",function () {
    pagar(resultado).then((mensaje)=>{
      swal({
        text: mensaje,
        icon: "success",
        button: true,
       // timer: 2000,
      }).then(() => {
        window.location.reload();
      });
    })
   
  })

  }
}
//Función que trae el detalle de las cuenta pendientes de la BD
function traer_detalleCuenta(id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "../ventas/conexionDetalleCuenta.php",
      data: {
        id_cuenta: id
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
//Función que ordena el detalle de la cuenta con las PAGADO en la parte de abajo
function ordenar(cuentas) {
  let cuentasO = cuentas.sort((a, b) => {
    if (a.pagado === b.pagado) {
      return 0;
    } else if (a.pagado === "1") {
      return 1;
    } else {
      return -1;
    }
  });
  return cuentasO
}
//Función que trae todo el detalle de los pagos hechos a la cuenta con el ID
function pagos_Realizados(id_cuenta) {
  return new Promise(function (resolve,reject) {
    $.ajax({
        type: "POST",
        url: "conexionDeudores.php",
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

function limpiar() {
  document.getElementById("valor1").value=""
  document.getElementById("valor2").value=""
  document.getElementById("totalRecaudo").value= formatoMoneda(0)
  document.getElementById("totalPendiente").value= formatoMoneda(0)
  document.getElementById("TotalDev").value= formatoMoneda(0)
  document.getElementById("totalCuenta").value=""
  document.getElementById("detalleCuenta").getElementsByTagName('tbody')[0].innerHTML = ""
  document.getElementById("detallePagos").getElementsByTagName('tbody')[0].innerHTML=""
  document.getElementById('btn_pagar').style.display=""
  document.getElementById('inputs_Pago').style.display=""
  document.getElementById('detalle_cuenta').style.display=""
}

function detallePago(cTotal,tdevolver) {
  let cantidades={}
  let tRecaudo=0
  let tEfectivo=document.getElementById("valor1").value
  if (tEfectivo === ""){
    tEfectivo=0
  }
  let tTransferencia=document.getElementById("valor2").value
  if ( tTransferencia=== ""){
    tTransferencia=0
  }
  let tPendiente=0
  tRecaudo= parseInt(tEfectivo) + parseInt(tTransferencia)
  tPendiente= cTotal-tTransferencia-tEfectivo
  if (tPendiente<0) {
    if (tTransferencia>cTotal) {
      tdevolver=0
    } else{tdevolver=tPendiente*-1}
    tPendiente=0
  }
  cantidades.efectivo=tEfectivo;
  cantidades.transferencia=tTransferencia;
  cantidades.tdevolver=tdevolver;
  cantidades.cpagada=cTotal;
  cantidades.recaudo=tRecaudo;
  document.getElementById("totalRecaudo").value= formatoMoneda(tRecaudo)
  document.getElementById("totalPendiente").value= formatoMoneda(tPendiente)
  document.getElementById("TotalDev").value=formatoMoneda(tdevolver)
  return cantidades
}

function guardar_pago(resultado) {
  return new Promise(function (resolve, reject) {
  let accion= 'insertarPago'
  $.ajax({//Inserta el pago en la BD
    type: "POST",
    url: "../ventas/conexionPago.php",
    data: {
      accion:accion,
      id_cuenta:resultado[0].cuenta.id_cuenta,
      id_detallecuenta:resultado[0].cuenta.id_registro,
      pago_efectivo:resultado[0].cantidades.efectivo,
      pago_transferencia:resultado[0].cantidades.transferencia,
      totalcuenta:resultado[0].cantidades.recaudo,
      devuelta:resultado[0].cantidades.tdevolver,
      fecha:fechaHoraActual
    },
    success:function(response) {
      resolve(response);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      reject(textStatus, errorThrown);
    }
  });})
 
}

function actualizar_Cuenta(resultado) {
  return new Promise(function (resolve, reject) {
  let cPagado= parseInt(resultado[0].cuenta.saldo_pagado)+resultado[0].cantidades.recaudo
  let saldo_Pendiente= parseInt(resultado[0].cuenta.total)-cPagado

if (saldo_Pendiente==0) {
  accion='cuentaPagada'
  $.ajax({//realiza la consulta en la BD para traer los productos con el id de la cuenta
    type: "POST",
    url: "../ventas/conexionPago.php",
    data: {
      accion:accion,
      id_cuenta:resultado[0].cuenta.id_cuenta,
    },
    success: function(response) {
      resolve(response);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      reject(textStatus, errorThrown);
    }
  })
}else{
  accion="actualizaTotal";
  $.ajax({//Actualiza la cuenta con el pago o abono
    type: "POST",
    url: "../ventas/conexionCuentas.php",
    data: {
      accion:accion,
      id_cuenta:resultado[0].cuenta.id_cuenta,
      total:resultado[0].cuenta.total,
      cPagado:cPagado,
      saldo_Pendiente:saldo_Pendiente
    },
    success: function(response) {
      resolve(response);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      reject(textStatus, errorThrown);
    }
  })
}
  })
}

function pagar(resultado) {
  return new Promise(function (resolve, reject) {
     guardar_pago(resultado)
        .then(() => {
           actualizar_Cuenta(resultado)
              .then(() => {
                 resolve("Guardado correcto");
              })
              .catch(error => {
                 reject("Error al actualizar la cuenta: " + error);
              });
        })
        .catch(error => {
           reject("Error al guardar el pago: " + error);
        });
  });  
}
