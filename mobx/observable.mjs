import { manager } from "./manager.mjs";

class Observable {
  constructor(value) {
    this.id = Symbol("Observable");
    this.value = value;
  }

  get() {
    manager.collect(this.id);
    return this.value;
  }

  set(value) {
    this.value = value;
    manager.trigger(this.id);
  }
}

export function observable(object) {
  for (let key in object) {
    const observable = new Observable(object[key]);

    Object.defineProperty(object, key, {
      get: () => observable.get(),
      set: (v) => observable.set(v),
    });
  }

  return object;
}
