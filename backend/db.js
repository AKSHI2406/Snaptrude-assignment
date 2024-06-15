const { MongoClient, ObjectId }= require( "mongodb");

const client = new MongoClient(
  "mongodb+srv://test:sN4mgvmIhpHv2D0O@cluster0.ggda4do.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
);

const db = client.db("imageDB");
const collection = db.collection("images");

module.exports= { collection, ObjectId };