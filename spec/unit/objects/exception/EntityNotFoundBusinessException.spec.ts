import { BusinessException, EntityNotFoundBusinessException, ErrorDO, IrisException } from '../../../../src'

describe('EntityNotFoundBusinessException', () => {
  describe('prototype', () => {
    it('should be prototype of EntityNotFoundBusinessException in sync fct', () => {
      try {
        const error = new ErrorDO('champErreur', 'code.error', 'label error')
        throw  new EntityNotFoundBusinessException([error])
      } catch (e) {
        expect(e instanceof EntityNotFoundBusinessException).toBeTruthy()
      }
    })
    it('should be prototype of EntityNotFoundBusinessException in async fct', async () => {

      try {
        await (async () => {
          const error = new ErrorDO('champErreur', 'code.error', 'label error')
          throw  new EntityNotFoundBusinessException([error])
        })()
        expect(false).toBeTruthy()
      } catch (e) {
        const eType = EntityNotFoundBusinessException
        const actual = e instanceof eType
        expect(actual).toBeTruthy()
      }
    })
  })
  describe('isA', () => {
    it('should return true', () => {
      try {
        const error = new ErrorDO('champErreur', 'code.error', 'label error')
        throw  new EntityNotFoundBusinessException([error])
      } catch (e) {
        expect(EntityNotFoundBusinessException.isA(e)).toBeTruthy()
      }
    })
  })
})
