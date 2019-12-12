<?php
require_once('../../core/helpers/dashboard.php');
Dashboard::headerTemplate('Iniciar sesión');
?>
<div class="container">
    <div class="row">
    <h3 class="center-align">Iniciar sesión</h3>
    <form method="post" id="form-sesion">
            <div class="input-field col s12 m6 offset-m3">
                <i class="material-icons blue-text prefix">person_pin</i>
                <input id="alias" type="text" name="alias" class="validate" required autocomplete="off"/>
                <label for="alias">Usuario</label>
            </div>
            <div class="input-field col s12 m6 offset-m3">
                <i class="material-icons blue-text prefix">security</i>
                <input id="clave" type="password" name="clave" class="validate" required autocomplete="current-password"/>
                <label for="clave">Contraseña</label>
            </div>
            <div class="col s12 center-align">
                <button type="submit" class="btn waves-effect blue tooltipped" data-tooltip="Ingresar"><i class="material-icons white-text">send</i></button>
            </div>
        </form>
        <div class="center-align col s12">
            <a href="#modal-verificar" class="modal-trigger"><br>¿Olvidaste tu contraseña?</a>
            <span><br>ó<br></span>
            <a href="#modal-verificar" class="modal-trigger">¿Eres un usuario nuevo?</a>
        </div>
    </div>
</div>

<!-- modal para verificar correo -->
<div id="modal-verificar" class="modal">
    <div class="modal-content">
        <h4 class="center-align">Verificar correo electrónico</h4>
        <form method="post" id="form-verificar" enctype="multipart/form-data" autocomplete="off">
            <div class="row">
                <div class="input-field col s12">
                    <i class="material-icons blue-text prefix">email</i>
                    <input id="verificar_correo" type="email" name="verificar_correo" class="validate" required/>
                    <label for="verificar_correo">Correo</label>
                </div>
            </div>
            <div class="row center-align">
                <a href="#" class="modal-close btn waves-effect waves-light red tooltipped " data-tooltip="Cancelar">
                    <i class="material-icons white-text">close</i>
                </a>
                <button href="#modal-correo" type="submit"
                    class="btn waves-effect waves-light green tooltipped"
                    data-tooltip="Verificar">
                    <i class="material-icons white-text">arrow_forward</i>
                </button>
            </div>
        </form>
    </div>
</div>

<?php
Dashboard::footerTemplate('index.js');
?>
    