<?php
require('fpdf/fpdf.php');

class PDF extends FPDF{
// Cabecera de la pgaina del reporte
    function Header(){
       $this->image('logo.png',10,10,30);
        // Arial bold 15
        $this->SetFont('Arial','B',19);
        // Espacio hacia a la derecha
        $this->Cell(50);
        // Colores de los bordes, fondo y texto
        $this->SetDrawColor(40,114,51);
        $this->SetFillColor(30,30,0);
        $this->SetTextColor(39,31,17);
        // Titulo
        $this->Cell(95,20,'Panaderia Shagulito: Reporte De Lotes',0,0,'C');
        // Salto de linea
        $this->Ln(20);
        date_default_timezone_set('America/El_Salvador');
		$g = date('d-m-Y / g:i:s A');
        $this->SetFont('Arial','B',11);
		$this->SetFont('Arial','',10);
		$this->Cell(40,5,'Fecha:'.$g);
        $this->SetFont('Arial','B',11);
        $this->Ln(20);
        $this->SetDrawColor(40,114,51);
        $this->SetTextColor(40,114,51);
        $this->Cell(17);
        $this->Cell(30,10,utf8_decode('n° lote'),1,0,'C',0);
        $this->Cell(40,10,utf8_decode('nombre producto'),1,0,'C',0);
        $this->Cell(30,10,utf8_decode('cantidad de lote'),1,0,'C',0);
        $this->Cell(30,10,utf8_decode('fecha  creacion'),1,0,'C',0);
        $this->Cell(40,10,utf8_decode('fecha  caducidad'),1,1,'C',0);
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
$consult = "SELECT lotes.id_lote, productos.nombre_producto,  lotes.cantidad_xlote ,  lotes.fecha_creacion , lotes.fecha_caducidad FROM lotes INNER JOIN productos ON lotes.id_producto = productos.id_producto";
$result = $mysqli->query($consult);

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();

    $pdf->SetFont('Arial','',10);
    $pdf->SetTextColor(0,0,0);
while ($row = $result->fetch_assoc()) {
  	$pdf->Cell(17);
    $pdf->Cell(30,10,$row['id_lote'],1,0,'C',0);
    $pdf->Cell(40,10,$row['nombre_producto'],1,0,'C',0);
    $pdf->Cell(30,10,$row['cantidad_xlote'],1,0,'C',0);
    $pdf->Cell(30,10,$row['fecha_creacion'],1,0,'C',0);
	$pdf->Cell(40,10,$row['fecha_caducidad'],1,1,'C',0);
}

$pdf->Output();
?>