class EntityNotFoundBusinessException extends BusinessException {
  constructor(error) {
    super([error])
  }

  get error() {
    return this.errors[0]
  }
}

module.exports.EntityNotFoundBusinessException = EntityNotFoundBusinessException
