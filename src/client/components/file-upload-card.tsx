import { FileUpload } from '@/components/file-upload';
import { FileList } from '@/components/file-list';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useFileList } from '@/hooks/use-file-list';

export const FileUploadCard = () => {
	const { mutate } = useFileList();

	return (
		<Card className="w-full max-w-3xl bg-background">
			<CardHeader>
				<CardTitle>Start by uploading a file</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>
					<FileUpload onUploadComplete={mutate} />
					<Separator className="my-8" />
					<FileList />
				</CardDescription>
			</CardContent>
		</Card>
	);
};
