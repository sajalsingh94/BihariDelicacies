import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Order from '@/models/Order';
import { mockGetOrderById } from '@/lib/mock';

export async function GET(_: Request, { params }: { params: { id: string } }) {
	try {
		await connectToDatabase();
		const order = await Order.findById(params.id);
		if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
		return NextResponse.json(order);
	} catch {
		const order = mockGetOrderById(params.id);
		if (!order) return NextResponse.json({ error: 'Not found' }, { status: 404 });
		return NextResponse.json(order);
	}
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
	try {
		await connectToDatabase();
		const body = await request.json();
		const order = await Order.findByIdAndUpdate(params.id, body, { new: true });
		return NextResponse.json(order);
	} catch {
		return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
	}
}