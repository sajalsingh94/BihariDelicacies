import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request: Request) {
	await connectToDatabase();
	const { searchParams } = new URL(request.url);
	const category = searchParams.get('category') || undefined;
	const min = Number(searchParams.get('min') || 0);
	const max = Number(searchParams.get('max') || Number.MAX_SAFE_INTEGER);
	const q = searchParams.get('q') || '';
	const page = Number(searchParams.get('page') || 1);
	const limit = Number(searchParams.get('limit') || 12);

	const filter: any = { price: { $gte: min, $lte: max } };
	if (category) filter.category = category;
	if (q) filter.title = { $regex: q, $options: 'i' };

	const products = await Product.find(filter)
		.sort({ createdAt: -1 })
		.skip((page - 1) * limit)
		.limit(limit);
	const total = await Product.countDocuments(filter);
	return NextResponse.json({ products, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(request: Request) {
	await connectToDatabase();
	const body = await request.json();
	const product = await Product.create(body);
	return NextResponse.json(product, { status: 201 });
}