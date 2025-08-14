"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';

export default function ProductDetail({ params }: { params: { id: string } }) {
	const [product, setProduct] = useState<any>(null);
	const [qty, setQty] = useState(1);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const res = await fetch(`/api/products/${params.id}`);
			const data = await res.json();
			setProduct(data);
		})();
	}, [params.id]);

	if (!product) return <div className="py-12">Loading…</div>;

	return (
		<div className="grid lg:grid-cols-2 gap-8">
			<div className="bg-white rounded-2xl shadow-card p-4">
				<Image src={product.images?.[0] || 'https://images.unsplash.com/photo-1604908554027-42c5a4e1b7db'} alt={product.title} width={800} height={600} className="w-full h-80 object-cover rounded-xl" />
			</div>
			<div>
				<h1 className="text-2xl font-bold text-brand-dark">{product.title}</h1>
				<p className="text-brand-brown/80 mt-2">{product.description}</p>
				<p className="mt-4 text-2xl font-bold">₹{product.price}</p>
				<div className="mt-4 flex items-center gap-3">
					<input type="number" min={1} value={qty} onChange={(e) => setQty(parseInt(e.target.value || '1'))} className="w-24 border rounded-xl p-2"/>
					<button
						onClick={() => dispatch(addToCart({ productId: product._id, title: product.title, price: product.price, imageUrl: product.images?.[0], quantity: qty }))}
						className="bg-brand-red text-white px-6 py-3 rounded-xl"
					>
						Add to Cart
					</button>
				</div>
				<div className="mt-6 text-sm text-brand-brown/80">Seller: {product.sellerName || '—'}</div>
			</div>
		</div>
	);
}