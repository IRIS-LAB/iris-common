import { ErreurDO } from '../../../src/do'
import { IrisException } from '../../../src/exception'

describe('IrisException', () => {
  describe('message', () => {
    it('should contains all of libelleErreur', async () => {
      // GIVEN
      const myException = new IrisException([
        new ErreurDO('field1', 'code.error', 'cause 1 of exception'),
        new ErreurDO('field2', 'code2.error', 'cause 2 of exception')
      ])
      // WHEN
      const message = myException.message
      // THEN
      expect(message).toContain('cause 1 of exception')
      expect(message).toContain('cause 2 of exception')
    })
  })
})
