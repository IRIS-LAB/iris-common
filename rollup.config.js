import importAlias from 'rollup-plugin-import-alias'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

const rootDirectory = 'src'

const configs = [
  {
    input: `${rootDirectory}/index.ts`,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins: [
      typescript({
        tsconfig: 'tsconfig.build.json',
        typescript: require('ttypescript'),
        tsconfigOverride: {
          compilerOptions: { declaration: true }
        }
      }),
      importAlias({
        Paths: {
          '~': './'
        },
        Extensions: ['js', 'ts']
      }),
    ],
  },
]

module.exports = configs
