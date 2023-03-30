function formatoMoneda(valor) {

  let formatted = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(valor);
return formatted.replace(/(\.|,)00$/g, "");
}
console.log("actualizado")

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
  let total=result.valor*cantidad;
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
        
  let tbody = tabla.querySelector('tbody');
  if (!tbody) {
    tbody = document.createElement('tbody');
    tabla.appendChild(tbody);
  }

    let nuevaFila = document.createElement('tr');

    let inputConcepto = document.createElement('input');
    inputConcepto.type = 'text';
    inputConcepto.classList.add('form-control');
    inputConcepto.setAttribute('disabled',true);
    inputConcepto.value= select;

    let inputCantidad = document.createElement('input');
    inputCantidad.type = 'number';
    inputCantidad.classList.add('form-control','cantidad');
    inputCantidad.value=cantidad;
    inputCantidad.setAttribute('oninput', 'handleInputChange(event)');
    inputCantidad.style.textAlign = 'center';

    let tdConcepto = document.createElement('td');
    tdConcepto.appendChild(inputConcepto);

    let tdCantidad = document.createElement('td');
    tdCantidad.style.textAlign = 'center';
    tdCantidad.appendChild(inputCantidad);
    

    let tdValor=document.createElement('td');
    tdValor.style.textAlign= 'center';

    let labelValor = document.createElement('label');
    labelValor.textContent=result.valor;
    tdValor.appendChild(labelValor);
    
    
    let tdDescvalor= document.createElement('td');
    tdDescvalor.style.textAlign='center';

    let labelDescvalor=document.createElement('label');
    tdDescvalor.appendChild(labelDescvalor);

    let inputDescporc= document.createElement('input')
    inputDescporc.type= 'number';
    inputDescporc.min= '10';
    inputDescporc.max= '100';
    inputDescporc.step= '10';
    inputDescporc.classList.add('form-control','porcentaje');
    inputDescporc.style.textAlign = 'center';
    

    let tdDescporc=document.createElement('td');
    tdDescporc.style.textAlign = 'center';
    tdDescporc.appendChild(inputDescporc);

    let labelTotal=document.createElement('label');
    labelTotal.textContent=total;

    let tdTotal=document.createElement('td');
    tdTotal.style.textAlign='center';
    tdTotal.appendChild(labelTotal)

    let tdOpciones=document.createElement('td');
    let tdVacio=document.createElement('td');
  // Agregar más celdas
  
  nuevaFila.appendChild(tdConcepto);
  nuevaFila.appendChild(tdCantidad);
  nuevaFila.appendChild(tdValor);
  nuevaFila.appendChild(tdDescvalor);
  nuevaFila.appendChild(tdDescporc);
  nuevaFila.appendChild(tdTotal);
  nuevaFila.appendChild(tdOpciones);
  nuevaFila.appendChild(tdVacio);
 // tbody.appendChild(nuevaFila)

  // Agregar más celdas según las necesidades de tu tabla

  tabla.appendChild(nuevaFila);
        
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
/*
function handleInputChange(event) {
  // Accede al valor actual del input
  let value = parseInt(event.target.value);
  
  console.log(value);
}*/
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
      console.log("trae datos")
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
document.getElementById("idCliente").textContent=cuenta.id_cuenta;
document.getElementById("tabla1").getElementsByTagName('tbody')[0].innerHTML = "";//limpia la tabla antes de traer los datos

$.ajax({
  type: "POST",
  url: "conexionDetalleCuenta.php",
  data: {
    id_cuenta:cuenta.id_cuenta
  },
  dataType: "json",
  success: function(data) {
    console.log("trae datos")
    
    var cuentas = data; // declarar e inicializa la variable productos aquí
    cuentas.forEach(cuenta => {
      let total= (cuenta.valor*cuenta.cantidad)-cuenta.descuento_valor;
        if (cuenta.eliminado === "0") {
            var row = "<tr><td>" + cuenta.nombre_producto + "</td><td>"+ cuenta.cantidad + "</td><td>" + formatoMoneda(cuenta.valor) +"</td><td>"+ formatoMoneda(cuenta.descuento_valor) +"</td><td>"+ cuenta.descuento_porc + "</td><td>"+ total +"</td></tr>";
            document.getElementById("tabla1").getElementsByTagName('tbody')[0].innerHTML += row;
          }
    });
  },
  error: function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus, errorThrown);
  }
});

}
window.onload = onLoad;