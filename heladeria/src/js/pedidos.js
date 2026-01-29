import "../css/style.css";
import "flowbite";

const contenedor = document.getElementById("contenedor-productos");

// ---------------- CARGAR PRODUCTOS ----------------
const cargarTienda = async () => {
  try {
    const respuesta = await fetch("/data/productos.json");

    if (!respuesta.ok) {
      throw new Error("Error en la conexión");
    }

    const categorias = await respuesta.json();
    contenedor.innerHTML = "";

    categorias.forEach((categoria) => {
      categoria.productos.forEach((producto) => {
        contenedor.innerHTML += `
          <div class="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between hover:scale-[1.02] transition">

            <div class="h-40 mb-4 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <img
                src="${producto.imagen || 'https://via.placeholder.com/150'}"
                alt="${producto.nombre}"
                class="object-contain h-full"
              />
            </div>

            <h3 class="font-extrabold text-pink-500 text-lg mb-1">
              ${producto.nombre}
            </h3>

            <p class="text-sm text-gray-600 mb-3">
              ${producto.descripcion}
            </p>

            <div class="flex items-center justify-between mt-auto">
              <span class="text-xl font-bold text-emerald-500">
                $${producto.precio.toFixed(2)}
              </span>

              <button
                class="btn-agregar bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-lg transition active:scale-95"
                data-nombre="${producto.nombre}"
                data-precio="${producto.precio}"
              >
                +
              </button>
            </div>
          </div>
        `;
      });
    });
  } catch (error) {
    console.error(error);
    contenedor.innerHTML = `
      <p class="text-red-600 text-center col-span-full">
        Error al cargar los productos
      </p>
    `;
  }
};

cargarTienda();

// ---------------- CARRITO ----------------
let carrito = JSON.parse(localStorage.getItem("carrito-productos")) || [];

// ACTUALIZAR CONTADOR
const actualizarContador = () => {
  const contador = document.getElementById("carrito-helados");
  if (contador) contador.innerText = carrito.length;
};

actualizarContador();

// ---------------- AGREGAR AL CARRITO ----------------
contenedor.addEventListener("click", (e) => {
  const boton = e.target.closest(".btn-agregar");

  if (boton) {
    const producto = {
      nombre: boton.dataset.nombre,
      precio: boton.dataset.precio,
    };

    carrito.push(producto);

    localStorage.setItem(
      "carrito-productos",
      JSON.stringify(carrito)
    );

    actualizarContador();
  }
});
