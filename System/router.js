const express = require('express');
const path = require('path');

const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const checkAvailabilityRoutes = require('./routes/checkAvailability');
const profileRoutes = require('./routes/profile'); 
const addressRegisterRoutes = require('./routes/address_register');
const latestProductsRoutes = require('./routes/lastest_products');
const mostSalesRoutes = require('./routes/most_sales');
const logoutRoutes = require('./routes/logout');
const detailsRoutes = require('./routes/product_detail');
const orderRoutes = require('./routes/orderRoutes');
const productNoRoutes = require('./routes/product_no');

const app = express.Router();

app.use(express.json());

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

app.get('/details', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/details.html'));
});

app.get('/your_cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/your_cart.html'));
});

app.get('/your_order', (req, res) => {
    res.sendFile(path.join(__dirname, 'Webpage/Order_status.html'));
});


//Routes scripts
app.use('/registerRoutes', registerRoutes);
app.use('/loginRoutes', loginRoutes);
app.use('/checkAvailabilityRoutes', checkAvailabilityRoutes);
app.use('/profileRoutes', profileRoutes); 
app.use('/addressRegisterRoutes', addressRegisterRoutes);
app.use('/latestProductsRoutes',latestProductsRoutes);
app.use('/mostSalesRoutes', mostSalesRoutes);
app.use('/logoutRoutes', logoutRoutes);
app.use('/detailsRoutes', detailsRoutes);
app.use('/orderRoutes', orderRoutes);
app.use('/productNoRoutes', productNoRoutes);

module.exports = app;