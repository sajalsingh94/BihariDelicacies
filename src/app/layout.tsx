import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Bihari Delicacies – Online Marketplace Hub',
	description: 'Shop authentic Bihari snacks, sweets, and spices. Explore recipes and sell your homemade delicacies.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers>
					<Header />
					<main className="min-h-screen container-padding max-w-7xl mx-auto">{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}