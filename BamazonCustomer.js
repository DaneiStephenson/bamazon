var mysql = require('mysql');
var inquirer = require('inquirer')

function item(itemID, productname, departmentname, price, stockquantity){
   this.itemID = itemID;
   this.productname = productname;
   this.departmentname = departmentname;
   this.price = price;
   this.stockquantity = stockquantity;
}

var connection = mysql.createConnection({
   host: "localhost",
   port: 3306,
   user: "root", //Your username
   password: "", //Your password
   database: "bamazon"
});

connection.connect(function(err) {
   if (err) throw err;
   console.log("connected as id " + connection.threadId);
   steps();
});

function steps(){
   connection.query('SELECT * FROM products', function(err, res) {
       if (err) throw err;
       console.log(res);
       buy(res.length);
   });
}

function buy(stock){
   var questions =
     {
       type: 'input',
       name: 'productID',
       message: 'What is the ID of the product you would like to buy?',
      validate: function(value){
       var valid = !isNaN(parseFloat(value)) && parseInt(value) > 0 && parseInt(value) <= stock;
       return valid || 'Please insert a valid id'

      }
     }

   inquirer.prompt(questions).then(function (answers) {
       console.log(Math.floor(answers.productID));
       buyunits();
   });
}

function buyunits(){
  var questions = 
  {
    type: "input",
    name: "quantity",
    message: "How many units of the product do you want to purchase?"
    validate: function(value){
      var valid = !isNaN(parseFloat(value))  && parseINT > 0 && parseInt(value) <= stock;
      return calid || 'Please inser a valid id'
    }

  }

     inquirer.prompt(questions).then(function (answers) {
       console.log(Math.floor(answers.quantity));
       
   });

}