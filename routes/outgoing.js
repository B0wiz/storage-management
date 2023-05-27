module.exports = {
  AddOutgoingOrder: (req, res) => {
    var orderID;
    const aoutgoingorder = {
      date: req.body.date,
      productID: req.body.product_name,
      warehouseID: req.body.warehouse,
      customer: req.body.customer,
      delivery: req.body.delivery,
      quantity: req.body.quantity,
    };
    let customerquery = "SELECT * FROM customers";
    db.query(customerquery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      for (const customer of result) {
        if (aoutgoingorder.customer.includes(customer.customersname)) {
          let outgoingorderquery = `INSERT INTO outgoingorders (customersID,outgoingorderdate) VALUES`;
          let orderIDquery =
            "SELECT * FROM outgoingorders ORDER BY outgoingorderID DESC LIMIT 1";
          const itemValues = [];
          for (let i = 0; i < aoutgoingorder.productID.length; i++) {
            itemValues.push(`(${customer.customersID},${aoutgoingorder.date})`);
          }
          outgoingorderquery += itemValues.join(", ");
          db.query(outgoingorderquery, (err, result) => {
            if (err) {
              return res.status(500).send(err);
            }
            db.query(orderIDquery, (err, result) => {
              if (err) {
                return res.status(500).send(err);
              }
              let outgoingorderID = result[0].outgoingorderID;
              let outgoingitemquery = `INSERT INTO outgoingitems (outgoingorderID, productID, outgoingitemquantity, warehouseID, deliveryID) \
              VALUE `;
              const itemValues = [];
              for (let i = 0; i < aoutgoingorder.productID.length; i++) {
                itemValues.push(`(${outgoingorderID},${aoutgoingorder.productID[i]},${aoutgoingorder.quantity[i]},${aoutgoingorder.warehouseID},${aoutgoingorder.delivery[i]})`);
              }
              outgoingitemquery += itemValues.join(", ");
              db.query(outgoingitemquery, (err, result) => {
                if (err) {
                  return res.status(500).send(err);
                }
                res.redirect("/outgoing/0?start=0");
              });
            });
          });
        }
      }

      console.log("Customer not already exists");
    });
  },

  Deleteoutgoing: (req,res)=>{
          let outgoingitems = req.params.id;
          let Deletequery = "DELETE FROM outgoingitems WHERE outgoingitemsID = "+ outgoingitems +"";

          db.query(Deletequery, (err, result) => {
                  if (err){
                      return res.status(500).send(err);
                  }
                  res.redirect(`/outgoing/0?start=0`);
          });
  }
};
