import { defaultStartEvent, defaultMovingEvent, defaultEndEvent } from './defaultEvent.js';

let ticking_s = false;
let ticking_m = false;
let ticking_e = false;
let debounceStart = 0;
let debounceCurrent = 0;


let eventBundle_start = null;
let eventBundle_move = null;
let eventBundle_end = null;

function registerListener(ed, evtType, evtPhase) {
  if (!ed.container) console.error('container cannot be empty.');
  if (!ed.target) console.error('target cannot be empty.');
  if (!ed.readyStatus || !ed[evtPhase]) return;
  
  switch (evtPhase) {
    case 'startEvent':
      eventBundle_start = () => {
        debounceStart = new Date().getTime();
        if (ed[evtPhase]) {
          if (!ticking_s) {
            window.requestAnimationFrame(() => {
              // execute custom event
              ed[evtPhase].bind(event, ed.edInfo)();
              ticking_s = false;
            });
          }
          ticking_s = true;
        }
        // execute default event
        defaultStartEvent(ed, evtType);
      }
      ed.target.addEventListener(evtType, eventBundle_start, { passive: true });
      break;  

    case 'moveEvent':
      eventBundle_move = () => {
        debounceCurrent = new Date().getTime();
        if (debounceCurrent - debounceStart > ed.debounce) {
          if (ed[evtPhase]) {
            if (!ticking_m) {
              window.requestAnimationFrame(() => {
                // execute custom event
                ed[evtPhase].bind(event, ed.edInfo)();
                ticking_m = false;
              });
            }
            ticking_m = true;
          }
          // execute default event
          defaultMovingEvent(ed, evtType);
          debounceStart = debounceCurrent;
        }
      }
      ed.target.addEventListener(evtType, eventBundle_move, { passive: true });
      break;

    case 'endEvent':
      eventBundle_end = () => {
        if (ed[evtPhase]) {
          if (!ticking_e) {
            window.requestAnimationFrame(() => {
              // execute custom event
              ed[evtPhase].bind(event, ed.edInfo)();
              ticking_e = false;
            });
          }
          ticking_e = true;
        }
        // execute default event
        defaultEndEvent(ed, evtType);
      }
      ed.target.addEventListener(evtType, eventBundle_end, { passive: true });
      break;
  
    default: break;
  }
}

function addStartListener() {
  registerListener(this, 'touchstart', 'startEvent');
  registerListener(this, 'dragstart', 'startEvent');
}
function addMoveListener() {
  registerListener(this, 'touchmove', 'moveEvent');
  registerListener(this, 'drag', 'moveEvent');
}
function addEndListener() {
  registerListener(this, 'touchend', 'endEvent');
  registerListener(this, 'dragend', 'endEvent');
}
function removeListener() {
  this.target.removeEventListener('touchstart', eventBundle_start, { passive: true });
  this.target.removeEventListener('dragstart', eventBundle_start, { passive: true });
  this.target.removeEventListener('touchmove', eventBundle_move, { passive: true });
  this.target.removeEventListener('drag', eventBundle_move, { passive: true });
  this.target.removeEventListener('touchend', eventBundle_end, { passive: true });
  this.target.removeEventListener('dragend', eventBundle_end, { passive: true });
}

export { addStartListener, addMoveListener, addEndListener, removeListener };