/* **********utils*********** */
function on (element, event, handler) {
  if (element && event && handler) {
    if (element.length === 0) return
    if (element.length) {
      for (var i = 0; i < element.length; i++) {
        element[i].addEventListener(event, handler, false)
      }
    } else {
      element.addEventListener(event, handler, false)
    }
  }
}

function addClass (elm, clazz) {
  elm.classList.add(clazz)
}

function removeClass (elm, clazz) {
  elm.classList.remove(clazz)
}

function copyElm (elm) {
  var el = elm.cloneNode(true)
  el.style.position = 'fixed'
  var position = elm.getBoundingClientRect()
  el.style.margin = '0px'
  el.style.top = position.top + 'px'
  el.style.left = position.left + 'px'
  el.style.zIndex = 9999
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
// 成功则返回target
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
function applyDrag (elms) {
  var length = elms.length
  return function (elm, sourceElm, point) {
    var a = elm.getBoundingClientRect()
    var el
    var i = length
    var b
    var targetIdx = findIndex(elms, sourceElm)
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
          break
        }
      } else {
        if (getOVerlayElm(elm, el, 0.3)) {
          b = el.getBoundingClientRect()
          if (a.top > b.top) {
            el.parentNode.insertBefore(sourceElm, el.nextSibling)
            exchange(elms, targetIdx, i)
          } else if (a.bottom < b.bottom) {
            el.parentNode.insertBefore(sourceElm, el)
            exchange(elms, targetIdx, i)
          }
          break
        }
      }
    }
  }
}

function drag (elms) {
  var target = null
  var source = null
  _updateView = updateView(elms)
  var point = {
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0
  }
  on(document, 'mousemove', function (e) {
    if (target !== null) {
      point.moveX = e.clientX
      point.moveY = e.clientY
      move(target, point)
      _updateView(target, source, point)
    }
  })

  on(document, 'mouseup', function () {
    if (target) {
      document.body.removeChild(target)
      removeClass(source, 'mask')
      target = null
    }
  })

  on(elms, 'mousedown', function (e) {
    if (e.target.dataset.drag !== undefined) {
      point.startX = e.clientX
      point.startY = e.clientY
      setTimeout(function () {
        source = e.target
        target = copyElm(source)
        addClass(source, 'mask')
        document.body.appendChild(target)
      })
    }
  })
  return {
    update: function () {
      _updateView = updateView(elms)
    }
  }
}

function move (elm, point) {
  elm.style.transform = `translate3d(${point.moveX - point.startX}px, ${point.moveY - point.startY}px, 0) rotate(5deg)`
}

var _updateView
function updateView (container) {
  var elms = []
  if (container.length !== undefined) {
    for (var i = 0, l = container.length; i < l; i++) {
      var children = container[i].querySelectorAll('[data-drag]')
      elms = elms.concat(Array.prototype.slice.call(children, 0))
    }
  } else {
    elms = Array.prototype.slice.call(container.querySelectorAll('[data-drag]'), 0)
  }
  return applyDrag(elms)
}

module.exports = drag
