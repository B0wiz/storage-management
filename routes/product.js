const warehouse = require("./warehouse");

module.exports = {
    AddProduct: (req,res)=> {
        let warehouseID = req.params.id;
        const aproduct = {
            name: req.body.product_name,
            categoryID: req.body.category,
            description: req.body.description,
            price: req.body.price,
            sell: req.body.sell,
            quantity: req.body.quantity,
        };
        let AddQuery = "INSERT INTO product (productname, categoryID, warehouseID, productdescription, productprice, productsellingcost,productquantity) VALUES ('" + aproduct.name +"', " + aproduct.categoryID +","+ warehouseID +", '" + aproduct.description +"', " + aproduct.price +", " + aproduct.sell +"," + aproduct.quantity +")";
    
        db.query(AddQuery, (err, result) => {
            if (err){
                return res.status(500).send(err);
            }
            res.redirect(`/product/${warehouseID}/0`);
        });
    },

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
                category : global.category,
                delivery : global.delivery
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
               backwarehouse = result[0].warehouseID
            res.redirect(`/product/${backwarehouse}/${productID}`);
            });
        });
    },

    DeleteProduct: (req,res) => {
        let productID = req.params.id;
        let warehouse = req.params.wid;
        let deletequery = "DELETE FROM product WHERE productID = "+ productID +"";

        db.query(deletequery, (err,result) => {
            if (err){
                return res.status(500).send(err);
            }
            res.redirect(`/product/${warehouse}/0`);
        })
    },

    AddCategory: (req,res)=> {
        let warehouseID = req.params.id;
        let categoryname  = req.body.categoryadd;
        let addcatquery = `INSERT INTO category (categoryname, warehouseID) VALUES ('${categoryname}', ${warehouseID});`;
        db.query(addcatquery, (err,result) => {
            if (err){
                return res.status(500).send(err);
            }
            res.redirect(`/product/${warehouseID}/0`);
        })
    },

    getEditCategorypage: (req,res) => {
        let warehouseID = req.params.id
        res.render('product/editcategory.ejs', {
            product : global.product,
            productselect : global.productselect ,
            category : global.category,
            delivery : global.delivery
        })
    },

}