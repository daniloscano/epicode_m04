// DOM Elements //
const notification = document.getElementById('notification-alert');
const websiteBtn = document.querySelector('.website-btn');

const products = {
    content: document.getElementById('products-list'),
    newProductBtn: document.getElementById('new-product-btn'),
    loader: document.getElementById('products-list-loader'),
    error: document.getElementById('products-list-error'),
    table: document.getElementById('products-list-table'),
    body: document.getElementById('products-list-body')
};

const formModal = {
    modal: document.getElementById('modal-form'),
    title: document.getElementById('form-title'),
    closeBtn: document.getElementById('form-close-btn'),
    error: document.getElementById('form-error'),
    loader: document.getElementById('form-loader'),
    form: document.getElementById('form'),
    submit: document.getElementById('submit-form-btn')
};

const previewModal = {
    modal: document.getElementById('modal-preview'),
    title: document.getElementById('preview-title'),
    closeBtn: document.getElementById('preview-close-btn'),
    body: document.getElementById('preview-body'),
    error: document.getElementById('preview-error'),
    loader: document.getElementById('preview-loader'),
    content: document.getElementById('preview-content')
};
// end DOM Elements //

websiteBtn.addEventListener('click', () => {
    window.location.href = '../index.html';
});

getProductsList()
    .then(productsList => {
        products.body.innerHTML = '';
        productsList.forEach(product => renderTableRows(product, products.body));
    })
    .catch(error => {
        errorHandler(products.error, products.table, error);
        disableCreateBtn(products.newProductBtn);
    });

const eventHandler = (e) => {
    const isBtn = e.target.closest('.btn');
    if(isBtn) {
        const action = isBtn.getAttribute('data-action') ?? 'no action';
        const id = isBtn.getAttribute('data-product-id');
        const title = action.slice(0, 1).toUpperCase() + action.slice(1, action.length);

        

        switch (action) {
            case 'create':
                formModal.form.reset();
                formFieldsValidation(formModal);
                openModal(formModal, title);
                
                const submitForm = async (e) => {
                    e.preventDefault();

                    formModal.form.removeEventListener('submit', submitForm);

                    await createProduct(formSubmit(formModal.form))
                        .then(res => notificationSuccess(action))
                        .catch(error => notificationError(error.message))
                        .finally( () => {
                            formModal.form.reset();
                            closeModal(formModal);
                        });                    

                    await getProductsList()
                        .then(productsList => {
                            products.body.innerHTML = '';
                            productsList.forEach(product => renderTableRows(product, products.body));
                        });
                };
                        
            formModal.form.addEventListener('submit', submitForm);
            break;

            case 'edit':
                getProductById(id)
                    .then(product => {
                        renderForm(formModal.form, product);
                        formFieldsValidation(formModal);
                        openModal(formModal, title);
                    })
                    .catch(error => notificationError(error.message));

                formModal.form.addEventListener('submit', async (e) => {
                e.preventDefault();

                    await updateProduct(id, formSubmit(formModal.form))
                        .then(res => notificationSuccess(action))
                        .catch(error => notificationError(error.message))
                        .finally( () => {
                            formModal.form.reset();
                            closeModal(formModal);
                    });
        
                    await getProductsList()
                        .then(productsList => {
                            products.body.innerHTML = '';
                            productsList.forEach(product => renderTableRows(product, products.body));
                        });
                });
                break;

            case 'delete':
                const deleteFunction = async () => {
                    await deleteProduct(id)
                        .then(res => notificationSuccess(action))
                        .catch(error => notificationError(error.message))
    
                    await getProductsList()
                        .then(productsList => {
                            products.body.innerHTML = '';
                            productsList.forEach(product => {
                                renderTableRows(product, products.body);
                            });
                        });
                };
                deleteFunction();
                break;

            case 'preview':
                console.log(`method: ${title}`);
                previewModal.content.innerHTML = '';
                getProductById(id)
                    .then(product => {
                        renderPreview(product, previewModal.content);
                        openModal(previewModal, title);
                    });
                break;

            default:
                return;
        };
    };
};

const formFieldsValidation = (modal) => {
    Object.keys(validationRules).forEach(inputField => {
        const input = modal["form"].elements[inputField];
        if(input) {
            input.classList.remove('is-invalid');
            input.classList.remove('is-valid');
            input.nextElementSibling.innerText = '';

            input.addEventListener('input', () => {
                validateField(input, validationRules[inputField]);
                let isValid = validateField(input, validationRules[inputField]);
                
                isValid
                    ? modal["submit"].removeAttribute('disabled')
                    : modal["submit"].setAttribute('disabled', true)
                }
            );
        };
    });
};

products.content.addEventListener('click', eventHandler);