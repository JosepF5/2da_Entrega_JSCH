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
    const texto = $(`#texto`)
    const h3 = $(`h3`)
    h3.addClass('titulo')
    h3.append("Ofertas por el mes de Halloween")
    texto.append(h3)
    //INTERACCION CON HTML
    if(arrGcompraz!=null){
        arrGcompraz.forEach( (prod) => {
            $('#productos').append(`
                <h3 class="titulo">${prod.nombre}</h3>
                <p></p>
                <p>Precio: $${prod.precio}</p>
                <p>Stock: ${prod.stock}</p>
                <p>Creada el: ${ new Date().toLocaleString() }</p>
                <br>
            `)
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
//------------------------------Reporte-PreCargado------------------------------
//EVENTO COMPRAR
const boton = $(`#btnComprar`)
boton.click( () => {
    flag=0;
    doCompra();
})