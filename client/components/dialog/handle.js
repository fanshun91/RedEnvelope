import Vue from 'vue'
import Component from './basis'
import bus from '../../util/bus'

const DialogConstructor = Vue.extend(Component)

const instances = []
let num = 0

const removeInstance = instance => {
  if (!instance) return
  // const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst.id)

  instance.splice(index, 1)
}

const dialog = (options) => {
  if (Vue.prototype.$isServer) return

  const instance = new DialogConstructor({
    propsData: options
  })

  const id = `dialog_${num++}`
  instance.id = id

  // 生成实例
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instances.push(instance)

  // 点击取消按钮
  instance.vm.$on('cancel', () => {
    instance.vm.visible = false
  })

  // 点击确认按钮
  instance.vm.$on('close', () => {
    instance.vm.visible = false
    bus.$emit('affirm')
  })

  // 删除实例节点
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })

  return instance.vm
}

export default dialog
