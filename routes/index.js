global.productselect = {};
global.product = {};
global.category = {};
global.item = {}
global.delivery= {};

module.exports = {
  getHomePage: (req,res) => {
    let incommingquery = "SELECT incomingitems.* , SUM(incomingitems.incomingitemquantity) AS total , COUNT(incomingitems.incomingitemquantity) AS ordernum ,warehouse.warehousename AS warehousename, product.productname AS productname FROM incomingitems \
    JOIN warehouse ON incomingitems.warehouseID = warehouse.warehouseID \
    JOIN product ON incomingitems.productID = product.productID \
    GROUP BY productname\
    ORDER BY total DESC, ordernum DESC LIMIT 10";
    let warehousequery = "SELECT warehouse.warehousename AS warehousename,\
    COUNT(DISTINCT outgoingorders.outgoingorderID) + COUNT(DISTINCT incomingorder.incomingorderID) AS total_orders\
    FROM warehouse\
    LEFT JOIN outgoingitems ON outgoingitems.warehouseID = warehouse.warehouseID\
    LEFT JOIN outgoingorders ON outgoingorders.outgoingorderID = outgoingitems.outgoingorderID\
    LEFT JOIN incomingitems ON incomingitems.warehouseID = warehouse.warehouseID\
    LEFT JOIN incomingorder ON incomingorder.incomingorderID = incomingitems.incomingorderID\
    GROUP BY warehouse.warehouseID\
    ORDER BY total_orders DESC\
    LIMIT 10";
    let outgoingquery = "SELECT outgoingitems.* , SUM(outgoingitems.outgoingitemquantity) AS total , COUNT(outgoingitems.outgoingitemquantity) AS ordernum ,warehouse.warehousename AS warehousename, product.productname AS productname FROM outgoingitems \
    JOIN warehouse ON outgoingitems.warehouseID = warehouse.warehouseID \
    JOIN product ON outgoingitems.productID = product.productID \
    GROUP BY productname \
    ORDER BY total DESC, ordernum DESC LIMIT 10";
    let returnquery = "SELECT returns.* , SUM(returns.returnquantity) AS total , COUNT(returns.returnquantity) AS ordernum ,warehouse.warehousename AS warehousename, product.productname AS productname FROM returns \
    JOIN warehouse ON returns.warehouseID = warehouse.warehouseID \
    JOIN outgoingitems ON returns.outgoingitemsID = outgoingitems.outgoingitemsID\
    JOIN product ON outgoingitems.productID = product.productID \
    GROUP BY productname\
    ORDER BY total DESC, ordernum DESC, productname DESC LIMIT 10";
    let customerquery = "SELECT outgoingitems.* , customers.customersname AS customername, \
    SUM(outgoingitems.outgoingitemquantity) AS total, \
    COUNT(outgoingitems.outgoingitemquantity) AS ordernum\
    FROM outgoingitems\
    JOIN outgoingorders ON outgoingitems.outgoingorderID = outgoingorders.outgoingorderID\
    JOIN customers ON outgoingorders.customersID = customers.customersID\
    GROUP BY customername ORDER BY total DESC, ordernum DESC LIMIT 10";
    db.query(outgoingquery, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      const topoutpro = result
      db.query(incommingquery, (err, result) => {
        if (err) {
          res.redirect("/");
        }
        const topinpro = result
        db.query(returnquery, (err, result) => {
          if (err) {
            res.redirect("/");
          }
          const topreturn = result
          db.query(customerquery, (err, result) => {
            if (err) {
              res.redirect("/");
            }
            const topcus = result
            db.query(warehousequery, (err, result) => {
              if (err) {
                res.redirect("/");
              }
              const topwarehouse = result
        res.render("dashboard/dashboard.ejs",{
          topoutpro,
          topinpro,
          topreturn,
          topcus,
          topwarehouse
        });
      });
    });
      });
    });
    });
  },

  getWarehousePage: (req, res) => {
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
    var warehouseidfirst = 1;
    var productidfirst = 1;
    if (productid === 0 && warehouseid === 0) {
      let firstproduct =
        "SELECT * FROM product  ORDER BY productID ASC LIMIT 1";
      db.query(firstproduct, (err, result) => {
        if (err) {
          console.log('err')
          res.redirect("/");
        }
        if(result.length > 0){
          warehouseidfirst = result[0].warehouseID;
         productidfirst = result[0].productID;  
        }  
      });
      
        let productquery = "SELECT product.*, category.categoryname AS categoryname, warehouse.warehousename AS warehousename FROM product \
        JOIN category ON product.categoryID = category.categoryID\
        JOIN warehouse ON product.warehouseID = warehouse.warehouseID\
        WHERE product.warehouseID = "+warehouseidfirst +" ORDER BY productID ASC";
        let productselectquery =
        "SELECT product.*, category.categoryname AS categoryname, warehouse.warehousename AS warehousename FROM product \
        JOIN category ON product.categoryID = category.categoryID\
        JOIN warehouse ON product.warehouseID = warehouse.warehouseID\
        WHERE product.productID = " + productidfirst + " AND product.warehouseID = "+  warehouseidfirst  +" ORDER BY productID ASC";
        let categoryquery = "SELECT * FROM category WHERE warehouseID = "+  warehouseidfirst +" ORDER BY categoryID ASC";
        let deliveryquery = "SELECT * FROM delivery WHERE productID = " +  productidfirst ;
        // excecuted qurey
        db.query(productquery, (err, result) => {
          if (err) {
            res.redirect("/");
          }
            product = result
          db.query(categoryquery, (err, result) => {
            if (err) {
              res.redirect("/");
            }
            category = result ;  
          });
          if (product.length > 0) {
            db.query(deliveryquery, (err, result) => {
              if (err) {
                res.redirect("/");
              }
                delivery = result;
          db.query(productselectquery, (err, result) => {
            if (err) {
              res.redirect("/");
            }
              productselect = result
            res.render('product/product.ejs', {
                productselect,
                product,
                category,
                delivery,
                warehouse : global.warehouse
            })
          });
        });
      } else {
        db.query(categoryquery, (err, result) => {
          if (err) {
            res.redirect("/");
          }
          category = result; 
          res.render('product/product.ejs', {
            productselect,
            product,
            category : category ,
            delivery,
            warehouse : global.warehouse,
        })
        });
      }
      });

    } else {
      if(productid !== 0){
        var productselectquery =
        "SELECT product.*, category.categoryname AS categoryname, warehouse.warehousename AS warehousename FROM product \
            JOIN category ON product.categoryID = category.categoryID\
            JOIN warehouse ON product.warehouseID = warehouse.warehouseID\
            WHERE product.productID = " + productid + " AND product.warehouseID = "+  warehouseid  +" ORDER BY productID ASC";
      } else {
        var productselectquery =
        "SELECT product.*, category.categoryname AS categoryname, warehouse.warehousename AS warehousename FROM product \
            JOIN category ON product.categoryID = category.categoryID\
            JOIN warehouse ON product.warehouseID = warehouse.warehouseID\
            WHERE product.warehouseID = "+  warehouseid  +" ORDER BY productID ASC  LIMIT 1 ";
      }
      let productquery = "SELECT product.*, category.categoryname AS categoryname, warehouse.warehousename AS warehousename FROM product \
        JOIN category ON product.categoryID = category.categoryID\
        JOIN warehouse ON product.warehouseID = warehouse.warehouseID\
        WHERE product.warehouseID = "+  warehouseid  +" ORDER BY productID ASC";

      let categoryquery = "SELECT * FROM category WHERE warehouseID = "+  warehouseid +" ORDER BY categoryID ASC";
      // excecuted qurey
      var deliveryquery;
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
        });
          if (product.length > 0) {
        db.query(productselectquery, (err, result) => {
          if (err) {
            res.redirect("/");
          }
          productselect = result
          if (productid === 0){
            deliveryquery = `SELECT * FROM delivery WHERE productID = ${productselect[0].productID} ORDER BY deliverytype ASC `;
          }else{
            deliveryquery = `SELECT * FROM delivery WHERE productID = ${productid} ORDER BY deliverytype ASC `;
          }
          db.query(deliveryquery, (err, result) => {
            if (err) {
              res.redirect("/");
            }
            delivery = result
            res.render('product/product.ejs', {
                productselect,
                product,
                category,
                delivery,
                warehouse : global.warehouse,
            })
          })
      });
    } else {
      db.query(categoryquery, (err, result) => {
        if (err) {
          res.redirect("/");
        }
        category = result; 
        res.render('product/product.ejs', {
          productselect,
          product,
          category : category ,
          delivery,
          warehouse : global.warehouse,
      })
      });
    }
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
        ORDER BY incomingitemsID DESC LIMIT 10 OFFSET " +
      offset +
      ";";
      const allitemquery =
      "SELECT * FROM incomingitems";
      const allproductquery= "SELECT * FROM product ORDER BY productname ASC"
        db.query(allitemquery, (err, result) => {
          if (err) {
            res.redirect("/");
          }
          allitem = result;
          db.query(allproductquery, (err, result) => {
            if (err) {
              res.redirect("/");
            }
            let allproduct = result;
            db.query(itemquery, (err, result) => {
              if (err) {
                res.redirect("/");
              }
              item = result;
              res.render("incomingorder/incomingorder.ejs", {
                item,
                warehouse : global.warehouse,
                pageStart,
                allitem,
                allproduct : JSON.stringify(allproduct),
              });
            });
          });
        });
  },

  getOutgoingorderPage: (req, res) => {
    var pageStart = parseInt(req.query.start);
    var offset = parseInt(req.params.pagestart);
    if (offset !== 0) {
      offset += 9;
    }
    let itemquery = "SELECT outgoingitems.*,product.productname AS productname,\
    warehouse.warehousename AS warehousename, customers.customersname AS customername,\
    outgoingorders.outgoingorderdate AS date, delivery.deliverytype AS deliver\
    FROM outgoingitems\
    JOIN product ON outgoingitems.productID = product.productID\
    JOIN warehouse ON outgoingitems.warehouseID = warehouse.warehouseID\
    JOIN outgoingorders ON outgoingitems.outgoingorderID = outgoingorders.outgoingorderID\
    JOIN customers ON outgoingorders.customersID = customers.customersID\
    JOIN delivery ON outgoingitems.deliveryID = delivery.deliveryID\
    ORDER BY outgoingitemsID DESC LIMIT 10 OFFSET " + offset ;
    // excecuted qurey
    let deliverquery = "SELECT * FROM delivery ORDER BY deliveryID ASC";
    const allitemquery =
      "SELECT * FROM outgoingitems";
    const allproductquery= "SELECT * FROM product ORDER BY productname ASC"
    db.query(allitemquery, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      allitem = result;
      db.query(allproductquery, (err, result) => {
        if (err) {
          res.redirect("/");
        }
        allproduct = result;
        db.query(deliverquery, (err, result) => {
          if (err) {
            res.redirect("/");
          }
          alldelivery = result;
        db.query(itemquery, (err, result) => {
          if (err) {
            res.redirect("/");
          }
          item = result;
          res.render("outgoingorder/outgoingorder.ejs", {
            item,
            warehouse : global.warehouse,
            pageStart,
            allitem,
            allproduct: JSON.stringify(allproduct),
            alldelivery: JSON.stringify(alldelivery),
          });
        });
      });
      });
    });
  },

  getReturnpage :(req,res) =>{
    var error = parseInt(req.query.err);
    var pageStart = parseInt(req.query.start);
    var offset = parseInt(req.params.pagestart);
    if (offset !== 0) {
      offset += 9;
    }
    let itemquery = "SELECT returns.* , customers.customersname AS customername , product.productname AS productname,\
    warehouse.warehousename AS warehousename,  outgoingorders.outgoingorderID AS outgoingorderID FROM returns\
    JOIN outgoingitems ON returns.outgoingitemsID = outgoingitems.outgoingitemsID\
    JOIN product ON outgoingitems.productID = product.productID\
    JOIN outgoingorders ON outgoingitems.outgoingorderID = outgoingorders.outgoingorderID\
    JOIN customers ON outgoingorders.customersID = customers.customersID\
    JOIN warehouse ON returns.warehouseID = warehouse.warehouseID\
    ORDER BY returnID DESC LIMIT 10 OFFSET "+offset +";";
    const allitemquery =
      "SELECT * FROM returns";
    const allproductquery= "SELECT * FROM product ORDER BY productname ASC"
    // excecuted qurey
    db.query(allitemquery, (err, result) => {
      if (err) {
        res.redirect("/");
      }
      allitem = result;
      db.query(allproductquery, (err, result) => {
        if (err) {
          res.redirect("/");
        }
        allproduct = result;
        db.query(itemquery, (err, result) => {
          if (err) {
            res.redirect("/");
          }
          item = result;
          console.log(item)
          res.render("return/return.ejs", {
            item,
            warehouse : global.warehouse,
            pageStart,
            allitem,
            allproduct: JSON.stringify(allproduct),
            error
          });
        });
      });
    });
  }
};
