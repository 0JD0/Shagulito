<?php
require_once('../../helpers/database.php');
require_once('../../helpers/validator.php');
require_once('../../models/cargos.php');

//  se muestra error sino existe una accion a realizar
if (isset($_GET['action'])) {
    session_start();
    $cargo = new Cargos;
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // verifca si existe una sesion iniciada para realizar operacionres
    if (isset($_SESSION['id_empleado'])) {
        switch ($_GET['action']) {
            case 'read':
                if ($result['dataset'] = $cargo->readCargo()) {
                    $result['status'] = 1;
                } else {
                    $result['exception'] = 'No hay cargos registrados';
                }
                break;
            case 'search':
                $_POST = $cargo->validateForm($_POST);
                if ($_POST['search'] != '') {
                    if ($result['dataset'] = $cargo->searchCargo($_POST['search'])) {
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
                    if ($cargo->createCargo()) {
                        $result['status'] = 1;
                        $result['message'] = 'Cargo creado correctamente';
                    } else {
                        $result['exception'] = 'Operación fallida';
                    }
                } else {
                    $result['exception'] = 'Nombre incorrecto';
                }
                break;
            case 'get':
                if ($cargo->setId($_POST['id_cargo'])) {
                    if ($result['dataset'] = $cargo->getCargo()) {
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
                    if ($cargo->getCargo()) {
                        if ($cargo->setNombre($_POST['update_nombre'])) {
                            if ($cargo->updateCargo()) {
                                $result['status'] = 1;
                                $result['message'] = 'Cargo modificado correctamente';
                            } else {
                                $result['exception'] = 'Operación fallida';
                            }
                        } else {
                            $result['exception'] = 'Nombre incorrecto';
                        }
                    } else {
                        $result['exception'] = 'Cargo inexistente';
                    }
                } else {
                    $result['exception'] = 'Cargo incorrecto';
                }
                break;
            case 'delete':
                if ($cargo->setId($_POST['identifier'])) {
                    if ($cargo->getCargo()) {
                        if ($cargo->deleteCargo()) {
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
        exit('Acceso no disponible');
    }
} else {
    exit('Recurso denegado');
}