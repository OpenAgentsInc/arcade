const { getDefaultConfig } = require('expo/metro-config')
// eslint-disable-next-line no-undef
const projectRoot = __dirname
const config = getDefaultConfig(projectRoot)

config.resolver.sourceExts.push('cjs')

module.exports = config
