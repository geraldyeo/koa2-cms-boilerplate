import glob from 'glob';
import Router from 'koa-router';

export default function initModules(app) {
	glob(`${__dirname}/*`, {ignore: '**/index.js'}, (err, matches) => {
		if (err) {
			throw err;
		}

		matches.forEach(module => {
			const moduleRouter = require(`${module}/router`);
			const routes = moduleRouter.default;
			const baseUrl = moduleRouter.baseUrl;
			const router = new Router({prefix: `/api${baseUrl}`});

			routes.forEach(config => {
				const {
					method = '',
					route = '',
					handlers = []
				} = config;

				const lastHandler = handlers.pop();

				router[method.toLowerCase()](route, ...handlers, async function (ctx) {
					return await lastHandler(ctx);
				});

				app
					.use(router.routes())
					.use(router.allowedMethods());
			});
		});
	});
}
