export type Product = {
	_id: string;
	title: string;
	description: string;
	price: number;
	images: string[];
	category: 'Snacks' | 'Sweets' | 'Spices' | 'Beverages' | 'Main Dishes' | 'Pickles' | 'Condiments' | 'Festival Specials';
	rating?: number;
	sellerId: string;
	sellerName?: string;
	stock?: number;
};

export type Recipe = {
	_id: string;
	title: string;
	ingredients: string[];
	steps: string[];
	category: 'Snacks' | 'Sweets' | 'Curries' | 'Rice Dishes' | 'Festive Specials' | 'Beverages';
	images: string[];
	likes?: number;
	authorId: string;
	authorName?: string;
};

export type Order = {
	_id: string;
	userId: string;
	items: { productId: string; title: string; price: number; quantity: number; imageUrl?: string }[];
	subtotal: number;
	shipping: number;
	total: number;
	status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
	address: {
		name: string;
		street: string;
		city: string;
		state: string;
		zip: string;
		phone: string;
	};
	paymentMethod: 'cod' | 'card';
	createdAt?: string;
};