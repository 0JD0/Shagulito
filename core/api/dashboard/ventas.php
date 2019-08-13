<?php
require_once '../../helpers/database.php';
require_once '../../helpers/validator.php';
require_once '../../models/ventas.php';

//  se muestra error sino existe una accion a realizar
if (isset($_GET['action'])) {
    session_start();
    $ventas = new ventas;
    $result = array('status' => 0, 'message' => null, 'exception' => null);
    // verifca si existe una sesion iniciada para realizar operacionres
    if (isset($_SESSION['id_empleado'])) {
        switch ($_GET['action']) {
            case 'read':
                if ($result['dataset'] = $ventas->readVenta()) {
                    $result['status'] = 1;
                } else {
                    $result['exception'] = 'No hay Ventas registrados';
                }
                break;
            case 'search':
                $_POST = $ventas->validateForm($_POST);
                if ($_POST['search'] != '') {
                    if ($result['dataset'] = $ventas->searchVenta($_POST['search'])) {
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
                $_POST = $ventas->validateForm($_POST);
                if (isset($_POST['create_empleado'])) {
                    if ($ventas->setEmpleado($_POST['create_empleado'])) {
                        if ($ventas->setMonto($_POST['create_precio'])) {
                            if ($ventas->setFecha($_POST['create_fecha'])) {
                                if ($ventas->createVenta()) {
                                    $result['status'] = 1;
                                    $result['message'] = 'Venta creada correctamente';
                                } else {
                                    $result['exception'] = 'Operación fallida';
                                }
                            } else {
                                $result['exception'] = 'Fecha incorrecta';
                            }
                        } else {
                            $result['exception'] = 'Monto incorrecto';
                        }
                    } else {
                        $result['exception'] = 'Empleado incorrecta';
                    }
                } else {
                    $result['exception'] = 'Selecciona un Empleado';
                }
                break;
            case 'get':
                if ($ventas->setId($_POST['id_venta'])) {
                    if ($result['dataset'] = $ventas->getVenta()) {
                        $result['status'] = 1;
                    } else {
                        $result['exception'] = 'Venta inexistente';
                    }
                } else {
                    $result['exception'] = 'Venta incorrecto';
                }
                break;
            case 'update':
                $_POST = $ventas->validateForm($_POST);
                if ($ventas->setId($_POST['id_venta'])) {
                    if ($ventas->getVenta()) {
                        if ($ventas->setEmpleado($_POST['update_empleado'])) {
                            if ($ventas->setMonto($_POST['update_precio'])) {
                                if ($ventas->setFecha($_POST['update_fecha'])) {
                                    if ($ventas->updateVenta()) {
                                        $result['status'] = 1;
                                        $result['message'] = 'Venta modificado correctamente';
                                    } else {
                                        $result['exception'] = 'Operación fallida';
                                    }
                                } else {
                                    $result['exception'] = 'Fecha incorrecta';
                                }
                            } else {
                                $result['exception'] = 'Precio incorrecto';
                            }
                        } else {
                            $result['exception'] = 'Selecciona un Empleado';
                        }
                    } else {
                        $result['exception'] = 'Venta inexistente';
                    }
                } else {
                    $result['exception'] = 'Venta incorrecta';
                }
                break;
            case 'delete':
                if ($ventas->setId($_POST['identifier'])) {
                    if ($ventas->getVenta()) {
                        if ($ventas->deleteVenta()) {
                            $result['status'] = 1;
                            $result['message'] = 'Venta eliminado correctamente';
                        } else {
                            $result['exception'] = 'Operación fallida';
                        }
                    } else {
                        $result['exception'] = 'Venta inexistente';
                    }
                } else {
                    $result['exception'] = 'Venta incorrecta';
                }
                break;
            case 'graficoPVE':
                if ($result['dataset'] = $ventas->productosVE()) {
                    $result['status'] = 1;
                } else {
                    $result['exception'] = 'No hay datos disponibles';
                }
                break;
            //quimera de un buscador para un grafico
            case 'graficoVM':
                $_POST = $ventas->validateForm($_POST);
                if ($_POST['vminicio'] != '' & $_POST['vmfinal'] != '') {
                    if ($result['dataset'] = $ventas->ventasMonto($_POST['vminicio'], $_POST['vmfinal'])) {
                        $result['status'] = 1;
                    } else {
                        $result['exception'] = 'No hay datos disponibles en el rango seleccionado';
                    }
                } else {
                        $result['exception'] = 'Ingrese un valor para mostrar';
                }
                break;
            case 'graficoVF':
                $_POST = $ventas->validateForm($_POST);
                if ($_POST['vfinicio'] != '' & $_POST['vffinal'] != '') {
                    if ($result['dataset'] = $ventas->ventasFecha($_POST['vfinicio'], $_POST['vffinal'])) {
                        $result['status'] = 1;
                    } else {
                        $result['exception'] = 'No hay datos disponibles en el rango seleccionado';
                    }
                } else {
                        $result['exception'] = 'Ingrese un valor para mostrar';
                }
                break;
            case 'graficoVE':
                $_POST = $ventas->validateForm($_POST);
                if ($_POST['empleadove'] != '') {
                    if ($result['dataset'] = $ventas->ventasEmpleado($_POST['empleadove'])) {
                        $result['status'] = 1;
                    } else {
                        $result['exception'] = 'No hay datos disponibles en el rango seleccionado';
                    }
                } else {
                        $result['exception'] = 'Ingrese un valor para mostrar';
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