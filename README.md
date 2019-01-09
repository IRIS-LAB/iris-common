# iris-common

> Backend and Frontend Utils for Iris

## Build Setup

```bash
# install dependencies
npm install

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Import in your project

```bash
# install dependency
npm i iris-common --save
```

```js
import { BusinessException } from 'iris-common'
const test = new BusinessException('code', 'message')
```
