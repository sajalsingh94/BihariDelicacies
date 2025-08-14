export default function SellerDashboard() {
	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold text-brand-dark">Seller Dashboard</h1>
			<div className="grid md:grid-cols-3 gap-4">
				<div className="bg-white p-4 rounded-2xl shadow-card"><div className="text-sm text-brand-brown/80">Total Sales</div><div className="text-2xl font-bold">₹0</div></div>
				<div className="bg-white p-4 rounded-2xl shadow-card"><div className="text-sm text-brand-brown/80">Orders</div><div className="text-2xl font-bold">0</div></div>
				<div className="bg-white p-4 rounded-2xl shadow-card"><div className="text-sm text-brand-brown/80">Products</div><div className="text-2xl font-bold">0</div></div>
			</div>
			<div className="bg-white p-4 rounded-2xl shadow-card">
				<h2 className="font-semibold mb-2">Your Products</h2>
				<p className="text-sm text-brand-brown/80">Add and manage your listings here (to be implemented).</p>
			</div>
		</div>
	);
}