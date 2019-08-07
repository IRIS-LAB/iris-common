import jest from 'jest'
import diff from 'jest-diff'

const jestExpect: jest.Expect = (global as any).expect

if (jestExpect !== undefined) {

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
  })
} else {
  // tslint:disable-next-line:no-console
  console.error(
    'Unable to find Jest\'s global expect.' +
    '\nPlease check you have added jest-extended correctly to your jest configuration.' +
    '\nSee https://github.com/jest-community/jest-extended#setup for help.'
  )
}
