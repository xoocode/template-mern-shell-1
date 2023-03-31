const express = require('express')
const session = require('express-session')
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

const server = app.listen(port, () => console.log(`Server started on port ${port} ... `))
