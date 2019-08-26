<?php
class inventarios extends Validator
{
    // variables
    private $id = null;
    private $producto = null;
    private $cantidad = null;

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
    
	public function setProducto($value)
	{
		if ($this->validateId($value)) {
			$this->producto = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getProducto()
	{
		return $this->producto;
    }

	public function setCantidad($value)
	{
		if ($this->validateId($value)) {
			$this->cantidad = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getCantidad()
	{
		return $this->cantidad;
    }

    
//  Aqui van los CRUDS
    public function readInventario()
    {
        $sql = 'SELECT id_inventario, imagen_producto, nombre_producto, precio_producto, cantidad_inventario FROM inventario INNER JOIN productos USING(id_producto) ORDER BY nombre_producto';
        $params = array(null);
        return Database::getRows($sql, $params);
    }

//  este es para los productos de la tienda no util en ptc
    public function readInventarioProducto()
    {
        $sql = 'SELECT nombre_categoria, id_producto, imagen_producto, nombre_producto, descripcion_producto, precio_producto FROM productos INNER JOIN categorias USING(id_categoria) WHERE id_categoria = ? AND estado_producto = 1 ORDER BY nombre_producto';
        $params = array($this->categoria);
        return Database::getRows($sql, $params);
    }

    public function searchInventario($value)
    {
        $sql = 'SELECT id_inventario, imagen_producto, nombre_producto, precio_producto, cantidad_inventario FROM inventarios INNER JOIN productos USING(id_producto) WHERE nombre_producto LIKE ? ORDER BY nombre_producto';
        $params = array("%$value%");
        return Database::getRows($sql, $params);
    }

    public function createInventario()
    {
        $sql = 'INSERT INTO inventarios(cantidad_inventario, id_producto) VALUES(?, ?)';
        $params = array($this->cantidad, $this->producto);
        return Database::executeRow($sql, $params);
    }

    public function getInventario()
    {
        $sql = 'SELECT id_inventario, cantidad_inventario, id_producto FROM inventario WHERE id_inventario = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function deleteInventario()
    {
        $sql = 'DELETE FROM inventarios WHERE id_inventario = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function updateInventario()
    {
        $sql = 'UPDATE inventarios SET cantidad_inventario = ?, id_producto = ? WHERE id_inventario = ?';
        $params = array($this->cantidad, $this->producto, $this->id);
        return Database::executeRow($sql, $params);
    }
}
?>