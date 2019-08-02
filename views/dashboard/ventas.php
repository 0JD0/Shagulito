<?php
require_once '../../core/helpers/dashboard.php';
Dashboard::headerTemplate('Ventas');
?>

<div class="row">
    <!-- Formulario de búsqueda -->
    <form method="post" id="form-search">
        <div class="input-field col s8 m6">
            <i class="material-icons prefix">search</i>
            <input id="search" type="text" name="search" />
            <label for="search">Buscador</label>
        </div>
        <div class="input-field col s2 m3">
            <button type="submit" class="btn-floating waves-effect waves-light green tooltipped" data-tooltip="Buscar">
                <i class="material-icons">check</i>
            </button>
        </div>
    </form>
    <!-- Botón para abrir ventana de nuevo registro -->
    <div class="input-field center-align col s2 m3">
        <a href="#" onclick='modalCreate()' class="btn-floating waves-effect waves-light indigo tooltipped"
            data-tooltip="Agregar">
            <i class="material-icons">add</i>
        </a>
    </div>
</div>

<table class="highlight centered responsive-table">
    <thead>
        <tr>
            <th>EMPLEADO</th>
            <th>MONTO VENTA($)</th>
            <th>FECHA VENTA</th>
        </tr>
    </thead>
    <tbody id="tbody-read"></tbody>
</table>

<!-- modal para agregar -->
<div id="modal-create" class="modal">
    <div class="modal-content">
        <h4 class="center-align">Realizar una venta</h4>
        <form method="post" id="form-create" enctype="multipart/form-data">
            <div class="row">
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">book</i>
                    <select id="create_empleado" name="create_empleado"></select>
                    <label>Empleado</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">attach_money</i>
                    <input type="number" id="create_precio" name="create_precio" max="999.99" min=".01" step="any"
                        class="validate" required />
                    <label for="create_precio">Monto Venta$</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">assignment</i>
                    <input type="date" id="create_fecha" name="create_fecha" class="validate" />
                    <label for="create_fecha">Fecha Venta</label>
                </div>
            </div>
            <div class="row center-align">
                <a href="#" class="modal-close btn waves-effect waves-light red tooltipped " data-tooltip="Cancelar">
                    <i class="material-icons">cancel</i>
                </a>
                <button href="#modal-exito" type="submit" class="btn waves-effect waves-light green tooltipped"
                    data-tooltip="Crear">
                    <i class="material-icons">save</i>
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Modal para editar -->
<div id="modal-update" class="modal">
    <div class="modal-content">
        <h4 class="center-align">Editar Producto</h4>
        <form method="post" id="form-update" enctype="multipart/form-data">
            <input type="hidden" id="id_venta" name="id_venta" />
            <div class="row">
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">book</i>
                    <select id="update_empleado" name="update_empleado"></select>
                    <label>Empleado</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">attach_money</i>
                    <input type="number" id="update_precio" name="update_precio" max="999.99" min=".01" step="any"
                        class="validate" required />
                    <label for="update_precio">Monto $</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">assignment</i>
                    <input type="date" id="update_fecha" name="update_fecha" />
                    <label for="update_fecha">Fecha Venta</label>
                </div>
            </div>
            <div class="row center-align">
                <a href="#" class="modal-close btn waves-effect red tooltipped " data-tooltip="Cancelar">
                    <i class="material-icons">cancel</i>
                </a>
                <button type="submit" class="btn waves-effect green tooltipped" data-tooltip="Modificar">
                    <i class="material-icons">save</i>
                </button>
            </div>
        </form>
    </div>
</div>

<?php
Dashboard::footerTemplate('venta.js');
?>