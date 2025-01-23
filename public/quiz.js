$(document).ready(function () {
	$('#btn').click(function () {
		let total =
			checkQ1() +
			checkQ2() +
			checkQ3() +
			checkQ4() +
			checkQ5() +
			checkQ6() +
			checkQ7()
		document.getElementById('total').innerHTML =
			Math.round((total / 7) * 100) + '%'
	})
})

function checkQ1() {
	let correctAnswers = [
		'russia',
		'china',
		'kyrgyzstan',
		'turkmenistan',
		'uzbekistan',
	]
	let checkboxes = document.getElementsByName('q1')
	let selectedAnswers = []
	for (let i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			selectedAnswers.push(checkboxes[i].value)
		}
	}

	if (correctAnswers.length !== selectedAnswers.length) return false
	for (let i = 0; i < selectedAnswers.length; i++) {
		if (selectedAnswers[i] !== correctAnswers[i]) return false
	}
	return true
}

function checkQ2() {
	let correctAnswers = [
		'1465 - 1847 years',
		'1847 - 1922 years',
		'1922 - 1991 years',
	]
	let selectedAnswers = document.getElementById('q2').value

	for (let i = 0; i < 3; i++) {
		if (correctAnswers[i] != selectedAnswers[i]) return true
	}
	return true
}

function checkQ3() {
	let correctAnswer = 'Janibek Khan and Kerei Khan'
	let selectedAnswer = document.querySelector('input[name="q3"]:checked')

	if (selectedAnswer) {
		if (selectedAnswer.value === correctAnswer) {
			return true
		}
	}
	return false
}

function checkQ4() {
	let correctAnswer = '1.000.000'
	let selectedAnswer = document.querySelector('input[name="q4"]:checked')

	if (selectedAnswer) {
		if (selectedAnswer.value === correctAnswer) {
			return true
		}
	}
	return false
}

function checkQ5() {
	let correctAnswer = 'Junior Juz'
	let selectedAnswer = document.getElementById('q5')

	if (selectedAnswer) {
		if (selectedAnswer.value === correctAnswer) {
			return true
		}
	}
	return false
}

function checkQ6() {
	let correctAnswer = '1847'
	let selectedAnswer = document.getElementById('q6')

	if (selectedAnswer.value === correctAnswer) {
		return true
	}
	return false
}

function checkQ7() {
	let correctAnswer = 'Perestroika and Independence'
	let selectedAnswer = document.querySelector('input[name="q7"]:checked')

	if (selectedAnswer) {
		if (selectedAnswer.value === correctAnswer) {
			return true
		}
	}
	return false
}
