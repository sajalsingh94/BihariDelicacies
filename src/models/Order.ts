import { Schema, models, model } from 'mongoose';

const OrderSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		items: [
			{ productId: { type: Schema.Types.ObjectId, ref: 'Product' }, title: String, price: Number, quantity: Number, imageUrl: String }
		],
		subtotal: Number,
		shipping: Number,
		total: Number,
		status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
		address: {
			name: String,
			street: String,
			city: String,
			state: String,
			zip: String,
			phone: String,
		},
		paymentMethod: { type: String, enum: ['cod', 'card'], default: 'cod' },
		orderId: { type: String, unique: true },
	},
	{ timestamps: true }
);

export default models.Order || model('Order', OrderSchema);