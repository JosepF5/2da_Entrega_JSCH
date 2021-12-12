//------------------------------Declaracion de variables------------------------------
let productos=[]
/*
const cargarDatos = async () => {
    const resp = await fetch('..//js/productos.json')
    const data = await resp.json()

    productos = data
    mostrarProductos(productos)
    console.log("hola")
}

cargarDatos()
*/
$.get('..//js/productos.json', (resp) => {
    const data=resp
    productos = data
    console.log(productos)
    mostrarProductos(productos)
})
let cantidad
let compras=[]
let Tcompras=[]
let Gcompras=[]
let arrGcompras=[]
let flag=1
let flag1=0
let stringCompras=""
let totalPrecio=0

const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const selectFiltro = document.getElementById('talles')
const selectPrecios = document.getElementById('precios')

const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')

const carrito = JSON.parse(localStorage.getItem('Compras')) || []

actualizarCarrito()

function mostrarProductos(array) {
    /*
    contenedorProductos.innerHTML = ''

    array.forEach( (producto) => {
        const div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML = `
        <div class="col-sm-6 text-dark p-1 d-flex justify-content-center">
        <div class="card mb-5" style="max-width: 540px;">
          <div class="row g-0">
            <div class="col-md-4 d-flex align-items-center">
              <img src=${producto.img} class="img-fluid rounded-start " alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title titulo__Cartas">${producto.nombre}</h5>
                <p class="card-text"><small class="text-muted">$${producto.precioG}</small></p>
                <button type="button" class="boton-agregar btn btn-warning" onclick=agregarAlCarrito(${producto.id})>Agregar al Carrito</button>
              </div>
            </div>
          </div>
        </div>
        </div>
        `
        
        contenedorProductos.appendChild(div)
    } )
    */
    array.forEach((prod) => {
        $('#contenedor-productos').append(`
            <div class="col-sm-6 text-dark p-1 d-flex justify-content-center">
            <div class="card mb-5" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center">
                  <img src=${prod.img} class="img-fluid rounded-start " alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title titulo__Cartas">${prod.nombre}</h5>
                    <p class="card-text"><small class="text-muted">$${prod.precioG}</small></p>
                    <a href="#" class="btn btn-warning">Agregar al Carrito</a>
                  </div>
                </div>
              </div>
            </div>
            </div>
        `)
    })
}
//------------------------------Definicion de clase "Producto"------------------------------
class Producto{
    
