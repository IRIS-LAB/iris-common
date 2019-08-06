import { ErrorDO, TechnicalException } from '../../../../src'

describe('TechnicalException', () => {
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
