$(document).ready(function()
{
    showGreeting();
})

//Función para mostrar un saludo dependiendo de la hora del cliente
function showGreeting()
{
    let today = new Date();
	let hour = today.getHours();
    if (hour < 12) {
        greeting = 'Buenos días';
    } else if (hour < 19) {
        greeting = 'Buenas tardes';
    } else if (hour <= 23) {
        greeting = 'Buenas noches';
    }
    $('#greeting').text(greeting);
    grafCPV();
    grafCPP();
    grafPVE();
    grafCPC();
    grafCPI();
    graficoVentasMonto();
}

const apiProductos = '../../core/api/dashboard/productos.php?action=';
const apiCategorias = '../../core/api/dashboard/categorias.php?action=';
const apiVentas = '../../core/api/dashboard/ventas.php?action=';

function grafCPV()
{
    $.ajax({
        url: apiProductos + 'graficoCPV',
        type: 'post',
        data: null,
        datatype: 'json'
    })
    
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se remueve la etiqueta canvas
            if (result.status) {
                let estados = ['Invisible', 'Visible'];
                let visibles = [];
                result.dataset.forEach(function(row){
                    //estados.push(row.estado_producto);
                    visibles.push(row.visibles);
                });
                graphCPV('chartCPV', estados, visibles, 'Cantidad de productos', 'Cantidad de productos por estado')
            } else {
                $('#chartCPV').remove();
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

function grafCPP()
{
    $.ajax({
        url: apiProductos + 'graficoCPP',
        type: 'post',
        data: null,
        datatype: 'json'
    })
    
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se remueve la etiqueta canvas
            if (result.status) {
                let proveedor = [];
                let panes = [];
                result.dataset.forEach(function(row){
                    proveedor.push(row.descripcion_producto);
                    panes.push(row.panes);
                });
                graphCPP('chartCPP', proveedor, panes, 'Cantidad de pan', 'Cantidad de pan por proveedor')
            } else {
                $('#chartCPP').remove();
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

function grafPVE()
{
    $.ajax({
        url: apiVentas + 'graficoPVE',
        type: 'post',
        data: null,
        datatype: 'json'
    })
    
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se remueve la etiqueta canvas
            if (result.status) {
                let ventadas = [];
                let ventas = [];
                result.dataset.forEach(function(row){
                    ventadas.push(row.nombre_empleado);
                    ventas.push(row.ventas);
                });
                graphPVE('chartPVE', ventadas, ventas, 'Productos Vendido', 'Productos vendidos por empleado')
            } else {
                $('#chartPVE').remove();
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

function grafCPC()
{
    $.ajax({
        url: apiCategorias + 'graficoCPC',
        type: 'post',
        data: null,
        datatype: 'json'
    })
    
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se remueve la etiqueta canvas
            if (result.status) {
                let categorias = [];
                let cantidad = [];
                result.dataset.forEach(function(row){
                    categorias.push(row.nombre_categoria);
                    cantidad.push(row.cantidad);
                });
                graphCPC('chartCPC', categorias, cantidad, 'Cantidad de productos', 'Cantidad de productos por categoría')
            } else {
                $('#chartCPC').remove();
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

function grafCPI()
{
    $.ajax({
        url: apiProductos + 'graficoCPI',
        type: 'post',
        data: null,
        datatype: 'json'
    })
    
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se remueve la etiqueta canvas
            if (result.status) {
                let fecha = [];
                let verti = [];
                result.dataset.forEach(function(row){
                    fecha.push(row.nombre_producto);
                    verti.push(row.cantidad_inventario);
                });
                graphCPI('chartCPI', fecha, verti, 'Nombre de producto', 'Productos en inventario')
            } else {
                $('#chartCPI').remove();
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

// Función para mostrar los resultados de una búsqueda
/*$('#form-vm').submit(function()
{
    event.preventDefault();
    $.ajax({
        url: apiVentas + 'graficovm',
        type: 'post',
        data: $('#form-vm').serialize(),
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
})*/

function graficoVentasMonto()
{
    $.ajax({
        url: apiVentas + 'graficovm',
        type: 'post',
        data: $('#form-vm').serialize(),
        datatype: 'json'
    })
    
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se remueve la etiqueta canvas
            if (result.status) {
                let fecha = [];
                let monto = [];
                result.dataset.forEach(function(row){
                    fecha.push(row.fecha_venta);
                    monto.push(row.monto_venta);
                });
                vmGraph('vmchart', fecha, monto, 'Fecha de venta', 'Monto de venta por fecha')
            } else {
                $('#vmchart').remove();
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