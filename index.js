;// Set up node js
// Module required : express mysql body-parser ejs

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');

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

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


// //Add warehouse data to warehouse table
// app.post("/adw", (req, res) => {
//   const warehouse = {
//     name: req.body.warehouse,
//     manager: req.body.manager,
//     number: req.body.tel,
//     email: req.body.email,
//     address: req.body.address,
//     street: req.body.street,
//     address2: req.body.address2,
//     state: req.body.state,
//     city: req.body.city,
//     zipcode: req.body.zipcode
//   };

//   return res.send(warehouse);
// });
