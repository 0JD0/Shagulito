<?php
require_once('../../core/helpers/dashboard.php');
Dashboard::headerTemplate('Iniciar Sesión');
?>
<h3 class="center">Iniciar Sesión</h3>
<div class="container">
    <div class="row">
        <!--Login en un cuadro centrado-->
        <form method="post" id="form-sesion">
            <div class="input-field col s12 m6 offset-m3">
                <i class="material-icons prefix">person_pin</i>
                <input id="alias" type="text" name="alias" class="validate" required />
                <label for="alias">Usuario</label>
            </div>
            <div class="input-field col s12 m6 offset-m3">
                <i class="material-icons prefix">security</i>
                <input id="clave" type="password" name="clave" class="validate" required />
                <label for="clave">Contraseña</label>
            </div>
            <div class="col s12 center-align">
                <button type="submit" class="waves-effect waves-light btn" data-tooltip="Ingresar"><i
                        class="material-icons">send</i></button>
            </div>
        </form>

    </div>

</div>
<?php
Dashboard::footerTempleate('.js');
?>