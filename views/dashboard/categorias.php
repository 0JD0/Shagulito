<?php
require_once('../../core/helpers/dashboard.php');
Dashboard::headerTemplate('Administrar categorías');
?>
<div class="row">
    <!-- Formulario de búsqueda -->
    <form method="post" id="form-search">
        <div class="input-field col s6 m4">
            <i class="material-icons prefix">search</i>
            <input id="buscar" type="text" name="busqueda" />
            <label for="buscar">Buscador</label>
        </div>
        <div class="input-field col s6 m4">
            <button type="submit" class="btn waves-effect green tooltipped" data-tooltip="Buscar"><i
                    class="material-icons">check_circle</i></button>
        </div>
    </form>
    <!-- Botón para abrir ventana de nuevo registro -->
    <div class="input-field center-align col s12 m4">
        <a href="#modal-create" class="btn waves-effect indigo tooltipped modal-trigger" data-tooltip="Agregar"><i
                class="material-icons">add_circle</i></a>
    </div>
</div>

<!-- se crea la tabla q mostrara los registros -->
<table class="highlight">
    <thead>
        <tr>
            <th>IMAGEN</th>
            <th>NOMBRE</th>
            <th>CATEGORÍA</th>
            <th>ESTADO</th>
            <th>ACCIÓN</th>
        </tr>
    </thead>
    <tbody id="tbody-read">
    </tbody>
</table>

<!-- modal para agregar -->
<div id="modal-create" class="modal">
    <div class="modal-content">
        <h4 class="center-align">Agregar Producto</h4>
        <form method="post" id="form-create" enctype="multipart/form-data">
            <div class="row">
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">cake</i>
                    <input type="text" id="create_nombre" name="create_nombre" class="validate" required />
                    <label for="create_nombre">Nombre</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">attach_money</i>
                    <input type="number" id="create_precio" name="create_precio" max="999.99" min=".01" step="any"
                        class="validate" required />
                    <label for="create_precio">Precio $</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">assignment</i>
                    <input type="text" id="create_descripcion" name="create_descripcion" class="validate" required />
                    <label for="create_descripcion">Descripción</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">book</i>
                    <select id="create_categoria" name="create_categoria"></select>
                    <label>Categoría</label>
                </div>
                <div class="file-field input-field col s12 m6">
                    <div class="btn waves-effect">
                        <span><i class="material-icons">image</i></span>
                        <input id="create_archivo" type="file" name="create_archivo" required />
                    </div>
                    <div class="file-path-wrapper">
                        <input type="text" class="file-path validate" placeholder="Seleccione una imagen de 500x500" />
                    </div>
                </div>
                <div class="col s12 m6">
                    <p>
                        <div class="switch">
                            <span>Estado:</span>
                            <label>
                                <i class="material-icons">visibility_off</i>
                                <input id="create_estado" type="checkbox" name="create_estado" checked />
                                <span class="lever"></span>
                                <i class="material-icons">visibility</i>
                            </label>
                        </div>
                    </p>
                </div>
            </div>
            <div class="row center-align">
                <a href="#" class="modal-close btn waves-effect red tooltipped " data-tooltip="Cancelar">
                    <i class="material-icons">cancel</i>
                </a>
                <button href="#modal-exito" type="submit"
                    class="modal-close btn waves-effect green tooltipped modal-trigger" data-tooltip="Crear">
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
            <input type="hidden" id="id_producto" name="id_producto" />
            <input type="hidden" id="imagen_producto" name="imagen_producto" />
            <div class="row">
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">cake</i>
                    <input type="text" id="update_nombre" name="update_nombre" class="validate" required />
                    <label for="update_nombre">Nombre</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">attach_money</i>
                    <input type="number" id="update_precio" name="update_precio" max="999.99" min=".01" step="any"
                        class="validate" required />
                    <label for="update_precio">Precio $</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">assignment</i>
                    <input type="text" id="update_descripcion" name="update_descripcion" class="validate" required />
                    <label for="update_descripcion">Descripcion</label>
                </div>
                <div class="input-field col s12 m6">
                    <i class="material-icons prefix">book</i>
                    <select id="update_categoria" name="update_categoria"></select>
                    <label>Categoría</label>
                </div>
                <div class="file-field input-field col s12 m6">
                    <div class="btn waves-effect">
                        <span><i class="material-icons">image</i></span>
                        <input id="update_archivo" type="file" name="update_archivo" required />
                    </div>
                    <div class="file-path-wrapper">
                        <input type="text" class="file-path validate" placeholder="Seleccione una imagen de 500x500" />
                    </div>
                </div>
                <div class="col s12 m6">
                    <p>
                        <div class="switch">
                            <span>Estado:</span>
                            <label>
                                <i class="material-icons">visibility_off</i>
                                <input id="update_estado" type="checkbox" name="update_estado" />
                                <span class="lever"></span>
                                <i class="material-icons">visibility</i>
                            </label>
                        </div>
                    </p>
                </div>
            </div>

            <div class="row center-align">
                <a href="#" class="modal-close btn waves-effect red tooltipped " data-tooltip="Cancelar">
                    <i class="material-icons">cancel</i>
                </a>
                <button href="#modal-exito" type="submit"
                    class="modal-close btn waves-effect green tooltipped modal-trigger" data-tooltip="Modificar">
                    <i class="material-icons">save</i>
                </button>
            </div>
        </form>
    </div>
</div>

<?php
Dashboard::footerTemplate('categorias.js');
?>