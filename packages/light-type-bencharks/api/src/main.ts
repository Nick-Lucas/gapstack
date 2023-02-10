import { createHTTPHandler } from '@trpc/server/adapters/standalone'
import { createServer } from 'http'

import { appRouter } from './appRouter'

const handler = createHTTPHandler({
  router: appRouter,
  batching: {
    enabled: false,
  },
  onError: (err) => {
    console.error(
      'ERRORSTART:',
      err.path,
      JSON.stringify(err.error.cause, null, 2)
    )
  },
})

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    return res.end()
  }
  handler(req, res)
})

server.listen(3333)
