import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Recipe from '@/models/Recipe';
import { mockRecipes } from '@/lib/mock';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const category = searchParams.get('category') || undefined;
	const q = searchParams.get('q') || '';
	const page = Number(searchParams.get('page') || 1);
	const limit = Number(searchParams.get('limit') || 12);

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
		return NextResponse.json({ recipes, total, page, pages: Math.ceil(total / limit) });
	} catch {
		const filtered = mockRecipes.filter(filterFn);
		const total = filtered.length;
		const start = (page - 1) * limit;
		const recipes = filtered.slice(start, start + limit);
		return NextResponse.json({ recipes, total, page, pages: Math.ceil(total / limit), mock: true });
	}
}

export async function POST(request: Request) {
	try {
		await connectToDatabase();
		const body = await request.json();
		const recipe = await Recipe.create(body);
		return NextResponse.json(recipe, { status: 201 });
	} catch {
		return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
	}
}