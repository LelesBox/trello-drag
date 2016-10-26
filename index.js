var drag = require('./drag')

function $ (sel) {
  return document.querySelectorAll(sel)
}
$('.container')[0].innerHTML = getChildrenHTML(3)
$('.container')[1].innerHTML = getChildrenHTML(4)
$('.container')[2].innerHTML = getChildrenHTML(5)
var d = drag($('.container'))
window.add = function () {
  $('.container')[1].appendChild(gelement())
  d.update()
}
var dd = drag($('.co'))
function randomColor () {
  return `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 1)`
}

function getChildrenHTML (number) {
  var inthml = ''
  for (var i = 0; i < number; i++) {
    inthml += `<div class="drag" drag style="background-color:${randomColor()}"></div>`
  }
  return inthml
}

function gelement () {
  var div = document.createElement('div')
  div.className = 'drag'
  div.setAttribute('drag', '')
  div.style.backgroundColor = randomColor()
  return div
}
