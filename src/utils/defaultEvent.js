import { calcDistance, calcDirection, calcTranslate } from './calc.js';

let startTimestamp = 0;
let previousCoord = null;

function defaultStartEvent(ed, evtType) {
  startTimestamp = new Date().getTime();
  ed.edInfo.sourceEvent = event;
  switch (evtType) {
    case 'touchstart':
      ed.edInfo.dragStartCoord = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      }
      previousCoord = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      }
      break;
      
    case 'dragstart':
      ed.edInfo.dragStartCoord = {
        x: event.clientX,
        y: event.clientY
      }
      previousCoord = {
        x: event.clientX,
        y: event.clientY
      }
      break;
  
    default: break;
  }
}
function defaultMovingEvent(ed, evtType) {
  function updateMovingCoord() {
    switch (evtType) {
      case 'touchmove':
        // moving coordinates
        ed.edInfo.dragMovingCoord = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        }
        break;
        
      case 'drag':
        ed.edInfo.dragMovingCoord = {
          x: event.clientX,
          y: event.clientY
        }
        break;
    
      default: break;
    }
  }

  function updateCalcInfo() {
    // distance from start position
    ed.edInfo.dragDistance = calcDistance(
      ed.edInfo.dragStartCoord.x,
      ed.edInfo.dragStartCoord.y,
      ed.edInfo.dragMovingCoord.x,
      ed.edInfo.dragMovingCoord.y,
    );

    // distance from previous position
    ed.edInfo.dragDirectionFromPrev = calcDistance(
      previousCoord.x,
      previousCoord.y,
      ed.edInfo.dragMovingCoord.x,
      ed.edInfo.dragMovingCoord.y,
    );

    // direction from start position
    ed.edInfo.dragDirection = calcDirection(
      ed.edInfo.dragStartCoord.x,
      ed.edInfo.dragStartCoord.y,
      ed.edInfo.dragMovingCoord.x,
      ed.edInfo.dragMovingCoord.y,
    );

    // direction from privous position
    ed.edInfo.dragDistanceFromPrev = calcDirection(
      previousCoord.x,
      previousCoord.y,
      ed.edInfo.dragMovingCoord.x,
      ed.edInfo.dragMovingCoord.y,
    );

    // translate
    ed.edInfo.dragTranslate = calcTranslate(
      ed.edInfo.dragStartCoord.x,
      ed.edInfo.dragStartCoord.y,
      ed.edInfo.dragMovingCoord.x,
      ed.edInfo.dragMovingCoord.y,
    );
  }

  function updatePrevCoord() {
    switch (evtType) {
      case 'touchmove':
        // update previous coordinates
        previousCoord = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        }
        break;
        
      case 'drag':
        previousCoord = {
          x: event.clientX,
          y: event.clientY
        }
        break;
    
      default: break;
    }
  }

  event.stopPropagation();

  const currentTimestamp = new Date().getTime();
  ed.edInfo.dragDuration = currentTimestamp - startTimestamp;
  ed.edInfo.sourceEvent = event;

  updateMovingCoord.bind(event)();
  updateCalcInfo.bind(event)();
  updatePrevCoord.bind(event)();
}
function defaultEndEvent(ed) {
  ed.edInfo.dragStartCoord = null;
  ed.edInfo.dragMovingCoord = null;
  ed.edInfo.dragDirection = null;
  ed.edInfo.dragDirectionFromPrev = null;
  ed.edInfo.dragDistance = 0;
  ed.edInfo.dragDistanceFromPrev = 0;
  ed.edInfo.dragDuration = 0;
  ed.edInfo.dragTranslate = null;
  ed.edInfo.sourceEvent = null;
  previousCoord = null;
  startTimestamp = 0;
}

export { defaultStartEvent, defaultMovingEvent, defaultEndEvent };