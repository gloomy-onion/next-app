import { createEvent, createStore, sample } from 'effector';

const $counter = createStore(0, { sid: 'my-sid' });

const setCounter = createEvent<number>({ sid: 'my-sid' });
const incCounter = createEvent<number>({ sid: 'my-sid' });
const decCounter = createEvent<number>({ sid: 'my-sid' });

sample({
    clock: setCounter,
    target: $counter,
});

sample({
    clock: incCounter,
    source: $counter,
    fn: (counter) => counter + 1,
    target: $counter,
});

sample({
    clock: decCounter,
    source: $counter,
    fn: (counter) => counter - 1,
    target: $counter,
});

export const counterModel = {
    $counter,
    setCounter,
    incCounter,
    decCounter,
};
