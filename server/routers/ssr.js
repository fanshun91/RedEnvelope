const Router = require('koa-router')
const path = require('path')
const fs = require('path')
const VueServerRender = require('vue-server-renderer')

const serverRender = require('./server-render')

const clientManifest = require('../../public/vue-ssr-client-manifest')
const renderer = VueServerRender.createBundleRenderer(
  path.resolve(__dirname, '../../server-build/vue-ssr-server-bundle.json'),
  {
    inject: false,
    clientManifest
  }
)

const template = fs.readFileSync(
  path.resolve(__dirname, '../server.template.ejs'),
  'utf-8'
)

const pageRouter = new Router()

pageRouter.get('*', async (ctx) => {
  await serverRender(ctx, renderer, template)
})
