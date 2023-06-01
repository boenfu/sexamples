import { manager } from "./manager.mjs";

class Reaction {
  constructor(handler) {
    this.handler = handler;
  }

  exec() {
    this.handler();
  }
}

export function autorun(handler) {
  const reaction = new Reaction(handler);
  manager.beginCollect(reaction);
  handler();
  manager.endCollect(reaction);
}

export function reaction(collectFn, handler) {
  const reaction = new Reaction(() => handler(collectFn()));
  manager.beginCollect(reaction);
  collectFn();
  // if fireImmediately handler()
  manager.endCollect(reaction);
}

export function when(collectFn, handler) {
  const reaction = new Reaction(() => collectFn() && handler());
  manager.beginCollect(reaction);
  collectFn();
  manager.endCollect(reaction);
}
