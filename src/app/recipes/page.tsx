import Link from 'next/link';
import Image from 'next/image';
import { connectToDatabase } from '@/lib/db';
import Recipe from '@/models/Recipe';
import { mockRecipes } from '@/lib/mock';

async function fetchRecipes(searchParams: Record<string, string>) {
	const category = searchParams.category || undefined;
	const q = searchParams.q || '';
	const page = Number(searchParams.page || 1);
	const limit = Number(searchParams.limit || 12);

	const filterFn = (r: any) => (
		(!category || r.category === category) && (!q || new RegExp(q, 'i').test(r.title))
	);

	try {
		await connectToDatabase();
		const filter: any = {};
		if (category) filter.category = category;
		if (q) filter.title = { $regex: q, $options: 'i' };
		const recipes = await Recipe.find(filter)
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit);
		const total = await Recipe.countDocuments(filter);
		return { recipes: JSON.parse(JSON.stringify(recipes)), total, page, pages: Math.ceil(total / limit) };
	} catch {
		const filtered = mockRecipes.filter(filterFn);
		const total = filtered.length;
		const start = (page - 1) * limit;
		const recipes = filtered.slice(start, start + limit);
		return { recipes, total, page, pages: Math.ceil(total / limit) };
	}
}

export default async function RecipesPage({ searchParams }: { searchParams: Record<string, string> }) {
	const { recipes } = await fetchRecipes(searchParams);
	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-bold text-brand-dark">Community Recipes</h1>
				<Link href="/recipes/submit" className="bg-brand-red text-white px-4 py-2 rounded-xl">Submit Recipe</Link>
			</div>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{recipes.map((r: any) => (
					<Link key={r._id} href={`/recipes/${r._id}`} className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-lg transition">
						<Image src={r.images?.[0] || 'https://images.unsplash.com/photo-1544027993-37dbfe43562a'} alt={r.title} width={400} height={260} className="w-full h-48 object-cover" />
						<div className="p-4">
							<h3 className="font-semibold text-brand-dark line-clamp-1">{r.title}</h3>
							<p className="text-brand-brown/80 text-sm line-clamp-2">{r.ingredients?.slice(0,3).join(', ')}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}