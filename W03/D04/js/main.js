const ENDPOINT = 'https://jsonplaceholder.typicode.com/users';

const tableBodyContainer = document.getElementById('table-data');
const formInput = document.getElementById('search-user-form');
const searchField = document.getElementById('input-field');
const searchText = document.getElementById('input-text');

const usersResults = [];

const getUsersData = async () => {
    const response = await fetch(ENDPOINT)
    const users = await response.json()
    return users
}

const generateTableBody = (user) => {
    const { id, name, username, email, website } = user
    const userData = [id, name, username, email, website];

    const result = {
        id: id,
        name: name.toLowerCase(),
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        website: website.toLowerCase()
    }

    usersResults.push(result);

    const tableRow = document.createElement('tr');

    userData.map((data) => {
        const td = document.createElement('td');
        td.textContent = data;
        tableRow.appendChild(td);
    })

    tableBodyContainer.appendChild(tableRow);
}

getUsersData()
    .then(users => users.map(user => {
        generateTableBody(user)
    }));

formInput.addEventListener('submit', (event) => {
    event.preventDefault();
    const isFieldValid = searchField.value !== '';
    const isTextValid = searchText.value.trim().length > 2;
    
    if (isFieldValid && isTextValid) {
        const field = searchField.value;
        const text = searchText.value.trim().toLowerCase()
        const filteredUsers = usersResults.filter(user => user[field].includes(text))
        tableBodyContainer.innerHTML = '';
        filteredUsers.forEach(user => generateTableBody(user))
    }
})