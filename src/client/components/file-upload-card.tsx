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

export const FileUploadCard = () => {
	return (
		<Card className="w-full max-w-3xl bg-background">
			<CardHeader>
				<CardTitle>Start by uploading a file</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription>
					<FileUpload />
					<Separator className="my-8" />
					<FileList />
				</CardDescription>
			</CardContent>
		</Card>
	);
};
