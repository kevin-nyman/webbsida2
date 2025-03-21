const products = [
    { img: 'images/d5b1a9a1-db91-400e-a0f2-aca58bfd15a3.webp', name: 'Birgitta Johansson', desc: 'Begagnade tänder, 56 år, Rökare', price: '3 467 kr' },
    { img: 'images/imaages.webp', name: 'Anders Karlsson', desc: 'Nya tänder, 40 år, Icke-rökare', price: '4 999 kr' },
    { img: 'images/imagess.webp', name: 'Eva Svensson', desc: 'Barnens mjölktänder, 7 år', price: '1 200 kr' },
    { img: 'images/l.webp', name: 'Lars Pettersson', desc: 'Guldtänder, 65 år, Rökare', price: '6 789 kr' },
    { img: 'images/398101_1280.webp', name: 'Karin Nilsson', desc: 'Protes, 80 år', price: '2 345 kr' },
    { img: 'images/download-5.webp', name: 'Olof Berg', desc: 'Titanimplantat, 50 år', price: '8 000 kr' },
    { img: 'images/tänder-1000x288.webp', name: 'Anna Eriksson', desc: 'Delprotes, 60 år', price: '3 200 kr' },
    { img: 'images/g.webp', name: 'Gustav Larsson', desc: 'Visdomständer, 30 år', price: '1 999 kr' },
    { img: 'images/munhalsa_frisk_mun_1240.webp', name: 'Maria Andersson', desc: 'Tandställning, 25 år', price: '5 500 kr' }
];
const productContainer = document.getElementById('product-container');
const loadMoreButton = document.getElementById('load-more');
const cartLink = document.querySelector("a[href='/varukorg.html']");

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${JSON.stringify(value)};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) return JSON.parse(value);
    }
    return [];
}

function updateCartCount() {
    const cart = getCookie('cart');
    const itemCount = cart.length;
    cartLink.textContent = `Till kassan (${itemCount})`;
}

function addToCart(product) {
    const cart = getCookie('cart');
    cart.push(product);
    setCookie('cart', cart, 7);
    updateCartCount();
}

let productIndex = 0;
const productsPerPage = 9;

function displayProducts() {
    for (let i = 0; i < productsPerPage && productIndex < products.length; i++, productIndex++) {
        const product = products[productIndex];
        const card = document.createElement('product-card');
        card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <p>${product.name}</p>
            <p>${product.desc}</p>
            <h3>${product.price}</h3>
            <button class="add-to-cart">Lägg till i varukorg</button>
        `;
        card.querySelector('.add-to-cart').addEventListener('click', () => addToCart(product));
        productContainer.appendChild(card);
    }
}

loadMoreButton.addEventListener('click', displayProducts);

updateCartCount();
displayProducts();