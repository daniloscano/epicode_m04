const ENDPOINT = 'https://striveschool-api.herokuapp.com/api/product/';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2ViMDVhN2U5YTNmMDAwMTUxNDk2MWMiLCJpYXQiOjE3NDM0NTU2NTUsImV4cCI6MTc0NDY2NTI1NX0.Aiy7mIJ5vYDho9Ry2Tq9TBemMJfA2cnukWh22qPt1TM';

const getAllProducts = async () => {
    loaderHandler(products.loader, products.content);
    try {
        const response = await fetch(ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`,
            }
        });
        return await response.json();
    } catch (error) {
        throw new Error('Impossibile recuperare i prodotti! Riprova più tardi.')
    } finally {
        loaderHandler(products.loader, products.content);
    }
};

const getProductById = async (id) => {
    loaderHandler(productSection.loader, productSection.details);
    try {
        const response = await fetch(`${ENDPOINT}${id}`, {
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`,
            }
        });
        return await response.json();
    } catch (error) {
        throw new Error('Impossibile recuperare il prodotto! Riprova più tardi.');
    } finally {
        loaderHandler(productSection.loader, productSection.details);
    };
};

const formatPriceDecimal = (price) => {
    price = String(price);
    const isPriceFloat = price.includes('.');

    if(isPriceFloat) {
        const intPart = price.slice(0, price.indexOf('.'));
        const decimalPart = price.slice(price.indexOf('.')+1);
        const formattedDecimal = decimalPart.padEnd(2, '0');
        
        return `${intPart}.${formattedDecimal}`
    } else {
        return price.concat('.00');
    }
};

const renderProduct = (product, container) => {
    const { _id, name, brand, price, imageUrl: image } = product;

    const column = document.createElement('div');
    column.setAttribute('class', 'col');

    const card = document.createElement('div');
    card.setAttribute('class', 'd-flex flex-column justify-content-center gap-1 p-3 product-card');
    card.setAttribute('data-product-id', _id);

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
    cardPrice.textContent = `€ ${formatPriceDecimal(price)}`;

    const addToCartBtn = document.createElement('button');
    addToCartBtn.setAttribute('class', 'btn add-to-cart-btn');
    addToCartBtn.setAttribute('data-action', 'add-to-cart');
    addToCartBtn.setAttribute('data-product-id', _id);
    addToCartBtn.textContent = 'Add to Cart';

    card.append(cardImage, cardTitle, cardBrand, cardPrice, addToCartBtn);
    column.appendChild(card);
    container.appendChild(column);
};

const renderProductDetails = (product) => {
    const { _id, name, brand, description, price, imageUrl: image } = product;

    productDetails.image.src = image;
    productDetails.name.textContent = name;
    productDetails.brand.textContent = brand;
    productDetails.price.textContent = `€ ${formatPriceDecimal(price)}`;
    productDetails.description.textContent = description;
    productDetails.add.setAttribute('data-product-id', _id);
};

