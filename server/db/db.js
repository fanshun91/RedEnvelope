const sha1 = require('sha1')
const axios = require('axios')

const className = 'hongbao'

const request = axios.create({
  baseURL: 'http://www.xiaoxiaohb.com/v1'
})

const produceError = (code, msg) => {
  let err = new Error(msg)
  err.code = code
  return code
}

const handleRequest = ({code, data, msg}) => {
  if (code === 0) {
    return data
  } else {
    throw produceError(code, msg)
  }
}

module.exports = (id, key) => {

  // 指定对应的http头
  const getHeaders = () => {
    const now = Date.now()
    return {
      'appId': id,
      'appKey': `${sha1(`${id}UZ${key}UZ${now}`)}.${now}`
    }
  }

  return {
    async getMsg () {
      return handleRequest(await request.get(`/${className}`, {
        headers: getHeaders()
      }))
    }
  }
}
