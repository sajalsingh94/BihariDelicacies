import { Schema, models, model } from 'mongoose';

const RecipeSchema = new Schema(
	{
		title: { type: String, required: true },
		ingredients: [{ type: String, required: true }],
		steps: [{ type: String, required: true }],
		category: { type: String, required: true },
		images: [{ type: String }],
		likes: { type: Number, default: 0 },
		authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		authorName: String,
		comments: [
			{
				userId: { type: Schema.Types.ObjectId, ref: 'User' },
				name: String,
				text: String,
				createdAt: { type: Date, default: Date.now }
			}
		]
	},
	{ timestamps: true }
);

export default models.Recipe || model('Recipe', RecipeSchema);