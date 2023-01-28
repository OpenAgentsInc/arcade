class State {
  _parent: any;

  constructor(parent) {
    this._parent = parent;
  }

  Enter(prevState) {}
  Exit() {}
  Update(timeElapsed, input) {}
}

export class OpenState extends State {
  _action: any;

  constructor(parent) {
    super(parent);
    this._action = null;
  }

  Enter() {
    this._parent._proxy.animations['open'].action.play();
  }

  Exit() {
    this._parent._proxy.animations['open'].action.stop();
  }

  Update() {}
}

export class IdleState extends State {
  _action: any;

  constructor(parent) {
    super(parent);
    this._action = null;
  }

  Enter() {
    this._parent._proxy.animations['idle'].action.play();
  }

  Exit() {
    this._parent._proxy.animations['idle'].action.stop();
  }

  Update() {}
}

export class WaitingState extends State {
  _action: any;

  constructor(parent) {
    super(parent);
    this._action = null;
  }

  Enter() {
    this._parent._proxy.animations['waiting'].action.play();
  }

  Exit() {
    this._parent._proxy.animations['waiting'].action.stop();
  }

  Update() {}
}
