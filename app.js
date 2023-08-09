// jshint esversion : 6

const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

const app = express();

let items = [ "Wake up at 6`o clock", "Exercise", "Bathing"];

let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));

// to use the css files through express server
app.use(express.static("public"));

// setting up the ejs as view engine 
app.set('view engine', 'ejs');

app.get("/", function (req, res) {

    var today = new Date();

    var options = {
        month : "long",
        day : "numeric",
        weekday : "long",
    }

    var day = today.toLocaleDateString("en-US", options);

    // used to parse the results to the client-side files...ejs files....another type of templating
    res.render("list", {listTitle : day, newItems : items});

});

app.post("/", function (req, res) {
    
    // accessing the new item from the user throgh a form
    var item = req.body.todo;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

} ); 

app.get("/work", function (req, res) {
    res.render("list", {listTitle : "Work List", newItems : workItems});
});
 
app.get("/about", function (req, res)  {

    res.render("about");
    
});

app.listen(3333, function (req, res ) {
    
    console.log("The server is running on the port 3333");

});