var express= require("express");
var app= express();
var bodyParser = require("body-parser");
var mongoose= require("mongoose");

mongoose.connect("mongodb://localhost/uiet_campus");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");

//Schema define
var capmusSchema= new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campus= mongoose.model("Campus", capmusSchema);

/*Campus.create({
    name:"RAJUUUUU",
    image:"https://unsplash.com/collections/1127163/merry-christmas"}, function(err, campus){
    if(err){
        console.log(err);
    }
    else{
        console.log("NEWLY ADDED CAMPUS");
        console.log(campus);
    }
    
});
*/



var campus= [
    {name: "Jacob", image : "https://unsplash.com/collections/1127163/merry-christmas"},
    {name: "Redcliff", image : "https://unsplash.com/collections/1127139/happy-mothers-day"},
    {name: "Jacob", image : "https://unsplash.com/collections/1127177/happy-birthday"},
    {name: "Jacob", image : "https://unsplash.com/collections/1127163/merry-christmas"}


];


app.get("/", function(req, res){
    res.render("landing");
});


app.get("/campus", function(req, res){
    // get all campus from dbs
    Campus.find({}, function(err, allCampus){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campus:allCampus});
        }
    });
   // 
});

app.get("/campus/new", function(req, res){

    res.render("new");

});

app.post("/campus", function(req, res){
    // data from form and add to campground
    var name= req.body.name ;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampus= {name: name, image: image, description:desc}
    //create a new campus and push it to db
    Campus.create(newCampus,function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
             // redirect to campus
            res.redirect("/campus"); 
        }
    });

     
});

app.get("/Campus/:id", function(req, res){
    //find campus with id
    Campus.findById(req.params.id, function(err, foundCampus){
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {campus: foundCampus});
        }
    });
    
    // render show template with that ca,pus
    
});
app.listen(3000, function(){
    console.log("Server is Started");
});