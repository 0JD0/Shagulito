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
		$sql = 'SELECT nombre_empleado, COUNT(monto_venta) ventas FROM ventas INNER JOIN empleado USING(id_empleado) GROUP BY id_empleado ORDER BY `ventas` DESC LIMIT 5';
		$params = array(null);
		return Database::getRows($sql, $params);
    }

    public function ventasMonto($value1, $value2)
    {
        $sql = 'SELECT monto_venta, fecha_venta FROM ventas WHERE monto_venta BETWEEN ? AND ? ORDER BY `ventas`.`monto_venta` ASC';
		$params = array($value1, $value2);
        return Database::getRows($sql, $params);
    }

    public function ventasFecha($value1, $value2)
    {
        $sql = 'SELECT fecha_venta, COUNT(id_venta) montos FROM ventas WHERE fecha_venta BETWEEN ? AND ? GROUP BY `ventas`.`fecha_venta` ASC';
		$params = array($value1, $value2);
        return Database::getRows($sql, $params);
    }

    public function ventasEmpleado($value)
    {
        $sql = 'SELECT nombre_empleado, SUM(monto_venta) vendido FROM ventas INNER JOIN empleado USING(id_empleado) WHERE nombre_empleado = ?';
        $params = array("$value");
        return Database::getRows($sql, $params);
    }
}