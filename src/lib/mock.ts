import { Product, Recipe, Order } from '@/types';

export const mockProducts: Product[] = [
	{
		_id: 'p1',
		title: 'Litti Chokha Combo',
		description: 'Smoky, rustic litti served with zesty chokha. Ready-to-eat combo.',
		price: 199,
		images: ['https://images.unsplash.com/photo-1550547660-d9450f859349'],
		category: 'Main Dishes',
		rating: 4.6,
		sellerId: 's1',
		sellerName: 'Magadh Kitchen',
		stock: 50
	},
	{
		_id: 'p2',
		title: 'Thekua (Ghee Fried)',
		description: 'Crispy festive sweet made with wheat flour and jaggery.',
		price: 149,
		images: ['https://images.unsplash.com/photo-1544027993-37dbfe43562a'],
		category: 'Sweets',
		rating: 4.8,
		sellerId: 's2',
		sellerName: 'Sonepur Sweets',
		stock: 100
	},
	{
		_id: 'p3',
		title: 'Sattu Paratha Mix',
		description: 'Roasted gram flour spice mix to make authentic sattu paratha.',
		price: 129,
		images: ['https://images.unsplash.com/photo-1604908554027-42c5a4e1b7db'],
		category: 'Spices',
		rating: 4.4,
		sellerId: 's3',
		sellerName: 'Pataliputra Foods',
		stock: 200
	},
	{
		_id: 'p4',
		title: 'Khaja (Traditional)',
		description: 'Flaky layered sweet from the lanes of Silao.',
		price: 179,
		images: ['https://images.unsplash.com/photo-1518049362265-d5b2a6467637'],
		category: 'Sweets',
		rating: 4.7,
		sellerId: 's2',
		sellerName: 'Sonepur Sweets',
		stock: 80
	},
	{
		_id: 'p5',
		title: 'Mango Pickle (Aam ka Achar)',
		description: 'Homestyle tangy-spicy mango pickle.',
		price: 99,
		images: ['https://images.unsplash.com/photo-1596040033229-9a53b9b3f5d2'],
		category: 'Pickles',
		rating: 4.5,
		sellerId: 's4',
		sellerName: 'Mithila Pantry',
		stock: 150
	},
	{
		_id: 'p6',
		title: 'Sattu Cooler (Ready Mix)',
		description: 'Refreshing sattu drink mix for summers.',
		price: 89,
		images: ['https://images.unsplash.com/photo-1561882468-9110e03e0f78'],
		category: 'Beverages',
		rating: 4.2,
		sellerId: 's3',
		sellerName: 'Pataliputra Foods',
		stock: 120
	}
];

export const mockRecipes: Recipe[] = [
	{
		_id: 'r1',
		title: 'Litti Chokha (Home-style)',
		ingredients: ['Wheat flour', 'Sattu', 'Mustard oil', 'Garlic', 'Green chili', 'Tomato'],
		steps: ['Prepare sattu stuffing', 'Knead dough', 'Stuff and bake litti', 'Make chokha', 'Serve hot with ghee'],
		category: 'Main Dishes' as any,
		images: ['https://images.unsplash.com/photo-1550547660-d9450f859349'],
		likes: 120,
		authorId: 'u1',
		authorName: 'Anita'
	},
	{
		_id: 'r2',
		title: 'Thekua (Festive Sweet)',
		ingredients: ['Wheat flour', 'Jaggery', 'Ghee', 'Cardamom'],
		steps: ['Make jaggery syrup', 'Knead dough', 'Shape and deep fry'],
		category: 'Festive Specials' as any,
		images: ['https://images.unsplash.com/photo-1544027993-37dbfe43562a'],
		likes: 85,
		authorId: 'u2',
		authorName: 'Ravi'
	}
];

// Very simple in-memory orders store for demo
let _orders: Order[] = [];

export function mockListOrders(userId?: string) {
	return userId ? _orders.filter(o => o.userId === userId) : _orders;
}

export function mockCreateOrder(payload: Partial<Order>) {
	const id = `o_${Date.now()}`;
	const maybeOrderId = (payload as any)?.orderId as string | undefined;
	const orderId = maybeOrderId || `OD${Date.now()}${Math.floor(Math.random() * 1e6).toString().padStart(6, '0')}`;
	const order = {
		_id: id,
		userId: payload.userId || 'demo-user',
		items: payload.items || [],
		subtotal: payload.subtotal || 0,
		shipping: payload.shipping || 0,
		total: payload.total || 0,
		status: (payload.status as any) || 'confirmed',
		address: payload.address as any,
		paymentMethod: (payload.paymentMethod as any) || 'cod',
		orderId,
		createdAt: new Date().toISOString(),
	} as Order;
	_orders.unshift(order);
	return order;
}

export function mockGetOrderById(id: string) {
	return _orders.find(o => o._id === id) || null;
}