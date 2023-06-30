
$(document).ready(function () {
    limpiar()
    consulta_clientes()
})

function guardar() {
    let nombre=document.getElementById("nombreCompleto").value
    let telefono=document.getElementById("telefono").value
    let id= document.getElementById("id_cliente").value
    if (nombre===""||telefono==="") {
        swal({
            text: "Debe completar todos los datos",
            icon: "error",
            button: false,
            timer: 2000,})
    } else{
        if(id!=""){
            $.ajax({
                type:'POST',
                url:"../clientes/clientesConexion.php",
                data:{
                    accion:'editar_cliente',
                    nombre:nombre,
                    telefono:telefono,
                    id_cliente:id
                },
                success:function (response) {
                    swal({
                        text: response.mensaje,
                        icon: "success",
                        button: false,
                        timer: 2000,
                      }).then(() => {
                        window.location.reload();
                      });
                },error: function(xhr, status, error) {
                    console.log("Error al eliminar producto: " + error);
                    swal("","falló el guardado","warning");
                  }
            }) 
         }
     else {
        $.ajax({
            type:'POST',
            url:"../clientes/clientesConexion.php",
            data:{
                accion:'guardar_Cliente',
                nombre:nombre,
                telefono:telefono
            },
            success:function (response) {
                swal({
                    text: response.mensaje,
                    icon: "success",
                    button: false,
                    timer: 2000,
                  }).then(() => {
                    window.location.reload();
                  });
            },error: function(xhr, status, error) {
                console.log("Error al eliminar producto: " + error);
                swal("","falló el guardado","warning");
              }
        })
     } 
    }
} 

function limpiar() {
    document.getElementById("nombreCompleto").value=""
    document.getElementById("telefono").value=""
    document.getElementById("id_cliente").value=""
}

function consulta_clientes() {
    $.ajax({
        type:'POST',
        url:"../clientes/clientesConexion.php",
        data:{accion:'traer_clientes'},
        success:(function (response) {
            let clientes=response
            i=1
            clientes.forEach(cliente => {
                let row = "<tr><td>"+i +"</td><td>" +cliente.nombre_cliente+ "</td><td style='text-align:center'>" +cliente.telefono+ "</td><td style='text-align:center';'><button data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='editar_Cliente(" + JSON.stringify(cliente)+")'  data-bs-target='#staticBackdrop' type='button' class='icono'><i class='fa-solid fa-pencil'></i></button> <button class='icono' onclick='eliminar_cliente(" + JSON.stringify(cliente) + ")' ><i class='fa-solid fa-trash'></i></button></td></tr>"
                document.getElementById("tablaClientes").getElementsByTagName('tbody')[0].innerHTML += row;
                i++
            });
        })
    })
}

function editar_Cliente(cliente) {
    document.getElementById("nombreCompleto").value=cliente.nombre_cliente
    document.getElementById("telefono").value=cliente.telefono
    document.getElementById("id_cliente").value=cliente.id_cliente
   
}

function eliminar_cliente(cliente) {
    swal({
        title: "¿Estas seguro que quieres eliminar a "+cliente.nombre_cliente+"?",
        text: "Una vez eliminado, no podrás recuperarlo sin llamar a Richar!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
    $.ajax({
        type:'POST',
        url:"../clientes/clientesConexion.php",
        data:{
            accion:'eliminar_cliente',
            id_cliente:cliente.id_cliente
        },
        success:function (response) {
            swal({
                text: response.mensaje,
                icon: "success",
                button: false,
                timer: 2000,
              }).then(() => {
                window.location.reload();
              });
        },error: function(xhr, status, error) {
            console.log("Error al eliminar cliente: " + error);
            swal("","falló la eliminación","warning");
          }
    })}else{
        swal({
          text:"¡Tu cliente está a salvo!",
          icon: "success",
          button: false,
          timer: 1500,
        }
         );
      }
    });
  }