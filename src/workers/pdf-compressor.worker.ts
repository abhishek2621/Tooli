/* eslint-disable no-restricted-globals */
const ctx: Worker = self as unknown as Worker;

ctx.onmessage = async (event: MessageEvent) => {
    // Current implementation is a placeholder or moved to main thread for compatibility
    // but we keep the structure for future background processing.
    const { type } = event.data;
    if (type === 'PING') {
        ctx.postMessage({ type: 'PONG' });
    }
};

export { };
