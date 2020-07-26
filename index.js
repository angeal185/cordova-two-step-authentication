const express = require('express'),
cors = require('cors'),
bodyParser = require('body-parser'),
app = express()

app.use(cors())
app.use(bodyParser.json())

app.post('/api', function (req, res) {
  console.log(req.body)
  res.json({code: 123456})
})

app.listen(8080, function(){
  console.log('Server listening at localhost:8080')
})
