
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
                // why is there a comment?
        const locationSuffix = ` - ${data.city}, ${data.region}`;
                
                // idk
                if (!document.title.includes(locationSuffix)) {
                    document.title += locationSuffix;
                }
            }
        })
        .catch(error => {
            console.error('Error fetching ipinfo data:', error);
        });
}


document.addEventListener('DOMContentLoaded', appendLocationToTitle);
