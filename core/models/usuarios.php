<?php
class Usuarios extends Validator
{
    //Declaración de propiedades
    private $id = null;
    private $nombres = null;
    private $apellidos = null;
    private $telefono = null;
    private $correo = null;
    private $alias = null;
    private $clave = null;
    private $imagen = null;
	private $ruta = '../../../resources/img/usuarios/';
	private $estado = null;

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

	public function setAlias($value)
	{
		if ($this->validateAlphanumeric($value, 1, 50)) {
			$this->alias = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getAlias()
	{
		return $this->alias;
	}

	public function setClave($value)
	{
		if ($this->validatePassword($value)) {
			$this->clave = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getClave()
	{
		return $this->clave;
	}

	public function setImagen($file, $name)
	{
		if ($this->validateImageFile($file, $this->ruta, $name, 500, 500)) {
			$this->imagen = $this->getImageName();
			return true;
		} else {
			return false;
		}
	}

	public function getImagen()
	{
		return $this->imagen;
	}

	public function getRuta()
	{
		return $this->ruta;
	}

	public function setEstado($value)
	{
		if ($value == '1' || $value == '0') {
			$this->estado = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getEstado()
	{
		return $this->estado;
    }
	//Métodos para manejar la sesión del usuario
	public function checkAlias()	
	{
		$sql = 'SELECT id_empleado FROM empleado WHERE alias_empleado = ?';
		$params = array($this->alias);
		$data = Database::getRow($sql, $params);
		if ($data) {
			$this->id = $data['id_empleado'];
			return true;
		} else {
			return false;
		}
	}

	public function checkPassword()
	{
		$sql = 'SELECT clave_empleado, foto_empleado FROM empleado WHERE id_empleado = ?';
		$params = array($this->id);
		$data = Database::getRow($sql, $params);
		if (password_verify($this->clave, $data['clave_empleado'])) {
			$this->imagen=$data['foto_empleado'];
			return true;
		} else {
			return false;
		}
	}

	public function changePassword()
	{
		$hash = password_hash($this->clave, PASSWORD_DEFAULT);
		$sql = 'UPDATE empleado SET clave_empleado = ? WHERE id_empleado = ?';
		$params = array($hash, $this->id);
		return Database::executeRow($sql, $params);
	}

	//Metodos para manejar el CRUD
	public function readUsuarios()
	{
		$sql = 'SELECT id_empleado, nombre_empleado, apellido_empleado, telefono_empleado, correo_empleado, alias_empleado, clave_empleado, foto_empleado, estado_empleado FROM empleado ORDER BY apellido_empleado';
		$params = array(null);
		return Database::getRows($sql, $params);
	}

	public function searchUsuarios($value)
	{
		$sql = 'SELECT id_empleado, nombre_empleado, apellido_empleado,telefono_empleado, correo_empleado, alias_empleado, foto_empleado, estado_empleado FROM empleado WHERE apellido_empleado LIKE ? OR nombre_empleado LIKE ? ORDER BY apellido_empleado';
		$params = array("%$value%", "%$value%");
		return Database::getRows($sql, $params);
	}

	public function createUsuario()
	{
		$hash = password_hash($this->clave, PASSWORD_DEFAULT);
		$sql = 'INSERT INTO empleado(nombre_empleado, apellido_empleado, telefono_empleado, correo_empleado, alias_empleado, foto_empleado, clave_empleado, estado_empleado) VALUES(?, ?, ?, ?, ?, ?, ?)';
		$params = array($this->nombres, $this->apellidos, $this->telefono, $this->correo, $this->alias, $this->imagen, $hash, $this->estado);
		return Database::executeRow($sql, $params);
	}

	public function getUsuario()
	{
		$sql = 'SELECT id_empleado, nombre_empleado, apellido_empleado, telefono_empleado, correo_empleado, alias_empleado , clave_empleado, foto_empleado, estado_Empleado FROM empleado WHERE id_empleado = ?';
		$params = array($this->id);
		return Database::getRow($sql, $params);
	}

	public function updateUsuario()
	{
		$sql = 'UPDATE empleado SET nombre_empleado = ?, apellido_empleado = ?, telefono_empleado= ?,  correo_empleado = ?, alias_empleado = ?, foto_empleado = ?, estado_empleado = ? WHERE id_empleado = ?';
		$params = array($this->nombres, $this->apellidos,  $this->telefono, $this->correo, $this->alias, $this->imagen, $this->estado, $this->id);
		return Database::executeRow($sql, $params);
	}

	public function deleteUsuario()
	{
		$sql = 'DELETE FROM empleado WHERE id_empleado = ?';
		$params = array($this->id);
		return Database::executeRow($sql, $params);
	}
}
?>
