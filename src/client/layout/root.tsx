import type { PropsWithChildren } from 'react';

export const RootLayout = ({ children }: PropsWithChildren) => (
	<main className="relative isolate h-dvh">{children}</main>
);
