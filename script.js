/* ------------------------------ TASK 3 -----------------------------------
Parašykite JS kodą, kuris leis vartotojui paspaudus ant mygtuko "Show users"
pamatyti vartotojus iš Github API (endpoint'as pateiktas žemiau).

Paspaudus mygtuką "Show users":
1. Pateikiamas informacijos atvaizdavimas <div id="output"></div> bloke
1.1. Informacija, kuri pateikiama: "login" ir "avatar_url" reikšmės (kortelėje)
2. Žinutė "Press "Show Users" button to see users" turi išnykti;
"
Pastaba: Informacija apie user'į (jo kortelė) turi turėti bent minimalų stilių;
-------------------------------------------------------------------------- */

const ENDPOINT = "https://api.github.com/users";

document.getElementById("btn").addEventListener("click", function () {
  const output = document.getElementById("output");
  output.innerHTML = `
    <table id="usersBox">
      <thead>
        <tr>
          <th width="40%">Login</th>
          <th width="50%">Avatar</th>
        </tr>
      </thead>
      <tbody usersInfo></tbody>
    </table>
  `;

  const usersBox = document.getElementById("usersBox");
  usersBox.style.border = "1px solid black";
  usersBox.style.width = "100%";
  usersBox.style.margin = "0 auto";
  usersBox.style.borderCollapse = "collapse";

  const thStyle =
    "padding: 10px; text-align: left; background-color: lightblue;";
  const tdStyle =
    "padding: 10px; text-align: left; border-bottom: 1px solid grey;";

  const ths = document.querySelectorAll("th");
  ths[0].setAttribute("style", thStyle);
  ths[1].setAttribute("style", thStyle);

  function dataFromGit() {
    return fetch(ENDPOINT).then((response) => response.json());
  }

  dataFromGit()
    .then((data) => {
      createTable(data);
    })
    .catch((error) => console.log(error));

  function createTable(data) {
    let gitInfo = document.querySelector("[usersInfo]");
    gitInfo.innerHTML = "";

    data.map((table) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td style="${tdStyle}">${table.login}</td>
        <td style="${tdStyle}">
          <div style="display: flex; align-items: center;">
            <img src="${table.avatar_url}" style="width: 50px; height: 50px;">
            <p style="margin: 0;">${table.login}</p>
          </div>
        </td>
      `;

      gitInfo.append(tr);
      tr.style.borderBottom = "1px solid grey";
    });
  }
});
