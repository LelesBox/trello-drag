import { on, addClass, removeClass } from './domApi'

function copyElm (elm) {
  var el = elm.cloneNode(true)
  el.style.position = 'absolute'
  var offsetX = document.documentElement.scrollLeft || document.body.scrollLeft
  var offsetY = document.documentElement.scrollTop || document.body.scrollTop
  var position = elm.getBoundingClientRect()
  el.style.margin = '0px'
  el.style.top = position.top + offsetY + 'px'
  el.style.left = position.left + offsetX + 'px'
  el.style.zIndex = 9999
  el.style.width = elm.clientWidth + 'px'
  return el
}

function exchange (arr, idx, idx2) {
  var temp = arr[idx]
  arr[idx] = arr[idx2]
  arr[idx2] = temp
}

function findIndex (arr, target) {
  var i = arr.length
  while (i--) {
    if (arr[i] === target) {
      return i
    }
  }
  return -1
}
// 成功则返回target 能不能用VDOM保存起来这些数据
function getOVerlayElm (source, target, threshold) {
  var p1 = source.getBoundingClientRect()
  var p2 = target.getBoundingClientRect()
  var overlayWidth = (Math.min(p1.bottom, p2.bottom) - Math.max(p1.top, p2.top))
  var overlayHeight = (Math.min(p1.right, p2.right) - Math.max(p1.left, p2.left))
  if (overlayWidth > 0 && overlayHeight > 0) {
    var overlay = overlayWidth * overlayHeight
    var minarea = Math.min(p1.width * p1.height, p2.width * p2.height)
    if (overlay / minarea > threshold) {
      // 表示target元素被souce覆盖了！
      return target
    }
  }
  return null
}

/* **********core*********** */
function applyDrag (container) {
  var containers = []
  var elms = []
  if (container.length !== undefined) {
    for (var i = 0, l = container.length; i < l; i++) {
      var children = container[i].children
      containers.push(container[i])
      for (var j = 0, jlength = children.length; j < jlength; j++) {
        if (children[j].getAttribute('drag') !== null) {
          elms.push(children[j])
        }
      }
    }
  } else {
    containers.push(container)
    children = container.children
    for (var k = 0, klength = children.length; k < klength; k++) {
      if (children[k].getAttribute('drag') !== null) {
        elms.push(children[j])
      }
    }
  }
  var length = elms.length
  var clength = containers.length
  return function (elm, sourceElm, point) {
    elm.style.transform = `translate3d(${point.moveX - point.startX}px, ${point.moveY - point.startY}px, 0) rotate(5deg)`
    var a = elm.getBoundingClientRect()
    var el
    var i = length
    var j = clength
    var b
    var targetIdx = findIndex(elms, sourceElm)
    // 判断它们的容器，是否与容器重合且容器为空，如果为空则添加到空容器中
    while (j--) {
      var cot = containers[j]
      if (cot === sourceElm.parentNode) continue
      if (cot.children.length === 0 && getOVerlayElm(elm, cot.parentNode, 0.7)) {
        cot.appendChild(sourceElm)
        return
      }
    }
    while (i--) {
      el = elms[i]
      if (el === sourceElm) {
        continue
      }
        // 覆盖面积达到百分之七十的元素
        // 1.如果该元素于sourceElm属于一个父容器，则
        // 1.1 如果sourceElm粗线在el之前，则 insertBefore(sourceElm, el.nextSibling)
        // 1.2 如果sourceElm粗线在el之后，则 insertBefore(sourceElm, el)
        // 2. 如果el与sourceElm不属于同一个父容器
        // 2.1 如果a.top > b.top 则 insertBefore(sourceElm, el.nextSibling)
        // 2.2 如果 a.bottom < b.bottom 则 insertBefore(sourceElm, el)
      if (el.parentNode === sourceElm.parentNode) {
        if (getOVerlayElm(elm, el, 0.7)) {
          if (targetIdx < i) {
            el.parentNode.insertBefore(sourceElm, el.nextSibling)
            exchange(elms, targetIdx, i)
          } else if (targetIdx > i) {
            el.parentNode.insertBefore(sourceElm, el)
            exchange(elms, targetIdx, i)
          }
          return
        }
      } else if (getOVerlayElm(elm, el, 0.3)) {
        b = el.getBoundingClientRect()
        if (a.top > b.top) {
          el.parentNode.insertBefore(sourceElm, el.nextSibling)
        } else if (a.bottom < b.bottom) {
          el.parentNode.insertBefore(sourceElm, el)
        }
        return
      }
    }
  }
}

// 给每个容器打标签
var idx = 0
// 存放各个容器下的updateView方法
var updateViews = {}
var _updateView = null
// 拖动的元素，拖动的时候其实它是source创建出来的副本
var target = null
// 选中的拖动元素
var source = null
var point = {
  startX: 0,
  startY: 0,
  moveX: 0,
  moveY: 0
}
// 监听全局鼠标按下事件
// 如果该元素包含drag属性，则启用drag方法
on(document, 'mousedown', function (e) {
  if (e.target.getAttribute('drag') !== null) {
    point.startX = e.clientX
    point.startY = e.clientY
    var dragId = e.target.parentNode.getAttribute('drag-id')
    if (dragId === undefined) return
    _updateView = updateViews[dragId]
    setTimeout(function () {
      source = e.target
      target = copyElm(source)
      addClass(source, 'drag-mask')
      document.body.appendChild(target)
    })
  }
})

on(document, 'mousemove', function (e) {
  if (target !== null) {
    point.moveX = e.clientX
    point.moveY = e.clientY
    _updateView(target, source, point)
  }
})

on(document, 'mouseup', function () {
  if (target) {
    document.body.removeChild(target)
    removeClass(source, 'drag-mask')
    target = null
  }
})

// 生成drag-mask样式
var style = document.createElement('style')
style.innerHTML = `.drag-mask::after {
  content: "";
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-color: #c0c6ca;
  user-select: none;
  -webkit-user-select:none;
  -moz-user-select: none;
  z-index: 9999;
  border-radius: 4px;
}
[drag] {
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
}`

document.getElementsByTagName('head')[0].appendChild(style)

module.exports = function (elms) {
  var index = idx++
  if (elms.length === undefined) {
    elms.setAttribute('drag-id', index)
  } else {
    for (var i = 0, l = elms.length; i < l; i++) {
      elms[i].setAttribute('drag-id', index)
    }
  }
  updateViews[index] = applyDrag(elms)
  return {
    update: function () {
      updateViews[index] = applyDrag(elms)
    }
  }
}
