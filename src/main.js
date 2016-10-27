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
var d = dragable($('.blocks'))
dragable($('.co'))
document.addEventListener('click', function (e) {
  if (e.target.className === 'addone') {
    var blocks = e.target.parentNode.children[0]
    blocks.appendChild(getChildren(1))
    d.update()
  }
})

var point = {
  startX: 0,
  startY: 0,
  offsetLeft: 0
}
var scroll = false
on($('.co')[0], 'mousedown', function (e) {
  console.log('mousedown', e.target)
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
    console.log('mousemove', e.target)
    var offsetX = point.startX - e.clientX
    console.log(offsetX)
    window.scrollTo(point.offsetLeft + offsetX, document.documentElement.scrollTop || document.body.scrollTop)
  }
})
on($('.co')[0], 'mouseup', function (e) {
  console.log('mouseup', e.target)
  scroll = false
})
on($('.co')[0], 'mouseleave', function (e) {
  console.log('mouseleave', e.target)
  scroll = false
})
