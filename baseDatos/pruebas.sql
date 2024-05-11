create database emprenesy;
drop database emprenesy;
use emprenesy;

create table usuario(
codusuario int primary key auto_increment,
nombreusu varchar (50) DEFAULT NULL,
apellidousu varchar(50) DEFAULT NULL,
telusu varchar(20) DEFAULT NULL,
fechanac_usu date DEFAULT NULL,
correousu varchar (50) DEFAULT NULL,
contrasena varchar(255) DEFAULT NULL
);

INSERT INTO usuario (nombreusu, apellidousu, telusu, fechanac_usu, correousu, contrasena) 
VALUES ('Juan', 'Pérez', '1234567890', '1990-01-15', 'juan.perez@example.com', 'ContraseñaSegura123');

create table administrador(
codadmin int primary key auto_increment,
nombreadmin varchar(50) DEFAULT NULL,
apellidoadmin varchar(50) DEFAULT NULL,
telfadmin varchar(15) DEFAULT NULL,
correoadmin varchar(50) DEFAULT NULL,
codsitio  int DEFAULT NULL,
fechanac_admin date DEFAULT NULL,
contrasena varchar(255) DEFAULT NULL
);

INSERT INTO administrador (nombreadmin, apellidoadmin, telfadmin, correoadmin, codsitio, fechanac_admin, contrasena) 
VALUES ('Juan', 'Pérez', '123-456-7890', 'juan.perez@example.com', 1, '1980-05-15', '12345');

create table datosAdmin(
	id_datosAdmin int primary key auto_increment,
    cod_admin int not null,
    direccion varchar(100) DEFAULT NULL,
    ciudad varchar(50)  DEFAULT NULL,
    descripcionAcerca text default NULL,
    sitioWeb varchar(250) default null,
    blog varchar(250) default null,
    FOREIGN KEY (cod_admin) REFERENCES administrador(codadmin)
);

CREATE TABLE fotos_admin (
    id_foto INT AUTO_INCREMENT PRIMARY KEY,
    cod_admin INT NOT NULL,
    ruta_foto VARCHAR(255) NOT NULL,
    tipo_foto ENUM('portada', 'general','perfil') DEFAULT 'general',
    FOREIGN KEY (cod_admin) REFERENCES administrador(codadmin)
);

CREATE TABLE fotos_usuario (
    id_foto INT AUTO_INCREMENT PRIMARY KEY,
    cod_usuario INT NOT NULL,
    ruta_foto VARCHAR(255) NOT NULL,
    tipo_foto ENUM('portada', 'general','perfil') DEFAULT 'general',
    FOREIGN KEY (cod_usuario) REFERENCES usuario(codusuario)
);

CREATE TABLE eventos(
    ideven INT PRIMARY KEY AUTO_INCREMENT,
    nombreeven VARCHAR(100) NOT NULL,
    logo VARCHAR(255) DEFAULT NULL,
    tipoevento VARCHAR(50) DEFAULT NULL,
    descripeven VARCHAR(250) DEFAULT NULL,
    paginaeven VARCHAR(250) DEFAULT NULL,
    boletaseven VARCHAR(250) DEFAULT NULL,
    infoAdicional VARCHAR(400)DEFAULT NULL,
    contacto VARCHAR(50)DEFAULT NULL,
    correoeven VARCHAR(100)DEFAULT NULL,
    fecha_publicacion DATE DEFAULT NULL,
    codadmin INT NOT NULL,
    FOREIGN KEY (codadmin) REFERENCES administrador(codadmin)
);

CREATE TABLE fechaseven(
    codfechas INT PRIMARY KEY AUTO_INCREMENT,
    ideven INT NOT NULL,
    fechaseven DATE DEFAULT NULL,
    horarioEntrada TIME DEFAULT NULL,
    horarioSalida TIME DEFAULT NULL,
    FOREIGN KEY (ideven) REFERENCES eventos(ideven)
);

