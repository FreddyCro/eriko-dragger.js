# 【eriko-dragger.js】

```text=
version: v1.0.0
last updated: 2020.5.21
```

## Availability

```shell=
npm install --save eriko-dragger.js
```

## Usage

### Example 1

Assign dragger by calling set methods.

```javascript=
import { ErikoDragger } from 'eriko-dragger.js';

var ed = new ErikoDragger();

ed.setContainer('#card-collector');
ed.setTarget('#cards');
ed.setStartEvent(this.handleDragStartEvent);
ed.setMoveEvent(this.handleDragMovingEvent);
ed.setEndEvent(this.handleDragEndEvent);
ed.setDebounce(500);

ed.launch();
ed.removeDragger();
```

### Example 2

Assign dragger by passing parameter.

```javascript=
import { ErikoDragger } from 'eriko-dragger.js';

const option = {
  startEvent: myStartEvent
  moveEvent: myMoveEvent
  endEvent: myEndEvent
  debounce: 500
}

var ed = new ErikoDragger('#card-collector', '#cards', option);

ed.launch();
ed.removeDragger();
```

## document

### container

name | type | optional | default
--- | --- | --- | ---
`containerId` | `string` | no |

### target

name | type | optional | default
--- | --- | --- | ---
`targetId` | `string` | no |

### option

name | type | optional | default
--- | --- | --- | ---
`startEvent` | `function` | yes |
`moveEvent` | `function` | yes |
`endEvent` | `function` | yes |
`debounce` | `number` | yes | 300
