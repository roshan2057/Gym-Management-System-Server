const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../model/Admin.js");
const Member = require("../model/Members.js");
const Bill = require("../model/Bill.js");
const Package = require("../model/Package.js");
const Bmi = require("../model/Bmi.js");
const { default: axios } = require("axios");

const createtoken = (id) => {
  return jwt.sign({ id }, process.env.admin_key, { expiresIn: 259200 });
};

const LoginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const check = await Admin.findOne({ where: { username: username } });
    if (check) {
      // const ismatched = await bcrypt.compare(password, user.password);
      if (password == check.password) {
        const token = createtoken(check.username);
        res.status(200).json({ token: token, id: check.id, user: "admin" });
      } else {
        res.status(200).json({ data: "Password incorrent" });
      }
    } else {
      res.status(404).json({ data: "user not exits" });
    }
  } catch (error) {
    console.log(error);
  }
};

const Dashboard = async (req, res) => {
  try {
    const memb = await Member.count();
    const total = await Bill.count();
    const khalti = await Bill.count({ where: { medium: "e-payment(Khalti)" } });
    const cash = await Bill.count({ where: { medium: "Cash" } });

    res
      .status(200)
      .json({ member: memb, khalti: khalti, cash: cash, total: total });
  } catch (error) {
    console.log(error);
  }
};

const Viewpackage = async (req, res) => {
  try {
    const package = await Package.findAll();
    res.status(200).json({ package: package });
  } catch (error) {
    console.log(error);
  }
};

const Addpackage = async (req, res) => {
  try {
    const insert = await Package.create(req.body);
    if (insert) {
      res.status(200).json({ data: "added", id: insert.id });
    } else {
      res.status(200).json({ data: "cannot add" });
    }
  } catch (error) {
    console.log(error);
  }
};

const Updatepackage = async (req, res) => {
  try {
    const update = await Package.update(req.body.data, {
      where: { pac_id: req.params.id },
    });
    if (update) {
      res.status(200).json({ data: "updated" });
    }
  } catch (error) {
    console.log(error);
  }
};

const Deletepackage = async (req, res) => {
  try {
    const remove = await Package.destroy({ where: { pac_id: req.params.id } });
    if (remove) {
      res.status(200).json({ data: "deleted" });
    } else {
      res.status(200).json({ data: "Not deleted" });
    }
  } catch (error) {
    console.log(error);
  }
};

const Viewmembers = async (req, res) => {
  try {
    const data = await Member.findAll();
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
  }
};

const Deletemember = async (req, res) => {
  try {
    const check = await Bill.count({ where: { user_id: req.params.id } });
    if (check == 0) {
      const removebmi = await Bmi.destroy({
        where: { user_id: req.params.id },
      });
      const remove = await Member.destroy({ where: { id: req.params.id } });
      if (remove || removebmi) {
        res.status(200).json({ data: "member deleted" });
      } else {
        res.status(200).json({ data: "Already Deleted" });
      }
    } else {
      res
        .status(200)
        .json({ data: "Cannot delete because this member has bills" });
    }
  } catch (error) {
    console.log(error);
  }
};

const Codlist = async (req, res) => {
  try {
    const success = await Bill.findAll({
      where: { medium: "Cash" },
      order: [["createdAt", "DESC"]],
      include: [
        { model: Package, attributes: ["name"] },
        { model: Member, attributes: ["name"] },
      ],
    });
    res.status(200).json({ success });
  } catch (error) {
    console.log(error);
  }
};

// const Onlinelist = (req, res) => {
//     try {
//         Onlinelistdb((success, error) => {
//             if (error) return console.log(error);
//             res.status(200).json({ success });
//         })
//     }
//     catch (error) {
//         return console.log(error)
//     }
// }

const Onlinelist = async (req, res) => {
  try {
    const response = await axios.get(
      `https://khalti.com/api/v2/merchant-transaction/?page=${req.params.id}`,
      {
        headers: {
          Authorization: process.env.khaltisecretkey,
        },
      }
    );

    const { total_pages, total_records, records, total_amount } = response.data;
    const data = {
      total_pages,
      total_records,
      total_amount,
      records,
    };
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

const UserStatement = async (req, res) => {
  try {
    const data = await Bill.findAll({
      where: { user_id: req.params.id },
      order: [["createdAt", "DESC"]],
      include: { model: Package, attributes: ["name"] },
    });
    res.status(200).json({ data });
  } catch (e) {
    console.log(e);
  }
};

const Acceptcod = async (req, res) => {
  try {
    const update = await Bill.update(
      { status: "Success" },
      { where: { bid: req.params.id } }
    );

    res.status(200).json({ update });
  } catch (error) {
    console.log(error);
  }
};

const Declinecod = async (req, res) => {
  try {
    const remove = await Bill.destroy({ where: { bid: req.params.id } });
    res.status(200).json({ success });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  LoginController,
  Dashboard,
  Addpackage,
  Updatepackage,
  Deletepackage,
  Viewmembers,
  Deletemember,
  Viewpackage,
  Codlist,
  Onlinelist,
  UserStatement,
  Acceptcod,
  Declinecod,
};
