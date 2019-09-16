//var idleTime = 0;
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

  //  var idleTerminal = setInterval(timerIncrement, 15000);

    //$(this).mousemove(function(e) {
      //  idleTime = 0;
    //});
//    $(this).keypress(function(e) {
  //      idleTime = 0;
    //});
});

//function signOffi()
//{
  //  swal({
    //    title: 'Advertencia',
      //  text: 'Se le cerro la sesion por inactividad ingrese de nuevo',
       // icon: 'warning',
        //button: { text: 'Aceptar' },
       // closeOnClickOutside: false,
        //closeOnEsc: false
   // })
    //.then(function(value){
      //  const apiAccount = '../../core/api/dashboard/usuarios.php?action='
        //    location.href = apiAccount + 'logout';
  //  });
//}

//function timerIncrement()
//{
  //  idleTime = idleTime + 1;
    //if (idleTime > 1  ) {
   //     signOffi();
 //   }
//}
