import { useFileList } from '@/hooks/use-file-list';

import { FileListTable } from './file-list-table';
import { Skeleton } from './ui/skeleton';

export const FileList = () => {
	const { data } = useFileList();

	// TODO: Add better loading and error handling

	if (data === undefined) {
		return (
			<div className="flex flex-row gap-4 items-center justify-center">
				<Skeleton className="h-4 w-3/5" />
				<Skeleton className="h-4 w-2/5" />
			</div>
		);
	}

	return (
		<FileListTable
			caption="A list of your uploaded files."
			files={data.files}
		/>
	);
};
