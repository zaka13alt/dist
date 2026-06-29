/**
 * Fetches location using ipinfo and updates the document title.
 * Make sure to replace YOUR_API_TOKEN with your free ipinfo token.
 */
function appendLocationToTitle() {
    const API_TOKEN = 'none:'; 
const url = `https://ipinfo.io/json`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.city && data.region) {
                // Formats the location (e.g., " - example MN")
        const locationSuffix = ` - ${data.city}, ${data.region}`;
                
                // Prevents adding the location twice if the function fires multiple times
                if (!document.title.includes(locationSuffix)) {
                    document.title += locationSuffix;
                }
            }
        })
        .catch(error => {
            console.error('Error fetching ipinfo data:', error);
        });
}

// Execute on page load
document.addEventListener('DOMContentLoaded', appendLocationToTitle);
