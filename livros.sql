CREATE DATABASE IF NOT EXISTS `livros`;

USE `livros`;

CREATE TABLE livros (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(255),
  autor VARCHAR(255),
  genero VARCHAR(255),
  imagemCapa VARCHAR(255)
);

CREATE TABLE capitulos (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(255),
  numCapitulo INT,
  idLivro INT,
  FOREIGN KEY (idLivro) REFERENCES livros(id)
);

CREATE TABLE paginas (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  numPagina INT,
  imagem VARCHAR(255),
  idCapitulo INT ,
  FOREIGN KEY (idCapitulo) REFERENCES capitulos(id)
);
