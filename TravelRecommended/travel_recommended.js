async function fetchData() {
    try {
        const response = await fetch('travel_recommended_api.json');
        const data = await response.json();
        console.log(data); // Log the fetched data to verify it
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function search() {
    const keyword = document.getElementById('search-bar').value.toLowerCase().trim();
    console.log("Keyword entered:", keyword);

    fetchData().then(data => {
        let results = [];

        // Check if the search is related to countries
        if (keyword.includes("country") || keyword.includes("countries")) {
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    results.push({
                        name: city.name,
                        description: city.description,
                        imageUrl: city.imageUrl
                    });
                });
            });
        } 
        // Check if the search is related to beaches
        else if (keyword.includes("beach") || keyword.includes("beaches")) {
            data.beaches.forEach(beach => {
                results.push({
                    name: beach.name,
                    description: beach.description,
                    imageUrl: beach.imageUrl
                });
            });
        } 
        // Check if the search is related to temples
        else if (keyword.includes("temple") || keyword.includes("temples")) {
            data.temples.forEach(temple => {
                results.push({
                    name: temple.name,
                    description: temple.description,
                    imageUrl: temple.imageUrl
                });
            });
        } 
        // If the keyword is not a general category, search all fields
        else {
            // Search in countries and their cities
            data.countries.forEach(country => {
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(keyword) || city.description.toLowerCase().includes(keyword)) {
                        results.push({
                            name: city.name,
                            description: city.description,
                            imageUrl: city.imageUrl
                        });
                    }
                });
            });

            // Search in temples
            data.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(keyword) || temple.description.toLowerCase().includes(keyword)) {
                    results.push({
                        name: temple.name,
                        description: temple.description,
                        imageUrl: temple.imageUrl
                    });
                }
            });

            // Search in beaches
            data.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(keyword) || beach.description.toLowerCase().includes(keyword)) {
                    results.push({
                        name: beach.name,
                        description: beach.description,
                        imageUrl: beach.imageUrl
                    });
                }
            });
        }

        console.log("Search logic executed. Results found:", results);
        displayResults(results);
    });
}

// Function to display the search results
function displayResults(results) {
    const resultsContainer = document.querySelector('.results-container');

    if (!resultsContainer) {
        console.error("Results container not found");
        return;
    }

    // Show the container if results are found
    if (results.length > 0) {
        resultsContainer.style.display = 'flex';
    } else {
        resultsContainer.style.display = 'none';
    }

    resultsContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        console.log("No results found");
        return;
    }

    results.forEach(result => {
        const resultCard = document.createElement('div');
        resultCard.classList.add('result-card');

        console.log("Creating result card for:", result.name);

        const img = document.createElement('img');
        img.src = result.imageUrl;
        img.alt = result.name;

        const name = document.createElement('h3');
        name.textContent = result.name;

        const description = document.createElement('p');
        description.textContent = result.description;

        const visitButton = document.createElement('button');
        visitButton.textContent = 'Visit';
        visitButton.classList.add('visit-button');

        resultCard.appendChild(img);
        resultCard.appendChild(name);
        resultCard.appendChild(description);
        resultCard.appendChild(visitButton);

        resultsContainer.appendChild(resultCard);
    });
}

// Function to clear the search results
function clearResults() {
    const resultsContainer = document.querySelector('.results-container');
    resultsContainer.innerHTML = ''; // Clear all results
    resultsContainer.style.display = 'none'; // Hide the container
}

// Event listeners for search and clear buttons
document.querySelector('button[onclick="search()"]').addEventListener('click', search);
document.querySelector('button[onclick="resetSearch()"]').addEventListener('click', clearResults);
