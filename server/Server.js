const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const api = require('./api')

class Server {
  constructor() {
    this.app = express()
    this.setupMiddlewares()
    this.setupRoutes()
  }

  setupMiddlewares() {
    this.app.use(cookieParser())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({
      extended: false
    }))
  }

  setupRoutes() {
    Object.keys(api).forEach(name => {
      this.addRoute(api[name])
    })
  }

  addRoute(crud) {
    if (crud.create) {
      this.app.post(crud.create.path, crud.create.handler)
    }

    if (crud.read) {
      this.app.get(crud.read.path, crud.read.handler)
    }

    if (crud.update) {
      this.app.patch(crud.update.path, crud.update.handler)
    }

    if (crud.delete) {
      this.app.delete(crud.delete.path, crud.delete.handler)
    }
  }
}

module.exports = Server
