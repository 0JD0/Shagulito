<?php
require_once('../../core/helpers/dashboard.php');
Dashboard::headerTemplate('');
?>
<div class="container">
    <div class="row card">
    <h3 class="center-align">Iniciar sesión</h3>
    <form method="post" id="form-sesion" autocomplete="off">
            <div class="input-field col s12 m6 offset-m3">
                <i class="material-icons prefix">person_pin</i>
                <input id="alias" type="text" name="alias" class="validate" required/>
                <label for="alias">Usuario</label>
            </div>
            <div class="input-field col s12 m6 offset-m3">
                <i class="material-icons prefix">security</i>
                <input id="clave" type="password" name="clave" class="validate" required/>
                <label for="clave">Contraseña</label>
            </div>
            <div class="col s12 center-align">
                <button type="submit" class="btn red-text waves-effect blue tooltipped" data-tooltip="Ingresar"><i class="material-icons">send</i></button>
            </div>
        </form>
        <div class="center-align col s12">
            <a href="#modal-verificar"><br>¿Olvidaste tu contraseña?</a>
            <span><br>ó<br></span>
            <a href="#modal-verificar">¿Eres un usuario nuevo?</a>
        </div>
    </div>
</div>

    

<!-- modal para verificar correo -->
<div id="modal-verificar" class="modal">
    <div class="modal-content">
        <h4 class="center-align">Verificar correo electronico</h4>
        <form method="post" id="form-verificar" enctype="multipart/form-data">
            <div class="row">
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">email</i>
                    <input id="update_correo" type="email" name="update_correo" class="validate" required/>
                    <label for="update_correo">Correo</label>
                </div>
            </div>
            <div class="row center-align">
                <a href="#" class="modal-close btn waves-effect waves-light red tooltipped " data-tooltip="Cancelar">
                    <i class="material-icons">cancel</i>
                </a>
                <button href="#modal-correo" type="submit"
                    class="btn waves-effect waves-light green tooltipped"
                    data-tooltip="Verificar">
                    <i class="material-icons">rigth-arrow</i>
                </button>
            </div>
        </form>
    </div>
</div>

<?php
Dashboard::footerTemplate('index.js');
?>
    