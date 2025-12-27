import { redirect, fail } from '@sveltejs/kit';
import { categories } from '$lib/data/menu';

export const load = ({ cookies }) => {
	if (cookies.get('admin') !== 'true') throw redirect(303, '/admin');
	return { categories };
};

export const actions = {
	default: async ({ request }) => {
		try {
			const data = await request.formData();
			const action = data.get('action') as string;

			// ADD ITEM
			if (action === 'add') {
				const name = data.get('name')?.toString().trim();
				const priceRaw = data.get('price');
				const categoryId = data.get('category')?.toString();

				if (!name || !priceRaw || !categoryId)
					return fail(400, { error: 'All fields are required' });

				const price = Number(priceRaw);
				if (isNaN(price)) return fail(400, { error: 'Price must be a number' });

				const category = categories.find((c) => c.id === categoryId);
				if (!category) return fail(400, { error: 'Category not found' });

				category.items.push({ id: Date.now(), name, price });
				return { success: true };
			}

			// EDIT ITEM
			if (action === 'edit') {
				const categoryId = data.get('categoryId')?.toString();
				const itemIndex = Number(data.get('itemIndex'));
				const name = data.get('name')?.toString().trim();
				const price = Number(data.get('price'));

				if (!categoryId || isNaN(itemIndex) || !name || isNaN(price))
					return fail(400, { error: 'Invalid data for edit' });

				const category = categories.find((c) => c.id === categoryId);
				if (!category) return fail(400, { error: 'Category not found' });

				category.items[itemIndex] = { ...category.items[itemIndex], name, price };
				return { success: true };
			}

			// DELETE ITEM
			if (action === 'delete') {
				const categoryId = data.get('categoryId')?.toString();
				const itemIndex = Number(data.get('itemIndex'));

				if (!categoryId || isNaN(itemIndex)) return fail(400, { error: 'Invalid data for delete' });

				const category = categories.find((c) => c.id === categoryId);
				if (!category) return fail(400, { error: 'Category not found' });

				category.items.splice(itemIndex, 1);
				return { success: true };
			}

			return fail(400, { error: 'Unknown action' });
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Internal server error' });
		}
	}
};
