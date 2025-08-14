"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';

export default function CartPage() {
	const { items } = useSelector((s: RootState) => s.cart);
	const dispatch = useDispatch();
	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const shipping = items.length ? 49 : 0;
	const total = subtotal + shipping;
	return (
		<div className="grid lg:grid-cols-[1fr_360px] gap-6">
			<section className="space-y-4">
				{items.length === 0 && (
					<div className="bg-white p-6 rounded-2xl shadow-card">Your cart is empty. <Link href="/shop" className="text-brand-red underline">Shop now</Link></div>
				)}
				{items.map((i) => (
					<div key={i.productId} className="bg-white p-4 rounded-2xl shadow-card flex gap-4">
						<Image src={i.imageUrl || 'https://images.unsplash.com/photo-1604908554027-42c5a4e1b7db'} alt={i.title} width={120} height={120} className="w-24 h-24 object-cover rounded-xl" />
						<div className="flex-1">
							<h3 className="font-semibold">{i.title}</h3>
							<div className="text-sm text-brand-brown/80">₹{i.price} x</div>
							<div className="mt-2 flex items-center gap-2">
								<input type="number" min={1} value={i.quantity} onChange={(e) => dispatch(updateQuantity({ productId: i.productId, quantity: parseInt(e.target.value || '1') }))} className="w-20 border rounded-xl p-2"/>
								<button onClick={() => dispatch(removeFromCart(i.productId))} className="text-brand-red">Remove</button>
							</div>
						</div>
						<div className="font-bold">₹{i.price * i.quantity}</div>
					</div>
				))}
			</section>
			<aside className="bg-white p-6 rounded-2xl shadow-card h-fit">
				<h3 className="font-semibold text-brand-dark mb-4">Order Summary</h3>
				<div className="space-y-2 text-sm">
					<div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
					<div className="flex justify-between"><span>Shipping</span><span>₹{shipping}</span></div>
					<div className="flex justify-between font-bold text-brand-dark"><span>Total</span><span>₹{total}</span></div>
				</div>
				<Link href="/checkout" className={`block mt-4 text-center py-3 rounded-xl ${items.length ? 'bg-brand-red text-white' : 'bg-gray-300 text-gray-500 pointer-events-none'}`}>Checkout</Link>
			</aside>
		</div>
	);
}