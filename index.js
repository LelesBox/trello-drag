function copyElm(elm) {
  var el = elm.cloneNode(true)
  el.style.position = 'fixed'
  var position = elm.getBoundingClientRect()
  el.style.margin = '0px'
  el.style.top = position.top +'px'
  el.style.left = position.left + 'px'
  el.style.zIndex = 9999
  return el
}

var on = function (element, event, handler) {
  if(element && event && handler) {
    if(element.length === 0) return
    if(element.length) {
      element.forEach(elm => elm.addEventListener(event, handler, false))
    } else {
      element.addEventListener(event, handler, false)
    }
  }
}

var off = function (element, event, handler) {
  if(element && event) {
    element.removeEventListener(event, handler, false)
  }
}

var addClass = function (elm, clazz) {
  elm.classList.add(clazz)
}

var removeClass = function (elm, clazz) {
  elm.classList.remove(clazz)
}

var $ = function (sel) {
  return document.querySelectorAll(sel)
}

function detect (elms) {
  elms = Array.prototype.slice.call(elms, 0)
  function exchange(arr, idx, idx2) {
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
      if (overlay / minarea > threshold){
        // 表示target元素被souce覆盖了！
        return target
      }
    }
    return null
  }
  var length = elms.length
  var targetIdx = 0
  return function (elm, sourceElm, point) {
    var a = elm.getBoundingClientRect()
    var i = length, b
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
          break;
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
          break;
        }
      }
    }
  }
}
