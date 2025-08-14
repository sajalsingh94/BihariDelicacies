import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Product from '@/models/Product';

export async function GET(_: Request, { params }: { params: { id: string } }) {
	await connectToDatabase();
	const product = await Product.findById(params.id);
	if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
	return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
	await connectToDatabase();
	const body = await request.json();
	const product = await Product.findByIdAndUpdate(params.id, body, { new: true });
	return NextResponse.json(product);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
	await connectToDatabase();
	await Product.findByIdAndDelete(params.id);
	return NextResponse.json({ ok: true });
}