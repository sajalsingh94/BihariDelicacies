import Link from 'next/link';

export function Footer() {
	return (
		<footer className="border-t mt-12">
			<div className="max-w-7xl mx-auto container-padding py-8 text-sm text-brand-brown/80 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
				<p>© {new Date().getFullYear()} Bihari Delicacies</p>
				<nav className="flex gap-4">
					<Link href="/privacy" className="hover:underline">Privacy</Link>
					<Link href="/terms" className="hover:underline">Terms</Link>
				</nav>
			</div>
		</footer>
	);
}