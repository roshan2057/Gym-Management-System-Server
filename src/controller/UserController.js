const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { welcomemail } = require("./MailContorller");
const Member = require("../model/Members");
const Bmi = require("../model/Bmi");
const Bill = require("../model/Bill");
const Package = require("../model/Package");

const createtoken = (id) => {
  return jwt.sign({ id }, process.env.private_key, { expiresIn: 259200 });
};

const RegisterController = async (req, res) => {
  try {
    var { name, email, password, gender, address, phone, height, weight, bmi } =
      req.body.data;
    password = await bcrypt.hash(password, 10);

    const member_data = { name, email, password, phone, address, gender };
    const member_insert = await Member.create(member_data);
    const user_id = member_insert.id;

    const bmi_data = { user_id, height, weight, bmi };
    await Bmi.create(bmi_data);

    const send_mail = await welcomemail(email);

    res.status(200).json({
      data: "Data Inserted Successfully",
      id: user_id,
      email: send_mail,
    });
  } catch (error) {
    console.log(error);
  }
};

const LoginController = async (req, res) => {
  try {
    var { phone, password } = req.body;

    const user = await Member.findOne({
      where: {
        phone: phone,
      },
      attributes: ["id", "password"],
    });
    if (user) {
      const ismatched = await bcrypt.compare(password, user.password);
      if (ismatched) {
        const token = createtoken(user.id);
        res.status(200).json({ token: token, id: user.id, user: "user" });
      } else {
        res.status(404).json({ data: "Password incorrect" });
      }
    } else {
      res.status(404).json({ data: "User not Found!!" });
    }
  } catch (error) {
    console.log(error);
  }
};

const ChangepwdController = async (req, res) => {
  try {
    const { password, newpassword } = req.body;
    const get_password = await Member.findByPk(req.data.id, {
      attributes: ["password"],
    });

    if (get_password) {
      const ismatched = await bcrypt.compare(password, get_password.password);

      if (ismatched) {
        const hash = await bcrypt.hash(newpassword, 10);
        const update = await Member.update(
          { password: hash },
          { where: { id: req.data.id } }
        );
        res.status(200).json({ data: "Updated sucessfully" });
      } else {
        res.status(200).json({ data: "Password incorrect" });
      }
    } else {
      res.status(404).json({ data: "User not Found!!" });
    }
  } catch (error) {
    console.log(error);
  }
};

const Bmicontroller = async (req, res) => {
  try {
    const bmi_data = await Bmi.findOne({
      where: {
        user_id: req.data.id,
      },
    });

    res.json(bmi_data);
  } catch (error) {
    console.log(error);
  }
};

const FeeController = async (req, res) => {
  try {
    const package = await Package.findAll({
      where: {
        status: 1,
      },
    });

    const bill = await Bill.findOne({
      where: {
        user_id: req.data.id,
      },
      order: [["createdAt", "DESC"]],
      include: [
        { model: Member, attributes: ["name", "phone"] },
        { model: Package, attributes: ["name", "price"] },
      ],
      attributes: ["status", "renew_date", "expire_date"],
    });

    if (bill) {
      const build_data = {
        status: bill.status,
        renew_date: bill.renew_date,
        expire_date: bill.expire_date,
        member_name: bill.member.name,
        member_phone: bill.member.phone,
        package_name: bill.package.name,
        package_price: bill.package.price,
      };
      res.json({ bill: build_data, package: package });
    } else {
      res.json({ bill: "no data", package: package });
    }
  } catch (error) {
    console.log(error);
  }
};

const Profilecontroller = async (req, res) => {
  try {
    const profile = await Bmi.findOne({
      where: { user_id: 6 },
      include: [
        { model: Member, attributes: ["name", "phone", "email", "address"] },
      ],
    });

    const build_data = {
      height: profile.height,
      weight: profile.weight,
      member_name: profile.member.name,
      member_phone: profile.member.phone,
      member_email: profile.member.email,
      member_address: profile.member.address,
    };

    res.status(200).json({ data: build_data });
  } catch (error) {
    console.log(error);
  }
};

const Updatebmicontroller = async (req, res) => {
  try {
    const update = await Bmi.update(req.body, {
      where: { user_id: req.data.id },
    });
    if (update > 0) {
      res.status(200).json({ data: "update successfully" });
    } else {
      res.status(200).json({ data: "cant update" });
    }
  } catch (error) {
    console.log("error in updating bmi" + error);
  }
};

const Statementcontroller = async (req, res) => {
  try {
    const statemnet = await Bill.findAll({
      where: { user_id: req.data.id },
      include: [{ model: Package, attributes: ["name"] }],
      attributes: ["renew_date", "medium", "amount", "status"],
    });
    if (statemnet) {
      res.status(200).json({ statement: statemnet });
    } else {
      res.status(200).json({ statement: [] });
    }
  } catch (error) {
    console.log(error);
  }
};

const Updateprofile = async (req, res) => {
  try {
    const update = await Member.update(req.body, {
      where: {
        id: req.data.id,
      },
    });
    if (update > 0) {
      res.status(200).json({ data: update });
    } else {
      res.status(200).json({ data: "not updated" });
    }
  } catch (error) {
    console.log("errror" + error);
  }
};

const Viewpackagecontroller = async (req, res) => {
  try {
    const package = await Package.findAll({
      where: {
        status: 1,
      },
    });
    res.status(200).json({ package: package });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  RegisterController,
  LoginController,
  Bmicontroller,
  Updatebmicontroller,
  FeeController,
  Profilecontroller,
  Updateprofile,
  Statementcontroller,
  ChangepwdController,
  Viewpackagecontroller,
};
