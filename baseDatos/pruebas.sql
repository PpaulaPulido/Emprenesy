create database emprenesy;
drop database emprenesy;
use emprenesy;

create table usuario(
codusuario int primary key auto_increment,
nombreusu varchar (50),
apellidousu varchar(50),
telusu varchar(20),
fechanac_usu date,
correousu varchar (50),
contrasena varchar(255)
);
INSERT INTO usuario (nombreusu, apellidousu, telusu, fechanac_usu, correousu, contrasena) 
VALUES ('Juan', 'Pérez', '1234567890', '1990-01-15', 'juan.perez@example.com', 'ContraseñaSegura123');

select * from usuario;
select * from administrador;

create table administrador(
codadmin int primary key auto_increment,
nombreadmin varchar(50),
apellidoadmin varchar(50),
telfadmin varchar(15),
correoadmin varchar(50),
codsitio  int,
fechanac_admin date,
contrasena varchar(255)
);
INSERT INTO administrador (nombreadmin, apellidoadmin, telfadmin, correoadmin, codsitio, fechanac_admin, contrasena) 
VALUES ('Juan', 'Pérez', '123-456-7890', 'juan.perez@example.com', 1, '1980-05-15', 'password123');

select * from administrador;

CREATE TABLE fotos_admin (
    id_foto INT AUTO_INCREMENT PRIMARY KEY,
    cod_admin INT,
    ruta_foto VARCHAR(255) NOT NULL,
    tipo_foto ENUM('portada', 'general','perfil') DEFAULT 'general',
    FOREIGN KEY (cod_admin) REFERENCES administrador(codadmin)
);
delete from fotos_Admin;
select * from fotos_admin;

CREATE TABLE fotos_usuario (
    id_foto INT AUTO_INCREMENT PRIMARY KEY,
    cod_usuario INT,
    ruta_foto VARCHAR(255) NOT NULL,
    tipo_foto ENUM('portada', 'general','perfil') DEFAULT 'general',
    FOREIGN KEY (cod_usuario) REFERENCES usuario(codusuario)
);

select * from usuario;
select * from fotos_usuario;


delete from fotos_usuario;
CREATE TABLE eventos(
    ideven INT PRIMARY KEY AUTO_INCREMENT,
    nombreeven VARCHAR(100),
    logo VARCHAR(255),
    tipoevento VARCHAR(50),
    descripeven VARCHAR(250),
    paginaeven VARCHAR(250),
    boletaseven VARCHAR(250),
    infoAdicional VARCHAR(400),
    contacto VARCHAR(50),
    correoeven VARCHAR(100),
    codadmin INT,
    FOREIGN KEY (codadmin) REFERENCES administrador(codadmin)
);
select * from eventos;
select nombreeven,logo,tipoevento from eventos where codadmin = 1;
CREATE TABLE fechaseven(
    codfechas INT PRIMARY KEY AUTO_INCREMENT,
    ideven INT,
    fechaseven DATE,
    horarioEntrada TIME,
    horarioSalida TIME,
    FOREIGN KEY (ideven) REFERENCES eventos(ideven)
);
SELECT * FROM fechaseven WHERE ideven = 1;

CREATE TABLE redes_sociales (
    id_red_social INT AUTO_INCREMENT PRIMARY KEY,
    entidad_id INT,
    entidad_tipo VARCHAR(50),  -- 'evento' o 'emprendimiento'
    red VARCHAR(50),
    url VARCHAR(250)
);


CREATE TABLE galeriaeven(
    codgaleria INT PRIMARY KEY AUTO_INCREMENT,
    ideven INT,
    urlImagen VARCHAR(255),
    descripcion VARCHAR(255) DEFAULT NULL, 
    FOREIGN KEY (ideven) REFERENCES eventos(ideven)
);

SELECT * FROM galeriaeven WHERE ideven = 5;

create table ubicacioneven(
codubicacion int primary key auto_increment,
ideven int,
ubicacion varchar (200),
foreign key (ideven) references eventos(ideven)
);
SELECT * FROM ubicacioneven WHERE ideven = 2;


CREATE TABLE Favoritos (
    idFavorito INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT,
    idItem INT,
    tipoItem VARCHAR(50),  -- 'evento', 'restaurante', 'emprendimiento'
    fechaFavorito TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario)
);

create table emprendimientos(
idempre int primary key auto_increment,
nombreempre varchar(100),
logo varchar(255),
tipoempre varchar(100),
descripempre varchar(250),
horarioempre varchar(100),
horarioApertura TIME, 
horarioCierre TIME,
paginaempre varchar(250),
producempre varchar(250),
correoempre varchar(50),
telempre varchar (20),
codadmin int,
foreign key (codadmin) references administrador (codadmin)
);
create table galeriaempre(
codgaleria int primary key auto_increment,
idempre int,
imagenempre varchar(255),
descripcion VARCHAR(255) DEFAULT NULL, 
foreign key (idempre) references emprendimientos (idempre)
);

create table ubicacionempre(
codubicacionE int primary key auto_increment,
idempre int,
ubicacion varchar(200),
foreign key (idempre) references emprendimientos (idempre)
);





