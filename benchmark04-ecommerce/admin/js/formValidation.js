const validationRules = {
    name: {
        validation: value => value.trim() !== '',
        message: 'Il nome del prodotto è obbligatorio'
    },
    description: {
        validation: value => value.trim() !== '',
        message: 'La descrizione del prodotto è obbligatoria'
    },
    brand: {
        validation: value => value.trim() !== '',
        message: 'Il brand del prodotto è obbligatorio'
    },
    image: {
        validation: value => value.trim() !== '' && ( value.startsWith('http://') || value.startsWith('https://') ),
        message: `L'immagine è obbligatoria: l'indirizzo deve iniziare con 'http://' oppure 'https://'`
    },
    price: {
        validation: value => value.trim() !== '' && value.trim() > 0 && !value.includes(','),
        message: 'Il prezzo è obbligatorio, deve essere maggiore di 0 e utilizzare il punto ( . ) per i decimali'
    },
};

const validateField = (input, rule) => {
    const isValid = rule.validation(input.value);
    const errorMessage = input.nextElementSibling;

    if(isValid) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        errorMessage.innerText = '';
    } else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        errorMessage.innerText = rule.message;
    };

    return isValid
};

const formSubmit = (form) => {
    const productPayload = {
        name: form.name.value.trim(),
        description: form.description.value.trim(),
        brand: form.brand.value.trim(),
        imageUrl: form.image.value.trim(),
        price: Number(form.price.value.trim())
    };

    return productPayload; 
};