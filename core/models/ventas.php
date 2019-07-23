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
        if ($this->validateMoney($value)) {
            $this->precio = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getPrecio()
    {
        return $this->precio;
    }

//  Aqui van los CRUDS
    public function readVenta()
    {
        $sql = 'SELECT id_venta, nombre_empleado, monto_venta, fecha_venta FROM venta INNER JOIN empleado USING(id_empleado) ORDER BY monto_venta';
        $params = array(null);
        return Database::getRows($sql, $params);
    }

    public function readEmpleadoVenta()
    {
        $sql = 'SELECT nombre_empleado, id_venta, monto_venta, fecha_venta FROM venta INNER JOIN empleado USING(id_empleado) WHERE id_empleado = ? ORDER BY monto_fecha';
        $params = array($this->categoria);
        return Database::getRows($sql, $params);
    }

    public function searchVenta($value)
    {
        $sql = 'SELECT id_venta, nombre_empleado, monto_venta, fecha_venta FROM venta INNER JOIN empleado USING(id_empleado) WHERE monto_venta LIKE ? OR fecha_venta LIKE ? ORDER BY monto_venta';
        $params = array("%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    public function createVenta()
    {
        $sql = 'INSERT INTO venta(id_empleado, monto_venta, fecha_venta) VALUES(?, ?, ?)';
        $params = array($this->empleado, $this->monto, $this->fecha);
        return Database::executeRow($sql, $params);
    }

    public function getVenta()
    {
        $sql = 'SELECT id_venta, id_empleado, monto_venta, fecha_venta FROM venta WHERE id_venta = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function deleteVenta()
    {
        $sql = 'DELETE FROM venta WHERE id_venta = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function updateVenta()
    {
        $sql = 'UPDATE venta SET monto_venta = ?, fecha_venta = ?,  id_empleado = ? WHERE id_venta = ?';
        $params = array($this->empleado, $this->monto, $this->fecha, $this->id);
        return Database::executeRow($sql, $params);
    }
}