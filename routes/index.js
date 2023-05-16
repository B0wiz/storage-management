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
            res.render('product/', {
                warehouse : result
            })
        });

    }
}
