<?php
require_once('../../core/helpers/dashboard.php');
Dashboard::headerTemplate('Bienvenido');
?>

<div class="container">
    <div class="row">
        <h4 class="center-align blue-text" id="greeting"></h4>
    </div>
</div>

<!--cavas para mostrar donde apareceran los graficos-->
<div class="row">
    <div class="col s12 m6">
        <div class="card">
            <canvas id="chartCPP"></canvas>
        </div>
    </div>
    <div class="col s12 m6">
        <div class="card">
            <canvas id="chartCPV"></canvas>
        </div>
    </div>

    <div class="col s12 m6">
        <div class="card">
            <canvas id="chartPVE"></canvas>
        </div>
    </div>

    <div class="col s12 m6">
        <div class="card">
            <canvas id="chartCPC"></canvas>
        </div>
    </div>

    <div class="col s12">
        <div class="card">
            <canvas id="chartCPI"></canvas>
        </div>
    </div>
</div>

<div class="row">
    <div class="col s12 card">
        <form method="post" id="form-vm">
            <div class="input-field col s12 m5">
                <input id="vminicio" type="number" name="vminicio" />
                <label for="vminicio">Monto mínimo</label>
            </div>
            <div class="input-field col s10 m5">
                <input id="vmfinal" type="number" name="vmfinal" />
                <label for="vmfinal">Monto máximo</label>
            </div>
            <div class="input-field col s2">
                <button type="submit" class="btn-floating waves-effect green tooltipped" data-tooltip="Mostrar">
                    <i class="material-icons">check</i>
                </button>
            </div>
        </form>
        <canvas id="chartVM"></canvas>
    </div>

    <div class="col s12 card">
        <form method="post" id="form-vf">
            <div class="input-field col s12 m5">
                <input id="vfinicio" type="date" name="vfinicio" />
                <label for="vfinicio">Fecha inicial</label>
            </div>
            <div class="input-field col s10 m5">
                <input id="vffinal" type="date" name="vffinal" />
                <label for="vffinal">Fecha final</label>
            </div>
            <div class="input-field col s2">
                <button type="submit" class="btn-floating waves-effect green tooltipped" data-tooltip="Mostrar">
                    <i class="material-icons">check</i>
                </button>
            </div>
        </form>
        <canvas id="chartVF"></canvas>
    </div>

    <div class="col s12 card">
        <form method="post" id="form-ve">
            <div class="input-field col s10 m5">
                <input id="empleadove" type="text" name="empleadove" />
                <label for="empleadove">Empleado</label>
            </div>
            <div class="input-field col s2">
                <button type="submit" class="btn-floating waves-effect green tooltipped" data-tooltip="Mostrar">
                    <i class="material-icons">check</i>
                </button>
            </div>
        </form>
        <canvas id="chartVE"></canvas>
    </div>

    <div class="col s12 card">
        <form method="post" id="form-ce">
            <div class="input-field col s10 m5">
                <input id="empleadoce" type="text" name="empleadoce" />
                <label for="empleadoce">Dominio</label>
            </div>
            <div class="input-field col s2">
                <button type="submit" class="btn-floating waves-effect green tooltipped" data-tooltip="Mostrar">
                    <i class="material-icons">check</i>
                </button>
            </div>
        </form>
        <canvas id="chartCE"></canvas>
    </div>
</div>
<?php
Dashboard::footerTemplate('main.js');
?>