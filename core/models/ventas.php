<?php
class Ventas extends Validator
{
    // variables
    private $id = null;
    private $empleado = null;
    private $monto = null;
    private $fecha = null;

    // metodo para sobrecaragade propiedades
    public function setId($value)
    {
        if ($this->validateId($value)) {
            $this->id = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getId()
    {
        return $this->id;
    }

    public function setEmpleado($value)
    {
        if ($this->validateId($value)) {
            $this->empleado = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getEmpleado()
    {
        return $this->empleado;
    }

    public function setMonto($value)
    {
        if ($this->validateMoney($value)) {
            $this->monto = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getMonto()
    {
        return $this->monto;
    }

    public function setFecha($value)
    {
        if ($this->fechas($value)) {
            $this->fecha = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getFecha()
    {
        return $this->fecha;
    }

//  Aqui van los CRUDS
    public function readVenta()
    {
        $sql = 'SELECT id_venta, nombre_empleado, monto_venta, fecha_venta FROM ventas INNER JOIN empleado USING(id_empleado) ORDER BY monto_venta';
        $params = array(null);
        return Database::getRows($sql, $params);
    }

    public function readEmpleadoVenta()
    {
        $sql = 'SELECT nombre_empleado, id_venta, monto_venta, fecha_venta FROM ventas INNER JOIN empleado USING(id_empleado) WHERE id_empleado = ? ORDER BY monto_fecha';
        $params = array($this->empleado);
        return Database::getRows($sql, $params);
    }

    public function searchVenta($value)
    {
        $sql = 'SELECT id_venta, nombre_empleado, monto_venta, fecha_venta FROM ventas INNER JOIN empleado USING(id_empleado) WHERE monto_venta LIKE ? OR fecha_venta LIKE ? ORDER BY monto_venta';
        $params = array("%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    public function createVenta()
    {
        $sql = 'INSERT INTO ventas(id_empleado, monto_venta, fecha_venta) VALUES(?, ?, ?)';
        $params = array($this->empleado, $this->monto, $this->fecha);
        return Database::executeRow($sql, $params);
    }

    public function getVenta()
    {
        $sql = 'SELECT id_venta, id_empleado, monto_venta, fecha_venta FROM ventas WHERE id_venta = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function deleteVenta()
    {
        $sql = 'DELETE FROM ventas WHERE id_venta = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function updateVenta()
    {
        $sql = 'UPDATE ventas SET id_empleado = ?, monto_venta = ?, fecha_venta = ?  WHERE id_venta = ?';
        $params = array($this->empleado, $this->monto, $this->fecha, $this->id);
        return Database::executeRow($sql, $params);
    }

    // consultas para graficos
    public function productosVE()
	{
		$sql = 'SELECT nombre_empleado, COUNT(monto_venta) ventas FROM ventas INNER JOIN empleado USING(id_empleado) GROUP BY id_empleado';
		$params = array(null);
		return Database::getRows($sql, $params);
    }

    public function build_report($year){
        $total = array();
        for($i=0; $i<12; $i++){
            $month = $i+1;
            $sql = $this->db->query("SELECT SUM(monto_venta) AS total FROM ventas WHERE MONTH(fecha_venta) = '$month' AND YEAR(fecha_venta) = '$year' LIMIT 1");	
            $total[$i] = 0;
            foreach ($sql as $key){ $total[$i] = ($key['total'] == null)? 0 : $key['total']; }
        }			 
        return $total;
    }

    public function ventasMonto($value)
    {
        $sql = 'SELECT monto_venta, fecha_venta FROM ventas WHERE monto_venta BETWEEN ? AND ?  ORDER BY `ventas`.`monto_venta`  ASC';
		$params = array("$value", "$value");
        return Database::getRows($sql, $params);
    }
}