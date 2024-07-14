

// Variable to hold the full list of breeds
let allBreeds = [];

// Function to fetch and display dog images
const fetchDogImages = () => {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      const images = data.message;
      const container = document.getElementById('dog-image-container');

      images.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'A cute dog';
        container.appendChild(img);
      });
    })
    .catch(error => console.error('Error fetching dog images:', error));
};

// Function to fetch and display dog breeds
const fetchDogBreeds = () => {
  const breedUrl = "https://dog.ceo/api/breeds/list/all";

  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      allBreeds = Object.keys(data.message);  // Store all breeds in a variable
      const ul = document.getElementById('dog-breeds');

      // Clear any existing breeds
      ul.innerHTML = '';

      allBreeds.forEach(breed => {
        // Create an <li> for each breed
        const li = document.createElement('li');
        li.textContent = breed;
        ul.appendChild(li);
      });

      addBreedClickEvent();  // Reattach the click event to newly added breeds
    })
    .catch(error => console.error('Error fetching dog breeds:', error));
};

// Function to change the color of the clicked breed
const addBreedClickEvent = () => {
  const ul = document.getElementById('dog-breeds');

  ul.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
      event.target.style.color = 'blue'; // Change color to blue or any color of your choice
    }
  });
};

// Function to filter breeds based on the selected letter
const filterBreeds = (letter) => {
  const ul = document.getElementById('dog-breeds');
  ul.innerHTML = ''; // Clear the current list of breeds

  const filteredBreeds = allBreeds.filter(breed => breed.startsWith(letter));

  filteredBreeds.forEach(breed => {
    const li = document.createElement('li');
    li.textContent = breed;
    ul.appendChild(li);
  });
};

// Event listener for the dropdown menu
const setupDropdown = () => {
  const dropdown = document.getElementById('breed-dropdown');

  dropdown.addEventListener('change', (event) => {
    const selectedLetter = event.target.value;
    filterBreeds(selectedLetter);
  });
};

// Ensure the DOM is fully loaded before running the fetchDogImages, fetchDogBreeds, and setupDropdown functions
document.addEventListener('DOMContentLoaded', () => {
  fetchDogImages(); // Fetch images first
  fetchDogBreeds(); // Fetch breeds
  setupDropdown();  // Setup the dropdown menu
});
