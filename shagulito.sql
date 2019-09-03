-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-09-2019 a las 21:57:30
-- Versión del servidor: 10.1.37-MariaDB
-- Versión de PHP: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `shagulito`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE `cargos` (
  `id_cargo` int(11) NOT NULL,
  `nombre_cargo` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cargos`
--

INSERT INTO `cargos` (`id_cargo`, `nombre_cargo`) VALUES
(1, 'Administrador'),
(2, 'Cajero'),
(5, 'cargado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre_categoria` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion_categoria` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `estado_categoria` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre_categoria`, `descripcion_categoria`, `estado_categoria`) VALUES
(1, 'Postres', 'Postres de la mejor calidad.', 0),
(3, 'Menudo', 'Pan para vender menudeado', 1),
(4, 'Pastel', 'Delicioso para toda ocasión', 0),
(5, 'Frances', 'Lo mejor para acompañar tu desayuno', 1),
(6, 'Dulce', 'Delicioso compañero de un café negro', 1),
(7, 'Simple', 'Lo mejor para acompañar una bebida dulce', 0),
(8, 'Procesado', 'Gran variedad para tu elección', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre_cliente` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `apellido_cliente` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `telefono_cliente` int(11) NOT NULL,
  `correo_cliente` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `id_empleado` int(11) UNSIGNED NOT NULL,
  `nombre_empleado` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `apellido_empleado` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `telefono_empleado` int(11) NOT NULL,
  `correo_empleado` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `alias_empleado` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `clave_empleado` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `foto_empleado` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `estado_empleado` tinyint(1) NOT NULL,
  `id_cargo` int(11) NOT NULL,
  `intentos` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`id_empleado`, `nombre_empleado`, `apellido_empleado`, `telefono_empleado`, `correo_empleado`, `alias_empleado`, `clave_empleado`, `foto_empleado`, `estado_empleado`, `id_cargo`, `intentos`) VALUES
<<<<<<< HEAD
(1, 'Josué', 'Durán', 12345678, 'JD@Shagulito.com', 'JD', '$2y$10$ZLr35pikwC0NZ0FfcLE3QeJfCKmx1TYMwCt0R6nfdu7WSEGQFAiIq', '5d6ec3e8ec9ee.jpg', 0, 0, 0),
(2, 'Daniel', 'Hernandez', 12345678, 'Daniel@shagulito.com', 'Daniel', '$2y$10$R8qzEihfDKbAPbhsL3H6HOLHXNjBuCYtkmgc5Kbf24MbgqTyh9Aa2', '5d5106f21b9f1.png', 0, 1, 0),
(3, 'Gabriel', 'Monterrosa', 12345678, 'Gabriel@shagulito.com', 'Gabriel', '$2y$10$AnymL7hSWHSXliHBsybyEOhMyITxHwoD9IEMXSKa4IAqEfzSWDHO6', '5d510751c536b.jpg', 0, 1, 0),
(4, 'Steven', 'Diaz', 12345678, 'StevenBDF@shagulito.com', 'StevenBDF', '$2y$10$70QM5WSWvIBr3kU0JhUJ5uDnPdrK3zRiyLezKDHi1ZWsS3aqVO9RG', '5d5107f31cdb1.jpg', 0, 2, 0),
(5, 'Boris', 'Huezo', 12345678, 'Boris@shagulito.com', 'Boris', '$2y$10$5zSOzX6DjdEb4kcPDGn1.em7yADauX8h3vaEO/TIuuPEo96.OSDJ6', '5d51083c06711.jpg', 0, 2, 0);
=======
(1, 'Josue', 'Duran', 12345678, 'JD@shagulito.com', 'JD', '$2y$10$60aPhgrjwgvtY64yij9OO.7ZMYybJyxn3YrObWRVCq8STD.3A5itG', '5d2df4c0713fb.jpg', 0, 1, 3),
(6, 'Daniel', 'Hernandez', 12345678, 'Daniel@shagulito.com', 'Daniel', '$2y$10$R8qzEihfDKbAPbhsL3H6HOLHXNjBuCYtkmgc5Kbf24MbgqTyh9Aa2', '5d5106f21b9f1.png', 0, 1, 1),
(7, 'Gabriel', 'Monterrosa', 12345678, 'Gabriel@shagulito.com', 'Gabriel', '$2y$10$AnymL7hSWHSXliHBsybyEOhMyITxHwoD9IEMXSKa4IAqEfzSWDHO6', '5d510751c536b.jpg', 0, 1, 0),
(8, 'Steven', 'Diaz', 12345678, 'StevenBDF@shagulito.com', 'StevenBDF', '$2y$10$70QM5WSWvIBr3kU0JhUJ5uDnPdrK3zRiyLezKDHi1ZWsS3aqVO9RG', '5d5107f31cdb1.jpg', 0, 2, 0),
(9, 'Boris', 'Huezo', 12345678, 'Boris@shagulito.com', 'Boris', '$2y$10$I7MDFMKFTxNpNVFcb0izWOqCq8vwH8u6PmkDnMr6av/hsgBmKvAtm', '', 0, 2, 2);
>>>>>>> 8b1bb2ebb06fe266f660f2e3d4fd49a479eed278

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventarios`
--

CREATE TABLE `inventarios` (
  `id_inventario` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad_inventario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `inventarios`
--

INSERT INTO `inventarios` (`id_inventario`, `id_producto`, `cantidad_inventario`) VALUES
(1, 6, 50),
(2, 8, 35),
(3, 9, 20),
(4, 10, 60),
(5, 11, 65),
(6, 12, 45),
(7, 13, 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lotes`
--

CREATE TABLE `lotes` (
  `id_lote` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad_xlote` int(11) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `fecha_caducidad` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos`
--

CREATE TABLE `permisos` (
  `id_permiso` int(11) NOT NULL,
  `nombre_permiso` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `id_cargo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre_producto` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion_producto` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `precio_producto` decimal(5,2) NOT NULL,
  `imagen_producto` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `estado_producto` tinyint(1) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre_producto`, `descripcion_producto`, `precio_producto`, `imagen_producto`, `estado_producto`, `id_categoria`) VALUES
(6, 'margarita', 'Lido', '1.00', '5d2df4c0713fb.jpg', 0, 8),
(8, 'margarita', 'Sinai', '3.00', '5d36118d025fe.jpg', 1, 8),
(9, 'Corriente', 'Rosvil', '0.05', '5d5103d83b739.jpg', 1, 5),
(10, 'Tres leches', 'Sinai', '1.25', '5d5104d05ff22.jpg', 0, 1),
(11, 'Viejita', 'Sinai', '0.25', '5d51054a44980.png', 0, 6),
(12, 'Torta de leche', 'Rosvil', '0.40', '5d5109fdc708f.jpg', 0, 6),
(13, 'Oreja', 'Rosvil', '0.30', '5d510a98a2249.png', 1, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `monto_venta` decimal(5,2) NOT NULL,
  `fecha_venta` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id_venta`, `id_empleado`, `monto_venta`, `fecha_venta`) VALUES
(1, 9, '362.00', '2014-01-15'),
(2, 8, '201.30', '2014-02-13'),
(3, 8, '155.55', '2014-03-11'),
(4, 6, '365.50', '2014-04-22'),
(5, 6, '421.20', '2014-05-22'),
(6, 6, '285.20', '2014-06-14'),
(7, 7, '311.20', '2014-07-30'),
(8, 7, '260.20', '2014-08-16'),
(9, 7, '301.90', '2014-09-23'),
(10, 7, '141.10', '2014-10-02'),
(11, 1, '663.00', '2014-11-20'),
(12, 1, '544.20', '2014-12-12'),
(13, 1, '352.40', '2015-01-20'),
(14, 1, '674.20', '2015-02-22'),
(15, 1, '700.00', '2015-03-11');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id_cargo`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`id_empleado`),
  ADD KEY `id_cargo` (`id_cargo`);

--
-- Indices de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  ADD PRIMARY KEY (`id_inventario`);

--
-- Indices de la tabla `lotes`
--
ALTER TABLE `lotes`
  ADD PRIMARY KEY (`id_lote`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `permisos`
--
ALTER TABLE `permisos`
  ADD PRIMARY KEY (`id_permiso`),
  ADD KEY `id_cargo` (`id_cargo`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `id_empleado` (`id_empleado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
<<<<<<< HEAD
  MODIFY `id_cargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

=======
  MODIFY `id_cargo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
>>>>>>> 8b1bb2ebb06fe266f660f2e3d4fd49a479eed278
--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
<<<<<<< HEAD
  MODIFY `id_empleado` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

=======
  MODIFY `id_empleado` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
>>>>>>> 8b1bb2ebb06fe266f660f2e3d4fd49a479eed278
--
-- AUTO_INCREMENT de la tabla `lotes`
--
ALTER TABLE `lotes`
  MODIFY `id_lote` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `permisos`
--
ALTER TABLE `permisos`
  MODIFY `id_permiso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `lotes`
--
ALTER TABLE `lotes`
  ADD CONSTRAINT `lotes_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_categoria`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
