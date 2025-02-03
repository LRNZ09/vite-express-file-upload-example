import { useBoolean, useCounter, useDebounce } from 'ahooks';
import { Loader2, Upload } from 'lucide-react';
import { useCallback } from 'react';

import { uploadChunkFile } from '@/api/upload-chunk-file';
import { uploadSingleFile } from '@/api/upload-single-file';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useFileList } from '@/hooks/use-file-list';
import { useToast } from '@/hooks/use-toast';

import { ToastAction } from './ui/toast';

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
    const [isUploading, { setTrue: setIsUploading, setFalse: setIsNotUploading }] = useBoolean(false);
    const [progress, { set: setProgress, reset: resetProgress }] = useCounter(0, { min: 0, max: 100 });
    const { toast } = useToast();

    const { mutate } = useFileList();

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
    }, [chunkSize, file, setProgress]);

    const handleUpload = useCallback(async () => {
        setIsUploading();
        resetProgress();

        try {
            if (file.size > chunkThreshold) {
                await splitAndUploadFileChunks();
            } else {
                await uploadSingleFile(file);
            }

            // * Refresh the file list after successful upload
            await mutate();

            toast({
                description: 'File uploaded successfully.',
            });
        } catch {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your file upload.',
                action: (
                    <ToastAction altText="Try again" onClick={handleUpload}>
                        Try again
                    </ToastAction>
                ),
            });
        } finally {
            setIsNotUploading();
        }
    }, [
        chunkThreshold,
        file,
        mutate,
        resetProgress,
        setIsNotUploading,
        setIsUploading,
        splitAndUploadFileChunks,
        toast,
    ]);

    const debouncedIsUploading = useDebounce(isUploading, { wait: 500 });

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            {/* Avoid using the debounced value for the button to prevent unintentional double-clicks. */}
            <Button onClick={handleUpload} disabled={isUploading}>
                {debouncedIsUploading ? <Loader2 className="animate-spin" /> : <Upload />}
                Upload File
            </Button>

            {debouncedIsUploading && (
                <div className="gap-2 w-full">
                    <Progress value={progress} className="w-full" />
                    <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}%</p>
                </div>
            )}
        </div>
    );
};
