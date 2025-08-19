"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, FileDown, MessageCircle, Phone, PlayCircle, Sparkles, Target, Users } from 'lucide-react';

export default function CoachLandingPage() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className="min-h-screen bg-white text-neutral-900">
			<SiteHeader onPrimaryCta={() => setIsModalOpen(true)} />
			<main className="max-w-7xl mx-auto container-padding space-y-20 md:space-y-28">
				<Hero onPrimaryCta={() => setIsModalOpen(true)} />
				<WhySection />
				<OverviewSection />
				<HighlightsSection />
				<DifferentiatorsSection />
				<ProcessSection />
				<TestimonialsSection />
				<ResourcesSection />
				<ContactSection />
			</main>
			<SiteFooter />
			{isModalOpen && <LeadModal onClose={() => setIsModalOpen(false)} />}
		</div>
	);
}

function SiteHeader({ onPrimaryCta }: { onPrimaryCta: () => void }) {
	return (
		<header className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b">
			<div className="max-w-7xl mx-auto container-padding h-16 flex items-center justify-between">
				<Link href="#" className="font-extrabold text-xl tracking-tight">
					<span className="text-neutral-900">The Coach</span> <span className="text-indigo-600">Programme</span>
				</Link>
				<nav className="hidden md:flex items-center gap-6 text-sm text-neutral-700">
					<a href="#why" className="hover:text-indigo-600">Why</a>
					<a href="#overview" className="hover:text-indigo-600">Programme</a>
					<a href="#features" className="hover:text-indigo-600">Highlights</a>
					<a href="#differentiators" className="hover:text-indigo-600">Differentiators</a>
					<a href="#process" className="hover:text-indigo-600">How It Works</a>
					<a href="#testimonials" className="hover:text-indigo-600">Testimonials</a>
					<a href="#contact" className="hover:text-indigo-600">Contact</a>
				</nav>
				<div className="flex items-center gap-3">
					<button onClick={onPrimaryCta} className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700">
						Book a Mentor Call <ArrowRight size={16} />
					</button>
				</div>
			</div>
		</header>
	);
}

function Hero({ onPrimaryCta }: { onPrimaryCta: () => void }) {
	return (
		<section className="relative overflow-hidden rounded-2xl shadow-card">
			<div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50" />
			<Image src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1920&auto=format&fit=crop" alt="Mentorship and study" width={1920} height={800} className="w-full h-[360px] md:h-[520px] object-cover opacity-80" />
			<div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
				<h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 drop-shadow-sm">The Coach Programme 2026</h1>
				<p className="mt-3 text-lg md:text-2xl text-neutral-800">Mentorship, not just coaching – for every aspirant</p>
				<p className="mt-4 max-w-2xl text-neutral-700">Personalized guidance across UPSC, SSC, Banking, CAT, State PSCs, and more. A roadmap tailored to your strengths, weaknesses, and goals.</p>
				<div className="mt-6 flex flex-col sm:flex-row gap-3">
					<button onClick={onPrimaryCta} className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700">
						Book a Mentor Call <Phone size={16} />
					</button>
					<a href="#overview" className="inline-flex items-center gap-2 bg-white text-neutral-900 px-6 py-3 rounded-xl shadow hover:bg-neutral-50">
						Get Started <ArrowRight size={16} />
					</a>
				</div>
			</div>
		</section>
	);
}

