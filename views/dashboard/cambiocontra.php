<?php
require_once('../../core/helpers/dashboard.php');
Dashboard::headerTemplate('Cambio de contraseña obligatorio');
?>
<form method="post" id="form-password">
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
        <a href="#" class="btn waves-effect grey tooltipped modal-close" data-tooltip="Cancelar">
            <i class="material-icons">cancel</i>
        </a>
        <button type="submit" class="btn waves-effect blue tooltipped" data-tooltip="Cambiar">
            <i class="material-icons">save</i>
        </button>
    </div>
</form>

<?php
Dashboard::footerTemplate('account.js');
?>