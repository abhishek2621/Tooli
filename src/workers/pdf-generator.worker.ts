import { jsPDF } from "jspdf";

/* eslint-disable no-restricted-globals */
self.onmessage = async (event: MessageEvent) => {
    const { images, pageSize, orientation, marginPt, filename } = event.data;

    try {
        const orientationMode = orientation === "portrait" ? "p" : "l";

        const doc = new jsPDF({
            orientation: orientationMode,
            unit: "pt",
            format: pageSize
        });

        for (let i = 0; i < images.length; i++) {
            const imgData = images[i];
            if (i > 0) {
                doc.addPage(pageSize, orientationMode);
            }

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            const availableWidth = pageWidth - (marginPt * 2);
            const availableHeight = pageHeight - (marginPt * 2);

            const imgRatio = imgData.width / imgData.height;
            const pageRatio = availableWidth / availableHeight;

            let finalWidth, finalHeight;

            if (imgRatio > pageRatio) {
                finalWidth = availableWidth;
                finalHeight = availableWidth / imgRatio;
            } else {
                finalHeight = availableHeight;
                finalWidth = availableHeight * imgRatio;
            }

            const x = (pageWidth - finalWidth) / 2;
            const y = (pageHeight - finalHeight) / 2;

            // Use the ArrayBuffer directly
            doc.addImage(new Uint8Array(imgData.buffer), 'JPEG', x, y, finalWidth, finalHeight);

            self.postMessage({
                type: 'PROGRESS',
                progress: Math.round(((i + 1) / images.length) * 100)
            });
        }

        const pdfBlob = doc.output('blob');
        self.postMessage({ type: 'COMPLETE', blob: pdfBlob, filename });
    } catch (error) {
        self.postMessage({
            type: 'ERROR',
            error: error instanceof Error ? error.message : String(error)
        });
    }
};
