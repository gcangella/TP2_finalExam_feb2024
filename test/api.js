const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const app = require("../app");
const { expect } = chai;

chai.use(chaiHttp);
describe("TEST API", () => {
  describe("GET /listarLibrosEstado", () => {
    it("trae todos los libros del controlador", async () => {
      chai
        .request(app)
        .get("/libros/listarLibrosEstado")
        .end((_, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(JSON.parse(res.text)).to.eql([
            {
              disponible: [
                {
                  Código: 1,
                  Titulo: "Don Quijote de la Mancha",
                  Estado: "disponible",
                },
                {
                  Código: 2,
                  Titulo: "Historia de dos ciudades",
                  Estado: "disponible",
                },
                {
                  Código: 3,
                  Titulo: "El Señor de los Anillos",
                  Estado: "disponible",
                },
                {
                  Código: 4,
                  Titulo: "El principito",
                  Estado: "disponible",
                },
                {
                  Código: 5,
                  Titulo:
                    "Las aventuras de Alicia en el país de las maravillas",
                  Estado: "disponible",
                },
                {
                  Código: 6,
                  Titulo: "El guardián entre el centeno",
                  Estado: "disponible",
                },
                {
                  Código: 7,
                  Titulo: "El nombre de la rosa",
                  Estado: "disponible",
                },
                {
                  Código: 8,
                  Titulo: "El nombre de la rosa",
                  Estado: "disponible",
                },
                {
                  Código: 9,
                  Titulo: "Hello world 1",
                  Estado: "disponible",
                },
                {
                  Código: 10,
                  Titulo: "Hello world 2",
                  Estado: "disponible",
                },
                {
                  Código: 11,
                  Titulo: "Hello world 3",
                  Estado: "disponible",
                },
                {
                  Código: 12,
                  Titulo: "Hello world 4",
                  Estado: "disponible",
                },
              ],
            },
          ]);
        });
    });
  });

  describe("GET /libros/:codigo", () => {
    it("trae el libro especifico del codigo introducido", async () => {
      chai
        .request(app)
        .get("/libros/7")
        .end((_, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(JSON.parse(res.text)).to.eql({
            codigo: 7,
            titulo: "El nombre de la rosa",
            autor: "Umberto Eco",
            estado: "disponible",
          });
        });
    });

    it("da error si un libro no existe", async () => {
      chai
        .request(app)
        .get("/libros/666")
        .end((_, res) => {
          expect(res).to.have.status(404);
          expect(res).to.be.json;
          expect(JSON.parse(res.text)).to.eql({
            message: "Libro no encontrado",
          });
        });
    });
  });

  describe("DELETE /libros/bajaLibro/:codigo", () => {
    it("borra un libro con un codigo en especifico", () => {
      chai
        .request(app)
        .delete("/libros/bajaLibro/7")
        .end((_, res) => {
          expect(res).to.have.status(204);
        });
    });

    it("da error si un libro no se puede borrar", async () => {
      chai
        .request(app)
        .delete("/libros/666")
        .end((_, res) => {
          expect(res).to.have.status(404);
        });
    });
  });
});
