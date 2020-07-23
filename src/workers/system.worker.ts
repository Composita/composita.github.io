import { System } from '@composita/system';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-globals */
const ctx: Worker = self as any;

function capture(...msgs: Array<string>): void {
    msgs.forEach((msg) => ctx.postMessage({ output: msg, running: isRunning }));
}

let isRunning = false;

function updater(update: boolean): void {
    isRunning = update;
    ctx.postMessage({ output: '', running: isRunning });
}

const system = new System(capture.bind(this), updater.bind(this));

function postError(msg: string): void {
    isRunning = false;
    ctx.postMessage({ output: `\n!!! ${msg} !!!\n\n`, running: isRunning });
}

ctx.onmessage = async (event) => {
    if (event.data.fn === 'run') {
        try {
            await system.run(event.data.uri, event.data.code);
            ctx.postMessage({ output: '', running: isRunning });
        } catch (err) {
            postError(err.message);
        }
    }

    if (event.data.fn === 'stop') {
        try {
            await system.stop();
            isRunning = false;
            ctx.postMessage({ output: '', running: isRunning });
        } catch (err) {
            postError(err.message);
        }
    }
};

export default ctx;
