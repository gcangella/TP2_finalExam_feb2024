const HandleError = require("../exceptions/handleError");
const { Libro, setEstado } = require("../models/libro");
const { repositorioLibros } = require("../repositories/libros");
const axios = require("axios");

const getLibros = function (req, res) {
  let libros = repositorioLibros;

  res.json(libros);
};

module.exports = {
  getLibrosController: getLibros,

  getLibroController: function (req, res, next) {
    let libros = repositorioLibros;
    const libro = libros.find((book) => req.params.codigo == book.codigo);

    if (libro === null || libro === undefined) {
      res.status(404);
      res.json({ message: "Libro no encontrado" });
    } else {
      res.status(200);
      res.json(libro);
    }
  },

  getAllLibrosEstadosController: function (req, res, next) {
    let libros = repositorioLibros;

    // Crear un objeto que agrupe los libros por estado
    let librosAgrupadosPorEstado = libros.reduce((acumulador, libro) => {
      const estado = libro.estado;

      if (!acumulador[estado]) {
        acumulador[estado] = [];
      }

      acumulador[estado].push({
        Código: libro.codigo,
        Titulo: libro.titulo,
        Estado: libro.estado,
      });

      return acumulador;
    }, {});

    // Convertir el objeto en un array de estados
    let estados = Object.keys(librosAgrupadosPorEstado).map((estado) => {
      return {
        [estado]: librosAgrupadosPorEstado[estado],
      };
    });

    res.status(200).json(estados);
  },

  devolverController: function (req, res, next) {
    let libros = repositorioLibros;

    const libro = libros.find((book) => req.params.codigo == book.codigo);

    if (libro != undefined) {
      if (libro.estado === "alquilado") {
        setEstado.call(libro, "disponible");
        res.status(200).json({
          mensaje: "Libro devuelvo exitosamente, se cambio estado a disponible",
        });
      } else {
        res.status(404).json({ msgError: "Libro no esta alquilado" });
      }
    } else {
      res.status(404).json({ msgError: "Libro ingresado incorrecto" });
    }
  },

  marcarNoAptoController: function (req, res, next) {
    let libros = repositorioLibros;

    const libro = libros.find((book) => req.params.codigo == book.codigo);

    if (libro != undefined) {
      if (libro.estado === "no-apto") {
        res.status(404).json({ msgError: "Libro ya esta en estado 'no-apto'" });
      } else {
        setEstado.call(libro, "no-apto");
        res.status(200).json({
          mensaje: `Libro ${libro.codigo} se marco como no "no-apto"`,
        });
      }
    } else {
      res.status(404).json({ msgError: "Libro ingresado incorrecto" });
    }
  },

  deleteLibroController: (req, res) => {
    try {
      const libroCodigo = parseInt(req.params.codigo);

      // Buscar el libro en el array
      const libroIndex = repositorioLibros.findIndex(
        (libro) => libro.codigo === libroCodigo
      );

      if (libroIndex !== -1) {
        // Si se encuentra el libro, eliminarlo del array
        const libroEliminado = repositorioLibros.splice(libroIndex, 1)[0];

        res.status(204).json({
          mensaje: `Libro eliminado correctamente: ${libroEliminado.codigo}`,
        });
      } else {
        throw new Error("Libro no encontrado");
      }
    } catch (e) {
      res.status(404).json({ msgError: "Libro no encontrado" });
    }
  },

  createLibroController: (req, res) => {
    const { titulo, autor } = req.body;
    const libro = new Libro({ titulo, autor });

    try {
      if (titulo === "" || autor === "") {
        throw new HandleError(`Los campos titulo y autor son obligatorios`);
      } else {
        repositorioLibros.push(libro);
        res.status(201).json(libro);
      }
    } catch (e) {
      res.status(404).json(e.getError());
      return;
    }
  },

  alquilarLibroController: async (req, res) => {
    const api = "https://libros.deno.dev/premios";

    const libroCodigo = Number(req.params.codigo);

    let libros = repositorioLibros;
    const libroAlquilar = repositorioLibros.find(
      (libro) => libro.codigo === libroCodigo
    );

    if (libroAlquilar != undefined && libroAlquilar.estado != "alquilado") {
      if (
        libroAlquilar.estado != "no-apto" ||
        libroAlquilar.estado != "alquilado"
      ) {
        try {
          const response = await axios.get(api);
          const jsonData = response.data;
          if (jsonData.premio) {
            libros = libros.filter((libro) => libro.codigo !== libroCodigo);

            repositorioLibros = repositorioLibros.filter(
              (libro) => libro.codigo !== libroCodigo
            );

            res.status(200).json({
              resultado: `¡Ganó el sorteo! Se dio de baja el libro ${libroAlquilar.codigo}`,
            });
          } else {
            setEstado.call(libroAlquilar, "alquilado");
            res.status(200).json({
              resultado: `Se cambio el estado al libro ${libroAlquilar.codigo} por ${libroAlquilar.estado}`,
            });
          }
        } catch (e) {
          res.status(500).json({ error: "Error en la solicitud" });
        }
      } else {
        res.status(404).json({
          resultado: `El libro: ${libroAlquilar.codigo}, tiene estado ${libroAlquilar.estado}, no se puede alquilar!`,
        });
      }
    } else {
      res.status(404).json({
        resultado: `El libro no existe o ya esta alquilado!`,
      });
    }
  },
};
