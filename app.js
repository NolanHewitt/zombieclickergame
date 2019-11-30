var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

router.use(function (req,res,next) {
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/lose",function(req,res){
  res.sendFile(path + "lose.html");
});

router.get("*",function(req,res){
  res.sendFile(path + "index.html");
});

app.use('*/style.css',express.static('public/style.css'));
app.use('*/script.js',express.static('public/script.js'));
app.use('*/images',express.static('public/images'));
app.use('*/sounds',express.static('public/sounds'));
app.use("/",router);

app.listen(process.env.PORT || 3000,function(){
  console.log("Live at Port 3000");
});
