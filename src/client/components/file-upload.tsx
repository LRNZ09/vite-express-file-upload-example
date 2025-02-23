import { Blocks } from 'lucide-react';
import { useCallback, useState } from 'react';

import { FileInput, type FileInputProps } from './file-input';
import {
	FileUploadButton,
	type FileUploadButtonProps,
} from './file-upload-button';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type FileUploadProps = Pick<FileInputProps, 'accept'> &
	Pick<FileUploadButtonProps, 'onUploadComplete'>;

export const FileUpload = ({ accept, onUploadComplete }: FileUploadProps) => {
	const [file, setFile] = useState<File | null>(null);

	const handleFileSelect = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const selectedFile = event.target.files?.[0];
			if (!selectedFile) {
				alert('No file selected.');
				return;
			}

			setFile(selectedFile);
		},
		[],
	);

	return (
		<div className="flex flex-col items-center justify-center gap-2">
			<Alert>
				<Blocks className="h-4 w-4" />
				<AlertTitle>Heads up!</AlertTitle>
				<AlertDescription>
					If your file is too large, it may be chunked and uploaded in smaller
					parts.
				</AlertDescription>
			</Alert>

			<FileInput
				id="upload-file-input"
				accept={accept}
				onChange={handleFileSelect}
			/>

			{file && (
				<FileUploadButton file={file} onUploadComplete={onUploadComplete} />
			)}
		</div>
	);
};
