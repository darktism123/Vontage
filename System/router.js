const express = require('express');
const path = require('path');

const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const checkAvailabilityRoutes = require('./routes/checkAvailability');
const profileRoutes = require('./routes/profile'); 
const addressRegisterRoutes = require('./routes/address_register');
const latestProductsRoutes = require('./routes/lastest_products');
const mostSalesRoutes = require('./routes/most_sales');

const app = express.Router();

// Routes pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/homepage.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/register_vontage.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/login_vontage.html'));
});

app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/payment.html'));
});

//Routes scripts
app.use('/registerRoutes', registerRoutes);
app.use('/loginRoutes', loginRoutes);
app.use('/checkAvailabilityRoutes', checkAvailabilityRoutes);
app.use('/profileRoutes', profileRoutes); 
app.use('/addressRegisterRoutes', addressRegisterRoutes);
app.use('/latestProductsRoutes',latestProductsRoutes);
app.use('/mostSalesRoutes', mostSalesRoutes);

module.exports = app;