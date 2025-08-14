"use client";

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
			<Provider store={store}>
				{children}
				<Toaster position="top-right" />
			</Provider>
		</ThemeProvider>
	);
}