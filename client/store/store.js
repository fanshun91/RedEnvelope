import Vuex from 'vuex'

export default () => {
  const store = new Vuex.Store({
    state: {
      count: 0
    }
  })

  return store
}
