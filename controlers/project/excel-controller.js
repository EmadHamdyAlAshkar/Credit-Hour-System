import  Express  from "express";
import multer from "multer";
import xlsx from "xlsx";
import user from "../../models/course/user/user-model";
import student from "../../models/student/student-model";
import course from "../../models/course/course-model";
import StudentCourseGrade from "../../models/studentCourseGrade/studentCourseGrade-model";
import bcrypt from "bcrypt"
const router = Express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/students/upload', upload.single('file'), (req, res) => {
  // Parse xlsx file data
  const workbook = xlsx.read(req.file.buffer);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  
  const hashedData = data.map((student) => ({
    ...student,
    password: bcrypt.hashSync(student.password.toString(), 10),
  }));

  // Add student data to MongoDB
  student.insertMany(hashedData, (err, student) => {
    if (err) {
      console.error(err);
      res.status(500).json({status:"Error",message:'Error adding students to database', error: err});
    } else {
      res.status(200).json({status: "True",message:`${student.length} students added to database`});
    }
  });
});



router.post('/grades/midterm', upload.single('file'),async(req, res) => {
  // Parse xlsx file data
  const workbook = xlsx.read(req.file.buffer);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  
for(let row of data){
  const gradeidd = row.student + " : " + row.course
  const studgrad = await StudentCourseGrade.findOne({gradeid:gradeidd})
  const stud = await student.findOne({_id:row.student})
  const cours = await course.findOne({_id:row.course})
  const Row = data.indexOf(row) + 2
  if(!stud){
    return res.json({message:"This student: "+row.student+" in row: "+Row+" not found"})

  }
  if(!cours){
    return res.json({message:"This course: "+row.course+" in row: "+Row+" not found"})

  }
  
  if(studgrad){

    return res.json({message:"This student: "+row.student+" already has midterm grade for this subject: "+row.course+" row: "+Row+" in your excel sheet"})

  }
  

}

  // Add student data to MongoDB
  StudentCourseGrade.insertMany(data, (err, StudentCourseGrade) => {
    if (err) {
      console.error(err);
      res.status(500).json({status:"Error",message:'Error adding student course grade to database', error: err});
    }
    else {

      StudentCourseGrade.forEach(async (studgrade) => {
        console.log(studgrade);
        studgrade.gradeid = studgrade.student + " : " + studgrade.course
        await studgrade.save()

      })
      res.status(200).json({status: "True",message:`${StudentCourseGrade.length} student course grade added to database`});
    }
  });
});


router.post('/grades/practical',upload.single('file'),async (req, res) => {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = xlsx.utils.sheet_to_json(sheet);

    for (let row of rows) {
      // Find the student and course
      const stud= await student.findOne({ _id: row['student'] });
      const cours = await course.findOne({ _id: row['course'] });
      
      const gradeidd = row.student + " : " + row.course
      console.log(gradeidd);
      const studgrad = await StudentCourseGrade.findOne({gradeid:gradeidd})
      const Row = rows.indexOf(row) + 2


      if(!studgrad){

        return  res.send("Worng student code ("+row.student+") or course code ("+row.course+") in row: "+Row)

      }
      

      // Find the grade object and update it with the new practical grade
      const gradeObject = await StudentCourseGrade.findOneAndUpdate(
        { gradeid: gradeidd },{ practicalGrade: row['practicalGrade'] }
      );
    }

    res.send('Practical grades uploaded successfully');
  }
);

router.post('/grades/final',upload.single('file'),async (req, res) => {
  const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(sheet);

  for (let row of rows) {
    // Find the student and course
    const stud= await student.findOne({ _id: row['student'] });
    const cours = await course.findOne({ _id: row['course'] });
    
    const gradeidd = row.student + " : " + row.course
    console.log(gradeidd);
    const studgrad = await StudentCourseGrade.findOne({gradeid:gradeidd})
    const Row = rows.indexOf(row) + 2


    if(!studgrad){

      return  res.send("Worng student code ("+row.student+") or course code ("+row.course+") in row: "+Row)

    }
    

    // Find the grade object and update it with the new practical grade
    const gradeObject = await StudentCourseGrade.findOneAndUpdate(
      { gradeid: gradeidd },{ finalGrade: row['finalGrade'] }
    );
  }

  res.send('Final grades uploaded successfully');
}
);

