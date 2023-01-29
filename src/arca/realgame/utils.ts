import * as THREE from 'three';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const FindAnim = (animName: string, glb: GLTF, mixer: THREE.AnimationMixer) => {
  for (let i = 0; i < glb.animations.length; i++) {
    if (glb.animations[i].name.includes(animName)) {
      const clip = glb.animations[i];
      const action = mixer.clipAction(clip);
      return {
        clip,
        action,
      };
    }
  }
  return null;
};

export const GenerateRandomName = () => {
  const names1 = [
    'Aspiring',
    'Nameless',
    'Cautionary',
    'Excited',
    'Modest',
    'Maniacal',
    'Caffeinated',
    'Sleepy',
    'Passionate',
    'Medical',
  ];
  const names2 = [
    'Painter',
    'Cheese Guy',
    'Giraffe',
    'Snowman',
    'Doberwolf',
    'Cocktail',
    'Typist',
    'Cactus',
    'Arborist',
    'Elf',
    'Pants',
  ];
  const n1 = names1[Math.floor(Math.random() * names1.length)];
  const n2 = names2[Math.floor(Math.random() * names2.length)];
  return n1 + ' ' + n2;
};
