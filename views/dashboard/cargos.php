<?php
require_once('../../core/helpers/dashboard.php');
Dashboard::headerTemplate('Administrar Cargos');
?>

<div class="row">
    <!-- Formulario de búsqueda -->
    <form method="post" id="form-search">
        <div class="input-field col s8 m6">
            <i class="material-icons blue-text prefix">search</i>
            <input id="search" type="text" name="search" />
            <label for="search">Buscador</label>
        </div>
        <div class="input-field col s2 m3">
            <button type="submit" class="btn-floating waves-effect green tooltipped" data-tooltip="Buscar"><i
                    class="material-icons">check</i></button>
        </div>
    </form>
    <!-- Botón para abrir ventana de nuevo registro -->
    <div class="input-field center-align col s2 m3">
        <a href="#modal-create" class="btn-floating waves-effect indigo tooltipped modal-trigger"
            data-tooltip="Agregar"><i class="material-icons">add</i></a>
    </div>
</div>

<!-- Tabla para mostrar los registros existentes -->
<table class="highlight">
    <thead>
        <tr>
            <th>NOMBRE</th>
            <th>PRODUCCIÓN</th>
            <th>USUARIOS</th>
            <th>TRANSACCIONES</th>
            <th>REPORTES</th>
            <th>GRÁFICOS</th>
            <th>ACCIÓN</th>
        </tr>
    </thead>
    <tbody id="tbody-read">
    </tbody>
</table>

<!-- Ventana para crear un nuevo registro -->
<div id="modal-create" class="modal">
    <div class="modal-content">
        <h4 class="center-align">Agregar cargo</h4>
        <form method="post" id="form-create" autocomplete="off">
            <div class="row">
                <div class="input-field col s12 m12">
                    <i class="material-icons blue-text prefix">person</i>
                    <input id="create_nombre" type="text" name="create_nombre" class="validate" required />
                    <label for="create_nombre">Nombre</label>
                </div>
                <p>
                    <div class="switch col s12 m6">
                        <label>
                            <input id="create_produccion" type="checkbox" name="create_produccion" />
                            <span class="lever"></span>
                        </label>
                        <span>Producción</span>
                    </div>
                </p>
                <p>
                    <div class="switch col s12 m6">
                        <label>
                            <input id="create_usuarios" type="checkbox" name="create_usuarios" />
                            <span class="lever"></span>
                        </label>
                        <span>Usuarios<br></span>
                    </div>
                </p>
                <p>
                    <div class="switch col s12 m6">
                        <label>
                            <input id="create_transacciones" type="checkbox" name="create_transacciones" />
                            <span class="lever"></span>
                        </label>
                        <span>Transacciones</span>
                    </div>
                </p>
                <p>
                    <div class="switch col s12 m6">
                        <label>
                            <input id="create_reportes" type="checkbox" name="create_reportes" />
                            <span class="lever"></span>
                        </label>
                        <span>Reportes<br></span>
                    </div>
                </p>
                <p>
                    <div class="switch col s12 m6">
                        <label>
                            <input id="create_graficos" type="checkbox" name="create_graficos" />
                            <span class="lever"></span>
                        </label>
                        <span>Gráficos</span>
                    </div>
                </p>
            </div>
            <div class="row center-align">
                <a href="#" class="btn waves-effect red tooltipped modal-close" data-tooltip="Cancelar"><i
                        class="material-icons white-text">close</i></a>
                <button type="submit" class="btn waves-effect blue tooltipped" data-tooltip="Crear"><i
                        class="material-icons white-text">save</i></button>
            </div>
        </form>
    </div>
</div>
<!-- Ventana para modificar un registro existente -->
<div id="modal-update" class="modal">
    <div class="modal-content">
        <h4 class="center-align">Modificar cargo</h4>
        <form method="post" id="form-update" autocomplete="off">
            <input type="hidden" id="id_cargo" name="id_cargo" />
            <div class="row">
                <div class="input-field col s12 m12">
                    <i class="material-icons blue-text prefix">person</i>
                    <input id="update_nombre" type="text" name="update_nombre" class="validate" required />
                    <label for="update_nombre">Nombre</label>
                </div>
                <p>
                    <div class="switch col s12 m6">
                        <label>
                            <input id="update_produccion" type="checkbox" name="update_produccion" />
                            <span class="lever"></span>
                        </label>
                        <span>Producción</span>
                    </div>
                </p>
                <p>
                    <div class="switch col s12 m6">
                        <label>
                            <input id="update_usuarios" type="checkbox" name="update_usuarios" />
                            <span class="lever"></span>
                        </label>
                        <span>Usuarios<br></span>
                    </div>
                </p>
                <p>
                    <div class="switch col s12 m6">
                        <label>
                            <input id="update_transacciones" type="checkbox" name="update_transacciones" />
                            <span class="lever"></span>
                        </label>
                        <span>Transacciones</span>
                    </div>
                </p>
                <p>
                    <div class="switch col s12 m6">
                        <label>
                            <input id="update_reportes" type="checkbox" name="update_reportes" />
                            <span class="lever"></span>
                        </label>
                        <span>Reportes<br></span>
                    </div>
                </p>
                <p>
                    <div class="switch col s12 m6">
                        <label>
                            <input id="update_graficos" type="checkbox" name="update_graficos" />
                            <span class="lever"></span>
                        </label>
                        <span>Gráficos</span>
                    </div>
                </p>
            </div>
            <div class="row center-align">
                <a href="#" class="btn waves-effect red tooltipped modal-close" data-tooltip="Cancelar"><i
                        class="material-icons white-text">close</i></a>
                <button type="submit" class="btn waves-effect blue tooltipped" data-tooltip="Modificar"><i
                        class="material-icons white-text">save</i></button>
            </div>
        </form>
    </div>
</div>

<?php
Dashboard::footerTemplate('cargos.js');
?>