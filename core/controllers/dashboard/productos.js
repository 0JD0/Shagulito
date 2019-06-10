$(document).ready(function()
{
    showTable();
})

//  constantes que comunican con la API
const api = '../../core/api/dashboard/productos.php?action=';
const categorias = '../../core/api/dashboard/categorias.php?action=read';

// funcion para llenar la tabla
function fillTable(rows)
{
    let content = '';
    // se agregan las partes de la tabla segun el orden q se deasea q se muestren
    rows.forEach(function(row){
        (row.estado_producto == 1) ? icon = 'visibility' : icon = 'visibility_off';
        content += `
            <tr>
                <td><img src="../../resources/img/productos/${row.imagen_producto}" class="materialboxed" height="100"></td>
                <td>${row.nombre_producto}</td>
                <td>${row.precio_producto}</td>
                <td>${row.nombre_categoria}</td>
                <td><i class="material-icons">${icon}</i></td>
                <td>
                    <a href="#" onclick="modalUpdate(${row.id_producto})" class="blue-text waves-effect waves-blue tooltipped" data-tooltip="editar"><i class="material-icons">edit</i></a>
                    <a href="#" onclick="confirmDelete('${api}', ${row.id_producto}, '${row.imagen_producto}')" class="red-text waves-effect waves-orange tooltipped" data-tooltip="Eliminar"><i class="material-icons">delete</i></a>
                </td>
            </tr>
        `;
    });
    $('#tbody-read').html(content);
    $('.materialboxed').materialbox();
    $('.tooltipped').tooltip();
}
