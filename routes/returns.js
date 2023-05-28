module.exports = {
    Addreturn: (req, res) => {
      let areturns = {
        date: req.body.date,
        warehouseID: req.body.warehouse,
        orderID: req.body.orderID,
        customername: req.body.customer,
        productID: req.body.product_name,
        quantity: req.body.quantity,
        reasons: req.body.reason,
      };
      console.log(areturns.productID)
      let outgoingorderquery = "SELECT * FROM outgoingorders";
      db.query(outgoingorderquery, (err, result) => {
        if (err) {
          console.log('err1');
          return res.status(500).send(err);
        }
  
        let orderFound = false;
        let itemFound = false;
  
        result.forEach(order => {
          if (parseInt(areturns.orderID) === parseInt(order.outgoingorderID)) {
            orderFound = true;
            var selectorderID = parseInt(order.outgoingorderID);
            let outgoingitemquery = `SELECT * FROM outgoingitems WHERE outgoingorderID = ${selectorderID} AND warehouseID = ${areturns.warehouseID}`;
            db.query(outgoingitemquery, (err, result) => {
              if (err) {
                console.log('err2');
                return res.status(500).send(err);
              }
  
              result.forEach(item => {
                if (parseInt(areturns.productID) === parseInt(item.productID)) {
                  itemFound = true;
                  let outgoingitemID = item.outgoingitemsID;
                  let insertquery = `INSERT INTO returns (outgoingitemsID, warehouseID, returndate, returnquantity, returnreasons,sender) VALUES (${outgoingitemID},${areturns.warehouseID},'${areturns.date}',${areturns.quantity},'${areturns.reasons}','${areturns.customername}')`;
                  db.query(insertquery, (err, result) => {
                    if (err) {
                      console.log('err3');
                      return res.status(500).send(err);
                    }
                    res.redirect('/return/0?start=0');
                  });
                }
              });
  
              if (!itemFound) {
                res.redirect('/return/0?start=0&err=2');
              }
            });
          }
        });
  
        if (!orderFound) {
          res.redirect('/return/0?start=0&err=1');
        }
      });
    },

    DeleteReturn : (req,res) => {
        let returnID = req.params.id
        let deletequery = "DELETE FROM returns WHERE returnID = " + returnID;
        db.query(deletequery, (err, result) => {
            if (err) {
              return res.status(500).send(err);
            }
            res.redirect('/return/0?start=0');
        });
    }
  };
  