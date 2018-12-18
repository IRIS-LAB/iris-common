export class ErrorDO {
  constructor(errorField, errorCode, errorLabel) {
    this.errorField = errorField
    this.errorCode = errorCode
    this.errorLabel = errorLabel
  }

  get errorField() {
    return this.errorField
  }

  set errorField(errorField) {
    this.errorField = errorField
  }

  get errorCode() {
    return this.errorCode
  }

  set errorCode(errorCode) {
    this.errorCode = errorCode
  }
  
  get errorLabel() {
    return this.errorLabel
  }

  set errorLabel(errorLabel) {
    this.errorLabel = errorLabel
  }


}

module.exports.ErrorDO = ErrorDO