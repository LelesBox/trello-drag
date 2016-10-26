/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var drag = __webpack_require__(1)
	
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


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	function applyDrag (container) {
	  var elms = []
	  if (container.length !== undefined) {
	    for (var i = 0, l = container.length; i < l; i++) {
	      var children = container[i].children
	      for (var j = 0, jlength = children.length; j < jlength; j++) {
	        if (children[j].getAttribute('drag') !== null) {
	          elms.push(children[j])
	        }
	      }
	    }
	  } else {
	    children = container.children
	    for (var k = 0, klength = children.length; k < klength; k++) {
	      if (children[k].getAttribute('drag') !== null) {
	        elms.push(children[j])
	      }
	    }
	  }
	  var length = elms.length
	  return function (elm, sourceElm, point) {
	    elm.style.transform = `translate3d(${point.moveX - point.startX}px, ${point.moveY - point.startY}px, 0) rotate(5deg)`
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map