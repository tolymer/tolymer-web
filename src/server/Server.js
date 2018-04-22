const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const api = require('./api');

class Server {
  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  setupMiddlewares() {
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
  }

  setupRoutes() {
    Object.keys(api).forEach(name => {
      this.addRoute(api[name]);
    });
  }

  addRoute(crud) {
    if (crud.create) {
      this.app.post(crud.create.path, this.wrapHandler(crud.create.handler));
    }

    if (crud.read) {
      this.app.get(crud.read.path, this.wrapHandler(crud.read.handler));
    }

    if (crud.update) {
      this.app.patch(crud.update.path, this.wrapHandler(crud.update.handler));
    }

    if (crud.delete) {
      this.app.delete(crud.delete.path, this.wrapHandler(crud.delete.handler));
    }
  }

  wrapHandler(handler) {
    return async (req, res, next) => {
      try {
        await handler(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  }

  setupErrorHandler() {
    this.app.use((req, res) => {
      res.status(404).json({ message: 'No route matches' });
    });

    // eslint-disable-next-line no-unused-vars
    this.app.use((err, req, res, next) => {
      console.error(err.stack);
      console.error(err);
      res.status(500).json({ message: err.message });
    });
  }
}

module.exports = Server;
