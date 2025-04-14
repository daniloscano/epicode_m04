// API
const ENDPOINT = 'https://striveschool-api.herokuapp.com/api/product/';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2ViMDVhN2U5YTNmMDAwMTUxNDk2MWMiLCJpYXQiOjE3NDM0NTU2NTUsImV4cCI6MTc0NDY2NTI1NX0.Aiy7mIJ5vYDho9Ry2Tq9TBemMJfA2cnukWh22qPt1TM';
//

// CRUD OPERATIONS //
const getProductsList = async () => {
    loaderHandler(products.loader, products.table);
    try {
        const response = await fetch(ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`,
            }
        });
        return await response.json()
    } catch (error) {
        throw new Error('Impossibile recuperare l\'elenco dei prodotti!\nPer motivi di sicurezza sono state inibite ulteriori azioni.\nRiprova più tardi');
    } finally {
        loaderHandler(products.loader, products.table);
    };
};

const getProductById = async (id) => {
    try {
        const response = await fetch(`${ENDPOINT}${id}`, {
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`,
            }
        });
        return await response.json();
    } catch (error) {
        throw new Error('Impossibile recuperare il prodotto! Riprova più tardi!')
    }
};

const createProduct = async (product) => {
    try {
        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        });
        return await response.json();
    } catch (error) {
        throw new Error('Creazione del prodotto fallita! Riprova più tardi')
    };
};

const updateProduct = async (id, product) => {
    try {
        const response = await fetch(`${ENDPOINT}${id}`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        });
        return await response.json();
    } catch (error) {
        throw new Error('Modifica del prodotto fallita! Riprova più tardi')
    };
};

const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${ENDPOINT}${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`,
                'Content-Type': 'application/json',
            }
        });
        return await response.json();
    } catch (error) {
        throw new Error('Eliminazione del prodotto fallita! Riprova più tardi')
    };
};
// end CRUD OPERATIONS //

// RENDERING
const renderTableRows = (product, container) => {
    const {_id, name, brand, imageUrl: image, price } = product;

    const tr = document.createElement('tr');

    const tdPreview = document.createElement('td');

    const previewBtn = document.createElement('button');
    previewBtn.setAttribute('class', 'btn btn-outline-dark preview-btn');
    previewBtn.setAttribute('data-product-id', _id);
    previewBtn.setAttribute('data-action', 'preview');
    previewBtn.textContent = 'Preview';

    tdPreview.appendChild(previewBtn);
    tr.appendChild(tdPreview);

    [name, brand, image, price].map(element => {
        const td = document.createElement('td');
        td.setAttribute('class', 'text-truncate long-text');
        td.textContent = element;

        if(element === image) {
            td.setAttribute('class', 'd-none d-lg-table-cell text-truncate long-text');
        };

        if(element === price) {
            td.setAttribute('class', 'text-end text-truncate long-text');
            td.textContent = Number(element).toFixed(2);
        };

        tr.appendChild(td);
    });

    const td = document.createElement('td');

    const div = document.createElement('div');
    div.setAttribute('class', 'd-flex align-items-center gap-2');

    const editBtn = document.createElement('button');
    editBtn.setAttribute('class', 'btn btn-outline-dark edit-btn');
    editBtn.setAttribute('data-product-id', _id);
    editBtn.setAttribute('data-action', 'edit');
    editBtn.innerHTML = `<i class="bi bi-pencil-square"></i>`;

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'btn btn-danger delete-btn');
    deleteBtn.setAttribute('data-product-id', _id);
    deleteBtn.setAttribute('data-action', 'delete');
    deleteBtn.innerHTML = `<i class="bi bi-trash"></i>`;

    div.append(editBtn, deleteBtn);
    td.appendChild(div);
    tr.appendChild(td);
    container.appendChild(tr);
};

const renderForm = (form, product) => {
    const { _id: id, name, brand, description, imageUrl: image, price } = product;

    form.id.value = id;
    form.name.value = name;
    form.brand.value = brand;
    form.description.value = description;
    form.image.value = image;
    form.price.value = price;
};

const renderPreview = (product, content) => {
    const { name, brand, price, imageUrl: image } = product;

    loaderHandler(previewModal.loader, previewModal.content);

    const card = document.createElement('div');
    card.setAttribute('class', 'd-flex flex-column justify-content-center gap-1 p-3 product-card');

    const cardImage = document.createElement('img');
    cardImage.setAttribute('class', 'img-fluid product-image');
    cardImage.src = image;

    const cardTitle = document.createElement('p');
    cardTitle.setAttribute('class', 'fs-5 fw-bold mt-2 mb-0 product-name');
    cardTitle.textContent = name;

    const cardBrand = document.createElement('p');
    cardBrand.setAttribute('class', 'fs-6 py-0 mt-0 mb-2 product-brand');
    cardBrand.textContent = brand;

    const cardPrice = document.createElement('p');
    cardPrice.setAttribute('class', 'mb-3 fs-5 product-price');
    cardPrice.textContent = `€ ${Number(price).toFixed(2)}`;

    const addToCartBtn = document.createElement('button');
    addToCartBtn.setAttribute('class', 'btn add-to-cart-btn');
    addToCartBtn.textContent = 'Add to Cart';

    card.append(cardImage, cardTitle, cardBrand, cardPrice, addToCartBtn);
    content.appendChild(card);

    loaderHandler(previewModal.loader, previewModal.content);
};
// RENDERING //

// MODAL BEHAVIOUR //
const openModal = (modal, descr) => {
    modal["modal"].classList.remove('d-none');
    modal["modal"].classList.add('d-block');

    if(descr === 'Preview'){
        modal.title.textContent = `Product Card ${descr}`;
    } else {
        modal.title.textContent = `${descr} Product`;
        modal.submit.textContent = descr;
    };

    modalClosingBehaviour(modal);
};

const closeModal = (modal) => {
    modal["modal"].classList.remove('d-block');
    modal["modal"].classList.add('d-none');
};

const modalClosingBehaviour = (modal) => {
    modal["modal"].addEventListener('click', (e) => {
        const modalClick = e.target.closest('.modal-content');
        const closeClick = e.target.closest('.btn-close');
    
        if(!modalClick || closeClick) {
            closeModal(modal);
        };
    });
};
// MODAL BEHAVIOUR //
