// CART OPERATIONS //
const getCart = () => JSON.parse(localStorage.getItem('cart')) ?? [];

const addToCart = (product, id) => {
    const cart = getCart();
    let existingProduct = cart.find(cartProduct => cartProduct.id === id);
    
    if(existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    };
    
    saveCart(cart);
};

const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

const getCartQty = (counter) => {
    const cart = getCart();

    const cartQty = cart.reduce((sum, cartProduct) => {
        return sum + (cartProduct.quantity || 0);
    }, 0);

    if(cartQty === 0) {
        counter.classList.add('d-none');
    } else {
        counter.textContent = cartQty;
        counter.classList.remove('d-none');
    };    
};

const getCartTotal = () => {
    const cart = getCart();

    let cartTotal = cart.reduce((sum, cartProduct) => {
        return sum + ((cartProduct.quantity * cartProduct.price) || 0);
    }, 0)

    return formatPriceDecimal(cartTotal);
};

const deleteCartProduct = (id) => {
    const cart = getCart();

    const productToDelete = cart.find(product => product.id === id);
    const productQty = productToDelete.quantity;

    if(productQty === 1) {
        const updatedCart = cart.filter(product => product.id !== id);
        saveCart(updatedCart);
    } else {
        productToDelete.quantity -= 1;
        saveCart(cart);
    };

    const newCart = getCart();
    getCartQty(cartCount);
    cartModal.content.innerHTML = '';

    if(newCart.length === 0) {
        renderEmptyCart(cartModal.content);
    } else {
        newCart.map(cartProduct => renderCart(cartProduct, cartModal.content));
        renderCartTotal(cartModal.content);
    };    
};
// CART OPERATIONS //

// CART RENDERING //
const openCart = (cart) => {
    cart.classList.remove('d-none');
    cart.classList.add('d-block');

    cartClosingBehaviour(cart);
};

const closeCart = (cart) => {
    cart.classList.remove('d-block');
    cart.classList.add('d-none');
};

const cartClosingBehaviour = (cart) => {
    cart.addEventListener('click', (e) => {
        const cartClick = e.target.closest('.modal-cart');
        const closeClick = e.target.closest('.btn-close');

        if(!cartClick || closeClick) {
            closeCart(cart);
        };
    });
};

const renderEmptyCart = (container) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'd-flex justify-content-center align-items-center h-100');

    const emptyCart = document.createElement('h5');
    emptyCart.setAttribute('class', 'text-center');
    emptyCart.textContent = 'Your Cart is empty!';

    div.appendChild(emptyCart);
    container.appendChild(div);
}

const renderCart = (cartProduct, container) => {
    const { id, name, quantity, price } = cartProduct;

    const row = document.createElement('div');
    row.setAttribute('class', 'row mb-3');

    const colName = document.createElement('div');
    colName.setAttribute('class', 'col col-6 col-md-7');
    const productName = document.createElement('p');
    productName.setAttribute('class', 'text-truncate pe-4');
    productName.textContent = name;

    colName.appendChild(productName);

    const colQty = document.createElement('div');
    colQty.setAttribute('class', 'col col-1');
    const productQty = document.createElement('p');
    productQty.setAttribute('class', 'text-end');
    productQty.textContent = quantity;

    colQty.appendChild(productQty);

    const colPrice = document.createElement('div');
    colPrice.setAttribute('class', 'col col-3');
    const productPrice = document.createElement('p');
    productPrice.setAttribute('class', 'text-end');
    productPrice.textContent = `€ ${formatPriceDecimal(price)}`;

    colPrice.appendChild(productPrice);

    const colDelete = document.createElement('div');
    colDelete.setAttribute('class', 'col col-2 col-md-1');
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'btn btn-danger delete-btn');
    deleteBtn.setAttribute('data-product-id', id);
    deleteBtn.innerHTML = `<i class="bi bi-trash"></i>`;

    colDelete.appendChild(deleteBtn);
    
    row.append(colName, colQty, colPrice, colDelete);
    container.appendChild(row);
};

const renderCartTotal = (container) => {
    const row = document.createElement('div');
    row.setAttribute('class', 'row mt-4');

    const textCol = document.createElement('div');
    textCol.setAttribute('class', 'col col-8');
    const totalText = document.createElement('h5');
    totalText.textContent = 'Cart Total :';

    textCol.appendChild(totalText);

    const totalCol = document.createElement('div');
    totalCol.setAttribute('class', 'col col-4');
    const cartTotal = document.createElement('p');
    cartTotal.setAttribute('class', 'fw-bold fs-5 text-end');
    cartTotal.setAttribute('id', 'cart-total');
    cartTotal.textContent = `€ ${getCartTotal()}`;

    totalCol.appendChild(cartTotal);

    row.append(textCol, totalCol);
    container.appendChild(row);
}
// CART RENDERING //