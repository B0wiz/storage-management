module.exports = {
    getHomePage: (req ,res) => {
        let query = "SELECT * FROM warehouse ORDER BY warehouseID ASC";

        // excecuted qurey
        db.query(query, (err, result) => {
            if(err){
                res.redirect('/');
            }
            console.log(result)
            res.render('warehouse/index.ejs', {
                warehouse : result
            })
        });

    },

    getProductPage: (req ,res) => {
        let query = "SELECT * FROM product ORDER BY productID ASC";

        // excecuted qurey
        db.query(query, (err, result) => {
            if(err){
                res.redirect('/');
            }
            console.log(result)
            res.render('product/index.ejs', {
                product : result
            })
        });

    },
            
    getIncomingorderPage: (req, res) => {
        var item = {};
        var warehouse = {};
        var pageStart = parseInt(req.query.start);

        let warehousequery = "SELECT * FROM warehouse ORDER BY warehouseID ASC";        
            db.query(warehousequery, (err, result) => {
                if(err){
                    res.redirect('/');
                }
                warehouse = result;
            })

        var offset = parseInt(req.params.pagestart);
        if(offset !== 0){
            offset += 9;
        }
        const itemquery = 
        "SELECT incomingitems.*, product.productname AS productname, category.categoryname AS categoryname, \
        product.productprice AS productprice ,product.productprice * incomingitems.incomingitemquantity AS price \
        ,warehouse.warehousename AS warehouse, incomingorder.incomingorderdate AS date\
        ,CONCAT(users.userfname, ' ', users.userlname) AS users\
        FROM incomingitems \
        JOIN product ON incomingitems.productID = product.productID\
        JOIN category ON product.categoryID = category.categoryID\
        JOIN warehouse ON incomingitems.warehouseID = warehouse.warehouseID\
        JOIN incomingorder ON incomingitems.incomingorderID = incomingorder.incomingorderID\
        JOIN users ON incomingorder.userID = users.userID\
        ORDER BY incomingitemsID ASC LIMIT 10 OFFSET "+ offset +";"
            db.query(itemquery, (err, result) => {
            if(err){
                res.redirect('/');
            }
            item = result;
            res.render('incomingorder/index.ejs', {
                item,
                warehouse,
                pageStart ,
            })

        });
    }
}
