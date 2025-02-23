import type { FileListResponse } from '@/hooks/use-file-list';

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';

interface FileListTableProps extends Pick<FileListResponse, 'files'> {
	caption?: string;
}

export const FileListTable = ({ caption, files }: FileListTableProps) => {
	return (
		<Table>
			{caption && <TableCaption>{caption}</TableCaption>}

			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Size</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{files.map((file) => (
					// TODO: Add an ID to the file object and use it as the key
					<TableRow key={file.name}>
						<TableCell>{file.name}</TableCell>
						{/* TODO: Add file size formatting (KB, MB, etc) */}
						<TableCell>{file.size}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
