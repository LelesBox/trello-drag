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
  // function cross()
  var length = elms.length
  var targetIdx = 0
  return function (elm, sourceElm, point) {
    var a = elm.getBoundingClientRect()
    var i = length, b
    var targetIdx = findIndex(elms, sourceElm)
    // console.log($('.container')[0].contains(sourceElm))
    // var ctn = sourceElm.nextSibling.parentNode
    // console.log(el.parentNode.contains(sourceElm))
    while (i--) {
      el = elms[i]
      if (el === sourceElm) {
        continue
      }
      b = el.getBoundingClientRect()
      // 如果是跨容器，则只需关注插入的位置即可
      // console.log(ctn.contains(sourceElm))
      // if(!el.parentNode.contains(sourceElm)) {
      //   return
      // }
      // 重叠检测 a（拖动值） 和 b
      // 怎么样才算重叠
      // 1. a的bottom和b的bottom的差值绝对值小于某值（比如B高度的一半）
      // 2. a的left和b的left的距离的绝对值小于某值（比如B的宽的一半）
      // if(false)
      if (point.moveY - point.dY > 0) {
        // 往下
        if (Math.abs(b.bottom - a.bottom) < b.height * 0.2 && Math.abs(a.left - b.left) < b.width * 0.7) {
        // if (a.top > b.top && Math.abs(a.left - b.left) < b.width * 0.7) {
          // console.log(el.parentNode.contains(sourceElm))
          // if (!el.parentNode.contains(sourceElm)) {
            // if(el === el.parentNode.lastChild) {
              // el.parentNode.insertBefore(sourceElm, el.nextSibling)
            // } else {
              // el.parentNode.insertBefore(sourceElm, el)
            // }
          // } else {
            el.parentNode.insertBefore(sourceElm, el.nextSibling)
          // }
          exchange(elms, targetIdx, i)
          point.dY = point.moveY
          point.dX = point.moveX
          break;
        }
      } else if (point.moveY - point.dY < 0) {
        // 往上
        if (Math.abs(a.bottom - b.bottom) < b.height * 0.2 && Math.abs(a.left - b.left) < b.width * 0.7) {
          // console.log(el.parentNode.contains(sourceElm))
          // el.parentNode.insertBefore(sourceElm, el)
          // if (!el.parentNode.contains(sourceElm)) {
          //   // el.parentNode.insertBefore(sourceElm, el)
          //   if(el === el.parentNode.lastChild) {
          //     el.parentNode.insertBefore(sourceElm, el.nextSibling)
          //   } else {
          //     el.parentNode.insertBefore(sourceElm, el)
          //   }
          // } else {
            el.parentNode.insertBefore(sourceElm, el)
          // }
          exchange(elms, targetIdx, i)
          point.dY = point.moveY
          point.dX = point.moveX
          break;
        }
      }
      // 第二种检测重叠基准 a,b
      // 检测两个元素重叠部分的面积是否是a，b面积中最小的那个面积的（一半或者0.7）
      // 然后检测改元素出现的位置，如果出现在b之前，则是插入b后面
      // 如果出现在b之后，则插在b前面
      // 如果a不存在于b的父容器中，
      // 如果重叠元素是该容器最后一个元素，则插入该容器最后一位
      // 否则则插入改元素之前
    }
  }
}
