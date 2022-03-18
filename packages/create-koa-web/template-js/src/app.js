import Koa from 'koa'
import InitManager from './core/init.js'
import CONFIG from './config/index.js'

const app = new Koa()

new InitManager(app)

app.listen(CONFIG.PORT, () => {
  console.log(
    `Please open ${CONFIG.BASE_URL}:${CONFIG.PORT}${CONFIG.PREFIX}/v1/doc.html`
  )
})

export default app
