var mongoose= require('mongoose');

mongoose.connect("mongodb://localhost/cat_app");

var catSchemo= new mongoose.Schema(
    {
        name: String,
        age:Number,
        bread: String
    }
);

var Cat= mongoose.model("Cat", catSchemo);