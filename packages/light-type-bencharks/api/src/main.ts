import { nodeHTTPRequestHandler } from '@trpc/server/adapters/node-http'
import { createServer } from 'http'
import { appRouter } from './appRouter'

const server = createServer((req, res) => {
  nodeHTTPRequestHandler({
    router: appRouter,
    path: '/',
    req,
    res,
    createContext() {
      return {}
    },
  })
})

server.on('listening', () => {
  console.log('Started listening on 5000')
})

server.listen(5000)
