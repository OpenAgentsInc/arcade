import { ThirdPersonDeviceCamera } from '../cameras/ThirdPersonDeviceCamera';
import { Component } from '../ecs/Component';
import { Entity } from '../ecs/Entity';
import { NetworkEntityController } from '../network/NetworkEntityController';
import { SpatialHashGrid } from '../shared';
import { SpatialGridController } from '../world/SpatialGridController';
import { BasicCharacterController } from './BasicCharacterController';
import { BasicCharacterControllerInput } from './BasicCharacterControllerInput';

export class PlayerSpawner extends Component {
  camera: THREE.PerspectiveCamera;
  grid: SpatialHashGrid;
  scene: THREE.Scene;

  constructor(camera: THREE.PerspectiveCamera, grid: SpatialHashGrid, scene: THREE.Scene) {
    super();
    this.camera = camera;
    this.grid = grid;
    this.scene = scene;
  }

  Spawn(desc: any) {
    console.log('Spawning player: ', desc.account.name);
    const player = new Entity();
    player.AddComponent(new BasicCharacterControllerInput());
    player.AddComponent(new BasicCharacterController(this.scene));
    player.AddComponent(new SpatialGridController(this.grid));
    player.AddComponent(
      new ThirdPersonDeviceCamera({
        camera: this.camera,
        target: player,
      })
    );
    player.AddComponent(new NetworkEntityController());
    this.Manager.Add(player, 'player');
    return player;
  }
}
