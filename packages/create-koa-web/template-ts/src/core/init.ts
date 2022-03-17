import Koa from 'koa'
import Koa2Cors from 'koa2-cors'
import KoaBody from 'koa-body'
import catchError from './exception'
import InitGlobal from './global'
import swaggerRouter from './swagger'

export default class InitManager {
  private app: Koa

  constructor(app: Koa) {
    this.app = app
    this.initCore()
  }

  initCore() {
    InitGlobal.init() // global var and methods
    this.app.use(Koa2Cors()) // cross-domain processing
    this.app.use(KoaBody({ multipart: true })) // body parameter processing
    this.app.use(catchError) // global exception handling
    this.buildRouteAndSwagger() // router and api docs
  }

  buildRouteAndSwagger() {
    this.app.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods())
  }
}