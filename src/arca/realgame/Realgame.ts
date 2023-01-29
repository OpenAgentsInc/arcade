import * as THREE from 'three';

import { LoadController } from './LoadController';
import { ThreeJSController } from './ThreeJSController';
import { Entity } from './ecs/Entity';
import { EntityManager } from './ecs/EntityManager';
import { NetworkController, NetworkEntitySpawner } from './network';
import { Wizard } from './npcs/Wizard';
import { SorcerorEffect } from './particles/SorcererEffect';
import { PlayerSpawner } from './player/PlayerSpawner';
import { AwardSats } from './sequences/AwardSats';
import { SpatialHashGrid } from './shared';
import { Ground, Sky } from './world';

interface RealgameProps {
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
}

export class Realgame {
  camera: THREE.PerspectiveCamera;
  entityManager: EntityManager;
  grid: SpatialHashGrid;
  ground: Ground;
  previousRAF_: number | null;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  sky: Sky;

  constructor(props: RealgameProps) {
    this.scene = props.scene;
    this.ground = new Ground(this.scene);
    this.sky = new Sky(this.scene);
    this.camera = props.camera;
    this.camera.position.y = 2;
    this.renderer = props.renderer;
    this.entityManager = new EntityManager();
    this.previousRAF_ = null;
    this.grid = new SpatialHashGrid(
      [
        [-1000, -1000],
        [1000, 1000],
      ],
      [100, 100]
    );
    this.LoadControllers();
    this.RAF_();

    console.log('Realgame initialized.');
  }

  LoadControllers() {
    this.LoadThreeJS();

    this.LoadLoadController();
    this.LoadSpawners();
    setTimeout(() => {
      this.LoadNetworkController();
    }, 500);

    this.LoadWizard();
  }

  RAF_() {
    requestAnimationFrame((t) => {
      if (this.previousRAF_ === null) {
        this.previousRAF_ = t;
      }

      this.Step_(t - this.previousRAF_);
      this.previousRAF_ = t;

      setTimeout(() => {
        this.RAF_();
      }, 1);
    });
  }

  Step_(timeElapsed) {
    const timeElapsedS = Math.min(1.0 / 30.0, timeElapsed * 0.001);

    this.entityManager.Update(timeElapsedS);
  }

  StartAwardSequence() {
    const sequence = this.entityManager.Get('sequence');
    const awardSequence = sequence.GetComponent('AwardSats') as AwardSats;
    awardSequence.Start();
  }

  LoadWizard() {
    const w = new Entity();
    w.AddComponent(new Wizard());
    w.AddComponent(
      new SorcerorEffect({
        camera: this.camera,
        scene: this.scene,
      })
    );
    this.entityManager.Add(w, 'wizard');
  }

  LoadAwardSequence() {
    const s = new Entity();
    s.AddComponent(new AwardSats({ camera: this.camera }));
    this.entityManager.Add(s, 'sequence');
  }

  LoadSpawners() {
    const playerSpawner = new Entity();
    playerSpawner.AddComponent(new PlayerSpawner(this.camera, this.grid, this.scene));
    playerSpawner.AddComponent(new NetworkEntitySpawner(this.camera, this.grid, this.scene));
    this.entityManager.Add(playerSpawner, 'spawners');
  }

  LoadLoadController() {
    const l = new Entity();
    l.AddComponent(new LoadController());
    this.entityManager.Add(l, 'loader');
  }

  LoadThreeJS() {
    const threejs = new Entity();
    threejs.AddComponent(
      new ThreeJSController({
        camera: this.camera,
        renderer: this.renderer,
        scene: this.scene,
      })
    );
    this.entityManager.Add(threejs, 'threejs');
  }

  LoadNetworkController() {
    const network = new Entity();
    network.AddComponent(new NetworkController());
    this.entityManager.Add(network, 'network');
  }
}
