const express = require('express');
const bodyParser = require("body-parser")
const cors = require('cors')
const ObjectId = require('mongodb').ObjectID
const app = express();


app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))


const password = "fahimxyz16"

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://fahim16:fahimxyz16@cluster0.8acpe.mongodb.net/organicdb?retryWrites=true&w=majority";


app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})





const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const ProductCollection = client.db("organicdb").collection("products");

  app.get("/product",(req,res) => {
      ProductCollection.find({})
      .toArray((err,documents) =>{
        res.send(documents);
      })
  })

  //load single product

  app.get("/product/:id",(req,res)=>{
      ProductCollection.find({_id : ObjectId(req.params.id)})
      .toArray((err,documents) =>{
        res.send(documents[0])
      })
  })

  app.post("/addProduct",(req,res)=>{
      const product = req.body;
      ProductCollection.insertOne(product)
      .then(result =>{
        console.log("data added successfully");
        res.send("success")
      })
    })


    app.use("/delete/:id",(req,res)=>{
      ProductCollection.deleteOne({_id : ObjectId(req.params.id)})
      .then(result => {
        console.log(result)
      })
    })
  




})
  




app.listen(3000,()=>console.log("your server is running on 3000"))