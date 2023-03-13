import './index1.css';

const axios = require('axios');

const form = document.querySelector('form');
const locationInput = document.querySelector('#location-input');
const jobListings = document.querySelector('#job-listings');
const searchInput = document.querySelector('#search-input');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchText = searchInput.value;
    const locationName = locationInput.value;
    let localId = 0;
    axios
        .get(`https://api.hh.ru/areas`)
        .then((response) => {
            for (let e of response.data){
                for (let a of e.areas){
                    if (a.name === locationName){
                        localId = a.id
                    }
                }
            }
            axios
                .get(`https://api.hh.ru/vacancies`, {
                    params: {
                        text: searchText,
                        area: localId,
                    },
                })
                .then((response) => {
                    jobListings.innerHTML = '';
                    response.data.items.forEach((item) => {
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
                .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
});
