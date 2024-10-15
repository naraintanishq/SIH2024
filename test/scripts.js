document.getElementById('publicationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const query = formData.get('query');
    const searchType = formData.get('searchType');
    const startYear = formData.get('startYear');
    const endYear = formData.get('endYear');

    fetch('/fetch-publications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: query,
            search_type: searchType,
            start_year: startYear,
            end_year: endYear
        })
    })
    .then(response => response.json())
    .then(data => {
        displayPublications(data);
    })
    .catch(error => {
        console.error('Error fetching publications:', error);
    });
});

function displayPublications(data) {
    const resultsContainer = document.getElementById('publicationResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (data.error) {
        resultsContainer.textContent = `Error: ${data.error}`;
        return;
    }

    const publications = data.publications;
    if (publications.length === 0) {
        resultsContainer.textContent = 'No publications found.';
    } else {
        const ul = document.createElement('ul');
        publications.forEach(pub => {
            const li = document.createElement('li');
            li.textContent = `${pub.Title} - ${pub.Authors} (${pub.Year})`;
            ul.appendChild(li);
        });
        resultsContainer.appendChild(ul);
    }
}
