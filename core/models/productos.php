<?php
class Productos extends Validator
{
    // variables
    private $id = null;
    private $nombre = null;
    private $descripcion = null;
    private $precio = null;
    private $imagen = null;
    private $categoria = null;
    private $estado = null;
    private $ruta = '../../resources/img/productos/'; 

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

	public function setDescripcion($value)
	{
		if ($this->validateAlphanumeric($value, 1, 200)) {
			$this->descripcion = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getDescripcion()
	{
		return $this->descripcion;
    }
    
	public function setPrecio($value)
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
    
	public function setImage($file, $name)
	{
		if ($this->validateImageFile($file, $this->ruta, $name, 500, 500)) {
			$this->imagen = $this->getImageName();
			return true;
		} else {
			return false;
		}
	}

	public function getImage()
	{
		return $this->imagen;
    }

	public function setCategoria($value)
	{
		if ($this->validateId($value)) {
			$this->categoria = $value;
			return true;
		} else {
			return false;
		}
	}

	public function getCategoria()
	{
		return $this->categoria;
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
    
	public function getRuta()
	{
		return $this->ruta;
    }
    
//  Aqui van los CRUDS
    public function readProducto()
    {
        $sql = 'SELECT id_producto, imagen_producto, nombre_producto, descripcion_producto, precio_producto, nombre_categoria, estado_producto FROM productos INNER JOIN categorias USING(id_categoria) ORDER BY nombre_producto';
        $params = array(null);
        return Database::getRows($sql, $params);
    }

    public function readProductoCategoria()
    {
        $sql = 'SELECT nombre_categoria, id_producto, imagen_producto, nombre_producto, descripcion_producto, precio_producto FROM productos INNER JOIN categorias USING(id_categoria) WHERE id_categoria = ? AND estado_producto = 1 ORDER BY nombre_producto';
        $params = array($this->categoria);
        return Database::getRows($sql, $params);
    }

    public function searchProducto($value)
    {
        $sql = 'SELECT id_producto, imagen_producto, nombre_producto, descripcion_producto, precio_producto, nombre_categoria, estado_producto FROM productos INNER JOIN categorias USING(id_categoria) WHERE nombre_producto LIKE ? OR descripcion_producto LIKE ? ORDER BY nombre_producto';
        $params = array("%$value%", "%$value%");
        return Database::getRows($sql, $params);
    }

    public function createProducto()
    {
        $sql = 'INSERT INTO productos(nombre_producto, descripcion_producto, precio_producto, imagen_producto, estado_producto, id_categoria) VALUES(?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->descripcion, $this->precio, $this->imagen, $this->estado, $this->categoria);
        return Database::executeRow($sql, $params);
    }

    public function getProducto()
    {
        $sql = 'SELECT id_producto, nombre_producto, descripcion_producto, precio_producto, imagen_producto, id_categoria, estado_producto FROM productos WHERE id_producto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function deleteProducto()
    {
        $sql = 'DELETE FROM productos WHERE id_producto = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function updateProducto()
    {
        $sql = 'UPDATE productos SET nombre_producto = ?, descripcion_producto = ?, precio_producto = ?, imagen_producto = ?, estado_producto = ?, id_categoria = ? WHERE id_producto = ?';
        $params = array($this->nombre, $this->descripcion, $this->precio, $this->imagen, $this->estado, $this->categoria, $this->id);
        return Database::executeRow($sql, $params);
    }
}
?>