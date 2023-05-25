function formatoMoneda(valor) {

    let formatted = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(valor);
  return formatted.replace(/(\.|,)00$/g, "");
  }

function saldos(fecha_inicio) {
  return new Promise(function(resolve, reject) {
    let pagos = { efectivo: 0, transferencia: 0 };
    console.log(fecha_inicio)
    $.ajax({
      type: "POST",
      url: "traersaldos.php",
      datatype: "json",
      data: {
        fecha_inicio: fecha_inicio
      },
      success: function(data) {
        console.log(data)
        let cuentas = data;
        let efectivo = 0;
        let transferencia = 0;
        cuentas.forEach(function(cuenta) {
          efectivo += parseInt(cuenta.pago_efectivo) - parseInt(cuenta.devuelta);
          transferencia += parseInt(cuenta.pago_transferencia);
        });
        
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
    // realizo la consulta para mirar si el turno está abierto o cerrado y según esto cambia el valor del boton y modal para apertura o cierre
   traer_turnos()
   .then(function(data) {
    console.log(data)
    let ultimo_turno
    if (data.length>1) {
      ultimo_turno= data[data.length - 1]
    }else {
      ultimo_turno= data[0]
    }
    console.log(ultimo_turno)
    if (data==='null'|| ultimo_turno.fecha_fin!==null) {
      document.getElementById('boton_modal').innerHTML="Abrir turno"
      document.getElementById('apertura').style.display=''
      document.getElementById('cierre').style.display='none'
      document.getElementById('resumen_turno').style.display='none'
      document.getElementById('ventas_transferencia').innerHTML= formatoMoneda(0)
        document.getElementById('ventas_efectivo').innerHTML= formatoMoneda(0)
        document.getElementById('total').innerHTML=formatoMoneda((0))
        document.getElementById('inicio_en_caja').innerHTML= formatoMoneda(0)
    }else {
       console.log(ultimo_turno);
      document.getElementById('boton_modal').innerHTML="Cerrar turno"
      document.getElementById('apertura').style.display='none'
      document.getElementById('cierre').style.display=''
      document.getElementById('resumen_turno').style.display='none'
      document.getElementById('inicio_en_caja').innerHTML= formatoMoneda(ultimo_turno.saldo_inicial)
      saldos(ultimo_turno.fecha_inicio)
      .then(function(pagos) {
        console.log();
        document.getElementById('ventas_transferencia').innerHTML= formatoMoneda(pagos.transferencia)
        document.getElementById('ventas_efectivo').innerHTML= formatoMoneda(pagos.efectivo)
        let total= parseInt(ultimo_turno.saldo_inicial)+ parseInt(pagos.efectivo)+parseInt(pagos.transferencia)
        document.getElementById('total').innerHTML=formatoMoneda(total)
      })
      .catch(function(error) {
        console.log(error);
      });
    }
    pintarTurnos(data)
   })
   .catch(function(error) {
    console.log(error);
  })
  });

  function ver_turno() {

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

  function abrir_turno() {
    encargado= document.getElementById('encargado').innerHTML
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
             window.location.reload();
            });
        },
        error: function(xhr, status, error) {
          console.log("Error al eliminar producto: " + error);
        }
  }
  )
    
  }
function pintarTurnos(data) {
  let turnos= data

  turnos.forEach(turno=>{
    if (turno.fecha_fin!==null) {
      total= parseInt(turno.saldo_inicial)+ parseInt(turno.pagos_efectivo)+parseInt(turno.pago_transferencia)
    totalventas= parseInt(turno.pagos_efectivo)+parseInt(turno.pago_transferencia)
    var row="<tr><td>"+turno.id_turno+"</td><td>"+turno.encargado+"</td><td style= 'width:10%; text-align:center'>"+formatoMoneda(totalventas)+"</td><td style= 'width:10%; text-align:center'>"+formatoMoneda(0)+"</td><td style= 'width:10%; text-align:center'>"+formatoMoneda(turno.saldo_inicial)+"</td><td style= 'width:20%; text-align:center'>"+turno.fecha_inicio+"</td><td style= 'width:20%; text-align:center'>"+turno.fecha_fin+"</td><td style= 'width:10%; text-align:center'>"+ formatoMoneda(total)+"</td><td><button onclick='ver_Turno(" + JSON.stringify(turno)+")' type='button' class='icono'><i class='fa-solid fa-eye' data-bs-toggle='modal' data-bs-target='#staticBackdrop'></td></tr>";
    document.getElementById("tablaTurnos").getElementsByTagName('tbody')[0].innerHTML += row;
    }
  })
}
