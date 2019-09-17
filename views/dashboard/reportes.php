<?php
require_once('../../core/helpers/dashboard.php');
Dashboard::headerTemplate('Reportes');
?>


<div class="row">
    <div class="col s12 m4">
        <div class="card horizontal">
            <div class="card-stacked">
                <div class="card-content">
                    <p>Reporte de Cliente</p>
                </div>
                <div class="card-action">
                    <a  target="_blank" href="../../PDF_Shagul/PDF_cliente.php">Mostrar</a>
                </div>
            </div>
        </div>
    </div>

    <div class="col s12 m4">
        <div class="card horizontal">
            <div class="card-stacked">
                <div class="card-content">
                    <p>Reporte Productos</p>
                </div>
                <div class="card-action">
                    <a  target="_blank" href="../../PDF_Shagul/PDF_products.php">Mostrar</a>
                </div>
            </div>
        </div>
    </div>

    <div class="col s12 m4">
        <div class="card horizontal">
            <div class="card-stacked">
                <div class="card-content">
                    <p>Reporte Usuarios</p>
                </div>
                <div class="card-action">
                    <a  target="_blank" href="../../PDF_Shagul/PDF_users.php">Mostrar</a>
                </div>
            </div>
        </div>
    </div>

    <div class="col s12 m4">
        <div class="card horizontal">
            <div class="card-stacked">
                <div class="card-content">
                    <p>Reporte Ventas</p>
                </div>
                <div class="card-action">
                    <a  target="_blank" href="../../PDF_Shagul/PDF_venta.php">Mostrar</a>
                </div>
            </div>
        </div>
    </div>

    <div class="col s12 m4">
        <div class="card horizontal">
            <div class="card-stacked">
                <div class="card-content">
                    <p>Reporte Lotes</p>
                </div>
                <div class="card-action">
                    <a  target="_blank" href="../../PDF_Shagul/PDF_lotes.php">Mostrar</a>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
Dashboard::footerTemplate('main.js');
?>