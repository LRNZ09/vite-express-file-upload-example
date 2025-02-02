export const uploadChunkFile = async (
    fileChunkToUpload: Blob,
    fileNameToUpload: string,
    currentChunkIndex: number,
    totalChunks: number
): Promise<void> => {
    const formData = new FormData();
    formData.append('file', fileChunkToUpload, fileNameToUpload);
    formData.append('currentChunkIndex', currentChunkIndex.toString());
    formData.append('totalChunks', totalChunks.toString());

    const response = await fetch('/api/upload-chunk', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('File chunk upload failed.');
    }
};
