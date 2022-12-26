const extraNodeModules = require('node-libs-react-native')
const { getDefaultConfig } = require('expo/metro-config')
const projectRoot = __dirname
const config = getDefaultConfig(projectRoot)

config.resolver.sourceExts.push('cjs')
config.resolver.assetExts.push('wasm')
config.resolver.extraNodeModules = extraNodeModules

module.exports = config
