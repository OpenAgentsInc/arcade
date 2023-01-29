import { store } from 'arca/store';

import { Entity } from '../ecs/Entity';
import { Wizard } from '../npcs/Wizard';
import { SorcerorEffect } from '../particles/SorcererEffect';
import { sleep } from '../utils';
import { Sequence } from './Sequence';

export class AwardSats extends Sequence {
  async Start() {
    await sleep(500);
    // this.LookAt('wizard');
    await sleep(1500);
    const wizardEntity = this.FindEntity('wizard') as Entity;
    const wizard = wizardEntity.GetComponent('Wizard') as Wizard;
    const sorcEffect = wizardEntity.GetComponent('SorcerorEffect') as SorcerorEffect;
    if (!wizard.stateMachine) return;
    wizard.stateMachine.SetState('open');
    await sleep(1500);
    this.increase(100);
    sorcEffect.Trigger();
    await sleep(1100);
    wizard.stateMachine.SetState('waiting');
    setTimeout(() => {
      this.Start();
    }, 2000);
  }

  async increase(amount: number) {
    const state = store.getState();

    for (let i = 0; i < amount; i++) {
      state.increase(1);
      await sleep(4);
    }
  }
}
