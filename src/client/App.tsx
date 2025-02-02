import type { ReactElement } from "react";

import { Toaster } from "@/components/ui/toaster";
import { RootLayout } from "@/layout/root";
import { Home } from "@/pages/home";

export const App = (): ReactElement => (
	<RootLayout>
		<Home />

		<Toaster />
	</RootLayout>
);
