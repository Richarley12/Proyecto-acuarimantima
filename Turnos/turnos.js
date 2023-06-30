var turnoC=[]
function formatoMoneda(valor) {

    let formatted = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(valor);
  return formatted.replace(/(\.|,)00$/g, "");
  }


  function entero(numero) {
     let dato =numero.replace("$", "").replace(".", "");
     return dato
  }

function saldos(fecha_inicio) {
  return new Promise(function(resolve, reject) {
    let pagos = { efectivo: 0, transferencia: 0 };
    $.ajax({
      type: "POST",
      url: "traersaldos.php",
      datatype: "json",
      data: {
        fecha_inicio: fecha_inicio
      },
      success: function(data) {
        let cuentas = data;
        let efectivo = 0;
        let transferencia = 0; 
        if(data!=null){
          cuentas.forEach(function(cuenta) {
            efectivo += parseInt(cuenta.pago_efectivo) - parseInt(cuenta.devuelta);
            transferencia += parseInt(cuenta.pago_transferencia);
          });
        }     
        pagos = { efectivo: efectivo, transferencia: transferencia };
        resolve(pagos);
      },
      error: function(xhr, status, error) {
        reject(error);
      }
    });
  });
}

//función que se carga antes de cargar la página define el valor del botón y si hay o no turnos abiertos
  document.addEventListener('DOMContentLoaded', function() {
    let encargado=sessionStorage.getItem('id')
    if (encargado===null) {
      window.location.href='../index.html'
    }
    // realizo la consulta para mirar si el turno está abierto o cerrado y según esto cambia el valor del boton y modal para apertura o cierre
   traer_turnos()
   .then(function(data) {
    let ultimo_turno
    if (data.length>1) {
      ultimo_turno= data[data.length - 1]
    }else {
      ultimo_turno= data[0]
    }
    if (data.length===0 ||ultimo_turno.fecha_fin!==null) {
      
      document.getElementById('boton_modal').innerHTML="Abrir turno"
      document.getElementById('apertura').style.display=''
      document.getElementById('cierre').style.display='none'
      document.getElementById('resumen_turno').style.display='none'
      document.getElementById('titulo').innerHTML="Apertura de turno"
      document.getElementById('ventas_transferencia').innerHTML= formatoMoneda(0)
        document.getElementById('ventas_efectivo').innerHTML= formatoMoneda(0)
        document.getElementById('total').innerHTML=formatoMoneda((0))
        document.getElementById('inicio_en_caja').innerHTML= formatoMoneda(0)
    }else {
      document.getElementById('boton_modal').innerHTML="Cerrar turno"
      document.getElementById('apertura').style.display='none'
      document.getElementById('cierre').style.display=''
      document.getElementById('resumen_turno').style.display='none'
      document.getElementById('inicio_en_caja').innerHTML= formatoMoneda(ultimo_turno.saldo_inicial)
      document.getElementById('titulo').innerHTML="Cierre de turno"
      saldos(ultimo_turno.fecha_inicio)
      .then(function(pagos) {
        console.log();
        document.getElementById('ventas_transferencia').innerHTML= formatoMoneda(pagos.transferencia)
        document.getElementById('ventas_efectivo').innerHTML= formatoMoneda(pagos.efectivo)
        let total= parseInt(ultimo_turno.saldo_inicial)+ parseInt(pagos.efectivo)+parseInt(pagos.transferencia)
        document.getElementById('total').innerHTML=formatoMoneda(total)
        document.getElementById('efectivo_previsto').innerHTML=formatoMoneda(parseInt(pagos.efectivo)+parseInt(ultimo_turno.saldo_inicial))
      })
      .catch(function(error) {
        console.log(error);
      });
    }
    pintarTurnos(data)
   })
   .catch(function(error) {
    swal({
      title: "Ups algo salió mal",
      text: "Error en la base de datos",
      icon: "error",
    }).then(() => {
      console.log(error);
      window.location.href='../index.html'
    });
    
  })
  });

  function ver_turno(turno) {
      document.getElementById('apertura').style.display='none'
      document.getElementById('cierre').style.display='none'
      document.getElementById('resumen_turno').style.display=''
      document.getElementById('guardar').style.display= 'none'
      document.getElementById('titulo').innerHTML="Ver turno"
      document.getElementById('t_Encargado').innerHTML= turno.encargado
      document.getElementById('efectivo_inicial').innerHTML= formatoMoneda(turno.saldo_inicial)
      document.getElementById('t_Efectivoventas').innerHTML= formatoMoneda(turno.pagos_efectivo)
      document.getElementById('t_transferenciaventas').innerHTML= formatoMoneda(turno.pago_transferencia)
      document.getElementById('t_Efectivocierre').innerHTML= formatoMoneda(turno.efectivo_cierre)
      document.getElementById('f_inicio').innerHTML= turno.fecha_inicio
      document.getElementById('f_fin').innerHTML= turno.fecha_fin
      document.getElementById('tobs_apertura').value= turno.observacion_apertura
      document.getElementById('tobs_cierre').value= turno.observacion_cierre
     
  }

  function traer_turnos() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type:"POST",
        url:"traerturnos.php",
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

  function ejecutar_turno() {
    if (document.getElementById('boton_modal').innerHTML=="Abrir turno") {
      let encargado=sessionStorage.getItem('id')
      saldo_inicial= parseInt(document.getElementById('efectivo_en_caja').value)
      observacion_apertura= document.getElementById('observacion_apertura').value
      $.ajax({
        type:"POST",
        url:"conexionTurnos.php",
        data:{
            accion:'abrirturno',
            encargado:encargado,
            saldo_inicial: saldo_inicial,
            observacion_apertura:observacion_apertura
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
                window.location.href="../ventas/ventas.php"
              });
          },
          error: function(xhr, status, error) {
            console.log("Error al eliminar producto: " + error);
          }
    }
    )
    } else if (document.getElementById('boton_modal').innerHTML=="Cerrar turno") {
      traer_turnos()
      .then(
        function (data) {
          let ultimo_turno
    if (data.length>1) {
      ultimo_turno= data[data.length - 1]
    }else {
      ultimo_turno= data[0]
    }
    saldos(ultimo_turno.fecha_inicio)
    .then(function (pagos) {
      let ventas_efectivo= pagos.efectivo
      let efectivo_previsto=parseInt(pagos.efectivo)+parseInt(ultimo_turno.saldo_inicial)
      let ventas_transferencia= pagos.transferencia
      let total=parseInt(ultimo_turno.saldo_inicial)+ parseInt(pagos.efectivo)+parseInt(pagos.transferencia)
      let efectivo_cierre= document.getElementById('previsto').value
      // let egresos_efectivo=0
      // let egresos_transferencia=0
      let observacion_cierre= document.getElementById('observaciones_cierre').value
      console.log(ultimo_turno.id_turno)
      $.ajax({
        type:"POST",
        url:"conexionTurnos.php",
        data:{
          accion:"cerrarturno",
          id_turno:ultimo_turno.id_turno,
          ventas_efectivo:ventas_efectivo,
          ventas_transferencia:ventas_transferencia,
          total:total,
          efectivo_cierre:efectivo_cierre,
          // egresos_efectivo:egresos_efectivo,
          // egresos_transferencia:egresos_transferencia,
          observacion_cierre:observacion_cierre},
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
          }
        })
  
    })
        }
      )
    }
    
  }
