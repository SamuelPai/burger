var express = require("express");
var burger = require("../models/burger");

var router = express.Router();

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

router.get("/", function(req, res) {
burger.everything(function(data) {
    var handleBarsObj = {
        burger: data
    };
    console.log(handleBarsObj);
    console.log(data);
    res.json(data);
    res.render("index", handleBarsObj);
});
});

router.post("api/burgers", function(req, res) {
    burger.create(["burger_name", "devoured"],[req.body.burger_name, req.body.devoured], function(result) {
        console.log(result);
        res.redirect("/");
    })
})


module.exports = router;