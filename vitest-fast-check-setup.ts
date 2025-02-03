import { fc } from '@fast-check/vitest';
import { cleanup } from '@testing-library/react';

fc.configureGlobal({
    afterEach: cleanup,
    errorWithCause: true,
    ignoreEqualValues: true,
});
