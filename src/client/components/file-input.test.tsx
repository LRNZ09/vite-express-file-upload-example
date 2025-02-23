import { fc, test } from '@fast-check/vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect } from 'vitest';

import { FileInput } from './file-input';

const labelArb = fc.lorem({ mode: 'words' });
const inputIdAttributeArb = fc.stringMatching(/^[a-z]+(-[a-z]+)*$/);
const acceptAttributeArb = fc.string();
const fileContentArb = fc.lorem({ mode: 'sentences' });

describe('FileInput', () => {
	test('match snapshot', () => {
		const { container } = render(<FileInput id="file-input-id" />);

		expect(container).toMatchSnapshot();
	});

	test.prop([inputIdAttributeArb])('handle input id correctly', (inputId) => {
		render(<FileInput id={inputId} />);

		const inputElement = screen.getByLabelText('File input');

		expect(inputElement).toHaveAttribute('id', inputId);
	});

	test.prop([inputIdAttributeArb, labelArb], {
		examples: [
			['select-file-input-id', 'Select file'],
			['choose-file-input-id', 'Choose file'],
			['upload-file-input-id', 'Upload file'],
		],
	})('handle label correctly', (inputId, label) => {
		render(<FileInput id={inputId}>{label}</FileInput>);

		const inputElement = screen.queryByLabelText(label);

		expect(inputElement).toBeInTheDocument();
	});

	test.prop([inputIdAttributeArb, acceptAttributeArb], {
		examples: [
			['image-file-input-id', 'image/*'],
			['audio-file-input-id', 'audio/*'],
			['video-file-input-id', 'video/*'],
			['pdf-file-input-id', '.pdf'],
		],
	})('handle accept correctly', (inputId, accept) => {
		render(<FileInput id={inputId} accept={accept} />);

		const inputElement = screen.getByLabelText('File input');

		expect(inputElement).toHaveAttribute('accept', accept);
	});

	test.prop([
		inputIdAttributeArb,
		fc.func(fc.constant(undefined)),
		fileContentArb,
	])(
		'handle when a file is chosen',
		async (inputId, handleChange, fileContent) => {
			const user = userEvent.setup();

			render(<FileInput id={inputId} onChange={handleChange} />);

			const inputElement = screen.getByLabelText('File input');

			const file = new File([fileContent], `${inputId}-file.txt`, {
				type: 'text/plain',
			});
			await user.upload(inputElement, file);

			expect((inputElement as HTMLInputElement).files).toContainEqual(file);
		},
	);
});
