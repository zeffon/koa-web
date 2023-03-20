import path from 'node:path'
import { SwaggerRouter } from 'koa-swagger-decorator'
import CONFIG from '~/config'

/**
 * If you need multi-version API DOC, please refer to `template-full`
 */
const router = new SwaggerRouter({ prefix: CONFIG.PREFIX })

if (CONFIG.ENV === 'dev') {
  router.swagger({
    prefix: `${CONFIG.PREFIX}`,
    title: 'Koa-web API DOC',
    description: 'This is api doc.',
    version: '1.0.0',
    swaggerHtmlEndpoint: '/doc.html',
    swaggerJsonEndpoint: '/json.html',
    swaggerOptions: {
      securityDefinitions: {
        api_key: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
  })
}

router.mapDir(path.resolve(__dirname, `../../app/api/`), {})

export default router
