<?php
require_once('../../core/helpers/dashboard.php');
Dashboard::headerTemplate('Administrar clientes');
?>
<div class="row">
    <!-- Formulario de búsqueda -->
    <form method="post" id="form-search">
        <div class="input-field col s8 m6">
            <i class="material-icons prefix">search</i>
            <input id="buscar" type="text" name="busqueda" />
            <label for="buscar">Buscador</label>
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
<table class="highlight centered responsive-table">
    <thead>
        <tr>
            <th>APELLIDOS</th>
            <th>NOMBRES</th>
            <th>TELÉFONO</th>
            <th>CORREO</th>
        </tr>
    </thead>
    <tbody id="tbody-read">
    </tbody>
</table>
<!-- Ventana para crear un nuevo registro -->
<div id="modal-create" class="modal">
    <div class="modal-content">
        <h4 class="center-align">Crear Cliente</h4>
        <form method="post" id="form-create" enctype="multipart/form-data">
            <div class="row">
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">person</i>
                    <input id="create_nombres" type="text" name="create_nombres" class="validate" required />
                    <label for="create_nombres">Nombres</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">person</i>
                    <input id="create_apellidos" type="text" name="create_apellidos" class="validate" required />
                    <label for="create_apellidos">Apellidos</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">person</i>
                    <input id="create_telefono" type="number" name="create_telefono" class="validate" required />
                    <label for="create_telefono">Telefono</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">email</i>
                    <input id="create_correo" type="email" name="create_correo" class="validate" required />
                    <label for="create_correo">Correo</label>
                </div>
            </div>
            <div class="row center-align">
                <a href="#" class="btn waves-effect grey tooltipped modal-close" data-tooltip="Cancelar"><i
                        class="material-icons">cancel</i></a>
                <button type="submit" class="btn waves-effect blue tooltipped" data-tooltip="Crear"><i
                        class="material-icons">save</i></button>
            </div>
        </form>
    </div>
</div>
<!-- Ventana para modificar un registro existente -->
<div id="modal-update" class="modal">
    <div class="modal-content">
        <h4 class="center-align">Modificar cliente</h4>
        <form method="post" id="form-update" enctype="multipart/form-data">
            <input type="hidden" id="id_cliente" name="id_cliente" />
            <div class="row">
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">person</i>
                    <input id="update_nombres" type="text" name="update_nombres" class="validate" required />
                    <label for="update_nombres">Nombres</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">person</i>
                    <input id="update_apellidos" type="text" name="update_apellidos" class="validate" required />
                    <label for="update_apellidos">Apellidos</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">person</i>
                    <input id="update_telefono" type="number" name="update_telefono" class="validate" required />
                    <label for="update_telefono">Telefono</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">email</i>
                    <input id="update_correo" type="email" name="update_correo" class="validate" required />
                    <label for="update_correo">Correo</label>
                </div>
                <div>
                    <div class="row center-align">
                        <a href="#" class="btn waves-effect grey tooltipped modal-close" data-tooltip="Cancelar"><i
                                class="material-icons">cancel</i></a>
                        <button type="submit" class="btn waves-effect blue tooltipped" data-tooltip="Modificar"><i
                                class="material-icons">save</i></button>
                    </div>
                </div>
        </form>
    </div>
</div>
<?php
Dashboard::footerTemplate('clientes.js');
?>