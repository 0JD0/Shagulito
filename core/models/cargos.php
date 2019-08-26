<?php
class Cargos extends Validator
{
    // variables
    private $id = null;
    private $nombre = null;

    // metodo para sobrecaragade propiedades
    public function setId($value)
    {
        if ($this->validateId($value)){
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
    public function setNombre($value)
    {
        if($this->validateAlphanumeric($value, 1, 50)) {
            $this->nombre = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getNombre()
    {
        return $this->nombre;
    }

//  Aqui van los CRUDS
    public function readCargo()
    {
        $sql = 'SELECT id_cargo, nombre_cargo FROM cargos ORDER BY nombre_cargo';
        $params = array(null);
        return Database::getRows($sql, $params);
    }

    public function searchCargo($value)
    {
        $sql = 'SELECT id_cargo, nombre_cargo FROM cargos WHERE nombre_cargo LIKE ? ORDER BY nombre_cargo';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    public function createCargo()
    {
        $sql = 'INSERT INTO cargos(nombre_cargo) VALUES(?)';
        $params = array($this->nombre);
        return Database::executeRow($sql, $params);
    }

    public function getCargo()
    {
        $sql = 'SELECT id_cargo, nombre_cargo FROM cargos WHERE id_cargo = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function deleteCargo()
    {
        $sql = 'DELETE FROM cargos WHERE id_cargo = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function updateCargo()
    {
        $sql = 'UPDATE cargos SET nombre_cargo = ? WHERE id_cargo = ?';
        $params = array($this->nombre, $this->id);
        return Database::executeRow($sql, $params);
    }
}
?>