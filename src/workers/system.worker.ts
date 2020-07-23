import { System } from '@composita/system';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-globals */
const ctx: Worker = self as any;

let messageCache = '';
const cacheLength = 10000;

let isRunning = false;

function post(): void {
    ctx.postMessage({ output: messageCache, running: isRunning });
    messageCache = '';
}

function capture(...msgs: Array<string>): void {
    const publish = !(messageCache.length < cacheLength && isRunning);
    msgs.forEach((msg) => {
        if (msg !== undefined) {
            messageCache = messageCache + msg;
        }
    });
    if (publish && messageCache !== undefined) {
        post();
    }
}

function updater(update: boolean): void {
    isRunning = update;
    if (!isRunning) {
        post();
    }
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
            isRunning = true;
            ctx.postMessage({ output: '', running: isRunning });
            await system.run(event.data.uri, event.data.code);
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
