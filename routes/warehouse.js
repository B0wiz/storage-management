const fs = require("fs");

module.exports = {
  AddWarehouse: (req, res) => {
    console.log('Add Warehouse module!');
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
        state: req.body.state,
        city: req.body.city,
        zipcode: req.body.zipcode,
    };

    let warehouseQuery = "INSERT INTO warehouse (warehousename, warehousemanager, warehouseemail, warehousenumber,warehouseaddress,warehousestreet, warehousestate, warehousecity, warehousezipcode) VALUES ('" + awarehouse.name +"', '" + awarehouse.manager +"', '" + awarehouse.email +"', '" + awarehouse.number +"', '" + awarehouse.address +"','" + awarehouse.street +"','" + awarehouse.state +"','" + awarehouse.city +"','" + awarehouse.zipcode +"')";

    db.query(warehouseQuery, (err, result) => {
        if (err){
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
  },

  getWarehouse:(req,res) => {
    let warehouseID = req.params.id
    let editquery = "SELECT * FROM warehouse WHERE warehouseID = "+ warehouseID +" ORDER BY warehouseID ASC";

    db.query(editquery, (err, result) => {
        if(err){
            console.log('error');
            res.redirect('/');
        }
        res.render('warehouse/edit.ejs', {
            editwh : result,
            warehose : global.warehouse
        },)
    });

  },

  EditWarehouse: (req,res) => {
    const ewarehouse = {
        name: req.body.warehouse_name,
        manager: req.body.manager_name,
        number: req.body.tel,
        email: req.body.email,
        address: req.body.address,
        street: req.body.street,
        state: req.body.state,
        city: req.body.city,
        zipcode: req.body.zipcode,
    };
    let warehouseID = req.params.id;
    let updateQuery = "UPDATE warehouse SET \
    warehousename = '" + ewarehouse.name +"',\
    warehousemanager = '" + ewarehouse.manager +"',\
    warehouseemail = '" + ewarehouse.email +"',\
    warehousenumber = '" + ewarehouse.number +"',\
    warehouseaddress = '" + ewarehouse.address +"',\
    warehousestreet = '" + ewarehouse.street +"',\
    warehousestate = '" + ewarehouse.state +"',\
    warehousecity = '" + ewarehouse.city +"',\
    warehousezipcode = '" + ewarehouse.zipcode +"'\
    WHERE warehouseID = "+ warehouseID +"";

    db.query(updateQuery, (err, result) => {
        if (err){
            return res.status(500).send(err);
        }
        res.redirect('/');
    });

  },

  getUser: (req,res) =>{
    let warehouseID = req.params.id
    let query = "SELECT * FROM users WHERE warehouseID = "+ warehouseID +" ORDER BY warehouseID ASC";
    // excecuted qurey
    db.query(query, (err, result) => {
        if(err){
            res.redirect('/');
        }
        user = result
        res.render('warehouse/manage.ejs', {
            user,
            warehose : global.warehouse 
        },)
    });
  },

  getUserSelected: (req,res) =>{
    let userID = req.params.id
    let query = "SELECT * FROM users WHERE userID = "+ userID +" ORDER BY warehouseID ASC";
    // excecuted qurey
    db.query(query, (err, result) => {
        if(err){
            res.redirect('/');
        }
        res.render('warehouse/editmanage.ejs', {
            userselected : result,
            warehose : global.warehouse,
            user
        },)
    });
  },

  EditManage: (req,res) => {
    const emanage = {
        fname: req.body.fname,
        lname : req.body.lname,
        account: req.body.account,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
    };
    let userID = req.params.id;
    let updateQuery = "UPDATE users SET \
    userfname = '" + emanage.fname +"',\
    userlname = '" + emanage.lname +"',\
    useraccount = '" + emanage.account +"',\
    userpassword = '" + emanage.password +"',\
    useremail = '" + emanage.email +"',\
    userphone = '" + emanage.phone +"',\
    userrole = '" + emanage.role +"'\
    WHERE userID = "+ userID +" ";
    let query = "SELECT * FROM users WHERE userID = "+ userID +" ORDER BY warehouseID ASC";
    
    db.query(query, (err, result) => {
        if (err){
            return res.status(500).send(err);
        }
        warehouseID = result[0].warehouseID;
        db.query(updateQuery, (err, result) => {
            if (err){
                return res.status(500).send(err);
            }
            res.redirect(`/mnw/${warehouseID}`);
        });
    });

  },


  DeleteEmployee: (req,res) => {
    let userID = req.params.id
    let deleteQuery = "DELETE FROM users WHERE userID = "+ userID +"";
    let query = "SELECT * FROM users WHERE userID = "+ userID +" ORDER BY warehouseID ASC";
    db.query(query, (err, result) => {
        if (err){
            return res.status(500).send(err);
        }
        warehouseID = result[0].warehouseID;
        db.query(deleteQuery, (err, result) => {
            if (err){
                return res.status(500).send(err);
            }
                res.redirect(`/mnw/${warehouseID}`);
            });
    });
  },
  
  DeleteWarehouse: (req,res) => {
     let warehouseID = req.params.id
     let deleteQuery = "DELETE FROM warehouse WHERE warehouseID = "+ warehouseID +"";

     db.query(deleteQuery, (err, result) => {
      if (err){
          return res.status(500).send(err);
      }
      res.redirect('/');
  });
  },
};
