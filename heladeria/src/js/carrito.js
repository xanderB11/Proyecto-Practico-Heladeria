
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

    // Revisar si ya existe el producto para aumentar cantidad
    const existente = carrito.find(item => item.id === id);
    if (existente) {
        existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarCarrito();
};

// 3. ACTUALIZAR VISTA DEL CARRITO
function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        const li = document.createElement('li');
        li.className = "flex justify-between items-center bg-blue-50 p-3 rounded-2xl border border-blue-100";
        li.innerHTML = `
            <div>
                <p class="font-bold text-gray-700 text-sm">${item.nombre} x${item.cantidad}</p>
                <p class="text-pink-500 font-bold">$${(item.precio * item.cantidad).toFixed(2)}</p>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="eliminarDelCarrito(${index})" class="text-gray-400 hover:text-red-500">
                    ✖
                </button>
            </div>
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