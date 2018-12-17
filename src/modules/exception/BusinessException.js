class BusinessException extends Error {
  constructor(code, message) {
    super(message)
    this.code = code
  }
  toString() {
    return '(' + this.code + ', ' + this.message + ')'
  }
}

module.exports.BusinessException = BusinessException
