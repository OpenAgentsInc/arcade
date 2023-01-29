export const models = {
  druid: require('../assets/models/druid.glb'),
  grass: {
    platform: require('../assets/models/grass-platform.glb'),
    tile: require('../assets/models/grass-tile.glb'),
  },
  man: require('../assets/models/Male_Casual.glb'),
  paladin: {
    model: require('../assets/models/paladin.glb'),
    texture: require('../assets/models/paladin.png'),
  },
  slime: require('../assets/models/Slime.glb'),
}

export type ModelName = keyof typeof models
