<?php
require_once('../../core/helpers/dashboard.php');
Dashboard::headerTemplate('Administrar usuarios');
?>
<div class="row">
    <!-- Formulario de búsqueda -->
    <form method="post" id="form-search">
        <div class="input-field col s6 m4">
            <i class="material-icons prefix">search</i>
            <input id="buscar" type="text" name="busqueda"/>
            <label for="buscar">Buscador</label>
        </div>
        <div class="input-field col s6 m4">
            <button type="submit" class="btn waves-effect green tooltipped" data-tooltip="Buscar"><i class="material-icons">check_circle</i></button>
        </div>
    </form>
    <!-- Botón para abrir ventana de nuevo registro -->
    <div class="input-field center-align col s12 m4">
        <a href="#modal-create" class="btn waves-effect indigo tooltipped modal-trigger" data-tooltip="Agregar"><i class="material-icons">add_circle</i></a>
    </div>
</div>
<!-- Tabla para mostrar los registros existentes -->
<table class="highlight">
    <thead>
        <tr>
            <th>APELLIDOS</th>
            <th>NOMBRES</th>
            <th>TELEFONO</th>
            <th>CORREO</th>
            <th>ALIAS</th>
            <th>FOTO</th>
            <th>ACCIÓN</th>

        </tr>
    </thead>
    <tbody id="tbody-read">
    </tbody>
</table>
<!-- Ventana para crear un nuevo registro -->
<div id="modal-create" class="modal">
    <div class="modal-content">
        <h4 class="center-align">Crear usuario</h4>
        <form method="post" id="form-create" enctype="multipart/form-data">
        <div class="row">
            <div class="input-field col s12 m6">
                <i class="material-icons prefix">person</i>
                <input id="nombres" type="text" name="nombres" class="validate" required/>
                <label for="nombres">Nombres</label>
            </div>
            <div class="input-field col s12 m6">
                <i class="material-icons prefix">person</i>
                <input id="apellidos" type="text" name="apellidos" class="validate" required/>
                <label for="apellidos">Apellidos</label>
            </div>
            <div class="input-field col s12 m6">
                <i class="material-icons prefix">person</i>
                <input id="telefono" type="number" name="telefono" class="validate" required/>
                <label for="telefono">Telefono</label>
            </div>
            <div class="input-field col s12 m6">
                <i class="material-icons prefix">email</i>
                <input id="correo" type="email" name="correo" class="validate" required/>
                <label for="correo">Correo</label>
            </div>
            <div class="input-field col s12 m6">
                <i class="material-icons prefix">person_pin</i>
                <input id="alias" type="text" name="alias" class="validate" required/>
                <label for="alias">Alias</label>
            </div>
            <div class="input-field col s12 m6">
                <i class="material-icons prefix">security</i>
                <input id="clave1" type="password" name="clave1" class="validate" required/>
                <label for="clave1">Clave</label>
            </div>
            <div class="input-field col s12 m6">
                <i class="material-icons prefix">security</i>
                <input id="clave2" type="password" name="clave2" class="validate" required/>
                <label for="clave2">Confirmar clave</label>
            </div>
            <div class="file-field input-field col s12 m6">
                    <div class="btn waves-effect">
                        <span><i class="material-icons">image</i></span>
                        <input id="archivo" type="file" name="archivo" required/>
                    </div>
                    <div class="file-path-wrapper">
                        <input type="text" class="file-path validate" placeholder="Seleccione una imagen"/>
                    </div>
            </div>
        </div>
            <div class="row center-align">
                <a href="#" class="btn waves-effect grey tooltipped modal-close" data-tooltip="Cancelar"><i class="material-icons">cancel</i></a>
                <button type="submit" class="btn waves-effect blue tooltipped" data-tooltip="Crear"><i class="material-icons">save</i></button>
            </div>
        </form>
    </div>
</div>
<!-- Ventana para modificar un registro existente -->
<div id="modal-update" class="modal">
    <div class="modal-content">
        <h4 class="center-align">Modificar usuario</h4>
        <form method="post" id="form-update" enctype="multipart/form-data">
            <input type="hidden" id="id_usuario" name="id_usuario"/>
            <input type="hidden" id="imagen_categoria" name="imagen_categoria"/>
            <div class="row">
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
                    <i class="material-icons prefix">person</i>
                    <input id="telefono" type="number" name="telefono" class="validate" required/>
                    <label for="telefono">Telefono</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">email</i>
                    <input id="update_correo" type="email" name="update_correo" class="validate" required/>
                    <label for="update_correo">Correo</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">person_pin</i>
                    <input id="update_alias" type="text" name="update_alias" class="validate" required/>
                    <label for="update_alias">Alias</label>
                </div>
                <div class="file-field input-field col s12 m6">
                    <div class="btn waves-effect">
                        <span><i class="material-icons">image</i></span>
                        <input id="update_archivo" type="file" name="update_archivo"/>
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Seleccione una imagen"/>
                    </div>
                </div>
            </div>
            <div class="row center-align">
                <a href="#" class="btn waves-effect grey tooltipped modal-close" data-tooltip="Cancelar"><i class="material-icons">cancel</i></a>
                <button type="submit" class="btn waves-effect blue tooltipped" data-tooltip="Modificar"><i class="material-icons">save</i></button>
            </div>
        </form>
    </div>
</div>
<?php
Dashboard::footerTemplate('usuarios.js');
?>
