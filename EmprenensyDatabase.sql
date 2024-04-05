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
telresta varchar (20)

);
describe restaurantes;
alter table restaurantes add column codadmin int;
alter table restaurantes add constraint fk_restaurantes_codadmin foreign key (codadmin) references administrador (codadmin);
alter table restaurantes drop column redesresta;


alter table restaurantes drop column horarioresta;

create table eventos(
ideven int primary key auto_increment,
nombreeven varchar(100),


descripeven varchar(250),
boletaseven varchar (250),
paginaeven varchar(250),
correoeven varchar(50),
televen varchar (20)

);
describe eventos;
alter table eventos add column codadmin int;
alter table eventos add constraint fk_eventos_codadmin foreign key (codadmin) references administrador (codadmin);
alter table eventos drop column  fechaeven;
alter table eventos drop column redeseven;

create table emprendimientos(
idempre int primary key auto_increment,
nombreempre varchar(100),
tipoempre varchar(100),
descripempre varchar(250),

paginaempre varchar(250),
correoempre varchar(50),
telempre varchar (20)

);
alter table emprendimientos drop column ubicacionempre;
alter table emprendimientos drop column horarioempre;
alter table emprendimientos drop column nosotrosresta;
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

use emprenesy;

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




 drop table if exists publi_resta;


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
