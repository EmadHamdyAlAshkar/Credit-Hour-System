import student from "../../models/student/student-model"
import courses from "../../models/course/course-model"
import { validationResult, matchedData } from 'express-validator'
import multer from "../../helpers/Multer"
import { response } from "express";
import bcrypt from "bcrypt"
import XLSX from "xlsx"
import StudentCourseGrade from "../../models/studentCourseGrade/studentCourseGrade-model";
import course from "../../models/course/course-model";
import staff from "../../models/staff/staff-model";
import instructor from "../../models/instructor/instructor-model";

// create student
async function createstudent(req, res, next) {
  let stu = await student.findById({ _id: req.body.id })
  if (stu) {
    return res.json({ message: "Student already exists" })
  }
  const stud = new student({
    _id: req.body.id,
    fullname: req.body.fullname,
    countryofnationality: req.body.countryofnationality,
    religion: req.body.religion,
    dateofbirth: req.body.dateofbirth,
    placeofbirth: req.body.placeofbirth,
    nationalid: req.body.nationalid,
    guardianname: req.body.guardianname,
    jop: req.body.jop,
    city: req.body.city,
    address: req.body.address,
    homephone: req.body.homephone,
    mobile: req.body.mobile,
    school: req.body.school,
    fullyqualified: req.body.fullyqualified,
    graduationyear: req.body.graduationyear,
    roleofqualification: req.body.roleofqualification,
    totalscore: req.body.totalscore,
    department: req.body.department,
    gender: req.body.gender,
    email: req.body.email,
    level: req.body.level,
    username: req.body.username,
    password: req.body.password,
    isStudent: req.body.isStudent,
    gpa: req.body.gpa,

  })
  const saltrounds = 10
  stud.password = await bcrypt.hash(stud.password, saltrounds)
  await stud.save((error, result) => {
    if (error) {
      res.send(error)
    }
    else {
      res.json({ status: "true", message: "Student saved" })

    }
  });
}
async function getonestudent(req, res) {
  let stud = await student.findById(req.body._id).select('-password')
  if (!stud) {
    return res.send("Student not found")
  }
  res.json({ data: stud })

}
async function getstudentsbycourse(req, res) {
  const courseid = req.body.courseid
  const students = await student.find({ currentcourses: courseid }).select("name -currentcourses -finishedcourses")
  return res.json({ data: students })

}
// getting student by course id
async function getStudentsByCoursesId(req, res, next) {
  const courseName = req.body.courseName;


  const course = await courses.findOne({ name: courseName });
  const studentt = await student.find({ currentcourses: course }).select("fullname -currentcourses -finishedcourses")

  return res.json({ data: { students: studentt } })
  // const courseId = courses._id;

  //   const students = await student.find({ currentcourses: courseId });

  //  res.json({data:course});
}
async function getallstudents(req, res, next) {
  let obj = {}
  if ("name" in req.body) {
    obj.name = { $regex: req.body.name }
  }
  if ("gender" in req.body) {
    obj.gender = req.body.gender
  }
  const students = await student.find(obj).all()
   return await res.json({ data: students })
}
async function deletestudent(req, res, next) {
  const students = await student.findOneAndDelete({
    _id: req.body.id
  })
  res.send(students)
}
async function updatestudent(req, res, next) {
  let obj = {}
  if ("name" in req.body) {
    obj.name = req.body.name
  }
  if ("email" in req.body) {
    obj.email = req.body.email
  }
  if ("password" in req.body) {
    obj.password = req.body.password
  }

  const students = await student.findOneAndUpdate({
    _id: req.body.id
  }, obj)
  return res.send(students)
}

