import { defaultStartEvent, defaultMovingEvent, defaultEndEvent } from './defaultEvent.js';

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

        if (ed[evtPhase]) ed[evtPhase].bind(event, ed.edInfo)();        
        defaultStartEvent(ed, evtType);
      }
      break;  

    case 'moveEvent':
      eventBundle = () => {
        debounceCurrent = new Date().getTime();
        if (debounceCurrent - debounceStart > ed.debounce) {
          if (ed[evtPhase]) ed[evtPhase].bind(event, ed.edInfo)();
          defaultMovingEvent(ed, evtType);
          debounceStart = debounceCurrent;
        }
      }
      break;

    case 'endEvent':
      eventBundle = () => {
        if (ed[evtPhase]) ed[evtPhase].bind(event, ed.edInfo)();        
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