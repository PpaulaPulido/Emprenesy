INSERT INTO restaurantes (nombreresta, logo, tiporesta, descripresta, paginaresta, menu, horario, horarioApertura,
 horarioCierre, correoresta, telresta, fecha_publicacion, codadmin) 
VALUES ('Cantina La 15', 'galeriaRes/cantinala15.jpg', 'Comida Internacional', 'Cantina La 15 es un lugar vibrante que combina la auténtica cocina mexicana con entretenimiento en vivo. Ofrecen una experiencia gastronómica y artística inolvidable.',
 'https://www.cantinala15.com/', 'https://www.cantinala15.com/menu/', 'Abierto todos los días desde las 6:00 p. m.', '18:00:00', '21:45:00',
 null, ' 300 9133447', '2024-05-15', 1);
 
INSERT INTO redes_sociales (entidad_id, entidad_tipo, red, url) 
VALUES (1, 'restaurante', 'Instagram', 'https://www.instagram.com/cantinala15/?hl=es'),
       (1, 'restaurante', 'TikTok', 'https://www.tiktok.com/@cantinala15co?lang=es');

INSERT INTO galeriaresta (idresta, imagenresta, descripcion) 
VALUES (1, 'galeriaRes/cantina1.jpg', 'Imágen de restaurante'),
       (1, 'galeriaRes/cantina2.jpg', 'Imágen de restaurante'),
       (1, 'galeriaRes/cantina3.jpg', 'Imágen de restaurante'),
       (1, 'galeriaRes/cantina4.jpg', 'Imágen de restaurante');
INSERT INTO ubicacionresta (idresta, ubicacion) 
VALUES (1, 'Carrera 13 #83-57 Bogotá');

#**********************************************************************************************************************
INSERT INTO restaurantes (nombreresta, logo, tiporesta, descripresta, paginaresta, menu, horario, horarioApertura,
 horarioCierre, correoresta, telresta, fecha_publicacion, codadmin) 
VALUES ('Frenessí', 'galeriaRes/frenesi.jpg', 'Comida Internacional', 'Frenessí es un restaurante del Grupo Seratta que ofrece una experiencia gastronómica única. Con solo 16 puestos, te sumergirás en un mundo de realidad virtual mientras disfrutas de un menú experiencial que te llevará a lugares inimaginables.',
 'https://www.frenessi.co/', 'https://www.frenessi.co/service-page/menu-experiencial-above-and-below', 'Abierto todos los días', '18:00:00', '22:30:00',
 null, ' 311 4165534', '2024-05-15', 1);
 
INSERT INTO redes_sociales (entidad_id, entidad_tipo, red, url) 
VALUES (1, 'restaurante', 'Instagram', 'https://www.instagram.com/frenessi.universe/?hl=es'),
       (1, 'restaurante', 'TikTok', null);

INSERT INTO galeriaresta (idresta, imagenresta, descripcion) 
VALUES (1, 'galeriaRes/frenesi1.jpg', 'Imágen de restaurante'),
       (1, 'galeriaRes/frenesi2.jpg', 'Imágen de restaurante'),
       (1, 'galeriaRes/frenesi3.jpg', 'Imágen de restaurante'),
       (1, 'galeriaRes/frenesi4.jpg', 'Imágen de restaurante');
INSERT INTO ubicacionresta (idresta, ubicacion) 
VALUES (1, 'Autopista Norte No. 114 - 44, Bogotá');

SELECT * FROM redes_sociales
WHERE entidad_id = 6 AND entidad_tipo = 'restaurante';

#**********************************************************************************************************************
INSERT INTO emprendimientos (nombreempre, logo, tipoempre, descripempre, horarioempre, horarioApertura, 
horarioCierre, paginaempre, producempre, correoempre, telempre, fecha_publicacion, codadmin) 
VALUES ('Artesanías de Colombia.', 'galeriaEmprende/artesaniasColombia1.png', 'Artesanias', 'Artesanías de Colombia es una sociedad anónima que se dedica al comercio al por menor de otros artículos domésticos en establecimientos especializados. Su objetivo es resaltar la riqueza, diversidad y calidad de las artesanías de cada región y etnia del país', 
'Miércoles a viernes: 09:00 - 19:00,Sábado: 09:00 - 19:00,Domingo: 12:00 - 19:00', '09:00:00', '19:00:00', 'https://artesaniasdecolombia.com.co/PortalAC/General/template_index.jsf',
 'https://artesaniasdecolombia.com.co/PortalAC/Catalogo/CatalogoIndex.jsf', 'soytransparente@artesaniasdecolombia.com.co', '305 772 7539', '2024-05-15', 1);

INSERT INTO redes_sociales (entidad_id, entidad_tipo, red, url) 
VALUES (1, 'emprendimiento', 'Instagram', null),
       (1, 'emprendimiento', 'TikTok', null);
       
INSERT INTO galeriaempre (idempre, imagenempre, descripcion) 
VALUES (1, 'galeriaEmprende/artesaniasColombia2.jpg', 'Imagen del emprendimiento'),
       (1, 'galeriaEmprende/artesaniasColombia3.jpg', 'Imagen del emprendimiento'),
       (1, 'galeriaEmprende/artesaniasColombia4.jpg', 'Imagen del emprendimiento'),
       (1, 'galeriaEmprende/artesaniasColombia5.jpg', 'Imagen del emprendimiento');

INSERT INTO ubicacionempre (idempre, ubicacion) 
VALUES (1, 'Calle 74 No. 11-91, Bogotá'),(1, 'Carrera 11 No. 84 - 12, Bogotá');

#**********************************************************************************************************************
INSERT INTO emprendimientos (nombreempre, logo, tipoempre, descripempre, horarioempre, horarioApertura, 
horarioCierre, paginaempre, producempre, correoempre, telempre, fecha_publicacion, codadmin) 
VALUES ('Artesanías de Colombia.', 'galeriaEmprende/artesaniasColombia1.png', 'Artesanias', 'Artesanías de Colombia es una sociedad anónima que se dedica al comercio al por menor de otros artículos domésticos en establecimientos especializados. Su objetivo es resaltar la riqueza, diversidad y calidad de las artesanías de cada región y etnia del país', 
'Miércoles a viernes: 09:00 - 19:00,Sábado: 09:00 - 19:00,Domingo: 12:00 - 19:00', '09:00:00', '19:00:00', 'https://artesaniasdecolombia.com.co/PortalAC/General/template_index.jsf',
 'https://artesaniasdecolombia.com.co/PortalAC/Catalogo/CatalogoIndex.jsf', 'soytransparente@artesaniasdecolombia.com.co', '305 772 7539', '2024-05-15', 1);

INSERT INTO redes_sociales (entidad_id, entidad_tipo, red, url) 
VALUES (1, 'emprendimiento', 'Instagram', null),
       (1, 'emprendimiento', 'TikTok', null);
       
INSERT INTO galeriaempre (idempre, imagenempre, descripcion) 
VALUES (1, 'galeriaEmprende/artesaniasColombia2.jpg', 'Imagen del emprendimiento'),
       (1, 'galeriaEmprende/artesaniasColombia3.jpg', 'Imagen del emprendimiento'),
       (1, 'galeriaEmprende/artesaniasColombia4.jpg', 'Imagen del emprendimiento'),
       (1, 'galeriaEmprende/artesaniasColombia5.jpg', 'Imagen del emprendimiento');

INSERT INTO ubicacionempre (idempre, ubicacion) 
VALUES (1, 'Calle 74 No. 11-91, Bogotá'),(1, 'Carrera 11 No. 84 - 12, Bogotá');
