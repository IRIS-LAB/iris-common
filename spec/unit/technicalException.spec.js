import { TechnicalException } from '~/modules/exception/TechnicalException'
import { ErreurDO } from '../../src/modules/objects/ErreurDO'

describe('TechnicalException', () => {
  describe('stack', () => {
    it('display caused exception stack trace if inject', async () => {
      // GIVEN
      const error = new ErreurDO('field', 'code.error', 'label error')
      const causeError = new Error('a message')
      const myException = new TechnicalException(error, causeError)
      // WHEN
      const myStack = myException.stack
      // THEN
      console.log(myStack)
      expect(myStack).toContain('a message')
    })
  })
})
