import jest from 'jest'
import diff from 'jest-diff'
import { BusinessException, IrisException } from '../../src/objects/exception'

const jestExpect: jest.Expect = (global as any).expect

if (jestExpect !== undefined) {
  // const toThrowIrisException = async <T extends IrisException>(exceptionType: new(...args: any[]) => T, received: () => any | Promise<any>, ...errors: Array<{ field?: string, code?: string, label?: string, limit?: number, value?: any, path?: Array<string | number> }>) => {
  //   let exception
  //   try {
  //     const result = received()
  //     if (result instanceof Promise) {
  //       await result
  //     }
  //   } catch (e) {
  //     exception = e
  //   }
  //
  //   expect(exception).toBeDefined()
  //   expect(exception).toBeInstanceOf(exceptionType)
  //   let r
  //   if (errors) {
  //     for (const e of errors) {
  //       r = expect(exception.errors).toContainObjectLike(e)
  //       if (!r.pass) {
  //         break
  //       }
  //     }
  //   }
  //   return r
  // }

  jestExpect.extend({
    toContainObjectLike(received: any[], expected: any) {
      const pass = this.equals(received,
        expect.arrayContaining([
          expect.objectContaining(expected)
        ])
      )
      const message = pass ?
        () =>
          this.utils.matcherHint('toContainObjectLike') +
          '\n\n' +
          `Expected: ${this.utils.printReceived(expected)}\n` +
          `Received: ${this.utils.printExpected(received)}`
        : () => {
          const diffString = diff(expected, received, {
            expand: this.expand
          })
          return (
            this.utils.matcherHint('toContainObjectLike') +
            '\n\n' +
            (diffString && diffString.includes('- Expect')
              ? `Difference:\n\n${diffString}`
              : `Expected: ${this.utils.printExpected(expected)}\n` +
              `Received: ${this.utils.printReceived(received)}`)
          )
        }

      return { actual: received, message, pass, expected: [expected] }
    },
    // toThrowIrisException(exceptionType: new(...args: any[]) => any, received: () => any | Promise<any>, ...errors: Array<{ field?: string, code?: string, label?: string, limit?: number, value?: any, path?: Array<string | number> }>) {
    //     // const that = this
    //   let exception
    //   try {
    //     received()
    //
    //   } catch (e) {
    //     exception = e
    //   }
    //
    //   expect(exception).toBeDefined()
    //   expect(exception).toBeInstanceOf(exceptionType)
    //   let r
    //   if (errors) {
    //     for (const e of errors) {
    //       r = jestExpect.toContainObjectLike(exception.errors, e)
    //       if (!r.pass) {
    //         break
    //       }
    //     }
    //   }
    //   return r
    // },
    // toThrowBusinessException(received: () => any | Promise<any>, ...errors: Array<{ field?: string, code?: string, label?: string, limit?: number, value?: any, path?: Array<string | number> }>) {
    //     return jestExpect.toThrowIrisException(received, BusinessException, ...errors)
    // }

  })
} else {
  // tslint:disable-next-line:no-console
  console.error(
    'Unable to find Jest\'s global expect.' +
    '\nPlease check you have added jest-extended correctly to your jest configuration.' +
    '\nSee https://github.com/jest-community/jest-extended#setup for help.'
  )
}
