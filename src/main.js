import dragable from './dragable'

function $ (sel) {
  return document.querySelectorAll(sel)
}
$('.blocks')[0].appendChild(getChildren(3))
$('.blocks')[1].appendChild(getChildren(4))
$('.blocks')[2].appendChild(getChildren(5))
var d = dragable($('.blocks'))
var dd = dragable($('.co'))
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

document.addEventListener('click', function (e) {
  if (e.target.className === 'addone') {
    var blocks = e.target.parentNode.children[0]
    blocks.appendChild(getChildren(1))
    d.update()
  }
})
