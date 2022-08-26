// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", async function (req, res) {
  let value = (req.params.date)
  if (await new Date(value).toUTCString() == "Invalid Date") {
    value = parseInt(req.params.date)
  }
  if (await new Date(value).toUTCString() == "Invalid Date") {
    if (req.params.date == undefined) {
      res.json({
        unix: Date.now(),
        utc: new Date(Date.now()).toUTCString()
      })
    }
    res.json({error: "Invalid Date"})
  } else {
    res.json({
      unix: await new Date(value).getTime(), 
      utc: await new Date(value).toUTCString()
    });
  }

  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
