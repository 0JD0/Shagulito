<?php
class Categorias extends Validator
{
	//Declaración de propiedades
	private $id = null;
	private $nombre = null;
	private $descripcion = null;

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

	public function setDescripcion($value)
	{
		if ($value) {
			if ($this->validateAlphanumeric($value, 1, 200)) {
				$this->descripcion = $value;
				return true;
			} else {
				return false;
			}
		} else {
			$this->descripcion = null;
			return true;
		}
	}

	public function getDescripcion()
	{
		return $this->descripcion;
	}

	//Metodos para el manejo del CRUD
	public function readCategorias()
	{
		$sql = 'SELECT id_categoria, nombre_categoria, descripcion_categoria FROM categorias ORDER BY nombre_categoria';
		$params = array(null);
		return Database::getRows($sql, $params);
	}

	public function searchCategorias($value)
	{
		$sql = 'SELECT * FROM categorias WHERE nombre_categoria LIKE ? ORDER BY nombre_categoria';
		$params = array("%$value%");
		return Database::getRows($sql, $params);
	}

	public function createCategoria()
	{
		$sql = 'INSERT INTO categorias(nombre_categoria, descripcion_categoria) VALUES(?, ?)';
		$params = array($this->nombre, $this->descripcion);
		return Database::executeRow($sql, $params);
	}

	public function getCategoria()
	{
		$sql = 'SELECT id_categoria, nombre_categoria, descripcion_categoria FROM categorias WHERE id_categoria = ?';
		$params = array($this->id);
		return Database::getRow($sql, $params);
	}

	public function updateCategoria()
	{
		$sql = 'UPDATE categorias SET nombre_categoria = ?,  descripcion_categoria = ? WHERE id_categoria = ?';
		$params = array($this->nombre, $this->descripcion, $this->id);
		return Database::executeRow($sql, $params);
	}

	public function deleteCategoria()
	{
		$sql = 'DELETE FROM categorias WHERE id_categoria = ?';
		$params = array($this->id);
		return Database::executeRow($sql, $params);
	}

	//consultas para graficos
	public function cantidadPC()
	{
		$sql = 'SELECT nombre_categoria, COUNT(id_producto) cantidad FROM productos INNER JOIN categorias USING(id_categoria) GROUP BY id_categoria';
		$params = array(null);
		return Database::getRows($sql, $params);
	}
	
}
?>