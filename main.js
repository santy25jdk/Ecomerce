
/*========== Scrool ==========*/
const header = document.querySelector('header');
const showHeader = document.querySelector('.show__header');
window.addEventListener('scroll', function(){
    header.classList.toggle('show__header', window.scrollY >100);
});

/*========== Loading ==========*/
const loading = document.querySelector('.loading');
window.addEventListener('load', () =>{
    setTimeout(() => {
        loading.style.display = 'none';
    }, 3000);
});

/*========== Click-Menu ==========*/
const menuGrid = document.querySelector('.bx-grid-alt');
const menu = document.querySelector('.menu');
menuGrid.addEventListener('click', () => {
        menu.classList.toggle('menu__show')
        ? menuGrid.classList.add('bx-x')
        : menuGrid.classList.remove('bx-x');  
});

/*========== Click-carrito ==========*/
const carrito = document.querySelector('.bx-shopping-bag');
const shoping = document.querySelector('.carrito');
carrito.addEventListener('click', () => {
    shoping.classList.toggle('carrito__show')
    ? carrito.classList.add('bx-x')
    : carrito.classList.remove('bx-x');
});

/*========== Agregar-Compras-carrito ==========*/

let buzos = [
    {
    id: 1,
    precio: 14.00,
    stock: 7,
    categoria: "Hoodies",
    urlImage: "./img/featured1.png"
    },
    {
    id: 2,
    precio: 24.00,
    stock: 10,
    categoria: "Shirts",
    urlImage: "./img/featured2.png"
    },
    {
    id: 3,
    precio: 24.00,
    stock: 19,
    categoria: "Sweatshirts",
    urlImage: "./img/featured3.png"
    },
];

/*==========4-creamos una funsion add ==========*/

function addBuzo(idBuzo){
    const currentBuzo = buzos.find((buzo) => buzo.id === idBuzo);
    if(currentBuzo.stock === objCartShop[idBuzo].amount)
        return alert('Ya alcanzo el límite disponible de stock');
        objCartShop[currentBuzo.id].amount++;
}

/*==========5-creamos una funsion delete ==========*/

function deleteBuzo(idBuzo){
    const op = confirm('Seguro que quieres eliminar del carrito?');
        if(op){
            delete objCartShop[idBuzo];
        }
}

/*==========6- Calculamos el total ==========*/
const cuentaFinal = document.querySelector('.cuenta__final');

function printTotal(){
    const arrayCartShop = Object.values(objCartShop);

    let ctaTotal = arrayCartShop.reduce((acum, current) => {
        acum += current.precio * current.amount;
        console.log(acum);
        return acum;
    },0);

    cuentaFinal.innerHTML = `$${ctaTotal}.00`;
}

/*==========7- Vaciamos el carrito al hacer click en chekout ==========*/
const total = document.querySelector('.total');
total.addEventListener('click', (e) => {
    if(e.target.classList.contains('checkout')){
        const op = confirm('Estas seguro de comprar?')

        if(op){
            buzos = buzos.map(buzo => {
                if(objCartShop[buzo.id]?.id === buzo.id){
                    return{
                        ... buzo,
                        stock: buzo.stock - objCartShop[buzo.id].amount,
                    };
                }else{
                    return buzo;
                }
            });
            objCartShop = {};

            printBuzosInCar();
        }
    }
});

/*==========2- Pintamos ==========*/

const compras = document.querySelector('.compras');

function printBuzosInCar(){
    let html = '';
    const arrayCartShop = Object.values(objCartShop);

    arrayCartShop.forEach(({id,precio,amount,categoria,urlImage,stock}) => {
        html += `
        <article class="articulo">
            <div class="img__product">
                <img src="${urlImage}" alt="${categoria}" class="img">
            </div>

            <div class="container">

                <div class="info">
                    <h3 class="tipo">${categoria}</h3>
                    <span class="stock">Stock: ${stock} | <span class="precio">$${precio}</span></span>
                    <span class="subTotal">Subtotal: $14.00</span>
                </div>
            
                <div class="box__btn">
                    <div class="funciones">
                        <button class="rest" id="${id}">-</button>
                        <p> <span class="count">${amount}</span> units</p>
                        <button class="add" id="${id}">+</button>
                    </div>
                    <i class="bx bx-trash-alt del" id="${id}"></i>
                </div>
                
            </div>
        </article>
        `
    });

    compras.innerHTML = html;

    printTotal();
}

/*==========1- Buscamos el container y validamos los botones ==========*/
const hoodies = document.querySelector('.hoodies');
let objCartShop = {};
hoodies.addEventListener('click', (e) => {
    if(e.target.classList.contains('agregar')){
        const idBuzo = Number(e.target.id);
        const currentBuzo = buzos.find((buzo) => buzo.id === idBuzo);

        if(objCartShop[currentBuzo.id]){
            addBuzo(idBuzo);
        }else{
            objCartShop[currentBuzo.id] = { ...currentBuzo};
            objCartShop[currentBuzo.id].amount = 1;
        }

        printBuzosInCar();
    }
});

/*==========3- Hamos funsionar los btns, add,rest, del ==========*/

compras.addEventListener('click', (e) => {
    const idBuzo = Number(e.target.id);

    if(e.target.classList.contains('rest')){
        if(objCartShop[idBuzo].amount < 2){
            deleteBuzo(idBuzo);
        }else{
            objCartShop[idBuzo].amount--;
        }
    }
    if(e.target.classList.contains('add')){
        addBuzo(idBuzo);
    }
    if(e.target.classList.contains('del')){
        deleteBuzo(idBuzo);
    }

    printBuzosInCar();
});

/*==========8- dark-Mode ==========*/
const MOON = document.querySelector('.bx-moon');
MOON.addEventListener('click', () => {
    document.body.classList.toggle('darkmode')
    ? MOON.classList.add('bx-sun')
    : MOON.classList.remove('bx-sun');
});