function login() {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      fetch("http://localhost:3333/api/author/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            console.log("Login successfuly");
            return response.json();
          } else {
            console.log("Login failed");
          }
        })
        .then((data) => {
          console.log(data);
          localStorage.setItem("access_token", data.accessToken);
        });
    } catch (error) {
      console.log(error);
    }
  });
}

async function getAuthors() {
  let accessToken = localStorage.getItem("access_token");

  const accessTokenExpTime = getTokenExpTime(accessToken);
  console.log("accessTokenExpTime", accessTokenExpTime);

  if (accessTokenExpTime) {
    const currentTime = new Date();
    if (currentTime < accessTokenExpTime) {
      console.log("AccessToken faol");
    } else {
      console.log("AccessToken vaqti chiqib ketti");
      accessToken = await refreshToken();
    }
  } else {
    console.log("AccessToken chiqish vaqti berilmagan");
  }

  fetch("http://localhost:3333/api/author", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Request failed with status: ", response.status);
      }
    })
    .then((authorData) => {
      console.log(authorData);
      displayAuthors(authorData.data);
    })
    .catch((error) => {
      console.log("Error", error);
    });
}

function displayAuthors(authorsData) {
  const authorsList = document.getElementById("list-authors");
  authorsData.forEach((author) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${author.first_name} ${author.last_name} - ${author.email}`;
    authorsList.appendChild(listItem);
  });
  return;
}

function getTokenExpTime(token) {
  const decodedToken = JSON.parse(atob(token.split(".")[1]));

  if (decodedToken.exp) {
    return new Date(decodedToken.exp * 1000);
  }
  return null;
}

async function refreshToken() {
  const loginUrl = "/login";

  try {
    const response = await fetch("http://localhost:3333/api/author/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.message && data.message == "jwt expired") {
      console.log("Refresh tokenning vaqti chiqib ketgan");
      return window.location.replace(loginUrl);
    }
    console.log("Tokenlar refresh token yordami yangilandi");
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.log(error);
    return window.location.replace(loginUrl);
  }
}
