<?php
// includes/db.php

$conn = mysqli_connect('localhost', 'root', '', 'ereteti_web');
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

function yes_no($value) {
    return $value ? 'Yes' : 'No';
}
