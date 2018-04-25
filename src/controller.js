'use strict';

const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const sns = new AWS.SNS();
const messageSchema = require('./validation');

router.post('/', (req, res) => {
  const result = messageSchema.validate(req.body);

  if (result.err)
    res.status(422).json({error: err.message});
  
  let params = {
    Message: req.body.message,
    MessageStructure: 'string',
    PhoneNumber: req.body.phone
  };
      
  sns.publish(params, (err, data) =>
  {
    if (err) {
      res.status(400).json({error: err.message});
    }
    res.status(200).json({message: 'Message sent successfully'});
  });

});

module.exports = router