const gallery = document.querySelector(".gallery");

async function getUsers() {
    try {
        const response = await fetch("https://randomuser.me/api/?results=12&inc=picture,name,email,location");

        if (!response.ok) throw new Error(`Something went wrong: ${response.status}`);

        const data = await response.json();
        displayUsers(data.results);
    } catch (error) {
        console.error(error);
    }
}

function displayUsers(users) {
    users.forEach((user) => {
        const userHtml = `
            <div class="card">
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

        gallery.insertAdjacentHTML("beforeend", userHtml);
    });
}

getUsers();