import student from "../../models/student/student-model"
import courses from "../../models/course/course-model"
import request from "../../models/request/request-model"
import { forEach } from "lodash"



async function registercoursetest(req, res, next) {
  let studid = req.body.studid
  let stud = await student.findOne({ _id: studid })
  let cors = []
  cors = req.body.courseid.replace('[', '').replace(']', '').split(', ')



  let sumofrequested = 0
  await Promise.all(cors.map(async (cours) => {
    let course = await courses.findOne({ _id: cours })
    console.log(course);
    sumofrequested = sumofrequested + course.hours
    return sumofrequested

  }))
  console.log("summmmmmmssssss" + sumofrequested);
  console.log(stud.availablecredit);
  if (sumofrequested > stud.availablecredit) {
    console.log("Your available credit is less than requested courses credit");
    return await res.json({ message: "The requested courses hours exceeds your available cridet" })
  }
  if(sumofrequested<9){
    return await res.json({message: "You must choose  courses at least of (9) hours"})
  }

  if (!stud) {
    return await res.json({ message: "that student of id : " + studid + " is not found!" })
  }
  let courseFound = ""
  for (let cours of cors) {
    let course = await courses.findOne({ _id: cours })
    if (!course) {
      courseFound = cours
      break
    }
  }
  if (courseFound) {
    return res.status(405).json({ message: "This course: " + courseFound + " is not found " })
  }

  // if course in current courses
  let registered = false
  for (let cours of cors) {
    let coursessss = await courses.findOne({ _id: cours })

    for (let current of stud.currentcourses) {
      if (current._id == coursessss._id) {
        registered = true
        break
      }
    }
    if (registered) {
      return await res.status(405).json({ message: "This course: " + coursessss.name + " of code: " + coursessss._id + " is already registered " })
    }
  }

  // if course in finished courses
  let finished = false
  for (let cours of cors) {
    let coursessss = await courses.findOne({ _id: cours })
    console.log("**********************cooooooooorsesssssssss");

    for (let finish of stud.finishedcourses) {
      if (finish._id == coursessss._id) {
        console.log("cooooooooorsesssssssss");
        finished = true
        break
      }
    }
    if (finished) {
      return await res.status(405).json({ message: "This course: " + coursessss.name + " of code: " + coursessss._id + " is already passed " })
    }
  }

  // if course in pre courses
  let foundprerequisite = false
  for (let cours of cors) {

    let coursessss = await courses.findOne({ _id: cours })
    if (coursessss.prerequisites.length == 0) {
      foundprerequisite = true
      continue
    }
    console.log("rrrrrrrrrrrrrrrrrrrrrrrrrr" + coursessss.prerequisites.length + "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")

    foundprerequisite = false
    for (let coursePre of coursessss.prerequisites) {
      foundprerequisite = false
      for (let finished of stud.finishedcourses) {
        if (finished._id == coursePre._id) {
          foundprerequisite = true
          break
        }

      }
      if (!foundprerequisite)
        break
    }
    if (!foundprerequisite) {
      return await res.status(405).json({ message: "you didn't pass this course: " + coursessss._id + " prerequisite" })
    }
  }

  const requestid = await request.findOne({ _id: studid + " : " + cors })

  if (requestid) {
    return await res.json({ message: "These courses is already requested" })
  }

  const requs = new request({
    _id: studid + " : " + cors,
    studentcode: studid,
    requestedcourses: cors,
    status: "pending",

  })
  await requs.save();
  return await res.json({ message: "Pending request is sent to admin" })

}

