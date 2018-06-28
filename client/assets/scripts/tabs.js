/**
 * 用户详情页的Tab
 * tabEngine
 */

const tabEngine = (ttc, tcc) => {
  let titles = document.querySelector(ttc)
  let contents = document.querySelector(tcc)
  let ttcLength = titles.length
  let tccLength = contents.length
  let keyClassName = 'item-hidden'

  if (ttcLength !== tccLength) {
    throw new Error('Tabs function occured a error.')
  }

  // 切换事件
  titles.forEach((item, index) => {
    item.setAttribute('index', index)
    item.onclick = () => {
      contents.filter(el => {
        return el.className.indexOf(keyClassName) === -1
      }).className += ('' + keyClassName)

      contents[this.index].className.replace(' ' + keyClassName, '')
    }
  })
}
