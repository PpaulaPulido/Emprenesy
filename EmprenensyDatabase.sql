create database emprenesy;
drop database emprenesy;
use emprenesy;

create table restaurantes(
idresta int primary key auto_increment,
nombreresta varchar(100),
horarioresta varchar(100),
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




create table eventos(
ideven int primary key auto_increment,
nombreeven varchar(100),
fechaeven date,
horarioeven varchar(50),

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



create table emprendimientos(
idempre int primary key auto_increment,
nombreempre varchar(100),
tipoempre varchar(100),
descripempre varchar(250),
horarioempre varchar(50),
paginaempre varchar(250),
correoempre varchar(50),
telempre varchar (20),
nosotrosresta text

);
alter table emprendimientos drop column ubicacionempre;

alter table emprendimientos add column codadmin int;
alter table emprendimientos add constraint fk_emprendimientos_codadmin foreign key (codadmin) references administrador (codadmin);


create table administrador(
codadmin int primary key auto_increment,
nombreadmin varchar(50),
telfadmin varchar(15),
correoadmin varchar(50),
tipositio varchar(20),
codsitio  int,
nombresitio varchar(30)
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





show tables from emprenesy;
