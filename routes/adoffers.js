var express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');

router.post("/adoffers_submit", upload.any(), function (req, res) {
    console.log("Request Body:", req.body);  
    console.log("Uploaded Files:", req.files); 

    // Handle filenames correctly
    var filenames = req.files.map((file) => file.filename).join(',');

    // Pool query with correct syntax
    pool.query(
        "INSERT INTO ADOFFERS (categoryid, subcategoryid, brandid, productid, productdetailid, filenames) VALUES (?,?,?,?,?,?)",
        [req.body.categoryid, req.body.subcategoryid, req.body.brandid, req.body.productid, req.body.productdetailid, filenames],
        function (error, result) {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Database Error. Please contact the backend team.",
                    status: false,
                });
            } else {
                return res.status(200).json({
                    message: "Adoffers Submitted Successfully",
                    status: true,
                });
            }
        }
    );
});

module.exports = router;
