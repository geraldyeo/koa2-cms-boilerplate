import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import logger from 'koa-bunyan-logger';

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(compress());

app.use(ctx => {
	ctx.body = 'Hello World';
});

app.listen(3000);

export default app;
