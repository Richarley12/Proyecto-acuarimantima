 $(document).ready(function() {
  document.getElementById("administrativo").style.display=""
  return new Promise(function (resolve,reject) { 
    let id= sessionStorage.getItem('id')
    $.ajax({
      type: "GET",
      url: "../header/conexionHeader.php",
      dataType:"json",
      success: function (data) {
        usuarioactual= data.filter((usuario)=>usuario.id_usuario===id
        )
        if(usuarioactual[0].rol=="user"){
          document.getElementById("administrativo").style.display="none"
        }
        document.getElementById('nombre_usuario').innerHTML=usuarioactual[0].nombre
      },
      error:function (xhr,status,error) {
        swal({
          title:'Oops...',
          text:`${error}`,
          icon:'warning'
        })
      }
  })
    })
//     $('button[data-url]').on('click', function(event) {
//       event.preventDefault();
//       var url = $(this).data('url');
//       $.ajax({
//         url: url,
//         method: 'GET',
//         success: function(data) {
//           $('main').html(data);
//         },
//         error: function() {
//           alert('Error al cargar la página.');
//         }
//       });
//     });

  });

 function permisos() {
  
 }

 function traer_Usuario() {
  
 }