router.get('/calculatetotalgrade',async (req,res)=>{
  const studgrades = await StudentCourseGrade.find()
  for(let studgrade of studgrades){
    studgrade.totalGrade = studgrade.midtermGrade + studgrade.practicalGrade + studgrade.finalGrade
    await studgrade.save()
    // console.log(" total grade saved");

    const totalgradegpa = calculatecoursegradegpa(studgrade.totalGrade)
    studgrade.gradegpa = totalgradegpa
    const totalgradegpaletter = calculatecoursegradegpaletter(studgrade.totalGrade)
    studgrade.gradeletter = totalgradegpaletter
    await studgrade.save()
    // console.log(totalgradegpa+"::::::::"+studgrade.totalGrade);


    const stud= await student.findOne({ _id: studgrade.student });
    const cours = await course.findOne({_id: studgrade.course})
    const studcoursegrade = await StudentCourseGrade.findOne({_id:studgrade._id})
    
    

    let ind = 0
     for(let stucurrent of stud.currentcourses){
      if(stucurrent._id == cours._id){
         ind = stud.currentcourses.indexOf(stucurrent)
      }
     }
     if(studgrade.totalGrade < 50){
      return res.json({message:"OKK"})
     }
    //  console.log("yeeeeeeeeeeeeeees"+ind);
    //  console.log(stud.coursesgrades);
     stud.coursesgrades.push(studgrade)
     await stud.save()
     
     stud.currentcourses.splice(ind,1)
     stud.finishedcourses.push(cours)
    //  console.log("current"+stud.currentcourses);
    //  console.log("finished"+stud.finishedcourses);
     await stud.save()

  }

  
  res.json({message: "Total grade and GPA calculated for all student grades"})
})

  router.post('/setgpa',async (req,res)=>{
    const studid = req.body.studid
    const students = await student.find().populate("coursesgrades","student gradegpa")
    for(let studentt of students){
      let hours = 0
      let gradepoint = 0
      let hours_times_gradepoint = 0
      const studgradesss = await StudentCourseGrade.find({student:studentt})
      for(let studgrade of studgradesss){
        const corse = await course.findOne({_id:studgrade.course})
        
        // console.log("hours_times_gradepoint"+hours_times_gradepoint);
        gradepoint += studgrade.gradegpa
        hours += corse.hours
        hours_times_gradepoint += corse.hours * studgrade.gradegpa
        // console.log("hours_times_gradepoint "+hours_times_gradepoint);
      }
      // hours_times_gradepoint -= hours_times_gradepoint
      let studgpa = hours_times_gradepoint / hours

      // console.log("hours"+hours);
      // console.log("gradepoint"+gradepoint);
      // console.log("hours_times_gradepoint for student "+hours_times_gradepoint);
      // console.log("studgpa"+studgpa);
      // console.log("*********************");
      studentt.achievedhours= hours
      studentt.remaininghourse = 135 - hours
      studentt.gpa = studgpa
      await studentt.save()

    }
    res.json({status:"true" , message: "GPA calculated successfully for all students"})

  })


