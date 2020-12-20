import { Compiler } from '@composita/compiler';
import { Runtime } from '@composita/runtime';
import { Optional } from '@composita/ts-utility-types';

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
let runtime: Optional<Runtime>;

function initRuntime(): void {
    runtime = new Runtime();
    runtime.changeOutput(capture.bind(ctx));
    runtime.isRunningUpdate(updater.bind(ctx));
}

ctx.onmessage = async (event) => {
    if (event.data.fn === 'run') {
        try {
            initRuntime();
            updater(true);
            const il = compiler.compile(event.data.uri, event.data.code);
            await runtime?.run(il);
            runtime = undefined;
        } catch (err) {
            console.log(err.stack);
            postError(err.message);
            runtime = undefined;
        }
    }

    if (event.data.fn === 'stop') {
        runtime?.halt();
    }
};

export default ctx;
