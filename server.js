// link to express package

let connect = require('connect');

let url = require('url'); //comes with node parses urls letss us chop up url
let accounting = require('accounting');

// create a new connect object

let app = connect();  // you can use new before connect but not necessary
//hello "page"

let hello = function(req, res, next) {
    res.end('Hello, this now restarts with nodemon!');
};

//goodby "page"
let goodbye = function(req, res, next){
    res.end('Goodbye!');
};

// index "page"
let index = function (req, res, next){
    res.end('This is the home page');
}

//tax calculator
let tax = function(req, res, next){
   

//get full querystring ?amount=1000
let qs = url.parse(req.url, true).query;


// get the amount value from querystring
let amount = qs.amount;

// calculate tax and total
let hst = amount * .13;
let total = parseFloat(hst) + parseFloat(amount);


//display all
 res.end('<h1>Tax Calculator</h1>' +
 'Amount: ' + accounting.formatMoney(amount) + '<br />' +
 'HST: ' + accounting.formatMoney(hst)  + '<br />' +
 'Total: ' + accounting.formatMoney(total));

};



// set up a 404 function
let notFound = function(req, res, next){
    res.writeHead(404);
    res.end('Not Found');
};

//json api
let api = function(req, res, next) {
    let person = JSON.stringify({
        "name": "Ralph",
        "age": 35,
        "nationality": "Canadian"
    });
    res.writeHead(200, {"Content-Type": "application/json" });

        res.end(person);
    };


//map the urls to the correct virtual pages

app.use('/hello', hello);
app.use('/goodbye', goodbye);
app.use('/api', api);
app.use('/tax', tax);
app.use('/', index);
//app.use(notFound);


//start server 
app.listen(3000);
console.log('Connect server running on port 3000');
