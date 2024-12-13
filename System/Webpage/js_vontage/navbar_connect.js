// Check login status and load appropriate navbar
async function loadNavbar() {
    try {
        const response = await fetch('/profileRoutes/details');
        if (!response.ok) {
            console.error('Failed to fetch profile data');
            return;
        }

        const data = await response.json();
        let navbarFile;

        if (data.message === 'Logged in') {
            navbarFile = 'navbar_vontage_login.html';
        } else {
            navbarFile = 'navbar_vontage.html';
        }

        // Load the appropriate navbar file
        const navbarResponse = await fetch(navbarFile);
        if (!navbarResponse.ok) {
            console.error(`Error loading the navbar: ${navbarFile}`);
            return;
        }

        const navbarData = await navbarResponse.text();
        document.getElementById('header-container').innerHTML = navbarData;

        // Handle dynamic username or login link
        if (data.message === 'Logged in') {
            const usernameElement = document.getElementById('username');
            usernameElement.innerText = data.username || 'Unknown User';
        } else {
            const usernameElement = document.getElementById('username');
            usernameElement.innerText = data.username; // Default: "Login"
            usernameElement.style.cursor = 'pointer';
            usernameElement.addEventListener('click', () => {
                window.location.href = '/login'; // Redirect to login page
            });
        }
    } catch (error) {
        console.error('Error determining login status or loading navbar:', error);
    }
}

// Initialize the navbar
loadNavbar();

// Functions for the side navigation
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}
