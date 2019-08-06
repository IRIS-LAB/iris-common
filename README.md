# iris-common

Backend and Frontend Utils for Iris

See the change log at [link](release-notes.md).

## Build Setup

```bash
# install dependencies
npm install

# build for production with minification
npm run build

# run unit tests
npm run test:unit

# run e2e tests
npm run test:e2e

# run all tests
npm test
```

## Import in your project

```bash
# install dependency
npm i @u-iris/iris-common --save
```

## Objects

Commonly used classes :

- ErrorDO: error structure with 3 required fields (`field`, `code`, `label`) and extra fields (value, path, limit)

```js
import { ErrorDO } from '@u-iris/iris-common'

const error = ErrorDO(
  'field', // the field name 
  'code', // the error code
  'label' // the label
)
const errorWithExtraFields = ErrorDO('field', 'code', 'label', {
  value: 'the value', // the value in error as any
  path: ['child', 'field'], // the path as array of string or number : used to identify full path of field when the error is from a nested object (You can use index of array like ['children', 1, 'field'] which means the field 'field' of the 2nd element (index is from 0) of the array 'children'. 
  limit: 5 // the limit for a string max / min length or for a number which must be greater / lesser than
})
```

## Exceptions

Classes for exceptions that all holds an array of `ErrorDO` in property `errors`.

- BusinessException
- EntityNotFoundBusinessException
- TechnicalException
- SecurityException

```js
import {
  BusinessException,
  EntityNotFoundBusinessException,
  TechnicalException,
  SecurityException
} from '@u-iris/iris-common'

const testBusinessException = new BusinessException(errorsArray)
const testEntityNotFoundBusinessException = new EntityNotFoundBusinessException(
  errorObject
)
const testTechnicalException = new TechnicalException(
  errorsArray,
  causedException
)
const securityException = new SecurityException(
  errorsArray
)
```

## Validators (with Joi)

### Model definition

Use `@BusinessValidator()` decorator on a field with a _Joi_ constraint.

To validate a nested field that should be validated itself use `@Nested()` decorator and set the type of your field as a decorator parameter. 

If your field is an array, use `@NestedArray()` and pass the type of your array.

```typescript
import 'reflect-metadata'
import { Nested, NestedArray } from 'tsdv-joi'
import { Joi } from 'tsdv-joi/core'
import { BusinessValidator, BusinessValidatorService } from '@u-iris/iris-common'


class Child {
    @BusinessValidator(Joi.string().max(10).required())
    public name: string
}

class DTO {
    @BusinessValidator(Joi.string().max(50).required())
    public name: string
  
    @Nested(Child)
    public child: Child

    @NestedArray(Child)
    public children: Child[]
}

// Object to validate
const instance: DTO = new DTO()
instance.name = 'nom'
const aValidInstance = new BusinessValidatorService().validate(instance) // can throw BusinessException if instance is not valid
```
### Validator with options

You can pass joi validator options to override default options of BusinessValidatorService.

```typescript
import { BusinessValidatorService } from '@u-iris/iris-common'
const businessValidatorService = new BusinessValidatorService({
  joiOptions: {
    convert: true
  }
})
```

You can override error messages

```typescript
import { BusinessValidatorService } from '@u-iris/iris-common'
const businessValidatorService = new BusinessValidatorService({
  messages: {...}
})
```
messages should be formatted like {'field type' : {'rule type' : 'message'}}

To override `Joi.string().max(10)` rule you should set message like `{string : {max : 'Field $field must be $limit char max'}}`

You can use some variables in your messages : 
- $field, $key and $label are replaced by the name of the property
- $value is replaced by the value of the property
- more variables depending on the type of the rule ($limit in string.max or number.greater)
 
To get a list of exhaustives field types and rule types, please see the [joi documentation](https://github.com/hapijs/joi)

```typescript
import 'reflect-metadata'
import { Joi } from 'tsdv-joi/core'
import { BusinessValidator, BusinessValidatorService } from '@u-iris/iris-common'
class DTO {
    @BusinessValidator(Joi.string().max(10).regex(/^([A-Za-z0-9]*)$/).required())
    public name: string
    
    @BusinessValidator(Joi.number().greater(0))
    public count: number
    
    @BusinessValidator(Joi.string().required())
    public alias: string
}

const dto = new DTO()
dto.name = 'this is very too long'
dto.count = -1

// Create a new validator and set new messages
const validator = new BusinessValidatorService({
    messages: {
      // messages format is {'field type' : {'rule type' : 'message'}}
      
      string: {
        max: 'Field $field must be $limit char max',
        regex: 'Field $field is not well format'
      },
      number: {
        greater: 'Field $field must be greater than $limit'
      }
    }
})
validator.validate(dto)
```

## Licence
MIT
