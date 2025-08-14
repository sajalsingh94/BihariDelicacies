"use client";

import { useState } from 'react';

export default function ContactPage() {
	const [form, setForm] = useState({ name: '', email: '', message: '' });
	const [sent, setSent] = useState(false);
	return (
		<form
			onSubmit={(e) => { e.preventDefault(); setSent(true); }}
			className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-card space-y-4"
		>
			<h1 className="text-2xl font-bold text-brand-dark">Contact Us</h1>
			<input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} placeholder="Your name" className="w-full border rounded-xl p-3"/>
			<input value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} placeholder="Your email" className="w-full border rounded-xl p-3"/>
			<textarea value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} placeholder="Message" rows={6} className="w-full border rounded-xl p-3"/>
			<button className="w-full bg-brand-red text-white py-3 rounded-xl">Send</button>
			{sent && <p className="text-green-700">Thanks! We will get back soon.</p>}
		</form>
	);
}