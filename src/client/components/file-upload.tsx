import { useCallback, useState } from 'react';

import { FileInput, type FileInputProps } from './file-input';

type FileUploadProps = Pick<FileInputProps, 'accept'>;

export const FileUpload = ({ accept }: FileUploadProps) => {
    const [, setFile] = useState<File | null>(null);

    const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) {
            alert('No file selected.');
            return;
        }

        setFile(selectedFile);
    }, []);

    return <FileInput id="upload-file-input" accept={accept} onChange={handleFileSelect} />;
};
