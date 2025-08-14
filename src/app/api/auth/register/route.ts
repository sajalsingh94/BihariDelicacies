import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
	const body = await request.json();
	const { email, password, name, role, seller } = body || {};
	if (!email || !password) {
		return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
	}

	await connectToDatabase();
	const existing = await User.findOne({ email });
	if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 400 });

	const passwordHash = await bcrypt.hash(password, 10);
	const user = await User.create({ email, passwordHash, name, role: role || 'user', seller });

	const token = jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
	return NextResponse.json({ token, user: { _id: user._id, email: user.email, name: user.name, role: user.role } });
}