import { Loader2, Upload } from 'lucide-react';
import { useCallback, useState } from 'react';

import { uploadSingleFile } from '@/api/upload-single-file';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export interface FileUploadButtonProps {
    file: File;
}

export const FileUploadButton = ({ file }: FileUploadButtonProps) => {
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleUpload = useCallback(async () => {
        setUploading(true);
        setProgress(0);

        try {
            await uploadSingleFile(file);
        } finally {
            setUploading(false);
        }
    }, [file]);

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
