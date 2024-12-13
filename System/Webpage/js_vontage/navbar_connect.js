// Fetch navbar content and insert into 'header-container'
fetch('navbar_vontage.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-container').innerHTML = data;

        // Fetch profile information after the navbar is loaded
        fetchProfile();
    })
    .catch(error => console.error('Error loading the navbar:', error));

// Functions to open and close the side navigation
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

// Fetch profile information
async function fetchProfile() {
    try {
        const response = await fetch('/profileRoutes/details');
        if (!response.ok) {
            console.error('Failed to fetch profile data');
            return;
        }

        const data = await response.json();

        const usernameElement = document.getElementById('username');

        if (data.message === 'Logged in') {
            usernameElement.innerText = data.username || "Unknown User";
        } else if (data.message === 'Not logged in') {
            // Default section when not logged in
            usernameElement.innerText = data.username; // "Login"
            usernameElement.addEventListener('click', () => {
                window.location.href = '/login'; // Redirect to login on click
            });
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
    }
}

// Function to handle protected actions (e.g., redirecting if not logged in)
async function handleProtectedAction() {
    try {
        const response = await fetch('/profileRoutes/details');
        if (!response.ok) throw new Error('Failed to fetch profile data');

        const data = await response.json();
        if (data.message !== 'Logged in') {
            // Redirect to login if not logged in
            window.location.href = '/login';
        } else {
            // Proceed with the protected action
            console.log('User is logged in');
        }
    } catch (error) {
        console.error('Error during protected action:', error);
    }
}
