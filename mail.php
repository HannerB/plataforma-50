<?php
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
require __DIR__ . '/vendor/autoload.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

set_time_limit(300);

try {
    // Verificar el método de solicitud
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        throw new Exception('Método de solicitud no permitido.');
    }

    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';
    
    // Verificar que se recibieron todos los datos
    if (empty($name) || empty($email) || empty($phone) || empty($subject) || empty($message)) {
        throw new Exception('Todos los campos son obligatorios.');
    }

    $mail = new PHPMailer(true);
    
    $mail->isSMTP();
    $mail->Host = 'mail.plataforma50.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'ceo@plataforma50.com';
    $mail->Password = '0530@Santi';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;

    // Configuración del correo a Plataforma50
    $mail->CharSet = 'UTF-8';
    $mail->setFrom('ceo@plataforma50.com', 'Plataforma50');
    $mail->addAddress('maraos.ep@gmail.com');
    $mail->addEmbeddedImage(__DIR__ . '/assets/images/logo-plataforma.png', 'logo');
    
    $body = "
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f0f0f0;
            }
            .container {
                padding: 20px;
                border-radius: 5px;
                background-color: #fff;
                max-width: 700px;
                margin: 20px auto;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                background-color: #242424;
                border-bottom: 1px solid #ddd;
                padding-bottom: 20px;
                padding-top:20px;
            }
            .header img {
                width: 150px;
            }
            .header h2 {
                margin: 0;
                color: #333;
            }
            .content {
                padding: 20px;
            }
            .content p {
                margin: 10px 0;
                color: #333;
            }
            .footer {
                border-top: 1px solid #ddd;
                padding-top: 20px;
                text-align: center;
                color: #888;
                font-size: 12px;
            }
            .footer img {
                width: 100px;
                margin: 10px;
            }
            .label{
                color: #F44730;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <img src='cid:logo' alt='Plataforma50 Logo'>
            </div>
            <div class='content'>
                <p>Hi,</p>
                <p>You have been contacted by <span class='label'>$name</span> with the following message:</p>
                <p><em>$message</em></p>
                <p>Please reply to <a href='mailto:$email'>$email</a> or contact via phone:<span class='label'> $phone </span> </p>
                <p>Best regards,</p>
                <p>The Plataforma50 Team</p>
            </div>
            <div class='footer'>    
                <p>&copy; 2024 Plataforma50. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $body;

    // Send email to Plataforma50
    $mail->send();

    // Send confirmation email to sender
    $mail->clearAddresses();
    $mail->addAddress($email);
    
    $confirmBody = "
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f0f0f0;
            }
            .container {
                padding: 20px;
                border-radius: 5px;
                background-color: #fff;
                max-width: 700px;
                margin: 20px auto;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                border-bottom: 1px solid #ddd;
                background-color:#242424;
                padding-bottom: 20px;
                padding-top:20px;
            }
            .header img {
                width: 150px;
            }
            .header h2 {
                margin: 0;
                color: #333;
            }
            .content {
                padding: 20px;
            }
            .content p {
                margin: 10px 0;
                color: #333;
            }
            .footer {
                border-top: 1px solid #ddd;
                padding-top: 20px;
                text-align: center;
                color: #888;
                font-size: 12px;
            }
            .footer img {
                width: 100px;
                margin: 10px;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <img src='cid:logo' alt='Plataforma50 Logo'>
            </div>
            <div class='content'>
                <p>Hi, <strong>$name</strong>,</p>
                <p>Thank you for contacting us. We have received your message and will respond as soon as possible.</p>
                <p>Best regards,</p>
                <p>The Plataforma50 Team</p>
            </div>
            <div class='footer'>    
                <p>&copy; 2024 Plataforma50. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $mail->Body = $confirmBody;
    $mail->Subject = 'Thank you for contacting us';

    $mail->send();
    
    echo json_encode(['success' => true, 'message' => 'Email sent successfully.']);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
