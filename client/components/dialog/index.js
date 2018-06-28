import Dialog from './dialog.vue'
import dialog from './handle.js'

export default (Vue) => {
  Vue.component(Dialog.name, Dialog)
  Vue.prototype.$dialog = dialog
}
