CREATE TABLE `clientes` (
  `id_cliente` INT(10) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(30),
  `telefono`  varchar(30),
  `eliminado` TINYINT DEFAULT 0
);

CREATE TABLE `cuenta` (
  `id_cuenta` INT(10) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_cliente` INT(10),
  `nombre_cliente` varchar(30),
  `total` DOUBLE(10,3),
  `fecha` datetime,
  `estado` TINYINT DEFAULT 0,
  `saldo_pendiente` DOUBLE(10,3),
  `saldo_pagado` DOUBLE(10,3),
  `responsable` varchar(255),
  `id_turno` INT(10),
  `observaciones` varchar(150),
  `eliminado` TINYINT DEFAULT 0
);

CREATE TABLE `detalle_cuenta` (
  `id_registro` INT(10) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_cuenta` INT(10),
  `id_producto` INT(5),
  `nombre_producto` varchar(20),
  `cantidad` INT(5),
  `valor` INT(8),
  `descuento_valor` DOUBLE(10,3),
  `descuento_porc` INT(3) DEFAULT 0,
  `valor_pagado` INT(8) DEFAULT 0,
  `pagado` TINYINT DEFAULT 0,
  `eliminado` TINYINT DEFAULT 0
);

CREATE TABLE `productos` (
  `id_producto` INT(5) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `valor` INT(10),
  `eliminado` TINYINT DEFAULT 0
);

CREATE TABLE `pagos` (
  `id_registro` INT(5) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_cuenta` INT(10),
  `id_detallecuenta` INT(10),
  `pago_efectivo` INT(8),
  `pago_transferencia` INT(8),
  `total_cuenta` INT(8),
  `devuelta` INT(8),
  `fecha` datetime
);

CREATE TABLE `turno` (
  `id_turno` INT(10) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `encargado` varchar(20) NOT NULL,
  `saldo_inicial` DOUBLE(10,3),
  `pagos_efectivo` DOUBLE(10,3),
  `pago_transferencia` DOUBLE(10,3),
  `fecha_inicio` datetime,
  `fecha_fin` datetime,
  `efectivo_cierre` DOUBLE(10,3),
  `egresos_efectivo` DOUBLE(10,3),
  `egresos_transferencias` DOUBLE(10,3),
  `observacion_apertura` varchar(200),
  `observacion_cierre` varchar(200)
);

CREATE TABLE `usuarios` (
  `id_usuario` INT(10) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `usuario` varchar(20),
  `contrasena` varchar(75),
  `nombre` varchar(20),
  `rol` varchar(20),
  `eliminado` TINYINT DEFAULT 0
);

CREATE TABLE `egresos` (
  `id_egreso` INT(10) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `concepto` varchar(20),
  `valor` DOUBLE(10.3),
  `eliminado` TINYINT DEFAULT 0,
  `fecha` datetime,
  `metodo_pago` varchar(20)
);

CREATE TABLE `detalle_egreso` (
  `id_registro` INT(10) UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_egreso` INT(10),
  `producto` varchar(40) NOT NULL,
  `valor` DOUBLE(10.3),
  `cantidad` INT(5)
);

ALTER TABLE `cuenta` ADD FOREIGN KEY (`id_turno`) REFERENCES `turno` (`id_turno`);

ALTER TABLE `detalle_cuenta` ADD FOREIGN KEY (`id_cuenta`) REFERENCES `cuenta` (`id_cuenta`);

ALTER TABLE `pagos` ADD FOREIGN KEY (`id_cuenta`) REFERENCES `cuenta` (`id_cuenta`);

ALTER TABLE `detalle_egreso` ADD FOREIGN KEY (`id_egreso`) REFERENCES `egresos` (`id_egreso`);

ALTER TABLE `egresos` ADD `observaciones` TEXT NULL;

INSERT productos (nombre,valor) VALUES ('A prueba de fuego',5000),('Absolut',120000),('Acuarimántima',14000),('Acuarimántima shot',6000),('Aguardiente Azul botella',60000),('Aguardiente Azul media',35000),('Aguardiente rojo botella',55000),('Aguardiente rojo media',30000),('Aguila',4500),('Aguila light',5000),('Baileys',100000),('Borra mentes',5000),('Boston Light medio',5500),('Boston medio',5500),('Buchanas master',245000),('Café Americano',2000),('Café con leche',3000),('Caipiriña',12000),('Caipiroska',12000),('Capuchino Caliente',5000),('Capuchino frío',9000),('Choclitos',7000),('Club doble malta',5000),('Club dorada',5000),('Club Negra',5000),('Club roja',5000),('coca cola',4000),('Costeña',4500),('Cuba Libre',10000),('Destornillador',12000),('Detodito',8000),('Disparo suicida',5000),('Dónde estoy',5000),('Expreso',2000),('Expreso Panna',2500),('Finca las moras Botella',68000),('Finca las moras Copa',10000),('Flor de Jamaica',3500),('Gato negro botella',53000),('Gato negro Copa',9000),('Gatorade',5000),('Gintonic',12000),('Gomivodka',12000),('Granizado de café',9000),('Hierbabuena',3000),('Jack Daniels Botella',170000),('Jack Daniels fire',170000),('Jack Daniels honey botella',170000),('Jager botella',150000),('Jagerbom',14000),('Jalisco',5000),('Jimador',140000),('Jose cuervo Botella',130000),('Jose cuervo Media',65000),('Kamikase',5000),('Limonada cerezada',9000),('Limonada frappé',9000),('Lucky medio',6500),('Malboro medio',6500),('Manzanilla',3000),('Margarita',12000),('Margarita cereza',14000),('Michelada ',7000),('Michelada Acuarimántima',9000),('Michelada de maracuyá ',8000),('Michelada de tamarindo',8000),('Michelada soda',6000),('Mini sunrise',5000),('Mojito',12000),('Nevado de naranja',9000),('Oreo Coffee',9000),('Papitas art grand',8000),('Papitas art med',6000),('Pilsen',4500),('Platanitos art grand',8000),('Platanitos art med',6000),('Poker',4500),('Red Bull',10000),('Ron medellín Botella',60000),('Ron medellín dorado',65000),('Ron medellín Media',32000),('RVC  botella 8 años',110000),('RVC botella',65000),('RVC botella 15 años',140000),('RVC botella 5 años ',78000),('RVC esencial botella',60000),('RVC esencial media',30000),('RVC media',35000),('RVC media 5 años',40000),('RVC media 8 años',60000),('Santa elena botella',50000),('Santa elena Copa',9000),('Smirnoff lulo',65000),('soda',4000),('Sunrise          ',12000),('Tengo miedo',7000),('Tropical',5000),('Viejo verde',5000),('Aguardiente Azul trago',4000),('Aguardiente rojo trago',4000),('Baileys Trago',12000),('Jack Daniels trago',8000),('Jager trago',8500),('Ron medellín trago',4500),('RVC trago',4000),('Tequila trago',4500),('Boston solo',700),('Lucky solo',800),('Malboro solo',800);

INSERT usuarios (usuario,contrasena,nombre,rol) VALUES ('richar12','$2y$10$Mn0JYRrL/0c08R20Jre1oOdhfG7xJt0AdAHvquBOYoYSw2iRgisO6','Richar C.','admon');

INSERT INTO pagos (id_cuenta,id_detallecuenta,pago_efectivo,pago_transferencia,total_cuenta,devuelta,fecha)
VALUES ('1','','10000','0','10000','0',NOW())
