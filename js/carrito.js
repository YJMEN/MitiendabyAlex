// Obtener el carrito desde localStorage
function obtenerCarrito() {
    const carrito = localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : [];
}

// Guardar el carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Mostrar los productos en el carrito
function mostrarCarrito() {
    const carrito = obtenerCarrito();
    const listaCarrito = document.getElementById("lista-carrito");
    const contenedorTotal = document.querySelector(".total-amount");

    listaCarrito.innerHTML = ""; // Limpiar contenido previo
    let total = 0;

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
        contenedorTotal.textContent = "$0";
        return;
    }

    carrito.forEach((producto, index) => {
        total += parseFloat(producto.precio.replace("$", "").replace(".", ""));

        const li = document.createElement("li");
        li.className = "producto-en-carrito";
        li.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover; border: 1px solid #ccc; border-radius: 5px;">
                <span><strong>Producto:</strong> ${producto.nombre}</span>
                <span><strong>Precio:</strong> ${producto.precio}</span>
                <button class="eliminar-producto" data-index="${index}">Eliminar</button>
            </div>
        `;

        listaCarrito.appendChild(li);
    });

    contenedorTotal.textContent = `$${total.toFixed(0)}`;

    // Agregar eventos a los botones de "Eliminar"
    document.querySelectorAll(".eliminar-producto").forEach((boton) => {
        boton.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            eliminarProducto(index);
        });
    });
}

// Eliminar un producto del carrito
function eliminarProducto(index) {
    const carrito = obtenerCarrito();
    carrito.splice(index, 1); // Eliminar el producto
    guardarCarrito(carrito); // Guardar el carrito actualizado
    mostrarCarrito(); // Actualizar la vista
}

// Vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

// Detectar clic en el botón "Vaciar Carrito"
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        vaciarCarrito();
    }
});

// Inicializar la vista del carrito al cargar la página
document.addEventListener("DOMContentLoaded", mostrarCarrito);
