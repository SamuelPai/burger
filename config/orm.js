var connection = require("./connection");

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
    
    everything: function() {
        var queryString = "SELECT * FROM burgers";
        connection.query(queryString, function(err, data) {
            if (err) throw err;
            console.log(data);
            return data;
        })
    }, 
    insert: function(burger_name, devoured, cb) {
        var queryString = "INSERT INTO burgers (burger_name, devoured) VALUES (?, ?)";
    connection.query(queryString, [burger_name, devoured], cb);
       
    },
    update: function(objColVals, condition, cb) {
        var queryString = "UPDATE burgers SET " + objToSql(objColVals) + " WHERE " + condition;
        connection.query(queryString, [objColVals, condition], cb);
    }
}
// console.log(orm.insert("Fat Burger", false, function(err, data) {
//     if (err) throw err;
//     console.log(data);
//     return(data);
// }));

console.log(orm.update(
    {
        burger_name: "Fatty Burger",
        devoured: true
    },
    "burger_name = 'Fat Burger'"
) 
);

