import { BackgroundImage } from '@/components/background-image';
import { FileUploadCard } from '@/components/file-upload-card';

export const Home = () => (
	<>
		<BackgroundImage />

		<div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
			<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl">
				Hello there
			</h1>

			<p className="mt-4 text-base text-gray-900 sm:mt-6">
				Every great venture begins its journey from humble beginnings,
				let&apos;s build something unique.
			</p>

			<div className="mt-8 flex flex-col items-center justify-center gap-8 sm:gap-12 lg:flex-row lg:gap-16">
				<FileUploadCard />
			</div>
		</div>
	</>
);
