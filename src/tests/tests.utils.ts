import { set as _set } from 'lodash'
import { ErreurDO, IrisException } from '~/exception'

// TODO : remove test-utils and migrate to an other lib  @u-iris/iris-test-utils

/**
 * Function calling an async function with arguments and checking than its result is correct
 * @param {*} functionToCall
 * @param {*} expectedResult
 * @param  {...any} functionArgs
 * @deprecated please use @u-iris/iris-test-utils
 */
export async function callFunctionAndCheckResult<R>(
    functionToCall: (...args: any[]) => Promise<R>,
    expectedResult: R,
    ...functionArgs: Parameters<typeof functionToCall>
): Promise<void> {
    const result = await functionToCall.apply(null, functionArgs)
    expect(result).toEqual(expectedResult)
}

/**
 * Function checking if a given function has been called with given params as arguments
 * @param {function} functionToHaveBeenCalled
 * @param  {...any} functionArgs
 * @deprecated please use @u-iris/iris-test-utils
 */
// tslint:disable-next-line:ban-types
export function checkFunctionCall(functionToHaveBeenCalled: Function, ...functionArgs: any[]) {
    expect(functionToHaveBeenCalled).toHaveBeenCalledTimes(1)
    expect(functionToHaveBeenCalled).toHaveBeenCalledWith(...functionArgs)
}

interface IErrorChecked {
    field: string,
    codes: string[]
}

/**
 * Function checking that an exception is thrown when an async function is called
 * @param {*} exceptionClass, constructor of the thrown exception
 * @param {array} errors, exhaustive array of the error codes thrown in exception
 * @param {function} functionToTest, function to call
 * @param  {...any} functionArgs, arguments of the function to call
 * @deprecated please use @u-iris/iris-test-utils
 */
export async function checkException<T extends IrisException>(
    exceptionClass: new (...args: any[]) => T,
    errors: IErrorChecked[],
    functionToTest: (...args: any[]) => any,
    ...functionArgs: Parameters<typeof functionToTest>
): Promise<void> {
    // WHEN
    let result = null
    try {
        await functionToTest.apply(null, functionArgs)
    } catch (e) {
        // checking exception throwed within async function
        result = e
    }
    // THEN
    // Check exception class
    expect(result).toBeDefined()
    expect(result).toBeInstanceOf(exceptionClass)

    const exception = result as T

    // Create object with errors as keys and errorLabels as values
    const errorsKeys: { [field: string]: string[] } = {}
    exception.errors.forEach((obj: ErreurDO) => {
        if (!errorsKeys.hasOwnProperty(obj.champErreur)) {
            errorsKeys[obj.champErreur] = []
        }
        if (errorsKeys[obj.champErreur].indexOf(obj.codeErreur) === -1) {
            errorsKeys[obj.champErreur].push(obj.codeErreur)
        }
    })
    // Check that each given errorCode is present in the result
    errors.forEach(err => {
        expect(errorsKeys).toHaveProperty([err.field])
        err.codes.forEach(code => expect(errorsKeys[err.field]).toContain(code))
        expect(errorsKeys[err.field]).toHaveLength(err.codes.length)
    })
    // Check that there is no other errorCode
    expect(exception.errors).toHaveLength(errors.length)
}

/**
 * Function creating an object of mocked functions (for ex., used to mock models or dao in node projects)
 * @param {*} functionsToMock (array of objects like { path: 'function.path.inFinalObject', value: returnedValueOfTheMock })
 * @deprecated please use @u-iris/iris-test-utils
 */
export function initMocks(functionsToMock: Array<{ path: string, value: any }>) {
    const mocksObject = {}
    functionsToMock.forEach(functionToMock => {
        _set(mocksObject, functionToMock.path, jest.fn(() => functionToMock.value))
    })
    return mocksObject
}
