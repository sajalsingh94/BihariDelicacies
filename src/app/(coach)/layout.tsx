import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
	title: 'The Coach Programme 2026 – Mentorship for Every Aspirant',
	description: 'Personalized, mentor-led preparation across UPSC, SSC, Banking, CAT, State PSCs, and more. Discipline + motivation + academics.'
};

export default function CoachLayout({ children }: { children: React.ReactNode }) {
	return children;
}

