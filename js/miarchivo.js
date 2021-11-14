//------------------------------Declaracion de variables------------------------------
let productos=[
    {
        nombre: "Mouse",
        precioG: 50,
        stockG:12
    },
    {
        nombre: "Teclado",
        precioG: 75.5,
        stockG:35
    },
    {
        nombre: "Telefono",
        precioG: 400,
        stockG:14
    },
    {
        nombre: "PS4",
        precioG: 999,
        stockG:78
    },
    {
        nombre: "XBOX",
        precioG: 1250,
        stockG:45
    }
    ] 
let cantidad
let compras=[]
let Tcompras=[]
let Gcompras=[]
let arrGcompras=[]
let flag=1
let flag1=0
let stringCompras=""
let totalPrecio=0
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
    const contenedor=document.createElement("div")
    contenedor.classList.add('bg-dark') 
    const texto = document.getElementById('texto')
    const h3 = document.getElementsByTagName('h3')[0]
    h3.className = "titulo"
    h3.innerText = "Ofertas por el mes de Halloween"
    contenedor.append(h3)
    contenedor.append(h3)
    contenedor.append(h3)
    texto.append(h3)
    const contenedorProductos = document.getElementById('productos')
    //INTERACCION CON HTML
    if(arrGcompraz!=null){
        arrGcompraz.forEach( (prod) => {
            const div = document.createElement('div')
            div.id = `producto${prod.nombre}`
            // TEMPLATE STRING
            div.innerHTML = `
                <h3 class="titulo">${prod.nombre}</h3>
                <p></p>
                <p>Precio: $${prod.precio}</p>
                <p>Stock: ${prod.stock}</p>
            `
            contenedorProductos.append(div)
        })
    }
    /*
    arrGcompraz.forEach( (prod) => {
        const div = document.createElement('div')
        div.id = `producto${prod.nombre}`
        // TEMPLATE STRING
        div.innerHTML = `
            <h3 class="titulo">${prod.nombre}</h3>
            <p></p>
            <p>Precio: $${prod.precio}</p>
            <p>Stock: ${prod.stock}</p>
        `
        contenedorProductos.append(div)
    })
    */
    /*
    const input = document.getElementById('input')
    console.log(input.value)
    */
    console.log("REGISTRO")
    console.log(arrGcompraz)
    console.log(compras)
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
        flag1=prompt("Ingrese el nro del producto que desea llevar: (del 1 al 5)")
        while(flag1!=1 && flag1!=2 && flag1!=3 && flag1!=4 && flag1!=5){
            alert("Dato no válido. Intente nuevamente.")
            flag1=prompt("Ingrese el nro del producto que desea llevar: (del 1 al 5)")
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
    console.log(localStorage.getItem('Compras')+" Hola")
    Gcompras=localStorage.getItem('Compras') //Guardar el arreglo provisionalmente en string
    arrGcompraz=JSON.parse(Gcompras) //Conventirlo el string a arreglo 
    /*
    if(arrGcompras!=null){
        console.log(arrGcompras)
        for (let producto of compras) {
            arrGcompras.push(producto)
            console.log(arrGcompras)
        }
    }
    */
    //Guardar en el nuevo arreglo los objetos de la nueva consulta
    console.log(arrGcompraz)
        for (let producto of compras) {
            arrGcompraz.push(producto)
        }
    /*
    arrGcompras.forEach( (prod) => {
        const div = document.createElement('div')
        div.id = `producto${prod.nombre}`
        // TEMPLATE STRING
        div.innerHTML = `
            <h3 class="titulo">${prod.nombre}</h3>
            <p></p>
            <p>Precio: $${prod.precio}</p>
            <p>Stock: ${prod.stock}</p>
        `
        contenedorProductos.append(div)
    })
    */
    //Setearlo en el local storage
    localStorage.setItem('Compras',JSON.stringify(arrGcompraz))
    
    console.log(Gcompras)
    console.log(arrGcompras)
    console.log(arrGcompraz)
    console.log(localStorage.getItem('Compras'))
    console.log(typeof(Gcompras))
    console.log(typeof(arrGcompras))
    console.log(typeof(arrGcompraz))
    console.log(typeof(Tcompras))
    /*
    arrGcompras.forEach( (prod) => {
        const div = document.createElement('div')
        div.id = `producto${prod.nombre}`
        // TEMPLATE STRING
        div.innerHTML = `
            <h3 class="titulo">${prod.nombre}</h3>
            <p></p>
            <p>Precio: $${prod.precio}</p>
            <p>Stock: ${prod.stock}</p>
        `
    })
    */
    loadCompra(arrGcompraz);
}
//------------------------------Reporte-PreCargado------------------------------
/*
const tituloPrincipal = document.getElementsByTagName('h1')[0]
tituloPrincipal.innerHTML = "Desafio <strong> 09 </strong> | Eventos"
*/
/*
const titulo = document.getElementById('titulo')
titulo.innerText = "Bienvenido nuevamente! :)"
titulo.className = "gigante titulo"
*/
const items = document.getElementsByClassName('item')
for (const item of items) {
    item.classList.add('gigante') 
}
//EVENTO COMPRAR
const boton=document.getElementById('btnComprar')
boton.addEventListener("click",comprarClick)
function comprarClick(){
    flag=0;
    doCompra();
}
//------------------------------Llamado de datos de ingreso------------------------------
//--Proximamente
//------------------------------Reporte-Final------------------------------
//--Proximamente

