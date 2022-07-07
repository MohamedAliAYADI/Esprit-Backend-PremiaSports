const express = require('express')
const mysql = require('mysql')
var uuidv4 = require('uuid/v4')



const router = express.Router()

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    database: "premia_sports"
})

function getConnection() {
    return pool
}



//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------


//GET
//get all promotion 
router.get("/showAll", (req, res) => {
    pool.query("SELECT * FROM promotion", (err, promotion_rows, fields) => {
        res.status(200)
        res.json(promotion_rows)
    })
})

//GET 
//get promotion by ID
router.get("/showById/:id_promotion", (req, res) => {
    pool.query("SELECT * FROM promotion WHERE id_promotion = ?", [req.params.id_promotion], (err, promotion_rows, fields) => {
        res.status(200)
        res.json(promotion_rows)
    })
})



//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

//POST
//Create promotion
router.post("/add", (req, res) => {

    pool.query("INSERT INTO promotion ( `type_promotion`, `promo`) VALUES (?, ?)", [

        req.body.type_promotion,
        req.body.promo,



    ], (err, rows, fields) => {
        console.log(err);
        res.status(200);
        res.json(rows);
    })
})

//Update promotion
router.put("/update/:id", (req, res) => {

    pool.query("UPDATE `promotion` SET `type_promotion`= ?,`promo`= ? WHERE `id_promotion`= ?", [

        req.body.type_promotion,
        req.body.promo,
        req.params.id



    ], (err, rows, fields) => {
        console.log(err);
        res.status(200);
        res.json(rows);
    })
})

//Delete promotion
router.delete("/delete/:id", (req, res) => {

    pool.query("Delete from promotion where id_promotion =?", [

        req.params.id



    ], (err, rows, fields) => {
        console.log(err);
        res.status(200);
        res.json(rows);
    })
})





module.exports = router;