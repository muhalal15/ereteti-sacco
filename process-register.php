<?php

// post, because it sends information in the request body instead of displaying it in the URL.
// without displaying it in the URL.

$page_title = 'Application received';

include 'includes/header.php';


// Convert route numbers into route names.

$routes = [
    '1' => 'Kiserian',
    '2' => 'Ngong',
    '3' => 'Rongai'
];


echo '<main>';

if (isset($_POST['first_name'])) {

    // Get information from the registration form.

    $first = $_POST['first_name'];

    $last = $_POST['last_name'];

    $phone = $_POST['phone'];

    $route = $routes[$_POST['route']];


    // Display the application details.

    echo '<h2>Thank you, ' . $first . ' ' . $last . '</h2>';

    echo '<p>We have your application to join the ' . $route . ' route.</p>';

    echo '<p>The office will call you on ' . $phone;

    echo ' when your member number is ready.</p>';


} else {

    // If someone opens this page directly.

    echo '<h2>No application</h2>';

    echo '<p>This page answers the membership form. ';

    echo '<a href="register.php">Fill it in first.</a></p>';

}


echo '</main>';

include 'includes/footer.php';

?>