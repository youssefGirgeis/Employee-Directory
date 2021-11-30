const gallery = document.getElementById("gallery");
const searchContainer = document.querySelector(".search-container");

const createSearch = () => {
  const searchFormHtml = `
  <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
  `;
  searchContainer.insertAdjacentHTML("beforeend", searchFormHtml);
};

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayEmployees(data.results);
    createModal();
  } catch (error) {}
};

const displayEmployees = (employees) => {
  employees.forEach((employee) => {
    const employeeHTML = `
      <div class="card">
        <div class="card-img-container">
          <img class="card-img" src="${
            employee.picture.large
          }" alt="profile picture">
        </div>

        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${employee.name.first} ${
      employee.name.last
    }</h3>
          <p class="card-text card-email">${employee.email}</p>
          <p class="card-text card-city cap">${employee.location.city}, ${
      employee.location.state
    }</p>
          <p class="cell" hidden>${employee.cell}</p>
          <p class="address" hidden>${createAddress(employee.location)}</p>
          <p class="birthday" hidden>${createBirthDate(employee.dob.date)}</p>
          
        </div>
      </div>
    `;
    gallery.insertAdjacentHTML("beforeend", employeeHTML);
  });
};

function createAddress(location) {
  return `${location.street.number} ${location.street.name}, 
  ${location.city}, ${location.state} ${location.postcode}`;
}

function createBirthDate(birthDate) {
  const month = new Date(birthDate).getMonth();
  const day = new Date(birthDate).getDate();
  const year = new Date(birthDate).getFullYear();
  return `${month}/${day}/${year}`;
}

function createModal() {
  const cards = document.querySelectorAll(".card");
  for (const card of cards) {
    card.addEventListener("click", (e) => {
      const imageContainer = card.querySelector(".card-img-container");
      const infoContainer = card.querySelector(".card-info-container");
      const modal = `
      <div class="modal-container">
        <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn">
          <strong>X</strong>
          </button>
          <div class="modal-info-container">
            <img class="modal-img" src="${
              imageContainer.querySelector("img").src
            }" alt="profile picture">
            <h3 id="name" class="modal-name cap">${
              infoContainer.querySelector("h3.card-name").textContent
            }</h3>
            <p class="modal-text">${
              infoContainer.querySelector("p.card-email").textContent
            }</p>
            <p class="modal-text cap">${
              infoContainer.querySelector("p.card-city").textContent
            }</p>
            <hr>
            <p class="modal-text">${
              infoContainer.querySelector("p.cell").textContent
            }</p>
            <p class="modal-text">${
              infoContainer.querySelector("p.address").textContent
            }</p>
            <p class="modal-text">Birthday: ${
              infoContainer.querySelector("p.birthday").textContent
            }</p>
          </div>
        </div>
    </div>
      `;
      gallery.insertAdjacentHTML("afterend", modal);
      hideModal();
    });
  }
}

const hideModal = () => {
  const closeBtn = document.getElementById("modal-close-btn");
  closeBtn.addEventListener("click", (e) => {
    document.querySelector(".modal-container").remove();
  });
};

const search = (e) => {
  console.log(e.target);
  const cards = document.querySelectorAll(".card");
  for (const card of cards) {
    const infoContainer = card.querySelector(".card-info-container");
    const employeeName = infoContainer
      .querySelector("h3.card-name")
      .textContent.toLowerCase();
    if (
      employeeName.includes(searchInput.value.toLowerCase()) ||
      searchInput.value === ""
    ) {
      card.style.display = "inherit";
    } else {
      card.style.display = "none";
    }
  }
};

createSearch();
fetchData("https://randomuser.me/api/?results=12&nat=CA");

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("click", search);
searchInput.addEventListener("keyup", search);
