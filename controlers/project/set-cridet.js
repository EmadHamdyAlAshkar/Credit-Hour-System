import student from "../../models/student/student-model";


async function setcridet(req, res) {

  try {
    const students = await student.find()
    
    students.forEach(async (student) => {
      const credit = calculateMaxCreditHours(student.gpa); 
      student.availablecredit = credit; 
      console.log(student.availablecredit);
      await student.save(); 
      console.log("saved");
    });
    res.status(200).json({ message: 'Credit calculation completed successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while calculating credit.' });
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

export default {
  setcridet

}