<?php
require_once('../../core/helpers/dashboard.php');
Dashboard::headerTemplate('Iniciar Sesión');
?>
<div class="container">
    <!-- utilice autocomplete para buscar -->
    <div class="row">
        <div class="col s12">
            <h3 class="center-align grey-text">Categorias</h3>
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
            <div class="input-field center-align col s2 m2">
                <!-- Modal Trigger -->
                <a href="#modal-agregar" class="btn waves-effect btn-floating green tooltipped modal-trigger"
                    data-tooltip="Agregar">
                    <i class="material-icons">add</i>
                </a>
            </div>
            <div class="col s12">
                <div class="card white darken-1">
                    <div class="card-content black-text">
                        <!--tabla-->
                        <table class="centered striped responsive-table">
                            <div class="row">
                            </div>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Pan Frances</td>
                                    <td class="material-icons tooltipped modal-trigger blue-text" data-position="bottom"
                                        data-tooltip="Modificar" href="#modal8">create
                                    </td>
                                    <td class="material-icons tooltipped red-text" data-position="bottom"
                                        data-tooltip="Eliminar">delete</td>
                                </tr>
                                <tr>
                                    <td>Pan Dulce</td>
                                    <td class="material-icons tooltipped blue-text" data-position="bottom"
                                        data-tooltip="Modificar">create</td>
                                    <td class="material-icons tooltipped red-text" data-position="bottom"
                                        data-tooltip="Eliminar">delete</td>
                                </tr>
                                <tr>
                                    <td>Menudos</td>
                                    <td class="material-icons tooltipped blue-text" data-position="bottom"
                                        data-tooltip="Modificar">create</td>
                                    <td class="material-icons tooltipped red-text" data-position="bottom"
                                        data-tooltip="Eliminar">delete</td>
                                </tr>
                                <tr>
                                    <td>Postres</td>
                                    <td class="material-icons tooltipped blue-text" data-position="bottom"
                                        data-tooltip="Modificar">create</td>
                                    <td class="material-icons tooltipped red-text" data-position="bottom"
                                        data-tooltip="Eliminar">delete</td>
                                </tr>
                                <tr>
                                    <td>Bebidas</td>
                                    <td class="material-icons tooltipped blue-text" data-position="bottom"
                                        data-tooltip="Modificar">create</td>
                                    <td class="material-icons tooltipped red-text" data-position="bottom"
                                        data-tooltip="Eliminar">delete</td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- Modal de Agregar Producto -->
                        <div id="modal4" class="modal">
                            <div class="modal-content">
                                <h4>Agregar Producto</h4>
                                <div class="row">
                                    <form class="col s12">
                                        <div class="row">
                                            <div class="input-field col s6">
                                                <i class="material-icons prefix">a</i>
                                                <textarea id="icon_prefix2" class="materialize-textarea"></textarea>
                                                <label for="icon_prefix2">Nombre de la categoria</label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agregar</a>
                            </div>
                            <div class="modal-footer">
                                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cerrar</a>
                            </div>
                        </div>

                        <!--Modal modificar-->
                        <div id="modal8" class="modal">
                            <div class="modal-content">
                                <h4>Modificar Producto</h4>
                                <div class="row">
                                    <form class="col s12">
                                        <div class="row">
                                            <div class="input-field col s6">
                                                <i class="material-icons prefix">a</i>
                                                <textarea id="icon_prefix2" class="materialize-textarea"></textarea>
                                                <label for="icon_prefix2">Nombre de la categoria</label>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                            </div>
                            <div class="modal-footer">
                                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agregar</a>
                            </div>
                            <div class="modal-footer">
                                <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cerrar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
Dashboard::footerTempleate('index.js');
?>