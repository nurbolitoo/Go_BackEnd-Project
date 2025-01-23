const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'nurlybaynurbol@gmail.com',
		pass: 'rdhk amua afhc mivw',
	},
})

exports.registerUser = async (req, res) => {
	try {
		const { username, password, email, firstName, lastName, age, gender } =
			req.body

		const existingUsername = await User.findOne({ username })
		if (existingUsername) {
			return res.status(400).send('Username already exists')
		}

		const existingEmail = await User.findOne({ email })
		if (existingEmail) {
			return res.status(400).send('Email already registered')
		} else if (!email.endsWith('@gmail.com')) {
			return res.status(401).send('Invalid email')
		}

		const newUser = new User({
			username,
			password,
			email,
			firstName,
			lastName,
			age,
			gender,
			role: 'regular',
		})
		req.session.user = newUser
		req.session.isLoggedIn = true
		await newUser.save()

		const mailOptions = {
			from: 'nurlybaynurbol@gmail.com',
			to: email,
			subject: 'Welcome our platform!',
			text: 'Thank you for registering with us. We look forward to serving you.',
		}

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error)
				res.status(500).send('Error sending email')
			} else {
				console.log('Email sent: ' + info.response)
				res.status(200).send('Registration successful. Welcome email sent.')
			}
		})
		res.redirect('/')
	} catch (error) {
		res.status(500).send('Error registering user')
	}
}

exports.loginUser = async (req, res) => {
	const { username, password } = req.body
	try {
		const user = await User.findOne({ username })
		if (user) {
			const passwordMatch = await bcrypt.compare(password, user.password)
			if (passwordMatch) {
				req.session.user = user
				req.session.isLoggedIn = true
				res.redirect('/')
			} else {
				res.status(401).send('Invalid password')
			}
		} else {
			res.status(401).send('Invalid username')
		}
	} catch (error) {
		res.status(500).send('Error logging in')
	}
}

exports.logoutUser = async (req, res) => {
	try {
		req.session.destroy(err => {
			if (err) {
				res.status(500).send('Error logging out')
			}
			res.redirect('/')
		})
	} catch (error) {
		res.status(500).send('Error logging out')
	}
}

exports.renderRegisterForm = (req, res) => {
	res.render('register')
}

exports.renderLoginForm = (req, res) => {
	res.render('login')
}
