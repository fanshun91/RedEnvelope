import App from './create-app'

const {
  app,
  router
} = App()

router.onReady(() => {
  app.$mount('#root')
})
