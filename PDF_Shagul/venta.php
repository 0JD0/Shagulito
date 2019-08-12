<?php
require('fpdf/fpdf.php');

class PDF extends FPDF{
// Cabecera de la pgaina del reporte
    function Header(){
       $this->image('logos.png',10,10,30);
        // Arial bold 15
        $this->SetFont('Arial','B',19);
        // Espacio hacia a la derecha
        $this->Cell(50);
        // Colores de los bordes, fondo y texto
        $this->SetDrawColor(40,114,51);
        $this->SetFillColor(30,30,0);
        $this->SetTextColor(39,31,17);
        // Titulo
        $this->Cell(95,20,'AphaVino: Reporte de usuarios',0,0,'C');
        // Salto de linea
        $this->Ln(20);

        $this->SetFont('Arial','B',11);
        $this->Ln(20);
        $this->SetDrawColor(40,114,51);
        $this->SetTextColor(40,114,51);
		$this->Cell(35);
        $this->Cell(30,10,utf8_decode('id venta'),1,0,'C',0);
        $this->Cell(40,10,utf8_decode('nombre cliente'),1,0,'C',0);
        $this->Cell(30,10,utf8_decode('fecha venta'),1,0,'C',0);
        $this->Cell(30,10,utf8_decode('monto de venta'),1,1,'C',0);
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
$consult = "SELECT venta.id_venta, clientes.nombre_cliente,  venta.fecha_venta ,  venta.monto_venta FROM venta INNER JOIN clientes ON venta.id_cliente = clientes.id_cliente";
$result = $mysqli->query($consult);

$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();

    $pdf->SetFont('Arial','',10);
    $pdf->SetTextColor(0,0,0);
while ($row = $result->fetch_assoc()) {
  	$pdf->Cell(35);
    $pdf->Cell(30,10,$row['id_venta'],1,0,'C',0);
    $pdf->Cell(40,10,$row['nombre_cliente'],1,0,'C',0);
    $pdf->Cell(30,10,$row['fecha_venta'],1,0,'C',0);
	 $pdf->Cell(30,10,$row['monto_venta'],1,1,'C',0);
}

$pdf->Output();
?>