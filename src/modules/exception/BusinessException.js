export class BusinessException extends Error {
  constructor(errors) {
    super()
    this.errors = errors
  }
}
