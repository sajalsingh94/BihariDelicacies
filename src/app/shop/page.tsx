import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';

function getBaseUrl() {
	const hdrs = headers();
	const host = hdrs.get('host') || 'localhost:3000';
	const proto = hdrs.get('x-forwarded-proto') || (process.env.NODE_ENV === 'production' ? 'https' : 'http');
	return `${proto}://${host}`;
}

async function fetchProducts(searchParams: Record<string, string>) {
	const qs = new URLSearchParams(searchParams as any).toString();
	const res = await fetch(`${getBaseUrl()}/api/products?${qs}`, { cache: 'no-store' });
	return res.json();
}

export default async function ShopPage({ searchParams }: { searchParams: Record<string, string> }) {
	const { products, page, pages } = await fetchProducts(searchParams);
	return (
		<div className="grid md:grid-cols-[240px_1fr] gap-6">
			<aside className="bg-white p-4 rounded-2xl shadow-card h-fit space-y-4">
				<h3 className="font-semibold text-brand-dark">Filters</h3>
				<form className="space-y-3">
					<select name="category" defaultValue={searchParams.category} className="w-full border rounded-xl p-2">
						<option value="">All Categories</option>
						{['Snacks','Sweets','Spices','Beverages','Main Dishes','Pickles','Condiments','Festival Specials'].map(c => (
							<option key={c} value={c}>{c}</option>
						))}
					</select>
					<div className="flex gap-2">
						<input type="number" name="min" placeholder="Min" defaultValue={searchParams.min} className="w-1/2 border rounded-xl p-2"/>
						<input type="number" name="max" placeholder="Max" defaultValue={searchParams.max} className="w-1/2 border rounded-xl p-2"/>
					</div>
					<button className="w-full bg-brand-red text-white py-2 rounded-xl">Apply</button>
				</form>
			</aside>
			<section>
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{products.map((p: any) => (
						<Link key={p._id} href={`/shop/${p._id}`} className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-lg transition">
							<Image src={p.images?.[0] || 'https://images.unsplash.com/photo-1604908554027-42c5a4e1b7db'} alt={p.title} width={400} height={260} className="w-full h-48 object-cover" />
							<div className="p-4">
								<h3 className="font-semibold text-brand-dark line-clamp-1">{p.title}</h3>
								<p className="text-brand-brown/80 text-sm line-clamp-2">{p.description}</p>
								<div className="mt-3 flex items-center justify-between">
									<span className="font-bold">₹{p.price}</span>
									<span className="text-sm">⭐ {p.rating || 0}</span>
								</div>
							</div>
						</Link>
					))}
				</div>
				<div className="flex items-center justify-center gap-2 mt-6">
					{Array.from({ length: pages }).map((_, idx) => {
						const query = new URLSearchParams({ ...searchParams, page: String(idx + 1) }).toString();
						return <Link key={idx} href={`/shop?${query}`} className={`px-3 py-1 rounded ${page === idx + 1 ? 'bg-brand-red text-white' : 'bg-white'}`}>{idx + 1}</Link>;
					})}
				</div>
			</section>
		</div>
	);
}