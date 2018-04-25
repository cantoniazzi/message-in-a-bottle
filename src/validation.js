'use strict';

const joi = require('joi');

const schema = joi.object().keys({
  message: joi.string().min(3).required(),
  phone: joi.string().min(8).required()
});

module.exports = schema;