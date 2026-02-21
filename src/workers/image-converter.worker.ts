 
const ctx: Worker = self as unknown as Worker;

interface ConvertMessage {
    id: string;
    buffer: ArrayBuffer;
    width: number;
    height: number;
    format: string; // "png" | "jpeg" | "webp"
}

ctx.onmessage = async (event: MessageEvent<ConvertMessage>) => {
    const { id, buffer, width, height, format } = event.data;

    try {
        // Create ImageBitmap from the raw buffer (transferred, zero-copy)
        const blob = new Blob([buffer]);
        const bitmap = await createImageBitmap(blob);

        // Use OffscreenCanvas so the main thread stays free
        const canvas = new OffscreenCanvas(width, height);
        const context = canvas.getContext("2d");

        if (!context) throw new Error("Could not get OffscreenCanvas 2d context");

        // For JPEG: fill white background (no transparency support)
        if (format === "jpeg") {
            context.fillStyle = "#FFFFFF";
            context.fillRect(0, 0, width, height);
        }

        context.drawImage(bitmap, 0, 0, width, height);
        bitmap.close(); // Free bitmap memory

        const mimeType = `image/${format}`;
        const resultBlob = await canvas.convertToBlob({ type: mimeType, quality: 0.9 });

        ctx.postMessage({ type: 'DONE', id, blob: resultBlob });
    } catch (error) {
        ctx.postMessage({
            type: 'ERROR',
            id,
            message: error instanceof Error ? error.message : "Conversion failed in worker"
        });
    }
};

export { };
