// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

// API endpoint to return date
app.route("/api/:date").get((req, res) => {
  let date;
  
  if (isNaN(req.params.date)) {
    date = new Date(req.params.date)
  } else {
    date = new Date(Number(req.params.date))
  }

  if (isValidDate(date)) {
    const unix = date.getTime()
    const utc = date.toUTCString()
    res.json({ unix: unix, utc: utc })
  } else {
    res.json({ error: "Invalid Date" })
  }
})

app.route("/api").get((req, res) => {
  const date = new Date()
  const unix = date.getTime()
  const utc = date.toUTCString()
  res.json({ unix: unix, utc: utc })
})

const isValidDate = (date) => {
  return (!isNaN(date.getTime()))
}