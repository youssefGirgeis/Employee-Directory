const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayEmployee(data.results);
  } catch (error) {}
};

fetchData("https://randomuser.me/api/?results=12");
