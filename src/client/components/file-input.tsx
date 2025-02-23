import type { PropsWithChildren } from 'react';
import type { SetRequired } from 'type-fest';

import { Input } from './ui/input';
import { Label } from './ui/label';

export type FileInputProps = PropsWithChildren<
	SetRequired<
		Pick<
			React.InputHTMLAttributes<HTMLInputElement>,
			'accept' | 'id' | 'onChange'
		>,
		'id'
	>
>;

export const FileInput = ({
	children,
	id: inputId,
	...props
}: FileInputProps) => (
	<>
		<Label htmlFor={inputId}>{children}</Label>
		<Input
			id={inputId}
			type="file"
			aria-label={children ? undefined : 'File input'}
			{...props}
		/>
	</>
);