    constructor(nombre,precio,stock,sFijo){
        this.nombre = nombre
        this.precio = precio
        this.stock = stock
        this.sFijo = sFijo
    } 
    restarStock(cantidad){
        this.stock-=cantidad
    }
    consultarStock(){
        alert("Quedan en stock "+this.stock+" unidades.")
    }
    calcularPrecio(cantidad){
        let total= this.precio*cantidad
        alert("El precio a pagar por su compra de "+this.nombre+" es de: "+total+ " soles.")
    }
    mostrarPrecio(cantidad){
        return this.precio*(this.sFijo-cantidad)
    }
}
//------------------------------COMPRAR--------------------------------------
function loadCompra(arrGcompraz){
    const h3 = $(`.advertisement`)
    let idProducto=1
    h3.addClass('titulo')
    //INTERACCION CON HTML
    if(arrGcompraz!=null){
        arrGcompraz.forEach( (prod) => {
            $('#productos').append(`
                <h3 class="titulo">${prod.nombre}</h3>
                <div id="info0${idProducto}" style="display:none">
                    <p>Precio: $${prod.precio}</p>
                    <p>Stock: ${prod.stock}</p>
                    
                </div>
                <button type="button" class="btn btn-primary btn-lg m-2" id="btn0${idProducto}Plus">+ Info</button>
                <button type="button" class="btn btn-primary btn-lg m-2" id="btn0${idProducto}Minus">- Info</button>
                <br>
            `)
            idProducto++
        })
    }
    for (let i = 1; i < idProducto; i++) {
        $('#btn0'+i+'Plus').click(()=>{
            $('#info0'+i).fadeIn(1000)
        })
        
        $('#btn0'+i+'Minus').click(()=>{
            $('#info0'+i).fadeOut(1000)
        })
    }
    for (let compra of compras) {
        stringCompras+=compra.nombre+" a "+compra.mostrarPrecio(compra.stock)+" soles."+"\n"
        totalPrecio+=parseFloat(compra.mostrarPrecio(compra.stock))
    }
    alert("Compraste: \n"+stringCompras+"\n El precio total a pagar es de: "+totalPrecio+" soles.") 
    compras=[]
}
function doCompra(){
    
    while(flag==0){
        //------------------------------Validar productos------------------------------
        flag1=prompt("Ingrese el nro del producto que desea llevar: (del 1 al 6)")
        while(flag1!=1 && flag1!=2 && flag1!=3 && flag1!=4 && flag1!=5 && flag1!=6){
            alert("Dato no válido. Intente nuevamente.")
            flag1=prompt("Ingrese el nro del producto que desea llevar: (del 1 al 6)")
        }
        //------------------------------Validar cantidad------------------------------
        cantidad=parseFloat(prompt("Ingrese la cantidad que desea llevar: "))
        while(cantidad>productos[flag1-1].precioG){
            alert("Dato no válido. Intente nuevamente.")
            cantidad=parseFloat(prompt("Ingrese la cantidad que desea llevar: "))
        }
        //------------------------------Declaracion de objeto------------------------------
        const producto1= new Producto(productos[flag1-1].nombre,productos[flag1-1].precioG,productos[flag1-1].stockG,productos[flag1-1].stockG)
        //------------------------------Añadir producto comprado al array------------------------------
        compras.push(producto1)
        Tcompras.push(producto1)
        //------------------------------Reporte de Salidad de Datos------------------------------
        producto1.restarStock(cantidad)
        producto1.consultarStock()
        producto1.calcularPrecio(cantidad)
        //------------------------------Reporte-PostCargado------------------------------

        //------------------------------ValidarCiclo------------------------------
        flag=prompt("Desea realizar otra compra¿? (1:NO 0:SI)")
        while(flag!=1 && flag!=0){
            alert("Dato no válido. Intente nuevamente.")
            flag=prompt("Desea realizar otra compra¿? (1:NO 0:SI)")
        }
    }
    let arrGcompraz=[]
    Gcompras=localStorage.getItem('Compras') //Guardar el arreglo provisionalmente en string
    arrGcompraz=JSON.parse(Gcompras) //Conventirlo el string a arreglo 
    //Guardar en el nuevo arreglo los objetos de la nueva consulta
    for (let producto of compras) {
        arrGcompraz.push(producto)
    }
    //Setearlo en el local storage
    localStorage.setItem('Compras',JSON.stringify(arrGcompraz))
    loadCompra(arrGcompraz);
}

function agregarAlCarrito(itemId) {

    let itemEnCarrito = carrito.find(el => el.id == itemId)

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1
    } else {
        let {id, nombre, precio} = stockProductos.find( el => el.id == itemId )
        carrito.push({id: id, nombre: nombre, precio: precio, cantidad: 1})
    }


    console.log(carrito)

    actualizarCarrito()
}

function eliminarProducto(id) {
    let productoAEliminar = carrito.find( el => el.id == id )

    productoAEliminar.cantidad--

    if (productoAEliminar.cantidad == 0) {
        let indice = carrito.indexOf(productoAEliminar)
        carrito.splice(indice, 1)
    }

    actualizarCarrito()
}


function actualizarCarrito() {
    contenedorCarrito.innerHTML=''

    carrito.forEach( (producto) => {

        const div = document.createElement('div')
        div.classList.add('productoEnCarrito')
        div.innerHTML = `
                        <p>${producto.nombre}</p>
                        <p>Precio: $${producto.precio * producto.cantidad}</p>
                        <p>Cantidad: ${producto.cantidad}</p>
                        <button onclick=eliminarProducto(${producto.id}) class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                    `

        contenedorCarrito.appendChild(div)
    })

    localStorage.setItem('Compras', JSON.stringify(carrito))

    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce( (acc, el) => acc + (el.precio * el.cantidad), 0 )
}

//------------------------------Reporte-PreCargado------------------------------
//EVENTO COMPRAR
const boton = $(`#btnComprar`)
boton.click( () => {
    flag=0;
    doCompra();
})