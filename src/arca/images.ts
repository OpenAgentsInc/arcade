export const images = {
  bitcoin: require('../../assets/images/bitcoin.png'),
  druid: require('../../assets/models/druid.png'),
  skybox: {
    negx: require('../../assets/images/terrain/space-negx.jpg'),
    negy: require('../../assets/images/terrain/space-negy.jpg'),
    negz: require('../../assets/images/terrain/space-negz.jpg'),
    posx: require('../../assets/images/terrain/space-posx.jpg'),
    posy: require('../../assets/images/terrain/space-posy.jpg'),
    posz: require('../../assets/images/terrain/space-posz.jpg'),
  },
}

export type ImageName = keyof typeof images
