var express = require('express');
var router = express.Router();
var pool = require('./pool');
router.post('/user_display_all_category', function (req, res, next) {
  try {
    if (req.body.status == "all")
      q = "select * from category"
    else if (req.body.status == "limit")
      q = "select * from category limit 8"

    pool.query(q, function (error, result) {
      if (error) {
        console.log(error)
        res.status(500).json({ message: 'Database Error Pls contact with backend team...', status: false })
      }
      else {
        res.status(200).json({ message: 'Success', data: result, status: true })
      }
    })
  }
  catch (e) {
    res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
  }
});

router.post('/user_get_all_subcategory_by_categoryid', function (req, res, next) {
  try {
    pool.query("select SC.*,(select C.categoryname from category C where C.categoryid=SC.categoryid) as categoryname from subcategory SC where SC.categoryid=?", [req.body.categoryid], function (error, result) {
      if (error) {
        console.log(error)
        res.status(500).json({ message: 'Database Error Pls contact with backend team...', status: false })
      } else {
        res.status(200).json({ message: 'Success', data: result, status: true })
      }
    });
  } catch (e) {
    res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
  }
});
router.get('/show_all_banner', function (req, res, next) {
  try {

    pool.query("select * from mainbanner where status='show'", function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
      }
      else {
        res.status(200).json({ message: 'Success', data: result, status: true })
      }

    })

  }
  catch (e) {

    res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
  }
});


router.get('/show_all_bankoffer', function (req, res, next) {
  try {

    pool.query("select * from bankandotheroffer where status='show'", function (error, result) {
      if (error) {
        console.log(error)
        res.status(200).json({ message: 'Database Error Pls contact with backend team...', status: false })
      }
      else {
        res.status(200).json({ message: 'Success', data: result, status: true })
      }

    })

  }
  catch (e) {

    res.status(200).json({ message: 'Severe error on server pls contact with backend team', status: false })
  }
});


module.exports = router;
