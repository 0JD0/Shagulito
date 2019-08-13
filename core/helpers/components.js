/*
*   Función para manejar los mensajes de notificación al usuario.
*
*   Expects: type (tipo de mensaje), text (texto a mostrar) y url (dirección para enviar).
*
*   Returns: ninguno.
*/
function sweetAlert(type, text, url)
{
    switch (type) {
        case 1:
            title = "Éxito";
            icon = "success";
            break;
        case 2:
            title = "Error";
            icon = "error";
            break;
        case 3:
            title = "Advertencia";
            icon = "warning";
            break;
        case 4:
            title = "Aviso";
            icon = "info";
    }
    if (url) {
        swal({
            title: title,
            text: text,
            icon: icon,
            button: 'Aceptar',
            closeOnClickOutside: false,
            closeOnEsc: false
        })
        .then(function(value){
            location.href = url
        });
    } else {
        swal({
            title: title,
            text: text,
            icon: icon,
            button: 'Aceptar',
            closeOnClickOutside: false,
            closeOnEsc: false
        });
    }
}

/*
*   Función para cargar las opciones en un select de formulario.
*
*   Expects: api (origen de los datos a mostrar), id (identificador del select en el formulario) y selected (valor seleccionado).
*
*   Returns: ninguno.
*/
function fillSelect(api, id, selected)
{
    $.ajax({
        url: api,
        type: 'post',
        data: null,
        datatype: 'json'
    })
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
            if (result.status) {
                let content = '';
                if (!selected) {
                    content += '<option value="" disabled selected>Elige una opción</option>';
                }
                result.dataset.forEach(function(row){
                    value = Object.values(row)[0];
                    text = Object.values(row)[1];
                    if (row.id_categoria != selected) {
                        content += `<option value="${value}">${text}</option>`;
                    } else {
                        content += `<option value="${value}" selected>${text}</option>`;
                    }
                });
                $('#' + id).html(content);
            } else {
                $('#' + id).html('<option value="">No hay opciones</option>');
            }
            $('select').formSelect();
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        // Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
}

function fillSelected(api, id, selected)
{
    $.ajax({
        url: api,
        type: 'post',
        data: null,
        datatype: 'json'
    })
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
            if (result.status) {
                let content = '';
                if (!selected) {
                    content += '<option value="" disabled selected>Elige una opción</option>';
                }
                result.dataset.forEach(function(row){
                    value = Object.values(row)[0];
                    text = Object.values(row)[1];
                    if (row.id_empleado != selected) {
                        content += `<option value="${value}">${text}</option>`;
                    } else {
                        content += `<option value="${value}" selected>${text}</option>`;
                    }
                });
                $('#' + id).html(content);
            } else {
                $('#' + id).html('<option value="">No hay opciones</option>');
            }
            $('select').formSelect();
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        // Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
}

/*
*   Función para eliminar un registro seleccionado
*
*   Expects: api (ruta del servidor para borrar un registro), id (identificador del registro a eliminar) y file (nombre del arhivo a eliminar).
*
*   Returns: ninguno.
*/
function confirmDelete(apiUsuarios, id, file)
{
    swal({
        title: 'Advertencia',
        text: '¿Desea eliminar el registro?',
        icon: 'warning',
        buttons: ['Cancelar', 'Aceptar'],
        closeOnClickOutside: false,
        closeOnEsc: false
    })
    .then(function(value){
        if (value) {
            let params = new Object();
            (file) ? params = {identifier: id, filename: file} : params = {identifier: id};
            $.ajax({
                url: apiUsuarios + 'delete',
                type: 'post',
                data: params,
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

// funcion para definir los estilos de los graficos
function graphCPC(canvas, xAxis, yAxis, legend, title)
{
    //se crea el random de colores
    let colors = [];
    for (i = 0; i < xAxis.length; i++) {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    }
    const context = $('#' + canvas);
    const chartCPC = new Chart(context, {
        type: 'pie',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors,
                borderColor: '#000000',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }]
            }
        }
    });
}

function graphCPV(canvas, xAxis, yAxis, legend, title)
{
        //se crea el random de colores
    let colors = [];
    for (i = 0; i < xAxis.length; i++) {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    }
    const context = $('#' + canvas);
    const chartCPV = new Chart(context, {
        type: 'doughnut',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors,
                borderColor: '#000000',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }]
            }
        }
    });
}

function graphCPP(canvas, xAxis, yAxis, legend, title)
{
        //se crea el random de colores
    let colors = [];
    for (i = 0; i < xAxis.length; i++) {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    }
    const context = $('#' + canvas);
    const chartCPP = new Chart(context, {
        type: 'doughnut',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors,
                borderColor: '#000000',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }]
            }
        }
    });
}

function graphPVE(canvas, xAxis, yAxis, legend, title)
{
        //se crea el random de colores
    let colors = [];
    for (i = 0; i < xAxis.length; i++) {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    }
    const context = $('#' + canvas);
    const chartPVE = new Chart(context, {
        type: 'horizontalBar',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors,
                borderColor: '#000000',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1
                    }
                }]
            }
        }
    });
}

function graphCPI(canvas, xAxis, yAxis, legend, title)
{
        //se crea el random de colores
    let colors = [];
    for (i = 0; i < xAxis.length; i++) {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    }
    const context = $('#' + canvas);
    const chartCPI = new Chart(context, {
        type: 'bar',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors,
                borderColor: '#000000',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 10
                    }
                }]
            }
        }
    });
}

//funcion para stilo orden de datos del grafico
function graphVM(canvas, xAxis, yAxis, legend, title)
{
    //se crea el random de colores
    let colors = [];
    for (i = 0; i < xAxis.length; i++) {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    }
    const context = $('#' + canvas);
    const chartVM = new Chart(context, {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors,
                borderColor: '#000000',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 50
                    }
                }]
            }
        }
    });
}


function graphVF(canvas, xAxis, yAxis, legend, title)
{
    //se crea el random de colores
    let colors = [];
    for (i = 0; i < xAxis.length; i++) {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    }
    const context = $('#' + canvas);
    const chartVF = new Chart(context, {
        type: 'bar',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors,
                borderColor: '#000000',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 10
                    }
                }]
            }
        }
    });
}

function graphVE(canvas, xAxis, yAxis, legend, title)
{
    //se crea el random de colores
    let colors = [];
    for (i = 0; i < xAxis.length; i++) {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    }
    const context = $('#' + canvas);
    const chartVE = new Chart(context, {
        type: 'horizontalBar',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors,
                borderColor: '#000000',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 100
                    }
                }]
            }
        }
    });
}

function graphCE(canvas, xAxis, yAxis, legend, title)
{
    //se crea el random de colores
    let colors = [];
    for (i = 0; i < xAxis.length; i++) {
        colors.push('#' + (Math.random().toString(16)).substring(2, 8));
    }
    const context = $('#' + canvas);
    const chartCE = new Chart(context, {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: colors,
                borderColor: '#000000',
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        stepSize: 100
                    }
                }]
            }
        }
    });
}