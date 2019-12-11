<?php
class Cargos extends Validator
{
	// Declaración de propiedades
	private $id = null;
	private $nombre = null;
	private $produccion = null;
	private $usuarios = null;
	private $transacciones = null;
	private $reportes = null;
	private $graficos = null;

	// Métodos para sobrecarga de propiedades
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
		if ($this->validateAlphabetic($value, 1, 50)) {
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

	public function setProduccion($value)
	{
		if ($value == 0 || $value == 1) {
			$this->produccion = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getProduccion()
	{
		return $this->produccion;
	}

	public function setUsuarios($value)
	{
		if ($value == 0 || $value == 1) {
			$this->usuarios = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getUsuarios()
	{
		return $this->usuarios;
	}

	public function setTransacciones($value)
	{
		if ($value == 0 || $value == 1) {
			$this->transacciones = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getTransacciones()
	{
		return $this->transacciones;
	}

	public function setReportes($value)
	{
		if ($value == 0 || $value == 1) {
			$this->reportes = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getReportes()
	{
		return $this->reportes;
	}

	public function setGraficos($value)
	{
		if ($value == 0 || $value == 1) {
			$this->graficos = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getGraficos()
	{
		return $this->graficos;
	}

	// Metodos para manejar el SCRUD
	public function readCargos()
	{
		$sql = 'SELECT id_cargo, nombre_cargo, produccion, usuarios, transacciones, reportes, graficos FROM cargos ORDER BY nombre_cargo';
		$params = array(null);
		return Database::getRows($sql, $params);
	}

	public function searchCargos($value)
	{
		$sql = 'SELECT id_cargo, nombre_cargo, produccion, usuarios, transacciones, reportes, graficos FROM cargos WHERE nombre_cargo LIKE ? ORDER BY nombre_cargo';
		$params = array("%$value%");
		return Database::getRows($sql, $params);
	}

	public function createCargos()
	{
		$sql = 'INSERT INTO cargos(nombre_cargo, produccion, usuarios, transacciones, reportes, graficos) VALUES(?, ?, ?, ?, ?, ?)';
		$params = array($this->nombre, $this->produccion, $this->usuarios, $this->transacciones, $this->reportes, $this->graficos);
		return Database::executeRow($sql, $params);
	}

	public function getCargos()
	{
		$sql = 'SELECT id_cargo, nombre_cargo, produccion, usuarios, transacciones, reportes, graficos FROM cargos WHERE id_cargo = ?';
		$params = array($this->id);
		return Database::getRow($sql, $params);
	}

	public function updateCargos()
	{
		$sql = 'UPDATE cargos SET nombre_cargo = ?, produccion = ?, usuarios = ?, transacciones = ?, reportes = ?, graficos = ? WHERE id_cargo = ?';
		$params = array($this->nombre, $this->produccion, $this->usuarios, $this->transacciones, $this->reportes, $this->graficos, $this->id);
		return Database::executeRow($sql, $params);
	}

	public function deleteCargos()
	{
		$sql = 'DELETE FROM cargos WHERE id_cargo = ?';
		$params = array($this->id);
		return Database::executeRow($sql, $params);
	}
}
?>
