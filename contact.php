<?php

// $secretKey = "6LdyuDgrAAAAAIlh82K2E45ca0U8qjXoQqz_eGN8";
$secretKey = "6Lc5Iz8rAAAAAJvZnbc8MQ2KzUveSrvjohRerNs8";
$responseKey = $_POST['g-recaptcha-response'];
$userIP = $_SERVER['REMOTE_ADDR'];

$verifyUrl = "https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$responseKey&remoteip=$userIP";
$response = file_get_contents($verifyUrl);
$responseData = json_decode($response);

// if (!$z->success) {
//     die("reCAPTCHA verification failed. Please try again.");
// }


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    file_put_contents('test_log.txt', 'Form was submitted' . PHP_EOL, FILE_APPEND);

    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER; 
        // $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'blogs.bluelinkltd@gmail.com'; // Your Gmail
        $mail->Password   = 'rigdiohvrinmexel'; // 16-char app password.  blue link key lbqd azga dolw wcax
        $mail->Password   = 'lbqdazgadolwwcax';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = 465;
        // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        // $mail->Port       = 587;

        // Recipients
        $mail->setFrom('bluelinkltdca@gmail.com', 'Website Contact');
        $mail->addAddress('blogs.bluelinkltd@gmail.com');
        // $mail->addAddress('bluelinkltdca@gmail.com');


        // Email content
        // $mail->isHTML(true);
        // $mail->Subject = 'New Form Submission';
        // $name = htmlspecialchars($_POST['name']);
        // $email = htmlspecialchars($_POST['email']);
        // $message = htmlspecialchars($_POST['message']);
        // $mail->Body = "Name: $name<br>Email: $email<br>Message:<br>$message";

        $mail->isHTML(true);
$mail->Subject = 'New Form Submission';

// Sanitize inputs
$first_name = htmlspecialchars($_POST['first_name'] ?? '');
$last_name = htmlspecialchars($_POST['last_name'] ?? '');
$email = htmlspecialchars($_POST['email'] ?? '');
$phone = htmlspecialchars($_POST['phone'] ?? '');
$country = htmlspecialchars($_POST['country'] ?? '');
$company_type = htmlspecialchars($_POST['company_type'] ?? '');
$budget = htmlspecialchars($_POST['budget'] ?? 'Not specified');
$message = nl2br(htmlspecialchars($_POST['message'] ?? ''));
$services = isset($_POST['services']) ? implode(', ', array_map('htmlspecialchars', $_POST['services'])) : 'None';
$agree = isset($_POST['agree']) ? 'Yes' : 'No';

// Construct the email body
$mail->Body = "
  <h3>New Contact Form Submission</h3>
  <p><strong>Name:</strong> $first_name $last_name</p>
  <p><strong>Email:</strong> $email</p>
  <p><strong>Phone:</strong> $phone</p>
  <p><strong>Country:</strong> $country</p>
  <p><strong>Company Type:</strong> $company_type</p>
  <p><strong>Services Interested In:</strong> $services</p>
  <p><strong>Service Budget:</strong> $budget</p>
  <p><strong>Agreed to Terms:</strong> $agree</p>
  <p><strong>Message:</strong><br>$message</p>
";


        $mail->send();
        echo 'Message has been sent successfully!';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
