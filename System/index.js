const express = require('express');
const path = require('path');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const checkAvailabilityRoutes = require('./routes/checkAvailability');

const app = express();

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount register routes
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/checkAvailability', checkAvailabilityRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'Webpage')));

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/register_vontage.html'));
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
