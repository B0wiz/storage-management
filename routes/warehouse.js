const fs = require("fs");
var warehouse = {};

module.exports = {
  AddWarehouse: (req, res) => {
    console.log('AddWarehouse module');
    // if (!req.file) {
    //   return res.status(400).send("No files were upload");
    // }
    const awarehouse = {
        name: req.body.warehouse_name,
        manager: req.body.manager_name,
        number: req.body.tel,
        email: req.body.email,
        address: req.body.address,
        street: req.body.street,
        address2: req.body.address2,
        state: req.body.state,
        city: req.body.city,
        zipcode: req.body.zipcode,
    };

    let warehouseQuery = "INSERT INTO warehouse (name, manager, email, number,address, street, address2, state, city, zipcode) VALUES ('" + awarehouse.name +"', '" + awarehouse.manager +"', '" + awarehouse.email +"', '" + awarehouse.number +"', '" + awarehouse.address +"', '" + awarehouse.street +"', '" + awarehouse.address2 +"','" + awarehouse.state +"','" + awarehouse.city +"','" + awarehouse.zipcode +"')";

    db.query(warehouseQuery, (err, result) => {
        if (err){
            return res.status(500).send(err);
        }
        console.log(result);
        res.redirect('/');
    });
  },

  getWarehouse:(req,res) => {
    let warehouseID = req.params.id
    let warehousequery = "SELECT * FROM warehouse ORDER BY warehouseID ASC";
    let editquery = "SELECT * FROM warehouse WHERE warehouseID = "+ warehouseID +" ORDER BY warehouseID ASC";

    db.query(warehousequery, (err, result) => {
        if(err){
            res.redirect('/');
        }
        warehouse = result;
        });

    db.query(editquery, (err, result) => {
        if(err){
                res.redirect('/');
        }
        res.render('warehouse/edit.ejs', {
            edit : result,
            warehouse
        },)
    });

    // console.log(warehouse)
  },

  EditWarehouse: (req,res) => {
    const ewarehouse = {
        name: req.body.warehouse_name,
        manager: req.body.manager_name,
        number: req.body.tel,
        email: req.body.email,
        address: req.body.address,
        street: req.body.street,
        address2: req.body.address2,
        state: req.body.state,
        city: req.body.city,
        zipcode: req.body.zipcode,
    };
    let warehouseID = req.params.id;
    let updateQuery = "UPDATE warehouse SET \
    name = '" + ewarehouse.name +"',\
    manager = '" + ewarehouse.manager +"',\
    email = '" + ewarehouse.email +"',\
    number = '" + ewarehouse.number +"',\
    address = '" + ewarehouse.address +"',\
    street = '" + ewarehouse.street +"',\
    address2 = '" + ewarehouse.address2 +"',\
    state = '" + ewarehouse.state +"',\
    city = '" + ewarehouse.city +"',\
    zipcode = '" + ewarehouse.zipcode +"'\
    WHERE warehouseID = '"+ warehouseID +"'";

    db.query(updateQuery, (err, result) => {
        if (err){
            return res.status(500).send(err);
        }
        res.redirect('/');
    });

  },

  getUser: (req,res) =>{
    let warehouseID = req.params.id
    let query = "SELECT * FROM user WHERE warehouseID = "+ warehouseID +" ORDER BY warehouseID ASC";
    // excecuted qurey
    db.query(query, (err, result) => {
        if(err){
            res.redirect('/');
        }
        res.render('warehouse/manage.ejs', {
            user : result,
            warehouse 
        },)
    });
  },

  DeleteEmployee: (req,res) => {
    var ids = req.params.ids.split('&');
  },
  
  DeleteWarehouse: (req,res) => {
     let warehouseID = req.params.id
     let deleteQuery = "DELETE FROM warehouse WHERE warehouseID = "+ warehouseID +"";

     db.query(deleteQuery, (err, result) => {
      if (err){
          return res.status(500).send(err);
      }
      console.log(result);
      res.redirect('/');
  });
  },
};
