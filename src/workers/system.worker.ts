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

function initRuntime(): void {
    Runtime.instance().reset();
    Runtime.instance().changeOutput(capture.bind(ctx));
    Runtime.instance().isRunningUpdate(updater.bind(ctx));
}

ctx.onmessage = async (event) => {
    if (event.data.fn === 'run') {
        initRuntime();
        try {
            updater(true);
            const il = compiler.compile(event.data.uri, event.data.code);
            await Runtime.instance().run(il);
        } catch (err: any) {
            console.log(err.stack);
            postError(err.message);
        }
    }

    if (event.data.fn === 'stop') {
        Runtime.instance().halt();
    }
};

export default ctx;
