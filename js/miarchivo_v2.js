//------------------------------Declaracion de variables------------------------------
let productos=[]

const cargarDatos = async () => {
    const resp = await fetch('./js/productos.json')
    const data = await resp.json()

    productos = data
    mostrarProductos(productos)
    console.log("hola")
}

cargarDatos()

const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
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
                    <p class="card-text"><small>$${prod.precioG}</small></p>
                    <p class="card-text"><small class="text-muted">Stock: ${prod.stockG}</small></p>
                    <button type="button" class="botonUpdateAmount btn btn-secondary" onclick=plusAmount(${prod.id})>+</button>
                    <span id="cantidadProducto${prod.id}">1</span>
                    <button type="button" class="botonUpdateAmount btn btn-secondary" onclick=minusAmount(${prod.id})>-</button>
                    <button type="button" class="btn btn-warning" onclick=agregarAlCarrito(${prod.id})>Agregar al Carrito</button>
                  </div>
                </div>
              </div>
            </div>
            </div>
        `)
    })
}
//------------------------------Aumentar-Disminuir Monto de Productos------------------------------
function plusAmount(id) {
    const cantidad = document.getElementById('cantidadProducto'+id)
    let producto = productos.find( el => el.id == id )
    if(cantidad.innerText < producto.stockG){
        cantidad.innerText = parseInt(cantidad.innerText) + 1
    }
}
function minusAmount(id) {
    const cantidad = document.getElementById('cantidadProducto'+id)
    if(cantidad.innerText > 1){
        cantidad.innerText = parseInt(cantidad.innerText) - 1
    }
    
}
//------------------------------CRUD CARRITO DE COMPRA------------------------------

function agregarAlCarrito(itemId) {

    let itemEnCarrito = carrito.find(el => el.id == itemId)

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1
    } else {
        let {id, nombre, precioG} = productos.find( el => el.id == itemId )
        const cantidad = document.getElementById('cantidadProducto'+id)
        carrito.push({id: id, nombre: nombre, precioG: precioG, stockG: parseInt(cantidad.innerText)})
        let producto = productos.find( el => el.id == itemId )
        console.log(producto.stockG)
        producto.stockG -= parseInt(cantidad.innerText)
        console.log(producto.stockG)
        cantidad.innerText = 1
    }
    actualizarCarrito()
}

function eliminarProducto(id) {
    let productoAEliminar = carrito.find( el => el.id == id )
    productoAEliminar.stockG--
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
// ========= API MERCADO PAGO =============

const finalizarCompra = async () => {
    const carritoToMP = carrito.map((prod) => {
      return {
        title: prod.nombre,
        description: "",
        picture_url: "",
        category_id: prod.id,
        quantity: prod.stockG,
        currency_id: "ARS",
        unit_price: prod.precioG,
      };
    });
  
    const resp = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer TEST-530625010370198-052019-70dec8c67253a7ded8355f1a098731e3-418556460",
      },
      body: JSON.stringify({
        items: carritoToMP,
        back_urls: {
          success: window.location.href,
          failure: window.location.href,
        },
      }),
    });
    const data = await resp.json();
  
    window.location.replace(data.init_point);
  };