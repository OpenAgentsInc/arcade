import * as THREE from 'three';

import { Component } from '../ecs/Component';

export interface SequenceProps {
  camera: THREE.Camera;
}

export class Sequence extends Component {
  camera: THREE.Camera;
  _currentLookat: THREE.Vector3 | null;
  _idealLookat: THREE.Vector3 | null;

  constructor(props: SequenceProps) {
    super();
    this.camera = props.camera;
    this._currentLookat = new THREE.Vector3(0, 2, 0);
    this._idealLookat = null;
  }

  LookAt(entityToLookAt: string) {
    const entity = this.FindEntity(entityToLookAt);
    this._idealLookat = entity._position;
    if (!this._idealLookat) return;
    this._idealLookat.y = 1.5;
    return entity;
  }

  Update(timeElapsed: number): void {
    if (!this._currentLookat || !this._idealLookat) return;
    const t = 1.0 - Math.pow(0.01, timeElapsed);
    this._currentLookat.lerp(this._idealLookat, t);
    this.camera.lookAt(this._currentLookat);
  }
}
