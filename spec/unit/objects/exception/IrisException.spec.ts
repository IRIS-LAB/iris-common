import { ErrorDO, IrisException } from '../../../../src'

describe('IrisException', () => {
  describe('message', () => {
    it('should contains all of label', async () => {
      // GIVEN
      const myException = new IrisException([
        new ErrorDO('field1', 'code.error', 'cause 1 of exception'),
        new ErrorDO('field2', 'code2.error', 'cause 2 of exception')
      ])
      // WHEN
      const message = myException.message
      // THEN
      expect(message).toContain('cause 1 of exception')
      expect(message).toContain('cause 2 of exception')
    })
  })
})
