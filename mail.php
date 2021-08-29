<?php

$to      = 'nobody@example.com'; // email
$subject = 'Smappy message';
$headers = 'From: webmaster@example.com'       . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

// top column inputs
$code_phone =  filter_input(INPUT_POST,  'code_phone', FILTER_SANITIZE_NUMBER_INT);
$phone_number =         filter_input(INPUT_POST,  'phone_number', FILTER_SANITIZE_STRING);
$email =         filter_input(INPUT_POST,  'email', FILTER_SANITIZE_STRING);
$full_name =         filter_input(INPUT_POST,  'full_name', FILTER_SANITIZE_STRING);

// center number and checkbox
$expiriens =         filter_input(INPUT_POST,  'expiriens', FILTER_SANITIZE_NUMBER_INT);
$license =         filter_input(INPUT_POST,  'license', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY);

// textarea
$message_form =     filter_input(INPUT_POST,  'message', FILTER_SANITIZE_STRING);
$message = '';

$response = array(
    'success' => false,
    'message' => 'An error occurred while sending the letter'
);



// require
if (!empty($code_phone) && !empty($phone_number)) {
    $message = $code_phone .  $phone_number . "\r\n";
} else {
    $response['message'] = 'Column 1 require';
    echo json_encode($response, JSON_PRETTY_PRINT);
    die;
}

// require
if (isset($email) && !empty($email)) {
    $message .= $email . "\r\n";
} else {
    $response['message'] = 'Column 2 require';
    echo json_encode($response, JSON_PRETTY_PRINT);
    die;
}

// require
if (isset($full_name) && !empty($full_name)) {
    $message .= $full_name . "\r\n";
} else {
    $response['message'] = 'Column 3 require';
    echo json_encode($response, JSON_PRETTY_PRINT);
    die;
}

if (isset($expiriens) && !empty($expiriens)) {

    $message .= $expiriens . "\r\n";
}
if (isset($license) && is_array($license)) {
    $message .= implode(" | ", $license) . "\r\n";
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
