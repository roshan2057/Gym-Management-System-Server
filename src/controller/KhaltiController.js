const axios = require("axios");
const Bill = require("../model/Bill");
const Package = require("../model/Package");

const khalti1 = async (req) => {
  let data = {
    token: req.token,
    amount: req.amount,
  };

  let config = {
    headers: { Authorization: process.env.khaltisecretkey },
  };

  try {
    const response = await axios.post(
      "https://khalti.com/api/v2/payment/verify/",
      data,
      config
    );

    if (response.data.state.name === "Completed") {
      console.log("done");

      // Update the Bill status to "Success"
      const update = await Bill.update(
        { status: "Success" },
        { where: { bid: req.id } }
      );

      return "success";

      console.log(update);
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
};

const Khalticontroller = async (req, res) => {
  try {
    const today = new Date();
    const renew_date = today.toISOString().split("T")[0];

    const data = {
      user_id: req.data.id,
      amount: req.body.amount,
      // token: req.body.token,
      package_id: req.body.product_identity,
      renew_date: renew_date,
      medium: "e-payment(Khalti)",
      status: "Pending",
    };

    var date = today;

    const getlastdate = await Bill.findOne({
      where: { user_id: req.data.id },
      order: [["createdAt", "DESC"]], // Order by 'expire_date' column in descending order
      attributes: ["expire_date"],
    });
    const expdate = new Date(getlastdate.expire_date);
    if (expdate < today) {
      date = today;
    } else date = expdate;

    const getmonth = await Package.findByPk(req.body.product_identity);

    date.setUTCMonth(date.getUTCMonth() + getmonth.num_months);
    const expiredate = date.toISOString().split("T")[0];

    data.expire_date = expiredate;

    //data insert

    const insert = await Bill.create(data);
    if (insert) {
      res.json({ data: "Success" });
    }

    let config = {
      token: req.body.token,
      amount: req.body.amount,
      id: insert.bid,
    };

    const chekc = await khalti1(config);

    res.json({ data: chekc });
  } catch {
    return console.log("error");
  }
};

module.exports = Khalticontroller;
