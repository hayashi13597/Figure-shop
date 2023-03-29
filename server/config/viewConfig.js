const express = require("express");

const configView = (app) => {
  app.use(express.static('./public'));
}

module.exports = configView;