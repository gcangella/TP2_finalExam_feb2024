var express = require("express");
//todos los metodos que voy a llamar desde afuera los debo de meter en el const
const {
  getLibrosController,
  getLibroController,
  createLibroController,
  deleteLibroController,
  alquilarLibroController,
  getAllLibrosEstadosController,
  devolverController,
  marcarNoAptoController,
} = require("../controllers/libro");
var router = express.Router();

//aca defino con el "" como va a ser llamado desde el postman y lo vinculo con el metodo
router.get("/", getLibrosController); // Obtener todos los libros
router.post("/altaLibro", createLibroController); // Crear un nuevo libro
router.get("/listarLibrosEstado", getAllLibrosEstadosController); // Listar libros con estado
router.get("/alquilarLibro/:codigo", alquilarLibroController); // Alquilar un libro por codigo
router.get("/:codigo", getLibroController); // Alquilar un libro por codigo
router.delete("/bajaLibro/:codigo", deleteLibroController); // Borrar un libro
router.get("/devolver/:codigo", devolverController); // Devolver un libro
router.get("/marcarNoApto/:codigo", marcarNoAptoController); // Marcar noApto

module.exports = router;
