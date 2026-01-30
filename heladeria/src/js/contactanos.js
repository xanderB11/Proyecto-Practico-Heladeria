import "../css/style.css";
import "flowbite";

const formulario = document.getElementById("formulario");
const nombre = document.getElementById("username");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const edad = document.getElementById("edad");
const cedula = document.getElementById("cedula");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const patrones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,16}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    passw: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    telefono: /^\d{10}$/,
    cedula: /^\d{10}$/
};

const mostrarError = (input, idError,) => {
    const mensajeError = document.getElementById(idError);
    if (mensajeError)
        mensajeError.classList.remove("hidden");
    input.classList.add("border-red-500");
    input.classList.remove("border-blue-300");
}

const eliminarError = (input, idError) => {
    const mensajeError = document.getElementById(idError);
    if (mensajeError) mensajeError.classList.add("hidden");
    input.classList.remove("border-red-500");
    input.classList.add("border-blue-300");
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let formularioValido = true;

    if (!patrones.nombre.test(nombre.value)) {
        mostrarError(nombre, "error-username");
        formularioValido = false;
    } else mostrarError(nombre, "error-username", false);

    if (!patrones.email.test(email.value)) { mostrarError(email, "error-email", true); formularioValido = false; }
    else mostrarError(email, "error-email", false);

    if (!patrones.telefono.test(telefono.value)) { mostrarError(telefono, "error-telefono", true); formularioValido = false; }
    else mostrarError(telefono, "error-telefono", false);

    if (!patrones.cedula.test(cedula.value)) { mostrarError(cedula, "error-cedula", true); formularioValido = false; }
    else mostrarError(cedula, "error-cedula", false);

    if (edad.value === "" || parseInt(edad.value) < 18) { mostrarError(edad, "error-edad", true); formularioValido = false; }
    else mostrarError(edad, "error-edad", false);

    if (!patrones.passw.test(password.value)) { mostrarError(password, "error-password", true); formularioValido = false; }
    else mostrarError(password, "error-password", false);

    if (confirmPassword.value !== password.value || confirmPassword.value === "") { mostrarError(confirmPassword, "error-confirmPassword", true); formularioValido = false; }
    else mostrarError(confirmPassword, "error-confirmPassword", false);

    
    if (formularioValido) {
        alert("¡Registro exitoso! Ya puedes pedir tus helados.");
        formulario.reset();
        const inputs = formulario.querySelectorAll('input');
        inputs.forEach(i => i.classList.remove("border-blue-300"));
    }
});