async function getavailablecourses(req, res) {
  const studid = req.body.studid
  const stud = await student.findOne({ _id: studid })
  const cooorsess = await course.find().select("name hours ")

  let availablecourses
  let avail = await Promise.all(stud.finishedcourses.map(async (finished) => {
    availablecourses = await courses.find({ prerequisites: finished }).select("name hours -prerequisites ")
    return availablecourses
  }))

  let found = []
  for (let availablecoursesss of avail) {
    for (let avaaaal of availablecoursesss) {
      found.push(avaaaal)
    }
  }

  for (let cooorse of cooorsess) {

    if (cooorse.prerequisites.length == 0) {
      found.push(cooorse)
    }
  }

  let finished = []
  for (let founded of found) {
    for (let finish of stud.finishedcourses) {
      if (founded._id == finish._id) {
        finished.push(finish)
      }
    }
  }

  let current = []
  for (let founded of found) {
    for (let curent of stud.currentcourses) {
      if (founded._id == curent._id) {
        current.push(curent)
      }
    }
  }

  for (let finish of finished) {
    for (let founded of found) {
      if (founded._id == finish._id) {
        let ind = found.indexOf(founded)
        found.splice(ind, 1)
      }
    }
  }

  for (let curent of current) {
    for (let founded of found) {
      if (founded._id == curent._id) {
        let ind = found.indexOf(founded)
        found.splice(ind, 1)

      }
    }
  }
  res.json({ data: found })

}
async function changepassword(req,res){
  const oldpassword = req.body.oldpassword
  const newpassword = req.body.newpassword
  const confirmnewpassword = req.body.confirmnewpassword

  const stud = await student.findOne({_id:req.body.id})
  const staf = await staff.findOne({_id: req.body.id})
  const instruct = await instructor.findOne({_id: req.body.id})

  if(stud){
    const checkpassword = await bcrypt.compare(oldpassword,stud.password)
    if(!checkpassword){
      return res.status(404).json({message:"Old password is wrong"})
    }
    if(newpassword != confirmnewpassword){
      return res.status(404).json({message:"Please enter password two times identically"})
    }
    const saltrounds = 10
    const hashedpassword = await bcrypt.hash(confirmnewpassword, saltrounds)
    stud.password = hashedpassword
    await stud.save
    ((error, result) => {
      if (error) {
        res.send(error)
      }
      else {
        return res.json({ status: "true", message: "Password changed successfully" })
  
      }
    });
  }
  else if(staf){
    const checkpassword = await bcrypt.compare(oldpassword,staf.password)
    if(!checkpassword){
      return res.status(404).json({message:"Old password is wrong"})
    }
    if(newpassword != confirmnewpassword){
      return res.status(404).json({message:"Please enter password two times identically"})
    }
    const saltrounds = 10
    const hashedpassword = await bcrypt.hash(confirmnewpassword, saltrounds)
    staf.password = hashedpassword
    await staf.save((error, result) => {
      if (error) {
        res.send(error)
      }
      else {
        return res.json({ status: "true", message: "Password changed successfully" })
      }
    });
  }
  else if(instruct){
    const checkpassword = await bcrypt.compare(oldpassword,instruct.password)
    if(!checkpassword){
      return res.status(404).json({message:"Old password is wrong"})
    }
    if(newpassword != confirmnewpassword){
      return res.status(404).json({message:"Please enter password two times identically"})
    }
    const saltrounds = 10
    const hashedpassword = await bcrypt.hash(confirmnewpassword, saltrounds)
    instruct.password = hashedpassword
    await instruct.save((error, result) => {
      if (error) {
        res.send(error)
      }
      else {
        return res.json({ status: "true", message: "Password changed successfully" })
      }
    });
  }
  else{
    return res.json({message:"User not found"})

  }
  
}

async function showstudentreport(req, res) {
  const studid = req.body.studid
  const stud = await StudentCourseGrade.find({ student: studid })
    .populate("course", "-_id -prerequisites -department -semester -createdAt -updatedAt")
    .select("-_id gradegpa gradeletter")
  res.json({ data: stud })

}




