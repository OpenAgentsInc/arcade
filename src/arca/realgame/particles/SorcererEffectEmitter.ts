import * as THREE from 'three';

import { ParticleEmitter } from './ParticleEmitter';

export class SorcerorEffectEmitter extends ParticleEmitter {
  blend_: number;
  parent_: any;

  constructor(parent) {
    super();
    this.parent_ = parent;
    this.blend_ = 0.0;
  }

  OnUpdate_() {
    this.parent_.updateMatrixWorld(true);

    this.SetEmissionRate(300.0 * (this.emitterLife_ / 3.0));
  }

  CreateParticle_() {
    const origin = new THREE.Vector3(0, 0, 0);
    this.parent_.localToWorld(origin);

    const radius = 1.0;
    const life = (Math.random() * 0.75 + 0.25) * 1.0;
    const p = new THREE.Vector3(
      (Math.random() * 2 - 1) * radius,
      (Math.random() * 2 - 1) * radius,
      (Math.random() * 2 - 1) * radius
    );

    const d = p.clone().normalize();
    p.copy(d);
    p.multiplyScalar(radius);
    p.add(origin);
    d.multiplyScalar(-1.0);

    return {
      position: p,
      size: (Math.random() * 0.5 + 0.5) * 1.0,
      colour: new THREE.Color(),
      alpha: 1.0,
      life,
      maxLife: life,
      rotation: Math.random() * 2.0 * Math.PI,
      velocity: d,
      blend: this.blend_,
    };
  }
}
