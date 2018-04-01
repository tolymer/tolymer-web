const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
const apiBaseUrl = 'http://localhost:3000'

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.get('/users/:userId', async (req, res) => {
  const { userId } = req.params

  try {
    const result = await axios.get(`${apiBaseUrl}/users/${userId}`)

    res.status(200).json(result.data)
  } catch (e) {
    res.status(404).json({})
  }
})

app.get('/current_user', async (req, res) => {
  const { headers } = req

  try {
    const result = await axios.get(`${apiBaseUrl}/current_user`, {
      headers
    })

    res.status(200).json(result.data)
  } catch (e) {
    res.status(404).json({})
  }
})

app.post('/users', async (req, res) => {
  const { name, password } = req.body

  try {
    const result = await axios.post(`${apiBaseUrl}/users`, {
      name,
      password
    })

    res.status(201)
  } catch (e) {
    res.status(404)
  }

  res.json({})
})

app.post('/user_token', async (req, res) => {
  const { name, password } = req.body.auth

  try {
    const result = await axios.post(`${apiBaseUrl}/user_token`, {
      auth: {
        name,
        password
      }
    })

    res.cookie('accessToken', result.data.jwt, {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24,
      secure: false // true
    })
    res.status(200)
  } catch (e) {
    res.status(404)
  }

  res.json({})
})

module.exports = app
