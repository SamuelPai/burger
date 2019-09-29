var express = require("express");
var burger = require("../models/burger");

var router = express.Router();

var exphbs = require("express-handlebars");
var app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

router.get("/", function(req, res) {
    res.redirect("/burgers");
   
})

router.get("/burgers", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        // console.log(hbsObject);
        res.render("index", hbsObject);

    });
  });

  router.post("/burgers/create", function(req, res) {
    
      burger.create(["burger_name"], [req.body.burger_name], function(data) {
          console.log(data);          
          res.redirect("/");
        });
  });


  router.put("/burgers/create/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.update({
      devoured: req.body.devoured
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });




module.exports = router;