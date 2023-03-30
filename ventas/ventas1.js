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


btnbuscar.addEventListener("click",function () {
  var select = document.getElementById("idCliente").textContent;
//let valor=1;
/*let valor=productos.find(function(producto) {
return (producto.nombre==select)
});*/

  console.log("click al boton:" + select)
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

// Función de callback que se ejecuta después de que se carga la página
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

function agregarfila(tabla) {
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

function handleInputChange(event,cuenta) {
  // Accede al valor actual del input
  let key = event.keyCode || event.charCode;
  if (key === 8 || key === 46 ||event.target.value === '') {
    event.preventDefault();
    return false;

  }else{
  let cantidad = parseInt(event.target.value);
  accion="cambiarCantidad";
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


  console.log(value,cuenta);
    pintarProductos();
    
  }
}
/*
function agregar_Mesa(cuenta) {
 
  // Obtener el valor del nombre
  var nombre = document.getElementById("Nombre").value

  // Crear las celdas de la nueva fila
  let tdNombre = document.createElement("td");
  tdNombre.textContent = nombre;
  tdNombre.classList.add("text-center");

  let tdTotal = document.createElement("td");
  tdTotal.textContent = 2000; // Usar el valor adecuado
  tdTotal.classList.add("text-center");

  let tdEstado = document.createElement("td");
  tdEstado.textContent = 1000; // Usar el valor adecuado
  tdEstado.classList.add("text-center");

  let tdOpciones = document.createElement("td");

  // Crear la nueva fila y agregar las celdas
  let nuevaFila = document.createElement("tr");
  nuevaFila.appendChild(tdNombre);
  nuevaFila.appendChild(tdTotal);
  nuevaFila.appendChild(tdEstado);
  nuevaFila.appendChild(tdOpciones);

  // Obtener el tbody de la tabla o crear uno nuevo si no existe
  let tbody = cuenta.querySelector("tbody");
  if (!tbody) {
    tbody = document.createElement("tbody");
    cuenta.appendChild(tbody);
  }

  // Agregar la nueva fila al tbody
  tbody.appendChild(nuevaFila);
  document.getElementById("Nombre").value="";
}
*/

//Funcion para pintar todas las mesas activas
$(document).ready(function() {

  $.ajax({
    type: "GET",
    url: "conexionVentas.php",
    dataType: "json",
    success: function(data) {
      var cuentas = data; // declarar e inicializa la variable productos aquí
      cuentas.forEach(cuenta => {
          if (cuenta.eliminado === "0") {
              var row = "<tr><td>" + cuenta.nombre_cliente + "</td><td>" + formatoMoneda(cuenta.total) + "</td><td>" + formatoMoneda(cuenta.saldo_pendiente) + "</td><td><button onclick='detalleCuenta(" + JSON.stringify(cuenta)+")' data-bs-target='#staticBackdrop' type='button' class='icono'><i class='fa-solid fa-eye'></i></button> <button data-bs-toggle='modal' data-bs-target='#staticBackdrop' type='button' class='icono'><i class='fa-solid fa-cash-register'></i></button> <button data-bs-toggle='modal' data-bs-target='#staticBackdrop' type='button' class='icono'><i class='fa-solid fa-trash'></i></button> </td></tr>";
              document.getElementById("cuentas").getElementsByTagName('tbody')[0].innerHTML += row;
            }
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }
  });
});

function detalleCuenta(cuenta) {
document.getElementById("concepto").disabled=false;//habilita el input para escribir el producto
document.getElementById("Nombre_cliente").textContent=cuenta.nombre_cliente;//lleva el nombre de la cuenta al detalle
document.getElementById("idCliente").textContent=cuenta.id_cuenta;//lleva el id de la cuenta para el insert en el detalle

pintarProductos();

}

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
    cuentas.forEach(cuenta => {
      let total= (cuenta.valor*cuenta.cantidad)-cuenta.descuento_valor;
       if (cuenta.eliminado === "0") {
            var row = "<tr><td>" + cuenta.nombre_producto + "</td><td><input type='number' value='" + cuenta.cantidad + "' class=' form-control form-control--sm cantidad' oninput='handleInputChange(event," + JSON.stringify(cuenta)+")' style='text-align: center;'>" + "</td><td>" + formatoMoneda(cuenta.valor) +"</td><td>"+ formatoMoneda(cuenta.descuento_valor) +"</td><td><input type='number' value='"+cuenta.descuento_porc+"' class='form-control porcentaje' min='10' max='100' step='10' style='text-align: center;'>"+"</td><td>"+ formatoMoneda(total) +"</td>"+"<td></td>"+"<td></td></tr>";
            document.getElementById("tabla1").getElementsByTagName('tbody')[0].innerHTML += row;
          }
    })};
  },
  error: function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus, errorThrown);
  }
});
}

window.onload = onLoad;