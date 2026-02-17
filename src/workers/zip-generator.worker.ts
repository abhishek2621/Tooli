/* eslint-disable no-restricted-globals */
import JSZip from 'jszip';

const ctx: Worker = self as unknown as Worker;

interface ZipFileEntry {
    name: string;
    data: ArrayBuffer;
}

interface ZipMessage {
    type: 'GENERATE';
    files: ZipFileEntry[];
    zipFilename: string;
}

ctx.onmessage = async (event: MessageEvent<ZipMessage>) => {
    const { type, files, zipFilename } = event.data;

    if (type === 'GENERATE') {
        try {
            const zip = new JSZip();

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                zip.file(file.name, file.data);

                ctx.postMessage({
                    type: 'PROGRESS',
                    progress: Math.round(((i + 1) / files.length) * 50), // First 50% is adding files
                });
            }

            ctx.postMessage({
                type: 'PROGRESS',
                progress: 60,
                message: 'Compressing...',
            });

            const blob = await zip.generateAsync(
                { type: 'blob' },
                (metadata) => {
                    // This callback fires during compression
                    ctx.postMessage({
                        type: 'PROGRESS',
                        progress: 60 + Math.round(metadata.percent * 0.4), // Last 40%
                    });
                }
            );

            ctx.postMessage({ type: 'DONE', blob, zipFilename });
        } catch (error) {
            ctx.postMessage({
                type: 'ERROR',
                message: error instanceof Error ? error.message : 'ZIP generation failed',
            });
        }
    }
};

export { };
