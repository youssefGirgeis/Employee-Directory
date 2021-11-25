const gallery = document.getElementById("gallery");

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayEmployees(data.results);

    const birthDate = new Date(data.results[0].dob.date).getMonth();
    console.log(birthDate);
    createModal();
  } catch (error) {}
};

const displayEmployees = (employees) => {
  console.log(employees);
  employees.forEach((employee) => {
    const employeeHTML = `
      <div class="card">
        <div class="card-img-container">
          <img class="card-img" src="${employee.picture.large}" alt="profile picture">
        </div>

        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="card-text card-email">${employee.email}</p>
          <p class="card-text card-city cap">${employee.location.city}, ${employee.location.state}</p>
        </div>
      </div>
    `;
    gallery.insertAdjacentHTML("beforeend", employeeHTML);
    const birthday = createBirthDate(employee.dob.date);
  });
};

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
      console.log("modal");
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
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
          </div>
        </div>
    </div>
      `;
      gallery.insertAdjacentHTML("afterend", modal);
    });
  }
}

fetchData("https://randomuser.me/api/?results=12");
