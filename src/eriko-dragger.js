function setEvent(ed, inputEvent, type) {
  if (typeof inputEvent !== 'function') console.error('inputEvent must be a funciton.');
  else ed[type] = inputEvent;

  console.log(type);
}

function listenerRegister(ed, evtReg, evtType) {
  if (!ed[evtType]) console.error(`${evtType} event cannot be empty.`);
  if (!ed.container) console.error('container cannot be empty.');
  if (!ed.target) console.error('target cannot be empty.');
  if (!ed.execute || !ed[evtType]) return;

  ed.container.addEventListener(evtReg, ed[evtType], true);
}

class ErikoDragger {
  constructor(container, target, option = null) {
    this.container = container || null;
    this.target = target || null;
    this.startEvent = option ? option.startEvent : null;
    this.moveEvent = option ? option.moveEvent : null;
    this.endEvent = option ? option.endEvent : null;
  }

  get execute() {
    return this.container && this.target;
  }

  setContainer(inputContainer) {
    const c = document.querySelector(inputContainer);
    if (c) this.container = c;
  }
  setTarget(inputTarget) {
    const t = document.querySelector(inputTarget);
    if (t) this.target = t;
  }
  setStartEvent(inputEvent) {
    setEvent(this, inputEvent, 'startEvent');
  }
  setMoveEvent(inputEvent) {
    setEvent(this, inputEvent, 'moveEvent');
  }
  setEndEvent(inputEvent) {
    setEvent(this, inputEvent, 'endEvent');
  }

  addStartListener() {
    listenerRegister(this, 'touchstart', 'startEvent');
    listenerRegister(this, 'dragstart', 'startEvent');
  }
  addMoveListener() {
    listenerRegister(this, 'touchmove', 'moveEvent');
    listenerRegister(this, 'drag', 'moveEvent');
  }
  addEndListener() {
    listenerRegister(this, 'touchend', 'endEvent');
    listenerRegister(this, 'dragover', 'endEvent');
  }
}

export { ErikoDragger };
