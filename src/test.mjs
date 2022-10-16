import * as em from `./moduleExample.mjs`
import person, { sleep } from './moduleExample.mjs';
import gh from "./logo-github.svg"

sleep()
person()

em.sleep()
em.test()

var ghlogo = `<img src=${gh}/>`