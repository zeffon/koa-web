import path from 'path'
import { SwaggerRouter } from 'koa-swagger-decorator'
import CONFIG from '../../config/index.js'

const topRouter = new SwaggerRouter({ prefix: CONFIG.PREFIX })

/** This is v1 routers */
const v1 = new SwaggerRouter()
const v1Prefix = '/v1'
v1.swagger({
  prefix: `${CONFIG.PREFIX}${v1Prefix}`,
  title: 'V1 API DOC',
  description: 'This is v1 api doc.',
  version: '0.1.0',
  swaggerHtmlEndpoint: '/doc.html',
  swaggerJsonEndpoint: '/json.html'
})

// point to v1 apis directory
v1.mapDir(path.resolve(__dirname, `../../app/api/v1/`))

/** This is v2 routers */
// ...

topRouter.use(v1Prefix, v1.routes())
export default topRouter