async function registercourse1(req, res, next) {
  let studid = req.body.studid
  let courseid = req.body.courseid
  let stud = await student.findOne({
    _id: studid
  }
  )
  let course = await courses.findOne({
    _id: courseid
  })
  if (!stud) {
    return res.status(404).send(`that student of id : ${studid} is not found!`)
  }
  if (course) {
    let reg = false
    console.log("course");

    await Promise.all(stud.currentcourses.map(async (cours) => {
      if (cours._id == courseid) {
        console.log("registered");

        reg = true


      }
    }))

    let finished = false
    await Promise.all(stud.finishedcourses.map(async (cours) => {
      if (cours._id == courseid) {
        console.log("finished");

        finished = true
      }
    }))
    if (reg || finished) {
      console.log(`course :{ ${course.name} } is already registred !`);
      if (reg) {
        return await res.status(405).send(`course :{ ${course.name} } is already registred !`)
      }
      else {
        return await res.status(405).send(`course :{ ${course.pre} } is already passed !`)
      }

    }
    let found = false
    if (course.prerequisites.length != 0) {
      await Promise.all(course.prerequisites.map((pre) => {
        stud.finishedcourses.map((finished) => {
          if (finished._id == pre._id) {
            found = true
            return
          }
        })
        if (found == false) {
          return
        }
      }))
    }
    if (found) {
      let newcourse = stud.currentcourses
      newcourse.push(course)
      await student.findOneAndUpdate({ _id: studid }, { currentcourses: newcourse })

    }
    else {
      if (course.prerequisites != 0) { return res.json({ message: `course ${course.prerequisites} not found in your finished courses` }) }
      else {

        let newcourse = stud.currentcourses
        newcourse.push(course)
        await student.findOneAndUpdate({ _id: studid }, { currentcourses: newcourse })
      }
    }

    return res.send("course registered")
  } else {
    return res.status(404).send(`that course of id : ${courseid} is not found!`)
  }
}
async function registercourse(req, res, next) {
  let studid = req.body.studid
  let courseid = req.body.courseid
  let stud = await student.findOne({
    _id: studid
  })
  let cors = []

  cors = req.body.courseid.replace('[', '').replace(']', '').split(',')
  let sum = 0
  await Promise.all(cors.map(async (cours) => {
    let course = await courses.findOne({
      _id: cours
    })
    if (!stud) {
      return res.send("that student of id : " + studid + " is not found!")
    }
    if (!course) {
      return res.send("Course " + cours + " not found")
    }

    //   if (course.hours < maxCreditHours) {
    //   console.log("max hours"+maxCreditHours);


    //   return res.status(400).json({ message: `Subject credit hours exceed maximum credit hours for student (${maxCreditHours})` });
    // }
    else {
      newcourse.push(course)
      await student.findOneAndUpdate({ _id: studid }, { currentcourses: newcourse })
    }
    sum = sum + course.hours
  }))

  return res.send(cors[0] + " The sum of  registered hours = " + sum)

  let course = await courses.findOne({
    _id: courseid
  })
  const maxCreditHours = calculateMaxCreditHours(stud.gpa);



  if (!stud) {
    return res.status(404).send(`that student of id : ${studid} is not found!`)
  }
  if (course) {
    let reg = false
    await Promise.all(stud.currentcourses.map(async (cours) => {
      if (cours._id === courseid) {
        reg = true
      }
    }))

    let finished = false
    await Promise.all(stud.finishedcourses.map(async (cours) => {
      if (cours._id === courseid) {
        finished = true
      }
    }))
    if (reg || finished) {

      console.log(`course :{ ${course.name} } is already registred !`);
      if (reg) {
        return await res.status(405).send(`course :{ ${course.name} } is already registred !`)
      }
      else {
        return await res.status(405).send(`course :{ ${course.pre} } is already passed !`)
      }


    }
    let found = false
    if (course.prerequisites.length != 0) {
      await Promise.all(course.prerequisites.map((pre) => {
        stud.finishedcourses.map((finished) => {
          if (finished._id == pre._id) {
            found = true
            return
          }
        })
        if (found == false) {
          return
        }
      }))
    }
    if (found) {
      let newcourse = stud.currentcourses
      if (course.hours < maxCreditHours) {
        console.log("max hours" + maxCreditHours);
        let newmaxhours = maxCreditHours - course.hours
        console.log(newmaxhours);
        return res.status(400).json({ message: `Subject credit hours exceed maximum credit hours for student (${maxCreditHours})` });
      }
      else {
        newcourse.push(course)
        await student.findOneAndUpdate({ _id: studid }, { currentcourses: newcourse })
      }


    }
    else {
      if (course.prerequisites != 0) { return res.json({ message: `This course prerequisite is  not found in your finished courses` }) }
      else {

        let newcourse = stud.finishedcourses
        newcourse.push(course)
        await student.findOneAndUpdate({ _id: studid }, { finishedcourses: newcourse })
      }
    }

    return res.send("course registered")
  } else {
    return res.status(404).send(`that course of id : ${courseid} is not found!`)
  }
}
function calculateMaxCreditHours(gpa) {
  if (gpa <= 4 && gpa >= 3.5) {
    return 20;
  } else if (gpa < 3.5 && gpa >= 3) {
    return 15;
  } else if (gpa < 3 && gpa >= 2.5) {
    return 12;
  } else if (gpa < 2.5 && gpa >= 2) {
    return 9;
  } else {
    return 6;
  }
}
// async function registercourse(req, res, next) {
//   let studid = req.body.studid
//   let courseid = req.body.courseid
//   let stud = await student.findOne({
//     _id: studid
//   }
//   )
//   let course = await courses.findOne({
//     _id: courseid
//   })
//   let found = false
//   // console.log("pre***********************************"+typeof(course.prerequisites));
//   console.log("******************************finished************************************" + (stud.finishedcourses[0]));
//   let foundpre = await courses.findOne({ finishedcourses: req.body.finishedcourses })
//   if (foundpre) { res.send("already registered") }
//   else {
//     if (course.prerequisites.length != 0) {
//       course.prerequisites.map((pre) => {
//         console.log("pre" + pre)
//         console.log("**here***" + stud.finishedcourses.includes(pre));
//         stud.finishedcourses.map((finished) => {
//           if (finished._id == pre._id) {
//             found = true
//             return
//           }
//         })
//         if (found == false) {
//           return
//         }
//         // if(stud.finishedcourses.includes(pre))
//         // {
//         //   console.log("**here***");
//         //   // return console.log("found");
//         // }
//         // else{
//         //   found=false
//         //    return res.send(`course ${pre} not found in your finished courses`)
//         // }
//       })



