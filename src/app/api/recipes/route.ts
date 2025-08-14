import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Recipe from '@/models/Recipe';

export async function GET(request: Request) {
	await connectToDatabase();
	const { searchParams } = new URL(request.url);
	const category = searchParams.get('category') || undefined;
	const q = searchParams.get('q') || '';
	const page = Number(searchParams.get('page') || 1);
	const limit = Number(searchParams.get('limit') || 12);

	const filter: any = {};
	if (category) filter.category = category;
	if (q) filter.title = { $regex: q, $options: 'i' };

	const recipes = await Recipe.find(filter)
		.sort({ createdAt: -1 })
		.skip((page - 1) * limit)
		.limit(limit);
	const total = await Recipe.countDocuments(filter);
	return NextResponse.json({ recipes, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(request: Request) {
	await connectToDatabase();
	const body = await request.json();
	const recipe = await Recipe.create(body);
	return NextResponse.json(recipe, { status: 201 });
}