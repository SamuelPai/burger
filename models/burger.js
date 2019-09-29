var orm = require("../config/orm");

var burger = {
    all: function(cb) {
        orm.all("burgers", function(res) {
            cb(res);
        }); 
    },
    create: function(burger_name, cb) {
        orm.create(burger_name, function(res) {
            console.log(cb(res))
            cb(res)
        })
    },
    
    update: function(objColVals, condition, cb) {
    orm.update(objColVals, condition, function(res) {
        cb(res);
    });
}
}

module.exports = burger;