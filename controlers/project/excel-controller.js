import  Express  from "express";
import multer from "multer";
import xlsx from "xlsx";
import user from "../../models/course/user/user-model";
import student from "../../models/student/student-model";
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