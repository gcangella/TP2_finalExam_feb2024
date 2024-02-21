class HandleError extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.errorMsg = mensaje;
  }

  getError() {
    return { errorMsg: this.errorMsg };
  }
}

module.exports = HandleError;
