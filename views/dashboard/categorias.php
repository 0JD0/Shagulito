<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Shagulito</title>
    <!--Import Google Icon Font-->
    <link type="text/css" rel="stylesheet" href="../../resources/css/icons.css">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="../../resources/css/materialize.min.css" media="screen,projection" />
    <link rel="stylesheet" href="../../resources/css/index.css">
</head>
<?php
//require_once('../../core/helpers/dashboard.php');
//Dashboard::headerTemplate('Administrar categorías');
?>

<body>
<section>
        <div class="container">
            <!-- utilice autocomplete para buscar -->
            <div class="row">
                <div class="col s12">
                    <h3 class="center-align grey-text">Administrar Productos</h3>
                    <!-- autocomplete para búscar -->
                    <form method="post" id="form-search">
                        <div class="input-field col s6 m6">
                            <i class="material-icons prefix">search</i>
                            <!-- el search de la izquierda muetrael icono que quires que se vea -->
                            <input type="text" id="search" name="search" />
                            <label for="search">Buscador</label>
                        </div>
                        <div class="input-field col s2 m2">
                            <button type="submit" class="btn waves-effect btn-floating indigo tooltipped"
                                data-tooltip="Buscar">
                                <i class="material-icons">check</i>
                            </button>
                            <!-- el check circle es lo mismo q el comentario de arriba -->
                        </div>
                    </form>

                    <!-- Botón para abrir ventana de agregar -->
                    <div class="input-field center-align col s2 m2">
                        <!-- Modal Trigger -->
                        <a href="#" onclick="modalCreate()" class="btn waves-effect btn-floating green tooltipped modal-trigger"
                            data-tooltip="Agregar">
                            <i class="material-icons">add</i>
                        </a>
                    </div>

                    <!-- se crea la tabla q mostrara los registros -->
                    <div class="col s12">
                        <div class="card white darken-1">
                            <div class="card-content black-text">
                                <table class="centered striped responsive-table">
                                    <thead>
                                        <tr>
                                            <th>IMAGEN</th>
                                            <th>NOMBRE</th>
                                            <th>PRECIO($)</th>
                                            <th>CATEGORÍA</th>
                                            <th>ESTADO</th>
                                            <th>ACCIÓN</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody-read">
                                        <tr>
                                            <td>Datos</td>
                                            <td>Random</td>
                                            <td>No</td>
                                            <td>Hay</td>
                                            <td>Base</td>
                                            <td>
                                                <a href="#modal-editar"
                                                    class="waves-effect waves-blue tooltipped modal-trigger"
                                                    data-tooltip="Editar">
                                                    <i class="material-icons blue-text">edit</i>
                                                </a>
                                                <a href="#modal-eliminar"
                                                    class="waves-effect waves-orange tooltipped modal-trigger"
                                                    data-tooltip="Eliminar">
                                                    <i class="material-icons red-text">delete</i>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- modal para agregar -->
                    <div id="modal-create" class="modal">
                        <div class="modal-content">
                            <h4 class="center-align">Agregar Producto</h4>
                            <form method="post" id="form-create" enctype="multipart/form-data">
                                <div class="row">
                                    <div class="input-field col s12 m6">
                                        <i class="material-icons prefix">cake</i>
                                        <input type="text" id="create_nombre" name="create_nombre" class="validate"
                                            required />
                                        <label for="create_nombre">Nombre</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <i class="material-icons prefix">attach_money</i>
                                        <input type="number" id="create_precio" name="create_precio" max="999.99"
                                            min=".01" step="any" class="validate" required />
                                        <label for="create_precio">Precio $</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <i class="material-icons prefix">assignment</i>
                                        <input type="text" id="create_descripcion" name="create_descripcion"
                                            class="validate" required />
                                        <label for="create_descripcion">Descripción</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <i class="material-icons prefix">book</i>
                                        <select id="create_categoria" name="create_categoria"></select>
                                        <label>Categoría</label>
                                    </div>
                                    <div class="file-field input-field col s12 m6">
                                        <div class="btn waves-effect">
                                            <span><i class="material-icons">image</i></span>
                                            <input id="create_archivo" type="file" name="create_archivo" required />
                                        </div>
                                        <div class="file-path-wrapper">
                                            <input type="text" class="file-path validate"
                                                placeholder="Seleccione una imagen de 500x500" />
                                        </div>
                                    </div>
                                    <div class="col s12 m6">
                                        <p>
                                            <div class="switch">
                                                <span>Estado:</span>
                                                <label>
                                                    <i class="material-icons">visibility_off</i>
                                                    <input id="create_estado" type="checkbox" name="create_estado"
                                                        checked />
                                                    <span class="lever"></span>
                                                    <i class="material-icons">visibility</i>
                                                </label>
                                            </div>
                                        </p>
                                    </div>
                                </div>
                                <div class="row center-align">
                                    <a href="#" class="modal-close btn waves-effect red tooltipped "
                                        data-tooltip="Cancelar">
                                        <i class="material-icons">cancel</i>
                                    </a>
                                    <button href="#modal-exito" type="submit"
                                        class="modal-close btn waves-effect green tooltipped modal-trigger"
                                        data-tooltip="Crear">
                                        <i class="material-icons">save</i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- Modal para editar -->
                    <div id="modal-update" class="modal">
                        <div class="modal-content">
                            <h4 class="center-align">Editar Producto</h4>
                            <form method="post" id="form-update" enctype="multipart/form-data">
                                <input type="hidden" id="id_producto" name="id_producto" />
                                <input type="hidden" id="imagen_producto" name="imagen_producto" />
                                <div class="row">
                                    <div class="input-field col s12 m6">
                                        <i class="material-icons prefix">cake</i>
                                        <input type="text" id="update_nombre" name="update_nombre" class="validate"
                                            required />
                                        <label for="update_nombre">Nombre</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <i class="material-icons prefix">attach_money</i>
                                        <input type="number" id="update_precio" name="update_precio" max="999.99"
                                            min=".01" step="any" class="validate" required />
                                        <label for="update_precio">Precio $</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <i class="material-icons prefix">assignment</i>
                                        <input type="text" id="update_descripcion" name="update_descripcion"
                                            class="validate" required />
                                        <label for="update_descripcion">Descripcion</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <i class="material-icons prefix">book</i>
                                        <select id="update_categoria" name="update_categoria"></select>
                                        <label>Categoría</label>
                                    </div>
                                    <div class="file-field input-field col s12 m6">
                                        <div class="btn waves-effect">
                                            <span><i class="material-icons">image</i></span>
                                            <input id="update_archivo" type="file" name="update_archivo" required />
                                        </div>
                                        <div class="file-path-wrapper">
                                            <input type="text" class="file-path validate"
                                                placeholder="Seleccione una imagen de 500x500" />
                                        </div>
                                    </div>
                                    <div class="col s12 m6">
                                        <p>
                                            <div class="switch">
                                                <span>Estado:</span>
                                                <label>
                                                    <i class="material-icons">visibility_off</i>
                                                    <input id="update_estado" type="checkbox" name="update_estado" />
                                                    <span class="lever"></span>
                                                    <i class="material-icons">visibility</i>
                                                </label>
                                            </div>
                                        </p>
                                    </div>
                                </div>

                                <div class="row center-align">
                                    <a href="#" class="modal-close btn waves-effect red tooltipped "
                                        data-tooltip="Cancelar">
                                        <i class="material-icons">cancel</i>
                                    </a>
                                    <button href="#modal-exito" type="submit"
                                        class="modal-close btn waves-effect green tooltipped modal-trigger"
                                        data-tooltip="Modificar">
                                        <i class="material-icons">save</i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- Modal Structure -->
                    <!--                    <div id="modal-eliminar" class="modal">
                        <div class="modal-content center-align">
                            <i class="large material-icons orange-text">info_outline</i>
                            <h4>Advertencia</h4>
                            <p>¿Desea eliminar el producto?</p>
                        </div>
                        <div class="modal-footer">
                            <a href="#!" class="modal-close waves-effect waves-red red btn">Cancelar</a>
                            <a href="#modal-exito"
                                class="modal-close waves-effect waves-green btn modal-trigger">Eliminar</a>
                        </div>
                    </div>-->

                    <!-- Modal Structure -->
                    <!--                    <div id="modal-exito" class="modal">
                        <div class="modal-content center-align">
                            <i class="large material-icons green-text">check_circle_outline</i>
                            <h4>Éxito</h4>
                            <p>Acción exitosa</p>
                        </div>
                        <div class="modal-footer">
                            <a href="#!" class="modal-close waves-effect waves-green btn">Aceptar</a>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </section>

    <footer class="page-footer">
        <div class="container">
            <div class="row">
                <div class="col s12 m6 l6">
                    <h5 class="white-text">Dashboard</h5>
                    <a class="white-text" href="mailto:daniel.hdez2018@gmail.com"><i
                            class="material-icons left">email</i>Ayuda</a>
                </div>
                <div class="col s12 m6 l6">
                    <h5 class="white-text">Enlaces</h5>
                    <a class="white-text" href="http://localhost/phpmyadmin/" target="_blank"><i
                            class="material-icons left">cloud</i>phpMyAdmin</a>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <div class="container">
                <span>© Shagulito, todos los derechos reservados.</span>
                <span class="white-text right">Diseñado con <a class="red-text text-accent-1"
                        href="http://materializecss.com/" target="_blank"><b>Materialize</b></a></span>
            </div>
        </div>

    </footer>
    <script type="text/javascript" src="../../libraries/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="../../resources/js/materialize.min.js"></script>
    <script type="text/javascript" src="../../resources/js/sweetalert.min.js"></script>
    <script type="text/javascript" src="../../resources/js/dashboard.js"></script>
    <script type="text/javascript" src="../../core/helpers/functions.js"></script>
    <!-- <script type="text/javascript" src="../../core/controllers/dashboard/'.$controller.'"></script>-->
</body>
<?php
//Dashboard::footerTemplate('categorias.js');
?>