const backofficeBtn = document.querySelectorAll('.backoffice-btn');
const cartBtn = document.querySelector('.cart-btn');
const cartCount = document.getElementById('cart-count');
const notification = document.getElementById('notification-alert');

const products = {
    section: document.getElementById('all-products'),
    search: document.getElementById('search-product'),
    loader: document.getElementById('products-loader'),
    error: document.getElementById('products-error'),
    content: document.getElementById('products-grid'),
    search: document.getElementById('search-product')
};

const cartModal = {
    modal: document.getElementById('modal-cart'),
    close: document.querySelector('.btn-close'),
    loader: document.getElementById('cart-loader'),
    error: document.getElementById('cart-error'),
    content: document.getElementById('cart-content'),
    table: document.getElementById('cart-table')
};

getAllProducts()
    .then(productsList => {
        productsList.map(product => renderProduct(product, products.content));
        getCartQty(cartCount);
    })
    .catch(error => errorHandler(products.error, products.content, error));

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

products.content.addEventListener('click', (e) => {
    const cardClick = e.target.closest('.product-card');
    const btnClick = e.target.closest('.add-to-cart-btn');

    if (cardClick && btnClick) {
        const id = btnClick.getAttribute('data-product-id');
        const name = cardClick.querySelector('.product-name').textContent;
        const price = cardClick.querySelector('.product-price').textContent.replace('€ ', '');

        const product = {
            id: id,
            name: name,
            price: parseFloat(price),
            quantity: 1
        };
        
        addToCart(product, id);

        btnClick.innerText = 'Product Added!';
        getCartQty(cartCount);

        setTimeout(() => {
            btnClick.innerText = 'Add to Cart'
        }, 3000);

    } else if (cardClick) {
        const productId = cardClick.getAttribute('data-product-id');
        window.location.href = `./product.html?id=${productId}`;
    };
});

cartModal.content.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const deleteClick = e.target.closest('.delete-btn');
    const id = deleteClick.getAttribute('data-product-id');

    deleteCartProduct(id);
});

products.search.addEventListener('input', () => {
    const searchInput = products.search.value.trim().toLowerCase();

    getAllProducts()
        .then(productsList => {
            const searchName = productsList.filter(product => product.name.toLowerCase().includes(searchInput));
            const searchBrand = productsList.filter(product => product.brand.toLowerCase().includes(searchInput));
            
            const searchResults = [...searchName, ...searchBrand];
            const productsFound = Array.from(
                new Map(searchResults.map(product => [product._id, product])).values()
            );

            products.content.innerHTML = '';

            productsFound.map(product => renderProduct(product, products.content));
        })
        .catch(error => errorHandler(products.error, products.content, error));
})

backofficeBtn.forEach(button => {
    button.addEventListener('click', () =>  window.location.href = './admin/backoffice.html');
});