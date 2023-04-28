function formatoMoneda(valor) {

  let formatted = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(valor);
return formatted.replace(/(\.|,)00$/g, "");
}

let tabla1= document.getElementById("tabla1")
let agregarfila1=document.getElementById("btnAdd1")
let agregarCuenta=document.getElementById("btnagregarMesa")
let Tablacuentas=document.getElementById("cuentas")
let concepto=document.getElementById("concepto")
let productos = []; // Variable global para almacenar los productos
let btnbuscar=document.getElementById("btnbuscar")
let inputRecaudo1=document.getElementById("valor1")
let inputRecaudo2=document.getElementById("valor2")
var resultado=[]

btnbuscar.addEventListener("click",function () {
 
})

concepto.addEventListener("input", function() {
  buscarProductos();
});

agregarfila1.addEventListener("click",function () {
  agregarfila(tabla1);
})

agregarCuenta.addEventListener("click", function () {
  
  let accion='insertar'
  let nombre = document.getElementById("Nombre").value
  console.log(nombre)

  if (nombre==="") {
    swal("","Debe ingresar un nombre.","error");
  } else {
  $.ajax({
    type:"POST",
    url:"conexionCuentas.php",
    data:{
        accion:accion,
        nombre:nombre,
    },
    success: function(response) {
        console.log(response);
        window.location.reload();
        
      },
      error: function(xhr, status, error) {
        console.log("Error al eliminar producto: " + error);
      }
    }
    )}
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
    },
    error: function(jqXHR, textStatus, errorThrown) {
     // console.log(textStatus, errorThrown);
    }
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
        console.log(response);
        pintarProductos();
      },
      error: function(xhr, status, error) {
        console.log("Error al ingresar producto: " + error);
      }
    }
    )}
  document.getElementById("concepto").value=""
};
//funcion para el buscador de sugerencias para añadir producto al detalle de cuenta
function buscarProductos() {
  var select = document.getElementById("sugerencias");
  
  select.innerHTML = ""; // Limpia la lista de sugerencias


  var filtro = productos.filter(function(producto) {
    return producto.nombre.toLowerCase().includes(concepto.value.toLowerCase());
  }); //solo muestra las coincidencias una vez

  filtro.forEach(function(producto) {
    var option = document.createElement("option");
    option.value = producto.nombre;
    select.appendChild(option);
  }); //imprime las coincidencias en el datalist

};
//Funcion para pintar todas las mesas activas cuando carga la página
$(document).ready(function() {
  mesas_Activas()
});
//función para enviar el id y llamar a pintar productos
function detalleCuenta(cuenta) {
document.getElementById("concepto").disabled=false;//habilita el input para escribir el producto
document.getElementById("Nombre_cliente").textContent=cuenta.nombre_cliente;//lleva el nombre de la cuenta al detalle
document.getElementById("idCliente").textContent=cuenta.id_cuenta;//lleva el id de la cuenta para el insert en el detalle

pintarProductos();

}
//funcion para traer los productos con el ID de la cuenta seleccionada
function pintarProductos() {
document.getElementById("tabla1").getElementsByTagName('tbody')[0].innerHTML = "";//limpia la tabla antes de traer los datos
$.ajax({//realiza la consulta en la BD para traer los productos con el id de la cuenta
  type: "POST",
  url: "conexionDetalleCuenta.php",
  data: {
    id_cuenta:document.getElementById("idCliente").textContent
  },
  dataType: "json",
  success: function(data) {
    var cuentas = data; // declarar e inicializa la variable donde se almacenarán los productos
    if(cuentas.length===0){
      document.getElementById("tabla1").getElementsByTagName('tbody')[0].innerHTML="<tr><td colspan='9' style='text-align:center;'>Agregue un producto</td></tr>";
    } else{
    let cTotal=0;
    let cPagado=0;
    cuentas.forEach(cuenta => {
      let total= (cuenta.valor*cuenta.cantidad)-cuenta.descuento_valor;
      let pago=0
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
  },
  error: function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus, errorThrown);
  }
});
}

//función para reducir en 1 las cantidades
function resta(bandera,cuenta) {
if (bandera===1) {//verifica si reduce la cantidad
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
        console.log(response);
        pintarProductos();
      },
      error: function(xhr, status, error) {
        console.log("Error al ingresar producto: " + error);
      }
    }
    ) 
}
else if (bandera===0) { //verifica si reduce el porcentaje
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
      console.log(response);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }
  });

}
//pinta todas las mesas activas
function mesas_Activas() {
  document.getElementById("cuentas").getElementsByTagName('tbody')[0].innerHTML = "";//limpia la tabla antes de traer los datos
  $.ajax({
    type: "GET",
    url: "conexionVentas.php",
    dataType: "json",
    success: function(data) {
      var cuentas = data; // declarar e inicializa la variable productos aquí
      cuentas.forEach(cuenta => {
          if (cuenta.eliminado === "0" && cuenta.estado==="0" ) {
              var row = "<tr><td onclick='detalleCuenta(" + JSON.stringify(cuenta)+")'>" + cuenta.nombre_cliente + "</td><!--<td>" + formatoMoneda(cuenta.total) + "</td><td>" + formatoMoneda(cuenta.saldo_pendiente) + "</td>--><td style='text-align:center'><button onclick='detalleCuenta(" + JSON.stringify(cuenta)+")' type='button' class='icono'><i class='fa-solid fa-eye'></i></button> <button data-bs-toggle='modal' data-bs-target='#staticBackdrop' type='button' class='icono'  onclick='modalPagocuentaTotal("+1+"," + JSON.stringify(cuenta)+")' ><i class='fa-solid fa-cash-register'></i></button> <button type='button' class='icono'><i class='fa-solid fa-trash'></i></button> </td></tr>";
              document.getElementById("cuentas").getElementsByTagName('tbody')[0].innerHTML += row;
            }
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }
  });
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
  $.ajax({//realiza la consulta en la BD para traer los productos con el id de la cuenta
    type: "POST",
    url: "conexionDetalleCuenta.php",
    data: {
      id_cuenta:cuenta.id_cuenta
    },
    dataType: "json",
    success: function(data) {
      var cuentas = data; // declarar e inicializa la variable donde se almacenarán los productos
      let cTotal=0;
      let tRecaudo=0
      let seleccionados = [];
      cuentas.forEach(cuenta => {
        let total= (cuenta.valor*cuenta.cantidad)-cuenta.descuento_valor;
        if (cuenta.eliminado === "0" && cuenta.pagado==="0") {
             var row = "<tr><td><input class='form-check-input' type='checkbox'id='flexCheckDefault'></td><td>" + cuenta.nombre_producto + "</td><td style='text-align:center'>" + cuenta.cantidad + "</td><td style='text-align:center'>" + formatoMoneda(cuenta.valor) +"</td><td style='text-align:center'>"+ formatoMoneda(cuenta.descuento_valor) +"</td><td style='text-align:center'>" + cuenta.descuento_porc + "</td><td style='text-align:center'>"+ formatoMoneda(total) +"</td></tr>";
             document.getElementById("detalleCuenta").getElementsByTagName('tbody')[0].innerHTML += row;
             cTotal+=total
           }
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
          })
        }
        document.getElementById("totalCuenta").value=formatoMoneda(cTotal);
        document.getElementById("totalPendiente").value= formatoMoneda(cTotal)
      });
    });
     //funciones que se ejecutan cuando se ingresa un valor en el efectivo o en transferencia
     let tdevolver=0
     inputRecaudo1.addEventListener("input",function () {
      cantidades= detallePago(cTotal,tdevolver)
        console.log(cantidades)
    })
    inputRecaudo2.addEventListener("input",function () {
      cantidades= detallePago(cTotal,tdevolver)
      console.log(cantidades)
    }) 
    }})} //código para pago de un solo producto
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
  cantidades.cTotal=cTotal;
  document.getElementById("totalRecaudo").value= formatoMoneda(tRecaudo)
  document.getElementById("totalPendiente").value= formatoMoneda(tPendiente)
  document.getElementById("TotalDev").value=formatoMoneda(tdevolver)
  return cantidades
}

 async function Pago() {
  let insertar = resultado;
  if(insertar.length>0){
    if ((insertar[0].cantidades.efectivo + insertar[0].cantidades.transferencia)<insertar[0].cantidades.cTotal) {
      swal("","El recaudo no puede ser menor a la cantidad total","error");
    }else {
     await insertarPago(insertar);
     await  pagoDetalleCuenta(insertar);

    }
  } else {
    swal("","Debe ingresar un pago.","error");
  }
}

async function insertarPago(resultado) {
  let accion='insertarPago'
  $.ajax({//realiza la consulta en la BD para traer los productos con el id de la cuenta
    type: "POST",
    url: "conexionPago.php",
    data: {
      accion:accion,
      id_cuenta:resultado[0].cuenta.id_cuenta,
      id_detallecuenta:resultado[0].cuenta.id_registro,
      pago_efectivo:resultado[0].cantidades.efectivo,
      pago_transferencia:resultado[0].cantidades.transferencia,
      totalcuenta:resultado[0].cantidades.cTotal,
      devuelta:resultado[0].cantidades.tdevolver
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
  $.ajax({//realiza la consulta en la BD para traer los productos con el id de la cuenta
    type: "POST",
    url: "conexionPago.php",
    data: {
      accion:accion,
      id_registro:resultado[0].cuenta.id_registro,
      valorPagado:resultado[0].cantidades.cTotal
    },
    success: function(response) {
      console.log(response);
      swal({
        text: "el pago ha sido procesado",
        icon: "success",
        button: false,
        timer: 2000,
      }).then(() => {
        window.location.reload();
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
      swal("","Error al insertar el pago.","error");
    }
  });
}
window.onload = onLoad;
