$(document).ready(function () {
	let items = document.getElementsByClassName('myItem')
	let boxes = document.getElementsByClassName('myBox')
	let empties = document.getElementsByClassName('empty')
	let isMouseDown = false
	let isOnBox = false
	let index = -1
	let result = {}

	document.addEventListener('mouseup', function () {
		isMouseDown = false
		items[index].style.position = 'static'
		index = -1
	})

	document.addEventListener('mousemove', function (event) {
		if (isMouseDown) {
			items[index].style.position = 'fixed'
			items[index].style.left =
				event.clientX - items[index].offsetWidth / 2 + 'px'
			items[index].style.top =
				event.clientY - items[index].offsetHeight / 2 + 'px'
		}
	})

	for (let i = 0; i < boxes.length; i++) {
		boxes[i].addEventListener('mouseover', function () {
			if (isMouseDown) {
				isMouseDown = false
				isOnBox = true
				empties[i].className = 'emptyNone'
				items[index].style.position = 'static'
				result[i] = items[index].innerHTML
				document.getElementById('q2').value = result
				boxes[i].appendChild(items[index])
			}
		})
		boxes[i].addEventListener('mouseout', function () {
			isOnBox = false
		})
	}

	for (let i = 0; i < items.length; i++) {
		items[i].addEventListener('mousedown', function () {
			isMouseDown = true
			index = i
		})
	}
})
