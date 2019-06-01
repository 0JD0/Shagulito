<?php
class Dashboard{
    public static function headerTemplate($title){
        print('
        <!DOCTYPE html>
        <html lang="es">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <!--Se conecta con el css-->
            <link type="image/png" rel="icon" href="../../resources/img/icono.png"/>
            <link rel="stylesheet" href="../../resources/css/font_materialize.css">
            <link rel="stylesheet" href="../../resources/css/materialize.css">
            <link rel="stylesheet" href="../../resources/css/index.css">
            <title>Dashboard -'.$title.'</title>
        </head>
            <body>
            ');
            if (isset($_SESSION['idUsuario'])) {
                $filename = basename($_SERVER['PHP_SELF']);
                if ($filename != 'index.php' && $filename != 'register.php') {
                    self::modals();
                    print('
            <header>
            <!--Hacer el nav flexible-->
            <div class="navbar-fixed">
                <nav>
                    <div class="nav-wrapper">
                        <a href="#!" class="brand-logo center">
                            <img src="../../resources/img/logo.png">
                        </a>
                        <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                            <i class="material-icons">menu</i>
                        </a>
                    </div>
                </nav>
            </div>
            <!--El menu desplegable-->
            <ul id="slide-out" class="sidenav">
                <li>
                    <div class="user-view">
                        <div class="background">
                            <img class="background" src="../../resources/img/fondo.jpg" >
                        </div>
                        <a href="#user">
                            <img class="circle" src="../../resources/img/foto.jpg">
                        </a>
                        <a href="#name">
                            <span class="black-text name">Daniel Hernandez</span>
                        </a>
                    </div>
                </li>
                <li>
                    <a href="home.php">
                        <i class="material-icons">home</i>Inicio</a>
                </li>
                <li>
                    <a href="categorias.php">
                        <i class="material-icons">description</i>Categorias
                    </a>
                </li>
                <li>
                    <a href="productos.php">
                        <i class="material-icons">cake</i>Productos
                    </a>
                    </li>
                <li>
                <li>
                    <a href="ventas.php">
                        <i class="material-icons">attach_money</i>Ventas
                    </a>
                </li>
                <li>
                    <a href="inventario.php">
                        <i class="material-icons">book</i>Inventario
                    </a>
                </li>
                <li>
                        <a href="usuarios.php">
                            <i class="material-icons">person</i>Usuarios
                        </a>
                    </li> 
                    <li>
                    <a href="tipo_usuario.php">
                        <i class="material-icons">person</i>Tipo de Usuarios
                    </a>
                </li>  
                <li>
                    
                    <div class="divider"></div>
                </li>
                <li>
                    <a class="waves-effect" href="login.php">
                            <i class="material-icons">exit_to_app</i>Cerrar Sesión
                    </a>
                </li>
            </ul>
        </header>
        <section>
        ');
    } else {
        header('location: home.php');
    }
} else {
    $filename = basename($_SERVER['PHP_SELF']);
    if ($filename != 'index.php' && $filename != 'register.php') {
        header('location: index.php');
    } else {
        print('
        <header>
        <div class="navbar-fixed">
                <nav>
                    <div class="nav-wrapper">
                        <a class="brand-logo center">
                            <img src="../../resources/img/logo.png">
                        </a>
                        <a data-target="slide-out" class="sidenav-trigger show-on-large">
                            <i class="material-icons">dashboard</i>
                        </a>
                    </div>
                </nav>
            </div>
            </header>
            <main>
        ');
    }
}
}
    public static function footerTemplate($controller){
        print('
        </main>
            <footer class="page-footer">
                <div class="container">
                    <div class="row">
                        <div class="col s12 m6 l6 ">
                            <h5 class="white-text center-align">Dashboard</h5>
                            <a class="white-text" href="mailto:daniel.hdez2018@gmail.com"><i class="material-icons left">email</i>Ayuda</a>
                        </div>
                        <div class="col s12 m6 l6">
                            <h5 class="white-text center-align">Enlaces</h5>
                            <a class="white-text" href="http://localhost/phpmyadmin/" target="_blank"><i class="material-icons left">cloud</i>phpMyAdmin</a>
                        </div>
                    </div>
                </div>
                <div class="footer-copyright black">
                    <div class="container">
                        <div class="row">
                            <div class="col s12 m6 l6 center-align"><span>© Shagulito, todos los derechos reservados.</span></div>
                            <div class="col s12 m6 l6 center-align"><span class="white-text ">Diseñado con <a class="red-text text-accent-1" href="http://materializecss.com/" target="_blank"><b>Materialize</b></a></span></div>
                        </div>
                    </div>
                </div>
            </footer>
        <script type="text/javascript" src="../../libraries/jquery-3.2.1.min.js"></script>
        <script type="text/javascript" src="../../resources/js/materialize.js"></script>
        <script type="text/javascript" src="../../resources/js/sweetalert.min.js"></script>
        <script type="text/javascript" src="../../resources/js/dashboard.js"></script>
        <script type="text/javascript" src="../../core/helpers/validator.js"></script>
        <script type="text/javascript" src="../../core/helpers/functions.js"></script>
        <script type="text/javascript" src="../../core/controllers/dashboard/account.js"></script>
        <script type="text/javascript" src="../../core/controllers/dashboard/'.$controller.'"></script>
    </body>

</html>
        ');
    }
}
?>
