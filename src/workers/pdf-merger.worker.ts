/* eslint-disable no-restricted-globals */
import { PDFDocument } from 'pdf-lib';

const ctx: Worker = self as any;

interface MergeMessage {
    type: 'MERGE';
    files: ArrayBuffer[];
}

ctx.onmessage = async (event: MessageEvent<MergeMessage>) => {
    const { type, files } = event.data;

    if (type === 'MERGE') {
        try {
            ctx.postMessage({ type: 'STATUS', message: 'Initializing merger...' });

            const mergedPdf = await PDFDocument.create();

            for (let i = 0; i < files.length; i++) {
                ctx.postMessage({
                    type: 'STATUS',
                    message: `Merging file ${i + 1} of ${files.length}...`,
                    progress: Math.round((i / files.length) * 100)
                });

                const pdfBytes = files[i];
                const pdf = await PDFDocument.load(pdfBytes);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            ctx.postMessage({ type: 'STATUS', message: 'Finalizing PDF...', progress: 95 });

            const mergedPdfBytes = await mergedPdf.save();

            ctx.postMessage({
                type: 'DONE',
                data: mergedPdfBytes,
                progress: 100
            });

        } catch (error) {
            console.error("Worker Merge Error:", error);
            ctx.postMessage({
                type: 'ERROR',
                message: error instanceof Error ? error.message : "Merge failed in worker"
            });
        }
    }
};

export { };
