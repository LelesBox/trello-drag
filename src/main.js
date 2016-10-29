(function () {
  var lastTime = 0
  var vendors = ['webkit', 'moz']
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame']
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime()
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id)
    }
  }
}())
import dragable from './dragable'
import { on } from './domApi'

function $ (sel) {
  return document.querySelectorAll(sel)
}
var i = 7
var j = 0
while (i--) {
  var l = ++j + 1
  $('.blocks')[i].appendChild(getChildren(l))
}
function randomColor () {
  return `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 1)`
}
function getChildren (number) {
  var fragement = document.createDocumentFragment()
  for (var i = 0; i < number; i++) {
    var el = document.createElement('div')
    el.className = 'drag'
    el.setAttribute('drag', '')
    el.style.backgroundColor = randomColor()
    fragement.appendChild(el)
  }
  return fragement
}
// container dragable
var point = {
  startX: 0,
  startY: 0,
  offsetLeft: 0
}
var scroll = false
on($('.co')[0], 'mousedown', function (e) {
  if (!scroll && e.button === 0 && e.target === this) {
    point.startX = e.clientX
    point.startY = e.clientY
    point.offsetLeft = document.documentElement.scrollLeft || document.body.scrollLeft
    scroll = true
  }
  return
})
on($('.co')[0], 'mousemove', function (e) {
  if (scroll) {
    var offsetX = point.startX - e.clientX
    window.scrollTo(point.offsetLeft + offsetX, document.documentElement.scrollTop || document.body.scrollTop)
  }
})
on($('.co')[0], 'mouseup', function (e) {
  scroll = false
})

function Autoscroll () {
  this.reqA = null
  this.run = function (scrollTop, offsetWidth, direction) {
    var self = this
    return function handle (timestamp) {
      var offsetX = document.documentElement.scrollLeft || document.body.scrollLeft
      if (direction > 0 && offsetX + document.body.offsetWidth < offsetWidth) {
        window.scrollTo(offsetX + 5, scrollTop)
        self.reqA = window.requestAnimationFrame(handle)
      } else if (direction < 0 && offsetX > 0) {
        window.scrollTo(offsetX - 5, scrollTop)
        self.reqA = window.requestAnimationFrame(handle)
      } else {
        self.reqA = null
      }
    }
  }
}
Autoscroll.prototype.left = function (scrollTo, offsetWidth, cb) {
  if (!this.reqA) {
    this.reqA = window.requestAnimationFrame(this.run(scrollTo, offsetWidth, -1, cb))
  }
}
Autoscroll.prototype.right = function (scrollTo, offsetWidth, cb) {
  if (!this.reqA) {
    this.reqA = window.requestAnimationFrame(this.run(scrollTo, offsetWidth, 1, cb))
  }
}
Autoscroll.prototype.stop = function () {
  if (this.reqA) {
    window.cancelAnimationFrame(this.reqA)
    this.reqA = null
  }
}

var co = document.getElementsByClassName('co')[0]
var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
var s = new Autoscroll()
var offsetWidth = co.offsetWidth
var d = dragable($('.blocks'), function (target, position, point) {
  if (position.right > document.body.clientWidth) {
    s.right(scrollTop, offsetWidth)
  } else if (position.left < 0) {
    s.left(scrollTop, offsetWidth)
  } else {
    s.stop()
  }
})
dragable($('.co'), function (target, position, point) {
  if (position.right > document.body.clientWidth) {
    s.right(scrollTop, offsetWidth)
  } else if (position.left < 0) {
    s.left(scrollTop, offsetWidth)
  } else {
    s.stop()
  }
})
on(document, 'mouseup', function () {
  s.stop()
})

// add new one
document.addEventListener('click', function (e) {
  if (e.target.className === 'addone') {
    var blocks = e.target.parentNode.children[0]
    blocks.appendChild(getChildren(1))
    d.update()
  }
})
