export class TechnicalException extends Error {
  constructor(errors) {
    super()
    this.errors = errors
  }

  /*
  get errors() {
    return this.errors
  }*/
}

// module.exports.TechnicalException = TechnicalException
