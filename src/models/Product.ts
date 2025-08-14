import { Schema, models, model } from 'mongoose';

const ProductSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		images: [{ type: String }],
		category: { type: String, required: true },
		rating: { type: Number, default: 0 },
		sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		sellerName: String,
		stock: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export default models.Product || model('Product', ProductSchema);