 
import { jsPDF } from 'jspdf';

const ctx: Worker = self as unknown as Worker;

interface TextToPdfMessage {
    text: string;
    pageSize: string;
    orientation: string;
    fontSize: number;
    lineHeight: number;
    filename: string;
}

ctx.onmessage = async (event: MessageEvent<TextToPdfMessage>) => {
    const { text, pageSize, orientation, fontSize, lineHeight, filename } = event.data;

    try {
        ctx.postMessage({ type: 'PROGRESS', progress: 10, message: 'Initializing...' });

        const orientationMode = orientation === "portrait" ? "p" : "l";

        const doc = new jsPDF({
            orientation: orientationMode,
            unit: "pt",
            format: pageSize
        });

        // Set Font
        doc.setFont("helvetica", "normal");
        doc.setFontSize(fontSize);

        // Page Config
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 40;
        const maxWidth = pageWidth - (margin * 2);

        const textToPrint = text || " ";

        ctx.postMessage({ type: 'PROGRESS', progress: 30, message: 'Laying out text...' });

        const lines = doc.splitTextToSize(textToPrint, maxWidth);

        // Render text with manual pagination
        let cursorY = margin + fontSize;
        const lineHeightPt = fontSize * lineHeight;

        for (let i = 0; i < lines.length; i++) {
            if (cursorY + lineHeightPt > pageHeight - margin) {
                doc.addPage();
                cursorY = margin + fontSize;
            }

            doc.text(lines[i], margin, cursorY);
            cursorY += lineHeightPt;

            // Report progress periodically
            if (i % 100 === 0) {
                ctx.postMessage({
                    type: 'PROGRESS',
                    progress: 30 + Math.round((i / lines.length) * 60),
                });
            }
        }

        ctx.postMessage({ type: 'PROGRESS', progress: 95, message: 'Finalizing...' });

        const pdfBlob = doc.output('blob');

        ctx.postMessage({ type: 'DONE', blob: pdfBlob, filename });
    } catch (error) {
        ctx.postMessage({
            type: 'ERROR',
            message: error instanceof Error ? error.message : 'Text-to-PDF generation failed',
        });
    }
};

export { };
