const job = require("node-cron");
const { expiremail } = require("./MailContorller");
const Bill = require("../model/Bill");
const Member = require("../model/Members");
const { Sequelize } = require("sequelize");

const cronJob1 = () => {
  // job.schedule('0 0 * * *', async() => {
  job.schedule("* * * * *", async () => {
    console.log("hello");
    var date = new Date();
    const success = await Bill.findAll([]);

    const newsuccess = success.reduce((acc, current) => {
      if (!acc[current.user_id]) {
        acc[current.user_id] = current;
      }
      return acc;
    }, {});

    // Convert the uniqueData object back to an array
    const bill = Object.values(newsuccess);

    const data = await Member.findAll();
    const uniqueData = data.reduce((acc, current) => {
      if (!acc[current.id]) {
        acc[current.id] = current;
      }
      return acc;
    }, {});

    // Convert the uniqueData object back to an array
    const filterdata = Object.values(uniqueData);

    const currentDate = new Date();
    bill.forEach(async (item) => {
      const expDate = new Date(item.expire_date);
      if (expDate < currentDate) {
        const result = filterdata.find((data) => data.id === item.user_id);
        // return console.log(result.email);
        const email = await expiremail(result.email);
        console.log(email);
      }
    });

    console.log("Messsage Sent at:", new Date());
  });
};

const cronJob = () => {
  job.schedule("* * * * *", async () => {
    console.log("hello");
try{

  const data = await Bill.findAll({
    attributes: [["user_id"]],
    where: {
      expire_date: {
        [Sequelize.Op.lt]: new Date(),
      },
    },
  });
  
  console.log(data);
}catch(error){
  console.log(error)
}
});
};

module.exports = cronJob;
