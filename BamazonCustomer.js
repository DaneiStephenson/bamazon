var mysql = require('mysql');
var inquirer = require('inquirer');

var items = [];


function item(productname, departmentname, price, stockquantity, id) {
  this.productname = productname;
  this.departmentname = departmentname;
  this.price = price;
  this.stockquantity = stockquantity;
  this.id = id;
}

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root", 
  password: "", 
  database: "bamazon" 
})


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  displayitems();
})


function displayitems() {

  connection.query('SELECT * FROM `products`', {
  }, function(error, results) {
 
    console.log('There are ' + results.length + ' products in stock.');
   
    console.log('');
  
    for (var i=0; i<results.length; i++) {
     
      items[i] = new item(results[i].ProductName, results[i].DepartmentName, results[i].Price, results[i].StockQuantity, results[i].ItemID);
     
      console.log('ID: ' + results[i].ItemID);
      console.log('Product Name: ' + results[i].ProductName);
      console.log('Department Name: ' + results[i].DepartmentName);
      console.log('Price: $' + results[i].Price);
      console.log('Stock Quantity: ' + results[i].StockQuantity);
 
      console.log('');
    }

    insertID(results.length);
  })
}


function insertID(products) {
  var idQuestion = [
    {
      type: 'input',
      name: 'id',
      message: 'Type the ID number of the product you wish to buy (insert a number)',

      validate: function(value) {
        var valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0 && parseFloat(value) <= products;
        return valid || 'Please enter a valid ID';
      }
    }
  ]
  inquirer.prompt(idQuestion).then(function(answers) {

  })
}
function checkStock(id) {
  console.log(id);
 
  for (var i=0; i<items.length; i++) {
    if (items[i].id == id) {
    id is passed in to update the mysql database
      insertUnit(items[i].stockquantity, items[i].price, items[i].productname, items[i].id);
    }
  }
}


  console.log('We currently have ' + stock + ' more in stock.');
  var unitQuestion = [
    {
      type: 'input',
      name: 'units',
      message: 'How many would you like to purchase? (insert a number)',
      
      validate: function(value) {
        var valid = !isNaN(parseFloat(value)) && parseFloat(value) > 0 && parseFloat(value) <= stock;
        return valid || 'Insufficient Quantity. Please enter a valid number';
      }
    }
  ]
  inquirer.prompt(unitQuestion).then(function(answers) {
   
    var total = parseInt(price) * Math.floor(answers.units);

    var instock = parseInt(stock) - answers.units
    console.log('You purchased ' + answers.units + ' ' + name + '(s) for a total of $' + total + '.');

    connection.query('UPDATE `products` SET ? WHERE ?', 
      [{
       
        StockQuantity: instock
      },
      {
  
        ItemID: id
      }]
    , function(err, res) {
      if (err) throw err
    })


    checkout();
  })
}


function checkout() {
  var checkoutQuestion = [
    {
      type: 'confirm',
      name: 'checkout',
      message: 'Woudld you like to purchase another item?',
      default: false
    }
  ]
  inquirer.prompt(checkoutQuestion).then(function(answers) {
 
    if (answers.checkout) {
      displayitems();
    }
    else {
      console.log('Thank you for shopping with us');
      connection.end();
    }
  })
}