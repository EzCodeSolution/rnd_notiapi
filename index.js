const express = require('express');
const app = express()
var request = require('request');
const bodyParser = require('body-parser')
var cors = require('cors')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.post("/sendline",(req,res)=>{
    console.log(req.body.data)
    var token = req.body.lineToken;
    var message = req.body.data;
    request({
        method: 'POST',
        uri: 'https://notify-api.line.me/api/notify',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          'bearer': token
        },
        form: {
          message: message
        }
      }, (err, httpResponse, body) => {
        if(err){
          console.log(err);
        } else {
          res.json({
            httpResponse: httpResponse,
            body: body
          });
        }
      });
})

app.listen(3000);