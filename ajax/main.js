let fetchData = () => {
  let httprequest = new XMLHttpRequest();
  httprequest.open("GET", "https://jsonplaceholder.typicode.com/users");
  httprequest.send();

  httprequest.onload = () => {
    if (httprequest.status === 200) {
      let res = JSON.parse(httprequest.responseText);

      // Retrieve existing users from localStorage
      let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      // If localStorage is empty, save API data
      if (storedUsers.length === 0) {
        localStorage.setItem("users", JSON.stringify(res));
      }

      displayData();
    }
  };
};

let displayData = () => {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  storedUsers.forEach((user, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.address.city}</td>
      </tr>`;
  });
};

// Initial Data Load
fetchData();

let btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const city = document.getElementById("city").value;
  const phone = document.getElementById("phone").value;

  let postObject = {
    name,
    username,
    email,
    phone,
    password, // Not used in API but stored locally
    address: { city },
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/users/");
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  xhr.send(JSON.stringify(postObject));

  xhr.onload = () => {
    if (xhr.status === 201) {
      let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      storedUsers.unshift(postObject);
      localStorage.setItem("users", JSON.stringify(storedUsers));
      displayData();
    }
  };
});
