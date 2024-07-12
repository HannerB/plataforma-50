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

$response = array('success' => false, 'message' => 'Unknown error occurred');

try {
    // Verificar el método de solicitud
    if ($_SERVER["REQUEST_METHOD"] !== "POST") {
        throw new Exception('Método de solicitud no permitido.');
    }

    $nombre = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $mensaje = $_POST['message'] ?? '';
    
    // Verificar que se recibieron todos los datos
    if (empty($nombre) || empty($email) || empty($phone) || empty($subject) || empty($mensaje)) {
        throw new Exception('Todos los campos son obligatorios.');
    }

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'mail.plataforma50.com'; // Cambia esto por tu servidor SMTP
        $mail->SMTPAuth = true;
        $mail->Username = 'ceo@plataforma50.com'; // Cambia esto por tu usuario SMTP
        $mail->Password = '0530@Santi'; // Cambia esto por tu contraseña SMTP
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465; // Usar el puerto 465 para SSL

        // Configuración del correo a Plataforma50
        $mail->CharSet = 'UTF-8';
        $mail->setFrom('ceo@plataforma50.com', 'Plataforma50');
        $mail->addAddress('maraos.ep@gmail.com'); // Cambiar por el destinatario
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
                        background-color: #f0f0f0; /* Fondo gris */
                    }
                    .container {
                        padding: 20px;
                        border-radius: 5px;
                        background-color: #fff; /* Contenedor blanco */
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
                        <p>Hola,</p>
                        <p>Has sido contactado por <span class='label'>$nombre</span>  con el siguiente mensaje:</p>
                        <p><em>$mensaje</em></p>
                        <p>Por favor, escríbele lo antes posible a: <a href='mailto:$email'>$email</a> o contáctalo vía telefónica a:<span class='label'> $phone </span> </p>
                        <p>Saludos,</p>
                        <p>El equipo de Plataforma50</p>
                    </div>
                    <div class='footer'>    
                        <p>&copy; 2024 Plataforma50. Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
        ";
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $body;

        // Enviar el correo a Plataforma50
        $mail->send();

        // Enviar correo de confirmación al remitente
        $mail->clearAddresses();
        $mail->addAddress($email); // Enviar al remitente
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
                        background-color: #f0f0f0; /* Fondo gris */
                    }
                    .container {
                        padding: 20px;
                        border-radius: 5px;
                        background-color: #fff; /* Contenedor blanco */
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
                        <p>Hola, <strong>$nombre</strong>,</p>
                        <p>Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos lo antes posible.</p>
                        <p>Saludos,</p>
                        <p>El equipo de Plataforma50</p>
                    </div>
                    <div class='footer'>    
                        <p>&copy; 2024 Plataforma50. Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
        ";
        $mail->Body = $confirmBody;
        $mail->Subject = 'Gracias por contactarnos';

        $mail->send();

        // Envío de correo exitoso, devolver una respuesta JSON
        $response['success'] = true;
        $response['message'] = 'Correo enviado exitosamente.';
    } catch (Exception $e) {
        // Error al enviar el correo
        throw new Exception('Error al enviar el correo: ' . $mail->ErrorInfo);
    }
} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
?>
