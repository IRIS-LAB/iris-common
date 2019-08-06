import { ErrorDO } from '../../../../src'

describe('ErrorDO', () => {
  describe('constructor', () => {
    it('should create new error with extra fields as data', async () => {
      expect(new ErrorDO('field', 'code', 'label', { path: ['path'], value: 'value', limit: 15 })).toEqual({
        field: 'field',
        code: 'code',
        label: 'label',
        path: ['path'],
        value: 'value',
        limit: 15
      })
    })

    it('should create new error with only path as data object', async () => {
      expect(new ErrorDO('field', 'code', 'label', { path: ['path'] })).toEqual({
        field: 'field',
        code: 'code',
        label: 'label',
        path: ['path']
      })
    })

    it('should create new error with only path as data object', async () => {
      expect(new ErrorDO('field', 'code', 'label', { value: 'value' })).toEqual({
        field: 'field',
        code: 'code',
        label: 'label',
        value: 'value'
      })
    })

    it('should create new error with only limit as data object', async () => {
      expect(new ErrorDO('field', 'code', 'label', { limit: 5 })).toEqual({
        field: 'field',
        code: 'code',
        label: 'label',
        limit: 5
      })
    })
  })
})
