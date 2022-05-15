const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const { SerialPort } = require('serialport')

const Api = require('./api/index');

const staticDirPath = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 2222;
const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 })

const server = new Koa();
const router = new Router();

server.use(bodyParser());
server.use(serve(staticDirPath));


router.post('/api/geodes', (ctx, next) => {
  const testGeode = Api.getMiningResult(5, 'amejisuto', 4);
  ctx.body = testGeode;
});

server.use(router.routes()).use(router.allowedMethods());

server.listen(PORT, () => {
  console.log('(i) - server.listen, Port:', PORT);
});

//

port.write('main screen turn on', function(err) {
    setTimeout(()=> {port.write('hoi')}, 2000 );
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message written')
})

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message)
})
