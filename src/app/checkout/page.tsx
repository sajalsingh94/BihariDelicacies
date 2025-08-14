"use client";

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { clearCart } from '@/store/slices/cartSlice';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
	const { items } = useSelector((s: RootState) => s.cart);
	const dispatch = useDispatch();
	const router = useRouter();
	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const shipping = items.length ? 49 : 0;
	const total = subtotal + shipping;
	const [address, setAddress] = useState({ name: '', street: '', city: '', state: '', zip: '', phone: '' });
	const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
	const [loading, setLoading] = useState(false);
	return (
		<div className="grid lg:grid-cols-[1fr_360px] gap-6">
			<section className="space-y-4">
				<div className="bg-white p-6 rounded-2xl shadow-card">
					<h3 className="font-semibold text-brand-dark mb-4">Shipping Address</h3>
					<div className="grid sm:grid-cols-2 gap-3">
						<input placeholder="Full name" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} className="border rounded-xl p-3"/>
						<input placeholder="Phone" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="border rounded-xl p-3"/>
						<input placeholder="Street" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} className="border rounded-xl p-3 sm:col-span-2"/>
						<input placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="border rounded-xl p-3"/>
						<input placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} className="border rounded-xl p-3"/>
						<input placeholder="ZIP" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} className="border rounded-xl p-3"/>
					</div>
				</div>

				<div className="bg-white p-6 rounded-2xl shadow-card">
					<h3 className="font-semibold text-brand-dark mb-4">Payment</h3>
					<div className="flex gap-4">
						<label className={`px-4 py-2 rounded-xl border ${paymentMethod==='cod' ? 'border-brand-red' : ''}`}>
							<input type="radio" name="pay" className="mr-2" checked={paymentMethod==='cod'} onChange={() => setPaymentMethod('cod')} />
							Cash on Delivery
						</label>
						<label className={`px-4 py-2 rounded-xl border ${paymentMethod==='card' ? 'border-brand-red' : ''}`}>
							<input type="radio" name="pay" className="mr-2" checked={paymentMethod==='card'} onChange={() => setPaymentMethod('card')} />
							Card (placeholder)
						</label>
					</div>
				</div>

				<button
					disabled={loading || items.length===0}
					onClick={async () => {
						setLoading(true);
						const res = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items, subtotal, shipping, total, status: 'confirmed', paymentMethod, address }) });
						const data = await res.json();
						setLoading(false);
						if (!res.ok) return alert('Order failed');
						dispatch(clearCart());
						router.push(`/order/${data._id}`);
					}}
					className={`w-full bg-brand-red text-white py-3 rounded-xl ${items.length===0? 'opacity-50':''}`}
				>
					{loading ? 'Placing order…' : 'Place Order'}
				</button>
			</section>
			<aside className="bg-white p-6 rounded-2xl shadow-card h-fit">
				<h3 className="font-semibold text-brand-dark mb-4">Summary</h3>
				<div className="space-y-2 text-sm">
					<div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
					<div className="flex justify-between"><span>Shipping</span><span>₹{shipping}</span></div>
					<div className="flex justify-between font-bold text-brand-dark"><span>Total</span><span>₹{total}</span></div>
				</div>
			</aside>
		</div>
	);
}