import dragable from './dragable'

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
