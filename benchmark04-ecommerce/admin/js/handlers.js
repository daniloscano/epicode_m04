// LOADERS //
const loaderHandler = (loader, content) => {
    loader.classList.toggle('d-none');
    content.classList.toggle('d-none');
};
// LOADERS //

// NOTIFICATIONS //
const notificationSuccess = (action) => {
    notification.classList.remove('d-none');
    notification.classList.remove('alert-danger');
    notification.classList.add('alert-success');

    switch (action) {
        case 'create':
            notification.innerText = 'Prodotto creato con successo';
        break;
        case 'edit':
            notification.innerText = 'Prodotto modificato con successo';
        break;
        case 'delete':
            notification.innerText = 'Prodotto eliminato con successo';
        break;
        default:
            return;
    };

    setTimeout(() => {
        notification.classList.add('d-none');
        notification.innerText = '';
    }, 3000);
};

const notificationError = (error) => {
    notification.classList.remove('d-none');
    notification.classList.remove('alert-success');
    notification.classList.add('alert-danger');

    notification.innerText = error.message;

    setTimeout(() => {
        notification.classList.add('d-none');
        notification.innerText = '';
    }, 3000);
};
// NOTIFICATIONS //

// ERRORS //
const errorHandler = (alert, content, error) => {
    content.classList.toggle('d-none');
    alert.classList.toggle('d-none');
    alert.innerText = error.message;
};

const disableCreateBtn = (button) => {
    button.setAttribute('disabled', true);
};
// ERRORS //