<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../../resources/css/font_materialize.css">
    <link rel="stylesheet" href="../../resources/css/materialize.css">
    <link rel="stylesheet" href="../../resources/css/login.css">
    <title>Login</title>
</head>

<body>
    <header>
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <a href="#!" class="brand-logo center">
                        <img src="../../resources/img/logo.png">
                    </a>
                    <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
                        <i class="material-icons">dashboard</i>
                    </a>
                    <ul class="right hide-on-med-and-down">
                      
                    </ul>
                </div>
            </nav>
        </div>
    </header>
    <section>
            <div class="divider"></div>
            <h3 class="center">Iniciar Sesión</h3>
            <div class="container">
                <div class="row">
                    <div class="col s2"></div>
                    <div class="col s8">
                        <!--Login en un cuadro centrado-->
                        <div class="card white darken-1">
                            <div class="card-content black-text">
                                <div class="row">
                                    <form class="col s12 center-align">
                                        <div class="row">
                                            <div class="input-field col l12 m6 s4">
                                                <i class="material-icons prefix">account_circle </i>
                                                <textarea id="icon_prefix2" class="materialize-textarea"></textarea>
                                                <label for="icon_prefix2">Usuario</label>
                                            </div>
                                            <div class="input-field col l12 m6 s4">
                                                <i class="material-icons prefix">security</i>
                                                <textarea id="icon_prefix2" class="materialize-textarea"></textarea>
                                                <label for="icon_prefix2">Contraseña</label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="col s12 center-align">
                            <a class="waves-effect waves-light btn" href="index.php">
                                <i class="material-icons right">send</i>Iniciar</a>
                        </div>
                    </div>
                <div class="col s2"></div>
                </div>
            </div>
        </section>
</body>
<script type="text/javascript" src="../../resources/js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="../../resources/js/materialize.js"></script>
<script type="text/javascript" src="../../resources/js/login.js"></script>
</html>