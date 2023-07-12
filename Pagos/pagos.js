function formato_Fecha(fechaString) {
    const fecha = new Date(fechaString);
  
    const opcionesFormato = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    };

    return fecha.toLocaleDateString('es-CO', opcionesFormato);
}
function formatoMoneda(valor) {
    let formatted = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(valor);
  return formatted.replace(/(\.|,)00$/g, "");
  }

function traer_pagos() {
    return new Promise((resolve,reject)=>{
        $.ajax({
            type:"POST",
            datatype:"json",
            url:"../Pagos/traePagos.php",
            data:{
                accion:'traer_pagos'
            },success:function (data) {                
            resolve(data)
            },error:((xhr,status,error)=>{
                reject(error)
            })
        })
    })
}

$(document).ready(function() {
   limpiar()
})

async function pintar_pagos(pagos) {
    document.getElementById('tabla').getElementsByTagName('tbody')[0].innerHTML=""
    pagos.forEach(pago => {
        var row = "<tr><td>"+ formato_Fecha(pago.fecha)+"</td><td>"+pago.nombre_cliente+"</td><td>"+ formatoMoneda(pago.total_cuenta)+"</td><td>"+pago.responsable+"</td>"
        if (pago.pago_efectivo==="0") {
            row+= "<td>Transferencia</td>"
        }else{
            row+= "<td>Efectivo</td>"
        }
        row += "</tr>"
        document.getElementById('tabla').getElementsByTagName('tbody')[0].innerHTML+=row
    });
}

function filtrar() {
    let metodo=document.getElementById("m_Pago").value
    let f_Inicio=document.getElementById('fechaInicio').value
    let f_Fin=document.getElementById('fechaFin').value
    let filtrado=[]
    traer_pagos().then((pagos)=>{
        if (metodo==""&&f_Inicio==""&&f_Fin=="") {
            swal({
                text: "no ha seleccionado ningun filtro",
                icon: "info"})
        }else{
            filtrado=pagos
            if (metodo=="Efectivo") {
                filtrado=filtrado.filter((pago)=>{
                    return pago.pago_transferencia=="0"
                })
            }else if (metodo=="Transferencia") {
                filtrado=filtrado.filter((pago)=>{
                    return pago.pago_efectivo=="0"
                })
            } if (f_Inicio!="") {
                if (f_Fin!="") {
                    if (f_Inicio>f_Fin) {
                        swal({
                            text: "La fecha inicial no puede ser mayor que la final",
                            icon: "info"})
                    }else{
                        filtrado=filtrado.filter((pago)=>{
                            return pago.fecha>=f_Inicio && pago.fecha<=f_Fin
                        })
                    }
                }else{
                    swal({
                        text: "Seleccione una fecha final",
                        icon: "info"})
                }
            } else if(f_Fin!=""){
                swal({
                    text: "Seleccione una fecha inicial",
                    icon: "info"})
            }
            pintar_pagos(filtrado)
        }
    })
}

function limpiar() {
    document.getElementById("input-buscador").value=""
    document.getElementById("m_Pago").value=""
    document.getElementById('fechaInicio').value=""
    document.getElementById('fechaFin').value=""
    traer_pagos().then((data)=>{
        let pagos = data
        pintar_pagos(pagos)
    }
    )
}