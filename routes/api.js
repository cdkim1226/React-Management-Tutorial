let express = require("express");
let router = express.Router();

let db = require("../config/db_config");

router.get("/customers", function (req, res) {
  let sql = `select * from customer`;
  try {
    db.query(sql, (error, result) => {
      if (error) console.error(error);
      console.log(result);
      res.send(result);
    });
  } catch (error) {
    if (error) console.error(error);
  }
});

router.get("/test", function(req, res) {
    let obj = {
        user: "secho",
        place: "cafe",
    }
    res.render("../views/test.ejs",{ejsObj : obj});
})
module.exports = router;
