<?php
require('pdf/fpdf.php');  //AQUI  INCLUIMOS EL ARCHIVO PHP QUE ARMARÁ NUESTRO PDF

Class PDF extends fpdf
{
    function Header()
    {
        $this->Image('logo.png',10,10,30);     //ESTA ES UNA MANERA DE INCLUIR UNA IMAGEN EN EL ENCABEZADO LOS PARAMETROS SON X,Y (DESDE LA ESQUINA SUPERIOR IZQUIERDA), EL ANCHO Y EL ALTO
        $this->SetFont('Arial','B',19);  //JUGAMOS UN POCO CON EL TEXTO PARA MOSTRAR EL NOMBRE Y APELLIDOS UN POCO MÁS GRANDES
        $this->Cell(140,10,».$array_alumnos[1].’ ‘.$array_alumnos[2].’  ‘,0,0,’L’);  //MOSTRAMOS DICHOS DATOS
        $this->SetFont('Arial','B',12);   //VOLVEMOS A ESTABLECER EL TAMAÑO DEL TEXTO A NUESTRO GUSTO
        $this->SetTextColor(255,0,0);  //Y ADEMAS LE CAMBIAMOS EL COLOR (POR EJEMPLO ROJO PARA DARLE UN TOQUE DE DISTINCIÓN)
        $this->Cell(10,10,’Categoría: ‘.$array_alumnos[11].’ ‘,0,0,’L’);    //AHORA MOSTRAMOS LA CATEGORIA EN ROJO
        $this->Ln(20); //CAMBIAMOS DE LINEA
        $this->SetTextColor(0,0,0);    //VOLVEMOS A ESTABLECER EL COLOR
        $this->Cell(140,10,’Fecha de Nacimiento:  ‘.$dia.’ de ‘.$mes.’ de ‘.$anyo.’ ‘,0,0,’L’);  //Y SEGUIMOS IMPRIMIENDO DATOS …
        $this->Ln();
        $this->Cell(140,10,’Domicilio:  ‘.$array_alumnos[7].’ de ‘.$array_alumnos[9].’, ‘.$array_alumnos[10].’ ‘,0,0,’L’);
        $this->Ln();
        $this->Cell(140,10,’Teléfono:  ‘.$array_alumnos[6].’ ‘,0,0,’L’);
        $this->Ln(35);   //DAMOS UN POCO MÁS DE ESPACIO
        $this->Cell(190,0,»,’T’);   // IMPRIMIMOS UNA LINEA A LO ANCHO DEL DOCUMENTO
        $this->Ln(15);
        $this->Ln();
    }
}
require('Connection.php')
$nombre=$_POST['nombre']; //RECOGEMOS LA VARIABLE NOMBRE DEL FORMULARIO
$sql= 'SELECT * from clientes WHERE nombre_cliente=$nombre'; //SELECCIONAMOS<<<<<<<<<<<<<<<< TODO DE LA TABLA ALUMNOS CON LA COINCIDENCIA DEL NOMBRE
$result = $mysqli->query($sql);

$pdf=new FPDF();       //CREA EL PDF
$pdf->SetMargins(10,20,5);   //ESTABLECE LOS MARGENES. SE DEFINEN LOS MARGENES IZQUIERDO, SUPERIOR Y DERECHO
$pdf->AddPage();          //AÑADE UNA NUEVA PAGINA

$pdf->SetFont('Arial','',10);  //ESTABLECEMOS LOS PARAMETROS DEL TIPO DE TEXTO

}

while ($array_alumnos = mysql_fetch_array($result)){
    $val = $array_alumnos[3];
    $ee = $array_alumnos[5];
}
$pdf->Output();    // CERRAMOS EL DOCUMENTO PDF
?>
