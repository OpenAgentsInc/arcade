export const images = {
  player1: require('../../../assets/images/player1a.png'),
  // tab images
  guilds: require('../../../assets/images/guild.png'),
  guildsActive: require('../../../assets/images/guild-active.png'),
  inbox: require('../../../assets/images/inbox.png'),
  inboxActive: require('../../../assets/images/inbox-active.png'),
  map: require('../../../assets/images/map.png'),
  mapActive: require('../../../assets/images/map-active.png'),
  profile: require('../../../assets/images/profile.png'),
  profileActive: require('../../../assets/images/profile-active.png'),
  service: require('../../../assets/images/service.png'),
  serviceActive: require('../../../assets/images/service-active.png'),
  trips: require('../../../assets/images/trips.png'),
  tripsActive: require('../../../assets/images/trips-active.png'),
}

export type ImageName = keyof typeof images
