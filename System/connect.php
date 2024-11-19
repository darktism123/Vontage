<?php
// Retrieve form data
$username = $_POST["Username"]; // Maps to the `username` column
$email = $_POST["Email"];       // Maps to the `email` column
$password = $_POST["Password"]; // Maps to the `password` column

// Hash the password for secure storage
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Database connection
$conn = new mysqli('localhost', 'root', '', 'vontage_db');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    // Prepare SQL statement to insert data into the `customer` table
    $stmt = $conn->prepare("INSERT INTO customer (username, email, password) VALUES (?, ?, ?)");
    if ($stmt) {
        // Bind parameters (s = string)
        $stmt->bind_param("sss", $username, $email, $hashedPassword);

        // Execute the statement
        if ($stmt->execute()) {
            echo "Registration successful!";
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    } else {
        echo "Error preparing statement: " . $conn->error;
    }

    // Close the connection
    $conn->close();
}
?>
