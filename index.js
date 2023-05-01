// Set up node js
// Module required : express mysql body-parser ejs

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');//Home page (Warehouse Page)
const {AddWarehouse} = require('./routes/warehouse');//Add warehouse

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

app.get('/',getHomePage);
app.post('/adw',AddWarehouse);
// app.get('/edw/:id', EditWarehouse);
// app.get('/delete/:id', DeleteWarehouse);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));