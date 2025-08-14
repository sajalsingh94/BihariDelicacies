import Link from 'next/link';
import Image from 'next/image';

async function fetchRecipes(searchParams: Record<string, string>) {
	const qs = new URLSearchParams(searchParams as any).toString();
	const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/recipes?${qs}`, { cache: 'no-store' });
	return res.json();
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