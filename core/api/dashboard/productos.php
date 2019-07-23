<?php
require_once '../../helpers/database.php';
require_once '../../helpers/validator.php';
require_once '../../models/productos.php';

//  se muestra error sino existe una accion a realizar
if (isset($_GET['action'])) {
    session_start();
    $producto = new Productos;
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // verifca si existe una sesion iniciada para realizar operacionres
    if (isset($_SESSION['id_empleado'])) {
        switch ($_GET['action']) {
            case 'read':
                if ($result['dataset'] = $producto->readProducto()) {
                    $result['status'] = 1;
                } else {
                    $result['exception'] = 'No hay productos registrados';
                }
                break;
            case 'search':
                $_POST = $producto->validateForm($_POST);
                if ($_POST['search'] != '') {
                    if ($result['dataset'] = $producto->searchProducto($_POST['search'])) {
                        $result['status'] = 1;
                        $rows = count($result['dataset']);
                        if ($rows > 1) {
                            $result['message'] = 'Se han encontraron ' . $rows . ' coincidencias';
                        } else {
                            $result['message'] = 'Se ha encontrado una coincidencia';
                        }
                    } else {
                        $result['exception'] = 'No han encontrado coincidencias';
                    }
                } else {
                    $result['exception'] = 'Ingrese lo que deseas buscar';
                }
                break;
            case 'create':
                $_POST = $producto->validateForm($_POST);
                if ($producto->setNombre($_POST['create_nombre'])) {
                    if ($producto->setDescripcion($_POST['create_descripcion'])) {
                        if ($producto->setPrecio($_POST['create_precio'])) {
                            if (isset($_POST['create_categoria'])) {
                                if ($producto->setCategoria($_POST['create_categoria'])) {
                                    if ($producto->setEstado(isset($_POST['create_estado']) ? 1 : 0)) {
                                        if (is_uploaded_file($_FILES['create_archivo']['tmp_name'])) {
                                            if ($producto->setImage($_FILES['create_archivo'], null)) {
                                                if ($producto->createProducto()) {
                                                    $result['status'] = 1;
                                                    if ($producto->saveFile($_FILES['create_archivo'], $producto->getRuta(), $producto->getImage())) {
                                                        $result['message'] = 'Producto creado correctamente';
                                                    } else {
                                                        $result['message'] = 'Producto creado. No se guardó el archivo';
                                                    }
                                                } else {
                                                    $result['exception'] = 'Operación fallida';
                                                }
                                            } else {
                                                $result['exception'] = $producto->getImageError();
                                            }
                                        } else {
                                            $result['exception'] = 'Selecciona una imagen de 500x500';
                                        }
                                    } else {
                                        $result['exception'] = 'Estado incorrecto';
                                    }
                                } else {
                                    $result['exception'] = 'Categoría incorrecta';
                                }
                            } else {
                                $result['exception'] = 'Selecciona una categoría';
                            }
                        } else {
                            $result['exception'] = 'Precio incorrecto';
                        }
                    } else {
                        $result['exception'] = 'Descripción incorrecta';
                    }
                } else {
                    $result['exception'] = 'Nombre incorrecto';
                }
                break;
            case 'get':
                if ($producto->setId($_POST['id_producto'])) {
                    if ($result['dataset'] = $producto->getProducto()) {
                        $result['status'] = 1;
                    } else {
                        $result['exception'] = 'Producto inexistente';
                    }
                } else {
                    $result['exception'] = 'Producto incorrecto';
                }
                break;
            case 'update':
                $_POST = $producto->validateForm($_POST);
                if ($producto->setId($_POST['id_producto'])) {
                    if ($producto->getProducto()) {
                        if ($producto->setNombre($_POST['update_nombre'])) {
                            if ($producto->setDescripcion($_POST['update_descripcion'])) {
                                if ($producto->setPrecio($_POST['update_precio'])) {
                                    if ($producto->setCategoria($_POST['update_categoria'])) {
                                        if ($producto->setEstado(isset($_POST['update_estado']) ? 1 : 0)) {
                                            if (is_uploaded_file($_FILES['update_archivo']['tmp_name'])) {
                                                if ($producto->setImage($_FILES['update_archivo'], $_POST['imagen_producto'])) {
                                                    $archivo = true;
                                                } else {
                                                    $result['exception'] = $producto->getImageError();
                                                    $archivo = false;
                                                }
                                            } else {
                                                if (!$producto->setImage(null, $_POST['imagen_producto'])) {
                                                    $result['exception'] = $producto->getImageError();
                                                }
                                                $archivo = false;
                                            }
                                            if ($producto->updateProducto()) {
                                                $result['status'] = 1;
                                                if ($archivo) {
                                                    if ($producto->saveFile($_FILES['update_archivo'], $producto->getRuta(), $producto->getImagen())) {
                                                        $result['message'] = 'Producto modificado correctamente';
                                                    } else {
                                                        $result['message'] = 'Producto modificado. No se guardó el archivo';
                                                    }
                                                } else {
                                                    $result['message'] = 'Producto modificado. No se subió ningún archivo';
                                                }
                                            } else {
                                                $result['exception'] = 'Operación fallida';
                                            }
                                        } else {
                                            $result['exception'] = 'Estado incorrecto';
                                        }
                                    } else {
                                        $result['exception'] = 'Selecciona una categoría';
                                    }
                                } else {
                                    $result['exception'] = 'Precio incorrecto';
                                }
                            } else {
                                $result['exception'] = 'Descripción incorrecta';
                            }
                        } else {
                            $result['exception'] = 'Nombre incorrecto';
                        }
                    } else {
                        $result['exception'] = 'Producto inexistente';
                    }
                } else {
                    $result['exception'] = 'Producto incorrecto';
                }
                break;
            case 'delete':
                if ($producto->setId($_POST['identifier'])) {
                    if ($producto->getProducto()) {
                        if ($producto->deleteProducto()) {
                            $result['status'] = 1;
                            if ($producto->deleteFile($producto->getRuta(), $_POST['filename'])) {
                                $result['message'] = 'Producto eliminado correctamente';
                            } else {
                                $result['message'] = 'Producto eliminado. No se borró el archivo';
                            }
                        } else {
                            $result['exception'] = 'Operación fallida';
                        }
                    } else {
                        $result['exception'] = 'Producto inexistente';
                    }
                } else {
                    $result['exception'] = 'Producto incorrecto';
                }
                break;
            default:
                exit('Acción no disponible');
        }
        print(json_encode($result));
    } else {
        exit('Acceso no disponible');
    }
} else {
    exit('Recurso denegado');
}