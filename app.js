const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const { GoogleGenerativeAI } = require('@google/generative-ai')
const authRoutes = require('./routes/authRoutes')
const landmarkRoutes = require('./routes/landmarkRoutes')
const apiRoutes = require('./routes/apiRoutes')
const mainRoutes = require('./routes/mainRoutes')

require('dotenv').config()

const app = express()

mongoose
	.connect(
		'mongodb+srv://nurlybaynurbol:987412365nn@cluster0.436nq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
	)
	.then(() => {
		console.info('Connected to MongoDB')
	})
	.catch(err => {
		console.error('Error: ', err)
	})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(
	session({
		secret: 'QsRdea!imf79o05',
		resave: false,
		saveUninitialized: true,
	})
)

// Route to handle Gemini API integration
const genAI = new GoogleGenerativeAI('AIzaSyCUu277QBflOl5t5im3X0Cg9HDNv3lKtBw')

app.get('/ai-generate', async (req, res) => {
	try {
		const prompt = req.query.prompt || 'Explain how AI works'
		console.log('Prompt received:', prompt)

		const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
		const result = await model.generateContent(prompt)

		console.log('Full Response:', JSON.stringify(result, null, 2))

		// Extract the text from the nested structure
		const generatedText =
			result.response.candidates[0]?.content?.parts[0]?.text ||
			'No content generated.'

		res.json({ success: true, response: generatedText })
	} catch (error) {
		console.error('Error in /ai-generate:', error)
		res
			.status(500)
			.json({ success: false, message: 'Failed to generate content.' })
	}
})

app.use('/auth', authRoutes)
app.use('/landmarks', landmarkRoutes)
app.use('/api', apiRoutes)
app.use('/', mainRoutes)

const port = process.env.PORT || 3000
app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