CREATE TABLE redes_sociales (
    id_red_social INT AUTO_INCREMENT PRIMARY KEY,
    entidad_id INT DEFAULT NULL,
    entidad_tipo VARCHAR(50) DEFAULT NULL,  -- 'evento' o 'emprendimiento'
    red VARCHAR(50) DEFAULT NULL,
    url VARCHAR(250) DEFAULT NULL
);


CREATE TABLE galeriaeven(
    codgaleria INT PRIMARY KEY AUTO_INCREMENT,
    ideven INT,
    urlImagen VARCHAR(255) DEFAULT NULL,
    descripcion VARCHAR(255) DEFAULT NULL, 
    FOREIGN KEY (ideven) REFERENCES eventos(ideven)
);

create table ubicacioneven(
codubicacion int primary key auto_increment,
ideven int,
ubicacion varchar (200) DEFAULT NULL,
foreign key (ideven) references eventos(ideven)
);

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
nombreempre varchar(100) NOT NULL,
logo varchar(255) DEFAULT NULL,
tipoempre varchar(100) DEFAULT NULL,
descripempre varchar(250)DEFAULT NULL,
horarioempre varchar(100)DEFAULT NULL,
horarioApertura TIME DEFAULT NULL, 
horarioCierre TIME DEFAULT NULL,
paginaempre varchar(250)DEFAULT NULL,
producempre varchar(250)DEFAULT NULL,
correoempre varchar(50)DEFAULT NULL,
telempre varchar (20)DEFAULT NULL,
fecha_publicacion DATE DEFAULT NULL,
codadmin int,
foreign key (codadmin) references administrador (codadmin)
);

create table galeriaempre(
codgaleria int primary key auto_increment,
idempre int NOT NULL,
imagenempre varchar(255) DEFAULT NULL,
descripcion VARCHAR(255) DEFAULT NULL, 
foreign key (idempre) references emprendimientos (idempre)
);

create table ubicacionempre(
codubicacionE int primary key auto_increment,
idempre int NOT NULL,
ubicacion varchar(200) DEFAULT NULL,
foreign key (idempre) references emprendimientos (idempre)
);

CREATE TABLE restaurantes (
    idresta INT PRIMARY KEY AUTO_INCREMENT,
    nombreresta VARCHAR(100) NOT NULL,
    logo VARCHAR(255) DEFAULT NULL,
    tiporesta VARCHAR(250) DEFAULT NULL,
    descripresta VARCHAR(250) DEFAULT NULL,
    paginaresta VARCHAR(250) DEFAULT NULL,
    menu VARCHAR(255) DEFAULT NULL,
    horario VARCHAR(255) DEFAULT NULL,
    horarioApertura TIME DEFAULT NULL,
    horarioCierre TIME DEFAULT NULL,
    correoresta VARCHAR(50) DEFAULT NULL,
    telresta VARCHAR(20) DEFAULT NULL,
    fecha_publicacion DATE DEFAULT NULL,
    codadmin INT,
    FOREIGN KEY (codadmin) REFERENCES administrador(codadmin)
);

CREATE TABLE galeriaresta (
    codgaleria INT PRIMARY KEY AUTO_INCREMENT,
    idresta INT NOT NULL,
    imagenresta VARCHAR(255) DEFAULT NULL,
    descripcion VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (idresta) REFERENCES restaurantes(idresta)
);

