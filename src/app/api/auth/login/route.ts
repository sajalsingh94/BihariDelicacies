import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';

export async function POST(request: Request) {
	const body = await request.json();
	const { email, password } = body || {};
	if (!email || !password) {
		return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
	}

	await connectToDatabase();
	const user = await User.findOne({ email });
	if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

	const ok = await bcrypt.compare(password, user.passwordHash);
	if (!ok) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

	const token = jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
	return NextResponse.json({ token, user: { _id: user._id, email: user.email, name: user.name, role: user.role } });
}