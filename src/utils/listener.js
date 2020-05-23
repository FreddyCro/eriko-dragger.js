import { defaultStartEvent, defaultMovingEvent, defaultEndEvent } from './defaultEvent.js';

let ticking_s = false;
let ticking_m = false;
let ticking_e = false;
let debounceStart = 0;
let debounceCurrent = 0;

function registerListener(ed, evtType, evtPhase) {
  if (!ed.container) console.error('container cannot be empty.');
  if (!ed.target) console.error('target cannot be empty.');
  if (!ed.readyStatus || !ed[evtPhase]) return;
  
  let eventBundle = null
  switch (evtPhase) {
    case 'startEvent':
      eventBundle = () => {
        debounceStart = new Date().getTime();
        if (ed[evtPhase]) {
          if (!ticking_s) {
            window.requestAnimationFrame(() => {
              ed[evtPhase].bind(event, ed.edInfo)();
              ticking_s = false;
            });
          }
          ticking_s = true;
        }
        defaultStartEvent(ed, evtType);
      }
      break;  

    case 'moveEvent':
      eventBundle = () => {
        debounceCurrent = new Date().getTime();
        if (debounceCurrent - debounceStart > ed.debounce) {
          if (ed[evtPhase]) {
            if (!ticking_m) {
              window.requestAnimationFrame(() => {
                ed[evtPhase].bind(event, ed.edInfo)();
                ticking_m = false;
              });
            }
            ticking_m = true;
          }
          defaultMovingEvent(ed, evtType);
          debounceStart = debounceCurrent;
        }
      }
      break;

    case 'endEvent':
      eventBundle = () => {
        if (ed[evtPhase]) {
          if (!ticking_e) {
            window.requestAnimationFrame(() => {
              ed[evtPhase].bind(event, ed.edInfo)();
              ticking_e = false;
            });
          }
          ticking_e = true;
        }
        defaultEndEvent(ed, evtType);
      }
      break;
  
    default: break;
  }

  ed.container.addEventListener(evtType, eventBundle, { passive: true });
}

function addStartListener(dr) {
  registerListener(dr, 'touchstart', 'startEvent');
  registerListener(dr, 'dragstart', 'startEvent');
}
function addMoveListener(dr) {
  registerListener(dr, 'touchmove', 'moveEvent');
  registerListener(dr, 'drag', 'moveEvent');
}
function addEndListener(dr) {
  registerListener(dr, 'touchend', 'endEvent');
  registerListener(dr, 'dragend', 'endEvent');
}

export { addStartListener, addMoveListener, addEndListener };