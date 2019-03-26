<!DOCTYPE html>
<html lang="es">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Shagulito</title>
	<!--Import Google Icon Font-->
	<link type="text/css" rel="stylesheet" href="../../resources/css/font_materialize.css">
	<!--Import materialize.css-->
	<link type="text/css" rel="stylesheet" href="../../resources/css/materialize.css" media="screen,projection" />
	<link rel="stylesheet" href="../../resources/css/index.css">
</head>

<body>
	<!-- lista de ariba derecha -->
	<ul id="dropdown1" class="dropdown-content">
		<li>
			<a href="#!">Editar perfil</a>
		</li>

		<li class="divider"></li>
		<li>
			<a href="index.php">
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
		<ul id="slide-out" class="sidenav">
			<li>
				<div class="user-view">
					<div class="background">
						<img class="background" src="../../resources/img/fondo.jpg">
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

					<div class="divider"></div>
				</li>
				<li>
					<a class="waves-effect" href="index.php">
						<i class="material-icons">exit_to_app</i>Cerrar Sesión
					</a>
				</li>
		</ul>
	</header>
	<section>
		<div class="container">
			<!-- utilice autocomplete para buscar -->
			<div class="row">
				<div class="col s12">
					<h3 class="center-align">Inventario</h3>
					<!-- autocomplete para búscar -->
					<div class="input-field col s6 m6">
						<i class="material-icons prefix">search</i>
						<!-- el search de la izquierda muetrael icono que quires que se vea -->
						<input type="text" id="autocomplete-input" class="autocomplete" />
						<label for="autocomplete-input">Buscar</label>
					</div>
					<div class="input-field col s2 m2">
						<button type="submit" class="btn waves-effect btn-floating indigo tooltipped" data-tooltip="Buscar">
							<i class="material-icons">check</i>
						</button>
						<!-- el check circle es lo mismo q el comentario de arriba -->
					</div>

					<!-- Botón para abrir ventana de agregar -->
					<div class="input-field center-align col s2 m2">
						<!-- Modal Trigger -->
						<a href="#modal-agregar" class="btn waves-effect btn-floating green tooltipped modal-trigger" data-tooltip="Agregar">
							<i class="material-icons">add</i>
						</a>
					</div>

					<!-- se crea la tabla q mostrara los registros -->
					<div class="col s12">
						<div class="card white darken-1">
							<div class="card-content black-text">
								<table class="centered striped responsive-table">
									<thead>
										<tr>
											<th>Nombre</th>
											<th>Precio ($)</th>
											<th>Descripcion</th>
											<th>Categoria</th>
											<th>stock</th>
											<th>Acción</th>
										</tr>
									</thead>

									<tbody>
										<tr>
											<td>Datos</td>
											<td>Random</td>
											<td>No</td>
											<td>Hay</td>
											<td>Base</td>
											<td>
												<a href="#modal-editar" class="waves-effect waves-blue tooltipped modal-trigger" data-tooltip="Editar">
													<i class="material-icons blue-text">edit</i>
												</a>
												<a href="#modal-eliminar" class="waves-effect waves-orange tooltipped modal-trigger" data-tooltip="Eliminar">
													<i class="material-icons red-text">delete</i>
												</a>
											</td>
										</tr>
										<tr>
											<td>Alan</td>
											<td>Jellybean</td>
											<td>$3.76</td>
											<td>Alan</td>
											<td>4658</td>
											<td>
												<a href="#modal-editar" class="waves-effect waves-blue tooltipped modal-trigger" data-tooltip="Editar">
													<i class="material-icons blue-text">edit</i>
												</a>
												<a href="#modal-eliminar" class="waves-effect waves-orange tooltipped modal-trigger" data-tooltip="Eliminar">
													<i class="material-icons red-text">delete</i>
												</a>
											</td>
										</tr>
										<tr>
											<td>Jonathan</td>
											<td>Lollipop</td>
											<td>$7.00</td>
											<td>Jonathan</td>
											<td>4658</td>
											<td>
												<a href="#modal-editar" class="waves-effect waves-blue tooltipped modal-trigger" data-tooltip="Editar">
													<i class="material-icons blue-text">edit</i>
												</a>
												<a href="#modal-eliminar" class="waves-effect waves-orange tooltipped modal-trigger" data-tooltip="Eliminar">
													<i class="material-icons red-text">delete</i>
												</a>
											</td>
										</tr>
									</tbody>
								</table>

								<!-- modal para agregar -->

								<!-- Modal Structure -->
								<div id="modal-agregar" class="modal">
									<div class="modal-content">
										<h4 class="center-align">Agregar stock</h4>
										<div class="row">
											<div class="input-field col s12 m6">
												<i class="material-icons prefix">cake</i>
												<input type="text" id="autocomplete-input" class="validate" />
												<label for="autocomplete-input">Nombre</label>
											</div>
											<div class="input-field col s12 m6">
												<i class="material-icons prefix">attach_money</i>
												<input type="text" id="autocomplete-input" class="validate" />
												<label for="autocomplete-input">Precio</label>
											</div>
											<div class="input-field col s12 m6">
												<i class="material-icons prefix">assignment</i>
												<input type="text" id="autocomplete-input" class="validate" />
												<label for="autocomplete-input">Descripcion</label>
											</div>
											<div class="input-field col s12 m6">
												<select>
													<option value="" disabled selected>Seleccione una opcion</option>
													<option value="1">Pan Frances</option>
													<option value="2">Pan dulce</option>
													<option value="3">Menudos</option>
													<option value="4">Postres</option>
													<option value="">Bebidas</option>
												</select>
												<label>Seleccione Categoria</label>
											</div>
											<div class="input-field col s12 m6">
												<i class="material-icons prefix">list</i>
												<input type="text" id="autocomplete-input" class="validate" />
												<label for="autocomplete-input">Stock</label>
											</div>

										</div>
									</div>
									<div class="row center-align">
										<a href="#" class="modal-close btn waves-effect red tooltipped " data-tooltip="Cancelar">
											<i class="material-icons">cancel</i>
										</a>
										<button href="#modal-exito" type="submit" class="modal-close btn waves-effect green tooltipped modal-trigger" data-tooltip="Guardar">
											<i class="material-icons">save</i>
										</button>
									</div>
								</div>

								<!-- Modal Structure -->
								<div id="modal-editar" class="modal">
									<div class="modal-content">
										<h4 class="center-align">Editar Stock</h4>
										<div class="row">
											<div class="input-field col s12 m6">
												<i class="material-icons prefix">cake</i>
												<input type="text" id="autocomplete-input" class="validate" />
												<label for="autocomplete-input">Nombre</label>
											</div>
											<div class="input-field col s12 m6">
												<i class="material-icons prefix">attach_money</i>
												<input type="text" id="autocomplete-input" class="validate" />
												<label for="autocomplete-input">Precio</label>
											</div>
											<div class="input-field col s12 m6">
												<i class="material-icons prefix">assignment</i>
												<input type="text" id="autocomplete-input" class="validate" />
												<label for="autocomplete-input">Descripcion</label>
											</div>
											<div class="input-field col s12 m6">
												<select>
													<option value="" disabled selected>Choose your option</option>
													<option value="1">Option 1</option>
													<option value="2">Option 2</option>
													<option value="3">Option 3</option>
												</select>
												<label>Materialize Select</label>
											</div>
											<div class="input-field col s12 m6">
												<i class="material-icons prefix">list</i>
												<input type="text" id="autocomplete-input" class="validate" />
												<label for="autocomplete-input">Stock</label>
											</div>
										</div>
									</div>
									<div class="row center-align">
										<a href="#" class="modal-close btn waves-effect red tooltipped " data-tooltip="Cancelar">
											<i class="material-icons">cancel</i>
										</a>
										<button href="#modal-exito" type="submit" class="modal-close btn waves-effect green tooltipped modal-trigger" data-tooltip="Guardar">
											<i class="material-icons">save</i>
										</button>
									</div>
								</div>

								<!-- Modal Structure -->
								<div id="modal-eliminar" class="modal">
									<div class="modal-content center-align">
										<i class="large material-icons orange-text">info_outline</i>
										<h4>Advertencia</h4>
										<p>¿Desea eliminar el producto?</p>
									</div>
									<div class="modal-footer">
										<a href="#!" class="modal-close waves-effect waves-red red btn">Cancelar</a>
										<a href="#modal-exito" class="modal-close waves-effect waves-green btn modal-trigger">Eliminar</a>
									</div>
								</div>

								<!-- Modal Structure -->
								<div id="modal-exito" class="modal">
									<div class="modal-content center-align">
										<i class="large material-icons green-text">check_circle_outline</i>
										<h4>Exito</h4>
										<p>Accion exitosa</p>
									</div>
									<div class="modal-footer">
										<a href="#!" class="modal-close waves-effect waves-green btn">Aceptar</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- llaman librerias -->
	<script type="text/javascript" src="../../resources/js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="../../resources/js/materialize.js"></script>
	<script type="text/javascript" src="../../resources/js/productos.js"></script>
	<script type="text/javascript" src="../../resources/js/ini_imput.js"></script>
</body>

</html>