"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitRecipePage() {
	const [title, setTitle] = useState('');
	const [ingredients, setIngredients] = useState<string>('');
	const [steps, setSteps] = useState<string>('');
	const [category, setCategory] = useState('Snacks');
	const [image, setImage] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				setLoading(true);
				const payload = { title, ingredients: ingredients.split('\n').filter(Boolean), steps: steps.split('\n').filter(Boolean), category, images: image ? [image] : [] };
				const res = await fetch('/api/recipes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
				const data = await res.json();
				setLoading(false);
				if (!res.ok) return alert('Failed to submit recipe');
				router.push(`/recipes/${data._id}`);
			}}
			className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-card space-y-4"
		>
			<h1 className="text-2xl font-bold text-brand-dark">Submit a Recipe</h1>
			<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border rounded-xl p-3"/>
			<select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded-xl p-3">
				{['Snacks','Sweets','Curries','Rice Dishes','Festive Specials','Beverages'].map(c => <option key={c} value={c}>{c}</option>)}
			</select>
			<textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients (one per line)" rows={5} className="w-full border rounded-xl p-3"/>
			<textarea value={steps} onChange={(e) => setSteps(e.target.value)} placeholder="Preparation steps (one per line)" rows={6} className="w-full border rounded-xl p-3"/>
			<input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL (optional)" className="w-full border rounded-xl p-3"/>
			<button disabled={loading} className="w-full bg-brand-red text-white py-3 rounded-xl">{loading ? 'Submitting…' : 'Submit'}</button>
		</form>
	);
}