CREATE TABLE ubicacionresta (
    codubicacion INT PRIMARY KEY AUTO_INCREMENT,
    idresta INT NOT NULL,
    ubicacion VARCHAR(200) DEFAULT NULL,
    FOREIGN KEY (idresta) REFERENCES restaurantes(idresta)
);
CREATE TABLE Resenas (
    id_resena INT AUTO_INCREMENT PRIMARY KEY,
    autor_id INT NOT NULL,
    autor_tipo ENUM('administrador', 'usuario') NOT NULL,
    entidad_id INT NOT NULL,
    entidad_tipo ENUM('evento', 'emprendimiento', 'restaurante') NOT NULL,
    calificacion INT NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    fecha_resena DATE NOT NULL,
    FOREIGN KEY (autor_id) REFERENCES usuario(codusuario),
    FOREIGN KEY (autor_id) REFERENCES administrador(codadmin),
    FOREIGN KEY (entidad_id) REFERENCES emprendimientos (idempre),
    FOREIGN KEY (entidad_id) REFERENCES eventos(ideven),
    FOREIGN KEY (entidad_id) REFERENCES restaurantes(idresta)
);

select * from usuario;
select * from administrador;

SELECT 
    ev.ideven,
    ev.nombreeven,
    ev.logo,
    ev.tipoevento,
    ev.descripeven,
    ev.paginaeven,
    ev.boletaseven,
    ev.infoAdicional,
    ev.contacto,
    ev.correoeven,
    ev.fecha_publicacion,
    adm.nombreadmin AS administrador,
    GROUP_CONCAT(DISTINCT fev.fechaseven SEPARATOR '; ') AS fechas_evento,
    GROUP_CONCAT(DISTINCT fev.horarioEntrada SEPARATOR '; ') AS horarios_entrada,
    GROUP_CONCAT(DISTINCT fev.horarioSalida SEPARATOR '; ') AS horarios_salida,
    GROUP_CONCAT(DISTINCT gal.urlImagen SEPARATOR '; ') AS imagenes_evento,
    GROUP_CONCAT(DISTINCT gal.descripcion SEPARATOR '; ') AS descripcion_imagenes,
    GROUP_CONCAT(DISTINCT ubi.ubicacion SEPARATOR '; ') AS ubicaciones_evento,
    GROUP_CONCAT(DISTINCT CONCAT(rs.red, ': ', rs.url) SEPARATOR '; ') AS redes_sociales
FROM 
    eventos ev
LEFT JOIN administrador adm ON ev.codadmin = adm.codadmin
LEFT JOIN fechaseven fev ON ev.ideven = fev.ideven
LEFT JOIN galeriaeven gal ON ev.ideven = gal.ideven
LEFT JOIN ubicacioneven ubi ON ev.ideven = ubi.ideven
LEFT JOIN redes_sociales rs ON ev.ideven = rs.entidad_id AND rs.entidad_tipo = 'evento'
GROUP BY
    ev.ideven
ORDER BY
    ev.fecha_publicacion DESC;

SELECT 
    r.idresta,
    r.nombreresta,
    r.logo,
    r.tiporesta,
    r.descripresta,
    r.paginaresta,
    r.menu,
    r.horario,
    r.horarioApertura,
    r.horarioCierre,
    r.correoresta,
    r.telresta,
    r.fecha_publicacion,
    adm.nombreadmin AS administrador,
    GROUP_CONCAT(DISTINCT gr.imagenresta SEPARATOR '; ') AS imagenes_restaurante,
    GROUP_CONCAT(DISTINCT gr.descripcion SEPARATOR '; ') AS descripcion_imagenes,
    GROUP_CONCAT(DISTINCT ur.ubicacion SEPARATOR '; ') AS ubicaciones_restaurante,
    GROUP_CONCAT(DISTINCT CONCAT(rs.red, ': ', rs.url) SEPARATOR '; ') AS redes_sociales
FROM 
    restaurantes r
LEFT JOIN administrador adm ON r.codadmin = adm.codadmin
LEFT JOIN galeriaresta gr ON r.idresta = gr.idresta
LEFT JOIN ubicacionresta ur ON r.idresta = ur.idresta
LEFT JOIN redes_sociales rs ON r.idresta = rs.entidad_id AND rs.entidad_tipo = 'restaurante'
GROUP BY
    r.idresta
ORDER BY
    r.fecha_publicacion DESC;

