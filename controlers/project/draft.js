import student from "../../models/student/student-model"
import courses from "../../models/course/course-model"
import multer from "../../helpers/Multer"
import express from "express"


const router = express.Router();




async function exportudentexcel(req, res, next) {
  // const courseName = req.body.courseName;

  const courseName = "Maths 2"
  const studid = req.body.studid
  const stud = await student.findOne({ _id: studid })


  const course = await courses.findOne({ name: courseName });
  const studentt = await student.find({ currentcourses: course }).select("name -currentcourses -finishedcourses ")
  if (!course) {
    return res.json({ message: "Course: (" + courseName + ") not found" })
  }
  try {
    const data = [
      ['_id', 'name'],
      ...studentt.map(student => [student._id, student.name])
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, courseName);
    const fileBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + courseName + " students.xlsx");

    console.log("studentt" + studentt);
    // console.log(data);

    // return res.json({data:{ students: studentt }})

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
  // return res.json({data:{ students: studentt }})
  // const courseId = courses._id;

  // const students = await student.find({ currentcourses: courseId });

  // res.json({ data: course });
}



router.get('/export', async (req, res) => {
  try {
    // Fetch all students from the database
    const students = await student.find().lean().exec();

    // Convert student data to Excel worksheet
    const worksheet = XLSX.utils.json_to_sheet(students);

    // Create a new workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

    // Generate an Excel file buffer
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Set the response headers for downloading the file
    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=students.xlsx'
    });

    // Send the Excel file as a response
    res.send(excelBuffer);
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

export default{
  exportudentexcel

}


