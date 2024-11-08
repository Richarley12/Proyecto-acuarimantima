
function formatoMoneda(valor) {
let formatted = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(valor);
return formatted.replace(/(\.|,)00$/g, "");
}

var fechaHoraActual = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');

let tabla1= document.getElementById("tabla1")
let agregarfila1=document.getElementById("btnAdd1")
let agregarCuenta=document.getElementById("btnagregarMesa")
let Tablacuentas=document.getElementById("cuentas")
let concepto=document.getElementById("concepto")
let productos = []; // Variable global para almacenar los productos
let inputRecaudo1=document.getElementById("valor1")
let inputRecaudo2=document.getElementById("valor2")
var resultado=[]

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

// concepto.addEventListener("input", function() {
//   buscarProductos();
// });

agregarfila1.addEventListener("click",function () {
  agregarfila(tabla1);
})

agregarCuenta.addEventListener("click", function () {
  let accion='insertar'
  let nombre = document.getElementById("Nombre").value
  traer_turnos()
  .then((data)=>{
    if (data.length>1) {
      ultimo_turno= data[data.length - 1]
    }else {
      ultimo_turno= data[0]
    }
   if (data.length===0 ||ultimo_turno.fecha_fin!==null) {
    swal("","Debe abrir un turno.","error");
   } else{
    if (nombre==="") {
      swal("","Debe ingresar un nombre.","error");
    } else {
      clientes().then(function (response) {
       let cliente=response.find(cli=>nombre==cli.nombre_cliente)
        let id_cliente
        if (cliente===undefined) {
          id_cliente=0
        }else{
          id_cliente=cliente.id_cliente
        }
        $.ajax({
            type:"POST",
            url:"conexionCuentas.php",
            data:{
                id_cliente:id_cliente,
                accion:accion,
                nombre:nombre,
                id_turno:ultimo_turno.id_turno,
                encargado:ultimo_turno.encargado,
                fecha:fechaHoraActual
            },
            success: function(response) {
                mesas_Activas()
                Limpiar_detalle()
              },
              error: function(xhr, status, error) {
                console.log("Error al eliminar producto: " + error);
              }
            })
      })
      
    }}
  })
  
  //agregar_Mesa(Tablacuentas)
})

// Función de callback que se ejecuta después de que se carga la página, me trae todos los productos para agregarlos después a las sugerencias
function onLoad() {
  // Realizar la petición AJAX para obtener los productos
  $.ajax({
    type: "GET",
    url: "../productos/pintarProductos.php",
    dataType: "json",
    success: function(data) {
      productos = data; // Almacenar los productos en la variable global
      var select = document.getElementById("sugerencias");
      productos.forEach(producto=>{
        let row = "<option>"+producto.nombre+"</option>"
        select.innerHTML += row
      })
    
    },
    error: function(jqXHR, textStatus, errorThrown) {
     // console.log(textStatus, errorThrown);
    }
  });
  clientes().then(function (response) {
     var buscador_cliente = document.getElementById("lista_clientes");
        let clientes=response
        i=1
        clientes.forEach(cliente => {
            let row = "<option>"+cliente.nombre_cliente+"</option>"
            buscador_cliente.innerHTML += row
  })}).catch(function(error) {
        console.log(error);
      });
}
//Funcion para agregar una cuenta
function agregarfila() {
  var select = document.getElementById("concepto").value;
  let result=productos.find(function(producto) {
    return (producto.nombre==select)
    });
  
  if (select==="") {
    swal("","Debe ingresar un producto.","error");
  } else {
  let cantidad=1
  let accion='insertarProducto';
  let id_cuenta = document.getElementById("idCliente").textContent
  $.ajax({
    type:"POST",
    url:"conexionCuentas.php",
    data:{
        accion:accion,
        id_cuenta:id_cuenta,
        id_producto:result.id_producto,
        nombre:result.nombre,
        cantidad:cantidad,
        valor:result.valor,
    },
    success: function(response) {
        pintarProductos();
      },
      error: function(xhr, status, error) {
        console.log("Error al ingresar producto: " + error);
      }
    }
    )}
  document.getElementById("concepto").value=""
};
//funcion para el buscador de sugerencias para añadir clientes al detalle de cuenta
function clientes() {
   return new Promise(function(resolve, reject) {
  $.ajax({
    type:'POST',
    url:"../clientes/clientesConexion.php",
    data:{accion:'traer_clientes'},
    success:function (response) {
         resolve(response);
        }, error: function(xhr, status, error) {
          reject(error);
        }
    })})}

