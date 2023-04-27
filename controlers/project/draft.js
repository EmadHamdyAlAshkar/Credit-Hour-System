async function getStudentsByCoursesId(req, res, next) {
    // const courseName = req.body.courseName;
  
  const courseName ="Maths 2"
  const studid = req.body.studid
  const stud = await student.findOne({_id:studid})
  
  let availablecourses
  await Promise.all(stud.finishedcourses.map(async(finished)=>{
     availablecourses = await courses.find({ prerequisites :finished})
     
  
  }))
  let availablecourses1 = await courses.find({ prerequisites :stud.finishedcourses})
  
  
  const fin = stud.finishedcourses.name
  
  
    const course = await courses.findOne({ name: courseName });
    const studentt = await student.find({ currentcourses: course }).select("name -currentcourses -finishedcourses ")
  if(!course){
    return res.json({message:"Course: ("+courseName+") not found"})
  }
  try{
  const data = [
    ['_id','name'],
    ...studentt.map(student => [student._id,student.name])
  ];
  
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, courseName);
  const fileBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=' + courseName+" students.xlsx");
  
  console.log("studentt"+studentt);
  console.log("****************");
  console.log(data);
  console.log(availablecourses.length);
    res.json(availablecourses)
  // return res.json({data:{ students: studentt }})
  
  }catch(err) {
      console.error(err);
      res.status(500).send('Server Error');
  }
    // return res.json({data:{ students: studentt }})
    // const courseId = courses._id;
  
    // const students = await student.find({ currentcourses: courseId });
  
    // res.json({ data: course });
  }
  