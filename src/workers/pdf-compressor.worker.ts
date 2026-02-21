
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';

// Initialize worker context
const ctx: Worker = self as unknown as Worker;

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

// Compression presets
const COMPRESSION_PRESETS = {
    low: { scale: 1.0, quality: 0.8 },
    medium: { scale: 0.8, quality: 0.6 },
    high: { scale: 0.6, quality: 0.4 },
    extreme: { scale: 0.5, quality: 0.2 },
} as const;

type CompressionLevel = keyof typeof COMPRESSION_PRESETS;

interface CompressionMessage {
    type: 'COMPRESS';
    file: ArrayBuffer;
    level: CompressionLevel;
}

ctx.onmessage = async (event: MessageEvent<CompressionMessage>) => {
    const { type, file, level } = event.data;

    if (type === 'COMPRESS') {
        try {
            const options = COMPRESSION_PRESETS[level] || COMPRESSION_PRESETS.medium;

            // Load PDF
            const loadingTask = pdfjsLib.getDocument({ data: file });
            const pdf = await loadingTask.promise;
            const totalPages = pdf.numPages;

            // Create new PDF
            const newPdfDoc = await PDFDocument.create();

            for (let i = 1; i <= totalPages; i++) {
                // Report progress
                ctx.postMessage({
                    type: 'PROGRESS',
                    progress: Math.round(((i - 1) / totalPages) * 100),
                    message: `Processing page ${i} of ${totalPages}...`
                });

                // Render page to canvas
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: options.scale * 1.5 });

                const canvas = new OffscreenCanvas(viewport.width, viewport.height);
                const context = canvas.getContext("2d");

                if (!context) throw new Error("Canvas context not available");

                await page.render({
                    canvasContext: context,
                    viewport: viewport,
                } as unknown as Parameters<typeof page.render>[0]).promise;

                // Convert to blob/buffer
                const blob = await canvas.convertToBlob({ type: 'image/jpeg', quality: options.quality });
                const arrayBuffer = await blob.arrayBuffer();

                // Embed in new PDF
                const embeddedImage = await newPdfDoc.embedJpg(arrayBuffer);
                const newPage = newPdfDoc.addPage([embeddedImage.width, embeddedImage.height]);

                newPage.drawImage(embeddedImage, {
                    x: 0,
                    y: 0,
                    width: embeddedImage.width,
                    height: embeddedImage.height,
                });
            }

            ctx.postMessage({
                type: 'PROGRESS',
                progress: 95,
                message: "Finalizing..."
            });

            const pdfBytes = await newPdfDoc.save();

            ctx.postMessage({
                type: 'DONE',
                data: pdfBytes,
                progress: 100
            });

        } catch (error) {
            console.error("Worker Compression Error:", error);
            ctx.postMessage({
                type: 'ERROR',
                message: error instanceof Error ? error.message : "Compression failed in worker"
            });
        }
    }
};

export { };
