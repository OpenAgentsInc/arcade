import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Font } from 'three/examples/jsm/loaders/FontLoader';

import fontJson from '../../../../assets/fonts/EuroStyle_Normal.json';

export class Text {
  scene: THREE.Scene;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.SpawnText('Testo');
  }

  async SpawnText(text: string) {
    const font = new Font(fontJson);
    const geometry = new TextGeometry(text, {
      font,
      size: 80,
      height: 5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 8,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    const material = new THREE.MeshPhongMaterial({ color: 0xff5533, flatShading: true });
    const mesh = new THREE.Mesh(geometry, material);
    // mesh.position = new THREE.Vector3(5, 5, 5);
    mesh.position.x = -125;
    mesh.position.y = 5;
    mesh.position.z = -205;

    this.scene.add(mesh);
  }
}
