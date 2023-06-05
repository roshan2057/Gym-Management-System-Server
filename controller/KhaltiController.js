const axios = require('axios');
const { Getnoofmonths, Khlatiinsertdb,Getexpdate, Updatestatusdb } = require('../model/Membersdb');


const khalti1 = (req, res) => {
  let data = {
    "token": req.token,
    "amount": req.amount
  };

  let config = {
    headers: { 'Authorization': process.env.khaltisecretkey }
  };

  axios.post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then(response => {
      // console.log(response.data);
      if(response.data.state.name === "Completed"){
        console.log("done");
Updatestatusdb(req.bid,(success,error)=>{
  if(error) throw error;
  console.log(success);
})


      }
      else {
        console.log("error");
      }



    })
    .catch(error => {
      console.log(error);
    });

}



const Khalticontroller = async(req, res) => {
  // console.log(req.body);
  // const amount = req.body.amount;
  // const token = req.body.token;
  // const pacid = req.body.product_name;
  // const renew_date = new Date();
  // const medium = "online";
  // const status = "pending";
  const today = new Date();
  const renew_date = today.toISOString().split('T')[0];

  const data = {
    uid: req.data.id,
    amount: req.body.amount,
    token: req.body.token,
    packid: req.body.product_name,
    today: new Date(),
    renew_date: renew_date,

    medium: "online",

  }

  var date = new Date();

 Getexpdate(data.uid,(success,error)=>{
  if(error)throw error;
if(success !== "false"){
  const expdate = new Date(success[0].expire_date);
  if (expdate< date){
    date= new Date();
  }
  else(
    date = expdate    
  )
}else{
  date= new Date();

}
  
  Getnoofmonths(data, (success, error) => {
    if (error) throw error;
    const pacmonth = success[0].num_months;


    date.setUTCMonth(date.getUTCMonth() + pacmonth);
    const expiredate = date.toISOString().split('T')[0];
    
    Khlatiinsertdb(data, expiredate, (success, error) => {
      if (error) throw error;

let config = {
  "token": data.token,
  "amount": data.amount,
  "bid":success.insertId,  
}

console.log(config);


//khalti server verification

    // khalti1(config); 

    })

  

    res.json({ data: data});
  })
  
 })


}



module.exports = Khalticontroller