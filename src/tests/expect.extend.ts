expect.extend({
    toContainObjectLike(received: any[], argument: any) {

        const pass = this.equals(received,
            expect.arrayContaining([
                expect.objectContaining(argument)
            ])
        )

        if (pass) {
            return {
                message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
                pass: true
            }
        } else {
            return {
                message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
                pass: false
            }
        }
    }
})
/// <reference types="jest" />
declare namespace jest {
    interface Matchers<R> {
        /**
         * Ensures that an array contains an object like argument
         * @param argument
         */
        toContainObjectLike(argument: any): R
    }
}
