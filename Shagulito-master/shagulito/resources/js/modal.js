document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init();
  });

  // Or with jQuery

  $(document).ready(function(){
    $('.modal').modal();
  });