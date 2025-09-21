const jsonserver = require('json-server');
const server = jsonserver.create();
const router = jsonserver.router("data.json")
const middlewares = jsonserver.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})