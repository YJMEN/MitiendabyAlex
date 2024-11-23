// Array para almacenar los productos añadidos al carrito
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
    // Obtener el contenedor del producto
    const productoElemento = event.target.closest('.producto');

    // Extraer la información del producto
    const nombre = productoElemento.querySelector('.nameproduct').textContent;
    const precio = productoElemento.querySelector('.price').textContent;
    const imagenSrc = productoElemento.querySelector('.imagen-producto').src;

    // Crear un objeto del producto
    const producto = {
        nombre,
        precio,
        imagen: imagenSrc,
    };

    // Agregar el producto al array del carrito
    carrito.push(producto);

    // Actualizar la cantidad en el ícono del carrito
    document.getElementById('cart-count').textContent = carrito.length;

    //alert(`${nombre} ha sido añadido al carrito.`);//
}

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
    const carritoContenedor = document.createElement('div');
    carritoContenedor.innerHTML = `<h2>Carrito de Compras</h2>`;

    if (carrito.length === 0) {
        carritoContenedor.innerHTML += `<p>El carrito está vacío.</p>`;
    } else {
        carrito.forEach((producto, index) => {
            carritoContenedor.innerHTML += `
                <div class="producto-carrito">
                    <img src="${producto.imagen}" alt="${producto.nombre}" width="50">
                    <p>${producto.nombre}</p>
                    <p>${producto.precio}</p>
                    <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
            `;
        });
    }

    // Redirigir a la página de carrito o mostrar en un modal
    //document.body.appendChild(carritoContenedor);//
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Eliminar producto del array
    document.getElementById('cart-count').textContent = carrito.length; // Actualizar contador
    mostrarCarrito(); // Volver a renderizar el carrito
}

// Asignar evento a los botones "Agregar al carrito"
document.querySelectorAll('.add').forEach((boton) => {
    boton.addEventListener('click', agregarAlCarrito);
});

// Agregar funcionalidad al enlace del carrito para mostrar su contenido
document.querySelector('.menu a[href="./carrito.html"]').addEventListener('click', (e) => {
    e.preventDefault(); // Evitar redirección para demo
    mostrarCarrito();
});
