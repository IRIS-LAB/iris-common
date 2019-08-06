import { IrisException } from '../../src/objects/exception'

export class TestUtils {
  public static expectExceptionToContain(exception: IrisException, ...errors: Array<{ field?: string, code?: string, label?: string, limit?: number, value?: any, path?: string }>) {
    expect(exception).toBeDefined()
    expect(exception.errors).toBeDefined()
    for (const e of errors) {
      expect(exception.errors).toEqual(expect.arrayContaining([
        expect.objectContaining(e)
      ]))
    }
  }
}
