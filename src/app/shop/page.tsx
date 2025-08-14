import Link from 'next/link';
import Image from 'next/image';
import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';
import { mockProducts } from '@/lib/mock';

async function fetchProducts(searchParams: Record<string, string>) {
	const category = searchParams.category || undefined;
	const min = Number(searchParams.min || 0);
	const max = Number(searchParams.max || Number.MAX_SAFE_INTEGER);
	const q = searchParams.q || '';
	const page = Number(searchParams.page || 1);
	const limit = Number(searchParams.limit || 12);

	const filterFn = (p: any) => (
		(p.price >= min && p.price <= max) &&
		(!category || p.category === category) &&
		(!q || new RegExp(q, 'i').test(p.title))
	);

	try {
		await connectToDatabase();
		const filter: any = { price: { $gte: min, $lte: max } };
		if (category) filter.category = category;
		if (q) filter.title = { $regex: q, $options: 'i' };
		const products = await Product.find(filter)
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit);
		const total = await Product.countDocuments(filter);
		return { products: JSON.parse(JSON.stringify(products)), total, page, pages: Math.ceil(total / limit) };
	} catch {
		const filtered = mockProducts.filter(filterFn);
		const total = filtered.length;
		const start = (page - 1) * limit;
		const products = filtered.slice(start, start + limit);
		return { products, total, page, pages: Math.ceil(total / limit) };
	}
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