"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SellerRegisterPage() {
	const [form, setForm] = useState({ name: '', email: '', password: '', shopName: '', address: '', bankDetails: '' });
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				setLoading(true);
				const payload = { name: form.name, email: form.email, password: form.password, role: 'seller', seller: { shopName: form.shopName, address: form.address, bankDetails: form.bankDetails } };
				const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
				const data = await res.json();
				setLoading(false);
				if (!res.ok) return alert(data.error || 'Registration failed');
				router.push('/seller/dashboard');
			}}
			className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-card space-y-4"
		>
			<h1 className="text-2xl font-bold text-brand-dark">Register as Seller</h1>
			<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="w-full border rounded-xl p-3"/>
			<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border rounded-xl p-3"/>
			<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" className="w-full border rounded-xl p-3"/>
			<input value={form.shopName} onChange={(e) => setForm({ ...form, shopName: e.target.value })} placeholder="Shop name" className="w-full border rounded-xl p-3"/>
			<input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Shop address" className="w-full border rounded-xl p-3"/>
			<input value={form.bankDetails} onChange={(e) => setForm({ ...form, bankDetails: e.target.value })} placeholder="Bank details (placeholder)" className="w-full border rounded-xl p-3"/>
			<button disabled={loading} className="w-full bg-brand-red text-white py-3 rounded-xl">{loading ? 'Creating account…' : 'Register'}</button>
		</form>
	);
}