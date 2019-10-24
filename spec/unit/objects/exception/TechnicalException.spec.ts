import { ErrorDO, TechnicalException } from '../../../../src'

describe('TechnicalException', () => {
  describe('prototype', () => {
    it('should be prototype of TechnicalException', () => {
      try {
        const error = new ErrorDO('champErreur', 'code.error', 'label error')
        const causeError = new Error('a label')
        throw  new TechnicalException([error], causeError)
      } catch (e) {
        expect(e instanceof TechnicalException).toBeTruthy()
      }
    })
  })
  describe('stack', () => {
    it('display caused exception stack trace if inject', async () => {
      // GIVEN
      const error = new ErrorDO('champErreur', 'code.error', 'label error')
      const causeError = new Error('a label')
      const myException = new TechnicalException([error], causeError)
      // WHEN
      const myStack = myException.stack
      // THEN
      expect(myStack).toContain('a label')
    })
  })
})
