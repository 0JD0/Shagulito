<?php
class Clientes extends Validator
{
    //Declaración de propiedades
    private $id = null;
    private $nombres = null;
    private $apellidos = null;
    private $telefono = null;
    private $correo = null;

    //Métodos para sobrecarga de propiedades
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

    public function setNombres($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->nombres = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getNombres()
    {
        return $this->nombres;
    }

    public function setApellidos($value)
    {
        if ($this->validateAlphabetic($value, 1, 50)) {
            $this->apellidos = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getApellidos()
    {
        return $this->apellidos;
    }

    public function setTelefono($value)
    {
        if ($this->validateAlphanumeric($value, 1, 50)) {
            $this->telefono = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getTelefono()
    {
        return $this->telefono;
    }

    public function setCorreo($value)
    {
        if ($this->validateEmail($value)) {
            $this->correo = $value;
            return true;
        } else {
            return false;
        }
    }

    public function getCorreo()
    {
        return $this->correo;
    }

    //Metodos para manejar el CRUD
    public function readCliente()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, telefono_cliente, correo_cliente FROM clientes ORDER BY apellido_cliente';
        $params = array(null);
        return Database::getRows($sql, $params);
    }

    public function searchCliente($value)
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, telefono_cliente, correo_cliente FROM clientes WHERE apellido_cliente LIKE ? OR nombre_cliente LIKE ? ORDER BY apellido_cliente';
        $params = array("%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    public function createCliente()
    {
        $sql = 'INSERT INTO clientes(nombre_cliente, apellido_cliente, telefono_cliente, correo_cliente) VALUES(?, ?, ?, ?)';
        $params = array($this->nombres, $this->apellidos, $this->telefono, $this->correo);
        return Database::executeRow($sql, $params);
    }

    public function getCliente()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, telefono_cliente, correo_cliente FROM clientes WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateCliente()
    {
        $sql = 'UPDATE clientes SET nombre_cliente = ?, apellido_cliente = ?, telefono_cliente= ?,  correo_cliente = ? WHERE id_cliente = ?';
        $params = array($this->nombres, $this->apellidos, $this->telefono, $this->correo, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteCliente()
    {
        $sql = 'DELETE FROM clientes WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}