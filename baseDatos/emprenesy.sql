create database emprenesy;

use emprenesy;

create table usuario(
codusuario int primary key auto_increment,
nombreusu varchar (50),
apellidousu varchar(50),
telusu varchar(20),
fechanac_usu date,
correousu varchar (50),
roles varchar(50),
contrasena varchar(255)
);
CREATE TABLE fotos_usuario (
    id_foto INT AUTO_INCREMENT PRIMARY KEY,
    cod_usuario INT,
    ruta_foto VARCHAR(255) NOT NULL,
    tipo_foto ENUM('portada', 'general','perfil') DEFAULT 'general',
    FOREIGN KEY (cod_usuario) REFERENCES usuario(cod_usuario)
);
create table administrador(
codadmin int primary key auto_increment,
nombreadmin varchar(50),
apellidoadmin varchar(50),
telfadmin varchar(15),
correoadmin varchar(50),
codsitio  int,
fechanac_admin date
);

CREATE TABLE restaurantes (
    idresta INT PRIMARY KEY AUTO_INCREMENT,
    nombreresta VARCHAR(100),
    logo blob,
    descripresta VARCHAR(250),
    paginaresta VARCHAR(250),
    productoresta VARCHAR(250),
    comidaresta VARCHAR(250),
    correoresta VARCHAR(50),
    telresta VARCHAR(20),
    codadmin INT,
    FOREIGN KEY (codadmin) REFERENCES administrador(codadmin)
);

create table eventos(
ideven int primary key auto_increment,
nombreeven varchar(100),
logo blob,
descripeven varchar(250),
boletaseven varchar (250),
paginaeven varchar(250),
infoAdicional VARCHAR(400),
correoeven varchar(50),
televen varchar (20),
codadmin int,
foreign key (codadmin) references administrador (codadmin)
);

create table emprendimientos(
idempre int primary key auto_increment,
nombreempre varchar(100),
logo blob,
tipoempre varchar(100),
descripempre varchar(250),
paginaempre varchar(250),
producempre varchar(250),
correoempre varchar(50),
telempre varchar (20),
codadmin int,
foreign key (codadmin) references administrador (codadmin)
);

create table galeriaresta(
codgaleria int primary key auto_increment,
idresta int,
imagenresta blob,
foreign key (idresta) references restaurantes (idresta)
);

create table galeriaeven(
codgaleria int primary key auto_increment,
ideven int,
imageneven blob,
foreign key (ideven) references eventos(ideven)
);

create table galeriaempre(
codgaleria int primary key auto_increment,
idempre int,
imagenempre blob,
foreign key (idempre) references emprendimientos (idempre)
);

create table ubicacionresta(
codubicacion int primary key auto_increment,
idresta int,
ubicacion varchar (50),
foreign key (idresta) references restaurantes (idresta)
);
create table ubicacioneven(
codubicacion int primary key auto_increment,
ideven int,
ubicacion varchar (50),
foreign key (ideven) references eventos(ideven)
);

create table ubicacionempre(
codubicacion int primary key auto_increment,
idempre int,
ubicacion varchar (50),
foreign key (idempre) references emprendimientos (idempre)
);


create table horarioresta(
codhorario int primary key auto_increment,
idresta int,
horarioresta varchar (50),
foreign key (idresta) references restaurantes (idresta)
);

create table fechaseven(
codfechas int primary key auto_increment,
ideven int,
fechaseven date,
horarioeven varchar (250),
foreign key (ideven) references eventos(ideven)
);

create table fechasempre(
codfechas int primary key auto_increment,
idempre int,
fechasempre date,
horarioempre varchar (250),
foreign key (idempre) references emprendimientos (idempre)
);


create table redes(
codredes int primary key auto_increment,
tipored varchar (30),
urlred text,
idresta int,
ideven int,
idempre int,
foreign key(idresta)references restaurantes(idresta),
foreign key (ideven)references eventos (ideven),
foreign key(idempre)references emprendimientos(idempre)
);

drop table if exists fechasresta;

create table publi_resta(
codpubli int primary key auto_increment,
descrip_publi varchar(250),
codgaleria int,
fechapubli date,
idresta int,
codadmin int,
foreign key (idresta) references restaurantes (idresta),
foreign key (codadmin)references administrador (codadmin),
foreign key (codgaleria)references galeriaresta(codgaleria)
);

create table publi_even(
codpubli int primary key auto_increment,
descrip_publi varchar(250),
codgaleria int,
fechapubli date,
ideven int,
codadmin int,
foreign key (ideven) references eventos (ideven),
foreign key (codadmin)references administrador (codadmin),
foreign key (codgaleria)references galeriaeven(codgaleria)
);

create table publi_empre(
codpubli int primary key auto_increment,
descrip_publi varchar(250),
codgaleria int,
fechapubli date,
idempre int,
codadmin int,
foreign key (idempre) references emprendimientos (idempre),
foreign key (codadmin)references administrador (codadmin),
foreign key (codgaleria)references galeriaempre(codgaleria)
);

create table favoritos(
codfav int primary key auto_increment,
codusuario int,
codpubli_resta int,
codpubli_even int,
codpubli_empre int,
idresta int,
ideven int,
idempre int,
foreign key (codusuario) references usuario (codusuario),
foreign key (codpubli_resta) references publi_resta(codpubli),
foreign key (codpubli_even) references publi_even(codpubli),
foreign key (codpubli_empre) references publi_empre(codpubli),
foreign key (idresta) references restaurantes (idresta),
foreign key (ideven) references eventos(ideven),
foreign key (idempre) references emprendimientos (idempre)
);

show tables from emprenesy;


