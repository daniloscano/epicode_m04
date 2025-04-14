// LOADERS //
const loaderHandler = (loader, content) => {
    loader.classList.toggle('d-none');
    content.classList.toggle('d-none');
};
// LOADERS //

// ERRORS //
const errorHandler = (alert, content, error) => {
    content.classList.toggle('d-none');
    alert.classList.toggle('d-none');
    alert.innerText = error.message;
};
// ERRORS