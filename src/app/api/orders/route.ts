import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Order from '@/models/Order';

export async function GET(request: Request) {
	await connectToDatabase();
	const { searchParams } = new URL(request.url);
	const userId = searchParams.get('userId');
	const filter: any = {};
	if (userId) filter.userId = userId;
	const orders = await Order.find(filter).sort({ createdAt: -1 });
	return NextResponse.json(orders);
}

export async function POST(request: Request) {
	await connectToDatabase();
	const body = await request.json();
	const orderId = body.orderId || `OD${Date.now()}${Math.floor(Math.random() * 1e6).toString().padStart(6, '0')}`;
	const order = await Order.create({ ...body, orderId });
	return NextResponse.json(order, { status: 201 });
}