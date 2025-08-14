import Image from 'next/image';

async function fetchRecipe(id: string) {
	const base = process.env.NEXT_PUBLIC_SITE_URL || '';
	const res = await fetch(`${base}/api/recipes?recipeId=${id}`, { cache: 'no-store' });
	return res.json();
}

export default async function RecipeDetailPage({ params }: { params: { id: string } }) {
	// Simplified: fetch list and filter client-side if needed (API-by-id can be added later)
	const data = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/recipes`, { cache: 'no-store' }).then(r => r.json());
	const recipe = (data.recipes || []).find((r: any) => r._id === params.id);
	if (!recipe) return <div className="py-12">Recipe not found.</div>;
	return (
		<article className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-card">
			<div className="aspect-[16/9] w-full overflow-hidden rounded-xl">
				<Image src={recipe.images?.[0] || 'https://images.unsplash.com/photo-1544027993-37dbfe43562a'} alt={recipe.title} width={1200} height={675} className="w-full h-full object-cover" />
			</div>
			<h1 className="text-2xl font-bold text-brand-dark mt-4">{recipe.title}</h1>
			<p className="text-sm text-brand-brown/80">Category: {recipe.category}</p>
			<h2 className="mt-6 font-semibold">Ingredients</h2>
			<ul className="list-disc ml-6 text-brand-brown/90">
				{recipe.ingredients.map((ing: string, idx: number) => <li key={idx}>{ing}</li>)}
			</ul>
			<h2 className="mt-6 font-semibold">Steps</h2>
			<ol className="list-decimal ml-6 text-brand-brown/90">
				{recipe.steps.map((s: string, idx: number) => <li key={idx} className="mb-2">{s}</li>)}
			</ol>
			<div className="mt-6 text-sm text-brand-brown/80">Likes: {recipe.likes || 0}</div>
		</article>
	);
}