const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const API_HOST = 'http://localhost:3000'

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.post('/new', async (req, res) => {
  const { name, password } = req.body

  try {
    const result = await axios.post(`${API_HOST}/users`, {
      name,
      password
    })

    res.status(201)
  } catch (e) {
    res.status(404)
  }

  res.json({})
})

app.post('/login', async (req, res) => {
  const { name, password } = req.body.auth

  try {
    const result = await axios.post(`${API_HOST}/user_token`, {
      auth: {
        name,
        password
      }
    })

    res.cookie('accessToken', result.data.jwt, {
      maxAge: 1000 * 60 * 60 * 24,
      secure: true
    })
    res.status(200)
  } catch (e) {
    res.status(404)
  }

  res.json({})
})

module.exports = app
