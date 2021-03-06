$(document).ready(function () {
    showTable();
})

//Constante para establecer la ruta y parámetros de comunicación con la API
const apiCliente = '../../core/api/dashboard/clientes.php?action=';

//Función para llenar tabla con los datos de los registros
function fillTable(rows) {
    let content = '';
    //Se recorren las filas para armar el cuerpo de la tabla y se utiliza comilla invertida para escapar los caracteres especiales
    rows.forEach(function (row) {
        content += `
            <tr>
                <td>${row.apellido_cliente}</td>
                <td>${row.nombre_cliente}</td>
                <td>${row.telefono_cliente}</td>
                <td>${row.correo_cliente}</td>
                <td>
                    <a href="#" onclick="modalUpdate(${row.id_cliente})" class="tooltipped" data-tooltip="Modificar"><i class="material-icons blue-text">mode_edit</i></a>
                    <a href="#" onclick="confirmDelete(${row.id_cliente})" class="tooltipped" data-tooltip="Eliminar"><i class="material-icons red-text">delete</i></a>
                </td>
            </tr>
        `;
    });
    $('#tbody-read').html(content);
    $('.materialboxed').materialbox();
    $('.tooltipped').tooltip();
}

//Función para obtener y mostrar los registros disponibles
function showTable() {
    $.ajax({
            url: apiCliente + 'read',
            type: 'post',
            data: null,
            datatype: 'json'
        })
        .done(function (response) {
            //Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
            if (isJSONString(response)) {
                const result = JSON.parse(response);
                //Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
                if (result.status) {
                    fillTable(result.dataset);
                } else {
                    sweetAlert(4, result.exception, null);
                }
            } else {
                console.log(response);
            }
        })
        .fail(function (jqXHR) {
            //Se muestran en consola los posibles errores de la solicitud AJAX
            console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
        });
}

//Función para mostrar los resultados de una búsqueda
$('#form-search').submit(function () {
    event.preventDefault();
    $.ajax({
            url: apiCliente + 'search',
            type: 'post',
            data: $('#form-search').serialize(),
            datatype: 'json'
        })
        .done(function (response) {
            //Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
            if (isJSONString(response)) {
                const result = JSON.parse(response);
                //Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
                if (result.status) {
                    sweetAlert(4, 'Coincidencias: ' + result.dataset.length, null);
                    fillTable(result.dataset);
                } else {
                    sweetAlert(3, result.exception, null);
                }
            } else {
                console.log(response);
            }
        })
        .fail(function (jqXHR) {
            //Se muestran en consola los posibles errores de la solicitud AJAX
            console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
        });
})

function modalCreate() {
    $('#form-create')[0].reset();
    $('#modal-create').modal('open');
}

// Función para crear un nuevo registro
$('#form-create').submit(function () {
    event.preventDefault();
    $.ajax({
            url: apiCliente + 'create',
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

//Función para mostrar formulario con registro a modificar
function modalUpdate(id) {
    $.ajax({
            url: apiCliente + 'get',
            type: 'post',
            data: {
                id_cliente: id
            },
            datatype: 'json'
        })
        .done(function (response) {
            //Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado consola
            if (isJSONString(response)) {
                const result = JSON.parse(response);
                //Se comprueba si el resultado es satisfactorio para mostrar los valores en el formulario, sino se muestra la excepción
                if (result.status) {
                    $('#id_empleado').val(result.dataset.id_cliente);
                    $('#update_nombres').val(result.dataset.nombre_cliente);
                    $('#update_apellidos').val(result.dataset.apellido_cliente);
                    $('#update_telefono').val(result.dataset.telefono_cliente);
                    $('#update_correo').val(result.dataset.correo_cliente);
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
            //Se muestran en consola los posibles errores de la solicitud AJAX
            console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
        });
}

//Función para modificar un registro seleccionado previamente
$('#form-update').submit(function () {

    event.preventDefault();
    $.ajax({
            url: apiCliente + 'update',
            type: 'post',
            type: 'post',
            data: $('#form-update').serialize(),
            datatype: 'json',
        })
        .done(function (response) {
            // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
            if (isJSONString(response)) {
                const result = JSON.parse(response);
                // Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
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
            // Se muestran en consola los posibles errores de la solicitud AJAX
            console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
        });
})