import { Compiler } from '@composita/compiler';
import { Runtime } from '@composita/runtime';

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
    const msg = !isRunning ? '\n> ' : '';
    ctx.postMessage({ output: msg, running: isRunning });
}

function postError(msg: string): void {
    isRunning = false;
    ctx.postMessage({ output: `\n!!! ${msg} !!!\n\n`, running: isRunning });
}

const compiler = new Compiler();
const runtime = new Runtime();
runtime.changeOutput(capture.bind(ctx));
runtime.isRunningUpdate(updater.bind(ctx));

ctx.onmessage = (event) => {
    if (event.data.fn === 'run') {
        try {
            updater(true);
            const il = compiler.compile(event.data.uri, event.data.code);
            runtime.run(il);
        } catch (err) {
            postError(err.message);
        }
    }

    if (event.data.fn === 'stop') {
        try {
            runtime.halt();
        } catch (err) {
            postError(err.message);
        }
    }
};

export default ctx;
