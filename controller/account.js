const { userAccount } = require("../gateway/databaseGateway");
const authUtil = require("../utils/authUtil");
const hashPassword = require("../utils/hashPassword");


module.exports = {
  getAllUser: async (req, res) => {
    try {
      const data = await userAccount.findAll();

      console.log(data);
      if(data.length > 0){
        const user= data[0].dataValues;

        console.log(user);
        delete user.password
        
        res.status(200).json(data);
      } else{
        res.status(400).json("There are no records for users");
      }
      
    } catch (err) {
      res.status(400).json(err);
    }
  },
  getUser: async(req, res, params) => {
    try{
      const id = req.params.id;
      const rs = await userAccount.findOne({
        where : {
          id: id
        }
      })

      console.log(rs);

      const arr = Object.keys(rs).length;

      console.log(arr);

      if(arr > 0){
        const data = rs.dataValues;
        console.log(data);

        delete data.password;

        res.status(200).json(data);


      } else{
        res.status(400).send('User not found');
      }

    }catch(err) {
      throw err
    }
  },
  register: async (req, res) => {
    try {
      await userAccount.create({
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password,
      });

      const user = await userAccount.findOne({
        where:{
          email:req.body.email
        }
      });
      console.log(user);

      const arr = Object.keys(user).length;

      console.log(arr);

      if(arr > 0) {
        res.status(200).json({msg:"user registered successfully", user})
      } 
      
    } catch (err) {
      throw err;
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log(req.body.password);

      const resData = await userAccount.findAll({
        where: {
          email: email,
        },
      });

      console.log(resData);

      const arr = Object.keys(resData).length;

      console.log(arr);
      

      //validate password
      if(arr > 0) {
        const password = req.body.password;
        console.log(password);
        const hashedPass = resData[0].dataValues.password;
        console.log(hashedPass);
        const data =  hashPassword.validatePassword(password, hashedPass);
        console.log(data);

        if(data == true) {
          const token = authUtil.generateToken(email);
          
          const user = resData[0].dataValues;

          console.log(token);
          console.log(user);

          delete user.password;

          res.status(200).json({ msg: "login successful", token: token, user });
        } else {
          res.status(401).send("Invalid Password, please enter valid password");
        }
      } else {
        res.status(400).send("User not found");
      }
    } catch (err) {
      throw err;
    }
  },
};