async function approveregistration(req, res) {
  const requestid = req.body.requestid
  const statusbody = req.body.status
  const reques = await request.findOne({ _id: requestid })
  console.log(reques);
  const stud = await student.findOne({ _id: reques.studentcode })
  console.log(stud);
  //check if request not found
  if (!reques) {
    return await res.json({ message: "Request not found" })
  }
  let sumofrequested = 0
  await Promise.all(reques.requestedcourses.map(async (cours) => {
    let course = await courses.findOne({ _id: cours })
    sumofrequested = sumofrequested + course.hours
    return sumofrequested

  }))

  if (statusbody == "accepted") {

    // check if request already accepted
    if (reques.status == "accepted") {
      return await res.json({ message: "Request already accepted " })
    }

    // check if request accepted after rejecting
    if (reques.status == "rejected") {
      return await res.json({ message: "You can't accept request after rejecting " })
    }

    // check if course in current courses
    let registered = false
    for (let cours of reques.requestedcourses) {
      let coursessss = await courses.findOne({ _id: cours })

      for (let current of stud.currentcourses) {
        if (current._id == coursessss._id) {
          registered = true
          break
        }
      }
      if (registered) {
        return await res.status(405).json({ message: "This course: " + coursessss.name + " of code: " + coursessss._id + " is already registered " })
      }
    }

    // check if course in finished courses
    let finished = false
    for (let cours of reques.requestedcourses) {
      let coursessss = await courses.findOne({ _id: cours })

      for (let finish of stud.finishedcourses) {
        if (finish._id == coursessss._id) {
          finished = true
          break
        }
      }
      if (finished) {
        return await res.status(405).json({ message: "This course: " + coursessss.name + " of code: " + coursessss._id + " is already passed " })
      }
    }

    //adding courses to student courses
    for (let cours of reques.requestedcourses) {
      stud.currentcourses.push(cours)
    }
    await stud.save()
    console.log("before save");
    stud.availablecredit = stud.availablecredit - sumofrequested
    await stud.save()
    console.log("after save");
    //change request status to accepted
    reques.status = "accepted"
    await reques.save()
    return await res.json({ message: "Request accepted and courses registered successfully" })
  } else if (statusbody == "rejected") {

    // check if request already rejected
    if (reques.status == "rejected") {
      return await res.json({ message: "Request already rejected " })
    }

    // check if request rejected after accepting
    if (reques.status == "accepted") {
      return await res.json({ message: "You can't reject request after accepting " })

    }

    //change request status to rejected
    reques.status = "rejected"
    await reques.save()
    return await res.json({ message: "Request rejected successfully" })
  } else {
    //return message if req.body doesn't have (accepted) or (rejected)
    return await res.json({ message: "Please enter (accepted) or (rejected)" })
  }


  res.json({ Message: "End" })
}

// let testCurrent=await cors.map(async (cours) => {
//   let course = await courses.findOne({ _id: cours })
//   if (course) {
//     let registered = false
//     console.log("course");
//     // if registered in current courses

//     for (let current of stud.currentcourses) {
//       if (current._id == cours) {
//         registered = true
//         return cours
//       }
//     }
//   }
// })

// if (testCurrent) {
//   console.log("is registered");

//   return await res.status(405).send({ message:testCurrent+ " is  in current courses"})
// }
// 





// await stud.currentcourses.map(async (curntcourse) => {
//   if (curntcourse._id == cours) {
//     console.log("registered");
//     if(!registered){
//       console.log("not registered");
//       return await res.status(405).send({ message: " is  in current courses" })
//       }
//       registered = true
//   }
// })

// if (!registered) {
//   return await res.status(405).send({ message: " is not in current courses" })
// }
// else {
//   return await res.status(405).send({ message: "if registered in current courses finished" })
// }



//   let finished = false
//   await Promise.all(stud.finishedcourses.map(async (finshdcourse) => {
//     if (finshdcourse._id == cours) {
//       console.log("finished");
//       finished = true
//     }
//   }))
//   if (registered || finished) {
//     if (registered) {
//       return await res.status(405).send({ message: " Course " + cours + " is already registered" })
//     } else {
//       return await res.status(405).send({ message: "already passed" })
//     }
//   }
//   let foundprerequisite = false
//   if (course.prerequisites.length != 0) {
//     await Promise.all(course.prerequisites.map(async (pre) => {
//       stud.finishedcourses.map(async (finished) => {
//         if (finished.id == pre._id) {
//           console.log("foundpre");
//           foundprerequisite = true
//           return
//         }
//       })
//       if (foundprerequisite) {
//         console.log("foundpreeee");
//         console.log("push" + cours.length);

//         let newcourse = stud.currentcourses
//         newcourse.push(course)
//         await student.findOneAndUpdate({ _id: studid }, { currentcourses: newcourse })
//         console.log("pushed");
//         return await res.json({ meassage: "course registered" })
//       } else {
//         return await res.json({ meassage: "You did'nt pass this course prerequisites" })
//       }
//     }))
//   } else {
//     let newcourse = stud.currentcourses
//     newcourse.push(course)
//     await student.findOneAndUpdate({ _id: studid }, { currentcourses: newcourse })
//     console.log("pushed");
//     return await res.json({ meassage: "course registered" })
//   }
// } else {
//   return await res.json({ message: "Course of Id: " + cours + " not found" })

// 



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

  registercoursetest,
  approveregistration
}