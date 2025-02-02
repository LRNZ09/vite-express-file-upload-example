import { useCallback, useState } from 'react';

import { FileInput, type FileInputProps } from './file-input';
import { FileUploadButton } from './file-upload-button';

type FileUploadProps = Pick<FileInputProps, 'accept'>;

export const FileUpload = ({ accept }: FileUploadProps) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) {
            alert('No file selected.');
            return;
        }

        setFile(selectedFile);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <FileInput id="upload-file-input" accept={accept} onChange={handleFileSelect} />

            {file && <FileUploadButton file={file} />}
        </div>
    );
};
