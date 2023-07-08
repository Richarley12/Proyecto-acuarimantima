

function limpiar() {
    document.getElementById('usuarioNuevo').value = ""
    document.getElementById('passwordNuevo').value = ""
    document.getElementById('nombreCompleto').value = ""
    document.getElementById('passwordNuevo').style.display = ""
    document.getElementById('id_editar').style.display = "none"
    document.getElementById('bandera').style.display = ""
}


$(document).ready(function () {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: "GET",
            url: "../header/conexionHeader.php",
            dataType: "json",
            success: function (data) {
                var usuarios = data;
                let i = 1 // declarar e inicializa la variable productos aquí
                usuarios.forEach(usuario => {
                    if (usuario.eliminado === "0") {
                        var row = "<tr><td>" + i + "</td><td>" + usuario.nombre + "</td><td style= 'text-align:center'>" + usuario.usuario + "</td><td style= 'text-align:center'>" + usuario.rol +
                            "</td><td style= 'text-align:center'> <button data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='editarUsuario(" + JSON.stringify(usuario) + ")' type='button' class='icono'><i class='fa-solid fa-pencil'></i></button> <button class='icono' onclick='eliminarUsuario(" + JSON.stringify(usuario) + ")' ><i class='fa-solid fa-trash'></i></button></td></tr>";
                        document.getElementById("tablaClientes").getElementsByTagName('tbody')[0].innerHTML += row;
                        i++
                    }
                });
            },
            error: function (xhr, status, error) {
                swal({
                    title: 'Oops...',
                    text: `${error}`,
                    icon: 'warning'
                })
            }
        })
    })
});

function guardar() {
        let nombre = document.getElementById('nombreCompleto').value
        let rol = document.getElementById('rol').value
        let usuario = document.getElementById('usuarioNuevo').value
    if (document.getElementById('bandera').style.display == "none") {
        let id_usuario= document.getElementById('id_user').value
    if (nombre === "" || usuario === "") {
        swal({
            title: "Todos los campos son obligatorios",
            icon: "warning"
        })} else {return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "../usuarios/conexionUsuarios.php",
                data: {
                    id_usuario:id_usuario,
                    nombre: nombre,
                    rol: rol,
                    usuario: usuario,
                    accion: "editar_Usuario"
                },
                dataType: "json",
                success: function (data) {
                    mensaje = data.mensaje
                    icon = "success"
                    resolve(alerta(mensaje, icon))
                }, error: (function (error) {
                    console.log(error)
                    mensaje = "No se pudo completar la tarea, consulte la consola"
                    icon = "warning"
                    reject(alerta(mensaje, icon))
                })
            })
        })
    }
    } else{
    let contraseña = document.getElementById('passwordNuevo').value
    if (nombre === "" || contraseña === "" || usuario === "") {
        swal({
            title: "Todos los campos son obligatorios",
            icon: "warning"
        }).then(()=>{
            limpiar()
        })
    } else {

        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "../usuarios/conexionUsuarios.php",
                data: {
                    nombre: nombre,
                    contraseña: contraseña,
                    rol: rol,
                    usuario: usuario,
                    accion: "guardar_Usuario"
                },
                dataType: "json",
                success: function (data) {
                    mensaje = data.mensaje
                    icon = "success"
                    resolve(alerta(mensaje, icon))
                }, error: (function (error) {
                    mensaje = error
                    icon = "warning"
                    reject(alerta(mensaje, icon))
                })
            })
        })
    }}
}

function alerta(mensaje, icon) {
    swal({
        title: `${mensaje}`,
        icon: icon
    }).then(() => {
        window.location.reload();
      });
}

function eliminarUsuario(usuario) {
    id = usuario.id_usuario
    swal({
        title: "¿Estas seguro que quieres eliminar a " + usuario.nombre + "?",
        text: "Una vez eliminado, no podrás recuperarlo sin llamar a Richar!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    type: "POST",
                    url: "../usuarios/conexionUsuarios.php",
                    data: {
                        id_usuario: id,
                        accion: "eliminar_Usuario"
                    },
                    dataType: "json",
                    success: function (data) {
                        mensaje = data.mensaje
                        icon = "success"
                        resolve(alerta(mensaje, icon))
                    }, error: (function (error) {
                        mensaje = error
                        icon = "warning"
                        reject(alerta(mensaje, icon))
                    })
                })
            })
        }
    })
}

function editarUsuario(usuario) {
    limpiar()

    document.getElementById('id_editar').style.display = ""
    document.getElementById('id_user').value = usuario.id_usuario
    document.getElementById('bandera').style.display = "none"
    document.getElementById('usuarioNuevo').value = usuario.usuario
    document.getElementById('nombreCompleto').value = usuario.nombre
}
