import mongoose from 'mongoose';

let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = (global as any)._mongooseCached || { conn: null, promise: null };

export async function connectToDatabase() {
	if (cached.conn) return cached.conn;
	if (!cached.promise) {
		const uri = process.env.MONGODB_URI;
		if (!uri) {
			throw new Error('Missing MONGODB_URI');
		}
		cached.promise = mongoose.connect(uri).then((m) => m);
	}
	cached.conn = await cached.promise;
	(global as any)._mongooseCached = cached;
	return cached.conn;
}