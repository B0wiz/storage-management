global.productselect = {};
global.product = {};
global.category = {};
global.item = {};
global.warehouse = {};


module.exports = {
  getHomePage: (req, res) => {
    let query = "SELECT * FROM warehouse ORDER BY warehouseID ASC";
    // excecuted qurey
    db.query(query, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      warehouse = result
      res.render("warehouse/warehouse.ejs", {
        warehouse,
      });
    });
  },

  getProductPage: (req, res) => {
    var productid = parseInt(req.params.id);
    var warehouseid = parseInt(req.params.warehouse);
    if (productid === 0 || warehouseid === 0) {
      let firstproduct =
        "SELECT * FROM product  ORDER BY warehouseID ASC LIMIT 1";
      db.query(firstproduct, (err, result) => {
        if (err) {
          res.redirect("/");
        }
        let fproduct = result;
        let productquery = "SELECT product.*, category.categoryname AS categoryname FROM product \
        JOIN category ON product.categoryID = category.categoryID\
        WHERE product.warehouseID = "+ fproduct[0].warehouseID +" ORDER BY productID ASC";
        let productselectquery =
        "SELECT product.*, category.categoryname AS categoryname, warehouse.warehousename AS warehousename FROM product \
        JOIN category ON product.categoryID = category.categoryID\
        JOIN warehouse ON product.warehouseID = warehouse.warehouseID\
        WHERE product.productID = " + fproduct[0].productID + " AND product.warehouseID = "+  fproduct[0].warehouseID  +" ORDER BY productID ASC";
        let categoryquery = "SELECT * FROM category WHERE warehouseID = "+  fproduct[0].warehouseID +" ORDER BY categoryID ASC";
        // excecuted qurey
        db.query(productquery, (err, result) => {
          if (err) {
            res.redirect("/");
          }
          product = result;
          db.query(categoryquery, (err, result) => {
            if (err) {
              res.redirect("/");
            }
            category = result;
          db.query(productselectquery, (err, result) => {
            if (err) {
              res.redirect("/");
            }
            productselect = result
            res.render('product/product.ejs', {
                productselect,
                product,
                category
            })
          });
        });
        });
      });
    } else {
      let productquery = "SELECT product.*, category.categoryname AS categoryname FROM product \
        JOIN category ON product.categoryID = category.categoryID\
        WHERE product.warehouseID = "+  warehouseid  +" ORDER BY productID ASC";
      let productselectquery =
        "SELECT product.*, category.categoryname AS categoryname, warehouse.warehousename AS warehousename FROM product \
            JOIN category ON product.categoryID = category.categoryID\
            JOIN warehouse ON product.warehouseID = warehouse.warehouseID\
            WHERE product.productID = " + productid + " AND product.warehouseID = "+  warehouseid  +" ORDER BY productID ASC";
      let categoryquery = "SELECT * FROM category WHERE warehouseID = "+  warehouseid +" ORDER BY categoryID ASC";
      // excecuted qurey
      db.query(productquery, (err, result) => {
        if (err) {
          res.redirect("/");
        }
        product = result;
        db.query(categoryquery, (err, result) => {
          if (err) {
            res.redirect("/");
          }
          category = result;
        db.query(productselectquery, (err, result) => {
          if (err) {
            res.redirect("/");
          }
          productselect = result
          res.render('product/product.ejs', {
              productselect,
              product,
              category
          })
        });
      });
      });
    }
  },

  getIncomingorderPage: (req, res) => {
    var pageStart = parseInt(req.query.start);

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
