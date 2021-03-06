import App from './create-app'

export default context => {
  return new Promise((resolve, reject) => {
    const {
      app,
      router
    } = App()

    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      if (!matchedComponents.length) {
        return reject(new Error('no components matched.'))
      }

      context.meta = app.$meta()

      resolve(app)
    })
  })
}
