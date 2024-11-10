var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');

router.post("/bankoffers_submit", upload.any(), function (req, res) {
    console.log("Request Body:", req.body);  
    console.log("Uploaded Files:", req.files);  

    var filenames = req.files.map((file) => file.filename); // Extract filenames from uploaded files

    try {
        pool.query(
            "INSERT INTO bankoffers ( status, filenams) VALUES (?, ?)", 
            [req.body.status, filenames.join(",")],  // Join filenames with comma
            function (error, result) {
                if (error) {
                    console.error("Database Query Error:", error);  // Improved error logging
                    return res.status(500).json({
                        message: "Database Error! Please contact the backend team.",
                        status: false,
                    });
                } else {
                    console.log("Database Insert Successful");
                    return res.status(200).json({
                        message: "Bank Offers Submitted Successfully",
                        status: true,
                    });
                }
            }
        );
    } catch (e) {
        console.error("Catch Block Error:", e);  // Improved catch block error logging
        return res.status(500).json({
            message: "Severe error on server! Please contact the backend team.",
            status: false,
        });
    }
});

module.exports = router;
