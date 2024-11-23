// Obtener el carrito desde localStorage
function obtenerCarrito() {
    const carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : [];
}

// Guardar el carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carrito = obtenerCarrito();
    document.getElementById("cart-count").textContent = carrito.length || 0;
}

// Agregar un producto al carrito
function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito(); // Obtenemos el carrito actual
    carrito.push(producto); // Agregamos el producto al carrito
    guardarCarrito(carrito); // Guardamos el carrito actualizado en el almacenamiento
    actualizarContadorCarrito(); // Actualizamos el contador del carrito

    // Mostrar la alerta personalizada
    mostrarAlerta("Producto añadido al carrito");
}

// Función para mostrar la alerta personalizada
function mostrarAlerta(mensaje) {
    const alerta = document.getElementById("alerta-personalizada");
    const mensajeAlerta = document.getElementById("alerta-mensaje");

    // Asignamos el mensaje a la alerta
    mensajeAlerta.textContent = mensaje;

    // Mostramos la alerta
    alerta.classList.remove("ocultar");
    alerta.classList.add("mostrar");

    // Ocultamos la alerta después de 3 segundos
    setTimeout(() => {
        alerta.classList.remove("mostrar");
        alerta.classList.add("ocultar");
    }, 2000);
}

// Detectar clics en los botones de "Agregar al carrito"
document.querySelectorAll(".add").forEach((boton) => {
    boton.addEventListener("click", () => {
        const producto = {
            nombre: boton.closest(".producto").querySelector(".nameproduct").textContent,
            precio: boton.closest(".producto").querySelector(".price").textContent,
            imagen: boton.closest(".producto").querySelector(".imagen-producto").getAttribute("src"), // Capturamos la URL de la imagen
        };
        agregarAlCarrito(producto);
    });
});

// Inicializar el contador al cargar la página
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);