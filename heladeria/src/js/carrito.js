import "../css/style.css";
import "flowbite";

const lista = document.getElementById("lista-carrito");
const totalPagar = document.getElementById("Total-compra");
const contadorNav = document.getElementById("carrito-helados");
const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");

let productosCarrito = JSON.parse(localStorage.getItem("carrito-productos")) || [];


// contador boton carrito 

const actualizarContador = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito-productos")) || [];
    if (contadorNav) {
        contadorNav.innerText = carrito.length;
    }
};


// MOSTRAR CARRITO

const mostrarCarrito = () => {
    if (!lista) return;

    lista.innerHTML = "";
    let total = 0;

    if (productosCarrito.length === 0) {
        lista.innerHTML = `
            <p class="text-gray-400 text-center py-10">
                El carrito está vacío 🍦
            </p>
        `;
        totalPagar.innerText = "$0.00";
        actualizarContador();
        return;
    }

    productosCarrito.forEach((producto, index) => {
        total += parseFloat(producto.precio);

        lista.innerHTML += `
            <div class="flex justify-between items-center text-pink-600 border-b py-4">
                <p class="font-bold uppercase">${producto.nombre}</p>

                <div class="flex items-center gap-6 ">
                    <span class="text-cyan-500 font-black">
                        $${parseFloat(producto.precio).toFixed(2)}
                    </span>

                    <button 
                        data-index="${index}" 
                        class="btn-eliminar text-red-500 text-xs font-bold">
                        Eliminar
                    </button>
                </div>
            </div>
        `;
    });

    totalPagar.innerText = `$${total.toFixed(2)}`;
    actualizarContador();
};


// ELIMINAR PRODUCTO

lista.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-eliminar");
    if (!btn) return;

    const index = parseInt(btn.dataset.index);
    productosCarrito.splice(index, 1);

    localStorage.setItem("carrito-productos", JSON.stringify(productosCarrito));
    mostrarCarrito();
});


// VACIAR CARRITO

btnVaciarCarrito.addEventListener("click", () => {
    productosCarrito = [];
    localStorage.removeItem("carrito-productos");
    mostrarCarrito();
    actualizarContador();
});

mostrarCarrito();
