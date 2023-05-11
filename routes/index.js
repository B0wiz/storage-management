module.exports = {
    getHomePage: (req ,res) => {
        let query = "SELECT * FROM warehouse ORDER BY warehouseID ASC";

        // excecuted qurey
        db.query(query, (err, result) => {
            if(err){
                res.redirect('/');
            }
            var warehouse = result
            res.render('warehouse/warehouse.ejs', {
                warehouse
            })
        });

    }
}
