export class Manager {
  reactionStack = [];
  observableMap = new Map();

  beginCollect(reaction) {
    this.reactionStack.push(reaction);
  }

  endCollect() {
    this.reactionStack.pop();
  }

  collect(id) {
    const currentReaction = this.reactionStack[this.reactionStack.length - 1];

    if (!currentReaction) {
      return;
    }

    const watchers = this.observableMap.get(id) || new Set();
    watchers.add(currentReaction);
    this.observableMap.set(id, watchers);
  }

  trigger(id) {
    Array.from(this.observableMap.get(id) ?? []).forEach((reaction) =>
      reaction.exec()
    );
  }
}

export const manager = new Manager();
