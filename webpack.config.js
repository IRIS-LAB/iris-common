const path = require('path')
const nodeExternals = require('webpack-node-externals')
const DtsBundleWebpack = require('dts-bundle-webpack')

const rootDir = path.resolve(__dirname)

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "index.js",
    library: '@u-iris/iris-common',
    libraryTarget: 'commonjs'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  target: "node",
  externals: [nodeExternals()],
  // devtool: 'source-map',
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          configFileName: path.resolve(__dirname, 'tsconfig.build.json')
        },
      }
    ]
  },
  plugins: [
    new DtsBundleWebpack({
      name: '@u-iris/iris-common',
      main: path.resolve(rootDir, 'build_temp/types/index.d.ts'),
      out: path.resolve(rootDir, 'dist/types/index.d.ts'),
      removeSource: true,
      outputAsModuleFolder: false
    })
  ]
}
