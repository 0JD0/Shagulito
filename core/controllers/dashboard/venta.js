$(document).ready(function () {
    showTable();
})

//  constantes que comunican con la API
const apiVentas = '../../core/api/dashboard/ventas.php?action=';
const usuarios = '../../core/api/dashboard/usuarios.php?action=read';

// funcion para llenar la tabla
function fillTable(rows) {
    let content = '';
    // se agregan las partes de la tabla segun el orden q se deasea q se muestren
    rows.forEach(function (row) {
        content += `
            <tr>
                <td>${row.nombre_empleado}</td>
                <td>${row.monto_venta}</td>
                <td>${row.fecha_venta}</td>
                <td>
                    <a href="#" onclick="modalUpdate(${row.id_venta})" class="waves-effect waves-blue tooltipped" data-tooltip="editar"><i class="material-icons blue-text">edit</i></a>
                    <a href="#" onclick="confirmDelete('${apiVentas}', ${row.id_venta}, '${row.monto_venta}')" class="waves-effect waves-orange tooltipped" data-tooltip="Eliminar"><i class="material-icons red-text">delete</i></a>
                </td>
            </tr>
        `;
    });
    $('#tbody-read').html(content);
    $('.materialboxed').materialbox();
    $('.tooltipped').tooltip();
}

// Función q muestra los registros diponibls
function showTable() {
    $.ajax({
            url: apiVentas + 'read',
            type: 'post',
            data: null,
            datatype: 'json'
        })
        .done(function (response) {
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
        .fail(function (jqXHR) {
            // Se muestran en consola los posibles errores de la solicitud AJAX
            console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
        });
}

// Función para mostrar las busquedas
$('#form-search').submit(function () {
    event.preventDefault();
    $.ajax({
            url: apiVentas + 'search',
            type: 'post',
            data: $('#form-search').serialize(),
            datatype: 'json'
        })
        .done(function (response) {
            // Se verifica si la api responde una cadena JSON
            if (isJSONString(response)) {
                const result = JSON.parse(response);
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
        .fail(function (jqXHR) {
            // Se muestra en la consola los posibles eerores
            console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
        });
})

function modalCreate() {
    $('#form-create')[0].reset();
    fillSelected(usuarios, 'create_empleado', null);
    $('#modal-create').modal('open');
}

// Función para crear un nuevo registro
$('#form-create').submit(function () {
    event.preventDefault();
    $.ajax({
            url: apiVentas + 'create',
            type: 'post',
            data: $('#form-create').serialize(),
            datatype: 'json',
        })
        .done(function (response) {
            // Se verifica si la api responde una cadena JSON
            if (isJSONString(response)) {
                const result = JSON.parse(response);
                if (result.status) {
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
        .fail(function (jqXHR) {
            // Se muestra en la consola los posibles eerores
            console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
        });
})

// Función para modificar
function modalUpdate(id) {
    $.ajax({
            url: apiVentas + 'get',
            type: 'post',
            data: {
                id_venta: id
            },
            datatype: 'json'
        })
        .done(function (response) {
            // Se verifica si la api responde una cadena JSON
            if (isJSONString(response)) {
                const result = JSON.parse(response);
                if (result.status) {
                    $('#form-update')[0].reset();
                    $('#id_venta').val(result.dataset.id_venta);
                    $('#update_precio').val(result.dataset.monto_venta);
                    $('#update_fecha').val(result.dataset.fecha_venta);
                    fillSelected(usuarios, 'update_empleado', result.dataset.id_empleado);
                    M.updateTextFields();
                    $('#modal-update').modal('open');
                } else {
                    sweetAlert(2, result.exception, null);
                }
            } else {
                console.log(response);
            }
        })
        .fail(function (jqXHR) {
            // Se muestra en la consola los posibles eerores
            console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
        });
}

// Función para modificar un registro seleccionado previamente
$('#form-update').submit(function () {
    event.preventDefault();
    $.ajax({
            url: apiVentas + 'update',
            type: 'post',
            data: $('#form-update').serialize(),
            datatype: 'json',
        })
        .done(function (response) {
            // Se verifica si la api responde una cadena JSON
            if (isJSONString(response)) {
                const result = JSON.parse(response);
                if (result.status) {
                    $('#modal-update').modal('close');
                    showTable();
                    sweetAlert(1, result.message, null);
                } else {
                    sweetAlert(2, result.exception, null);
                }
            } else {
                console.log(response);
            }
        })
        .fail(function (jqXHR) {
            // Se muestra en la consola los posibles eerores
            console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
        });
})