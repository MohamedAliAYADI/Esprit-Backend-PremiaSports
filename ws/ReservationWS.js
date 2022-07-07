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
//get all Reservation 
router.get("/showAll", (req, res) => {
    pool.query("SELECT * FROM reservation", (err, reservation_rows, fields) => {
        res.status(200)
        res.json(reservation_rows)
    })
})

//GET 
//get Reservation by ID
router.get("/showById/:IdReservation", (req, res) => {
    pool.query("SELECT * FROM reservation WHERE idReservation = ?", [req.params.IdReservation], (err, reservation_rows, fields) => {
        res.status(200)
        res.json(reservation_rows)
    })
})



//--------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------

//POST
//Create Reservation
router.post("/add", (req, res) => {

    pool.query("INSERT INTO reservation ( `DateReservation`, `nombredeParticipant`, `prix`, `promotion`) VALUES (?, ?, ?, ?)", [

        req.body.DateReservation,
        req.body.nombredeParticipant,
        req.body.prix,
        req.body.promotion,


    ], (err, rows, fields) => {
        console.log(err);
        res.status(200);
        res.json(rows);
    })
})

//Update reservation
router.put("/update/:id", (req, res) => {

    pool.query("UPDATE `reservation` SET `DateReservation`= ?,`nombredeParticipant`= ?,`prix`= ? WHERE `idReservation`= ?", [


        req.body.DateReservation,
        req.body.nombredeParticipant,
        req.body.prix,
        req.params.id,



    ], (err, rows, fields) => {
        console.log(err);
        res.status(200);
        res.json(rows);
    })
})

//Delete reservation
router.delete("/delete/:id", (req, res) => {

    pool.query("DELETE FROM `reservation` WHERE idReservation=?", [
        req.params.id
    ], (err, rows, fields) => {
        console.log(err);
        res.status(200);
        res.json(rows);
    })
})





module.exports = router;