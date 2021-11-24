const gallery = document.getElementById("gallery");

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayEmployee(data.results);
  } catch (error) {}
};

const displayEmployee = (employees) => {
  console.log(employees);
  employees.forEach((employee) => {
    const employeeHTML = `
      <div class="card">
        <div class="card-img-container">
          <img class="card-img" src="${employee.picture.large}" alt="profile picture">
        </div>

        <div class="card-info-container">
          <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="card-text">${employee.email}</p>
          <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>
      </div>
    `;
    gallery.insertAdjacentHTML("beforeend", employeeHTML);
  });
};

fetchData("https://randomuser.me/api/?results=12");

// <div class="card">
// <div class="card-img-container">
//     <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
// </div>
// <div class="card-info-container">
//     <h3 id="name" class="card-name cap">first last</h3>
//     <p class="card-text">email</p>
//     <p class="card-text cap">city, state</p>
// </div>
// </div>
