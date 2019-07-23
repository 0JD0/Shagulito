$(document).ready(function()
{
    nocturneMode();
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
}
 function nocturneMode()
 {
    let today = new Date();
	let hour = today.getHours();
    if (hour > 6 & hour < 18) {
        url ="../../resources/img/dia.jpg";
    } else {
        url ="../../resources/img/noche.jpg";
    }
    $('#mode').attr('src', url);
 }

 function nocturneText()
{
    let today = new Date();
	let hour = today.getHours();
    if (hour > 6 & hour < 18) {
        url ="../../resources/img/fotito.jpg";
    } else {
        url ="../../resources/img/fondo.jpg";
    }
    $('#greeting').text(greeting);
}