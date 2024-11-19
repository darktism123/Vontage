<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Retrieve form data
$username = isset($_POST["Username"]) ? trim($_POST["Username"]) : null; // Maps to the `username` column
$email = isset($_POST["Email"]) ? trim($_POST["Email"]) : null;          // Maps to the `email` column
$password = isset($_POST["Password"]) ? $_POST["Password"] : null;      // Maps to the `password` column

// Validate the form data
if (empty($username) || empty($email) || empty($password)) {
    die("Error: All fields are required.");
}

// Hash the password for secure storage
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Database connection
$conn = new mysqli('localhost', 'root', '', 'vontage_db');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare SQL statement to insert data into the `customer` table
$stmt = $conn->prepare("INSERT INTO customer (username, email, password) VALUES (?, ?, ?)");
if (!$stmt) {
    die("Error preparing statement: " . $conn->error);
}

// Bind parameters and execute the statement
$stmt->bind_param("sss", $username, $email, $hashedPassword);

if ($stmt->execute()) {
    // If registration is successful, display the pop-up and redirect
    echo "<script>
        alert('Sign up successful!');
        window.location.href = '/Vontage/Webpage/login_vontage.html'; // Redirect to login page
    </script>";
} else {
    echo "Error executing statement: " . $stmt->error;
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
