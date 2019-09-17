<?php
class Dashboard
{
    public static function headerTemplate($title)
    {
        session_start();
        ini_set('date.timezone', 'America/El_Salvador');
        print('
			<!DOCTYPE html>
			<html lang="es">
				<head>
					<meta charset="utf-8">
					<title>' . $title . '</title>
					<link type="image/png" rel="icon" href="../../resources/img/icono.png"/>
					<link type="text/css" rel="stylesheet" href="../../resources/css/materialize.min.css"/>
					<link type="text/css" rel="stylesheet" href="../../resources/css/icons.css"/>
					<link type="text/css" rel="stylesheet" href="../../resources/css/fonts.css"/>
					<link type="text/css" rel="stylesheet" href="../../resources/css/dashboard.css"/>
					<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				</head>
				<body id="noctext">
		');
        if (isset($_SESSION['id_empleado'])) {
			if (time() - $_SESSION['timestamp'] > 60) { //se le cambia despues porque solo da 60 seg para prueba
				//sirve solo para cambio de pagina
				session_destroy();
				header('location: index.php');
			} else {  
				$_SESSION['timestamp'] = time();
			}
			require_once('../../core/helpers/database.php');
			require_once('../../core/helpers/validator.php');
			require_once('../../core/models/usuarios.php');
			$fecha = new Usuarios();
			$ultina = $fecha->getFecha($_SESSION['id_empleado']);
			if ($ultina[0]== true){
				$fecha_ultima = $ultina[0]['ultima_fecha'];
			
				$fechaActual = date ('Y-m-d');
				$fecha_nueva = date("Y-m-d",strtotime(date($fecha_ultima."+ 1 days")));
				if ($fecha_nueva >= $fechaActual) {
					print("<script>$('#modal-profile').modal('open');</script>");
				}
			}

            $filename = basename($_SERVER['PHP_SELF']);
            if ($filename != 'index.php') {
                self::modals();
                print('
					<header>
						<div class="navbar-fixed">
							<nav>
								<div class="nav-wrapper">
									<a href="home.php" class="brand-logo center">
										<img src="../../resources/img/logo.png">
									</a>
									<a href="#" data-target="slide-out" class="sidenav-trigger show-on-large">
										<i class="material-icons orange-text">menu</i>
									</a>
								</div>
							</nav>
						</div>

					<!--El menu desplegable-->
							<ul id="slide-out" class="sidenav collapsible">
								<li>
									<div class="user-view">
										<div class="background">
											<img class="background" id="mode">
										</div>
										<a href="perfil.php">
											<i class="material-icons right black-text">settings</i>
										</a>
										<a href="perfil.php">
											<img class="circle" src="../../resources/img/usuarios/' . $_SESSION['foto_empleado'] . '">
										</a>
										<a href="perfil.php">
											<span class="black-text">' . $_SESSION['alias_empleado'] . '</span>
										</a>
									</div>
								</li>
								<li class="no-padding">
										<a href="home.php" class="collapsible-header"><i class="material-icons">home</i>Inicio</a>
								</li>
								<li>
									<a class="collapsible-header"><i class="material-icons">cake</i>Producción</a>
									<div class="collapsible-body">
										<ul>
											<li>
												<a href="categorias.php">
												<i class="material-icons">description</i>Categorías 
												</a>
											</li>
											<li>
												<a href="productos.php">
													<i class="material-icons">cake</i>Productos
												</a>
											</li>
											<li>
												<a href="ventas.php">
													<i class="material-icons">attach_money</i>Ventas
												</a>
											</li>
										</ul>
									</div>
								</li>
								<li>
									<a class="collapsible-header"><i class="material-icons">person</i>Usuarios</a>
									<div class="collapsible-body">
										<ul>
											<li>
												<a href="usuarios.php">
													<i class="material-icons">person</i>Empleados 
												</a>
											</li>
											<li>
												<a href="cargos.php">
													<i class="material-icons">person</i>Cargos
												</a>
											</li>
											<li>
												<a href="clientes.php">
													<i class="material-icons">person</i>Clientes
												</a>
											</li>
										</ul>
									</div>
								</li>
								<li class="no-padding">
									<a class="collapsible-header" href="reportes.php"><i class="material-icons">list</i><span class="black-text">Reportes</span></a>
								</li>
								<li>
									<div class="divider"></div>
								</li>
								<li>
									<a class="waves-effect" href="#" onclick="signOff()">
											<i class="material-icons">exit_to_app</i>Cerrar Sesión
									</a>
								</li>
							</ul>
					</header>
					<main class="container">
						<h3 class="center-align">' . $title . '</h3>
				');
                /*
            <li>
            <a href="inventario.php">
            <i class="material-icons">book</i>Inventario
            </a>
            </li>
             */
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
					<main class="container">
						<h3 class="center-align">' . $title . '</h3>
				');
            }
        }
    }

    public static function footerTemplate($controller)
    {
        print('
					</main>
					<footer class="page-footer">
						<div class="container">
							<div class="row">
								<div class="col s12 m6 l6">
									<h5 class="white-text">Dashboard</h5>
									<a class="white-text" href="mailto:daniel.hdez2018@gmail.com"><i class="material-icons left">email</i>Ayuda</a>
								</div>
								<div class="col s12 m6 l6">
									<h5 class="white-text">Enlaces</h5>
									<a class="white-text" href="http://localhost/phpmyadmin/" target="_blank"><i class="material-icons left">cloud</i>phpMyAdmin</a>
								</div>
							</div>
						</div>
						<div class="footer-copyright">
							<div class="container">
								<span>© Shagulito, todos los derechos reservados.</span>
								<span class="white-text right">Diseñado con <a class="red-text text-accent-1" href="http://materializecss.com/" target="_blank"><b>Materialize</b></a></span>
							</div>
						</div>
					</footer>
					<script type="text/javascript" src="../../libraries/jquery-3.2.1.min.js"></script>
					<script type="text/javascript" src="../../resources/js/materialize.min.js"></script>
					<script type="text/javascript" src="../../resources/js/sweetalert.min.js"></script>
					<script type="text/javascript" src="../../resources/js/dashboard.js"></script>
					<script type="text/javascript" src="../../core/helpers/functions.js"></script>
					<script type="text/javascript" src="../../core/helpers/components.js"></script>
					<script type="text/javascript" src="../../core/controllers/dashboard/logout.js"></script>
					<script type="text/javascript" src="../../core/controllers/dashboard/dashboard.js"></script>
					<script type="text/javascript" src="../../resources/js/chart.js"></script>
					<script type="text/javascript" src="../../core/controllers/dashboard/' . $controller . '"></script>
				</body>
			</html>
		');
    }

    private function modals()
    {
        print('
			
		');
    }
}