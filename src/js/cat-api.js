import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_lv1jZjaVP8C6yrO1gWMf4R9ZA6BSHAqJXeCtnVLypk99sq9DpVMbSQtGku7NylQU";

const apiUrl = "https://api.thecatapi.com/v1";


  export function fetchBreeds() {
    return axios.get(`${apiUrl}/breeds`)
      .then(response => response.data);
}

export function fetchCatByBreed(breedId) {
  return axios.get(`${apiUrl}/images/search?breed_ids=${breedId}`)
    .then(response => response.data);
}