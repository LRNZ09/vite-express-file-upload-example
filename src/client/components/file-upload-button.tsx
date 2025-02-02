import { Loader2, Upload } from 'lucide-react';
import { useCallback, useState } from 'react';

import { uploadChunkFile } from '@/api/upload-chunk-file';
import { uploadSingleFile } from '@/api/upload-single-file';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export interface FileUploadButtonProps {
    file: File;
    chunkSize?: number;
    chunkThreshold?: number;
}

const DEFAULT_CHUNK_SIZE = 1024 * 1024; // 1MB
const DEFAULT_CHUNK_THRESHOLD = 5 * DEFAULT_CHUNK_SIZE; // 5MB

export const FileUploadButton = ({
    file,
    chunkSize = DEFAULT_CHUNK_SIZE,
    chunkThreshold = DEFAULT_CHUNK_THRESHOLD,
}: FileUploadButtonProps) => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const splitAndUploadFileChunks = useCallback(async (): Promise<void> => {
        // * We ensure that if the file size is not perfectly divisible by the chunk size, an additional chunk is created to accommodate the remainder
        const totalChunks = Math.ceil(file.size / chunkSize);

        const chunks = Array.from({ length: totalChunks }).map((_, index) => {
            const start = index * chunkSize;
            // * We ensure that the end value is capped at file size
            const end = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, end);
            return { chunk, index };
        });

        for (const { chunk, index } of chunks) {
            await uploadChunkFile(chunk, file.name, index, totalChunks);
            const partialProgress = ((index + 1) / totalChunks) * 100;
            setProgress(partialProgress);
        }
    }, [chunkSize, file]);

    const handleUpload = useCallback(async () => {
        setUploading(true);
        setProgress(0);

        try {
            if (file.size > chunkThreshold) {
                await splitAndUploadFileChunks();
            } else {
                await uploadSingleFile(file);
            }
        } finally {
            setUploading(false);
        }
    }, [chunkThreshold, file, splitAndUploadFileChunks]);

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <Button onClick={handleUpload} disabled={uploading}>
                {uploading ? <Loader2 className="animate-spin" /> : <Upload />}
                Upload File
            </Button>

            {uploading && (
                <div className="gap-2 w-full">
                    <Progress value={progress} className="w-full" />
                    <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}%</p>
                </div>
            )}
        </div>
    );
};
