$(document).ready(function()
{
    showTable();
})

// Constante para establecer la ruta y parámetros de comunicación con la API
const apiCargos = '../../core/api/dashboard/cargos.php?action=';

// Función para llenar tabla con los datos de los registros
function fillTable(rows)
{
    let content = '';
    // Se recorren las filas para armar el cuerpo de la tabla y se utiliza comilla invertida para escapar los caracteres especiales
    rows.forEach(function(row){
        content += `
            <tr>
                <td>${row.nombre_cargo}</td>
                <td><i class="material-icons indigo-text">${(row.produccion == 1) ? 'check' : 'clear'}</i></td>
                <td><i class="material-icons indigo-text">${(row.usuarios == 1) ? 'check' : 'clear'}</i></td>
                <td><i class="material-icons indigo-text">${(row.transacciones == 1) ? 'check' : 'clear'}</i></td>
                <td><i class="material-icons indigo-text">${(row.reportes == 1) ? 'check' : 'clear'}</i></td>
                <td><i class="material-icons indigo-text">${(row.graficos == 1) ? 'check' : 'clear'}</i></td>
                <td>
                    <a href="#" onclick="modalUpdate(${row.id_cargo})" class="waves-effect waves-blue tooltipped" data-tooltip="Modificar"><i class="material-icons blue-text">edit</i></a>
                    <a href="#" onclick="confirmDelete(${row.id_cargo})" class="waves-effect waves-orange tooltipped" data-tooltip="Eliminar"><i class="material-icons red-text">delete</i></a>
                </td>
            </tr>
        `;
    });
    $('#tbody-read').html(content);
    $('.tooltipped').tooltip();
}

// Función para obtener y mostrar los registros disponibles
function showTable()
{
    $.ajax({
        url: apiCargos + 'read',
        type: 'post',
        data: null,
        datatype: 'json'
    })
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
            if (!result.status) {
                sweetAlert(4, result.exception, null);
            }
            fillTable(result.dataset);
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        // Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
}

// Función para mostrar los resultados de una búsqueda
$('#form-search').submit(function()
{
    event.preventDefault();
    $.ajax({
        url: apiCargos + 'search',
        type: 'post',
        data: $('#form-search').serialize(),
        datatype: 'json'
    })
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
            if (result.status) {
                fillTable(result.dataset);
                sweetAlert(1, result.message, null);
            } else {
                sweetAlert(3, result.exception, null);
            }
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        // Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
})

// Función para crear un nuevo registro
$('#form-create').submit(function()
{
    event.preventDefault();
    $.ajax({
        url: apiCargos + 'create',
        type: 'post',
        data: $('#form-create').serialize(),
        datatype: 'json'
    })
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
            if (result.status) {
                $('#form-create')[0].reset();
                $('#modal-create').modal('close');
                showTable();
                sweetAlert(1, result.message, null);
            } else {
                sweetAlert(2, result.exception, null);
            }
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        // Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
})

// Función para mostrar formulario con registro a modificar
function modalUpdate(id)
{
    $.ajax({
        url: apiCargos + 'get',
        type: 'post',
        data:{
            id_cargo: id
        },
        datatype: 'json'
    })
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio para mostrar los valores en el formulario, sino se muestra la excepción
            if (result.status) {
                const cargo = result.dataset;
                $('#id_cargo').val(cargo.id_cargo);
                $('#update_nombre').val(cargo.nombre_cargo);
                (cargo.produccion == 1) ? $('#update_produccion').prop('checked', true) : $('#update_produccion').prop('checked', false);
                (cargo.usuarios == 1) ? $('#update_usuarios').prop('checked', true) : $('#update_usuarios').prop('checked', false);
                (cargo.transacciones == 1) ? $('#update_transacciones').prop('checked', true) : $('#update_transacciones').prop('checked', false);
                (cargo.reportes == 1) ? $('#update_reportes').prop('checked', true) : $('#update_reportes').prop('checked', false);
                (cargo.graficos == 1) ? $('#update_graficos').prop('checked', true) : $('#update_graficos').prop('checked', false);
                M.updateTextFields();
                $('#modal-update').modal('open');
            } else {
                sweetAlert(2, result.exception, null);
            }
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        // Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
}

// Función para modificar un registro seleccionado previamente
$('#form-update').submit(function()
{
    event.preventDefault();
    $.ajax({
        url: apiCargos + 'update',
        type: 'post',
        data: $('#form-update').serialize(),
        datatype: 'json'
    })
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
            if (result.status) {
                $('#modal-update').modal('close');
                showTable();
                sweetAlert(1, result.message, 'cargos.php');
            } else {
                sweetAlert(2, result.exception, null);
            }
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        // Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
})

// Función para eliminar un registro seleccionado
function confirmDelete(id)
{
    swal({
        title: 'Advertencia',
        text: '¿Desea eliminar este cargo?',
        icon: 'warning',
        buttons: ['Cancelar', 'Aceptar'],
        closeOnClickOutside: false,
        closeOnEsc: false
    })
    .then(function(value){
        if (value) {
            $.ajax({
                url: apiCargos + 'delete',
                type: 'post',
                data:{
                    id_cargo: id
                },
                datatype: 'json'
            })
            .done(function(response){
                // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
                if (isJSONString(response)) {
                    const result = JSON.parse(response);
                    // Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
                    if (result.status) {
                        showTable();
                        sweetAlert(1, result.message, null);
                    } else {
                        sweetAlert(2, result.exception, null);
                    }
                } else {
                    console.log(response);
                }
            })
            .fail(function(jqXHR){
                // Se muestran en consola los posibles errores de la solicitud AJAX
                console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
            });
        }
    });
}
