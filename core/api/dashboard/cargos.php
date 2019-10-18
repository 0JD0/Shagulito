<?php
require_once('../../helpers/database.php');
require_once('../../helpers/validator.php');
require_once('../../models/cargos.php');
require_once('../../models/usuarios.php');
 
//Se comprueba si existe una acción a realizar, de lo contrario se muestra un mensaje de error
if (isset($_GET['action'])) {
    session_start();
    $cargo = new Cargos;
    $usuario = new Usuarios;
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    //Se verifica si existe una sesión iniciada como administrador para realizar las operaciones correspondientes
    if (isset($_SESSION['id_empleado'])) {
        switch ($_GET['action']) {
            case 'read':
                if ($result['dataset'] = $cargo->readCargos()) {
                    $result['status'] = 1;
                } else {
                    $result['exception'] = 'No hay cargos registrados';
                }
                break;
            case 'search':
                $_POST = $cargo->validateForm($_POST);
                if ($_POST['search'] != '') {
                    if ($result['dataset'] = $cargo->searchCargos($_POST['search'])) {
                        $result['status'] = 1;
                        $rows = count($result['dataset']);
                        if ($rows > 1) {
                            $result['message'] = 'Se han encontraron ' . $rows . ' coincidencias';
                        } else {
                            $result['message'] = 'Se ha encontrado una coincidencia';
                        }
                    } else {
                        $result['exception'] = 'No se han encontrado coincidencias';
                    }
                } else {
                    $result['exception'] = 'Ingrese lo que deseas buscar';
                }
                break;
            case 'create':
                $_POST = $cargo->validateForm($_POST);
                if ($cargo->setNombre($_POST['create_nombre'])) {
                    if ($cargo->setProduccion(isset($_POST['create_produccion']) ? 1 : 0)) {
                        if ($cargo->setUsuarios(isset($_POST['create_usuarios']) ? 1 : 0)) {
                          if ($cargo->setTransacciones(isset($_POST['create_transacciones']) ? 1 : 0)) {
                                if ($cargo->setReportes(isset($_POST['create_reportes']) ? 1 : 0)) {
                                    if ($cargo->setGraficos(isset($_POST['create_graficos']) ? 1 : 0)) {
                                        if ($cargo->createCargos()) {
                                            $result['status'] = 1;
                                            $result['message'] = 'Cargo creado correctamente';
                                        } else {
                                            $result['exception'] = 'Operación fallida';
                                        }
                                    } else {
                                        $result['exception'] = 'Gráficos incorrectos';
                                    }
                                } else {
                                    $result['exception'] = 'Reportes incorrectos';
                                }
                            } else {
                                $result['exception'] = 'transacciones incorrectas';
                            }
                        } else {
                            $result['exception'] = 'Usuario incorrecto';
                        }
                    } else {
                        $result['exception'] = 'Producción incorrectos';
                    }
                } else {
                    $result['exception'] = 'Nombres incorrectos';
                }
                break;
            case 'get':
                if ($cargo->setId($_POST['id_cargo'])) {
                    if ($result['dataset'] = $cargo->getCargos()) {
                        $result['status'] = 1;
                    } else {
                        $result['exception'] = 'Cargo inexistente';
                    }
                } else {
                    $result['exception'] = 'Cargo incorrecto';
                }
                break;
            case 'update':
                $_POST = $cargo->validateForm($_POST);
                if ($cargo->setId($_POST['id_cargo'])) {
                    if ($cargo->getCargos()) {
                        if ($cargo->setNombre($_POST['update_nombre'])) {
                            if ($cargo->setProduccion(isset($_POST['update_produccion']) ? 1 : 0)) {
                                if ($cargo->setUsuarios(isset($_POST['update_usuarios']) ? 1 : 0)) {
                                    if ($cargo->setTransacciones(isset($_POST['update_transacciones']) ? 1 : 0)) {
                                        if ($cargo->setReportes(isset($_POST['update_reportes']) ? 1 : 0)) {
                                            if ($cargo->setGraficos(isset($_POST['update_graficos']) ? 1 : 0)) {
                                                    if ($cargo->updateCargos()) {
                                                        if ($usuario->setId($_SESSION['id_empleado'])) {
                                                        }
                                                        $result['status'] = 1;
                                                        $result['message'] = 'Cargo modificado correctamente';
                                                    } else {
                                                        $result['exception'] = 'Operación fallida';
                                                    }
                                            } else {
                                                $result['exception'] = 'Gráficos incorrectos';
                                            }
                                        } else {
                                            $result['exception'] = 'Reportes incorrectos';
                                        }
                                    } else {
                                        $result['exception'] = 'Transacciones incorrectas';
                                    }
                                } else {
                                    $result['exception'] = 'Usuarios incorrectos';
                                }
                            } else {
                                $result['exception'] = 'Producción incorrecta';
                            }
                        } else {
                            $result['exception'] = 'Nombre incorrecto';
                        }
                    } else {
                            $result['exception'] = 'Usuario inexistente';
                        }
                } else {
                    $result['exception'] = 'Usuario incorrecto';
                }
                break;
            case 'delete':
                 if ($cargo->setId($_POST['id_cargo'])) {
                        if ($cargo->getCargos()) {
                            if ($cargo->deleteCargos()) {
                                $result['status'] = 1;
                                $result['message'] = 'Cargo eliminado correctamente';
                            } else {
                                $result['exception'] = 'Operación fallida';
                            }
                        } else {
                            $result['exception'] = 'Cargo inexistente';
                        }
                    } else {
                        $result['exception'] = 'Cargo incorrecto';
                    }
                break;
            default:
                exit('Acción no disponible');
        }
        print(json_encode($result));
    } else {
        exit('Recurso denegado');
    }
} else {
    exit('Acceso denegado');
}
?>
