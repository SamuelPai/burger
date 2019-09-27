var orm = require("../config/orm");

var burger = {
    everything: function(cb) {
        orm.everything(function(res) {
            cb(res);
        }); 
    },
    insert: function(burger_name, devoured, cb) {
        orm.insert(burger_name, devoured, function(res) {
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