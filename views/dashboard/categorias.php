<?php
require_once('../../core/helpers/dashboard.php');
Dashboard::headerTemplate('Administrar categorías');
?>
<div class="row">
	<!-- Formulario de búsqueda -->
	<form method="post" id="form-search">
		<div class="input-field col s8 m6">
			<i class="material-icons blue-text prefix">search</i>
			<input id="buscar" type="text" name="busqueda" />
			<label for="buscar">Buscador</label>
		</div>
		<div class="input-field col s2 m3">
			<button type="submit" class="btn-floating waves-effect green tooltipped" data-tooltip="Buscar">
				<i class="material-icons">check</i>
			</button>
		</div>
	</form>

	<!-- Botón para abrir ventana de nuevo registro -->
	<div class="input-field center-align col s2 m3">
		<a href="#modal-create" class="btn-floating waves-effect indigo tooltipped modal-trigger" data-tooltip="Agregar">
			<i class="material-icons">add</i>
		</a>
	</div>
</div>

<!-- se crea la tabla q mostrara los registros -->
<table class="highlight centered">
	<thead>
		<tr>
			<th>NOMBRE</th>
			<th>CATEGORÍA</th>
			<th>ACCIÓN</th>
		</tr>
	</thead>
	<tbody id="tbody-read">
	</tbody>
</table>


<!-- modal para agregar -->
<div id="modal-create" class="modal">
    <div class="modal-content">
        <h4 class="center-align">Agregar Categoría</h4>
        <form method="post" id="form-create">
            <div class="row">
                <div class="input-field col s12 m6">
                    <i class="material-icons blue-text prefix">cake</i>
                    <input type="text" id="create_nombre" name="create_nombre" class="validate" required />
                    <label for="create_nombre">Nombre</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons blue-text prefix">assignment</i>
                    <input type="text" id="create_descripcion" name="create_descripcion" class="validate" required />
                    <label for="create_descripcion">Descripción</label>
                </div>
            </div>
            <div class="row center-align">
                <a href="#" class="modal-close btn waves-effect waves-light red tooltipped " data-tooltip="Cancelar">
                    <i class="material-icons white-text">close</i>
                </a>
                <button type="submit"
                        class="btn waves-effect waves-light green tooltipped" data-tooltip="Crear">
                    <i class="material-icons white-text">save</i>
                </button>
            </div>
        </form>
    </div>
</div>

<!-- Modal para editar -->
<div id="modal-update" class="modal">
    <div class="modal-content">
        <h4 class="center-align">Editar Categoría</h4>
        <form method="post" id="form-update">
            <input type="hidden" id="id_categoria" name="id_categoria" />
            <div class="row">
                <div class="input-field col s12 m6">
                    <i class="material-icons blue-text prefix">cake</i>
                    <input type="text" id="update_nombre" name="update_nombre" class="validate" required />
                    <label for="update_nombre">Nombre</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons blue-text prefix">assignment</i>
                    <input type="text" id="update_descripcion" name="update_descripcion" class="validate" required />
                    <label for="update_descripcion">Descripción</label>
                </div>
            </div>

            <div class="row center-align">
                <a href="#" class="modal-close btn waves-effect red tooltipped " data-tooltip="Cancelar">
                    <i class="material-icons white-text">close</i>
                </a>
                <button href="#modal-exito" type="submit"
                    class="btn waves-effect green tooltipped" data-tooltip="Modificar">
                    <i class="material-icons white-text">save</i>
                </button>
            </div>
        </form>
    </div>
</div>

<?php
Dashboard::footerTemplate('categorias.js');
