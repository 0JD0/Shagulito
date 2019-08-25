<?php
require_once('../../helpers/database.php');
require_once('../../helpers/validator.php');
require_once('../../models/categorias.php');

//Se comprueba si existe una petición del sitio web y la acción a realizar, de lo contrario se muestra una página de error
if (isset($_GET['action'])) {
	session_start();
	$categoria = new Categorias;
	$result = array('status' => 0, 'message' => null, 'exception' => null);
	//Se verifica si existe una sesión iniciada como administrador para realizar las operaciones correspondientes
	if (isset($_SESSION['id_empleado'])) {
		switch ($_GET['action']) {
			case 'read':
				if ($result['dataset'] = $categoria->readCategorias()) {
					$result['status'] = 1;
				} else {
					$result['exception'] = 'No hay categorías registradas';
				}
				break;
			case 'search':
				$_POST = $categoria->validateForm($_POST);
				if ($_POST['busqueda'] != '') {
					if ($result['dataset'] = $categoria->searchCategorias($_POST['busqueda'])) {
						$result['status'] = 1;
					} else {
						$result['exception'] = 'No hay coincidencias';
					}
				} else {
					$result['exception'] = 'Ingrese un valor para buscar';
				}
				break;
			case 'create':
				$_POST = $categoria->validateForm($_POST);
        		if ($categoria->setNombre($_POST['create_nombre'])) {
					if ($categoria->setDescripcion($_POST['create_descripcion'])) {
						if ($categoria->setEstado(isset($_POST['create_estado']) ? 1 : 0)) {
							if ($categoria->createCategoria()) {
								$result['status'] = 1;
							} else {
								$result['exception'] = 'Operación fallida';
							}
						} else {
							$result['exception'] = 'Estado incorrecto';
						}
					} else {
						$result['exception'] = 'Descripción incorrecta';
					}
				} else {
					$result['exception'] = 'Nombre incorrecto';
				}
            	break;
            case 'get':
                if ($categoria->setId($_POST['id_categoria'])) {
                    if ($result['dataset'] = $categoria->getCategoria()) {
                        $result['status'] = 1;
                    } else {
                        $result['exception'] = 'Categoría inexistente';
                    }
                } else {
                    $result['exception'] = 'Categoría incorrecta';
                }
            	break;
			case 'update':
				$_POST = $categoria->validateForm($_POST);
				if ($categoria->setId($_POST['id_categoria'])) {
					if ($categoria->getCategoria()) {
		                if ($categoria->setNombre($_POST['update_nombre'])) {
							if ($categoria->setDescripcion($_POST['update_descripcion'])) {
								if ($categoria->setEstado(isset($_POST['update_estado']) ? 1 : 0)) {
								if ($categoria->updateCategoria()) {
										$result['status'] = 1;
								} else {
									$result['exception'] = 'Operación fallida';
								}
							} else {
								$result['exception'] = 'Estado incorrecto';
							}
							} else {
								$result['exception'] = 'Descripción incorrecta';
							}
						} else {
							$result['exception'] = 'Nombre incorrecto';
						}
					} else {
						$result['exception'] = 'Categoría inexistente';
					}
				} else {
					$result['exception'] = 'Categoría incorrecta';
				}
            	break;
            case 'delete':
				if ($categoria->setId($_POST['id_categoria'])) {
					if ($categoria->getCategoria()) {
						if ($categoria->deleteCategoria()) {
								$result['status'] = 1;
						} else {
							$result['exception'] = 'Operación fallida';
						}
					} else {
						$result['exception'] = 'Categoría inexistente';
					}
				} else {
					$result['exception'] = 'Categoría incorrecta';
				}
				break;
				case 'graficoCPC':
                if ($result['dataset'] = $categoria->cantidadPC()) {
                    $result['status'] = 1;
                } else {
                    $result['exception'] = 'No hay datos disponibles';
                }
                break;
			default:
				exit('Acción no disponible');
		}
	} else {
		exit('Acceso no disponible');
	}
	print(json_encode($result));
} else {
	exit('Recurso denegado');
}
?>
