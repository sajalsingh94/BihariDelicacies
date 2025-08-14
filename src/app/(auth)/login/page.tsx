"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setSessionToken, setUser } from '@/store/slices/userSlice';

export default function LoginPage() {
	const [tab, setTab] = useState<'login' | 'signup'>('login');
	return (
		<div className="max-w-xl mx-auto py-8">
			<div className="flex gap-4 mb-6">
				<button onClick={() => setTab('login')} className={`px-4 py-2 rounded-xl ${tab==='login' ? 'bg-brand-red text-white' : 'bg-white'}`}>Login as User</button>
				<button onClick={() => setTab('signup')} className={`px-4 py-2 rounded-xl ${tab==='signup' ? 'bg-brand-red text-white' : 'bg-white'}`}>Signup</button>
			</div>
			{tab === 'login' ? <LoginForm /> : <SignupForm />}
			<p className="mt-4 text-sm">Are you a seller? <Link className="text-brand-red underline" href="/seller/register">Register here</Link></p>
		</div>
	);
}

function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				setLoading(true);
				const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
				const data = await res.json();
				setLoading(false);
				if (!res.ok) return alert(data.error || 'Login failed');
				dispatch(setSessionToken(data.token));
				dispatch(setUser(data.user));
				router.push('/');
			}}
			className="bg-white p-6 rounded-2xl shadow-card space-y-4"
		>
			<input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-3 border rounded-xl"/>
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 border rounded-xl"/>
			<button disabled={loading} className="w-full bg-brand-red text-white py-3 rounded-xl">{loading ? 'Signing in…' : 'Login'}</button>
		</form>
	);
}

function SignupForm() {
	const [form, setForm] = useState({ name: '', email: '', password: '' });
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();
	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				setLoading(true);
				const res = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
				const data = await res.json();
				setLoading(false);
				if (!res.ok) return alert(data.error || 'Signup failed');
				dispatch(setSessionToken(data.token));
				dispatch(setUser(data.user));
				router.push('/');
			}}
			className="bg-white p-6 rounded-2xl shadow-card space-y-4"
		>
			<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="w-full p-3 border rounded-xl"/>
			<input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full p-3 border rounded-xl"/>
			<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" className="w-full p-3 border rounded-xl"/>
			<button disabled={loading} className="w-full bg-brand-red text-white py-3 rounded-xl">{loading ? 'Creating account…' : 'Create account'}</button>
		</form>
	);
}