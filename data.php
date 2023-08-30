<?php
// Database connection details
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'prototype';

// Database connection establishment
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// City and API details
$base_url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Gadsden&appid=6955c1f27785a7d0c3f9d66880d9aa8e";

// Array 
$weatherdata_data = array();

// Get current time
$current_time = time();

//Request API and decode response
$response = file_get_contents($base_url);
$data = json_decode($response, true);

// Get current date 
$now = new DateTime();
$currentDate = $now->format('Y-m-d');

// Temperature and date extraction
$temp = ($data['main']['temp']);
$date = $currentDate;

// Check similar date records in the database
$checkQuery = "SELECT * FROM weatherdata WHERE date = '$date'";
$results = mysqli_query($conn, $checkQuery);

// Retrieve past weather data from the database
$sevenDaysAgo = date('Y-m-d', strtotime('-7 days'));
$sql = "SELECT * FROM weatherdata WHERE date >= '$sevenDaysAgo'";
$result = mysqli_query($conn, $sql);

while ($row = mysqli_fetch_assoc($result)) {
    $weatherdata_data[] = array(
        'temperature' => $row['temperature'],
        'date' => $row['date']
        
    );
}


// Insert the temperature into the database if no record exists for the current date,
$row = $results->fetch_assoc();
if (!$row) {
    $sql = "INSERT INTO weatherdata(,temperature, date) VALUES (,'$temp', '$date')";
    mysqli_query($conn, $sql);
}

// Display past weather data
foreach ($weatherdata_data as $object) {
    echo "<div class='parent'>
        <p class='date'>Date: {$object['date']}</p>
        <p class='tem'>Temperature: {$object['temperature']}°C</p>
      </div>";
}

?>
