$(document).ready(function()
{
    checkUsuarios();
})

//Constante para establecer la ruta y parámetros de comunicación con la API
const apiSesion = '../../core/api/dashboard/usuarios.php?action=';
const apiCorreo = '../../core/api/dashboard/correo.php?action=';

//Función para verificar si existen usuarios en el sitio privado
function checkUsuarios()
{
    $.ajax({
        url: apiSesion + 'read',
        type: 'post',
        data: null,
        datatype: 'json'
    })
    .done(function(response){
        //Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const dataset = JSON.parse(response);
            //Se comprueba que no hay usuarios registrados para redireccionar al registro del primer usuario
            if (dataset.status == 2) {
                sweetAlert(3, dataset.exception, 'register.php');
            }
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        //Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
}

//Función para validar el usuario al momento de iniciar sesión
$('#form-sesion').submit(function()
{
    event.preventDefault();
    $.ajax({
        url: apiSesion + 'login',
        type: 'post',
        data: $('#form-sesion').serialize(),
        datatype: 'json'
    })
    .done(function(response)
    {
    // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
    if (isJSONString(response)) {
        const result = JSON.parse(response);
        if (result.intentos) {
            // Se comprueba si la respuesta es satisfactoria, sino se muestra la excepción
            if (result.status) {
                sweetAlert(1, result.message, 'home.php');
            } else {
                sweetAlert(2, result.exception, null);
            }
        } else {
            sweetAlert(2, result.exception, null);
            }
        } else {
            console.log(response);
        }
    })
    .fail(function(jqXHR){
        //Se muestran en consola los posibles errores de la solicitud AJAX
        console.log('Error: ' + jqXHR.status + ' ' + jqXHR.statusText);
    });
})

//Función para modificar un registro seleccionado previamente
$('#form-verificar').submit(function()
{
    
    event.preventDefault();
    $.ajax({
        url: apiCorreo + 'verificar',
        type: 'post',
        data: $('#form-verificar').serialize(),
        datatype: 'json',
    })
    .done(function(response){
        // Se verifica si la respuesta de la API es una cadena JSON, sino se muestra el resultado en consola
        if (isJSONString(response)) {
            const result = JSON.parse(response);
            // Se comprueba si el resultado es satisfactorio, sino se muestra la excepción
            if (result.status) {
                $('#modal-verificar').modal('close');
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

