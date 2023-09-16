const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { forgetmail } = require("./MailContorller");
const Member = require("../model/Members");

const createtoken = (id, email, key) => {
  return jwt.sign({ id: id, email: email }, key, { expiresIn: 259200 });
};

const forgetpassword = async(req, res) => {
  const { email } = req.body;

  const user = await Member.findOne({where:{email:email}})


  if (user){
    const token = createtoken(user.id, user.email, user.password);
    
    forgetmail(user.email, user.name, token)
      .then((response) => {
        res.json("Check your email");
        return;
      })
      .catch((error) => {
        res.json({ error });
        return;
      });

  }else{

    return res.json("email not found");
  }
};

const Resetpassword = async (req, res) => {
try{

  const { newpass, cpass, token, email } = req.body.data;
  const newpassword = await bcrypt.hash(newpass, 10);
  const user = await Member.findOne({where:{email:email}})
  if(user){
   const check = jwt.verify(token, user.password)
   
   const update= await Member.update({password:newpassword},{where:{id:check.id}})
    if(update){
      
      return res.status(200).json( "Updated sucessfully" );
    }
    
  }else{
    res.json("Member not found");
    
  }
}catch(error){
  res.json("token invalid");
console.log(error)
}
  
};

module.exports = {
  forgetpassword,
  Resetpassword,
};
