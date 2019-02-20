export class TechnicalException extends Error {
  constructor(errors, causedException) {
    super()
    this.errors = errors
    if (causedException) {
      this.stack += `\nCaused by : ${causedException.stack}`
    }
  }
}
