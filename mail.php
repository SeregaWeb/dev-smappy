<?php

$to      = 'nobody@example.com'; // email
$subject = 'Smappy message';
$headers = 'From: webmaster@example.com'       . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// top column inputs
$column_1_select =  filter_input(INPUT_POST,  'column_1_select', FILTER_SANITIZE_NUMBER_INT);
$column_1 =         filter_input(INPUT_POST,  'column_1', FILTER_SANITIZE_STRING);
$column_2 =         filter_input(INPUT_POST,  'column_2', FILTER_SANITIZE_STRING);
$column_3 =         filter_input(INPUT_POST,  'column_3', FILTER_SANITIZE_STRING);

// center number and checkbox
$column_4 =         filter_input(INPUT_POST,  'column_4', FILTER_SANITIZE_NUMBER_INT);
$column_5 =         filter_input(INPUT_POST,  'column_5', FILTER_DEFAULT , FILTER_REQUIRE_ARRAY);

// textarea
$message_form =     filter_input(INPUT_POST,  'message', FILTER_SANITIZE_STRING);
$message = '';

$response = array(
    'success' => false,
    'message' => 'An error occurred while sending the letter'
);

// require
if (!empty($column_1_select) && !empty($column_1)) {
    $message = $column_1_select . ' ' . $column_1 . "\r\n";
} else {
    $response['message'] = 'Column 1 require';
    echo json_encode($response, JSON_PRETTY_PRINT);
    die;
}

// require
if (isset($column_2) && !empty($column_2)) {
    $message .= $column_2 . "\r\n";
} else {
    $response['message'] = 'Column 2 require';
    echo json_encode($response, JSON_PRETTY_PRINT);
    die;
}

// require
if (isset($column_3) && !empty($column_3)) {
    $message .= $column_3 . "\r\n";
} else {
    $response['message'] = 'Column 3 require';
    echo json_encode($response, JSON_PRETTY_PRINT);
    die;
}

if (isset($column_4) && !empty($column_4)) {

    $message .= $column_4 . "\r\n";
}
if (isset($column_5) && is_array($column_5)) {
    $message .= implode(" | ", $column_5) . "\r\n";
}
$message .= $message_form . "\r\n";

$res = mail($to, $subject, $message, $headers);

if ($res) {
    $response['message'] = 'Message sent successfully';
    echo json_encode($response, JSON_PRETTY_PRINT);
    die;
}

$response['message'] = 'Message sent error';
echo json_encode($response, JSON_PRETTY_PRINT);
die;
