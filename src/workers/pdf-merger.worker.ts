/// <reference lib="webworker" />
import { PDFDocument } from "pdf-lib";

/* eslint-disable no-restricted-globals */
const ctx: Worker = self as unknown as Worker;

ctx.onmessage = async (event: MessageEvent) => {
    const { files, filename } = event.data;

    try {
        const mergedPdf = await PDFDocument.create();

        for (let i = 0; i < files.length; i++) {
            const fileData = files[i];
            const pdf = await PDFDocument.load(fileData.buffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));

            ctx.postMessage({
                type: 'PROGRESS',
                progress: Math.round(((i + 1) / files.length) * 100)
            });
        }

        const pdfBytes = await mergedPdf.save();

        // Transfer the buffer back to avoid copying
        ctx.postMessage({
            type: 'COMPLETE',
            buffer: pdfBytes.buffer,
            filename
        }, [pdfBytes.buffer]);

    } catch (error) {
        ctx.postMessage({
            type: 'ERROR',
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

export { };
