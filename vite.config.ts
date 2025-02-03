import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        env: {
            NODE_ENV: 'test',
        },
        setupFiles: [
            './vitest-testing-library-setup.ts', // https://testing-library.com/docs/react-testing-library/setup#auto-cleanup-in-vitest
        ],
    },
});
