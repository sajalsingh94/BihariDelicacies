async function fetchOrder(id: string) {
	const base = process.env.NEXT_PUBLIC_SITE_URL || '';
	const res = await fetch(`${base}/api/orders/${id}`, { cache: 'no-store' });
	if (!res.ok) return null;
	return res.json();
}

export default async function OrderPage({ params }: { params: { id: string } }) {
	const order = await fetchOrder(params.id);
	return (
		<div className="bg-white p-6 rounded-2xl shadow-card max-w-xl mx-auto text-center">
			<h1 className="text-2xl font-bold text-brand-dark">Order Confirmed</h1>
			<p className="mt-2">Your order ID: <span className="font-mono">{order?.orderId || params.id}</span></p>
			{order && (
				<div className="text-left mt-6 space-y-2 text-sm">
					<div className="flex justify-between"><span>Items</span><span>{order.items?.length}</span></div>
					<div className="flex justify-between"><span>Total</span><span>₹{order.total}</span></div>
				</div>
			)}
			<p className="mt-4 text-brand-brown/80">We have sent the confirmation to your email. Track status in your dashboard.</p>
		</div>
	);
}