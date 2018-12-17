import multiEntry from 'rollup-plugin-multi-entry'
import minify from 'rollup-plugin-minify-es'
//import fs from 'fs'

const rootDirectory = 'src/modules'
/*
const configs = fs.readdirSync(rootDirectory).map(inputDirectory => ({
  input: `${rootDirectory}/${inputDirectory}/*.js`,
  output: {
    file: `dist/${inputDirectory}.js`,
    format: 'cjs'
  },
  plugins: [multiEntry(), minify()]
}))
*/
const configs = [
  {
    input: `${rootDirectory}/**/*.js`,
    output: {
      file: `dist/index.js`,
      format: 'cjs'
    },
    plugins: [multiEntry(), minify()]
  }
]

module.exports = configs
