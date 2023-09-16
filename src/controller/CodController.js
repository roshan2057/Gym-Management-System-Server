const Bill = require("../model/Bill");
const Package = require("../model/Package");

const Codcontroller = async (req, res) => {
  const today = new Date();
  const renew_date = today.toISOString().split("T")[0];

  const data = {
    user_id: req.data.id,
    package_id: req.body.packid,
    renew_date: renew_date,
    medium: "Cash",
    status: "Pending",
  };

  var date = new Date();

  const getlastdate = await Bill.findOne({
    where: { user_id: req.data.id },
    order: [["createdAt", "DESC"]], // Order by 'expire_date' column in descending order
    attributes: ["expire_date"],
  });
  const expdate = new Date(getlastdate.expire_date);
  if (expdate < today) {
    date = today;
  } else date = expdate;

  const getmonth = await Package.findByPk(req.body.packid);

  date.setUTCMonth(date.getUTCMonth() + getmonth.num_months);
  const expiredate = date.toISOString().split("T")[0];

  data.expire_date = expiredate;

  data.amount = getmonth.price;

  const insert = await Bill.create(data);
  if (insert) {
    res.json({ data: "Success" });
  }
};

module.exports = {
  Codcontroller,
};
