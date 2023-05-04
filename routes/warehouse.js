const fs = require("fs");

module.exports = {
  AddWarehouse: (req, res) => {
    console.log('AddWarehouse module');
    // if (!req.file) {
    //   return res.status(400).send("No files were upload");
    // }
    const warehouse = {
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

    let warehouseQuery = "INSERT INTO warehouse (name, manager, email, number,address, street, address2, state, city, zipcode) VALUES ('" + warehouse.name +"', '" + warehouse.manager +"', '" + warehouse.email +"', '" + warehouse.number +"', '" + warehouse.address +"', '" + warehouse.street +"', '" + warehouse.address2 +"','" + warehouse.state +"','" + warehouse.city +"','" + warehouse.zipcode +"')";

    db.query(warehouseQuery, (err, result) => {
        if (err){
            return res.status(500).send(err);
        }
        console.log(result);
        res.redirect('/');
    });
  },
  EditWarehouse: (req,res) => {
    const warehouse = {
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
    name = '" + warehouse.name +"',\
    manager = '" + warehouse.manager +"',\
    email = '" + warehouse.email +"',\
    number = '" + warehouse.number +"',\
    address = '" + warehouse.address +"',\
    street = '" + warehouse.street +"',\
    address2 = '" + warehouse.address2 +"',\
    state = '" + warehouse.state +"',\
    city = '" + warehouse.city +"',\
    zipcode = '" + warehouse.zipcode +"'\
    WHERE warehouseID = '"+ warehouseID +"'";

    db.query(updateQuery, (err, result) => {
        if (err){
            return res.status(500).send(err);
        }
        console.log(result);
        res.redirect('/');
    });

  },
  DeleteWarehouse: (req,res) => {
     let warehouseID = req.params.id
     let deleteQuery = "DELETE FROM warehouse WHERE warehouseID = '"+ warehouseID +"'";

     db.query(deleteQuery, (err, result) => {
      if (err){
          return res.status(500).send(err);
      }
      console.log(result);
      res.redirect('/');
  });
  },
};
