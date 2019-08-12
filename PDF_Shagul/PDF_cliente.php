<?php
require('../libraries/fpdf181/fpdf.php');

class PDF extends FPDF{
// Cabecera de la pgaina del reporte
    function Header(){
      $this->image('logo.png',10,10,30);
		+
        // Arial bold 15
        $this->SetFont('Arial','B',19);
        // Espacio hacia a la derecha
        $this->Cell(50);
        // Colores de los bordes, fondo y texto
         $this->SetDrawColor(40,114,51);
        $this->SetFillColor(30,30,0);
        $this->SetTextColor(39,31,17);
        // Titulo
        $this->Cell(100,20,'Panaderia Shagulito : Lista de Clientes ',0,0,'C');
        // Salto de linea
        $this->Ln(20);
		date_default_timezone_set('America/El_Salvador');
		$g = date('d-m-Y / g:i:s A');
        $this->SetFont('Arial','B',11);
		$this->SetFont('Arial','',10);
		$this->Cell(40,5,'Fecha:'.$g);
        $this->Ln(20);
        $this->SetDrawColor(40,114,51);
        $this->SetTextColor(40,114,51);
       	$this->Cell(4);     	
        $this->Cell(40,10,utf8_decode('id de clientes'),1,0,'C',0);
		$this->Cell(40,10,utf8_decode('Nombre de clientes'),1,0,'C',0);
        $this->Cell(40,10,utf8_decode('apellido de clientes'),1,0,'C',0);
        $this->Cell(50,10,utf8_decode('correos de clientes'),1,1,'C',0);
    }

    // Pie de pagina
    function Footer(){
        //Posicion a 1.5 cm del final
        $this->SetY(-15);
        // Arial italic 8
        $this->SetFont('Arial','I',8);
        // Numero de pagina
        $this->Cell(0,10,utf8_decode('Página '.$this->PageNo().'/{nb}'),0,0,'C');
    }
}

require('connection.php');
$consult = "SELECT * From clientes";
$result = $mysqli->query($consult);

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();

    $pdf->SetFont('Arial','',10);
    $pdf->SetTextColor(0,0,0);
while ($row = $result->fetch_assoc()) {
   	$pdf->Cell(4);
    $pdf->Cell(40,10,$row['id_cliente'],1,0,'C',0);
    $pdf->Cell(40,10,$row['nombre_cliente'],1,0,'C',0);
    $pdf->Cell(40,10,$row['apellido_cliente'],1,0,'C',0);
    $pdf->Cell(50,10,$row['correo_cliente'],1,1,'C',0);

	
}

$pdf->Output();
?>