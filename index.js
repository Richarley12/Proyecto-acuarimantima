
function autenticarse() {
    let usuario= document.getElementById("usuario").value
    let clave= document.getElementById("clave").value
    $.ajax({
        type: "POST",
        url:"autenticacion.php",
        data:{
            usuario: usuario,
            contrasena:clave
        },
        dataType: "json",
        success: function(data){
            console.log(data)
            if (data.usuario!=null
                ) {
                    console.log(data)
                    swal({
                        title: "Bienvenido "+ data.nombre,
                        text: data.mensaje,
                        icon: "success",
                      }).then(()=>{
                       sessionStorage.setItem('id',data.id_)
                        window.location.href= './Turnos/turnos.php'
                      })
            }else{
                swal({
                    title: "Ups algo salió mal",
                    text: data.mensaje,
                    icon: "info",
                  })
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
          }
    })

   
}