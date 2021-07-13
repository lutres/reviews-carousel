const urlUsers = 'https://reqres.in/api/users?page=2'

const reviewContainer = document.querySelector('.review');
const btnBackward     = document.querySelector('#backward');
const btnForward      = document.querySelector('#forward');
const btnRandom       = document.querySelector('.random');

let page = 0;

const getUsers = async() => {

    const resp = await fetch(urlUsers);
    const {data:users} = await resp.json();

    return users;

}

const createHTML = (user) => {

    const reviewTemplate = 
    `
        <img class="avatar" src="${user.avatar}" alt="" srcset="">
        <h1 class="name">${user.first_name} ${user.last_name}</h1>
        <h2 class="email">${user.email}</h2>
        <p class="description">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        </p>
    `

    reviewContainer.innerHTML = reviewTemplate;

}

btnBackward.addEventListener('click', () => {
    page--;
    loadUser();
})
btnForward.addEventListener('click', () => {
    page++
    loadUser();
})

btnRandom.addEventListener('click', async() => {

    const user = await getUsers();

    const randomUser = Math.floor(Math.random() * user.length);

    createHTML(user[randomUser]);

})

const loadUser = async() => {

    const user = await getUsers();

    if (page >= user.length) {
        page = 0;
    } else if (page < 0) {
        page = user.length -1;
    }

    createHTML(user[page]);

}

    loadUser();