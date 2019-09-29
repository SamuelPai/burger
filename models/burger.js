var orm = require("../config/orm");

var burger = {
    all: function(cb) {
        orm.all("burgers", function(res) {
            cb(res);
        }); 
    },
    create: function(col, val, cb) {
        orm.create("burgers", col, val, function(res) {
            cb(res);
        })
    },
    
    update: function(objColVals, condition, cb) {
    orm.update("burgers", condition, function(res) {
        cb(res);
    });
}
}

module.exports = burger;