
const productos = [
    { id: 1, nombre: "Cono Mix Simple", precio: 1.50, desc: "Un sabor de helado, crema y queso.", img: "https://i.postimg.cc/44wS9cqh/helado-cono.png" },
    { id: 2, nombre: "Tulipán Mix", precio: 3.05, desc: "Dos sabores y crema.", img: "https://i.postimg.cc/GtNPjbvV/helado-tulipan.png" },
    { id: 3, nombre: "Frutillas Mix", precio: 1.87, desc: "Frutas con crema.", img: "https://i.postimg.cc/bw10QcrR/fresa.png" },
    { id: 4, nombre: "Copa Gelato", precio: 2.99, desc: "Artesanal Premium.", img: "https://i.postimg.cc/D0WL0RRq/copa-de-helado.png" }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const catalogoContainer = document.getElementById('catalogo');
const listaCarrito = document.getElementById('lista-carrito');
const totalElemento = document.getElementById('total');

// 1. RENDERIZAR CATÁLOGO (CON EL "CUADRO BONITO")
function mostrarCatalogo() {
    catalogoContainer.innerHTML = '';
    productos.forEach(producto => {
        const div = document.createElement('div');
        // Clases para el cuadro: bg-white, shadow-lg, rounded-3xl
        div.className = "bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col items-center group";
        
        div.innerHTML = `
            <div class="overflow-hidden mb-4">
                <img src="${producto.img}" alt="${producto.nombre}" class="h-32 w-32 object-contain group-hover:scale-110 transition-transform">
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-1">${producto.nombre}</h3>
            <p class="text-xs text-gray-400 uppercase tracking-widest mb-2">${producto.desc}</p>
            <p class="text-2xl font-black text-pink-500 mb-4">$${producto.precio.toFixed(2)}</p>
            
            <button onclick="agregarAlCarrito(${producto.id})" 
                class="w-full border-2 border-pink-500 text-pink-500 font-extrabold py-2 px-4 rounded-xl hover:bg-pink-500 hover:text-white transition-all active:scale-95">
                ¡LO QUIERO! +
            </button>
        `;
        catalogoContainer.appendChild(div);
    });
}

// 2. AGREGAR AL CARRITO
window.agregarAlCarrito = (id) => {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
};

// 3. ACTUALIZAR VISTA DEL CARRITO
function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;
        const li = document.createElement('li');
        li.className = "flex justify-between items-center bg-blue-50 p-3 rounded-2xl border border-blue-100";
        li.innerHTML = `
            <div>
                <p class="font-bold text-gray-700 text-sm">${item.nombre}</p>
                <p class="text-pink-500 font-bold">$${item.precio.toFixed(2)}</p>
            </div>
            <button onclick="eliminarDelCarrito(${index})" class="text-gray-400 hover:text-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
            </button>
        `;
        listaCarrito.appendChild(li);
    });

    totalElemento.innerText = `$${total.toFixed(2)}`;
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// 4. VACIAR Y ELIMINAR
window.eliminarDelCarrito = (index) => {
    carrito.splice(index, 1);
    actualizarCarrito();
};

window.vaciarCarrito = () => {
    carrito = [];
    actualizarCarrito();
};

// Iniciar
mostrarCatalogo();
actualizarCarrito();