module.exports = {
  getHomePage: (req, res) => {
    let query = "SELECT * FROM warehouse ORDER BY warehouseID ASC";
    // excecuted qurey
    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      console.log(result);
      res.render("warehouse/warehouse.ejs", {
        warehouse: result,
      });
    });
  },

  getProductPage: (req, res) => {
    var productid = parseInt(req.params.id);
    if (productid === 0) {
      let firstproduct =
        "SELECT productID FROM product ORDER BY productID ASC LIMIT 1";
      db.query(firstproduct, (err, result) => {
        if (err) {
          res.redirect("/");
        }
        productid = result[0].productID;
        let productquery = "SELECT * FROM product ORDER BY productID ASC";
        let productselectquery =
          "SELECT product.*, category.categoryname AS categoryname FROM product \
            JOIN category ON product.categoryID = category.categoryID\
            WHERE productID = " +
          productid +
          " ORDER BY productID ASC";

        // excecuted qurey
        db.query(productquery, (err, result) => {
          if (err) {
            res.redirect("/");
          }
          let product = result;
          db.query(productselectquery, (err, result) => {
            if (err) {
              res.redirect("/");
            }
            res.render('product/product.ejs', {
                productselect : result,
                product
            })
          });
        });
      });
    } else {
      let productquery = "SELECT * FROM product ORDER BY productID ASC";
      let productselectquery =
        "SELECT product.*, category.categoryname AS categoryname FROM product \
            JOIN category ON product.categoryID = category.categoryID\
            WHERE productID = " +
        productid +
        " ORDER BY productID ASC";

      // excecuted qurey
      db.query(productquery, (err, result) => {
        if (err) {
          res.redirect("/");
        }
        let product = result;
        db.query(productselectquery, (err, result) => {
          if (err) {
            res.redirect("/");
          }
          res.render('product/product.ejs', {
              productselect : result,
              product
          })
        });
      });
    }
  },

  getIncomingorderPage: (req, res) => {
    var item = {};
    var warehouse = {};
    var pageStart = parseInt(req.query.start);

    let warehousequery = "SELECT * FROM warehouse ORDER BY warehouseID ASC";
    db.query(warehousequery, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      warehouse = result;
    });

    var offset = parseInt(req.params.pagestart);
    if (offset !== 0) {
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
        ORDER BY incomingitemsID ASC LIMIT 10 OFFSET " +
      offset +
      ";";
      const allitemquery =
      "SELECT * FROM incomingitems";
        db.query(allitemquery, (err, result) => {
          if (err) {
            res.redirect("/");
          }
          allitem = result;
          db.query(itemquery, (err, result) => {
            if (err) {
              res.redirect("/");
            }
            item = result;
            res.render("incomingorder/incomingorder.ejs", {
              item,
              warehouse,
              pageStart,
              allitem
            });
          });
        });
  },

  getOutgoingorderPage: (req, res) => {
    let query = "SELECT * FROM outgoingitems";
    // excecuted qurey
    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      res.render("outgoingorder/outgoingorder.ejs", {
        warehouse: result,
      });
    });
  },
};
