<?php
require_once('../../helpers/database.php');
require_once('../../helpers/validator.php');
require_once('../../models/usuarios.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require('../../../libraries/PHPMailer/src/Exception.php');
require('../../../libraries/PHPMailer/src/PHPMailer.php');
require('../../../libraries/PHPMailer/src/SMTP.php');

$mail = new PHPMailer(true);
$verificar = $_POST["verificar_correo"];
$usuario = new Usuarios;
$error = $_GET['action'];

$result = array('status' => 0, 'message' => null, 'exception' => null);

function random_password()  
{  
  $longitud = 8; // longitud del password  
  $pass = substr(md5(rand()),0,$longitud);  
  return($pass); // devuelve el password   
}
switch ($_GET['action']) {
    case 'verificar':
        try {
            //Server settings
            $mail->SMTPDebug = 0;//2 sigmifica ver todo el proceso y 0 no lo muestra    // Enable verbose debug output
            $mail->isSMTP();                                            // Set mailer to use SMTP
            $mail->Host       = 'smtp.gmail.com';                       // Specify main and backup SMTP servers
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = 'shagulitoshagulito@gmail.com';                     // SMTP username
            $mail->Password   = 'panSh@gulito0';                               // SMTP password
            $mail->SMTPSecure = 'tls';                                  // Enable TLS encryption, `ssl` also accepted
            $mail->Port       = 587;                                    // TCP port to connect to
        
            //Recipients
            $mail->setFrom('shagulitoshagulito@gmail.com', 'Panaderia Shagulito');
            $mail->addAddress($verificar);             // Add a recipient
        //    $mail->addAddress('ellen@example.com');               // Name is optional
        //    $mail->addReplyTo('info@example.com', 'Information');
        //    $mail->addCC('cc@example.com');
        //    $mail->addBCC('bcc@example.com');
        
            // Attachments
        //    $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
        //    $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
        
            // Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Nueva contraseña';
            $mail->Body    = 'Su nueva contraseña es: ' + random_password();
        //    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
            
            $usuario->setCorreo($verificar);
            $usuario->setClave(random_password());

            $mail->CharSet = 'UTF-8';
            $mail->send();
            echo 'Mensaje enviado correctamente';
        } catch (Exception $e) {
            echo "Ha ocurrido un error al enviar el mensaje <br> por favor intente mas tarde {$mail->ErrorInfo}";
        }
        break;
    default:
        exit('acción no disponible');
}
?>