import { Component, Entity } from '../ecs';
import { NPCController } from '../npcs';
import { SpatialHashGrid } from '../shared';
import { SpatialGridController } from '../world/SpatialGridController';
import { NetworkEntityController } from './NetworkEntityController';

export class NetworkEntitySpawner extends Component {
  camera: THREE.PerspectiveCamera;
  grid: SpatialHashGrid;
  scene: THREE.Scene;

  constructor(camera: THREE.PerspectiveCamera, grid: SpatialHashGrid, scene: THREE.Scene) {
    super();
    this.camera = camera;
    this.grid = grid;
    this.scene = scene;
  }

  Spawn(name, desc) {
    console.log(`Spawn network entity ${name}: `, desc.account.name);
    // console.log('[NetworkEntitySpawner] Spawn:', name, desc);
    const npc = new Entity();
    // npc.Account = desc.account;
    npc.AddComponent(new NPCController(this.camera, this.scene, desc));
    npc.AddComponent(new SpatialGridController(this.grid));
    npc.AddComponent(new NetworkEntityController());
    // if (desc.account.name) {
    //   npc.AddComponent(new floating_name.FloatingName({ desc }));
    // }

    this.Manager.Add(npc, name);

    return npc;
  }
}
