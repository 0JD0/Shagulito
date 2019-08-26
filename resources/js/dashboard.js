var idleTime= 0;
$(document).ready(function(){
    $('.sidenav').sidenav({
        preventScrolling:false
    });
    $('.dropdown-trigger').dropdown();
    $('.materialboxed').materialbox();
    $('.tooltipped').tooltip();
    $('.modal').modal();
    $('.select').formSelect();
    $('.collapsible').collapsible();
});

var idleInterval = setInterval(timerIncrement, 60000);

$(this).mousemove(function (e) {
    idleTime = 0;
});
$(this).keypress(function (e) {
    idleTime = 0; 
});

function signOff()
{
    swal({
        title: 'Advertencia',
        text: '¿Desea cerrar la sesión?',
        icon: 'warning',
        buttons: ['Cancelar', 'Aceptar'],
        closeOnClickOutside: false,
        closeOnEsc: false
    })
    .then(function(value){
        if (value) {
            location.href = apiAccount + 'logout';
        } else {
            swal({
                title: 'Enhorabuena',
                text: 'Puede continuar trabajando',
                icon: 'info',
                button: 'Aceptar',
                closeOnClickOutside: false,
                closeOnEsc: false
            });
        }
    });
}

function timerIncrement() 
{
    idleTime = idleTime + 1;
    if (idleTime> 7) {
        let link = '../core/api/dashboard/usuarios.php?action="logout"'
        signOff();
    }
}
