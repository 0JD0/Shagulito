<?php
require_once '../../helpers/database.php';
require_once '../../helpers/validator.php';
require_once '../../models/clientes.php';

//  se muestra error sino existe una accion a realizar
if (isset($_GET['action'])) {
    session_start();
    $cliente = new Clientes;
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // verifca si existe una sesion iniciada para realizar operacionres
    if (isset($_SESSION['id_cliente'])) {
        switch ($_GET['action']) {
            case 'read':
                if ($result['dataset'] = $cliente->readCliente()) {
                    $result['status'] = 1;
                } else {
                    $result['exception'] = 'No hay clientes registrados';
                }
                break;
            case 'search':
                $_POST = $cliente->validateForm($_POST);
                if ($_POST['search'] != '') {
                    if ($result['dataset'] = $cliente->searchCliente($_POST['search'])) {
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
                $_POST = $cliente->validateForm($_POST);
                if ($cliente->setNombres($_POST['create_nombres'])) {
                    if ($cliente->setApellidos($_POST['create_apellidos'])) {
                        if ($cliente->setTelefono($_POST['create_telefono'])) {
                            if ($cliente->setCorreo($_POST['create_correo'])) {
                                if ($cliente->createCliente()) {
                                    $result['status'] = 1;
                                } else {
                                    $result['status'] = 2;
                                }
                            } else {
                                $result['exception'] = 'Correo incorrecto';
                            }
                        } else {
                            $result['exception'] = 'Telefono incorrectos';
                        }
                    } else {
                        $result['exception'] = 'Apellidos incorrectos';
                    }
                } else {
                    $result['exception'] = 'Nombres incorrectos';
                }
                break;
            case 'get':
                if ($cliente->setId($_POST['id_cliente'])) {
                    if ($result['dataset'] = $cliente->getCliente()) {
                        $result['status'] = 1;
                    } else {
                        $result['exception'] = 'Cliente inexistente';
                    }
                } else {
                    $result['exception'] = 'Cliente incorrecto';
                }
                break;
            case 'update':
                $_POST = $cliente->validateForm($_POST);
                if ($cliente->setId($_POST['id_empleado'])) {
                    if ($cliente->getCliente()) {
                        if ($cliente->setNombres($_POST['update_nombres'])) {
                            if ($cliente->setApellidos($_POST['update_apellidos'])) {
                                if ($cliente->setTelefono($_POST['update_telefono'])) {
                                    if ($cliente->setCorreo($_POST['update_correo'])) {
                                        if ($usuario->updateCientel()) {
                                            $result['status'] = 1;
                                        } else {
                                            $result['status'] = 2;
                                        }
                                    } else {
                                        $result['exception'] = 'Correo incorrecto';
                                    }
                                } else {
                                    $result['exception'] = 'telefono incorrecto';
                                }
                            } else {
                                $result['exception'] = 'Apellidos incorrectos';
                            }
                        } else {
                            $result['exception'] = 'Nombres incorrectos';
                        }
                    } else {
                        $result['exception'] = 'Cliente inexistente';
                    }
                } else {
                    $result['exception'] = 'Cliente incorrecto';
                }
                break;
            case 'delete':
                if ($cliente->setId($_POST['identifier'])) {
                    if ($cliente->getCliente()) {
                        if ($cliente->deleteCliente()) {
                            $result['status'] = 1;
                            $result['message'] = 'Cliente eliminado correctamente';
                        } else {
                            $result['exception'] = 'Operación fallida';
                        }
                    } else {
                        $result['exception'] = 'CLiente inexistente';
                    }
                } else {
                    $result['exception'] = 'Cliente incorrecto';
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