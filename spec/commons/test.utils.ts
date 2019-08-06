import { IrisException } from '../../src/objects/exception'
import './jest.extends'

export class TestUtils {
  public static expectExceptionToContain(exception: IrisException, ...errors: Array<{ field?: string, code?: string, label?: string, limit?: number, value?: any, path?: Array<string | number> }>) {
    expect(exception).toBeDefined()
    expect(exception.errors).toBeDefined()
    if (errors) {
      for (const e of errors) {
        expect(exception.errors).toContainObjectLike(e)
      }
    }
  }

  public static expectThrowIrisExceptionLike<T extends IrisException>(fct: (...args: any[]) => any, exceptionType: new(...args: any[]) => T, ...errors: Array<{ field?: string, code?: string, label?: string, limit?: number, value?: any, path?: Array<string | number> }>) {
    let exception
    try {
      fct()
    } catch (e) {
      exception = e
    }

    expect(exception).toBeDefined()
    expect(exception).toBeInstanceOf(exceptionType)
    TestUtils.expectExceptionToContain(exception, ...errors)
  }
}
