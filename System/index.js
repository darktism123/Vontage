const express = require('express');
const path = require('path');
const session = require('express-session');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const checkAvailabilityRoutes = require('./routes/checkAvailability');
const profileRoutes = require('./routes/profile'); 

const app = express();

// Custom secret key
const SECRET_KEY = 'gysAFRV5CJjARzr0a1af';

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add session middleware with your custom secret key
app.use(session({
    secret: SECRET_KEY, 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true for HTTPS
}));

// Mount routes
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/checkAvailability', checkAvailabilityRoutes);
app.use('/profile', profileRoutes); 

// Serve static files
app.use(express.static(path.join(__dirname, 'Webpage')));

// Routes pages
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/register_vontage.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/login_vontage.html'));
});

// Default route
app.get('/', (req, res) => {
    res.redirect('/register'); // Redirect to register page
});

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong! Please try again later.');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
