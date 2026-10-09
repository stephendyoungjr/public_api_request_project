
// make code a little cleaner and easier to read, oppossed to having a longer line for 33
const gallery = document.querySelector("#gallery");
const closeButton = document.querySelector(".modal-close-btn");
const modalContainer = document.querySelector(".modal-container");
const modalInfoContainer = document.querySelector(".modal-info-container");
let users = [];

//sets modal display to none, hidden
modalContainer.style.display = "none";

gallery.addEventListener('click',(event)=> {
    const userCard = event.target.closest('.card');
    if(!userCard) return;

    displayUserModal(users[userCard.dataset.index]);
});

closeButton.addEventListener('click', () => {
    modalContainer.style.display = "none";
});






function displayUserModal(user){
    const address = `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}`;
    const dobString = user.dob.date;
    const birthday = `${dobString.slice(5, 7)}/${dobString.slice(8, 10)}/${dobString.slice(0, 4)}`;
    
    // wrapper div removed, since modalInfoContainer is already that div
    const modalHtml = `
                        <img class="modal-img" src="${user.picture.medium}" alt="${user.name.first} ${user.name.last}">
                        <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                        <p class="modal-text">${user.email}</p>
                        <p class="modal-text cap">${user.location.city}, ${user.location.state}</p>
                        <hr>
                        <p class="modal-text">${user.cell}</p>
                        <p class="modal-text">${address}</p>
                        <p class="modal-text">Birthday: ${birthday}</p>
    `;

    modalInfoContainer.innerHTML = modalHtml;

    // show the container, not the inner div
    modalContainer.style.display = "";


}

async function getUsers() {
    try {
        // response fetched 12 users, as well as only data for picture, name, email, location, cell, and dob
        const response = await fetch("https://randomuser.me/api/?results=12&nat=us&inc=picture,name,email,location,cell,dob");
        // if the response is not ok, throw an error and share status code
        if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);
        // data calls back an object, results is the array of users
        const data = await response.json();
        // save results to the global users array so the click handler can find them
        users = data.results;
        //specfically calls displayUsers on user array, which is results 
        displayUsers(users);
        //catch error and console log error
    } catch (error) {
        console.error(error);
    }
}

function displayUsers(users) {
    //looop through user information and create card for each user 
    users.forEach((user, index) => {   // index added so each card can store its position
        const userHtml = `
            <div class="card" data-index="${index}">
                <div class="card-img-container">
                    <img class="card-img" src="${user.picture.medium}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 class="card-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="card-text">${user.email}</p>
                    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                </div>
            </div>
        `;
    // add each user card to the gallery container, beforeend to add at end 
        gallery.insertAdjacentHTML("beforeend", userHtml);
    });
}







//call getUsers, to fetch user information 
getUsers();