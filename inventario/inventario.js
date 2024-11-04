function limpiar() {
    document.getElementById('tabla').style.display="none"
    document.getElementById('titulo').innerHTML=''
    document.getElementById('fechaInicio').value=''
    document.getElementById('fechaFin').value=''
    document.getElementById("tabla").getElementsByTagName('tbody')[0].innerHTML=""
    document.getElementById('fechaInicio').disabled=false
    document.getElementById('fechaFin').disabled=false
    document.getElementById('flexSwitchCheckDefault').checked=false
}

$(document).ready(function() {
    limpiar()
    // $('#tabla').DataTable();

 })

 let check= document.getElementById('flexSwitchCheckDefault')



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

function traer_salidas(fechainicio,fechafin) {
    return new Promise((resolve,reject)=>{
        $.ajax({
            type:"POST",
            datatype:"json",
            url:"../inventario/traerInventario.php",
            data:{
                accion:'salidas',
                fechainicio:fechainicio,
                fechafin:fechafin
            },success:function (data) {
                let salidas=data
                salidas.forEach(salida => {
                    var row = "<tr><td style='text-align:center'>" + formato_Fecha(salida.fecha) + "</td><td style='text-align:center'>" + salida.numero_turno + "</td><td>" + salida.nombre_producto + "</td><td style='text-align:center'>" + salida.cantidad + 
                    "</td></tr>";
                    document.getElementById("tabla").getElementsByTagName('tbody')[0].innerHTML += row;
            });               
            resolve('Éxito en la consulta')
            },error:((xhr,status,error)=>{
                reject(error)
            })
        })
    })
}

function salidas() {
    document.getElementById('titulo').innerHTML='Salidas'
    
}

check.addEventListener("click",() =>{
    if (check.checked===true) {
        document.getElementById('fechaInicio').disabled=true
        document.getElementById('fechaFin').disabled=true
        document.getElementById('fechaInicio').value="2021-01-01"
        document.getElementById('fechaFin').value= new Date().toISOString().split("T")[0];
    } else{
        document.getElementById('fechaInicio').disabled=false
        document.getElementById('fechaFin').disabled=false
        document.getElementById('fechaInicio').value=""
        document.getElementById('fechaFin').value= "";
    }
}) 

function pintar() {
    if (document.getElementById('titulo').innerHTML=='Salidas') {
        fechainicio=document.getElementById('fechaInicio').value
        fechafin=document.getElementById('fechaFin').value
       

        if (fechainicio==""||fechafin=="") {
            swal({
                text: "No ha seleccionado un filtro válido",
                icon: "info"})
        }else if(fechainicio>fechafin) {
            swal({
                text: "La fecha inicial no puede ser mayor que la final",
                icon: "info"})
        }else{
            document.getElementById('tabla').style.display=""
            document.getElementById("tabla").getElementsByTagName('tbody')[0].innerHTML=""
            traer_salidas(fechainicio,fechafin).then((mensaje)=>{
                swal({
                    text: mensaje,
                    icon: "success"})
                var modal = document.getElementById("staticBackdrop");
                var modalBS = bootstrap.Modal.getInstance(modal);
                modalBS.hide();
            })
        }
    }
}