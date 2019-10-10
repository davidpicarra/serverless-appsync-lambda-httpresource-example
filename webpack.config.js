const nodeExternals = require('webpack-node-externals')
const slsw = require('serverless-webpack')

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [{ test: /\.(ts|tsx)?$/, loader: 'ts-loader' }],
  },
}