function pintarTurnos(data) {
  let turnos= data

  turnos.forEach(turno=>{
    if (turno.fecha_fin!==null) {
      total= parseInt(turno.saldo_inicial)+ parseInt(turno.pagos_efectivo)+parseInt(turno.pago_transferencia)
    totalventas= parseInt(turno.pagos_efectivo)+parseInt(turno.pago_transferencia)
    var row="<tr><td>"+turno.id_turno+"</td><td>"+turno.encargado+"</td><td style= 'width:10%; text-align:center'>"+formatoMoneda(totalventas)+"</td><td style= 'width:10%; text-align:center'>"+formatoMoneda(0)+"</td><td style= 'width:10%; text-align:center'>"+formatoMoneda(turno.saldo_inicial)+"</td><td style= 'width:20%; text-align:center'>"+turno.fecha_inicio+"</td><td style= 'width:20%; text-align:center'>"+turno.fecha_fin+"</td><td style= 'width:10%; text-align:center'>"+ formatoMoneda(total)+"</td><td><button onclick='ver_turno(" + JSON.stringify(turno)+")' type='button' class='icono'><i class='fa-solid fa-eye' data-bs-toggle='modal' data-bs-target='#staticBackdrop'></i></button></td></tr>";
    document.getElementById("tablaTurnos").getElementsByTagName('tbody')[0].innerHTML += row;
    }
  })
}
function abrir_cerrar() {
  if (document.getElementById('boton_modal').innerHTML=="Abrir turno"){
    document.getElementById('apertura').style.display=''
    document.getElementById('cierre').style.display='none'
    document.getElementById('resumen_turno').style.display='none'
    document.getElementById('titulo').innerHTML="Apertura de turno"
    document.getElementById('guardar').style.display= ''
  }else if (document.getElementById('boton_modal').innerHTML=="Cerrar turno") {
    document.getElementById('boton_modal').innerHTML="Cerrar turno"
    document.getElementById('apertura').style.display='none'
    document.getElementById('cierre').style.display=''
    document.getElementById('resumen_turno').style.display='none'
    document.getElementById('guardar').style.display= ''
  }
}