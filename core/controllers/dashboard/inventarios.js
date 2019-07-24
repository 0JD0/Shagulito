$(document).ready(function()
{
    showTable();
})

//  constantes que comunican con la API
const apiInventarios = '../../core/api/dashboard/inventario.php?action=';
const productos = '../../core/api/dashboard/productos.php?action=read';

// funcion para llenar la tabla
function fillTable(rows)
{
    let content = '';
    // se agregan las partes de la tabla segun el orden q se deasea q se muestren
    rows.forEach(function(row){
        (row.estado_producto == 1) ? icon = 'visibility' : icon = 'visibility_off';
        content += `
            <tr>
                <td class="hide-on-med-and-down"><img src="../../resources/img/productos/${row.imagen_producto}" class="materialboxed" height="100"></td>
                <td>${row.nombre_producto}</td>
                <td>${row.precio_producto}</td>
                <td>${row.cantidad_inventario}</td>
                <td>
                    <a href="#" onclick="modalUpdate(${row.id_inventario})" class="blue-text waves-effect waves-blue tooltipped" data-tooltip="editar"><i class="material-icons">edit</i></a>
                    <a href="#" onclick="confirmDelete('${apiInventarios}', ${row.id_inventario}')" class="red-text waves-effect waves-orange tooltipped" data-tooltip="Eliminar"><i class="material-icons">delete</i></a>
                </td>
            </tr>
        `;
    });
    $('#tbody-read').html(content);
    $('.materialboxed').materialbox();
    $('.tooltipped').tooltip();
}

// Función q muestra los registros diponibls
function showTable()
{
    $.ajax({
        url: apiInventarios + 'read',
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

// Función para mostrar las busquedas
$('#form-search').submit(function()
{
    event.preventDefault();
    $.ajax({
        url: apiInventarios + 'search',
        type: 'post',
        data: $('#form-search').serialize(),
        datatype: 'json'
    })
    .done(function(response){
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
    .fail(function(jqXHR){
        // Se muestra en la consola los posibles eerores
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
})

function modalCreate()
{
    $('#form-create')[0].reset();
    fillSelect(productos, 'create_productos', null);
    $('#modal-create').modal('open');
}

// Función para crear un nuevo registro
$('#form-create').submit(function()
{
    event.preventDefault();
    $.ajax({
        url: apiInventarios + 'create',
        type: 'post',
        data: new FormData($('#form-create')[0]),
        datatype: 'json',
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function(response){
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
    .fail(function(jqXHR){
        // Se muestra en la consola los posibles eerores
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
})

// Función para modificar
function modalUpdate(id)
{
    $.ajax({
        url: apiInventarios + 'get',
        type: 'post',
        data:{
            id_inventario: id
        },
        datatype: 'json'
    })
    .done(function(response){
        // Se verifica si la api responde una cadena JSON
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            if (result.status) {
                $('#form-update')[0].reset();
                $('#id_inventario').val(result.dataset.id_producto);
                $('#update_cantidad').val(result.dataset.cantidad_inventario);
                fillSelect(productos, 'update_producto', result.dataset.id_producto);
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
        // Se muestra en la consola los posibles eerores
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
}

// Función para modificar un registro seleccionado previamente
$('#form-update').submit(function()
{
    event.preventDefault();
    $.ajax({
        url: apiInventarios + 'update',
        type: 'post',
        data: new FormData($('#form-update')[0]),
        datatype: 'json',
        cache: false,
        contentType: false,
        processData: false
    })
    .done(function(response){
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
    .fail(function(jqXHR){
        // Se muestra en la consola los posibles eerores
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
})
