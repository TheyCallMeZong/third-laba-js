import "./index1.css"

const axios = require("axios");

const form = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const locationInput = document.querySelector('#location-input');
const jobListings = document.querySelector('#job-listings');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchText = searchInput.value;
    const locationText = locationInput.value;
    axios.get(`https://api.hh.ru/vacancies`, {
        params: {
            text: searchText,
            area: locationText
        }
    })
        .then(response => {
            jobListings.innerHTML = '';
            response.data.items.forEach(item => {
                const jobListing = document.createElement('li');
                jobListing.classList.add('job-listing');
                jobListing.innerHTML = `
          <h2>${item.name}</h2>
          <p>${item.employer.name} - ${item.area.name}</p>
          <a href="${item.alternate_url}" target="_blank">Apply now</a>
        `;
                jobListings.appendChild(jobListing);
            });
        })
        .catch(error => console.error(error));
});
