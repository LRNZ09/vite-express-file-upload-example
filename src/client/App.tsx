import { type ReactElement } from 'react';

export const App = (): ReactElement => {
    return (
        <main className="relative isolate h-dvh">
            <img
                src="https://picsum.photos/1280/720?grayscale&blur=4"
                alt="background image"
                aria-hidden="true"
                className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
            />

            <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl">Hello there</h1>
                <p className="mt-4 text-base text-gray-900 sm:mt-6">
                    Everything brand starts small, let&apos;s build something great.
                </p>
            </div>
        </main>
    );
};
