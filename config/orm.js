var connection = require("./connection");

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

var orm = {

    all: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, data) {
            if (err) {
                throw err;
              }
              cb(data);
            console.log(data);
        });
    },
    create: function (table, col, val, cb) {
        var queryString = "INSERT INTO " + table + " (" +col.toString() + ") VALUES (" + printQuestionMarks(val.length) + ") ";
        
    
        connection.query(queryString, val, function (err, results) {
            if (err) {
                throw err
            }
            cb(results)
        });
    },
    update: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table + " SET " + objToSql(objColVals) + " WHERE " + condition;
        connection.query(queryString, function(err, result) {
            if (err) {
              throw err;
            }
      
            cb(result);
          });
    }
}
// console.log(orm.insert("Fat Burger", false, function(err, data) {
//     if (err) throw err;
//     console.log(data);
//     return(data);
// }));

// console.log(orm.update(
//     {
//         burger_name: "Fatty Burger",
//         devoured: true
//     },
//     "burger_name = 'Fat Burger'"
// ) 
// );


module.exports = orm;

