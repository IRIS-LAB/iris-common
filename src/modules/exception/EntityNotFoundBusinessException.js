//const BusinessException = require('./BusinessException.js')
import {BusinessException} from './BusinessException'

export class EntityNotFoundBusinessException extends BusinessException {
  constructor(error) {
    super([error])
  }

  /*
  get error() {
    return this.errors[0]
  }*/
}

//module.exports.EntityNotFoundBusinessException = EntityNotFoundBusinessException
