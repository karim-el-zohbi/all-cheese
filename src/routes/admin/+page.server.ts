import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password');

		if (password !== env.ADMIN_PASSWORD) {
			return fail(401, { error: 'Wrong password' });
		}

		cookies.set('admin', 'true', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 4
		});

		throw redirect(303, '/admin/dashboard');
	}
};
