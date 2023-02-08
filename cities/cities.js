const inputCity = document.querySelector("#city");
const inputPopulation = document.querySelector("#population");
const inputId = document.querySelector("#id");
const submitButton = document.querySelector("#submit-button");
const addCity = document.querySelector("#add-city");
const changeCity = document.querySelector("#change-city");
const deliteCity = document.querySelector("#delite-city");
const textInput = document.querySelector("#text-input");
const form = document.querySelector("#form");
const infoIcon = document.querySelector("#info-icon");
const infoIconBox = document.querySelector("#info-icon-box");
const typeOfSubmitForm = document.querySelector("#type-of-submit-form");

const render = ({ name, id, population }) => {
  const mainElement = document.querySelector("main");
  const divElement = document.createElement("div");
  divElement.className = "div-container";
  mainElement.appendChild(divElement);

  const nameElement = document.createElement("h2");
  nameElement.className = "name";

  const populationElement = document.createElement("p");
  populationElement.className = "population";

  const idElement = document.createElement("p");
  idElement.className = "id";

  divElement.appendChild(nameElement);
  divElement.appendChild(populationElement);
  divElement.appendChild(idElement);

  nameElement.textContent = name;
  populationElement.textContent = population;
  idElement.textContent = id;
};

fetch("https://avancera.app/cities/")
  .then((response) => response.json())
  .then((result) => result.forEach(render));

const onAddCity = () => {
  fetch("https://avancera.app/cities/", {
    body: JSON.stringify({
      name: inputCity.value,
      population: Number(inputPopulation.value),
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  })
    .then((response) => response.json())
    .then((result) => {
      const lastArray = result[result.length - 1];

      render(lastArray);
    });
};

const onChangeCity = () => {
  fetch("https://avancera.app/cities/" + inputId.value, {
    body: JSON.stringify({
      id: inputId.value,
      name: inputCity.value,
      population: Number(inputPopulation.value),
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  }).then((response) => {
    window.location.reload();
  });
};

const onDeliteCity = () => {
  fetch("https://avancera.app/cities/" + inputId.value, {
    body: JSON.stringify({ id: inputId.value }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
  }).then((response) => {
    window.location.reload();
  });
};
inputId.style.display = "none";
textInput.style.display = "none";

// vilka input felt som ska synas
addCity.addEventListener("input", () => {
  textInput.style.display = "flex";
  inputId.style.display = "none";
  infoIcon.style.display = "none";
  inputCity.setAttribute("required", "");
  inputPopulation.setAttribute("required", "");
});

changeCity.addEventListener("input", (event) => {
  textInput.style.display = "flex";
  inputId.style.display = "block";
  infoIcon.style.display = "block";
  infoIcon.style.display = "block";
  inputId.setAttribute("required", "");
  inputCity.setAttribute("required", "");
  inputPopulation.setAttribute("required", "");
});

deliteCity.addEventListener("input", (event) => {
  textInput.style.display = "flex";
  inputId.style.display = "block";
  inputId.setAttribute("required", "");
  infoIcon.style.display = "block";
});

form.addEventListener("submit", (event) => {
  if (addCity.checked) {
    onAddCity();
  }

  if (changeCity.checked) {
    onChangeCity();
  }

  if (deliteCity.checked) {
    onDeliteCity();
  }
  event.preventDefault();
});

// Info icon
infoIconBox.style.display = "none";
infoIcon.style.display = "none";

infoIcon.addEventListener("click", (event) => {
  if (infoIconBox.style.display === "none") {
    infoIconBox.style.display = "block";
  } else {
    infoIconBox.style.display = "none";
  }
});
