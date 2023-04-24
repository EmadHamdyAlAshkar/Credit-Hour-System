import student from "../../models/student/student-model"
import courses from "../../models/course/course-model"



async function registercoursetest(req, res, next) {
  let studid = req.body.studid
  let stud = await student.findOne({ _id: studid })
  let cors = []
  cors = req.body.courseid.replace('[', '').replace(']', '').split(',')
  if (!stud) {
    return await res.json({ message: "that student of id : " + studid + " is not found!" })
  }
  await Promise.all(cors.map(async (cours) => {
    let course = await courses.findOne({ _id: cours })
    if (course) {
      let registered = false
      console.log("course");
      await Promise.all(stud.currentcourses.map(async (curntcourse) => {
        if (curntcourse._id == cours) {
          console.log("registered");
          registered = true
        }

      }))
      let finished = false
      await Promise.all(stud.finishedcourses.map(async (finshdcourse) => {
        if (finshdcourse._id == cours) {
          console.log("finished");
          finished = true
        }
      }))
      if (registered || finished) {
        if (registered) {
          return await res.status(405).send({ message: " Course " + cours + " is already registered" })
        } else {
          return await res.status(405).send({ message: "already passed" })
        }
      }
      let foundprerequisite = false
      if (course.prerequisites.length != 0) {
        await Promise.all(course.prerequisites.map(async (pre) => {
          stud.finishedcourses.map(async (finished) => {
            if (finished.id == pre._id) {
              console.log("foundpre");
              foundprerequisite = true
              return
            }
          })
          if (foundprerequisite) {
            console.log("foundpreeee");
            console.log("push" + cours.length);

            let newcourse = stud.currentcourses
            newcourse.push(course)
            await student.findOneAndUpdate({ _id: studid }, { currentcourses: newcourse })
            console.log("pushed");
            return await res.json({ meassage: "course registered" })
          } else {
            return await res.json({ meassage: "You did'nt pass this course prerequisites" })
          }
        }))
      } else {
        let newcourse = stud.currentcourses
        newcourse.push(course)
        await student.findOneAndUpdate({ _id: studid }, { currentcourses: newcourse })
        console.log("pushed");
        return await res.json({ meassage: "course registered" })
      }
    } else {
      return await res.json({ message: "Course of Id: " + cours + " not found" })

    }
  }))
}
// async function registercoursetest(req, res, next) {
//   try {
//     let studid = req.body.studid;
//     let stud = await student.findOne({ _id: studid });

//     let cors = [];
//     cors = req.body.courseid.replace('[', '').replace(']', '').split(',');

//     if (!stud) {
//        res.json({ message: "that student of id : " + studid + " is not found!" });
//     }

//     let responseSent = false; // Variable to keep track of whether a response has been sent

//     await Promise.all(cors.map(async (cours) => {
//       let course = await courses.findOne({ _id: cours });

//       if (course) {
//         let registered = false;
//         await Promise.all(stud.currentcourses.map(async (curntcourse) => {
//           if (curntcourse._id == cours) {
//             registered = true;
//             return;
//           }
//         }));

//         let finished = false;
//         await Promise.all(stud.finishedcourses.map(async (finshdcourse) => {
//           if (finshdcourse._id == cours) {
//             finished = true;
//             return;
//           }
//         }));

//         if (registered || finished) {
//           if (registered) {
//             res.json({ message: "already registered" });
//           } else {
//             res.json({ message: "already passed" });
//           }
//           responseSent = true; // Set responseSent to true to indicate that a response has been sent
//         }

//         let foundprerequisite = false;
//         if (course.prerequisites.length != 0) {
//           await Promise.all(course.prerequisites.map(async (pre) => {
//             stud.finishedcourses.map(async (finished) => {
//               if (finished.id == pre._id) {
//                 foundprerequisite = true;
//               }
//             });

//             if (foundprerequisite) {
//               let newcourse = stud.currentcourses;
//               newcourse.push(course);
//               await student.findOneAndUpdate({ _id: studid }, { currentcourses: newcourse });
//               res.send("course registered");
//               responseSent = true; // Set responseSent to true to indicate that a response has been sent
//             }
//           }));
//         }

//       } else {
//         res.json({ message: "Course of Id: " + cours + " not found" });
//         responseSent = true; // Set responseSent to true to indicate that a response has been sent
//       }
//     }));

//     // If no response has been sent, send a default response
//     if (!responseSent) {
//       res.json({ message: "Default response" });
//     }

//   } catch (err) {
//     next(err);
//   }
// }
// By using the responseSent variable to keep track of whether a response has been sent, we can ensure that only one response is sent to the client, and the "Error: Cannot set headers after they are sent to the client" error should be resolved.










export default {

  registercoursetest
}