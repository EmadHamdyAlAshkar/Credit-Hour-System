import request from "../../models/request/request-model";
async function createrequest(req, res, next) {
    // let stu = await student.findById({ _id: req.body.id })
    // if (stu) {
    //   return res.json({ message: "Student already exists" })
    // }
    const requs = new request({
        studentcode: req.body.studentcode,
        requestedcourses: req.body.requestedcourses,
        status: req.body.status,
  
    })
    
    await requs.save((error, result) => {
      if (error) {
        res.send(error)
      }
      else {
        res.json({ status: "true", message: "request saved" })
  
      }
    });
  }


  export default{
    createrequest

  }