//     }
//     if (found) {


//       let newcourse = stud.finishedcourses
//       newcourse.push(course)
//       await student.findOneAndUpdate({ _id: studid }, { finishedcourses: newcourse })

//     }
//     else {
//       if (course.prerequisites != 0) { return res.send(`course ${course.name} not found in your finished courses`) }
//       else {
//         let newcourse = stud.finishedcourses
//         newcourse.push(course)
//         await student.findOneAndUpdate({ _id: studid }, { finishedcourses: newcourse })
//       }
//     }
//     res.send("course registered")
//   }

// }
async function enrollcourse(req, res) {
  // let stud = await student.findOne({_id: req.body.studid})
  // let course = await courses.findOne({ _id: req.body.courseid })
  // if (!stud||!course) {
  //   res.send("not found")
  // }
  // else {
  //   res.send("Hello")
  // }
  const { studentId, courseId } = req.body;
  const stud = await student.findById(studentId).populate('currentcourses')
  if (!stud) {
    return res.status(404).json({ msg: 'Student not found' });
  }

  const cours = await courses.findById(courseId);
  if (!cours) {
    return res.status(404).json({ msg: 'Subject not found' });
  }
  let check = stud.currentcourses.includes(cours)
  if (stud.currentcourses.includes(cours)) {
    console.log("here");
    return res.status(400).json({ msg: 'Student already enrolled in this subject' });
  }
  stud.currentcourses.push(courseId);
  await stud.save();
  res.send("Course added")
}
// router.post('/enroll', async (req, res) => {
//   const { studentId, subjectId } = req.body;

//   try {
//     // Get the student
//     const student = await Student.findById(studentId);
//     if (!student) {
//       return res.status(404).json({ msg: 'Student not found' });
//     }

//     // Get the subject
//     const subject = await Subject.findById(subjectId);
//     if (!subject) {
//       return res.status(404).json({ msg: 'Subject not found' });
//     }

//     // Check if the student has already enrolled in the subject
//     if (student.enrolledSubjects.includes(subjectId)) {
//       return res.status(400).json({ msg: 'Student already enrolled in this subject' });
//     }

//     // Check if the student has the prerequisite for the subject
//     if (subject.prerequisite && !student.enrolledSubjects.includes(subject.prerequisite)) {
//       return res.status(400).json({ msg: 'Student does not have the prerequisite for this subject' });
//     }

//     // Enroll the student in the subject
//     student.enrolledSubjects.push(subjectId);
//     await student.save();

//     res.json({ msg: 'Student enrolled in subject' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });



/*
let valid=validationResult(req)
    console.log(req.body)
    if(valid.isEmpty()){
        const fulldata=matchedData(req,{ includeOptionals: false })
        const proj=new project({
          name:req.body.name,
          logo:req.files.logo[0].path,
          background:req.files.background[0].path
          ,category:req.body.category
        })
        proj.save((error, result) => {
            if (error) {
              console.log(error)
              
              res.send(error)
            }
            else {
              console.log(result)
              res.send(proj)
            }
          })
    }
    else{
        res.send(valid)
    } */



/*
this line return the image
http://localhost:3000//images//others//background-1676542868642_up_design_ps.jpg
*/


// find project
// find all projects
async function find_all_projects(req, res, next) {
  let x = NaN
  let obj = {}
  const { sort, limit, skip } = project.check_query(req)
  if ('name' in req.body) {
    obj.name = { $regex: req.body.name }
  }
  // x = await project.find(obj).sort({}).all()
  console.log(`obj==> ${obj.name} \n sort==> ${sort} \n limit==> ${limit} \n skip==> ${skip} `)
  x = await project.find(obj).sort(sort).limit(limit).skip(skip).all()
  res.send(x)
}

// update project
async function update_project(req, res, next) {
  const projectid = req.body.id

  let data = {}
  if ('name' in req.body) {
    data.name = req.body.name

  }
  const x = await project.findOneAndUpdate({ _id: projectid }, data).catch((error) => {
    res.send(error)
  })
  res.send(x)
}
// delete project
async function delete_project(req, res, next) {
  const projectid = req.body.id
  const proj = await project.findOne({ _id: projectid })
  let paths = []
  paths.push(proj.logo)
  paths.push(proj.background)
  multer.delete_img(paths)
  await project.deleteOne({ _id: projectid })
  res.send("Done!!!")
  console.log("done")
}

export default {
  createstudent,
  getallstudents,
  updatestudent,
  deletestudent,
  registercourse,
  getonestudent,
  enrollcourse,
  registercourse1,
  getstudentsbycourse,
  getStudentsByCoursesId,
  getavailablecourses,
  showstudentreport,
  changepassword,
}