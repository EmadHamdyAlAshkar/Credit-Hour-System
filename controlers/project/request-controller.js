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
  // .select("_id  -finishedcourses -currentcourses")

  async function getallrequests(req, res, next) {
    let studid = req.body.studid
    let reques = await request.find({studentcode : studid})
    const requests = await request.find().populate('studentcode','_id name -finishedcourses -currentcourses').populate('requestedcourses','_id name -prerequisites')
    if(!studid){
      return await res.json({data:requests})

    }
    if (reques.length==0) {
      return await res.json({message:"No requests founded"})
    }
    res.json({data:reques})
  }

  async function getrequestbystudentid(req, res) {
    let obj = {}
    if ("name" in req.body) {
      obj.name = { $regex: req.body.name }
    }
    if ("gender" in req.body) {
      obj.gender = req.body.gender
    }
    const requests = await request.find().populate('studentcode','_id name -finishedcourses -currentcourses').populate('requestedcourses','_id name -prerequisites')
    res.json({data:requests})
  
  }


  export default{
    createrequest,
    getallrequests,
    getrequestbystudentid

  }