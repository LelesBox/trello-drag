var drag = require('./drag')

function $ (sel) {
  return document.querySelectorAll(sel)
}
var inhtm = ''
var inhtm2 = ''
for (var i = 0; i < 10; i++) {
  inhtm += `<div class="drag" style="background-color:${randomColor()}"></div>`
}
$('.container')[0].innerHTML = inhtm
for (var j = 0; j < 10; j++) {
  inhtm2 += `<div class="drag" style="background-color:${randomColor()}"></div>`
}
$('.container')[1].innerHTML = inhtm2
drag($('.drag'))
function randomColor () {
  return `rgba(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, 1)`
}