//Funcion para pintar todas las mesas activas cuando carga la página
$(document).ready(function() {
  mesas_Activas()
});
//función para enviar el id y llamar a pintar productos
function detalleCuenta(cuenta) {
document.getElementById("concepto").disabled=false;//habilita el input para escribir el producto
document.getElementById("concepto").value=""
document.getElementById("Nombre_cliente").textContent=cuenta.nombre_cliente;//lleva el nombre de la cuenta al detalle
document.getElementById("idCliente").textContent=cuenta.id_cuenta;//lleva el id de la cuenta para el insert en el detalle
pintarProductos();

}
//funcion para traer los productos con el ID de la cuenta seleccionada
async function pintarProductos() {
  document.getElementById("Total_cuenta").textContent=""
  document.getElementById("saldo_Pendiente").textContent=""
  document.getElementById("tabla1").getElementsByTagName('tbody')[0].innerHTML = "";//limpia la tabla antes de traer los datos
  let id=document.getElementById("idCliente").textContent
  await traerProductos(id)
  .then((cuentas) =>{
      if(cuentas.length===0){
        document.getElementById("tabla1").getElementsByTagName('tbody')[0].innerHTML="<tr><td colspan='9' style='text-align:center;'>Agregue un producto</td></tr>";
      } else{    
      let cTotal=0;
      let cPagado=0;
      cuentas= ordenar(cuentas)
      document.getElementById("tabla1").getElementsByTagName('tbody')[0].innerHTML = "";//limpia la tabla antes de traer los datos
      cuentas.forEach(cuenta => {
        let total= (cuenta.valor*cuenta.cantidad)-cuenta.descuento_valor;
         if (cuenta.eliminado === "0") {
          let row = "<tr><td>" + cuenta.nombre_producto + "</td>"+"<td></td><td style='text-align:center'>";
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
            row += "<td style='text-align:center'><button onclick='modalPagocuentaTotal("+2+"," + JSON.stringify(cuenta)+")' type='button' data-bs-toggle='modal' data-bs-target='#staticBackdrop' class='icono'><i class='fa-solid fa-money-bill'></i></button> <button type='button' class='icono' onclick='eliminarProducto("+cuenta.id_registro+")'><i class='fa-solid fa-trash'></i></button></td></tr>";
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

//función para reducir en 1 las cantidades
function resta(bandera,cuenta) {
if (bandera===1) {//verifica si reduce la cantidad
  if (parseInt(cuenta.cantidad)>1) {
    let cantidad = parseInt(cuenta.cantidad)
    cantidad=cantidad-1
    let accion="cambiarCantidad";
    $.ajax({
      type:"POST",
      url:"conexionCuentas.php",
      data:{
          accion:accion,
          id_registro:cuenta.id_registro,
          cantidad:cantidad,
      },
      success: function(response) {
          pintarProductos();
        },
        error: function(xhr, status, error) {
          console.log("Error al ingresar producto: " + error);
        }
      }
      )  
  } 
}
else if (bandera===0) { //verifica si reduce el porcentaje
  if(parseInt(cuenta.descuento_porc)>0){
    let porcentaje = parseInt(cuenta.descuento_porc)
    porcentaje=porcentaje-5
    let accion="cambiarPorcentaje";
    let descuento_valor=(porcentaje*(cuenta.valor*cuenta.cantidad))/100
    console.log(descuento_valor)
    $.ajax({
      type:"POST",
      url:"conexionCuentas.php",
      data:{
          accion:accion,
          id_registro:cuenta.id_registro,
          porcentaje:porcentaje,
          descuento_valor:descuento_valor
      },
      success: function(response) {
          console.log(response);
          pintarProductos();
        },
        error: function(xhr, status, error) {
          console.log("Error al ingresar producto: " + error);
        }
      }
      )
  }
}
}
//función para aumentar en 1 las cantidades
function suma(bandera,cuenta) {
   //verifica si aumenta la cantidad
  if (bandera===1) {
  let cantidad = parseInt(cuenta.cantidad)
  cantidad=cantidad+1
  let accion="cambiarCantidad";
  
  $.ajax({
    type:"POST",
    url:"conexionCuentas.php",
    data:{
        accion:accion,
        id_registro:cuenta.id_registro,
        cantidad:cantidad,
    },
    success: function(response) {
        console.log(response);
        pintarProductos();
      },
      error: function(xhr, status, error) {
        console.log("Error al ingresar producto: " + error);
      }
    }
    )
  }
   //verifica si aumenta el porcentaje
  else if (bandera===0) {
    if (cuenta.descuento_porc<100) {
      let porcentaje = parseInt(cuenta.descuento_porc)
        porcentaje=porcentaje+5
        let descuento_valor=(porcentaje*(cuenta.valor*cuenta.cantidad))/100
        console.log(descuento_valor)
   let accion="cambiarPorcentaje";
  
  $.ajax({
    type:"POST",
    url:"conexionCuentas.php",
    data:{
        accion:accion,
        id_registro:cuenta.id_registro,
        porcentaje:porcentaje,
        descuento_valor:descuento_valor
    },
    success: function(response) {
        console.log(response);
        pintarProductos();
      },
      error: function(xhr, status, error) {
        console.log("Error al ingresar producto: " + error);
      }
    }
    )
    }  
  }

  }

//funcion para insertar los valores totales en la cuenta
function cuentaTotal(cuenta,cTotal,cPagado,saldo_Pendiente) {
  accion="actualizaTotal";
  let tmpCuenta=parseInt(cuenta);
  $.ajax({//realiza la consulta en la BD para traer los productos con el id de la cuenta
    type: "POST",
    url: "conexionCuentas.php",
    data: {
      accion:accion,
      id_cuenta:tmpCuenta,
      total:cTotal,
      cPagado:cPagado,
      saldo_Pendiente:saldo_Pendiente
    },
    success: function(response) {
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }
  });

}
//pinta todas las mesas activas
function mesas_Activas() {
  traer_turnos()
  .then((data)=>{
    if (data.length>1) {
      ultimo_turno= data[data.length - 1]
    }else {
      ultimo_turno= data[0]
    }
    if (data.length===0 ||ultimo_turno.fecha_fin!==null){
      document.getElementById("cuentas").getElementsByTagName('tbody')[0].innerHTML = "";
    } else {
      document.getElementById("cuentas").getElementsByTagName('tbody')[0].innerHTML = "";//limpia la tabla antes de traer los datos
      $.ajax({
        type: "GET",
        url: "conexionVentas.php",
        data:{
          id_turno:ultimo_turno.id_turno
        },
        dataType: "json",
        success: function(data) {
          var cuentas = data; // declarar e inicializa la variable productos aquí
          cuentas.forEach(cuenta => {
              if (cuenta.eliminado === "0" && cuenta.estado==="0" && cuenta.id_turno===ultimo_turno.id_turno) {
                  var row = "<tr><td onclick='detalleCuenta(" + JSON.stringify(cuenta)+")'>" + cuenta.nombre_cliente + "</td><td style='text-align:center'><button onclick='detalleCuenta(" + JSON.stringify(cuenta)+")' type='button' class='icono'><i class='fa-solid fa-eye'></i></button> <button data-bs-toggle='modal' data-bs-target='#staticBackdrop' type='button' class='icono'  onclick='modalPagocuentaTotal("+1+"," + JSON.stringify(cuenta)+")' ><i class='fa-solid fa-cash-register'></i></button> <button type='button' class='icono' onclick='cerrar_mesa("+JSON.stringify(cuenta)+")' ><i class='fa-solid fa-store-slash'></i></button></td></tr>";
                  document.getElementById("cuentas").getElementsByTagName('tbody')[0].innerHTML += row;
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

//Fucion para cargar datos del modal de pago
function modalPagocuentaTotal(bandera,cuenta) {
  //limpia todoantes de traer los datos
  document.getElementById("divtabla").style.display=""
  document.getElementById("valor1").value=""
  document.getElementById("valor2").value=""
  document.getElementById("totalRecaudo").value= formatoMoneda(0)
  document.getElementById("totalPendiente").value= formatoMoneda(0)
  document.getElementById("TotalDev").value= formatoMoneda(0)
  document.getElementById("totalCuenta").value=""
  document.getElementById("detalleCuenta").getElementsByTagName('tbody')[0].innerHTML = "";
  if (bandera ===1) {
    let cantidades= []
    let id=cuenta.id_cuenta
    traerProductos(id)
    .then((cuentas) => {
      cuentas = cuentas.filter(function(cuenta) {
        return cuenta.eliminado === "0" && cuenta.pagado === "0";
      });
      let cTotal=0;
      let seleccionados = [];
      cuentas.forEach(cuenta => {
        let total= (cuenta.valor*cuenta.cantidad)-cuenta.descuento_valor;
             var row = "<tr><td><input style= 'display' class='form-check-input' type='checkbox'id='flexCheckDefault'></td><td>" + cuenta.nombre_producto + "</td><td style='text-align:center'>" + cuenta.cantidad + "</td><td style='text-align:center'>" + formatoMoneda(cuenta.valor) +"</td><td style='text-align:center'>"+ formatoMoneda(cuenta.descuento_valor) +"</td><td style='text-align:center'>" + cuenta.descuento_porc + "</td><td style='text-align:center'>"+ formatoMoneda(total) +"</td></tr>";
             document.getElementById("detalleCuenta").getElementsByTagName('tbody')[0].innerHTML += row;
             cTotal+=total
     })
        document.getElementById("totalCuenta").value=formatoMoneda(cTotal);
        document.getElementById("totalPendiente").value= formatoMoneda(cTotal)
    //código si el pago es parcial
    const checkboxes = document.querySelectorAll('table input[type="checkbox"]');
    checkboxes.forEach((checkbox, indice) => {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          document.getElementById("valor1").value=""
          document.getElementById("valor2").value=""
          document.getElementById("TotalDev").value= formatoMoneda(0)
          document.getElementById("totalRecaudo").value= formatoMoneda(0)
          cTotal=0
          seleccionados.push(cuentas[indice]);
          seleccionados.forEach(cuenta=>{
            let total= (cuenta.valor*cuenta.cantidad)-cuenta.descuento_valor;
            cTotal+=total
            console.log(seleccionados)
          })
        } else {
          document.getElementById("valor1").value=""
          document.getElementById("valor2").value=""
          document.getElementById("TotalDev").value= formatoMoneda(0)
          document.getElementById("totalRecaudo").value= formatoMoneda(0)
          cTotal=0
          seleccionados.splice(seleccionados.indexOf(cuentas[indice]), 1);
          seleccionados.forEach(cuenta=>{
            let total= (cuenta.valor*cuenta.cantidad)-cuenta.descuento_valor;
            cTotal+=total
            console.log(seleccionados)
          })
        }
        document.getElementById("totalCuenta").value=formatoMoneda(cTotal);
        document.getElementById("totalPendiente").value= formatoMoneda(cTotal)
        cuenta=seleccionados
      });
    });
     //funciones que se ejecutan cuando se ingresa un valor en el efectivo o en transferencia
     let tdevolver=0
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
    })
    .catch((error) => {
      console.log(error);
    });
  } //código para pago de un solo producto
    else if (bandera===2){
      document.getElementById("divtabla").style.display="none"
      let cantidades= []
      let tdevolver=0
      let cTotal= (cuenta.valor*cuenta.cantidad)-cuenta.descuento_valor;
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
       
    }
    
    
}
//funcion que realiza el calculo de las cantidades a devolver, el total recaudo y el saldo pendiente
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
 async function Pago() {
  let insertar = resultado;
  if(insertar.length>0){
    if ((insertar[0].cantidades.efectivo==0) &&(insertar[0].cantidades.transferencia==0)) {
      swal("","Debe ingresar un pago.","error")
    }else if (insertar[0].cantidades.recaudo >= insertar[0].cantidades.cpagada) {
      Swal.fire({
        title: 'Procesando pago...',
        html: 'Espere mientras se procesa el pago...',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      try {
        await Promise.all([insertarPago(insertar), 
          new Promise((resolve) => {
              resolve(pagoDetalleCuenta(insertar));
          })
        ]);
        // Cerrar SweetAlert de espera
        Swal.close();
      } catch (error) {
        // Cerrar SweetAlert de espera en caso de error
        Swal.close();
        // Mostrar SweetAlert de error
        swal("", "Ocurrió un error al procesar el pago.", "error");
        console.log(error);
      }
    } else {
      swal("","El recaudo no puede ser menor a la cantidad total","error");
    }
  } else {
    swal("","Debe ingresar un pago.","error");
  }
}
async function insertarPago(resultado) {
  let accion='insertarPago'
  let id
  if(resultado[0].cuenta.length>0){
    id=resultado[0].cuenta[0].id_cuenta
  }
  else{
    id=resultado[0].cuenta.id_cuenta
  }
  $.ajax({//realiza la consulta en la BD para traer los productos con el id de la cuenta
    type: "POST",
    url: "conexionPago.php",
    data: {
      accion:accion,
      id_cuenta:id,
      id_detallecuenta:resultado[0].cuenta.id_registro,
      pago_efectivo:resultado[0].cantidades.efectivo,
      pago_transferencia:resultado[0].cantidades.transferencia,
      totalcuenta:resultado[0].cantidades.cpagada,
      devuelta:resultado[0].cantidades.tdevolver,
      fecha:fechaHoraActual
    },
    success:function(response) {
      console.log(response);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
      swal("","Error al insertar el pago.","error");
    }
  });
 
}
async function pagoDetalleCuenta(resultado) {
  let accion='modificardetalleCuenta'
  if(resultado[0].cuenta.length>0){
    let id_registro
    let id_cuenta=resultado[0].cuenta[0].id_cuenta
    for (let i = 0; i < resultado[0].cuenta.length; i++) {
      let cpagada=0
      cpagada= (resultado[0].cuenta[i].cantidad* resultado[0].cuenta[i].valor)- resultado[0].cuenta[i].descuento_valor;
      id_registro= resultado[0].cuenta[i].id_registro
      await actualizardetalledelacuenta(accion,id_registro,cpagada)
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      })
  }
  await validarPagadocuentaTotal(id_cuenta)
  .then((response) => {

  }).catch((error) => {
    console.log(error);
  })
}else if(resultado[0].cuenta.hasOwnProperty('id_registro')){
     let id_registro=resultado[0].cuenta.id_registro
     let cpagada= resultado[0].cantidades.cpagada
     let id_cuenta=resultado[0].cuenta.id_cuenta
      await actualizardetalledelacuenta(accion,id_registro,cpagada)
      .then((response) => {
        
      }).catch((error) => {
        console.log(error);
      })
      await validarPagadocuentaTotal(id_cuenta)
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      })
} else{
  id_cuenta=resultado[0].cuenta.id_cuenta
  await traerProductos(id_cuenta)
  .then((datos)=>{
    let detallecuentas=datos
    for (let i = 0; i < detallecuentas.length; i++) {
      let valor_pagado=0
      valor_pagado=(detallecuentas[i].cantidad*detallecuentas[i].valor)-detallecuentas[i].descuento_valor;
      id_registro=detallecuentas[i].id_registro
      console.log(id_registro)
      console.log(valor_pagado)
      actualizardetalledelacuenta(accion,id_registro,valor_pagado)
    }
  }).catch((error) => {
    console.log(error);
  })
  await pagarCuentaTotal(id_cuenta)
  .then((response) => {
    console.log(response);
    swal({
      text: "el pago ha sido procesado",
      icon: "success",
      button: true,
     // timer: 2000,
    }).then(() => {
      window.location.reload();
    });
  })
  .catch((error) => {
    console.log(error);
  })
}
}


//funcion para traer los productos con el id de la cuenta principal
function traerProductos(id_cuenta) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "POST",
      url: "conexionDetalleCuenta.php",
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

function actualizardetalledelacuenta(accion,id_registro,valor_pagado) {
  return new Promise((resolve, reject)=>{
    $.ajax({
      type: "POST",
      url: "conexionPago.php",
      data: {
        accion:accion,
        id_registro:id_registro,
        valorPagado:valor_pagado
      },
      success: function(response) {
        resolve(response);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        reject(textStatus, errorThrown);
      }
    });
  })
}
async function validarPagadocuentaTotal(id) {
  let ctotal= 0
  let detallecuentas
  await traerProductos(id)
  .then((datos)=>{
    datos = datos.filter(function(dato) {
      return dato.eliminado === "0" && dato.pagado==="1"
    });
    detallecuentas=datos
    datos.forEach(dato=>{
    let total= (dato.valor*dato.cantidad)-dato.descuento_valor;
    ctotal+=total
  })
  }).catch((error) => {
    console.log(error);
  })
 await consultarCuenta(id)
  .then((cuenta)=>{
    console.log(ctotal)
    console.log(cuenta[0].total)
    if (cuenta[0].total==ctotal) {
      swal({
        title: 'La cuenta se pagará en su totalidad',
        text: "Deseas cerrar la cuenta",
        icon: "warning",
        buttons: {
          confirm: "Sí",
          cancel: "No",
        },
      }) .then((pagototal)=>{
          if(pagototal){
          pagarCuentaTotal(id)
          swal({
        text: "el pago ha sido procesado",
        icon: "success",
        button: true,
      }).then(() => {
        window.location.reload();
      });
          } else {
            swal({
        text: "el pago ha sido procesado",
        icon: "success",
        button: true,
      }).then(() => {
        window.location.reload();
      });
          }
      })
    } else{
      swal({
        text: "el pago ha sido procesado",
        icon: "success",
        button: true,
      }).then(() => {
        window.location.reload();
      });
      return
    }
  }).catch((error) => {
    console.log(error);
  })
}

function consultarCuenta(id) {
  let accion='consultaCuenta'
  return new Promise ((resolve,reject)=>{
    $.ajax({
      type: "POST",
      url: "conexionPago.php",
      dataType: "json",
      data: {
        accion:accion,
        id_cuenta:id
      },
      success: function(data) {
        resolve (data); // declarar e inicializa la variable productos aquí
      },
      error: function(jqXHR, textStatus, errorThrown) {
        reject(jqXHR,textStatus, errorThrown);
      }
    });
  })
  
}

function pagarCuentaTotal(id) {
  accion='cuentaPagada'
  return new Promise ((resolve,reject)=>{
    $.ajax({//realiza la consulta en la BD para traer los productos con el id de la cuenta
      type: "POST",
      url: "conexionPago.php",
      data: {
        accion:accion,
        id_cuenta:id,
      },
      success: function(response) {
        resolve(response);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        reject(textStatus, errorThrown);
      }
    });
  })
}

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

function eliminarProducto(id) {
  
  swal({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede revertir",
    icon: "warning",
    buttons: {
      confirm: "Sí",
      cancel: "No",
    },
    dangerMode: true,
  }).then((eliminar)=>{
    if (eliminar) {
      let accion="eliminar";
      $.ajax({
        type:"POST",
        url:"conexionCuentas.php",
        data:{
            accion:accion,
            id_registro:id,
        },
        success: function(response) {
            console.log(response);
            swal({
              text: "el producto ha sido eliminado",
              icon: "success",
              button: true,
            }).then(
              pintarProductos()
            )
          },
          error: function(xhr, status, error) {
            console.log(error);
          }
        }
        )
    }
 
  })
  
}

function cerrar_mesa(mesa) {
    $.ajax({
      type: "POST",
      url: "conexionDetalleCuenta.php",
      dataType:"json",
      data:{
        id_cuenta:mesa.id_cuenta
      },
      success: function (response) {
        let activo=0
        response.forEach((producto)=>{
          if (producto.eliminado==0 && producto.pagado==0 ) {
            activo=1
          }
        })
        if (activo==1) {
          swal({
            text: "La cuenta tiene productos pendientes, ¿desea pasarla a deudores?",
            icon: "info",
            buttons:{
              cancel:"No",
              confirm:"Sí"
              }
          }).then(async(confirmado)=>{
            if (confirmado) {
              await pasar_Deudores(mesa.id_cuenta,2).then(
                swal({
                  text: "La cuenta ha sido pasada correctamente",
                  icon: "success",
                  button: true,
                }).then(
                  mesas_Activas(),
                  Limpiar_detalle() 
                )
             )
            }
          }
          )
        } else {
           pagarCuentaTotal(mesa.id_cuenta).then(
            () => {
              swal({
                text: "La cuenta ha sido cerrada",
                icon: "success",
                button: true,
              }).then(
                mesas_Activas(),
                Limpiar_detalle() 
                )
            }
           )
        }
      
      },
      error: function (jqXHR, textStatus, errorThrown) {
        reject(textStatus, errorThrown);
      }
    });
  }
function limpiargastos() {
  document.getElementById('observacion_gasto').value=""
  document.getElementById('valor').value=""
  document.getElementById('nombreGasto').value=""
}

function agregar_Gasto() {
  let observacion_gasto= document.getElementById('observacion_gasto').value
  let valor=document.getElementById('valor').value
  let nombreGasto=document.getElementById('nombreGasto').value
  let metodo= document.getElementById('metodo_pago').value


traer_turnos()
  .then((data)=>{
    if (data.length>1) {
      ultimo_turno= data[data.length - 1]
    }else {
      ultimo_turno= data[0]
    }
   if (data.length===0 ||ultimo_turno.fecha_fin!==null) {
    swal("","Debe abrir un turno.","error");
   } else{
    if (valor===""||nombreGasto==="") {
      swal("","Debe ingresar todos los campos.","error");
    } else {

 $.ajax({
      type: "POST",
      url: "conexionPago.php",
      data: {
        accion:'registrar_Gasto',
        observacion_gasto:observacion_gasto,
        valor:valor,
        producto:nombreGasto,
        metodo:metodo,
        fecha:fechaHoraActual
      },
      dataType: "json",
      success: function(response) {
        swal({
          text: response,
          icon: "success",
          button: true,
        }).then(
          mesas_Activas(),
          $('#gastoModal').modal('hide'),
          Limpiar_detalle() 
        )
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus,errorThrown)
      }
    });
    }}})}

  function pasar_Deudores(id_cuenta,estado) {
    return new Promise (function (resolve,reject) {
      $.ajax({
        type: "POST",
        url: "../Turnos/conexionTurnos.php",
        data: {
          accion: 'actualizar_Estado',
          id_cuenta: id_cuenta,
          estado: estado //el nuevo estado a deudores
        },
        success: function (response) {
          resolve(response)
        },
        error: function (jqXHR, textStatus, errorThrown) {
          reject(textStatus, errorThrown);
        }
      });
    })
  }  

window.onload = onLoad;
//función que limpia la tabla de detalle
function Limpiar_detalle() {
  document.getElementById('Nombre').value=""
  document.getElementById("Total_cuenta").textContent=""
  document.getElementById("saldo_Pendiente").textContent=""
  document.getElementById("Nombre_cliente").textContent=""
  document.getElementById("tabla1").getElementsByTagName('tbody')[0].innerHTML = "";//limpia la tabla antes de traer los datos
  document.getElementById("concepto").disabled=true;//habilita el input para escribir el producto
  document.getElementById("concepto").value=""
  document.getElementById("Nombre_cliente").textContent="";//lleva el nombre de la cuenta al detalle
  document.getElementById("idCliente").textContent="";//lleva el id de la cuenta para el insert en el detalle
}