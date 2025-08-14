"use client";

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const navItems = [
	{ href: '/', label: 'Home' },
	{ href: '/shop', label: 'Shop' },
	{ href: '/recipes', label: 'Recipes' },
	{ href: '/about', label: 'About Us' },
	{ href: '/contact', label: 'Contact' },
];

export function Header() {
	const pathname = usePathname();
	const cartCount = useSelector((s: RootState) => s.cart.items.reduce((n, i) => n + i.quantity, 0));
	return (
		<header className="sticky top-0 z-40 backdrop-blur bg-[rgba(255,248,231,0.7)] border-b">
			<div className="max-w-7xl mx-auto container-padding flex items-center justify-between h-16">
				<Link href="/" className="font-extrabold text-brand-brown text-xl">Bihari Delicacies</Link>
				<nav className="hidden md:flex items-center gap-6">
					{navItems.map((item) => (
						<Link key={item.href} href={item.href} className={`text-sm font-medium ${pathname === item.href ? 'text-brand-red' : 'text-brand-dark/80 hover:text-brand-red'}`}>{item.label}</Link>
					))}
				</nav>
				<div className="flex items-center gap-3">
					<Link href="/login" className="text-sm font-medium text-brand-dark/80 hover:text-brand-red">Login</Link>
					<Link href="/cart" className="relative p-2 rounded-lg bg-white shadow">
						<ShoppingCart size={18} />
						<span className="absolute -top-2 -right-2 bg-brand-red text-white text-xs w-5 h-5 grid place-items-center rounded-full">{cartCount}</span>
					</Link>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}