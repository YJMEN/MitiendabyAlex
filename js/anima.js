let cartCount = 0;

document.querySelectorAll('.add').forEach(button => {
    button.addEventListener('click', (event) => {
        // Incrementar el contador
        cartCount++;
        document.getElementById('cart-count').textContent = cartCount;

        // Mostrar animación del corazón
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.classList.add('heart-animation');
        document.body.appendChild(heart);

        // Posicionar corazón en el lugar del clic
        const { clientX, clientY } = event;
        heart.style.left = `${clientX}px`;
        heart.style.top = `${clientY}px`;

        // Eliminar el corazón después de la animación
        setTimeout(() => heart.remove(), 1000);

        // Agregar el producto al carrito
        addToCart(event.target.closest('.producto'));
    });
});

function addToCart(product) {
    const productInfo = {
        name: product.querySelector('h3').textContent,
        price: parseFloat(product.querySelector('p').textContent.replace('$', '')).toFixed(2),
        imgSrc: product.querySelector('img').src,
    };

    // Guardar en el carrito (puedes usar localStorage para persistir)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productInfo);
    localStorage.setItem('cart', JSON.stringify(cart));
}