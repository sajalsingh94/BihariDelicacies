import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
	productId: string;
	title: string;
	price: number;
	imageUrl: string;
	quantity: number;
};

export type CartState = {
	items: CartItem[];
};

const initialState: CartState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, action: PayloadAction<CartItem>) {
			const existing = state.items.find(i => i.productId === action.payload.productId);
			if (existing) {
				existing.quantity += action.payload.quantity;
			} else {
				state.items.push(action.payload);
			}
		},
		removeFromCart(state, action: PayloadAction<string>) {
			state.items = state.items.filter(i => i.productId !== action.payload);
		},
		updateQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
			const item = state.items.find(i => i.productId === action.payload.productId);
			if (item) item.quantity = Math.max(1, action.payload.quantity);
		},
		clearCart(state) {
			state.items = [];
		}
	}
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;