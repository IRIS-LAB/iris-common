import { set as _set } from 'lodash'

/**
 * Function calling an async function with arguments and checking than its result is correct
 * @param {*} functionToCall
 * @param {*} expectedResult
 * @param  {...any} functionArgs
 */
export async function callFunctionAndCheckResult(
  functionToCall,
  expectedResult,
  ...functionArgs
) {
  let result = await functionToCall.apply(null, functionArgs)
  expect(result).toEqual(expectedResult)
}
/**
 * Function checking if a given function has been called with given params as arguments
 * @param {function} functionToHaveBeenCalled
 * @param  {...any} functionArgs
 */
export function checkFunctionCall(functionToHaveBeenCalled, ...functionArgs) {
  expect(functionToHaveBeenCalled).toHaveBeenCalledTimes(1)
  expect(functionToHaveBeenCalled).toHaveBeenCalledWith(...functionArgs)
}

/**
 * Function checking that an exception is thrown when an async function is called
 * @param {*} exceptionClass, constructor of the thrown exception
 * @param {array} errorCodes, exhaustive array of the error codes thrown in exception
 * @param {function} functionToTest, function to call
 * @param  {...any} functionArgs, arguments of the function to call
 */
export async function checkException(
  exceptionClass,
  errorCodes,
  functionToTest,
  ...functionArgs
) {
  // WHEN
  let result
  try {
    result = await functionToTest.apply(null, functionArgs)
  } catch (e) {
    // checking exception throwed within async function
    result = e
  }
  // THEN
  // Check exception class
  expect(result).toBeInstanceOf(exceptionClass)
  // Create object with errorCodes as keys and errorLabels as values
  let errorsKeys = {}
  result.errors.forEach(obj => {
    errorsKeys[obj.codeErreur] = obj.libelleErreur
  })
  // Check that each given errorCode is present in the result
  errorCodes.forEach(code => {
    expect(errorsKeys).toHaveProperty([code])
  })
  // Check that there is no other errorCode
  expect(result.errors).toHaveLength(errorCodes.length)
}

/**
 * Function creating an object of mocked functions (for ex., used to mock models or dao in node projects)
 * @param {*} functionsToMock (array of objects like { path: 'function.path.inFinalObject', value: returnedValueOfTheMock })
 */
export function initMocks(functionsToMock) {
  let mocksObject = {}
  functionsToMock.forEach(functionToMock => {
    _set(mocksObject, functionToMock.path, jest.fn(() => functionToMock.value))
  })
  return mocksObject
}
