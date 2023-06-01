import { create } from "./create.mjs";

const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));


useBearStore.subscribe(console.log)

useBearStore.increasePopulation();