"use client";

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const isDark = theme === 'dark';
	return (
		<button
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			className="p-2 rounded-lg bg-white shadow"
			aria-label="Toggle theme"
		>
			{isDark ? <Sun size={18} /> : <Moon size={18} />}
		</button>
	);
}