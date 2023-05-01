module.exports = {
    getHomePage: (req ,res) => {
        let query = "SELECT * FROM warehouse ORDER BY warehouseID ASC";

        // excecuted qurey
        db.query(query, (err, result) => {
            if(err){
                res.redirect('/');
            }

            res.render('index.ejs', {
                warehouse : result
            })
            console.log(result);
        });

    }
}
