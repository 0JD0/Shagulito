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
                <a href="index.html">
                    <i class="material-icons">home</i>Inicio</a>
            </li>
            <li>
                <a href="#!">
                    <i class="material-icons">description</i>Categorias
                </a>
            </li>
            <li>
                <a href="#!">
                    <i class="material-icons">cake</i>Productos
                </a>
            </li>
            <li>
                <li>
                    <a href="#!">
                        <i class="material-icons">attach_money</i>Ventas
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
                    <h3 class="center-align grey-text">Usuarios</h3>
                    <!-- autocomplete para búscar -->
                    <div class="input-field col s6 m6">
                        <i class="material-icons prefix">search</i>
                        <!-- el search de la izquierda muetrael icono que quires que se vea -->
                        <input type="text" id="autocomplete-input" class="autocomplete" />
                        <label for="autocomplete-input">Buscar</label>
                    </div>
                    <div class="input-field col s2 m2">
                        <button type="submit" class="btn waves-effect btn-floating indigo tooltipped" data-tooltip="Buscar">
                            <i class="material-icons">check</i>
                        </button>
                        <!-- el check circle es lo mismo q el comentario de arriba -->
                    </div>

                    <!-- Botón para abrir ventana de agregar -->
                    <div class="input-field right col s2 m2">
                        <!-- Modal Trigger -->
                        <a href="#modal-agregar" class="btn waves-effect btn-floating green tooltipped modal-trigger" data-tooltip="Agregar">
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
                                            <th>Nombre</th>
                                            <th>Dui</th>
                                            <th>fecha de nacimiento</th>
                                            <th>tipo de usuario</th>
                                            <th>telefono</th>
                                            <th>direccion</th>
                                            <th>accion</th>


                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>Datos</td>
                                            <td>Random</td>
                                            <td>No</td>
                                            <td>Hay</td>
                                            <td>Hay</td>
                                            <td>Base</td>
                                            <td>
                                                <a href="#modal-editar" class="waves-effect waves-blue tooltipped modal-trigger" data-tooltip="Editar">
                                                    <i class="material-icons blue-text">edit</i>
                                                </a>
                                                <a href="#modal-eliminar" class="waves-effect waves-orange tooltipped modal-trigger" data-tooltip="Eliminar">
                                                    <i class="material-icons red-text">delete</i>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Alan</td>
                                            <td>Jellybean</td>
                                            <td>$3.76</td>
                                            <td>Alan</td>
                                            <td>4658</td>
                                            <td>Hay</td>

                                            <td>
                                                <a href="#modal-editar" class="waves-effect waves-blue tooltipped modal-trigger" data-tooltip="Editar">
                                                    <i class="material-icons blue-text">edit</i>
                                                </a>
                                                <a href="#modal-eliminar" class="waves-effect waves-orange tooltipped modal-trigger" data-tooltip="Eliminar">
                                                    <i class="material-icons red-text">delete</i>
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Jonathan</td>
                                            <td>Lollipop</td>
                                            <td>$7.00</td>
                                            <td>Jonathan</td>
                                            <td>4658</td>
                                            <td>Hay</td>

                                            <td>
                                                <a href="#modal-editar" class="waves-effect waves-blue tooltipped modal-trigger" data-tooltip="Editar">
                                                    <i class="material-icons blue-text">edit</i>
                                                </a>
                                                <a href="#modal-eliminar" class="waves-effect waves-orange tooltipped modal-trigger" data-tooltip="Eliminar">
                                                    <i class="material-icons red-text">delete</i>
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <!-- modal para agregar -->

                                <!-- Modal Structure -->
                                <div id="modal-agregar" class="modal">
                                    <div class="modal-content">
                                        <h4 class="center-align">Agregar Usuario</h4>
                                        <div class="row">
                                          <form action="" class="cols12">
                                        <div class="input-field col s12 m6">
                                            <i class="material-icons prefix">person</i>
                                            <input id="update_nombres" type="text" name="update_nombres" class="validate" required/>
                                            <label for="update_nombres">Nombres</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <i class="material-icons prefix">person</i>
                                            <input id="update_apellidos" type="text" name="update_apellidos" class="validate" required/>
                                            <label for="update_apellidos">Apellidos</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <i class="material-icons prefix">phone</i>
                                            <input id="update_correo" type="email" name="update_correo" class="validate" required/>
                                            <label for="update_correo">telefono</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <i class="material-icons prefix">insert_invitation</i>
                                            <input id="update_alias" type="text" name="update_alias" class="validate" required/>
                                            <label for="update_alias">fecha de nacimiento</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <i class="material-icons prefix">mode_edit</i>
                                            <input id="update_alias" type="text" name="update_alias" class="validate" required/>
                                            <label for="update_alias">Dui</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <i class="material-icons prefix">assignment_ind</i>
                                            <input id="update_alias" type="text" name="update_alias" class="validate" required/>
                                            <label for="update_alias">Usuario</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                            <i class="material-icons prefix">lock</i>
                                            <input id="update_alias" type="text" name="update_alias" class="validate" required/>
                                            <label for="update_alias">contraseña</label>
                                        </div>
                                        <div class="input-field col s12 m6">
                                                <select class="icons">
                                                  <option value="" disabled selected>Seleccione una opcion</option>
                                                  <option value="1">Administrador</option>
                                                  <option value="2">Operario</option>
                                                  
                                                </select>
                                                <label>Images in select</label>
                                        </div>
                                    </div>
                                    <div class="row center-align">
                                        <a href="#" class="modal-close btn waves-effect red tooltipped " data-tooltip="Cancelar">
                                            <i class="material-icons">cancel</i>
                                        </a>
                                        <button href="#modal-exito" type="submit" class="modal-close btn waves-effect green tooltipped modal-trigger" data-tooltip="Guardar">
                                            <i class="material-icons">save</i>
                                        </button>
                                    </div>
                                </div>

                                <!-- Modal Structure -->
                                <div id="modal-editar" class="modal">
                                    <div class="modal-content">
                                        <h4 class="center-align">Modificar Usuarios</h4>
                                        <div class="row">
                                            <form action="" class="cols12">
                                                <div class="input-field col s12 m6">
                                                    <i class="material-icons prefix">person</i>
                                                    <input id="update_nombres" type="text" name="update_nombres" class="validate" required/>
                                                    <label for="update_nombres">Nombres</label>
                                                </div>
                                                <div class="input-field col s12 m6">
                                                    <i class="material-icons prefix">person</i>
                                                    <input id="update_apellidos" type="text" name="update_apellidos" class="validate" required/>
                                                    <label for="update_apellidos">Apellidos</label>
                                                </div>
                                                <div class="input-field col s12 m6">
                                                    <i class="material-icons prefix">phone</i>
                                                    <input id="update_correo" type="email" name="update_correo" class="validate" required/>
                                                    <label for="update_correo">telefono</label>
                                                </div>
                                                <div class="input-field col s12 m6">
                                                    <i class="material-icons prefix">insert_invitation</i>
                                                    <input id="update_alias" type="text" name="update_alias" class="validate" required/>
                                                    <label for="update_alias">fecha de nacimiento</label>
                                                </div>
                                                <div class="input-field col s12 m6">
                                                    <i class="material-icons prefix">mode_edit</i>
                                                    <input id="update_alias" type="text" name="update_alias" class="validate" required/>
                                                    <label for="update_alias">Dui</label>
                                                </div>
                                                <div class="input-field col s12 m6">
                                                    <i class="material-icons prefix">assignment_ind</i>
                                                    <input id="update_alias" type="text" name="update_alias" class="validate" required/>
                                                    <label for="update_alias">Usuario</label>
                                                </div>
                                                <div class="input-field col s12 m6">
                                                    <i class="material-icons prefix">lock</i>
                                                    <input id="update_alias" type="text" name="update_alias" class="validate" required/>
                                                    <label for="update_alias">contraseña</label>
                                                </div>
                                                <div class="row center-align">
                                                    <a href="#" class="modal-close btn waves-effect red tooltipped " data-tooltip="Cancelar">
                                                        <i class="material-icons">cancel</i>
                                                    </a>
                                                    <button href="#modal-exito" type="submit" class="modal-close btn waves-effect green tooltipped modal-trigger" data-tooltip="Guardar">
                                                        <i class="material-icons">save</i>
                                                    </button>
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


                            <!-- Modal Structure -->
                            <div id="modal-eliminar" class="modal">
                                <div class="modal-content center-align">
                                    <i class="large material-icons orange-text">info_outline</i>
                                    <h4>Advertencia</h4>
                                    <p>¿Desea eliminar el producto?</p>
                                </div>
                                <div class="modal-footer">
                                    <a href="#!" class="modal-close waves-effect waves-red red btn">Cancelar</a>
                                    <a href="#modal-exito" class="modal-close waves-effect waves-green btn modal-trigger">Eliminar</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- llaman librerias -->
    <script type="text/javascript" src="../../resources/js/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="../../resources/js/modal.js"></script>
    <script type="text/javascript" src="../../resources/js/materialize.js"></script>
    <script type="text/javascript" src="../../resources/js/productos.js"></script>
    <script type="text/javascript" src="../../resources/js/ini_imput.js"></script>
</body>

</html>