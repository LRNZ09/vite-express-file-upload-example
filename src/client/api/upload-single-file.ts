export const uploadSingleFile = async (fileToUpload: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', fileToUpload);

    const response = await fetch('/api/upload-single', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Single file upload failed.');
    }
};
