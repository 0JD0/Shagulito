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


function random_password(){
    //Se define una cadena de caractares.
    //Os recomiendo desordenar las minúsculas, mayúsculas y números para mejorar la probabilidad.
    $cadena = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@#!€%&()";
    //Obtenemos la longitud de la cadena de caracteres
    $longitudCadena=strlen($cadena);
 
    //Definimos la variable que va a contener la contraseña
    $pass = "";
    //Se define la longitud de la contraseña, puedes poner la longitud que necesites
    //Se debe tener en cuenta que cuanto más larga sea más segura será.
    $longitudPass=10;
 
    //Creamos la contraseña recorriendo la cadena tantas veces como hayamos indicado
    for($i=1 ; $i<=$longitudPass ; $i++){
        //Definimos numero aleatorio entre 0 y la longitud de la cadena de caracteres-1
        $pos=rand(0,$longitudCadena-1);
 
        //Vamos formando la contraseña con cada carácter aleatorio.
        $pass .= substr($cadena,$pos,1);
    }
    return $pass;
}

$random = random_password();

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
            $mail->Body    = 'Su nueva contraseña es: ' . $random;
        //    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
        
            
            $_POST = $usuario->validateForm($_POST);
            $usuario->setClave($random);
            $usuario->setCorreo($verificar);
            $usuario->validarPassword();
            $result['status'] = 1;

            $mail->CharSet = 'UTF-8';
            $mail->send();
            $result['exception'] = 'Mensaje enviado correctamente';
        } catch (Exception $e) {
            echo "Ha ocurrido un error al enviar el mensaje <br> por favor intente mas tarde {$mail->ErrorInfo}";
        }
        break;
    default:
        exit('acción no disponible');
}
?>