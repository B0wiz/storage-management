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

    console.log(warehouse);

    let warehouseQuery = "INSERT INTO warehouse (name, manager, email, number,address, street, address2, state, city, zipcode) VALUES ('" + warehouse.name +"', '" + warehouse.manager +"', '" + warehouse.email +"', '" + warehouse.number +"', '" + warehouse.address +"', '" + warehouse.street +"', '" + warehouse.address2 +"','" + warehouse.state +"','" + warehouse.city +"','" + warehouse.zipcode +"')";

    db.query(warehouseQuery, (err, result) => {
        if (err){
            return res.status(500).send(err);
        }
        console.log(result);
        res.redirect('/');
    });
  },
};
