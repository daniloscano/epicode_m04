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

const fetchResults = (user) => {
    const { id, name, username, email, website } = user

    const result = {
        id: id,
        name: name,
        username: username,
        email: email,
        website: website
    }

    usersResults.push(result);
}

const generateTableBody = (user) => {
    const { id, name, username, email, website } = user;
    const tableRow = document.createElement('tr');

    [ id, name, username, email, website ].map((data) => {
        const td = document.createElement('td');
        td.textContent = data;
        tableRow.appendChild(td);
    })

    tableBodyContainer.appendChild(tableRow);
}

getUsersData()
    .then(users => {
        users.map(user => {
            generateTableBody(user);
            fetchResults(user)
        }
    )});

formInput.addEventListener('submit', (event) => {
    event.preventDefault();
    const isFieldValid = searchField.value !== '';
    const isTextValid = searchText.value.trim().length > 2;
    
    if (isFieldValid && isTextValid) {
        const field = searchField.value;
        const text = searchText.value.trim().toLowerCase()
        const filteredUsers = usersResults.filter(user => user[field].toLowerCase().includes(text))
        tableBodyContainer.innerHTML = '';
        filteredUsers.forEach(user => generateTableBody(user))
    }
})