let agregarfila1=document.getElementById("btnAdd1")
let tabla1= document.getElementById("tabla1")
let detalleGasto=[]

function limpiar() {
    document.getElementById("producto").value="";
    document.getElementById("cantidad").value="";
    document.getElementById("valorxUn").value="";
    detalleGasto=[]
}


agregarfila1.addEventListener("click",function () {
    agregarfila(tabla1);
  })


  function agregarfila() {
    var select = document.getElementById("producto").value;
    let cantidad=document.getElementById("cantidad").value;
    let ValorxUn=document.getElementById("valorxUn").value;
    let total= parseInt(cantidad)*parseInt(ValorxUn)
    // let result=productos.find(function(producto) {
    //   return (producto.nombre.trim()==select.trim())
    //   });
    
    if (select==="") {
      swal("","Debe ingresar un producto.","error");
    } else {
        detalleGasto.push({
            producto:select,
            cantidad:parseInt(cantidad),
            ValorxUn:parseInt(ValorxUn),
            total:total
        })
    // let cantidad=1
    // let accion='insertarGasto';
    // $.ajax({
    //   type:"POST",
    //   url:".php",
    //   data:{
    //     accion:accion,
    //     observacion_gasto:observacion_gasto,
    //     valor:valor,
    //     producto:nombreGasto,
    //     metodo:metodo,
    //     fecha:fechaHoraActual
    //   },
    //   success: function(response) {
    //       pintarProductos();
    //     },
    //     error: function(xhr, status, error) {
    //       console.log("Error al ingresar producto: " + error);
    //     }
    //   })
    }
    console.log(detalleGasto)
    pintarDetalleGasto(detalleGasto)
    document.getElementById("producto").value="";
    document.getElementById("cantidad").value="";
    document.getElementById("valorxUn").value="";

  };

  async function pintarDetalleGasto(detalleGasto){
    document.getElementById("tabla1").getElementsByTagName('tbody')[0].innerHTML=""
    let i=1
    detalleGasto=detalleGasto
    if (detalleGasto==[]) {
        document.getElementById("tabla1").getElementsByTagName('tbody')[0].innerHTML="<tr><td colspan='9' style='text-align:center;'>Agregue un producto</td></tr>";
    }else{
        detalleGasto.forEach(detalle => { 
           let row = "<tr><td>"+ i + "</td><td>"+detalle.producto+"</td><td colspan='2' style='text-align:center'>"+detalle.cantidad+"</td><td colspan='2' style='text-align:center'>"+detalle.ValorxUn+"</td><td colspan='2' style='text-align:center'>"+detalle.total+"</td><td></td></tr>"
            document.getElementById("tabla1").getElementsByTagName('tbody')[0].innerHTML+= row
            i++
        });
    }
  }

