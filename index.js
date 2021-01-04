const { response } = require('express');
var express = require('express');
var app = express();
const Mongo = require('mongodb').MongoClient;
var fetch = require('node-fetch')
var db1 = require('mongodb');
var mongoose = require('mongoose');
var uri ="mongodb+srv://lexluthar:MNihj5rr@cluster0.jjzmt.mongodb.net/data?retryWrites=true&w=majority";
var jsondata;
var request = require("request");

const path = require('path');
var PORT = process.env.PORT || 5000;

var http = require("http")

var url = "https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI";

var MongoClient = require('mongodb').MongoClient;


////////
// FETCHED DATA AND SEND TO MONGODB
//////

app.get('/', (request,response)=>{
  run();
}
);


function run(){
request(url, function(error, res, body){
 // if(!error && res.statusCode == 200){
      var apidata = JSON.parse(body);
      var MongoClient = require('mongodb').MongoClient;
      MongoClient.connect("mongodb://lexluthar:MNihj5rr@cluster0-shard-00-00.jjzmt.mongodb.net:27017,cluster0-shard-00-01.jjzmt.mongodb.net:27017,cluster0-shard-00-02.jjzmt.mongodb.net:27017/data?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority" , function(err, db) {
        if (err) throw err;
        db.collection("data").insert(apidata, function(err, res) {
          if (err) throw err;
          console.log("Number of documents inserted: " + res.insertedCount);
          db.close();
        });
      });
  
    })

  }
////////
////  fetched data from database 
////////

app.get('/data', (request,response)=>{
  data();
});


function data(){
  
request(url, function(error, res, body){
  if(!error && res.statusCode == 200){
      var apidata = JSON.parse(body);
      var MongoClient = require('mongodb').MongoClient;
      MongoClient.connect("mongodb://lexluthar:MNihj5rr@cluster0-shard-00-00.jjzmt.mongodb.net:27017,cluster0-shard-00-01.jjzmt.mongodb.net:27017,cluster0-shard-00-02.jjzmt.mongodb.net:27017/data?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority" , function(err, db) {
        if (err) throw err;
        db.collection("data").findOne({}, function(err, res) {
          if (err) throw err;
          console.log(res.branch);
          return res;
          db.close();
        });
      });
  }
  });
}


  var server = http.Server(app);
  server.listen(PORT, function(){
    console.log("Runnning!!")
  })