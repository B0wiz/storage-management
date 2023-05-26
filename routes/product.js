const warehouse = require("./warehouse");

module.exports = {
    getSelectProduct:(req,res) => {
        let productID = req.params.id
        let editquery = "SELECT * FROM product WHERE productID = "+ productID +" ORDER BY warehouseID ASC";
        
        db.query(editquery, (err, result) => {
            if(err){
                res.redirect('/');
            }
            res.render('product/edit.ejs', {
                editpro : result,
                product : global.product,
                productselect : global.productselect ,
                category : global.category
            },)
        });
      },
    
    EditProduct: (req,res) => {
        let productID = req.params.id
        const eproduct = {
            name: req.body.product_name,
            categoryID: req.body.category,
            description: req.body.description,
            price: req.body.price,
            sell: req.body.sell,
            quantity: req.body.quantity,
        };
        let updateQuery = "UPDATE product SET \
        productname = '" + eproduct.name +"',\
        categoryID = " + eproduct.categoryID +",\
        productdescription = '" + eproduct.description +"',\
        productprice = " + eproduct.price +",\
        productsellingcost = " + eproduct.sell +",\
        productquantity = " + eproduct.quantity +"\
        WHERE productID = "+ productID +"";
        let backquery = "SELECT warehouseID FROM product WHERE productID = "+ productID +"";
        db.query(updateQuery, (err, result) => {
            if (err){
                return res.status(500).send(err);
            }
            db.query(backquery, (err, result) => {
                if (err){
                    return res.status(500).send(err);
                }
               let warehouseID = result[0].warehouseID
            res.redirect(`/product/${warehouseID}/${productID}`);
            });
        });
    },
}