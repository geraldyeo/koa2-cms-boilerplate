import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import logger from 'koa-bunyan-logger';
import serve from 'koa-static';

import * as modules from './modules';

const app = new Koa();

// middlewares
app.use(logger());
app.use(serve(`${__dirname}/public`));
app.use(bodyParser());
app.use(compress());

// init routes
modules.initApi(app);

// start server
app.listen(3000);

export default app;
