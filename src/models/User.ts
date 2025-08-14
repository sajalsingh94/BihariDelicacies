import mongoose, { Schema, models, model } from 'mongoose';

const UserSchema = new Schema(
	{
		email: { type: String, unique: true, required: true },
		passwordHash: { type: String, required: true },
		name: { type: String },
		role: { type: String, enum: ['user', 'seller', 'admin'], default: 'user' },
		seller: {
			shopName: String,
			address: String,
			bankDetails: String,
		},
	},
	{ timestamps: true }
);

export default models.User || model('User', UserSchema);