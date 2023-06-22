
function formatoMoneda(valor) {

    let formatted = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(valor);
  return formatted.replace(/(\.|,)00$/g, "");
  }

  //pinta la tabla de productos
  $(document).ready(function() {
    $.ajax({
      type: "GET",
      url: "pintarProductos.php",
      dataType: "json",
      success: function(data) {
        var productos = data; // declarar e inicializa la variable productos aquí
        productos.forEach(producto => {
            if (producto.eliminado === "0") {
                var row = "<tr><td>" + producto.id_producto + "</td><td>" + producto.nombre + "</td><td>" + formatoMoneda(producto.valor) + 
                "</td><td> <button data-bs-toggle='modal' onclick='editarProducto(" + JSON.stringify(producto)+")'  data-bs-target='#staticBackdrop' type='button' class='icono'><i class='fa-solid fa-pencil'></i></button> <button class='icono' onclick='eliminarProducto(" + JSON.stringify(producto) + ")' ><i class='fa-solid fa-trash'></i></button></td></tr>";
                document.getElementById("tabla").getElementsByTagName('tbody')[0].innerHTML += row;
              }
        });
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
      }
    });
  });

  
function eliminarProducto(producto) {  
  swal({
    title: "¿Estas seguro que quieres eliminar "+producto.nombre+"?",
    text: "Una vez eliminado, no podrás recuperarlo sin llamar a Richar!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      $.ajax({
        type: "POST",
        url: "conexionProductos.php",
        data: { accion:"eliminar",id_producto: producto.id_producto },
        success: function(response) {
         swal({
        text: response,
        icon: "success",
        button: false,
        timer: 2000,
      }).then(() => {
        window.location.reload();
      });
        },
        error: function(xhr, status, error) {
          console.log("Error al eliminar producto: " + error);
          swal("","falló la eliminación","warning");
        }
      });
    } else {
      swal({
        text:"¡Tu producto está a salvo!",
        icon: "success",
        button: false,
        timer: 1500,
      }
       );
    }
  });
   
}
function editarProducto(producto) {
    document.getElementById("codigo").value=producto.id_producto;
    document.getElementById("nombre").value=producto.nombre;
    document.getElementById("valor").value=producto.valor;
}
function limpiar() {
    document.getElementById("codigo").value="";
    document.getElementById("nombre").value="";
    document.getElementById("valor").value="";
}
function guardar() {
    let nombre=document.getElementById("nombre").value;
    if (nombre === "") {
        swal("","Debe ingresar un nombre.","error");
    return;
}
    let valor =document.getElementById("valor").value;
    if (valor === "") {
        swal("","Debe ingresar un valor.","error");
    return;
}
    let accion
    let id_producto= document.getElementById("codigo").value;

    if(id_producto>0){
        accion="guardarviejo"
    } else{
        accion="guardarnuevo" 
    }
    $.ajax({
        type:"POST",
        url:"conexionProductos.php",
        data:{
            accion:accion,
            id_producto: id_producto,
            nombre:nombre,
            valor:valor
        },
        success: function(response) {
            console.log(response);
            swal({
                text: response,
                icon: "success",
                button: false,
                timer: 1500,
              }).then(() => {
                $('#modal').modal('hide')
               window.location.reload();
              });
          },
          error: function(xhr, status, error) {
            console.log("Error al eliminar producto: " + error);
          }
    }
    )
}