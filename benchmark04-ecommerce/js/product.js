const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const backofficeBtn = document.querySelector('.backoffice-btn');
const cartBtn = document.querySelector('.cart-btn');
const cartCount = document.getElementById('cart-count');

const productSection = {
    title: document.querySelector('.section-title'), // forse non serve
    loader: document.getElementById('product-loader'),
    error: document.getElementById('product-error'),
    details: document.getElementById('details')
};

const productDetails = {
    image: document.getElementById('product-image'),
    name: document.getElementById('product-name'),
    brand: document.getElementById('product-brand'),
    price: document.getElementById('product-price'),
    description: document.getElementById('product-description'),
    add: document.querySelector('.add-to-cart-btn')
};

const cartModal = {
    modal: document.getElementById('modal-cart'),
    close: document.querySelector('.btn-close'),
    loader: document.getElementById('cart-loader'),
    error: document.getElementById('cart-error'),
    content: document.getElementById('cart-content'),
    table: document.getElementById('cart-table')
};

getProductById(productId)
    .then(product => {
        getCartQty(cartCount);
        renderProductDetails(product)
    })
    .catch(error => errorHandler(productSection.error, productSection.details, error));


cartBtn.addEventListener('click', () => {
    const cart = getCart();
    cartModal.content.innerHTML = '';
    if(cart.length === 0) {
        renderEmptyCart(cartModal.content);
    } else {
        cart.map(cartProduct => renderCart(cartProduct, cartModal.content));
        renderCartTotal(cartModal.content);
    }
    openCart(cartModal.modal);
});

productDetails.add.addEventListener('click', () => {
    const id = productDetails.add.getAttribute('data-product-id');
    const price = productDetails.price.textContent.replace('€ ', '');

    const product = {
        id: id,
        name: productDetails.name.textContent,
        price: parseFloat(price),
        quantity: 1
    };
    
    addToCart(product, id);

    productDetails.add.innerText = 'Product Added!';
    getCartQty(cartCount);

    setTimeout(() => {
        productDetails.add.innerText = 'Add to Cart'
    }, 3000);
});

cartModal.content.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const deleteClick = e.target.closest('.delete-btn');
    const id = deleteClick.getAttribute('data-product-id');

    deleteCartProduct(id);
});

backofficeBtn.addEventListener('click', () => {
    window.location.href = './admin/backoffice.html';
});