function calculatecoursegradegpa(totalgrade) {
  let GradePoint
  if (totalgrade <= 59)
            {
                GradePoint = 0.0;
                
                    return GradePoint;

            }
            else if(totalgrade >59 && totalgrade <= 66)
            {
                GradePoint = 1.0;
                return GradePoint;
            }
            else if (totalgrade > 66 && totalgrade <= 69)
            {
                GradePoint = 1.3;
                return GradePoint;

            }
            else if (totalgrade > 69 && totalgrade <= 72)
            {
                GradePoint = 1.7;
                return GradePoint;
            }
            else if (totalgrade > 72 && totalgrade <= 76)
            {
                GradePoint = 2.0;
                return GradePoint;
            }
            else if (totalgrade > 76 && totalgrade <= 79)
            {
                GradePoint = 2.3;
                return GradePoint;
            }
            else if (totalgrade > 79 && totalgrade <= 83)
            {
                GradePoint = 2.7;
                return GradePoint;
            }
            else if (totalgrade > 83 && totalgrade <= 86)
            {
                GradePoint = 3.0;
                return GradePoint;
            }
            else if (totalgrade > 86 && totalgrade <= 89)
            {
                GradePoint = 3.3;
                return GradePoint;
            }
            else if (totalgrade > 89 && totalgrade <= 93)
            {
                GradePoint = 3.7;
                return GradePoint;
            }
            else if (totalgrade > 93 && totalgrade <= 100)
            {
                GradePoint = 4.0;
                return GradePoint;
            }
            else {
                return 404;
            }
}
function calculatecoursegradegpaletter(totalgrade) {
  let GradePoint
  if (totalgrade <= 59)
            {
                GradePoint = "F";
                
                    return GradePoint;

            }
            else if(totalgrade >59 && totalgrade <= 66)
            {
                GradePoint = "D";
                return GradePoint;
            }
            else if (totalgrade > 66 && totalgrade <= 69)
            {
                GradePoint = "D+";
                return GradePoint;

            }
            else if (totalgrade > 69 && totalgrade <= 72)
            {
                GradePoint = "C-";
                return GradePoint;
            }
            else if (totalgrade > 72 && totalgrade <= 76)
            {
                GradePoint = "C";
                return GradePoint;
            }
            else if (totalgrade > 76 && totalgrade <= 79)
            {
                GradePoint = "C+";
                return GradePoint;
            }
            else if (totalgrade > 79 && totalgrade <= 83)
            {
                GradePoint = "B-";
                return GradePoint;
            }
            else if (totalgrade > 83 && totalgrade <= 86)
            {
                GradePoint = "B";
                return GradePoint;
            }
            else if (totalgrade > 86 && totalgrade <= 89)
            {
                GradePoint = "B+";
                return GradePoint;
            }
            else if (totalgrade > 89 && totalgrade <= 93)
            {
                GradePoint = "A-";
                return GradePoint;
            }
            else if (totalgrade > 93 && totalgrade <= 100)
            {
                GradePoint = 'A';
                return GradePoint;
            }
            else {
                return 404;
            }
}



router.post('/check-duplicates', async (req, res) => {
  const codes = req.body.codes;

  // Check if there are any duplicate codes
  const duplicates = codes.filter((code, index) => codes.indexOf(code) !== index);

  if (duplicates.length > 0) {
    return res.status(400).json({ message: `Duplicate course codes found: ${duplicates.join(', ')}` });
  }

  // Check if the codes exist in the database
  try {
    const courses = await course.find({ code: { $in: codes } });
    const courseCodes = courses.map((course) => course.code);

    const missingCodes = codes.filter((code) => !courseCodes.includes(code));
    if (missingCodes.length > 0) {
      return res.status(404).json({ message: `Courses not found: ${missingCodes.join(', ')}` });
    }

    return res.status(200).json({ message: 'All courses found and no duplicate codes' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error checking course codes' });
  }
});

export default router;




// router.post('/users/upload', upload.single('file'), (req, res) => {
//     // Parse xlsx file data
//     const workbook = xlsx.read(req.file.buffer);
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const data = xlsx.utils.sheet_to_json(sheet);
  
//     // Add student data to MongoDB
//     user.insertMany(data, (err, user) => {
//       if (err) {
//         console.error(err);
//         res.status(500).json({status:"Error",message:'Error adding users to database', error: err.writeErrors.errmsg});
//       } else {
//         res.status(200).json({status: "True",message:`${user.length} users added to database`});
//       }
//     });
//   });

//   export default router;