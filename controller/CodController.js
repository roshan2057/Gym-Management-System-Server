const { Getexpdate, Codinsertdb, Getnoofmonths } = require("../model/Membersdb");

const Codcontroller = (req, res) => {
  const today = new Date();
  const renew_date = today.toISOString().split('T')[0];

  const data = {
    uid: req.data.id,
    token: req.body.token,
    packid: req.body.packid,
    today: new Date(),
    renew_date: renew_date,
    medium: "COD",
  }
  var date = new Date();

  Getexpdate(data.uid, (success, error) => {
    if (error) throw error;
    if (success !== "false") {
      const expdate = new Date(success[0].expire_date);
      if (expdate < date) {
        date = new Date();
      }
      else (
        date = expdate
      )
    } else {
      date = new Date();

    }

    Getnoofmonths(data, (success, error) => {
      if (error) throw error;
      const pacmonth = success[0].num_months;
      data.amount = success[0].price;

      date.setUTCMonth(date.getUTCMonth() + pacmonth);
      const expiredate = date.toISOString().split('T')[0];

      Codinsertdb(data, expiredate, (success, error) => {
        if (error) throw error;
      })

      res.json({ data: data });
    })

  })

}

module.exports = {
  Codcontroller
}