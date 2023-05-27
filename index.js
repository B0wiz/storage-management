// Set up node js
// Module required : express mysql body-parser ejs

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();


const {getHomePage, getProductPage,getIncomingorderPage,getOutgoingorderPage,getReturnpage} = require('./routes/index');//Home page (Warehouse Page)
const {AddWarehouse, getWarehouse, EditWarehouse, getUser, getUserSelected, EditManage, DeleteEmployee,DeleteWarehouse} = require('./routes/warehouse');//Add warehouse
const {getSelectProduct,EditProduct, AddProduct, DeleteProduct}  = require('./routes/product.js');
const { AddIncomingOrder, DeleteIncoming } = require('./routes/incoming');
const { AddOutgoingOrder,Deleteoutgoing } = require('./routes/outgoing');

const PORT = 3000; // Port

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'my_db'
})

db.connect((err) => {
  if(err){
    throw err;
  }
  console.log('Connected to database successfully');
})

global.db = db;

// Express configation
app.set('port', process.env.PORT  || PORT);
app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(fileUpload());

app.get('/',getHomePage);
app.post('/adw',AddWarehouse);
app.get('/edw/:id', getWarehouse);
app.post('/edw/sub/:id', EditWarehouse);
app.get('/mnw/:id', getUser);
app.get('/edm/:id', getUserSelected);
app.post('/edm/sub/:id', EditManage);
app.get('/dem/:id', DeleteEmployee);
app.get('/dew/:id', DeleteWarehouse);

// Product page
function getWarehouseData(req, res, next) {
  let query = "SELECT * FROM warehouse ORDER BY warehouseID ASC";
  // excecuted qurey
  db.query(query, (err, result) => {
    if (err) {
      res.redirect("/");
    }
    global.warehouse = result
  });
  next();
}

app.get('/product/:warehouse/:id',getWarehouseData , getProductPage);
app.post('/adp/:id', AddProduct);
app.get('/edp/:id', getSelectProduct);
app.post('/edp/sub/:id', EditProduct);
app.get('/dep/:wid/:id', DeleteProduct)


//Incoming order page
app.get('/incoming/:pagestart',getWarehouseData, getIncomingorderPage);
app.post('/aio', AddIncomingOrder)
app.get('/dei/:id', DeleteIncoming)

// Outgoing order page
app.get('/outgoing/:pagestart',getWarehouseData, getOutgoingorderPage);
app.post('/ado', AddOutgoingOrder)
app.get('/deo/:id', Deleteoutgoing)

// Return page
app.get('/return/:pagestart',getWarehouseData, getReturnpage);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));