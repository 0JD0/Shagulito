<?php
require_once('../../core/helpers/dashboard.php');
Dashboard::headerTemplate('Perfil');
?>

<div class="row">
    <div class="col s12 m6">
        <h5 class="header center-align">Actualizar perfil</h5>
        <div class="card horizontal">
            <div class="card-image">
                <img src="../../resources/img/perfil.png">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <p>Necesitamos conocerte mejor actualiza tu perfil a menudo y mantén tus datos al dia, y todos
                        sabremos reconocerte bien.</p>
                </div>
                <div class="card-action">
                    <a href="#" onclick="modalProfile()">Actualizar</a>
                </div>
            </div>
        </div>
    </div>

    <div class="col s12 m6">
        <h5 class="header center-align">Cambiar contraseña</h5>
        <div class="card horizontal">
            <div class="card-image">
                <img src="../../resources/img/cadado.jpg">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                    <p>Tu contraseña podria ya no ser segura cambiala por una nueva para asi evitar robos de identidad y
                        malos entendidos.</p>
                </div>
                <div class="card-action">
                    <a class="modal-trigger" href="#modal-password">Cambiar</a>
                </div>
            </div>
        </div>
    </div>
</div>


<div id="modal-profile" class="modal">
    <div class="modal-content">
        <h4 class="center-align">Editar perfil</h4>
        <form method="post" id="form-profile" autocomplete = "off">
        <input type="hidden" id="id_empleado" name="id_empleado"/>
        <input type="hidden" id="imagen_usuario" name="imagen_usuario"/>
            <div class="row">
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">person</i>
                    <input id="profile_nombres" type="text" name="profile_nombres" class="validate" required />
                    <label for="profile_nombres">Nombres</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">person</i>
                    <input id="profile_apellidos" type="text" name="profile_apellidos" class="validate" required />
                    <label for="profile_apellidos">Apellidos</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">email</i>
                    <input id="profile_correo" type="email" name="profile_correo" class="validate" required />
                    <label for="profile_correo">Correo</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">person_pin</i>
                    <input id="profile_alias" type="text" name="profile_alias" class="validate" required />
                    <label for="profile_alias">Alias</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">person_pin</i>
                    <input id="profile_telefono" type="number" name="profile_telefono" class="validate" required />
                    <label for="profile_telefono">Telefono</label>
                </div>
                <div class="file-field input-field col s12 m6">
                    <div class="btn waves-effect">
                        <span><i class="material-icons">image</i></span>
                        <input id="profile_archivo" type="file" name="profile_archivo"/>
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Seleccione una imagen"/>
                    </div>
                </div>
            </div>
            <div class="row center-align">
                <a href="#" class="btn waves-effect grey tooltipped modal-close" data-tooltip="Cancelar"><i
                        class="material-icons">cancel</i></a>
                <button type="submit" class="btn waves-effect blue tooltipped" data-tooltip="Guardar"><i
                        class="material-icons">save</i></button>
            </div>
        </form>
    </div>
</div>

<div id="modal-password" class="modal">
    <div class="modal-content">
        <h4 class="center-align">Cambiar contraseña</h4>
        <form method="post" id="form-password" autocomplete = "off">
            <div class="row center-align">
                <label>CLAVE ACTUAL</label>
            </div>
            <div class="row">
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">security</i>
                    <input id="clave_actual_1" type="password" name="clave_actual_1" class="validate" required />
                    <label for="clave_actual_1">Clave</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">security</i>
                    <input id="clave_actual_2" type="password" name="clave_actual_2" class="validate" required />
                    <label for="clave_actual_2">Confirmar clave</label>
                </div>
            </div>
            <div class="row center-align">
                <label>CLAVE NUEVA</label>
            </div>
            <div class="row">
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">security</i>
                    <input id="clave_nueva_1" type="password" name="clave_nueva_1" class="validate" required />
                    <label for="clave_nueva_1">Clave</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">security</i>
                    <input id="clave_nueva_2" type="password" name="clave_nueva_2" class="validate" required />
                    <label for="clave_nueva_2">Confirmar clave</label>
                </div>
            </div>
            <div class="row center-align">
                <a href="#" class="btn waves-effect grey tooltipped modal-close" data-tooltip="Cancelar"><i
                        class="material-icons">cancel</i></a>
                <button type="submit" class="btn waves-effect blue tooltipped" data-tooltip="Cambiar"><i
                        class="material-icons">save</i></button>
            </div>
        </form>
    </div>
</div>

<?php
Dashboard::footerTemplate('account.js');
?>