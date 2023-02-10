import { createHTTPHandler } from '@trpc/server/adapters/standalone'
import { createServer } from 'http'

import { appRouter } from './appRouter'

const handler = createHTTPHandler({
  router: appRouter,
  batching: {
    enabled: false,
  },
})

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Expose-Headers': '*',
}

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Expose-Headers', '*')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  return handler(req, res)
})

server.listen(3333)
