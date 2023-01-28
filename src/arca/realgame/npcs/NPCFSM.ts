import { FiniteStateMachine } from '../FiniteStateMachine';
import { IdleState, OpenState, WaitingState } from './WizardState';

export class NPCFSM extends FiniteStateMachine {
  _proxy: any;

  constructor(proxy) {
    super();
    this._proxy = proxy;
    this.Init_();
  }

  Init_() {
    this._AddState('idle', IdleState);
    this._AddState('open', OpenState);
    this._AddState('waiting', WaitingState);
  }
}
