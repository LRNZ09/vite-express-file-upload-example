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
            './vitest-fast-check-setup.ts', // https://fast-check.dev/docs/configuration/global-settings/#vitest
            './vitest-testing-library-setup.ts', // https://testing-library.com/docs/react-testing-library/setup#auto-cleanup-in-vitest
        ],
    },
});
