import glob from 'glob';
import Router from 'koa-router';

export default function initModules(app) {
	glob(`${__dirname}/*`, {ignore: '**/index.js'}, (err, matches) => {
		if (err) {
			throw err;
		}

		matches.forEach(module => {
			const router = require(`${module}/router`);
			const routes = router.default;
			const baseUrl = router.baseUrl;
			const instance = new Router({prefix: `/api/${baseUrl}`});

			routes.forEach(config => {
				const {
					method = '',
					route = '',
					handlers = []
				} = config;

				const lastHandler = handlers.pop();

				instance[method.toLowerCase()](route, ...handlers, async function (ctx) {
					return await lastHandler(ctx);
				});

				app
					.use(instance.routes())
					.use(instance.allowedMethods());
			});
		});
	});
}
