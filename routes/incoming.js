module.exports = {
        AddIncomingOrder: (req,res) =>{
                var orderID;
                const aincomingorder = {
                        date: req.body.date,
                        productID: req.body.product_name,
                        warehouseID: req.body.warehouse,
                        quantity: req.body.quantity
                }
                console.log(aincomingorder);
                let updateorderquery = "INSERT INTO incomingorder (userID, incomingorderdate) VALUE (2, '"+ aincomingorder.date +"')";
                let updateitemquery = "INSERT INTO incomingitems (incomingorderID, productID, warehouseID, incomingitemquantity) VALUE ";
                let orderquery = "SELECT * FROM incomingorder ORDER BY incomingorderID DESC LIMIT 1";
                db.query(updateorderquery, (err, result) => {
                        if (err){
                            return res.status(500).send(err);
                        }
                        db.query(orderquery, (err, result) => {
                                if (err){
                                    return res.status(500).send(err);
                                }
                                orderID = result[0].incomingorderID
                                console.log(orderID)
                                const itemValues = [];
                                for (let i = 0; i < aincomingorder.productID.length; i++) {
                                  itemValues.push(`(${orderID}, ${aincomingorder.productID[i]}, ${aincomingorder.warehouseID}, ${aincomingorder.quantity[i]})`);
                                }
                                updateitemquery += itemValues.join(', ');

                                db.query(updateitemquery, (err, result) => {
                                        if (err){
                                            return res.status(500).send(err);
                                        }    
                                        res.redirect(`/incoming/0?start=0`);
                                });
                        });
                });
        },

        DeleteIncoming: (req,res)=>{
                let incomingID = req.params.id;
                let Deletequery = "DELETE FROM incomingitems WHERE incomingitemsID = "+ incomingID +"";

                db.query(Deletequery, (err, result) => {
                        if (err){
                            return res.status(500).send(err);
                        }    
                        res.redirect(`/incoming/0?start=0`);
                });
        }
}