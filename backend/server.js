const express = require('express')
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

const port = process.env.PORT || 5000

const app = express()

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res => {  res.send('Hello World!')}))

// Serve frontend static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('Please set to production ...')
  })
}

const server = app.listen(port, () => console.log(`Server started on port ${port} ... `))
