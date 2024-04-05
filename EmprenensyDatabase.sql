create database emprenesy;
drop database emprenesy;
use emprenesy;

create table restaurantes(
idresta int primary key auto_increment,
nombreresta varchar(100),

descripresta varchar(250),
paginaresta varchar(250),
comidaresta varchar (250),
correoresta varchar(50),
telresta varchar (20),
redesresta text
);
describe restaurantes;
alter table restaurantes add column codadmin int;
alter table restaurantes add constraint fk_restaurantes_codadmin foreign key (codadmin) references administrador (codadmin);


alter table restaurantes drop column horarioresta;

create table eventos(
ideven int primary key auto_increment,
nombreeven varchar(100),


descripeven varchar(250),
boletaseven varchar (250),
paginaeven varchar(250),
correoeven varchar(50),
televen varchar (20),
redeseven text

);
describe eventos;
alter table eventos add column codadmin int;
alter table eventos add constraint fk_eventos_codadmin foreign key (codadmin) references administrador (codadmin);
alter table eventos drop column  fechaeven;


create table emprendimientos(
idempre int primary key auto_increment,
nombreempre varchar(100),
tipoempre varchar(100),
descripempre varchar(250),

paginaempre varchar(250),
correoempre varchar(50),
telempre varchar (20),
nosotrosresta text

);
alter table emprendimientos drop column ubicacionempre;
alter table emprendimientos drop column horarioempre;

alter table emprendimientos add column codadmin int;
alter table emprendimientos add constraint fk_emprendimientos_codadmin foreign key (codadmin) references administrador (codadmin);


create table administrador(
codadmin int primary key auto_increment,
nombreadmin varchar(50),
apellidoadmin varchar(50),
telfadmin varchar(15),
correoadmin varchar(50),
codsitio  int,
fechanac_admin date,
nombresitio varchar(30)
);
alter table administrador drop column tipositio;
alter table administrador add column apellidoadmin varchar(50);

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
fechaseven varchar (50),
horarioeven varchar (250),
foreign key (ideven) references eventos(ideven)
);

create table fechasempre(
codfechas int primary key auto_increment,
idempre int,
fechasempre varchar (50),
horarioempre varchar (250),
foreign key (idempre) references emprendimientos (idempre)
);


alter table fechasempre add column horarioempre varchar (250);
alter table fechaseven add column horarioeven varchar (250);


drop table if exists fechasresta;

use emprenesy;

create table usuario(
codusuario int primary key auto_increment,
nombreusu varchar (50),
apellidousu varchar(50),
telusu varchar(20),
fechanac_usu date,
correousu varchar (50)
);
alter table usuario add column apellidousu varchar(50);
alter table usuario add column fechanac_usu date;
alter table administrador add column fechanac_admin date;

show tables from emprenesy;
