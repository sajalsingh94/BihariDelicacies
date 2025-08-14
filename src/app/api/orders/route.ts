import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Order from '@/models/Order';
import { mockListOrders, mockCreateOrder } from '@/lib/mock';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const userId = searchParams.get('userId') || undefined;
	try {
		await connectToDatabase();
		const filter: any = {};
		if (userId) filter.userId = userId;
		const orders = await Order.find(filter).sort({ createdAt: -1 });
		return NextResponse.json(orders);
	} catch {
		const orders = mockListOrders(userId || undefined);
		return NextResponse.json(orders);
	}
}

export async function POST(request: Request) {
	const body = await request.json();
	try {
		await connectToDatabase();
		const orderId = body.orderId || `OD${Date.now()}${Math.floor(Math.random() * 1e6).toString().padStart(6, '0')}`;
		const order = await Order.create({ ...body, orderId });
		return NextResponse.json(order, { status: 201 });
	} catch {
		const order = mockCreateOrder(body);
		return NextResponse.json(order, { status: 201 });
	}
}