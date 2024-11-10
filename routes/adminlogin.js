express = require('express');
var router = express.Router();
var upload = require('./multer');
var pool = require('./pool');

/* POST Admin login check */
router.post('/chk_admin_login', function(req, res, next) {
    try {
        // Check login only with emailid and password
        pool.query("select * from admins where emailid=? and password=?", 
        [req.body.emailid, req.body.password], function(error, result) {
            if (error) {
                console.log(error);
                res.status(200).json({ message: 'Database error, please contact backend team: ' + error, status: false });
            } else {
                console.log("Length", result.length);
                if (result.length == 1) {
                    console.log('valid');
                    res.status(200).json({ message: 'Success', status: true });
                } else {
                    console.log('invalid');
                    res.status(200).json({ message: 'Invalid Email/Password', status: false });
                }
            }
        });
    } catch (e) {
        res.status(200).json({ message: 'Severe error on server, please contact backend team', status: false });
    }
});

module.exports = router;
