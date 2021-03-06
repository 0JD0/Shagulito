<?php
require_once('../../core/helpers/dashboard.php');
Dashboard::headerTemplate('Registrar primer usuario');
?>
<!-- modal para registra usuarios-->
<form method="post" id="form-register"  enctype="multipart/form-data" autocomplete="off">
    <div class="row">
        <div class="input-field col s12 m6">
            <i class="material-icons blue-text prefix">person</i>
            <input id="nombres" type="text" name="nombres" class="validate" required />
            <label for="nombres">Nombres</label>
        </div>
        <div class="input-field col s12 m6">
            <i class="material-icons blue-text prefix">person</i>
            <input id="apellidos" type="text" name="apellidos" class="validate" required />
            <label for="apellidos">Apellidos</label>
        </div>
        <div class="input-field col s12 m6">
            <i class="material-icons blue-text prefix">person</i>
            <input id="telefono" type="tel" name="telefono" class="validate" required />
            <label for="telefono">Telefono</label>
        </div>
        <div class="input-field col s12 m6">
            <i class="material-icons blue-text prefix">email</i>
            <input id="correo" type="email" name="correo" class="validate" required />
            <label for="correo">Correo</label>
        </div>
        <div class="input-field col s12 m6">
            <i class="material-icons blue-text prefix">person_pin</i>
            <input id="alias" type="text" name="alias" class="validate" required />
            <label for="alias">Alias</label>
        </div>
        <div class="input-field col s12 m6">
            <i class="material-icons blue-text prefix">security</i>
            <input id="clave1" type="password" name="clave1" class="validate" required />
            <label for="clave1">Clave</label>
        </div>
        <div class="input-field col s12 m6">
            <i class="material-icons blue-text prefix">security</i>
            <input id="clave2" type="password" name="clave2" class="validate" required />
            <label for="clave2">Confirmar clave</label>
        </div>
        <div class="file-field input-field col s12 m6">
            <div class="btn waves-effect">
                <span><i class="material-icons white-text">image</i></span>
                <input id="archivo" type="file" name="archivo" required/>
            </div>
            <div class="file-path-wrapper">
                <input type="text" class="file-path validate" placeholder="Seleccione una imagen"/>
            </div>
        </div>

    </div>
    <div class="row center-align">
        <button type="submit" class="btn waves-effect blue tooltipped" data-tooltip="Registrar"><i
                class="material-icons white-text">send</i></button>
    </div>
</form>
<?php
Dashboard::footerTemplate('register.js');
?>