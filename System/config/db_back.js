const mysql = require('mysql2');

// Create a database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Replace with your MySQL password if any
    database: 'vontage_db', // Replace with your database name
    port: 3306, // Default MySQL port
});

// Connect to the database and test the connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        process.exit(1); // Exit the process if the connection fails
    }
    console.log('Connected to the MySQL database_backend!');
});

// Optional: Test the connection by running a query
db.query('SELECT 1', (err, results) => {
    if (err) {
        console.error('Error testing database connection:', err.message);
    } else {
        console.log('Database connection tested successfully!');
    }
});

module.exports = db.promise();