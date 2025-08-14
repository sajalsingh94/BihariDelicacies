import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, Star, Utensils } from 'lucide-react';

export default function HomePage() {
	return (
		<div className="space-y-12">
			{/* Hero */}
			<section className="relative overflow-hidden rounded-2xl shadow-card">
				<div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/40 to-brand-red/30" />
				<Image src="https://images.unsplash.com/photo-1550547660-d9450f859349" alt="Litti chokha" width={1600} height={600} className="w-full h-[320px] md:h-[420px] object-cover" />
				<div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
					<h1 className="text-3xl md:text-5xl font-bold text-brand-dark drop-shadow">Authentic Bihari Delicacies</h1>
					<p className="mt-3 text-brand-dark/90 md:text-lg max-w-2xl">Shop beloved snacks, sweets, and spices. Share and discover homestyle recipes from Bihar.</p>
					<div className="mt-6 flex w-full max-w-2xl gap-2">
						<div className="flex-1 flex items-center bg-white rounded-xl shadow px-3">
							<Search className="text-brand-brown" size={20} />
							<input className="w-full p-3 outline-none" placeholder="Search litti, thekua, sattu…" />
						</div>
						<Link href="/shop" className="bg-brand-red text-white px-5 rounded-xl flex items-center gap-2">
							<ShoppingCart size={18} /> Shop
						</Link>
					</div>
				</div>
			</section>

			{/* Featured Sections */}
			<section className="grid md:grid-cols-3 gap-6">
				<Card title="Popular Products" href="/shop" icon={<ShoppingCart size={18} />}/>
				<Card title="Trending Recipes" href="/recipes" icon={<Utensils size={18} />}/>
				<Card title="Festival Specials" href="/shop?category=festival" icon={<Star size={18} />}/>
			</section>
		</div>
	);
}

function Card({ title, href, icon }: { title: string; href: string; icon: React.ReactNode }) {
	return (
		<Link href={href} className="group rounded-2xl bg-white p-6 shadow-card hover:shadow-lg transition">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-brand-dark">{title}</h3>
				<div className="text-brand-brown">{icon}</div>
			</div>
			<p className="mt-2 text-sm text-brand-brown/80">Explore curated picks inspired by Bihar’s flavors.</p>
			<span className="inline-block mt-4 text-brand-red font-medium group-hover:underline">Browse</span>
		</Link>
	);
}