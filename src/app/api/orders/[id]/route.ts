import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Order from '@/models/Order';

export async function GET(_: Request, { params }: { params: { id: string } }) {
	await connectToDatabase();
	const order = await Order.findById(params.id);
	if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
	return NextResponse.json(order);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
	await connectToDatabase();
	const body = await request.json();
	const order = await Order.findByIdAndUpdate(params.id, body, { new: true });
	return NextResponse.json(order);
}