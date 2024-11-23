// Variables principales
const listaCarrito = document.getElementById('lista-carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const totalPrecio = document.getElementById('total-precio');
const checkoutBtn = document.querySelector('.checkout-btn');
const cartItemsContainer = document.querySelector('.cart-items');
const inputsCliente = {
    name: document.getElementById('name'),
    phone: document.getElementById('phone'),
    address: document.getElementById('address'),
    address1: document.getElementById('address1'),
    email: document.getElementById('email')
};

// Estado del carrito
let carrito = [];

// Función para actualizar el DOM del carrito
function renderCarrito() {
    cartItemsContainer.innerHTML = ''; // Limpiar contenido actual
    let total = 0;

    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = '<p>El carrito está vacío</p>';
    } else {
        carrito.forEach((producto, index) => {
            const item = document.createElement('div');
            item.className = 'cart-item';
            item.innerHTML = `
                <div class="cart-product">
                    <p><strong>${producto.nombre}</strong></p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <p>Precio: $${producto.precio.toFixed(2)}</p>
                </div>
                <button class="btn-remove" data-index="${index}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(item);

            total += producto.precio * producto.cantidad;
        });
    }

    totalPrecio.textContent = `Total: $${total.toFixed(2)}`;
    addRemoveListeners();
}

// Agregar funcionalidad a los botones "Eliminar"
function addRemoveListeners() {
    const removeButtons = document.querySelectorAll('.btn-remove');
    removeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            carrito.splice(index, 1); // Quitar producto del carrito
            renderCarrito();
        });
    });
}

// Vaciar el carrito
vaciarCarritoBtn.addEventListener('click', () => {
    carrito = [];
    renderCarrito();
});

// Simulación de "proceder al pago"
checkoutBtn.addEventListener('click', () => {
    const datosCliente = {
        name: inputsCliente.name.value.trim(),
        phone: inputsCliente.phone.value.trim(),
        address: inputsCliente.address.value.trim()
    };

    // Validación de datos del cliente
    if (!datosCliente.name || !datosCliente.phone || !datosCliente.address) {
        alert('Por favor, complete todos los datos del cliente.');
        return;
    }

    if (carrito.length === 0) {
        alert('El carrito está vacío. ¡Agregue productos antes de continuar!');
        return;
    }

    // Procesar pedido (puedes integrar tu API o backend aquí)
    alert(`¡Gracias, ${datosCliente.name}! Su pedido ha sido procesado.`);
    carrito = []; // Vaciar carrito después del pago
    renderCarrito();

    // Limpiar inputs del cliente
    inputsCliente.name.value = '';
    inputsCliente.phone.value = '';
    inputsCliente.address.value = '';
    inputsCliente.email.value = '';
    inputsCliente.address1.value = '';
});

// Función para agregar productos al carrito
function agregarProducto(nombre, precio, cantidad = 1) {
    const productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += cantidad; // Incrementar cantidad
    } else {
        carrito.push({ nombre, precio, cantidad }); // Agregar nuevo producto
    }

    renderCarrito();
}

// Inicialización del carrito
renderCarrito();

// Ejemplo: Agregar productos al carrito
agregarProducto('Saco Beige', 49.99, 1);
agregarProducto('Saco Negro', 59.99, 1);