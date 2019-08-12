<?php
require_once('../../core/helpers/dashboard.php');
Dashboard::headerTemplate('Bienvenido');
?>
<div class="container">
    <div class="row">
        <h4 class="center-align blue-text" id="greeting"></h4>
    </div>
</div>

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

    <div class="col s12">
        <div class="card-action center-align">
            <a href="report.php">Mostrar mas gráficos</a>
        </div>
    </div>

    <!--<div class="col s12 card">
        <form method="post" id="form-vm">
            <div class="input-field col s12 m5">
                <input id="vminicio" type="number" name="vminicio" />
                <label for="vminicio">Monto minimo</label>
            </div>
            <div class="input-field col s10 m5">
                <input id="vmfinal" type="number" name="vmfinal" />
                <label for="vmfinal">Monto maximo</label>
            </div>
            <div class="input-field col s2">
                <button type="submit" class="btn-floating waves-effect green tooltipped" data-tooltip="Mostrar"><i
                        class="material-icons">check</i></button>
            </div>
        </form>
        <canvas id="vmchart"></canvas>
    </div>-->
</div>



<?php
Dashboard::footerTemplate('main.js');
?>