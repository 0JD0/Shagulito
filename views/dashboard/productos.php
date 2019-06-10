<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Shagulito</title>
    <!--Import Google Icon Font-->
    <link type="text/css" rel="stylesheet" href="../../resources/css/font_materialize.css">
    <!--Import materialize.css-->
    <link type="text/css" rel="stylesheet" href="../../resources/css/materialize.css" media="screen,projection" />
    <link rel="stylesheet" href="../../resources/css/index.css">
</head>
<?php
//require_once('../../core/helpers/dashboard.php');
//Dashboard::headerTemplate('Administrar productos');
?>

<body>
    <!-- lista de ariba derecha -->
    <ul id="dropdown1" class="dropdown-content">
        <li>
            <a href="#!">Editar perfil</a>
        </li>

        <li class="divider"></li>
        <li>
            <a href="index.php">
                <i class="material-icons">exit_to_app</i> Cerrar Sesión
            </a>
        </li>
    </ul>
    <header>
        <!--Hacer el nav flexible-->
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <a href="#!" class="brand-logo center">
                        <img src="../../resources/img/logo.png">
                    </a>
                    <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                        <i class="material-icons">menu</i>
                    </a>
                    <ul class="right hide-on-med-and-down">
                        <li>
                            <a class="dropdown-trigger" href="#!" data-target="dropdown1">Perfil
                                <i class="material-icons right">arrow_drop_down</i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <ul id="slide-out" class="sidenav">
            <li>
                <div class="user-view">
                    <div class="background">
                        <img class="background" src="../../resources/img/fondo.jpg">
                    </div>
                    <a href="#user">
                        <img class="circle" src="../../resources/img/foto.jpg">
                    </a>
                    <a href="#name">
                        <span class="black-text name">Daniel Hernandez</span>
                    </a>
                </div>
            </li>
            <li>
                <a href="home.php">
                    <i class="material-icons">home</i>Inicio</a>
            </li>
            <li>
                <a href="categorias.php">
                    <i class="material-icons">description</i>Categorias
                </a>
            </li>
            <li>
                <a href="productos.php">
                    <i class="material-icons">cake</i>Productos
                </a>
            </li>
            <li>
            <li>
                <a href="ventas.php">
                    <i class="material-icons">attach_money</i>Ventas
                </a>
            </li>
            <li>
                <a href="inventario.php">
                    <i class="material-icons">book</i>Inventario
                </a>
            </li>
            <li>
                <a href="usuarios.php">
                    <i class="material-icons">person</i>Usuarios
                </a>
            </li>
            <li>
                <a href="tipo_usuario.php">
                    <i class="material-icons">person</i>Tipo de Usuarios
                </a>
            </li>
            <li>

                <div class="divider"></div>
            </li>
            <li>
                <a class="waves-effect" href="index.php">
                    <i class="material-icons">exit_to_app</i>Cerrar Sesión
                </a>
            </li>
        </ul>
    </header>
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
                        <a href="#modal-create" class="btn waves-effect btn-floating green tooltipped modal-trigger"
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
                                        <input type="text" id="create-nombre" name="create-nombre" class="validate" required/>
                                        <label for="create-nombre">Nombre</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <i class="material-icons prefix">attach_money</i>
                                        <input type="number" id="create-precio" name="create-precio" max="999.99" min=".01" step="any" class="validate" required/>
                                        <label for="autocomplete-input">Precio $</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <i class="material-icons prefix">assignment</i>
                                        <input type="text" id="autocomplete-input" class="validate" />
                                        <label for="autocomplete-input">Descripcion</label>
                                    </div>
                                    <div class="input-field col s12 m6">
                                        <i class="material-icons prefix">book</i>
                                        <select>
                                            <option value="" disabled selected>Seleccione una opcion</option>
                                            <option value="1">Pan Frances</option>
                                            <option value="2">Pan dulce</option>
                                            <option value="3">Menudos</option>
                                            <option value="4">Postres</option>
                                            <option value="">Bebidas</option>
                                        </select>
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

                    <!-- Modal Structure -->
                    <div id="modal-editar" class="modal">
                        <div class="modal-content">
                            <h4 class="center-align">Editar Producto</h4>
                            <div class="row">
                                <div class="input-field col s12 m6">
                                    <i class="material-icons prefix">cake</i>
                                    <input type="text" id="autocomplete-input" class="validate" />
                                    <label for="autocomplete-input">Nombre</label>
                                </div>
                                <div class="input-field col s12 m6">
                                    <i class="material-icons prefix">attach_money</i>
                                    <input type="text" id="autocomplete-input" class="validate" />
                                    <label for="autocomplete-input">Precio</label>
                                </div>
                                <div class="input-field col s12 m6">
                                    <i class="material-icons prefix">assignment</i>
                                    <input type="text" id="autocomplete-input" class="validate" />
                                    <label for="autocomplete-input">Descripcion</label>
                                </div>
                                <div class="input-field col s12 m6">
                                    <i class="material-icons prefix">book</i>
                                    <select id="create_categoria" name="create_categoria">
                                    </select>
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
                        </div>
                    </div>

                    <!-- Modal Structure -->
                    <div id="modal-eliminar" class="modal">
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
                    </div>

                    <!-- Modal Structure -->
                    <div id="modal-exito" class="modal">
                        <div class="modal-content center-align">
                            <i class="large material-icons green-text">check_circle_outline</i>
                            <h4>Exito</h4>
                            <p>Accion exitosa</p>
                        </div>
                        <div class="modal-footer">
                            <a href="#!" class="modal-close waves-effect waves-green btn">Aceptar</a>
                        </div>
                    </div>
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
    <script type="text/javascript" src="../../resources/js/materialize.js"></script>
    <script type="text/javascript" src="../../resources/js/sweetalert.min.js"></script>
    <script type="text/javascript" src="../../resources/js/dashboard.js"></script>
    <script type="text/javascript" src="../../core/helpers/functions.js"></script>
    <!-- <script type="text/javascript" src="../../core/controllers/dashboard/'.$controller.'"></script>-->
</body>

<?php>
//Dashboard::footerTemplate('productos.js');
?>