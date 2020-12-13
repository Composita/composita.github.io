import { System } from '@composita/system';

// inspired from https://stackoverflow.com/questions/53818157/using-webpack-worker-loader-with-typescript-causes-cannot-find-module-error

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-globals */
const ctx: Worker = self as any;

let isRunning = false;

function capture(...msgs: Array<string>): void {
    msgs.forEach((msg) => {
        if (msg !== undefined) {
            ctx.postMessage({ output: msg, running: isRunning });
        }
    });
}

function updater(update: boolean): void {
    isRunning = update;
    ctx.postMessage({ output: '', running: isRunning });
}

function postError(msg: string): void {
    isRunning = false;
    ctx.postMessage({ output: `\n!!! ${msg} !!!\n\n`, running: isRunning });
}

const system = new System(capture.bind(ctx), updater.bind(ctx));

ctx.onmessage = async (event) => {
    if (event.data.fn === 'run') {
        try {
            updater(true);
            await system.run(event.data.uri, event.data.code);
            ctx.postMessage({ output: '\n> ', running: false });
        } catch (err) {
            postError(err.message);
        }
    }

    if (event.data.fn === 'stop') {
        try {
            await system.stop();
        } catch (err) {
            postError(err.message);
        }
    }
};

export default ctx;
