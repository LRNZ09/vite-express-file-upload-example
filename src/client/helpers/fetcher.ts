import { type SetReturnType } from 'type-fest';

export const fetcher: SetReturnType<typeof fetch, Promise<unknown>> = async (...args) => {
    const response = await fetch(...args);
    return response.json();
};
