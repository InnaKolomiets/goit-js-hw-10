import { fetchBreeds, fetchCatByBreed } from "./js/cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const catInfoDiv = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const errorMessage = document.querySelector(".error");

const fillBreedOptions = breeds => {
  breedSelect.innerHTML = "";
  breeds.forEach(breed => {
    const option = document.createElement("option");
    option.value = breed.id;
    option.text = breed.name;
    breedSelect.appendChild(option);
  });
}

const displayCatInfo = cat => {
  catInfoDiv.innerHTML = `
    <img src="${cat[0].url}" alt="Cat Image" />
    <h3>${cat[0].breeds[0].name}</h3>
    <p>${cat[0].breeds[0].description}</p>
    <p><span>Temperament:</span> ${cat[0].breeds[0].temperament}</p>
  `;
  catInfoDiv.style.display = "block";
}

breedSelect.addEventListener("change", event => {
  const selectedBreedId = event.target.value;
  loader.style.display = "block";
  errorMessage.style.display = "none";
  catInfoDiv.style.display = "none";


  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      displayCatInfo(cat);
    })
    .catch(error => {
      console.error("Error fetching cat info:", error);
      errorMessage.style.display = "block";
    })
    .finally(() => {
      loader.style.display = "none";
    });
});


fetchBreeds()
  .then(breeds => {
    fillBreedOptions(breeds);
  })
  .catch(error => {
    console.error("Error fetching breeds:", error);
    errorMessage.style.display = "block";
  });