const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
const connectToDb = require('./config/db')
const Errors = require('./middleware/error')
const app = express()

dotenv.config({ path: './config/config.env' })
connectToDb()

app.use(
	fileUpload({
		useTempFiles: true,
	})
)

//enable cors
app.use(
	cors({
		credentials: true,
		origin: '*',
	})
)

const postRouter = require('./routes/post/post')
const CategoryRouter = require('./routes/category/category')
const ModelsRouter = require('./routes/girls/girls')
// Body parser
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Prevent http param pollution
app.use(hpp())

//mount routes here above error handler
app.use('/api/posts', postRouter)
app.use('/api/category', CategoryRouter)
app.use('/api/models', ModelsRouter)

app.use(Errors)

const PORT = process.env.PORT || 5000
const server = app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
process.on('uncaughtException', err => {
	console.log('UNCAUGHT EXCEPTION! 🙄 Shutting down...')
	console.error(err.name, err.message)
	process.exit(1)
})

process.on('unhandledRejection', err => {
	console.error(err.name, err.message)
	console.log('UNHANDLED REJECTION! 😞 Shutting down Server...')
	server.close(() => {
		process.exit(1)
	})
})
