import admin from "../../models/admin/admin-model"
import multer from "../../helpers/Multer"
import bcrypt from "bcrypt"

async function createadmin(req, res, next) {

    const admn = new admin({
      username: req.body.username,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
  
    })
    const saltrounds = 10
    admn.password = await bcrypt.hash(admn.password,saltrounds)
    await admn.save((error, result) => {
      if (error) {
        res.send(error)
      }
      else {
        res.send("Admin saved")
      }
    });
  }

  export default{createadmin}