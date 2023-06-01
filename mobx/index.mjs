import { observable } from "./observable.mjs";
import { autorun, reaction, when } from "./reaction.mjs";

const foo = observable({ a: 1 });

autorun(() => {
  console.log("foo.a in autorun:", foo.a);
});

reaction(
  () => foo.a,
  (a) => {
    console.log("foo.a in reaction:", a);
  }
);

when(
  () => foo.a === 3,
  () => {
    console.log("foo.a in when:", foo.a);
  }
);

foo.a = 2;
foo.a = 3;

// foo.a in autorun: 1
// foo.a in autorun: 2
// foo.a in reaction: 2
// foo.a in autorun: 3
// foo.a in reaction: 3
// foo.a in when: 3
