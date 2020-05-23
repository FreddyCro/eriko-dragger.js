import { addStartListener, addMoveListener, addEndListener } from './utils/listener.js';

function setEvent(ed, inputEvent, type) {
  if (typeof inputEvent !== 'function') console.error('inputEvent must be a funciton.');
  else ed[type] = inputEvent;
}

class ErikoDragger {
  constructor(container, target, option = null) {
    this.container = container || null;
    this.target = target || null;
    this.startEvent = option ? option.startEvent : null;
    this.moveEvent = option ? option.moveEvent : null;
    this.endEvent = option ? option.endEvent : null;
    this.debounce = option ? option.debouce : 300;
    this.edInfo = {
      dragStartCoord: null,
      dragMovingCoord: null,
      dragDirection: null,
      dragDirectionFromPrev: null,
      dragDistance: 0,
      dragDistanceFromPrev: 0,
      dragDuration: 0,
      dragTranslate: null,
    }
  }

  get readyStatus() {
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

  launch() {
    addStartListener(this);
    addMoveListener(this);
    addEndListener(this);
  }
}

export { ErikoDragger };