function WhySection() {
	const items = [
		{ title: 'Lack of direction & strategy', icon: Target },
		{ title: 'Information overload', icon: BookOpen },
		{ title: 'Weak answer-writing or practice skills', icon: MessageCircle },
		{ title: 'Poor consistency & self-discipline', icon: CheckCircle2 },
		{ title: 'No structured mentorship or feedback', icon: Users }
	];
	return (
		<section id="why" className="scroll-mt-24">
			<h2 className="text-2xl md:text-3xl font-bold">Why students struggle</h2>
			<p className="mt-2 text-neutral-700 max-w-3xl">Common pain points across competitive exams that derail progress. We solve these with clarity, structure, and accountability.</p>
			<div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{items.map(({ title, icon: Icon }) => (
					<div key={title} className="rounded-2xl bg-white p-6 shadow-card border">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-lg bg-indigo-50 text-indigo-700"><Icon size={18} /></div>
							<h3 className="font-semibold">{title}</h3>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

function OverviewSection() {
	return (
		<section id="overview" className="scroll-mt-24">
			<div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 md:p-12 shadow-card">
				<h2 className="text-2xl md:text-3xl font-bold">Programme overview</h2>
				<ul className="mt-6 space-y-3 text-indigo-50">
					<li className="flex items-start gap-3"><CheckCircle2 className="mt-1" size={18} /> Mentor-led preparation adaptable to UPSC, SSC, Banking, CAT, State PSCs, and more.</li>
					<li className="flex items-start gap-3"><CheckCircle2 className="mt-1" size={18} /> Personalized roadmap based on your strengths, weaknesses, and exam choice.</li>
					<li className="flex items-start gap-3"><CheckCircle2 className="mt-1" size={18} /> Continuous evaluation, consistent practice, and confidence building.</li>
				</ul>
			</div>
		</section>
	);
}

function HighlightsSection() {
	const features = [
		{ title: 'One-to-one mentorship sessions', description: 'Regular 1:1 calls for planning, feedback, and accountability.' },
		{ title: 'Personalized study plans & diagnostics', description: 'Deep-dive assessment to tailor your weekly plan.' },
		{ title: 'Regular practice', description: 'MCQs, descriptive answers, and essay writing aligned to your exam.' },
		{ title: 'Doubt-solving & motivational check-ins', description: 'Get unstuck quickly and stay consistent.' },
		{ title: 'Structured assessments', description: 'Topic tests, sectionals, and full mocks with review.' },
		{ title: 'Workshops', description: 'Essay, CSAT, mock interviews, and more.' }
	];
	return (
		<section id="features" className="scroll-mt-24">
			<h2 className="text-2xl md:text-3xl font-bold">Key highlights</h2>
			<div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{features.map((f) => (
					<div key={f.title} className="rounded-2xl bg-white p-6 shadow-card border">
						<div className="flex items-center gap-2 text-indigo-700 font-semibold"><Sparkles size={16} /> {f.title}</div>
						<p className="mt-2 text-neutral-700">{f.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}

function DifferentiatorsSection() {
	const points = [
		'Personalized mentorship, not generic coaching',
		'Discipline + motivation alongside academics',
		'Multi-exam adaptability (UPSC, SSC, Banking, CAT, State PSCs, etc.)'
	];
	return (
		<section id="differentiators" className="scroll-mt-24">
			<div className="rounded-2xl border bg-white p-8 shadow-card">
				<h2 className="text-2xl md:text-3xl font-bold">What sets us apart</h2>
				<ul className="mt-6 grid md:grid-cols-3 gap-4">
					{points.map((p) => (
						<li key={p} className="flex items-start gap-3"><CheckCircle2 className="mt-1 text-indigo-600" size={18} /> <span className="text-neutral-800">{p}</span></li>
					))}
				</ul>
			</div>
		</section>
	);
}

function ProcessSection() {
	const steps = [
		{ title: 'Fill registration form', desc: 'Tell us your exam, stage, and schedule.', cta: 'Register now', href: '#contact' },
		{ title: 'Mentor call scheduled', desc: 'We understand your needs and plan the path.', cta: 'Book call', href: '#contact' },
		{ title: 'Receive personalized plan', desc: 'Your roadmap, milestones, and evaluation cadence.', cta: 'View sample', href: '#resources' },
		{ title: 'Begin mentorship journey', desc: 'Track progress with consistent practice and feedback.', cta: 'Get started', href: '#overview' }
	];
	return (
		<section id="process" className="scroll-mt-24">
			<h2 className="text-2xl md:text-3xl font-bold">How it works</h2>
			<ol className="mt-8 grid md:grid-cols-4 gap-6">
				{steps.map((s, i) => (
					<li key={s.title} className="rounded-2xl bg-white p-6 shadow-card border">
						<div className="text-sm text-neutral-500">Step {i + 1}</div>
						<h3 className="mt-1 font-semibold">{s.title}</h3>
						<p className="mt-2 text-neutral-700">{s.desc}</p>
						<a href={s.href} className="mt-4 inline-flex items-center gap-2 text-indigo-700 font-medium hover:underline">
							{s.cta} <ArrowRight size={14} />
						</a>
					</li>
				))}
			</ol>
		</section>
	);
}

function TestimonialsSection() {
	const testimonials = [
		{ quote: 'Cleared my State PSC prelims with a clear plan and weekly reviews. The 1:1 calls kept me on track.', name: 'Aditi', exam: 'State PSC' },
		{ quote: 'Shifted from generic notes to targeted answer writing for UPSC Mains. Game changer.', name: 'Rahul', exam: 'UPSC Mains' },
		{ quote: 'Balanced CAT prep with work using a realistic plan and consistent mocks.', name: 'Meera', exam: 'CAT' }
	];
	return (
		<section id="testimonials" className="scroll-mt-24">
			<h2 className="text-2xl md:text-3xl font-bold">Testimonials</h2>
			<div className="mt-8 grid md:grid-cols-3 gap-6">
				{testimonials.map((t) => (
					<figure key={t.name} className="rounded-2xl bg-white p-6 shadow-card border">
						<blockquote className="text-neutral-800">“{t.quote}”</blockquote>
						<figcaption className="mt-3 text-sm text-neutral-600">— {t.name}, {t.exam}</figcaption>
					</figure>
				))}
			</div>
		</section>
	);
}

function ResourcesSection() {
	return (
		<section id="resources" className="scroll-mt-24">
			<div className="rounded-2xl bg-white p-6 md:p-8 shadow-card border flex flex-col md:flex-row items-center gap-6">
				<div className="flex-1">
					<h2 className="text-2xl md:text-3xl font-bold">Brochure & resources</h2>
					<p className="mt-2 text-neutral-700">Download the programme brochure and watch the intro video to understand how mentorship works.</p>
					<div className="mt-4 flex flex-wrap gap-3">
						<a href="#contact" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"><FileDown size={16} /> Download brochure</a>
						<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg hover:bg-neutral-200"><PlayCircle size={16} /> Watch video</a>
					</div>
				</div>
				<div className="w-full md:w-[380px]">
					<div className="aspect-video w-full overflow-hidden rounded-xl border">
						<Image src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop" alt="Workshop" width={1200} height={675} className="w-full h-full object-cover" />
					</div>
				</div>
			</div>
		</section>
	);
}

function ContactSection() {
	return (
		<section id="contact" className="scroll-mt-24">
			<div className="rounded-2xl bg-gradient-to-r from-neutral-50 to-neutral-100 p-8 md:p-12 border shadow-card">
				<h2 className="text-2xl md:text-3xl font-bold">Contact</h2>
				<div className="mt-6 grid md:grid-cols-3 gap-6 text-neutral-800">
					<div>
						<div className="font-semibold">Phone</div>
						<a className="text-indigo-700 hover:underline" href="tel:+919999999999">+91 99999 99999</a>
					</div>
					<div>
						<div className="font-semibold">Email</div>
						<a className="text-indigo-700 hover:underline" href="mailto:hello@coachprogramme.com">hello@coachprogramme.com</a>
					</div>
					<div>
						<div className="font-semibold">Office</div>
						<p>2nd Floor, Learning Hub, Connaught Place, New Delhi</p>
					</div>
				</div>
				<div className="mt-6 flex items-center gap-4 text-sm">
					<Link href="/privacy" className="text-neutral-700 hover:underline">Privacy Policy</Link>
					<Link href="/terms" className="text-neutral-700 hover:underline">Terms & Conditions</Link>
					<div className="ml-auto flex items-center gap-3">
						<a href="#" aria-label="Twitter" className="text-neutral-600 hover:text-indigo-700">X</a>
						<a href="#" aria-label="LinkedIn" className="text-neutral-600 hover:text-indigo-700">LinkedIn</a>
						<a href="#" aria-label="YouTube" className="text-neutral-600 hover:text-indigo-700">YouTube</a>
					</div>
				</div>
			</div>
		</section>
	);
}

function SiteFooter() {
	return (
		<footer className="border-t mt-20">
			<div className="max-w-7xl mx-auto container-padding py-8 text-sm text-neutral-600 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
				<p>© {new Date().getFullYear()} The Coach Programme</p>
				<nav className="flex gap-4">
					<Link href="/privacy" className="hover:underline">Privacy</Link>
					<Link href="/terms" className="hover:underline">Terms</Link>
				</nav>
			</div>
		</footer>
	);
}

function LeadModal({ onClose }: { onClose: () => void }) {
	return (
		<div className="fixed inset-0 z-50 grid place-items-center">
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />
			<div className="relative z-10 w-[92vw] max-w-lg rounded-2xl bg-white p-6 shadow-2xl border">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold">Book a mentor call</h3>
					<button onClick={onClose} className="text-neutral-500 hover:text-neutral-700">Close</button>
				</div>
				<form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); onClose(); alert('Thanks! We will contact you shortly.'); }}>
					<div>
						<label className="block text-sm font-medium">Full name</label>
						<input required className="mt-1 w-full rounded-lg border p-2" placeholder="Your name" />
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<div>
							<label className="block text-sm font-medium">Email</label>
							<input type="email" required className="mt-1 w-full rounded-lg border p-2" placeholder="you@example.com" />
						</div>
						<div>
							<label className="block text-sm font-medium">Phone</label>
							<input type="tel" required className="mt-1 w-full rounded-lg border p-2" placeholder="+91xxxxxxxxxx" />
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium">Exam</label>
						<select className="mt-1 w-full rounded-lg border p-2">
							<option>UPSC</option>
							<option>SSC</option>
							<option>Banking</option>
							<option>CAT</option>
							<option>State PSCs</option>
							<option>Other</option>
						</select>
					</div>
					<button className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700">
						Submit <ArrowRight size={16} />
					</button>
				</form>
			</div>
		</div>
	);
}

