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
    array.forEach((prod) => {
        $('#contenedor-productos').append(`
            <div class="col-sm-6 text-dark p-1 d-flex justify-content-center">
            <div class="card mb-5" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center">
                  <img src=${prod.img} class="img-fluid rounded-start " alt="...">
                </div>
                <div class="col-md-8">
                  <div class="card-body ">
                    <h5 class="card-title titulo__Cartas">${prod.nombre}</h5>
                    <p class="card-text"><small class="text-muted">$${prod.precioG}</small></p>
                    <button type="button" class="btn btn-warning" onclick=agregarAlCarrito(${prod.id})>Agregar al Carrito</button>
                  </div>
                </div>
              </div>
            </div>
            </div>
        `)
    })
}
//------------------------------Definicion de clase "Producto"------------------------------

function agregarAlCarrito(itemId) {

    let itemEnCarrito = carrito.find(el => el.id == itemId)

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1
    } else {
        let {id, nombre, precioG} = productos.find( el => el.id == itemId )
        carrito.push({id: id, nombre: nombre, precioG: precioG, stockG: 1})
    }



    actualizarCarrito()
}

function eliminarProducto(id) {
    let productoAEliminar = carrito.find( el => el.id == id )
    console.log(id)
    console.log(productoAEliminar)
    productoAEliminar.stockG--
    console.log(productoAEliminar.stockG)
    if (productoAEliminar.stockG <= 0) {
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
        div.classList.add('texto_compras')
        div.innerHTML = `
                        <p>${producto.nombre}</p>
                        <p>Precio: $${producto.precioG * producto.stockG}</p>
                        <p>Cantidad: ${producto.stockG}</p>
                        <button onclick=eliminarProducto(${producto.id}) class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                    `

        contenedorCarrito.appendChild(div)
    })

    localStorage.setItem('Compras', JSON.stringify(carrito))

    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce( (acc, el) => acc + (el.precioG * el.stockG), 0 )
}

//------------------------------Reporte-PreCargado------------------------------
//EVENTO COMPRAR
const boton = $(`#btnComprar`)
boton.click( () => {
    flag=0;
    doCompra();
})