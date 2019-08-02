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

- ErrorDO: error structure with 3 fields: `field`, `code`, `label`.

```js
import { ErrorDO } from '@u-iris/iris-common'

const error = ErrorDO('field', 'code', 'label')
```

## Exceptions

Classes for exceptions that all have the property `erreurs`.

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

You can use _tsdv-joi_ validators :

```typescript
import 'reflect-metadata'
import { Joi } from 'tsdv-joi/core'
import { BusinessValidator, BusinessValidatorService } from '@u-iris/iris-common'

class DTO {
    @BusinessValidator(Joi.string().max(50).required())
    public name: string
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
import { BusinessValidator, Validator } from '@u-iris/iris-common'
class DTO {
    @BusinessValidator(Joi.string().max(10).regex(/^([A-Za-z0-9]*)$/).required())
    public name: string
    
    @BusinessValidator(Joi.number().greater(0))
    public count: number
    
    @BusinessValidator(Joi.string().required())
    public alias: string
}

const dto = new DTO()
dto.name = 'ceci est un nom trop long'
dto.count = -1

// Create a new validator and set new messages
const validator = new Validator({
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
