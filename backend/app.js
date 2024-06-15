var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

const axios=require("axios");
const { collection, ObjectId }=require("./db");

app.get("/image/:id", async (req, res) => {
  const imgId = req.params.id;

  if (!ObjectId.isValid(imgId)) {
    return res.status(400).send("Invalid image ID");
  }

  const imageDoc = await collection.findOne({ _id: new ObjectId(imgId) });
  if (!imageDoc) {
    return res.status(404).send("Image not found");
  }

  res.set("Content-Type", "image/png");
  res.send(imageDoc.image.buffer);
});

app.post("/image", async (req, res) => {
  const { lat, long, zoom } = req.body;  
  console.log(req.body)
  const resp = await axios.get(
   `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=${zoom}&size=400x400&key=AIzaSyAi5rf8blIHtH69tFGLRKmFRo3QoYDeTiA`,
    { responseType: "arraybuffer" },
  );
console.log(resp.status)
  const imageBuffer = Buffer.from(resp.data, "binary");

  const result = await collection.insertOne({ image: imageBuffer });

  res.status(200).send(result.insertedId);
});










// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
