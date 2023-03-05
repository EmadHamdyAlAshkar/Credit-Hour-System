import project from "../../models/project/project-model"
import { validationResult, matchedData } from 'express-validator'
import multer from "../../helpers/Multer"
// create project
async function createproject(req,res,next){
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
    }

        
}



/*
this line return the image
http://localhost:3000//images//others//background-1676542868642_up_design_ps.jpg
*/


// find project
// find all projects
async function find_all_projects(req,res,next){
  let x=NaN
  let obj={}
  const {sort, limit,skip}=project.check_query(req)
  if('name' in req.body){
    obj.name = { $regex: req.body.name }
  }
  // x = await project.find(obj).sort({}).all()
  console.log(`obj==> ${obj.name} \n sort==> ${sort} \n limit==> ${limit} \n skip==> ${skip} `)
  x = await project.find(obj).sort(sort).limit(limit).skip(skip).all()
  res.send(x)
}

// update project
async function update_project(req,res,next){
  const projectid=req.body.id
  
  let data={}
  if('name'in req.body){
    data.name=req.body.name
    
  }
  const x=await project.findOneAndUpdate({_id:projectid},data).catch((error)=>{
    res.send(error)
  })
  res.send(x)
} 
// delete project
async function delete_project(req,res,next){
  const projectid=req.body.id
  const proj =await project.findOne({_id:projectid})
  let paths=[]
  paths.push(proj.logo)
  paths.push(proj.background)
  multer.delete_img(paths)
  await project.deleteOne({_id:projectid})
  res.send("Done!!!")
  console.log("done")
}

export default {
    createproject,
    find_all_projects,
    update_project,
    delete_project
}