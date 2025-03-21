function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) return JSON.parse(value);
    }
    return [];
}

function updateCartDisplay() {
    const cartItems = getCookie('cart') || [];
    const cartContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartContainer.innerHTML = '';
    let total = 0;

    cartItems.forEach((item, index) => {
        const priceNumber = parseInt(item.price.replace(/\s/g, ''), 10);
        total += priceNumber;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <h3>${item.price}</h3>
            </div>
            <button class="remove-item" data-index="${index}">Ta bort</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = `${total.toLocaleString('sv-SE')} kr`;

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            removeFromCart(index);
        });
    });
}

function removeFromCart(index) {
    const cart = getCookie('cart');
    cart.splice(index, 1);
    document.cookie = `cart=${JSON.stringify(cart)}; path=/`;
    updateCartDisplay();
    updateCartCount();
}

function updateCartCount() {
    const cart = getCookie('cart') || [];
    const itemCount = cart.length;
    document.querySelector("a[href='cart.html']").textContent = `Till kassan (${itemCount})`;
}
updateCartDisplay();
updateCartCount();