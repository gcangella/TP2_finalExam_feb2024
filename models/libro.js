class Libro {
  static ultimoCodigo = 0;

  constructor({ titulo, autor }) {
    this.codigo = Libro.obtenerSiguienteCodigo();
    this.titulo = titulo;
    this.autor = autor;
    this.estado = "disponible";
  }

  static obtenerSiguienteCodigo() {
    return ++Libro.ultimoCodigo;
  }
}

function setEstado(estado) {
  this.estado = estado;
}

module.exports = { Libro, setEstado };
