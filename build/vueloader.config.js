module.exports = isDev => {
  return {
    preserveWhitepace: true,
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:6]' : '[hash:base64:6]',
      camelCase: true
    }
  }
}
