//const BusinessException = require('./BusinessException.js')
import {BusinessException} from './BusinessException'

export class EntityNotFoundBusinessException extends BusinessException {
  constructor(error) {
    super([error])
  }
}
