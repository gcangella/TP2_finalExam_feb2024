const { Libro } = require("../models/libro");

const repositorioLibros = [
  new Libro({
    codigo: 1,
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
  }),
  new Libro({
    codigo: 2,
    titulo: "Historia de dos ciudades",
    autor: "Charles Dickens",
  }),
  new Libro({
    codigo: 3,
    titulo: "El Señor de los Anillos",
    autor: "J. R. R. Tolkien",
  }),
  new Libro({
    codigo: 4,
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
  }),
  new Libro({
    codigo: 5,
    titulo: "Las aventuras de Alicia en el país de las maravillas",
    autor: "Lewis Carroll",
  }),
  new Libro({
    codigo: 6,
    titulo: "El guardián entre el centeno",
    autor: "J. D. Salinger",
  }),
  new Libro({
    codigo: 7,
    titulo: "El nombre de la rosa",
    autor: "Umberto Eco",
  }),
  new Libro({
    codigo: 7,
    titulo: "El nombre de la rosa",
    autor: "Umberto Eco",
  }),
  new Libro({
    codigo: 8,
    titulo: "Hello world 1",
    autor: "Developer 1.0",
  }),
  new Libro({
    codigo: 9,
    titulo: "Hello world 2",
    autor: "Developer 2.0",
  }),
  new Libro({
    codigo: 10,
    titulo: "Hello world 3",
    autor: "Developer 3.0",
  }),
  new Libro({
    codigo: 11,
    titulo: "Hello world 4",
    autor: "Developer 4.0",
  }),
];

module.exports = {
  repositorioLibros,
};
