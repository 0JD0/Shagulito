<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!--Se conecta con el css-->
    <link rel="stylesheet" href="../../resources/css/font_materialize.css">
    <link rel="stylesheet" href="../../resources/css/materialize.css">
    <link rel="stylesheet" href="../../resources/css/index.css">
    <title>Index</title>
</head>

<body>
    <!--Estructura del dropdown-->
    <ul id="dropdown1" class="dropdown-content">
        <li>
            <a href="#!">Editar perfil</a>
        </li>

        <li class="divider"></li>
        <li>
            <a href="login.php">
                <i class="material-icons">exit_to_app</i> Cerrar Sesión
            </a>
        </li>
    </ul>
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
                    <ul class="right hide-on-med-and-down">
                        <li>
                            <a class="dropdown-trigger" href="#!" data-target="dropdown1">Perfil
                                <i class="material-icons right">arrow_drop_down</i>
                            </a>
                        </li>
                    </ul>
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
                <a href="index.php">
                    <i class="material-icons">home</i>Inicio</a>
            </li>
            <li>
                <a href="#!">
                    <i class="material-icons">description</i>Categorias
                </a>
            </li>
            <li>
                <a href="#!">
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
        <div class="divider"></div>
        <div class="container">
            <h2 class="center grey-text">Estadisticas</h2>
            <div class="row">
                <div class="col s12">
                    <!--Se divide la pagina-->
                        <div class="col s6">
                            <!--Se manda a llamar la grafica-->
                                <canvas id="bar-chart" width="250" height="250"></canvas>
                        </div>
                        <!--Se divide la pagina-->
                            <div class="col s6 offset s6">
                                <!--Se manda a llamar la grafica-->
                                    <canvas id="bar-chart1" width="250" height="250"></canvas>
                                    <canvas id="bar-chart2" width="250" height="250"></canvas>
                           </div>
                </div>
            </div>
        </div>
    </section>

</body>
<!--Se conecta con Javascript-->
<script type="text/javascript" src="../../resources/js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="../../resources/js/Chart.bundle.js"></script>
<script type="text/javascript" src="../../resources/js/Chart.bundle.min.js"></script>
<script type="text/javascript" src="../../resources/js/materialize.js"></script>
<script type="text/javascript" src="../../resources/js/index.js"></script>
<script type="text/javascript" src="../../resources/js/grafica.js"></script>

</html>