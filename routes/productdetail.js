var express = require("express");
var router = express.Router();
var upload = require("./multer");
var pool = require("./pool");

router.post(
  "/productdetail_submit",upload.single("picture"),function (req, res) {
    try {
      pool.query(
        "INSERT INTO productdetails (categoryid, subcategoryid, brandid, productid, productdetailname, weight, weighttype, packagingtype, noofqty, stock, price, offerprice, offertype, productstatus, productdetaildescription, picture, created_at, updated_at, adminid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          req.body.categoryid,
          req.body.subcategoryid,
          req.body.brandid,
          req.body.productid,
          req.body.productdetailname,
          req.body.weight,
          req.body.weighttype,
          req.body.packagingtype,
          req.body.noofqty,
          req.body.stock,
          req.body.price,
          req.body.offerprice,
          req.body.offertype,
          req.body.productstatus,
          req.body.productdetaildescription,
          req.file.filename,
          req.body.created_at,
          req.body.updated_at,
          req.body.adminid,
        ],
        function (error, result) {
          if (error) {
            console.log("Database Error: ", error);
            return res.status(500).json({
              message: "Database Error. Please contact the backend team.",
              status: false,
            });
          }
          return res.status(201).json({
            message: "Product Detail Submitted Successfully",
            status: true,
          });
        }
      );
    } catch (e) {
      console.error("Server Error: ", e);
      return res.status(500).json({
        message: "Severe error on server. Please contact the backend team.",
        status: false,
      });
    }
  }
);

router.post("/edit_productdetail_data", function (req, res) {
  try {
    pool.query(
      "UPDATE productdetail SET categoryid=?, subcategoryid=?, brandid=?, productid=?, productdetailname=?, weight=?, weighttype=?, packagingtype=?, noofqty=?, stock=?, price=?, offerprice=?, offertype=?, productstatus=?, productdetaildescription=?, updated_at=?, adminid=? WHERE productdetailid=?",
      [
        req.body.categoryid,
        req.body.subcategoryid,
        req.body.brandid,
        req.body.productid,
        req.body.productdetailname,
        req.body.weight,
        req.body.weighttype,
        req.body.packagingtype,
        req.body.noofqty,
        req.body.stock,
        req.body.price,
        req.body.offerprice,
        req.body.offertype,
        req.body.productstatus,
        req.body.productdetaildescription,
        req.body.updated_at,
        req.body.adminid,
        req.body.productdetailid,
      ],
      function (error, result) {
        if (error) {
          console.error("Database Error: ", error);
          return res.status(500).json({
            message: "Database Error. Please contact the backend team.",
            status: false,
          });
        }
        return res.status(200).json({
          message: "Product Detail Updated Successfully",
          status: true,
        });
      }
    );
  } catch (e) {
    console.error("Server Error: ", e);
    return res.status(500).json({
      message: "Severe error on server. Please contact the backend team.",
      status: false,
    });
  }
});

router.post(
  "/edit_productdetail_picture",
  upload.single("picture"),
  function (req, res) {
    try {
      pool.query(
        "UPDATE productdetail SET picture=?, updated_at=?, adminid=? WHERE productdetailid=?",
        [
          req.file.filename,
          req.body.updated_at,
          req.body.adminid,
          req.body.productdetailid,
        ],
        function (error, result) {
          if (error) {
            console.error("Database Error: ", error);
            return res.status(500).json({
              message: "Database Error. Please contact the backend team.",
              status: false,
            });
          }
          return res.status(200).json({
            message: "Product Picture Updated Successfully",
            status: true,
          });
        }
      );
    } catch (e) {
      console.error("Server Error: ", e);
      return res.status(500).json({
        message: "Severe error on server. Please contact the backend team.",
        status: false,
      });
    }
  }
);

router.post("/delete_productdetail", function (req, res) {
  try {
    pool.query(
      "DELETE FROM productdetail WHERE productid=?",
      [req.body.productid],
      function (error, result) {
        if (error) {
          console.error("Database Error: ", error);
          return res.status(500).json({
            message: "Database Error. Please contact the backend team.",
            status: false,
          });
        }
        return res.status(200).json({
          message: "Product Detail Deleted Successfully",
          status: true,
        });
      }
    );
  } catch (e) {
    console.error("Server Error: ", e);
    return res.status(500).json({
      message: "Severe error on server. Please contact the backend team.",
      status: false,
    });
  }
});

router.get("/display_all_productdetail", function (req, res) {
  try {
    pool.query(
      `SELECT P.*,
              (SELECT C.categoryname FROM category C WHERE C.categoryid=P.categoryid) AS categoryname,
              (SELECT SC.subcategoryname FROM subcategory SC WHERE SC.subcategoryid=P.subcategoryid) AS subcategoryname,
              (SELECT B.brandname FROM brand B WHERE B.brandid=P.brandid) AS brandname,
              (SELECT Pr.productname FROM product Pr WHERE Pr.productid=P.productid) AS productname  
       FROM productdetails P`,
      function (error, result) {
        if (error) {
          res.status(200).json({
            message: "Database Error. Please contact the backend team.",
            status: false,
          });
        } else {
          res.status(200).json({
            message: "Successfully Retrieved Product Details",
            data: result,
            status: true,
          });
        }
      }
    );
  } catch (e) {
    console.error("Server Error: ", e);
    return res.status(500).json({
      message: "Severe error on server. Please contact the backend team.",
      status: false,
    });
  }
});
router.post('/get_all_product_by_productid',function(req,res){
  try{
    pool.query(
      "select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=P.subcategoryid) as subcategoryname,(select B.brandname from brand B where B.brandid=P.brandid) as brandname,(select Pr.productname from product Pr where Pr.productid=P.productid) as productname  from productdetail P",
function(error,result){
      if(error)
      {  console.log(error)
          res.status(200).json({message:'Database Error Pls contact with backend team...!',status:false})
      }
      else{
          res.status(200).json({message:'Succesfully',data:result,status:true})
      }
    })

  }
  catch(e)
  {
      res.status(200).json({message:'Severe error on server pls contact with backend team',status:false})
 
  }
})
router.post("/get_all_productdetail_by_productid", function (req, res) {
  try {
    pool.query(
      "select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname,(select SC.subcategoryname from subcategory SC where SC.subcategoryid=P.subcategoryid) as subcategoryname,(select B.brandname from brand B where B.brandid=P.brandid) as brandname,(select Pr.productname from product Pr where Pr.productid=P.productid) as productname  from productdetails P where P.productid=?",[req.body.productid],
      function (error, result) {
        if (error) {
          res.status(200).json({
            message: "Database Error Pls contact with backend team...!",
            status: false,
          });
        } else {
          res
            .status(200)
            .json({ message: "Succesfully", data: result, status: true });
        }
      }
    );
  } catch (e) {
    res.status(200).json({
      message: "Severe error on server pls contact with backend team",
      status: false,
    });
  }
});




module.exports = router;
