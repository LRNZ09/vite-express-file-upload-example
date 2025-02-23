import useSWR, { type Fetcher } from 'swr';

import { fetcher } from '@/helpers/fetcher';

export interface FileListResponse {
	readonly files: readonly { readonly name: string; readonly size: number }[];
}

// TODO: Use a typed API to share the response type between the server and client
export const useFileList = () =>
	useSWR('/api/files', fetcher as Fetcher<FileListResponse>);
